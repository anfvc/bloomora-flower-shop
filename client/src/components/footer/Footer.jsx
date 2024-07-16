import React from "react";
import "./Footer.css";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div className="footerContainer">
      <div className="footerBox">
        <div className="aboutUs">
          <div className="header">our roots</div>
          <div className="links">
            <a href="">vision</a>
            <a href="">careers</a>
            <a href="">service terms</a>
            <a href="">donate</a>
          </div>
        </div>
        <div className="myAccounts">
          <div className="header">bloomora</div>
          <div className="links">
            <a href="">sign in</a>
            <a href="">gallery</a>
            <a href="">view cart</a>
            <a href="">my wishlist</a>
          </div>
        </div>
        <div className="helps">
          <div className="header">Help</div>
          <div className="links">
            <a href="">help center</a>
            <a href="">report a problem</a>
            <a href="">view cart</a>
            <a href="/contact">contact us</a>
          </div>
        </div>
      </div>
      <div className="rightsAndReserved">
        <p>© 2024 Bloomora. All rights reserved.</p>
        <div className="socialPlatforms">
          <FaFacebookF className="platform" />
          <FaInstagram className="platform" />
          <FaXTwitter className="platform" />
          <FaLinkedin className="platform" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
