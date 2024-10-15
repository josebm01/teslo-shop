'use server'

import { v2 as cloudinary } from 'cloudinary';
import { Gender, Product, Size } from '@prisma/client'
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const deleteProductImage = async ( imageId: string, imageUrl: string ) => {

    if ( !imageUrl.startsWith('http') ){
        return {
            ok: false,
            error: 'No se pueden borrar imágenes de FS'
        }
    }

    // Obteniendo nombre de la imagen
    const imageName = imageUrl
        .split('/')
        .pop() // ultimo valor
        ?.split('.')[0] ?? '' // tomando el nombre y separandolo de la extensión

    try {
        
        // Eliminando imagen de cloudinary
        await cloudinary.uploader.destroy( imageName )
        // Eliminando registro de la imagen de la base de datos
        const deletedImage = await prisma.productImage.delete({
            where: {
                id: parseInt( imageId )
            },
            select: {
                product: {
                    select: {
                        slug: true
                    }
                }
            }
        })

        // Revalidar paths
        revalidatePath(`/admin/products`)
        revalidatePath(`/admin/product/${ deletedImage.product.slug }`)
        revalidatePath(`/product/${ deletedImage.product.slug }`)

    } catch (error) {
        return {
            ok: false,
            messasge: 'No se pudo eliminar la imagen'
        }
    }
}