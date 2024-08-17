'use client'

import { SessionProvider } from "next-auth/react"

interface Props {
    children: React.ReactNode;
}


// Provider para manejar la sesión del usuario
export const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
        { children }
    </SessionProvider>
  )
}
