import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {

    cart: CartProduct[];

    getTotalItems: () => number;
    getSummaryInformation: () => {
        subTotal: number;
        tax: number;
        total: number;
        itemsInCart: number;
    }

    addProducToCart: (product: CartProduct) => void;
    updateProductQuantity: (product: CartProduct, quantity: number) => void;
    removeProductCart: (product: CartProduct) => void;

}


export const useCartStore = create<State>()(

    persist(

        (set, get) => ({

            cart: [],

            //Methods
            getTotalItems: () => {
                const { cart } = get();
                return cart.reduce((total, item) => total + item.quantity, 0);
            },

            getSummaryInformation: () => {
                const { cart } = get();

                const subTotal = cart.reduce(
                    (subTotal, producto) => (producto.quantity * producto.price) + subTotal, 0
                );

                const tax = subTotal * 0.16;
                const total = subTotal + tax;
                const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

                return {
                    subTotal, tax, total, itemsInCart
                };

            },

            addProducToCart: (product: CartProduct) => {
                const { cart } = get();

                //1.- Revisar si el producto existe en el carrito con la talla
                const productInCart = cart.some(
                    (item) => (item.id === product.id && item.size === product.size)
                );

                if (!productInCart) {
                    set({ cart: [...cart, product] });
                    return;
                }

                //2.- Se que el producto existe por talla... tengo que incrementar
                const updatedCartProducts = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: item.quantity + product.quantity }
                    }
                    return item;
                });

                set({ cart: updatedCartProducts })
            },
            updateProductQuantity: (product: CartProduct, quantity: number) => {

                const { cart } = get();
                const updatedCartProducts = cart.map(item => {

                    if (item.id === product.id && item.size == product.size) {
                        return { ...item, quantity: quantity };
                    }
                    return item;
                })
                set({ cart: updatedCartProducts })
            },

            removeProductCart: (product: CartProduct) => {
                const { cart } = get();
                const updatedCartProducts = cart.filter(
                    (item) => item.id !== product.id || item.size !== product.size
                );

                set({ cart: updatedCartProducts });
            }
        }),
        {
            name: "shopping-cart",
        }
    )
)