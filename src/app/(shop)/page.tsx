export const revalidate = 60 // segundos

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";


interface Props {
  searchParams: {
    page?: string;
  }
}


export default async function Home({ searchParams }: Props ) {

  // si el parámetro es una letra entonces tomará la página 1 
  const page = searchParams.page ? parseInt( searchParams.page ) : 1

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page });

  // si se agrega una página que no existe entonces redirecciona a la página principal
  if ( products.length === 0 ) {
    redirect('/')
  }

  return (
    <>
      <Title 
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"
        />

        <ProductGrid products={products} /> 

        <Pagination totalPages={ totalPages } />

    </>
  );
}
