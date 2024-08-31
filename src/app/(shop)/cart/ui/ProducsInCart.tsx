'use client'

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ProductImage, QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Link from "next/link";
import { IoTrashBinOutline } from "react-icons/io5";

export const ProducsInCart = () => {

    const updateProductQuantity = useCartStore( state => state.updateProductQuantity )
    const removeProduct = useCartStore( state => state.removeProduct )

    const [loaded, setLoaded] = useState(false)
    const productsInCart = useCartStore( state => state.cart )


    useEffect(() => {
        setLoaded( true )
    }, [])
    

    if ( !loaded ) {
        return <p>loading...</p>
    }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <ProductImage
            src={product.image}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={product.title}
            className="mr-5 rounded"
          />
          <div>
         
            <Link
                className="hover:underline cursor-pointer" 
                href={ `/product/${ product.slug }` }
             >
                {product.size} - {product.title}
            </Link>
            <p className="font-bold">${product.price}</p>
            <QuantitySelector 
                quantity={ product.quantity } 
                onQuantityChanged={(quantity) => updateProductQuantity( product, quantity) }
            />

            <button 
                className='text-red-600 underline text-sm mt-2'
                onClick={ () => removeProduct( product ) }
            >Remover</button>

          </div>
        </div>
      ))}
    </>
  );
};
