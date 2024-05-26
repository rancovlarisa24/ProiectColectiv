import React, { useContext } from "react";
import { ShopContext } from "../context/shop-context";
import { IProduct } from "../models/interfaces";

interface Props {
  product: IProduct;
}

export const Product = (props: Props) => {
  const { _id, productName, description, price, stockQuantity, imageURL } =
    props.product;
  const { addToCart, getCartItemCount } = useContext(ShopContext);

  const cartItemCount = getCartItemCount(_id);

  return (
    <div className="product">
      <img src={imageURL} />
      <div className="description">
        <h3>{productName}</h3>
        <p>{description}</p>
        <p> ${price}</p>
      </div>
      
      
    </div>
  );
};