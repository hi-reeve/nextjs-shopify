import { NextPageContext } from "next";
import React from "react";
import { client } from "@/utils/shopify";
import Image from "next/image";
import style from "@/pages/products/id.module.scss";
import Head from "next/head";
import { useRouter } from "next/dist/client/router";
type Props = {
    product: ShopifyBuy.Product;
};
export async function getServerSideProps({ query }: NextPageContext) {
    const prodId: string = query.id as string;

    const product: ShopifyBuy.Product = await client.product.fetch(prodId);

    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        },
    };
}

const ProductDetail: React.FC<Props> = ({ product }) => {
    const router = useRouter();
    const handleClickAddToCart = async () => {
        const checkout = await client.checkout.create();
        const itemToAdd: ShopifyBuy.LineItemToAdd[] = [
            {
                variantId: product.variants[0].id,
                quantity: 1,
            },
        ];
        if (checkout) {
            await client.checkout.addLineItems(checkout.id, itemToAdd);
            const cart = await client.checkout.fetch(checkout.id.toString());
            router.push(cart.webUrl);
        }
    };
    if (!product) return <p>Loading...</p>;

    return (
        <>
            <Head>
                <title>{product.title}</title>
                <meta name="description" content={product.description} />
            </Head>
            <div className="p-8 flex">
                <div className={style["product__image--wrapper"]}>
                    {product.images.length > 0 &&
                        product.images.map(image => {
                            return (
                                <Image
                                    key={image.id}
                                    className={style.product__image}
                                    src={
                                        image.src ??
                                        "https://via.placeholder.com/300"
                                    }
                                    width={300}
                                    height={300}
                                    layout="responsive"
                                    alt={product.title}
                                />
                            );
                        })}
                    {product.images.length === 0 && (
                        <Image
                            className={style.product__image}
                            src="https://via.placeholder.com/300"
                            width={300}
                            height={300}
                            layout="responsive"
                            alt={product.title}
                        />
                    )}
                </div>
                <div className="flex flex-col ml-8 flex-1">
                    <h1 className="text-xl font-bold">{product.title}</h1>
                    <p className="text-sm">{product.description}</p>
                    <p>
                        {(+product.variants[0].price).toLocaleString("id-ID", {
                            currency: "IDR",
                            style: "currency",
                        })}
                    </p>
                    <button
                        className="px-4 py-2 rounded text-white bg-blue-600"
                        onClick={handleClickAddToCart}
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
