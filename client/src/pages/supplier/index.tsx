import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";
import "./styles.css";

const Supplier = () => {
    const { setIsAuthenticated } = useContext(ShopContext);
    const navigate = useNavigate();

    

    return (
        <div className="admin-dashboard">
            <h1>Supplier Dashboard</h1>
            <button >Manage products</button>
           
        </div>
    );
};

export const SupplierPage = () => {
    return (
        <div className="supplier">
            <Supplier />
        </div>
    );
};
