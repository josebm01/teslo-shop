'use server'

import prisma from "@/lib/prisma"

export const getCountries = async () => {
    try {
        const coutries = await prisma.country.findMany({
            orderBy: {
                name: 'asc'
            }
        })

        return coutries
        
    } catch (error) {
        console.log( error )
        return []
    }
}