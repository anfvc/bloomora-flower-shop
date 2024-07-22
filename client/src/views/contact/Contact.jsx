import React, { useEffect } from "react";
import "./Contact.css";
import ContactRegisterForm from "../../components/contactRegisterForm/ContactRegisterForm";
import image1 from "../../images/contactImages/image1.jpg";
import image2 from "../../images/contactImages/image3.jpg";
import image3 from "../../images/contactImages/image4.jpg";
import { useTranslation } from "react-i18next";

function Contact() {
  const { t } = useTranslation();

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
          <h1>{t("contact.header")}</h1>
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
              <h2>{t("contact.shopHours.title")}</h2>
              <ul>
                <li>{t("contact.shopHours.mondayFriday")}</li>
                <li>{t("contact.shopHours.saturday")}</li>
                <li>{t("contact.shopHours.sunday")}</li>
              </ul>
            </div>
            <div className="daysOutOfService">
              <h2>{t("contact.daysOutOfService.title")}</h2>
              <p>{t("contact.daysOutOfService.dates")}</p>
              <p>{t("contact.daysOutOfService.message")}</p>
            </div>
            <div className="email-address-phone">
              <h2>{t("contact.contactOrder.title")}</h2>
              <p>
                <span>{t("contact.contactOrder.emailLabel")}:</span>{t("contact.contactOrder.email")}
              </p>
              <p>
                <span>{t("contact.contactOrder.addressLabel")}:</span>{t("contact.contactOrder.address")}
              </p>
              <p>
                <span>{t("contact.contactOrder.phoneLabel")}:</span>{t("contact.contactOrder.phone")}
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
