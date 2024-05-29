import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ShopPage } from "./pages/shop";
import { CheckoutPage } from "./pages/checkout";
import { ShopContextProvider } from "./context/shop-context";
import { Navbar } from "./components/navbar";
import { PurchasedItemsPage } from "./pages/purchased-items";
import Home  from "./components/Home";
import { AuthPage } from "./pages/login";
import { RegPage } from "./pages/auth";
import { AdminPage } from "./pages/admin";
import { SupplierPage } from "./pages/supplier";
import { ConfirmationPage } from "./pages/confirmation";
import { AddMoneyPage } from "./pages/addMoney";

function App() {
  return (
    <div className="App">
      <Router>
        <ShopContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/reg" element={<RegPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/purchased-items" element={<PurchasedItemsPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/supplier" element={<SupplierPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/addMoney" element={<AddMoneyPage />} />
          </Routes>
        </ShopContextProvider>
      </Router>
    </div>
  );
}

export default App;
