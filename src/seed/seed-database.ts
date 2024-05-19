import { initialData } from "./seed"
import prisma from '../lib/prisma'

async function main() {

    //1.  Eliminar datos de la base de datos

    await Promise.all([
        prisma.productImage.deleteMany(),
        prisma.product.deleteMany(),
        prisma.category.deleteMany()
    ])

    const { categories, products } = initialData

    //2. Categorías
    // creando array de objetos con la categoría
     const catagoriesData = categories.map( category => ({
        name: category
     }))

     // insertando las categorías
     await prisma.category.createMany({
        data: catagoriesData
     })

    console.log('seed ejecutado correctamente')
}



(() => {
    if ( process.env.NODE_ENV === "production" ) return;

    main()
})()