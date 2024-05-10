'use client'

import { useStore } from "@/store"
import clsx from "clsx"
import Link from "next/link"
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"

export const Sidebar = () => {

    const isSideMenuOpen = useStore( state => state.isSideMenuOpen )
    const closeMenuOpen = useStore( state => state.closeSideMenu )

  return (
    <div>
        {/* Background */}
        {
            isSideMenuOpen && (
                <>
                    <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
                    <div onClick={ closeMenuOpen } className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm" />
                </>
            )
        }

        {/* Blur */}

        {/* Sidemenu */}
        
        <nav className={ 
            clsx("fixed p-5 right-0 top-0 w-[400px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
                {
                    "translate-x-full": !isSideMenuOpen //! añadiendo clase condicional
                }
            )
        }>
            <IoCloseOutline
                size={ 30 }
                className="absolute top-5 right-5 cursor-pointer"
                onClick={ closeMenuOpen }
            />

            {/* Input  */}
            <div className="relative mt-14">
                <IoSearchOutline size={20} className="absolute top-2 left-2" />
                <input 
                    type="text" 
                    placeholder="Buscar"
                    className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
                />
            </div>

            {/* Menu */}
            <Link
                href='/'
                className="flex items-center mt-1 p-2 hover:bg-gray-200 rounded transition-all"
            >
                <IoPersonOutline size={25}/>
                <span className="ml-3 text-md">Perfil</span>            
            </Link>

            <Link
                href='/'
                className="flex items-center mt-1 p-2 hover:bg-gray-200 rounded transition-all"
            >
                <IoTicketOutline size={25}/>
                <span className="ml-3 text-md">Ordenes</span>            
            </Link>

            <Link
                href='/'
                className="flex items-center mt-1 p-2 hover:bg-gray-200 rounded transition-all"
            >
                <IoLogInOutline size={25}/>
                <span className="ml-3 text-md">Ingresar</span>            
            </Link>

            <Link
                href='/'
                className="flex items-center mt-1 p-2 hover:bg-gray-200 rounded transition-all"
            >
                <IoLogOutOutline size={25}/>
                <span className="ml-3 text-md">Salir</span>            
            </Link>

            {/* Line separator */}
            <div className="w-full h-px bg-gray-200 my-10" />

            <Link
                href='/'
                className="flex items-center mt-1 p-2 hover:bg-gray-200 rounded transition-all"
            >
                <IoShirtOutline size={25}/>
                <span className="ml-3 text-md">Productos</span>            
            </Link>

            <Link
                href='/'
                className="flex items-center mt-1 p-2 hover:bg-gray-200 rounded transition-all"
            >
                <IoTicketOutline size={25}/>
                <span className="ml-3 text-md">Ordenes</span>            
            </Link>

            <Link
                href='/'
                className="flex items-center mt-1 p-2 hover:bg-gray-200 rounded transition-all"
            >
                <IoPeopleOutline size={25}/>
                <span className="ml-3 text-md">Usuarios</span>            
            </Link>

        </nav>

    </div>
  )
}
