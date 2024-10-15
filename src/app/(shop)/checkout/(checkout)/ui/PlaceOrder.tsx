"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useRouter } from "next/navigation";


export const PlaceOrder = () => {

  const router = useRouter()
  const [loaded, setLoaded] = useState( false )
  const [errorMessage, setErrorMessage] = useState( '' )
  const [ isPlacingOrder, setIsPlacingOrder ] = useState( false )

  const address = useAddressStore( state => state.address )
  const { itemsInCart, subTotal, tax, total } = useCartStore( state => state.getSummaryInformation() )

  // carrito de compras
  const cart = useCartStore( state => state.cart )
  const clearCart = useCartStore( state => state.clearCart )


  useEffect(() => {
    setLoaded( true )
  }, [])

  const onPlaceOrder = async () => {

    setIsPlacingOrder( true )

    // Datos que se enviarán al server action para la orden
    const productsToOrder = cart.map( ({ id, quantity, size }) => ({
      productId: id,
      quantity: quantity,
      size: size
    }))

    // Server action
    const res = await placeOrder( productsToOrder, address )
    console.log({ res })

    if ( !res.ok ) {
      setIsPlacingOrder( false )
      setErrorMessage( res.message )
      return
    }

    // Se registró OK
    // Limpiar carrito
    clearCart()

    // Redireccionar
    router.replace('/orders/' + res.order?.id)
    
  }


  if ( !loaded ) {
    return <p>Cargando...</p>
  }
  

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl font-bold mb-2">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl">{ address.firstName } { address.lastName }</p>
        <p>{ address.address }</p>
        <p>{ address.address2 }</p>
        <p>{ address.postalCode }</p>
        <p>{ address.city }, { address.country } </p>
        <p>{ address.phone }</p>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 bg-gray-200 rounded mb-10" />

      <h2 className="text-2xl mb-2">Resumen de orden</h2>
      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">{ itemsInCart === 1 ? '1 artículo' : `${ itemsInCart } artículos` }</span>
        
        <span>Subtotal</span>
        <span className="text-right">{ currencyFormat( subTotal ) }</span>

        <span>Impuestos (%16)</span>
        <span className="text-right">{ currencyFormat( tax ) }</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">{ currencyFormat( total ) }</span>
      </div>

      <div className="mt-5 mb-2 w-full">
        {/* Terminos y condiciones */}
        <p className="mb-5">
          <span className="text-xs">
            Al hacer clic en `&quot;`Colocar orden`&quot;`, aceptas nuestros{" "}
            <a href="#" className="underline text-blue-800">
              términos y condiciones
            </a>{" "}
            y{" "}
            <a href="" className="underline text-blue-800">
              política de privacidad
            </a>
          </span>
        </p>

        <p className="text-red-500">{ errorMessage }</p>

        <button 
            // href="/orders/123" 
            onClick={ onPlaceOrder }
            className={
              clsx({
                'btn-primary': !isPlacingOrder,
                'btn-disabled': isPlacingOrder,

              })
            }
        >
          Colocar orden
        </button>
      </div>
    </div>
  );
};
