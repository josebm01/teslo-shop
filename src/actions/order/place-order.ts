'use server'

import { auth } from "@/auth.config";
import type { Size, Address } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size;
}

export const placeOrder = async ( productIds: ProductToOrder[], address: Address ) => {

    const session = await auth()
    const userId = session?.user.id 

    //! Verificar sesión de usuario
    if ( !userId ){
        return {
            ok: false,
            message: 'No hay sesión de usuario'
        }
    }

    //! Obtener información de los productos
    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productIds.map( p => p.productId )
            }
        }
    })

    //! Calcular los montos - Encabezado 
    const itemsInOrder = productIds.reduce( ( count, p ) => count + p.quantity, 0)

    //! Totales de tax, subtotal y total
    const { subTotal, tax, total } = productIds.reduce( (totals, item) => {
        
        const productQuantity = item.quantity
        const product = products.find( product => product.id === item.productId )

        if ( !product ) throw new Error(`500 - ${item.productId} no existe`)

        const subTotal = product.price * productQuantity

        totals.subTotal += subTotal
        totals.tax += subTotal * 0.16
        totals.total += subTotal * 1.16

        return totals

    }, { subTotal: 0, tax: 0, total: 0 }) // valores iniciales


    //! Crear la transacción en la base de datos
    const prismaTx = await prisma.$transaction( async( tx ) => {

        // 1. Actualizar el stock de los productos

        // 2. Crear la orden - encabezado - detalles
        const order = await tx.order.create({
            data: {
                userId: userId,
                itemsInOrder: itemsInOrder,
                subTotal: subTotal,
                tax: tax,
                total: total,

                // detalle de los productos
                OrderItem: {
                    createMany: 
                    {
                        data: productIds.map( p => ({
                            quantity: p.quantity,
                            size: p.size,
                            productId: p.productId,
                            price: products.find( product => product.id === p.productId )?.price ?? 0
                        }))
                    }
                }
            }
        })

        // Valiar, si el price es cero, entonces, lanzar un error

        
        // 3. Crear la dirección de la orden
        const { country, ...restAddress } = address; 
        const orderAddress = await tx.orderAddress.create({
 
            data: {
                firstName: restAddress.firstName,             
                lastName: restAddress.lastName, 
                address: restAddress.address,
                address2: restAddress.address2,
                postalCode: restAddress.postalCode,
                city: restAddress.city,
                phone: restAddress.phone,
                //...restAddress,     
                orderId: order.id,
                countryId: country, 
            }
        });

        // devolviendo los datos de la orden
        return {
            updatedProducts: [],
            order: order,
            orderAddress: orderAddress
        }

    })

}