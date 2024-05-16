import React, { useContext, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { UserErrors } from "../../models/errors";
import { IShopContext, ShopContext } from "../../context/shop-context";

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

    // Special handling for admin credentials
    if (username === "admin" && password === "admin") {
      setCookies("access_token", "fake-admin-token", { path: '/' }); // Simulate admin login
      localStorage.setItem("userID", "admin"); // Set user ID as admin
      setIsAuthenticated(true); // Set authenticated state to true
      navigate("/admin"); // Navigate to the admin dashboard
      return; 
    }

    // Normal user login attempt
    try {
      const result = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });

      setCookies("access_token", result.data.token, { path: '/' });
      localStorage.setItem("userID", result.data.userID);
      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      let errorMessage = "Something went wrong";
      if (err.response && err.response.data) {
        switch (err.response.data.type) {
          case UserErrors.USERNAME_ALREADY_EXISTS:
            errorMessage = "User already exists";
            break;
          case UserErrors.WRONG_CREDENTIALS:
            errorMessage = "Wrong username/password combination";
            break;
          default:
            errorMessage = "An unexpected error occurred";
            break;
        }
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
          <input
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
