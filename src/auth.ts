import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { z } from 'zod'
import email from "next-auth/providers/email"

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

                if ( !parsedCredentials.success ) return null


                const { email, password } = parsedCredentials.data

                console.log({email, password })

                return null
            }
        })
    ] 
})