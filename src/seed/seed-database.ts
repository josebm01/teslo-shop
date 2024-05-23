import { initialData } from "./seed"
import prisma from '../lib/prisma'

async function main() {

    //? 1.  Eliminar datos de la base de datos

    await Promise.all([
        prisma.productImage.deleteMany(),
        prisma.product.deleteMany(),
        prisma.category.deleteMany()
    ])

    const { categories, products } = initialData

    //? 2. Categorías
    // creando array de objetos con la categoría
     const catagoriesData = categories.map( category => ({
        name: category
     }))

     // insertando las categorías
     await prisma.category.createMany({
        data: catagoriesData
     })

     // obteniendo cateogorías de la db
     const categoriesDB = await prisma.category.findMany()

     // creando arreglo con los categorías
     const categoriesMap = categoriesDB.reduce( (map, category) => {
       
        map[ category.name.toLowerCase() ] = category.id
        
        return map
     }, {} as Record<string, string>)// <string=shirt, string=categoryId>



     //? 3. Insertando datos a la base de datos
     products.forEach( async (product) => {
        const { type, images, ...rest } = product

        // productos
        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        })

        // imágenes
        const imagesData = images.map( image => ({
            url: image,
            productId: dbProduct.id
        }))

        await prisma.productImage.createMany({
            data: imagesData
        })
         

     })
     
  
    console.log('seed ejecutado correctamente') 
}



(() => {
    if ( process.env.NODE_ENV === "production" ) return;

    main()
})()