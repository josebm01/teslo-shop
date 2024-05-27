export const revalidate = 10080 // revalidar cada 7 días

import { notFound } from "next/navigation";
import { titleFont } from "@/config/fonts";
import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { getProductBySlug } from "@/actions";
import type { Metadata, ResolvingMetadata } from 'next'

interface Props {
    params: {
        slug: string;
    }
}




export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const slug = params.slug

  // fetch data
  const product = await getProductBySlug(slug)

  // optionally access and extend (rather than replace) parent metadata
//   const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
        title: product?.title ?? 'Producto no encontrado',
        description: product?.description ?? '',
        images: [`/products/${product?.images[1]}`],
    },
  }
}




export default async function({ params }: Props) {

    const { slug } = params
    const product = await getProductBySlug(slug)

    if ( !product ) {
        notFound()
    }

    return (
        <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

            {/* Slideshow - images */}
            {/* Mobile slideshow */}
            <div className="col-span-1 md:col-span-2">
                <ProductMobileSlideshow
                    title={ product.title }
                    images={ product.images }
                    className="block md:hidden" // validando mostrar uno u otro slider, en la pantalla normal y pantallas pequeñas
                />
            </div>

            {/* Desktop slideshow */}
            <div className="col-span-1 md:col-span-2">
                <ProductSlideshow
                    title={ product.title }
                    images={ product.images }
                    className="hidden md:block" // validando mostrar uno u otro slider, en la pantalla normal y pantallas pequeñas
                />
            </div>


            {/* Detalles */}
            <div className="col-span-1 px-5">

                <StockLabel slug={slug} />

                <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
                    { product.title }
                </h1>
                <p className="text-lg mb-5">${ product.price }</p>

                {/* Selector de tallas */}
                <SizeSelector
                    selectedSize={ product.sizes[0] }
                    availableSizes={ product.sizes }
                />

                {/* Selector de cantidad */}
                <QuantitySelector
                    quantity={2}
                />


                {/* Button */}
                <button className="btn-primary my-5">
                    Agregar al carrito
                </button>
                <h3 className="font-bold text-sm">Descripción</h3>
                <p className="font-light">
                    { product.description }
                </p>
            </div>
        </div>
    )
}