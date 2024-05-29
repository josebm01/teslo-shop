import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartProduct[];
    getTotalItems: () => number;
    addProductToCart: (product: CartProduct) => void;
    updateProductQuantity: (product: CartProduct, quantity: number) => void;
    removeProduct: ( product: CartProduct ) => void;
}


export const useCartStore = create<State>()( 

    // almacenar en el localstorage
    persist(
        (set, get) => ({
            cart: [],
            
            // Métodos
            //! obteniendo la cantidad de productos para el carrito
            getTotalItems: () => {
                const { cart } = get()
                return cart.reduce( ( total, item ) => total + item.quantity, 0 )
            },
            
            //! añadiendo productos al carrito
            addProductToCart: ( product: CartProduct ) => {
    
    
                // estado actual
                const { cart } = get()
    
    
                //* 1. revisar si el producto existe en el carrito con la talla seleccionada
                const productInCart = cart.some(
                    (item) => (item.id === product.id && item.size === product.size)
                )
    
                if ( !productInCart ) {
                    // agregando el nuevo producto
                    set({ cart: [ ...cart, product ]})
                    return 
                }
    
                //* 2. El producto existe por talla... incrementa el carrito 
                const updatedCartProducts = cart.map( (item) => {
                    if ( item.id === product.id && item.size === product.size ) {
                        // agregamos la cantidad de productos agregados actualmente y la nueva cantidad que se quiera agregar
                        return { ...item, quantity: item.quantity + product.quantity }
                    }
    
                    return item 
                })
    
                // nuevo valor del arreglo
                set({ cart: updatedCartProducts })
            },

            //! actualizando productos en el carrito
            updateProductQuantity: (product, quantity) => {
                const { cart } = get()

                const updatedCartProducts = cart.map( item => {
                    if ( item.id === product.id && item.size === product.size ) {
                        return { ...item, quantity: quantity }
                    }
                    return item 
                })

                set({ cart: updatedCartProducts })
            },

            //! eliminando productos del carrito
            removeProduct: ( product ) => {
                const { cart } = get()

                const updatedProducts = cart.filter( item => item.id !== product.id || item.size !== product.size )

                set({ cart: updatedProducts })
            }
        })
        ,
        {
            name: 'shopping-cart' // nombre que tendrá en localstorage
        }
    )

)