'use client'

import { PayPalButtons } from '@paypal/react-paypal-js'
import React from 'react'

export const PayPalButton = () => {
  return (
    <PayPalButtons style={{ layout: "horizontal" }} />
    )
}
