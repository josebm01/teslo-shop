import NextAuth, { DefaultSession } from "next-auth";


// archivo de definición de typescript
declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            emailVerified?: boolean;
            role: string;
            image?: string;
        } & DefaultSession['user'] 
    }
}