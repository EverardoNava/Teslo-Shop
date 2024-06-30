import { ProductMovileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
    params: {
        slug: string;
    }
}


export default function Page({ params }: Props) {

    const { slug } = params;
    const product = initialData.products.find(product => product.slug === slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3 ">

            {/* Slideshow */}
            <div className="col-span-1 md:col-span-2">

                {/* Movile Slideshow */}
                <ProductMovileSlideshow
                    title={product.title} images={product.images}
                    className="block md:hidden"
                />

                {/* Descktop Slideshow */}
                <ProductSlideshow
                    title={product.title} images={product.images}
                    className="md:block hidden"
                />
            </div>

            {/* Detalles */}
            <div className="col-span-1 px-5">
                <h1 className={`${titleFont.className} antialiased text-xl`}>
                    {product.title}
                </h1>
                <p className="text-ls mb-5">${product.price}</p>

                {/* selector de tallas */}
                <SizeSelector
                    selectedSize={product.sizes[0]}
                    availableSizes={product.sizes}
                />

                {/* Selector de cantidad */}
                <QuantitySelector
                    quantity={1}
                />

                {/* botton */}
                <button className="btn-primary my-5 rounded-lg">
                    Agregar al carrito
                </button>

                {/* Descripcion */}
                <h3 className="font-bold text-sm">Descripcion</h3>
                <p className="font-light">
                    {product.description}
                </p>
            </div>

        </div>
    );
}