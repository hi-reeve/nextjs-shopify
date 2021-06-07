import { client } from "@/utils/shopify";
import { NextPageContext } from "next";
import Head from "next/head";
import React from "react";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
export async function getStaticProps(ctx: NextPageContext) {
    const collections: ShopifyBuy.Collection[] =
        await client.collection.fetchAll();
    const products = await client.product.fetchAll();
    return {
        props: {
            collections: JSON.parse(JSON.stringify(collections)),
            products: JSON.parse(JSON.stringify(products)),
        },
    };
}
type Props = {
    collections: ShopifyBuy.Collection[];
    products: ShopifyBuy.Product[];
};
const Home: React.FC<Props> = ({ collections, products }) => {
    const homeBanner = collections.find(
        collection => collection.handle === "home-banner"
    );
    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="description" content="Home" />
            </Head>
            <div className="p-8">
                <div className="max-h-[500px] overflow-hidden">
                    {homeBanner && (
                        <Image
                            className="object-cover"
                            layout="responsive"
                            width={1920}
                            height={1080}
                            alt="Home banner"
                            src={homeBanner.image.src}
                        />
                    )}
                </div>
                <h1 className="font-bold text-3xl my-5">Checkout our collections</h1>
                <div className="grid grid-cols-4 gap-4 ">
                    {products &&
                        products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                </div>
            </div>
        </>
    );
};

export default Home;
