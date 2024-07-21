import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { isLoggedIn, user, logout, isMenuOpen, setIsMenuOpen } =
    useContext(UserContext);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  useEffect(() => {
    const userIcon = document.querySelector(
      ".user-cart-search details summary"
    );
    userIcon.addEventListener("mouseover", openDetails);
    userIcon.addEventListener("mouseout", closeDetails);

    return () => {
      userIcon.removeEventListener("mouseover", openDetails);
      userIcon.removeEventListener("mouseout", closeDetails);
    };
  }, []);

  const openDetails = () => {
    document
      .querySelector(".user-cart-search details")
      .setAttribute("open", true);
  };

  const closeDetails = () => {
    setTimeout(() => {
      if (!document.querySelector(".user-cart-search details:hover")) {
        document
          .querySelector(".user-cart-search details")
          .removeAttribute("open");
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
    document.querySelector("details[open]").removeAttribute("open");
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
    setLanguageMenuOpen(false); // Close the menu after selecting a language
  };

  const toggleLanguageMenu = () => {
    setLanguageMenuOpen(!languageMenuOpen);
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
                  onClick={scrollToTop}
                >
                  {t("home")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop"
                  className={scrolled ? "scrolled" : ""}
                  onClick={scrollToTop}
                >
                  {t("shop.header1")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/ourroots"
                  className={scrolled ? "scrolled" : ""}
                  onClick={scrollToTop}
                >
                  {t("ourRoots.header")}
                </NavLink>
              </li>
              <li className="weddings-events">
                <NavLink
                  to="/weddings-events"
                  className={scrolled ? "scrolled" : ""}
                  onClick={scrollToTop}
                >
                  {t("weddings_events")}
                  <ul className="dropdownLinks">
                    <li className="dropdown-li">
                      <NavLink
                        to="/wedding-process"
                        className="dropdown-a"
                        onClick={scrollToTop}
                      >
                        {t("wedding_process")}
                      </NavLink>
                    </li>
                    <li className="dropdown-li">
                      <NavLink
                        to="/wedding-gallery"
                        className="dropdown-a"
                        onClick={scrollToTop}
                      >
                        {t("wedding_gallery")}
                      </NavLink>
                    </li>
                    <li className="dropdown-li">
                      <NavLink
                        to="/events"
                        className="dropdown-a"
                        onClick={scrollToTop}
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
                  onClick={scrollToTop}
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
            <details>
              <summary>
                <AiOutlineUser
                  className={`user ${scrolled ? "scrolled-icon" : ""}`}
                />
              </summary>
              <ul className="loginSignUp">
                {isLoggedIn ? (
                  <>
                    <li onClick={() => navigate("/userPanel")}>
                      <AiFillEdit />
                      {t("profile")}
                    </li>
                    <li onClick={handleLogout}>
                      <FaSignOutAlt />
                      {t("logout")}
                    </li>
                  </>
                ) : (
                  <>
                    <li onClick={openLogin}>
                      <IoLogIn />
                      {t("sign_in")}
                    </li>
                    <li onClick={openRegister}>
                      <MdPersonAdd />
                      {t("register")}
                    </li>
                  </>
                )}
              </ul>
            </details>
            <NavLink to="/search">
              <FiSearch
                className={`search ${scrolled ? "scrolled-icon" : ""}`}
              />
            </NavLink>
            <NavLink to="/cart">
              <div className="cart-icon">
                <PiShoppingBag
                  className={`cart ${scrolled ? "scrolled-icon" : ""}`}
                />
                {user.cart?.length > 0 && (
                  <span className="cart-count">{user.cart.length}</span>
                )}
              </div>
            </NavLink>
            <div className="language-switcher">
              <button onClick={toggleLanguageMenu}>Language</button>
              {languageMenuOpen && (
                <div className="language-menu">
                  <button onClick={() => changeLanguage("en")}>EN</button>
                  <button onClick={() => changeLanguage("de")}>DE</button>
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
        </div>
        {isMenuOpen && (
          <div className="dropdownMenu">
            <div className="language-switcher">
              <button onClick={toggleLanguageMenu}>Language</button>
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
                  {t("shop")}
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
                  {t("weddings_events")}
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
                            onClick={() => navigate("/userPanel")}
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
                          <li className="dd-li" onClick={openLogin}>
                            <IoLogIn />
                            {t("sign_in")}
                          </li>
                          <li className="dd-li" onClick={openRegister}>
                            <MdPersonAdd />
                            {t("register")}
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
                      <PiShoppingBag className="cart" />
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
