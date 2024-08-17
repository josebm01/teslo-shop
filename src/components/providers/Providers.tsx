'use client'

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SessionProvider } from "next-auth/react"

interface Props {
    children: React.ReactNode;
}


// Provider para manejar la sesión del usuario
export const Providers = ({ children }: Props) => {

  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '', 
    intent: 'capture',
    currency: 'USD'
  }

  return (
    <PayPalScriptProvider options={ initialOptions } >
      <SessionProvider>
          { children }
      </SessionProvider>
    </PayPalScriptProvider>
  )
}
