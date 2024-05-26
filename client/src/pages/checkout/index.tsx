import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";

import "./styles.css";
import { useGetProducts } from "../../hooks/useGetProducts";
import { IProduct } from "../../models/interfaces";

export const CheckoutPage = () => {
  const { getCartItemCount, getTotalCartAmount, checkout } =
    useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  const { products } = useGetProducts();

  const navigate = useNavigate();

  

  const handleCheckout = async () => {
    const result = await checkout(localStorage.getItem("userID"));
    if (!result.success) {
      console.log("Checkout failed with error:", result.errorMessage);
      return; // Exit the function if checkout fails
    }
    const purchasedProducts = products
  .filter(product => getCartItemCount(product._id) !== 0)
  .map(product => ({
    _id: product._id,
    name: product.productName, 
    price: product.price,
    quantity: getCartItemCount(product._id),
    imageURL: product.imageURL
  }));
    const randomShippingFee = 10

    console.log("Navigating to Confirmation with state:", {
        products: purchasedProducts,
        totalAmount,
        shippingFee: randomShippingFee
    });
    
    navigate("/confirmation", {
      state: {
        products: purchasedProducts,
        totalAmount,
        shippingEditShippingBtnFee: randomShippingFee
      }
    });
};


  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {products.map((product: IProduct) => {
          if (getCartItemCount(product._id) !== 0) {
            return <CartItem key={product._id} data={product} />;
          }
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p> Subtotal: ${totalAmount.toFixed(2)} </p>
          <button onClick={() => navigate("/")}> Continue Shopping </button>
          <button onClick={handleCheckout}> Checkout </button>
        </div>
      ) : (
        <h1> Your Shopping Cart is Empty</h1>
      )}
    </div>
  );
};
