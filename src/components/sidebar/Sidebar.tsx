'use client'

import { logout } from "@/actions"
import { useStore } from "@/store"
import clsx from "clsx"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"

export const Sidebar = () => {

    // estados de zustad
    const isSideMenuOpen = useStore( state => state.isSideMenuOpen )
    const closeMenu = useStore( state => state.closeSideMenu )

    // hook
    const { data: session } = useSession()

    // convirtiendo a valor boolean 
    const isAuthenticated = !!session?.user
    const isAdmin = ( session?.user.role === 'admin' )


    const Logout = async () => {
        await logout()
        window.location.replace('/')
    }


  return (
    <div>
        {/* Background */}
        {
            isSideMenuOpen && (
                <>
                    <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
                    <div onClick={ closeMenu } className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm" />
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
                onClick={ () => closeMenu() }
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
            {
                isAuthenticated && (
                    <>
                        <Link
                            href='/profile'
                            onClick={ () => closeMenu() }
                            className="flex items-center mt-1 p-2 hover:bg-gray-200 rounded transition-all"
                        >
                            <IoPersonOutline size={25}/>
                            <span className="ml-3 text-md">Perfil</span>            
                        </Link>

                        <Link
                            href='/orders'
                            onClick={ () => closeMenu() }
                            className="flex items-center mt-1 p-2 hover:bg-gray-200 rounded transition-all"
                        >
                            <IoTicketOutline size={25}/>
                            <span className="ml-3 text-md">Ordenes</span>            
                        </Link>
                    </>
                )
            }

            {
                isAuthenticated && (
                    <button
                        className="flex w-full items-center mt-10 p-2 hover:bg-gray-200 rounded transition-all text-red-500"
                        onClick={() => Logout()}
                    >
                        <IoLogOutOutline size={30} />
                        <span className="ml-3 text-xl text-red-500">Salir</span>
                    </button>
                )
            }


            {
                !isAuthenticated && (
                    <Link
                        href='/auth/login'
                        className="flex items-center mt-1 p-2 hover:bg-gray-200 rounded transition-all"
                        onClick={ () => closeMenu() }
                    >
                        <IoLogInOutline size={25}/>
                        <span className="ml-3 text-md">Ingresar</span>            
                    </Link>
                )        
            }

            {
                isAdmin && (
                    <>          
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
                            href='/admin/orders'
                            onClick={ () => closeMenu() }
                            className="flex items-center mt-1 p-2 hover:bg-gray-200 rounded transition-all"
                        >
                            <IoTicketOutline size={25}/>
                            <span className="ml-3 text-md">Ordenes</span>            
                        </Link>

                        <Link
                            href='/admin/users'
                            onClick={ () => closeMenu() }
                            className="flex items-center mt-1 p-2 hover:bg-gray-200 rounded transition-all"
                        >
                            <IoPeopleOutline size={25}/>
                            <span className="ml-3 text-md">Usuarios</span>            
                        </Link>
                    </>
                )
            }


        </nav>

    </div>
  )
}
