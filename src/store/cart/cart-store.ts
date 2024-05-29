import type { CartProduct } from "@/interfaces";
import { create } from "zustand";

interface State {
    cart: CartProduct[];
    addProductToCart: (product: CartProduct) => void;
}


export const useCartStore = create<State>()( 
    (set, get) => ({
        cart: [],
        
        // Métodos
        addProductToCart: ( product: CartProduct ) => {


            // estado actual
            const { cart } = get()

            console.log( cart )

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
        }
    })
)