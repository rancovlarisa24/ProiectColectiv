import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { IShopContext, ShopContext } from "../context/shop-context";

export const Navbar = () => {
  const { availableMoney, isAuthenticated, setIsAuthenticated, isAdmin, isSupplier} =
    useContext<IShopContext>(ShopContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/auth");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbarTitle">
        <span style={{ fontSize: '30px', textAlign: 'left' }}>iTech</span>
        <span><img src="/technology.png" alt="iTech Logo" style={{ width: '8%', marginRight: '100px' }} /></span>
      </div>
      <div className="navbarLinks">
        {!isAuthenticated ? (
          <Link to="/auth" onClick={handleLogin}>Login</Link>
        ) : isAdmin ? (
          <Link to="/" onClick={handleLogout}>Logout</Link>
        ) : isSupplier ?(
          <Link to="/" onClick={handleLogout}>Logout</Link>
        ) :
        
        (
          <>
            <Link to="/shop">Shop</Link>
            <Link to="/purchased-items">Purchases</Link>
            <Link to="/"><span> ${availableMoney.toFixed(2)} </span></Link>
            <Link to="/checkout">
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
            <Link to="/" onClick={handleLogout}>Logout</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
