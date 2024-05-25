'use server'

import prisma from "@/lib/prisma"


interface PaginationOptions {
    page?: number;
    take?: number;
}

export const getPaginatedProductsWithImages = async ({ page = 1, take = 12 }: PaginationOptions) => {
    try {
        
        if ( isNaN( Number(page)) ) page = 1
        if ( page < 1 ) page = 1

        //! 1. Obteniendo los productos
        const products = await prisma.product.findMany({
            take,
            skip: (page - 1) * take,
            include: {
                ProductImage: {
                    take: 3,
                    select: {
                        url: true
                    }
                }
            }
        })


        //! 2. Obtener total de páginas
        const totalCount = await prisma.product.count({})
        const totalPages = Math.ceil(totalCount / take)


        return {
            currentPage: page, 
            totalPages,
            products: products.map( product => ({
                ...product,
                images: product.ProductImage.map( image => image.url )
            }))
        }

    } catch (error) {
        throw new Error('no se pudo cargar los productos')
    }
}