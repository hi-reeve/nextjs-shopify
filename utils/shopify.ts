import Client from "shopify-buy";

export const client = Client.buildClient({
    domain: process.env.NEXT_PUBLIC_STOREFRONT_DOMAIN as string,
    storefrontAccessToken: process.env.NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN as string,
});
