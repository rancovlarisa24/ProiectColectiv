import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.css";

export const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { products, totalAmount = 0, shippingFee = 10 } = location.state || {};

  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    if (products && products.length > 0 && totalAmount !== undefined && shippingFee !== undefined) {
      setGrandTotal(totalAmount + shippingFee);
    } else {
    
      console.error("Required data is missing");
      navigate("/cart"); 
    }
  }, [totalAmount, shippingFee, products, navigate]);

  if (!products || products.length === 0) {
    return <p>No products found. Please check your cart.</p>;
  }

  return (
    <div className="invoice">
      <h1 className="invoice-title">Order Confirmation</h1>
      <div className="invoice-details">
        <h2></h2>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              {product.name} - ${product.price} x {product.quantity}
            </li>
          ))}
        </ul>
        <p>Subtotal: ${totalAmount.toFixed(2)}</p>
        <p>Shipping Fee: ${shippingFee.toFixed(2)}</p>
        <p><strong>Total: ${grandTotal.toFixed(2)}</strong></p>
      </div>
      <div className="payment-confirmation">
        <p>Your payment has been successfully processed.</p>
        <p>Thank you for your purchase!</p>
      </div>
    </div>
  );
};
