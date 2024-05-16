import React, { useContext, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { UserErrors } from "../../models/errors";
import { IShopContext, ShopContext } from "../../context/shop-context";
import { RegPage } from "../auth";

export const AuthPage = () => {
  return (
    <div className="auth">
      <Login />
    </div>
  );
};

const Login = () => {
  const [_, setCookies] = useCookies(["access_token"]);
  const { setIsAuthenticated } = useContext<IShopContext>(ShopContext);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });
      
      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      let errorMessage: string = "";
      switch (err.response.data.type) {
        case UserErrors.USERNAME_ALREADY_EXISTS:
          errorMessage = "User already exists";
          break;
        case UserErrors.WRONG_CREDENTIALS:
          errorMessage = "Wrong username/password combination";
          break;
        default:
          errorMessage = "Something went wrong";
      }

      alert("ERROR: " + errorMessage);
    }
  };

  const handleRegister = () => {
    navigate("/reg"); 
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input className="id"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" className="b">Login</button>
        <button type="button" className="b" onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
};
