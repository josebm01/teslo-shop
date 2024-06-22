import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/config/fonts";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { Provider } from "@/components";


export const metadata: Metadata = {
  title: {
    template: '%s - Teslo | Shop', // mostrará lo que tenga primero y después lo que especificamos
    default: 'Home - Teslo | Shop'
  },
  description: "Una tienda virtual de productos",
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  // const session = await auth()

  // if ( session?.user ){
  //   redirect('/')    
  // }


  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
