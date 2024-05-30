import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";
import "./styless.css";

const Admin = () => {
    const { setIsAuthenticated } = useContext(ShopContext);
    const navigate = useNavigate();

    const handleManageUsers = () => {
        console.log("Managing users");
        navigate('/admin-users');
    };

    const handleViewReports = () => {
        console.log("Viewing reports");
        navigate('/admin-products');
    };

    const handleSettings = () => {
        console.log("Adjusting settings");
        navigate('/admin-settings');
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <button onClick={handleManageUsers}>Manage users</button>
            <button onClick={handleViewReports}>Manage products</button>
            <button onClick={handleSettings}>Settings</button>
        </div>
    );
};

export const AdminPage = () => {
    return (
        <div className="admin">
            <Admin />
        </div>
    );
};
