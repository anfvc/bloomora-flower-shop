import React from "react";
import "./ContactRegisterForm.css";
import { useFormik } from "formik";
import { useId } from "react";
import { useTranslation } from "react-i18next";
import { validationSchema } from "../contactValidationForm/ContactValidationForm";

function ContactRegisterForm() {
  const { t } = useTranslation();

  const { values, errors, handleChange } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
    validationSchema: validationSchema,
  });

  const handleSubmit = async (values) => {
    try {
      await fetch("https://formspree.io/f/mgejprbd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
    } catch (error) {
      console.error("Form gönderimi sırasında hata:", error);
    }
  };

  const firstNameId = useId();
  const lastNameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const subjectId = useId();
  const messageId = useId();

  return (
    <div className="contactRegisterFormContainer">
      <form
        action="https://formspree.io/f/mgejprbd"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="firstName-lastName">
          <div className="firstName">
            <label htmlFor={firstNameId}>{t("contactForm.firstName")}</label>
            <input
              name="firstName"
              type="text"
              id={firstNameId}
              value={values.firstName}
              placeholder={t("contactForm.placeholder.firstName")}
              onChange={handleChange}
            />
            {errors.firstName && (
              <p className="inputValidation">{errors.firstName}</p>
            )}
          </div>
          <div className="lastName">
            <label htmlFor={lastNameId}>{t("contactForm.lastName")}</label>
            <input
              name="lastName"
              type="text"
              id={lastNameId}
              value={values.lastName}
              placeholder={t("contactForm.placeholder.lastName")}
              onChange={handleChange}
            />
            {errors.lastName && (
              <p className="inputValidation">{errors.lastName}</p>
            )}
          </div>
        </div>
        <div className="email-phone">
          <div className="email">
            <label htmlFor={emailId}>{t("contactForm.email")}</label>
            <input
              name="email"
              type="text"
              id={emailId}
              placeholder={t("contactForm.placeholder.email")}
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <p className="inputValidation">{errors.email}</p>}
          </div>
          <div className="phone">
            <label htmlFor={phoneId}>{t("contactForm.phone")}</label>
            <input
              name="phone"
              type="text"
              id={phoneId}
              placeholder={t("contactForm.placeholder.phone")}
              value={values.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="inputValidation">{errors.phone}</p>}
          </div>
        </div>
        <div className="subject">
          <label htmlFor={subjectId}>{t("contactForm.subject")}</label>
          <select
            name="subject"
            id={subjectId}
            value={values.subject}
            onChange={handleChange}
          >
            <option value="" label={t("contactForm.subjectOptions.default")} />
            <option
              value="Bouquet Order"
              label={t("contactForm.subjectOptions.bouquetOrder")}
            />
            <option
              value="Special Event Arrangements"
              label={t("contactForm.subjectOptions.specialEventArrangements")}
            />
            <option
              value="Delivery Inquiry"
              label={t("contactForm.subjectOptions.deliveryInquiry")}
            />
            <option
              value="Custom Floral Design"
              label={t("contactForm.subjectOptions.customFloralDesign")}
            />
            <option
              value="Store Feedback"
              label={t("contactForm.subjectOptions.storeFeedback")}
            />
            <option
              value="Other Inquiries"
              label={t("contactForm.subjectOptions.otherInquiries")}
            />
          </select>
          {errors.subject && (
            <p className="inputValidation">{errors.subject}</p>
          )}
        </div>
        <div className="message">
          <label htmlFor={messageId}>{t("contactForm.message")}</label>
          <textarea
            name="message"
            id={messageId}
            value={values.message}
            onChange={handleChange}
            cols="30"
            rows="10"
          ></textarea>
          {errors.message && (
            <p className="inputValidation">{errors.message}</p>
          )}
        </div>
        <div className="submitButton">
          <button type="submit">{t("contactForm.submit")}</button>
        </div>
      </form>
    </div>
  );
}

export default ContactRegisterForm;
