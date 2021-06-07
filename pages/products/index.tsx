import Link from "next/link";
import React from "react";
import { Product as ShopifyProduct } from "shopify-buy";
import { client } from "@/utils/shopify";
import Head from "next/head";
import ProductCard from "@/components/ProductCard";
type Props = {
    shp_products: ShopifyProduct[];
};

export const getStaticProps = async () => {
    const products: ShopifyProduct[] = await client.product.fetchAll();

    return {
        props: {
            shp_products: JSON.parse(
                JSON.stringify(products)
            ) as ShopifyProduct[],
        },
        revalidate: 120,
    };
};
const Product: React.FC<Props> = ({ shp_products }) => {
    return (
        <>
            <Head>
                <title>Product list</title>
                <meta name="description" content="A list of product" />
            </Head>
            <div className="grid grid-cols-4 gap-4 p-8">
                {shp_products.map(shp_product => {
                    return (
                        <Link
                            href={`/products/${shp_product.id}`}
                            key={shp_product.id}
                        >
                            <a>
                                <ProductCard product={shp_product} />
                            </a>
                        </Link>
                    );
                })}
            </div>
        </>
    );
};

export default Product;
