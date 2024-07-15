import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom"; 
import logo from "../../images/logo/bloomoraV2.svg";
import scrolledLogo from "../../images/logo/bloomoraV3.svg";
import { AiOutlineUser } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { PiShoppingBag } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { IoLogIn } from "react-icons/io5";
import { MdPersonAdd } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import "./Navbar.css";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { UserContext } from "../../context/userContext";

function Navbar() {
  
  const [scrolled, setScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const { isLoggedIn, user, logout } = useContext(UserContext);
  const navigate = useNavigate(); 

  const { isMenuOpen,setIsMenuOpen } = useContext(UserContext);

  useEffect(() => {
    const userIcon = document.querySelector('.user-cart-search details summary');
    userIcon.addEventListener('mouseover', openDetails);
    userIcon.addEventListener('mouseout', closeDetails);

    return () => {
      userIcon.removeEventListener('mouseover', openDetails);
      userIcon.removeEventListener('mouseout', closeDetails);
    };
  }, []);

  const openDetails = () => {
    document.querySelector('.user-cart-search details').setAttribute('open', true);
  };

  const closeDetails = () => {
    setTimeout(() => {
      if (!document.querySelector('.user-cart-search details:hover')) {
        document.querySelector('.user-cart-search details').removeAttribute('open');
      }
    }, 500);
  };

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

  const handleLogout = () => {
    logout();
    navigate("/"); 
    document.querySelector('details[open]').removeAttribute('open'); 
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
                <NavLink to="/shop" className={scrolled ? "scrolled" : ""}>
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink to="/ourroots" className={scrolled ? "scrolled" : ""}>
                  Our Roots
                </NavLink>
              </li>
              <li className="weddings-events">
                <NavLink to="/weddings-events" className={scrolled ? "scrolled" : ""}>
                  weddings & events
                  <ul className="dropdownLinks">
                    <li className="dropdown-li"><NavLink to="/wedding-process" className="dropdown-a">Wedding Process</NavLink></li>
                    <li className="dropdown-li"><NavLink to="/wedding-gallery" className="dropdown-a">Wedding Gallery</NavLink></li>
                    <li className="dropdown-li"><NavLink to="/events" className="dropdown-a">Events</NavLink></li>
                  </ul>
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
            {isLoggedIn && (
              <p className={`welcomeMessage ${scrolled ? "scrolled" : ""}`}>Hello, {user.firstName} </p>
            )}
            <details>
              <summary>
                <AiOutlineUser
                  className={`user ${scrolled ? "scrolled-icon" : ""}`}
                />
              </summary>
              <ul className="loginSignUp">
                {isLoggedIn ? ( 
                  <>
                    <li onClick={() => navigate('/userPanel')}> 
                      <AiFillEdit />
                      Profile
                    </li>
                    <li onClick={handleLogout}>
                      <FaSignOutAlt />
                      Logout
                    </li>
                  </>
                ) : (
                  <>
                    <li onClick={openLogin}>
                      <IoLogIn />
                      Sign In
                    </li>
                    <li onClick={openRegister}>
                      <MdPersonAdd />
                      Register
                    </li>
                  </>
                )}
              </ul>
            </details>
            <NavLink to="/search"><FiSearch className={`search ${scrolled ? "scrolled-icon" : ""}`} /></NavLink>
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
                  to="/shop"
                  onClick={toggleMenu}
                  className={scrolled ? "scrolled" : ""}
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/ourroots"
                  onClick={toggleMenu}
                  className={scrolled ? "scrolled" : ""}
                >
                  Our Roots
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/weddings-events"
                  onClick={toggleMenu}
                  className={scrolled ? "scrolled" : ""}
                >
                  Weddings & Events
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
