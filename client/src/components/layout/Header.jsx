import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import { useCart } from "../../context/Cart";
import { Badge } from "antd";
import logo from "../../assets/logo.png";
import "../../styles/Header.css";
import { MdOutlineShoppingCart } from "react-icons/md";
import GoogleTranslateWidget from "../../../src/GoogleTranslateWidget";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/login");
  };

  return (
  
    
     
      <nav className="custom-navbar">
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-section logo-section">
            <Link to="/" className="navbar-brand">
              <span className="navbar-title">
                <img className="img" src={logo} alt="Logo" />
                FARMNEST
              </span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="navbar-section search-section">
            <SearchInput />
          </div>

          {/* Right-side Links */}
          <div className="navbar-section links-section">
            <ul className="navbar-links">
              <li>
                <NavLink to="/recommend" className="nav-link">
                  Soil Monitoring
                </NavLink>
              </li>

              {!auth.user ? (
                <>
                  <li>
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-dropdown">
                  <span className="nav-link">
                    {auth?.user?.name || "Dashboard"}
                  </span>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="dropdown-item">
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              )}

              {/* Cart */}
              <li>
                <Badge
                  count={cart?.length}
                  offset={[0, 8]}
                  style={{ backgroundColor: "#f44336" }}
                >
                  <NavLink to="/cart" className="nav-link">
                    <MdOutlineShoppingCart />
                  </NavLink>
                </Badge>
              </li>

              {/* Google Translate */}
              <li className="nav-link google-translate-widget">
                <div className="google-translate-widget-container">
                  <GoogleTranslateWidget />
                </div>
              </li>
            </ul>
          </div>
        </div>

      </nav>
  
  );
};

export default Header;
  