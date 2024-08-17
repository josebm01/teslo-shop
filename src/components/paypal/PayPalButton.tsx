'use client'

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import React from 'react'

export const PayPalButton = () => {
  
  const [{ isPending }] = usePayPalScriptReducer()

  if ( isPending ){
    return(
      <div className='animate-pulse'>
        <div className='h-8 bg-gray-300 rounded' />
      </div>
    )
  }

  return (
    <PayPalButtons style={{ layout: "horizontal" }} />
  )
}
