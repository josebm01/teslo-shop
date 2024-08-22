'use client'

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { CreateOrderData, CreateOrderActions } from '@paypal/paypal-js'
import React from 'react'
import { setTransactionId } from '@/actions';

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ orderId, amount }: Props) => {
  
  const [{ isPending }] = usePayPalScriptReducer()

  // Número con dos decimales
  const rountedAmount = (Math.round( amount * 100 ) )/ 100

  if ( isPending ){
    return(
      <div className='animate-pulse mb-16'>
        <div className='h-12 bg-gray-300 rounded' />
        <div className='h-11 bg-gray-300 rounded mt-3' />
      </div>
    )
  }

  // Generar el ID de la transacción
  const createOrder = async( data: CreateOrderData, actions: CreateOrderActions ): Promise<string> => {

    const transactionId = await actions.order.create({
      purchase_units: [
        {
          amount: {
            value: `${rountedAmount}`
          }
        }
      ]
    })

    const { ok } = await setTransactionId( orderId, transactionId )

    if ( !ok ) {
      throw new Error('No se puede actualizar la orden')
    }

    return transactionId
  }

  return (
    <PayPalButtons 
      createOrder={ createOrder }
      // onApprove={}
    />
  )
}
