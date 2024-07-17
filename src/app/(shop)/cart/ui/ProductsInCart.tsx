"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store";
import { QuantitySelector } from "@/components";
import Link from "next/link";


export const ProductsInCart = () => {

    const updateProductQuantity = useCartStore(state => state.updateProductQuantity)
    const removeProduct = useCartStore(state => state.removeProductCart)
    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore(state => state.cart);


    useEffect(() => {
        setLoaded(true);
    }, [])


    if (!loaded) {
        return <p>Loading...</p>
    }

    return (
        <>
            {/* Items */}
            {
                productsInCart.map(product => (
                    <div key={`${product.slug}-${product.size}`} className="flex mb-5">
                        <Image
                            src={`/products/${product.image}`}
                            width={100}
                            height={100}
                            style={{
                                width: "100px",
                                height: "100px",
                            }}
                            alt={product.title}
                            className="mr-5 rounded-none"
                        />
                        <div>
                            <Link
                                className="hover:underline cursor-pointer"
                                href={`/product/${product.slug}`}
                            >
                                {product.size} - {product.title}
                            </Link>
                            <p>${product.price}</p>
                            <QuantitySelector
                                quantity={product.quantity}
                                onQuantityChanged={quantity => updateProductQuantity(product, quantity)}
                            />
                            <button
                                onClick={() => removeProduct(product)}
                                className="mt-3 py-1 px-2 border-2 font-semibold bg-red-500 rounded-md text-white hover:bg-red-700">
                                Remover
                            </button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
