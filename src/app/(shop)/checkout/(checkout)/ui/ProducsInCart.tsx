'use client'

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { ProductImage } from "@/components";

export const ProducsInCart = () => {

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
            src={`/products/${product.image}`}
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
         
            <span>
                {product.size} - {product.title} 
            </span>
            <p>
              Cantidad: {product.quantity}
            </p>
            <p className="font-bold">{ currencyFormat(product.price * product.quantity) }</p>
            
          </div>
        </div>
      ))}
    </>
  );
};
