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


}