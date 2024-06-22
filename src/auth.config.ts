import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { z } from 'zod'
import prisma from "./lib/prisma"
import bcryptjs from "bcryptjs"

// handles: regresa las peticiones GET y POST
export const { handlers, signIn, signOut, auth } = NextAuth({ 
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account'
    },
    providers: [ 
        // GitHub,

        // configuración para la autenticación
        Credentials({
            async authorize( credentials ) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials)

                // contraseñas son incorrectas
                if ( !parsedCredentials.success ) return null

                const { email, password } = parsedCredentials.data

                try {
                    
                    //? Validar usuario 
                    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    
                    if ( !user ) return null
                    
                    //? verificar contraseña
                    if ( !bcryptjs.compareSync( password, user.password ) ) return null
    
                    // retornando el usuario sin el password
                    const { password: _, ...rest } = user
    
                    console.log({ rest })
    
                    return rest

                } catch (error) {
                    
                    console.error( error )
                    return null

                }
            }
        })
    ] 
})





