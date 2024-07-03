import React from 'react'
import "./Navbar.css"
import { NavLink } from "react-router-dom"
import logo from "../../images/logo/bloomoraV2.png"
import { AiOutlineUser } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { PiShoppingBag } from "react-icons/pi";

function Navbar() {
  return (
    <div className='navbarContainer'>
      <div className="logo">
        <NavLink to="/">
          <img src={logo} alt="logo" />
        </NavLink>
      </div>
      <div className="links-icons">
        <div className="links">
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/shop">Shop</NavLink></li>
            <li><NavLink to="/blog">Blog</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </div>
        <div className="user-cart-search">
          <AiOutlineUser className='user' />
          <FiSearch className='search' />
          <PiShoppingBag className='cart' />
        </div>
      </div>
    </div>
  )
}

export default Navbar