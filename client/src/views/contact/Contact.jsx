import React from "react";
import "./Contact.css";
import { useEffect } from "react";
import ContactRegisterForm from "../../components/contactRegisterForm/ContactRegisterForm";
import image1 from "../../images/contactImages/image1.jpg";
import image2 from "../../images/contactImages/image3.jpg";
import image3 from "../../images/contactImages/image4.jpg";

function Contact() {
  useEffect(() => {
    const handleScroll = () => {
      const image1 = document.querySelector(".image1");
      const image2 = document.querySelector(".image2");
      const image3 = document.querySelector(".image3");
      const scrollPosition = window.scrollY;

      if (scrollPosition > 100) {
        setTimeout(() => {
          image2.classList.add("visible2");
        }, 100);
        setTimeout(() => {
          image3.classList.add("visible3");
        }, 200);
        setTimeout(() => {
          image1.classList.add("visible1");
        }, 300);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="contactContainer">
      <div className="contactBackgroundImage"></div>
      <div className="contactInfos-image">
        <div className="header">
          <h1>contact & delivery</h1>
        </div>
        <div className="contactInfo">
          <div className="image">
            <img src={image1} alt="" className="image1" />
            <div className="sideImages">
              <img src={image2} alt="" className="image2" />
              <img src={image3} alt="" className="image3" />
            </div>
          </div>
          <div className="info">
            <div className="shopHours">
              <h2>shop hours</h2>
              <ul>
                <li>monday-friday | 9-5pm</li>
                <li>saturday | 9-4pm</li>
                <li>sunday | closed</li>
              </ul>
            </div>
            <div className="daysOutOfService">
              <h2>days out of service</h2>
              <p>Shop will be closed from the 4th to the 7th of June </p>
              <p>enjoy the festivities</p>
            </div>
            <div className="email-address-phone">
              <h2>contact & order</h2>
              <p>
                <span>email:</span>hello@bloomora.com
              </p>
              <p>
                <span>address:</span>schwarz straße 123 76543 Berlin
              </p>
              <p>
                <span>phone:</span>0123 4567890
              </p>
            </div>
          </div>
        </div>
      </div>

      <ContactRegisterForm />
    </div>
  );
}

export default Contact;
