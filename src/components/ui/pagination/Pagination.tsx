'use client'

import { generatePaginationNumbers } from '@/utils';
import clsx from 'clsx';
import Link from 'next/link';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import React from 'react'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

interface Props {
    totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {

    const pathname = usePathname()
    const searchParams = useSearchParams()

    // evaluando el parámetro de la página, si fueran caracteres
    const pageString = searchParams.get('page') ?? 1 
    const currentPage = isNaN( +pageString ) ? 1 : +pageString

    if ( currentPage < 1 || isNaN(+pageString) ) {
       redirect(pathname)
    }
    
    const allPages = generatePaginationNumbers(currentPage, totalPages)


    const createPageUrl = ( pageNumber: number | string ) => {

        const params = new URLSearchParams( searchParams )

        if ( pageNumber === '...' ) {
            return `${ pathname } ? ${params.toString()}`
        }

        if ( +pageNumber <= 0 ) {
            return `${pathname}` // href="/kid"
        }

        if ( +pageNumber > totalPages ) { // next >
            return `${pathname} ? ${params.toString()}`
        }

        params.set('page', pageNumber.toString())
        return `${pathname}?${params.toString()}`
        
    }


  return (
    <div className="flex text-center justify-center mt-10 mb-32">
        <nav aria-label="Page navigation example">
            <ul className="flex list-style-none">

            <li className="page-item">
                <Link
                    className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                    href={ createPageUrl( currentPage - 1 ) } aria-disabled="true"
                >
                    <IoChevronBackOutline size={30}/>
                </Link>
            </li>
            




aaaa
            {
                allPages.map( (page, index) => (
                    <li key={ index + '-' + index } className="page-item">
                        <a
                        className={
                            clsx(
                                "page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                               {
                                "bg-indigo-600 shadow-sm text-white hover:text-white hover:bg-indigo-500": page == currentPage,
                               }
                            )
                        }
                        href={ createPageUrl(page) }>{ page }</a>
                    </li>
                ))
            }


            
            <li className="page-item">
                <Link
                    className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                    href={ createPageUrl( currentPage + 1 ) }
                >
                     <IoChevronForwardOutline size={30}/>
                </Link>
            </li>
                
            </ul>
        </nav>
    </div>
  )
}
