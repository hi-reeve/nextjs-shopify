import React from "react";
import style from "@/components/ProductCard.module.scss";
import Image from "next/image";
type Props = {
    product: ShopifyBuy.Product;
};
const ProductCard: React.FC<Props> = ({ product }) => {
    return (
        <div className={style.product}>
            <Image
                className={style.product__image}
                src={
                    product.images.length > 0
                        ? product.images[0].src
                        : "https://via.placeholder.com/300"
                }
                width={300}
                height={300}
                layout="responsive"
                alt={product.title}
            />
            <p className={style.product__title}>{product.title}</p>
            <p className={style.product__price}>
                {(+product.variants[0].price).toLocaleString("id-ID", {
                    currency: "IDR",
                    style: "currency",
                })}
            </p>
        </div>
    );
};

export default ProductCard;
