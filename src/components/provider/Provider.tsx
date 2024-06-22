'use client'

import { SessionProvider } from "next-auth/react"

interface Props {
    children: React.ReactNode;
}


// Provider para manejar la sesisón del usuario
export const Provider = ({ children }: Props) => {
  return (
    <SessionProvider>
        { children }
    </SessionProvider>
  )
}
