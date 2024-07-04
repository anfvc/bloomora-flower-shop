import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo/bloomoraV2.svg";
import scrolledLogo from "../../images/logo/bloomoraV3.svg";
import { AiOutlineUser } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { PiShoppingBag } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import "./Navbar.css";
import Login from "../Login/Login";
import Register from "../Register/Register";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle("menu-open", !isMenuOpen);
  };

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const openRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const closeModals = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  return (
    <>
      <div
        className={isMenuOpen ? "overlay active" : "overlay"}
        onClick={toggleMenu}
      ></div>
      <div className={`navbarContainer ${scrolled ? "scrolled" : ""}`}>
        <div className="logo">
          <NavLink to="/">
            <img
              src={scrolled ? scrolledLogo : logo}
              alt="logo"
              className="navbar-logo"
            />
          </NavLink>
        </div>
        <div className="links-icons">
          <div className="links">
            <ul>
              <li>
                <NavLink to="/" className={scrolled ? "scrolled" : ""}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={scrolled ? "scrolled" : ""}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop" className={scrolled ? "scrolled" : ""}>
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink to="/blog" className={scrolled ? "scrolled" : ""}>
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={scrolled ? "scrolled" : ""}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="user-cart-search">
            <AiOutlineUser
              className={`user ${scrolled ? "scrolled-icon" : ""}`}
              onClick={openLogin}
            />
            <FiSearch className={`search ${scrolled ? "scrolled-icon" : ""}`} />
            <PiShoppingBag
              className={`cart ${scrolled ? "scrolled-icon" : ""}`}
            />
          </div>
          <div className="burgerMenu" onClick={toggleMenu}>
            {isMenuOpen ? (
              <AiOutlineClose
                className={`burger ${scrolled ? "scrolled-icon" : ""}`}
              />
            ) : (
              <RxHamburgerMenu
                className={`burger ${scrolled ? "scrolled-icon" : ""}`}
              />
            )}
          </div>
        </div>
        {isMenuOpen && (
          <div className="dropdownMenu">
            <ul>
              <li>
                <NavLink
                  to="/"
                  onClick={toggleMenu}
                  className={scrolled ? "scrolled" : ""}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  onClick={toggleMenu}
                  className={scrolled ? "scrolled" : ""}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop"
                  onClick={toggleMenu}
                  className={scrolled ? "scrolled" : ""}
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blog"
                  onClick={toggleMenu}
                  className={scrolled ? "scrolled" : ""}
                >
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  onClick={toggleMenu}
                  className={scrolled ? "scrolled" : ""}
                >
                  Contact
                </NavLink>
              </li>
              <div className="dropdownUserCartBag">
                <li>
                  <AiOutlineUser
                    className="user"
                    onClick={() => {
                      openLogin();
                      isMenuOpen && toggleMenu();
                    }}
                  />
                </li>
                <li>
                  <FiSearch className="search" />
                </li>
                <li>
                  <PiShoppingBag className="cart" />
                </li>
              </div>
            </ul>
          </div>
        )}
      </div>
      {isLoginOpen && (
        <Login openRegister={openRegister} closeModals={closeModals} />
      )}
      {isRegisterOpen && (
        <Register openLogin={openLogin} closeModals={closeModals} />
      )}
    </>
  );
}

export default Navbar;
