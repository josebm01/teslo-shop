'use server'

import { Address } from "@/interfaces"
import prisma from "@/lib/prisma"

export const setUserAddress = async ( address: Address, userId: string ) => {
    try {

        const newAddress = await createOrReplaceAddress( address, userId )

        return {
            ok: true,
            address: newAddress
        }
        
    } catch (error) {
        console.log( error )
        return {
            ok: false,
            message: 'No se pudo guardar la dirección'
        }
    }
}


const createOrReplaceAddress = async ( address: Address, userId: string ) => {
    try {
        
        const storeAddress = await prisma.userAddress.findUnique({
            where: { userId }
        })

        const addresToSave = {
            userId: userId,
            address: address.address,
            address2: address.address2,
            countryId: address.country,
            city: address.city,
            firstName: address.firstName,
            lastName: address.lastName,
            phone: address.phone,
            postalCode: address.postalCode
        }

        // no existe dirección, se crea 
        if ( !storeAddress ) {
            const newAddress = await prisma.userAddress.create({
                data: addresToSave
            })

            return newAddress
        }

        // existe dirección, se actualiza
        const updatedAddress = await prisma.userAddress.update({
            where: { userId },
            data: addresToSave
        })

        return updatedAddress

        
    } catch (error) {
        console.log( error )
        throw new Error('No se pudo grabar la dirección')
    }
}