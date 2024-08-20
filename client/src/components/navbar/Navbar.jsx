import React, { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../images/logo/bloomoraV2.svg";
import userPanelLogo from "../../images/logo/bloomoraV5.png";
import scrolledLogo from "../../images/logo/bloomoraV3.svg";
import { MdOutlineLightMode } from "react-icons/md";
import { CiDark } from "react-icons/ci";
import { AiOutlineUser, AiFillEdit, AiOutlineClose } from "react-icons/ai";
import {
  FaSquareInstagram,
  FaXTwitter,
  FaLinkedin,
  FaHeart,
} from "react-icons/fa6";
import { FaFacebookSquare, FaSignOutAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoLogIn } from "react-icons/io5";
import { MdPersonAdd } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { PiListHeartFill } from "react-icons/pi";
import { TbArrowBarRight } from "react-icons/tb";

import Login from "../Login/Login";
import Register from "../Register/Register";
import { UserContext } from "../../context/userContext";

function Navbar({ toggleTheme, isChecked }) {
  const [scrolled, setScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  const { isLoggedIn, user, logout, isMenuOpen, setIsMenuOpen } =
    useContext(UserContext);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

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
    closeDetailsMenu();
  };

  const closeModals = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguageMenuOpen(false);
  };

  const toggleLanguageMenu = () => {
    setLanguageMenuOpen(!languageMenuOpen);
  };

  const closeDetailsMenu = () => {
    const detailsElement = document.querySelector("details[open]");
    if (detailsElement) {
      detailsElement.removeAttribute("open");
    }
  };

  const handleMenuItemClick = (callback) => {
    closeDetailsMenu();
    callback();
  };

  const toggleUserPanel = () => {
    setIsUserPanelOpen(!isUserPanelOpen);
  };

  return (
    <>
      <div
        className={isMenuOpen ? "overlay active" : "overlay"}
        onClick={toggleMenu}
      ></div>
      <div className={`navbarContainer ${scrolled ? "scrolled" : ""}`}>
        <div className="logo">
          <NavLink to="/" onClick={scrollToTop}>
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
                <NavLink
                  to="/"
                  className={scrolled ? "scrolled" : ""}
                  onClick={() => handleMenuItemClick(scrollToTop)}
                >
                  {t("home")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop"
                  className={scrolled ? "scrolled" : ""}
                  onClick={() => handleMenuItemClick(scrollToTop)}
                >
                  {t("shop.header1")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/ourroots"
                  className={scrolled ? "scrolled" : ""}
                  onClick={() => handleMenuItemClick(scrollToTop)}
                >
                  {t("ourRoots.header")}
                </NavLink>
              </li>
              <li className="weddings-events">
                <NavLink
                  to="/weddings-events"
                  className={scrolled ? "scrolled" : ""}
                  onClick={() => handleMenuItemClick(scrollToTop)}
                >
                  {t("weddingEvents.header")}
                  <ul className="dropdownLinks">
                    <li className="dropdown-li">
                      <NavLink
                        to="/wedding-process"
                        className="dropdown-a"
                        onClick={() => handleMenuItemClick(scrollToTop)}
                      >
                        {t("weddingProcess.header")}
                      </NavLink>
                    </li>
                    <li className="dropdown-li">
                      <NavLink
                        to="/wedding-gallery"
                        className="dropdown-a"
                        onClick={() => handleMenuItemClick(scrollToTop)}
                      >
                        {t("wedding_gallery")}
                      </NavLink>
                    </li>
                    <li className="dropdown-li">
                      <NavLink
                        to="/events"
                        className="dropdown-a"
                        onClick={() => handleMenuItemClick(scrollToTop)}
                      >
                        {t("events")}
                      </NavLink>
                    </li>
                  </ul>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={scrolled ? "scrolled" : ""}
                  onClick={() => handleMenuItemClick(scrollToTop)}
                >
                  {t("contact.header")}
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="user-cart-search">
            {isLoggedIn && (
              <p className={`welcomeMessage ${scrolled ? "scrolled" : ""}`}>
                {t("hello_user", {
                  name:
                    user.user.firstName[0].toUpperCase() +
                    user.user.firstName.slice(1),
                })}
              </p>
            )}
            <AiOutlineUser
              className={`user ${scrolled ? "scrolled-icon" : ""}`}
              onClick={toggleUserPanel}
            />
            <NavLink to="/search">
              <FiSearch
                className={`search ${scrolled ? "scrolled-icon" : ""}`}
              />
            </NavLink>
            <NavLink
              className="nav-wishlist"
              to="#"
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick(() =>
                  navigate("/userPanel?section=wishlist")
                );
              }}
            >
              <div className="nav-wishIcon">
                <FaHeart
                  className={`wish ${scrolled ? "scrolled-icon" : ""}`}
                />
              </div>
            </NavLink>
            <NavLink to="/cart">
              <div className="cart-icon">
                <RiShoppingBag3Fill
                  className={`cart ${scrolled ? "scrolled-icon" : ""}`}
                />
                {user.cart?.length > 0 && (
                  <span className="cart-count">{user.cart.length}</span>
                )}
              </div>
            </NavLink>
            <div className="language-switcher">
              <GrLanguage className="language" onClick={toggleLanguageMenu} />
              {languageMenuOpen && (
                <div className="language-menu">
                  <button onClick={() => changeLanguage("en")}>EN</button>
                  <button onClick={() => changeLanguage("de")}>DE</button>
                  <button onClick={() => changeLanguage("it")}>IT</button>
                </div>
              )}
            </div>
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
          <div className="theme-toggle">
            <label className="switch">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={toggleTheme}
              />
              <span className="slider round"></span>
            </label>
            {isChecked ? (
              <CiDark className="dark-icon" onClick={toggleTheme} />
            ) : (
              <MdOutlineLightMode
                className="light-icon"
                onClick={toggleTheme}
              />
            )}
          </div>
        </div>
        {isMenuOpen && (
          <div className="dropdownMenu">
            <div className="language-switcher">
              <GrLanguage onClick={toggleLanguageMenu} />
              {languageMenuOpen && (
                <div className="language-menu">
                  <button onClick={() => changeLanguage("en")}>EN</button>
                  <button onClick={() => changeLanguage("de")}>DE</button>
                </div>
              )}
            </div>
            <ul>
              <li>
                <NavLink
                  to="/"
                  onClick={() => {
                    toggleMenu();
                    scrollToTop();
                  }}
                  className={scrolled ? "scrolled" : ""}
                >
                  {t("home")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop"
                  onClick={() => {
                    toggleMenu();
                    scrollToTop();
                  }}
                  className={scrolled ? "scrolled" : ""}
                >
                  {t("shop.header1")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/ourroots"
                  onClick={() => {
                    toggleMenu();
                    scrollToTop();
                  }}
                  className={scrolled ? "scrolled" : ""}
                >
                  {t("ourRoots.header")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/weddings-events"
                  onClick={() => {
                    toggleMenu();
                    scrollToTop();
                  }}
                  className={scrolled ? "scrolled" : ""}
                >
                  {t("weddingEvents.header")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  onClick={() => {
                    toggleMenu();
                    scrollToTop();
                  }}
                  className={scrolled ? "scrolled" : ""}
                >
                  {t("contact.header")}
                </NavLink>
              </li>
              <div className="dropdownUserCartBag">
                <li>
                  <details>
                    <summary>
                      <AiOutlineUser
                        className={`user ${scrolled ? "scrolled-icon" : ""}`}
                      />
                    </summary>
                    <ul className="loginSignUp">
                      {isLoggedIn ? (
                        <>
                          <li
                            className="dd-li"
                            onClick={() =>
                              handleMenuItemClick(() => navigate("/userPanel"))
                            }
                          >
                            <AiFillEdit />
                            {t("profile")}
                          </li>
                          <li className="dd-li" onClick={handleLogout}>
                            <FaSignOutAlt />
                            {t("logout")}
                          </li>
                        </>
                      ) : (
                        <>
                          <li
                            className="dd-li"
                            onClick={() => handleMenuItemClick(openLogin)}
                          >
                            <IoLogIn />
                            {t("sign_in.header")}
                          </li>
                          <li
                            className="dd-li"
                            onClick={() => handleMenuItemClick(openRegister)}
                          >
                            <MdPersonAdd />
                            {t("register.header")}
                          </li>
                        </>
                      )}
                    </ul>
                  </details>
                </li>
                <li>
                  <NavLink to="/search" onClick={toggleMenu}>
                    <FiSearch
                      className={`search ${scrolled ? "scrolled-icon" : ""}`}
                    />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/cart">
                    <div className="cart-icon">
                      <RiShoppingBag3Fill className="cart" />
                      {user.cart?.length > 0 && (
                        <span className="cart-count">{user.cart.length}</span>
                      )}
                    </div>
                  </NavLink>
                </li>
              </div>
            </ul>
          </div>
        )}
      </div>

      {/* Kullanıcı Paneli */}
      <div className={`user-panel ${isUserPanelOpen ? "open" : ""}`}>
        <div className="userPanelLogo">
          <img src={userPanelLogo} alt="logo" />
        </div>
        <button className="close-btn" onClick={toggleUserPanel}>
          <TbArrowBarRight />
        </button>
        <ul>
          {isLoggedIn ? (
            <>
              <li
                onClick={() => {
                  handleMenuItemClick(() =>
                    navigate("/userPanel?section=profile")
                  );
                  toggleUserPanel();
                }}
              >
                <button>
                  <AiFillEdit />
                  {t("profile")}
                </button>
              </li>
              <li
                onClick={() => {
                  handleMenuItemClick(() =>
                    navigate("/userPanel?section=wishlist")
                  );
                  toggleUserPanel();
                }}
              >
                <button>
                  <PiListHeartFill />
                  {t("wishlist")}
                </button>
              </li>
              {/* Orders */}
              <li
                onClick={() => {
                  handleMenuItemClick(() =>
                    navigate("/userPanel?section=orders")
                  );
                  toggleUserPanel();
                }}
              >
                <button>{t("userPanel.myOrders")}</button>
              </li>
              <li
                onClick={() => {
                  handleMenuItemClick(() => navigate("/cart"));
                  toggleUserPanel();
                }}
              >
                <button className="userPanel-cart">
                  <RiShoppingBag3Fill />
                  {t("cart.header")}
                </button>
              </li>
              <li
                onClick={() => {
                  handleLogout();
                  toggleUserPanel();
                }}
              >
                <button className="userPanel-logout">
                  <FaSignOutAlt />
                  {t("logout")}
                </button>
              </li>
            </>
          ) : (
            <>
              <li
                onClick={() => {
                  handleMenuItemClick(openLogin);
                  toggleUserPanel();
                }}
              >
                <IoLogIn className="userPanel-signIn" />
                {t("sign_in.header")}
              </li>
              <li
                onClick={() => {
                  handleMenuItemClick(openRegister);
                  toggleUserPanel();
                }}
              >
                <MdPersonAdd />
                {t("register.header")}
              </li>
            </>
          )}
        </ul>
        <div className="socialPlatforms">
          <FaFacebookSquare />
          <FaSquareInstagram />
          <FaXTwitter />
          <FaLinkedin />
        </div>
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
