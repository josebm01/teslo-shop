import { Title } from "@/components";
import Link from "next/link";
import { ProducsInCart } from "./ui/ProducsInCart";
import { PlaceOrder } from "./ui/PlaceOrder";



export default function() {
    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flexc flex-col w-[1000px]">
                <Title title="Verificar Orden" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {/* Carrito */}
                    <div className="flex flex-col mt-5">
                        <span className="text-xl">Ajustar elementos</span>
                        <Link href='/cart' className="underline mb-5">Editar Carrito</Link>

                        {/* Item del carrito */}
                        <ProducsInCart />
                    </div>

                    {/* Checkout - Resumen de compra */}
                    <PlaceOrder />
                </div>
            </div>
        </div>
    )
}