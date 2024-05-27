export const revalidate = 60 // segundos

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";


interface Props {
    params: {
        gender: string;
    },
    searchParams: {
        page?: string;
    }
}

export default async function({ params, searchParams }: Props) {

    console.log( params )

    const { gender } = params 

    // si el parámetro es una letra entonces tomará la página 1 
    const page = searchParams.page ? parseInt( searchParams.page ) : 1

    const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ 
        page, 
        gender: gender as Gender,
    });

    // si se agrega una página que no existe entonces redirecciona a la página principal
    if ( products.length === 0 ) {
        redirect(`/gender/${gender}`)
    }


    // Record - tipo de dato de TypeScript para objetos
    const labels: Record<string, string> = {
        'men': 'Hombres',
        'women': 'Mujeres',
        'kid': 'Niños',
        'unisex': 'todos'
    }

    // if ( id === "kids" ){
    //     notFound()
    // }

    return (
        <>
            <Title 
                title={`Artículos para ${(labels)[gender]}`}
                subtitle="Todos los productos"
                className="mb-2"
            />

            <ProductGrid products={ products }/>

            <Pagination totalPages={totalPages} />
        </>
    )
}