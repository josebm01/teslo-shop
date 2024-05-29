import { Title } from "@/components";
import Link from "next/link";
import { ProducsInCart } from "./ui/ProducsInCart";


export default function() {

    // redirect('/empty')

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flexc flex-col w-[1000px]">
                <Title title="Carrito" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {/* Carrito */}
                    <div className="flex flex-col mt-5">
                        <span className="text-xl">Agregar más productos</span>
                        <Link href='/' className="underline mb-5">Continúa comprando</Link>

                        {/* Item del carrito */}
                        <ProducsInCart />

                    </div>


                    {/* Checkout - Resumen de compra */}
                    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
                        <h2 className="text-2xl mb-2">Resumen de orden</h2>
                        <div className="grid grid-cols-2">
                            <span>No. Productos</span>
                            <span className="text-right">3 artículos</span>
                            
                            <span>Subtotal</span>
                            <span className="text-right">$ 100</span>

                            <span>Impuestos (%16)</span>
                            <span className="text-right">$ 100</span>

                            <span className="mt-5 text-2xl">Total:</span>
                            <span className="mt-5 text-2xl text-right">$ 100</span>
                        </div>

                        <div className="mt-5 mb-2 w-full">   
                            <Link 
                                href='/checkout/address'
                                className="flex btn-primary justify-center"
                            >
                                Checkout
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}