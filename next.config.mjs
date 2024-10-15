/** @type {import('next').NextConfig} */
const nextConfig = {
    //! Configuración ncesaria para cargar imágenes a cloudinary
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            }   
        ]
    }
};

export default nextConfig;
