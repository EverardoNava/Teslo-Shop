"use client";
import Link from 'next/link'

import { titleFont } from '@/config/fonts'
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'
import { useCartStore, useUIStore } from '@/store'
import { useEffect, useState } from 'react';

export const TopMenu = () => {

    const openMenu = useUIStore(state => state.openSideMenu);
    const totalItemsInCart = useCartStore(state => state.getTotalItems());
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, [])

    return (
        <nav className="flex px-5 justify-between items-center w-full">
            {/* Logo */}
            <div>
                <Link
                    href="/" >
                    <span className={`${titleFont.className} antialiased font-bold text-xl`}>Teslo</span>
                    <span className='text-lg'>| Shop</span>
                </Link>
            </div>

            {/* Center Menu */}

            <div className="hidden sm:block text-lg">
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/men">Hombres</Link>
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/women">Mujeres</Link>
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/kid">Niños</Link>
            </div>
            {/* Search, Cart, Menu */}
            <div className="flex items-center">
                <Link href="/search" className="mx-2">
                    <IoSearchOutline className="w-6 h-6" />
                </Link>
                <Link href={
                    ((totalItemsInCart === 0) && loaded)
                        ? "/empty"
                        : "/cart"}
                    className="mx-2">
                    <div className="relative">
                        {
                            (loaded && totalItemsInCart > 0) && (
                                <span className="fade-in absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
                                    {
                                        totalItemsInCart
                                    }
                                </span>

                            )
                        }
                        <IoCartOutline className="w-6 h-6" />
                    </div>
                </Link>

                <button
                    onClick={() => openMenu()}
                    className="m-2 p-2 text-lg rounded-md transition-all hover:bg-gray-100">
                    Menú
                </button>
            </div>
        </nav >
    )
}
