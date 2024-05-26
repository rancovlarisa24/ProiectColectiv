import { ReactNode, createContext, useEffect, useState } from "react";
import { useGetProducts } from "../hooks/useGetProducts";
import { IProduct } from "../models/interfaces";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ProductErrors } from "../models/errors";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useGetToken } from "../hooks/useGetToken";

 interface CheckoutResult {
    success: boolean;
    errorMessage?: string; 
  }
export interface IShopContext {
  getCartItemCount: (itemId: string) => number;
  addToCart: (itemId: string) => void;
  updateCartItemCount: (newAmount: number, itemId: string) => void;
  getTotalCartAmount: () => number;
  removeFromCart: (itemId: string) => void;
  checkout: (customerID: string) => Promise<CheckoutResult>;
  availableMoney: number;
  fetchAvailableMoney: () => void;
  purchasedItems: IProduct[];
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isAdmin: boolean;
  isSupplier: boolean;
 
}

export const ShopContext = createContext<IShopContext | null>(null);

export const ShopContextProvider = (props) => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [cartItems, setCartItems] = useState<{ string: number } | {}>({}); 
  const [availableMoney, setAvailableMoney] = useState<number>(0);
  const [purchasedItems, setPurchaseItems] = useState<IProduct[]>([]); 
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    cookies.access_token !== undefined
  );

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isSupplier, setIsSupplier] = useState<boolean>(false);

  const { products, fetchProducts } = useGetProducts();
  const { headers } = useGetToken();
  const navigate = useNavigate();

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    setIsAdmin(userID === "admin");  
    setIsSupplier(userID === "supplier");
  }, [isAuthenticated]);
  const fetchAvailableMoney = async () => {
    const res = await axios.get(
      `http://localhost:3001/auth/available-money/${localStorage.getItem(
        "userID"
      )}`,
      { headers }
    );
    setAvailableMoney(res.data.availableMoney);
  };

  const fetchPurchasedItems = async () => {
    const res = await axios.get(
      `http://localhost:3001/products/purchased-items/${localStorage.getItem(
        "userID"
      )}`,
      { headers }
    );

    setPurchaseItems(res.data.purchasedItems);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAvailableMoney();
      fetchPurchasedItems();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.clear();
      setCookies("access_token", null);
    }
  }, [isAuthenticated]);

  const getCartItemCount = (itemId: string): number => {
    if (itemId in cartItems) {
      return cartItems[itemId];
    }

    return 0;
  };

  const getTotalCartAmount = () => {
    if (products.length === 0) return 0;

    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo: IProduct = products.find(
          (product) => product._id === item
        );

        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return Number(totalAmount.toFixed(2));
  };

  const addToCart = (itemId: string) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId: string) => {
    if (!cartItems[itemId]) return;
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemCount = (newAmount: number, itemId: string) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };


 
  
  const checkout = async ():  Promise<CheckoutResult> => {
    const body = { customerID: localStorage.getItem("userID"), cartItems };
    try {
      const res = await axios.post("http://localhost:3001/products/checkout", body, { headers });
      setPurchaseItems(res.data.purchasedItems);
      fetchAvailableMoney();
      fetchProducts();
      return { success: true };  
    } catch (err) {
      let errorMessage = "Something went wrong"; 
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      }
  
      switch (err.response.data.type) {
        case ProductErrors.NO_PRODUCT_FOUND:
          errorMessage = "No product found";
          break;
        case ProductErrors.NO_AVAILABLE_MONEY:
          errorMessage = "Not enough money";
          break;
        case ProductErrors.NOT_ENOUGH_STOCK:
          errorMessage = "Not enough stock";
          break;
        default:
          break; 
      }
  
      alert(errorMessage); 
      return { success: false, errorMessage };  
    }
  };

  const contextValue: IShopContext = {
    getCartItemCount,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
    availableMoney,
    fetchAvailableMoney,
    purchasedItems,
    isAuthenticated,
    setIsAuthenticated,
    isAdmin,
    isSupplier

  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};


