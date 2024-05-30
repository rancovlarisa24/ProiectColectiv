import React, { useState, useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { useNavigate } from "react-router-dom";
import "./styless.css";

export const AddMoneyPage = () => {
  const [amount, setAmount] = useState<string>('');
  const navigate = useNavigate();
  const { addMoneyToBalance } = useContext(ShopContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const amountNumber = parseFloat(amount); 
    if (!isNaN(amountNumber) && amountNumber > 0) {
      addMoneyToBalance(amountNumber);
      setAmount('');
    } else {
      alert("Please enter a valid amount");
    }
  };

  return (
    <div className="addMoney">
      <h1>Add your money</h1>
      <div className="auth-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>
          <div className="form-group">
            <label htmlFor="beneficiaryName">Beneficiary Name:</label>
            <input
              type="text"
              id="beneficiaryName"
              
              placeholder="Enter beneficiary name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="iban">IBAN:</label>
            <input
              type="text"
              id="iban"
              
              placeholder="Enter Card Number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
             
              placeholder="Enter CVV"
            />
          </div>
          <button type="submit" className="b">Add Money</button>
        </form>
      </div>
    </div>
  );
};
