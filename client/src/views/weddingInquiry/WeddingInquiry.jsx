import React from "react";
import "./WeddingInquiry.css";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { validationSchema } from "../../components/weddingInquiryValidation/weddingInquiryValidation";

function WeddingInquiry() {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      partnerName: "",
      email: "",
      mailing: "",
      phone: "",
      weddingDate: "",
      venue: "",
      guests: "",
      budget: "",
      message: "",
      mailingAddress: "",
      eventType: "",
      contactMethod: "",
      weddingTheme: [],
      howDidYouHear: "",
    },
    validationSchema: validationSchema,
  });

  const handleThemeChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      formik.setFieldValue("weddingTheme", [...formik.values.weddingTheme, value]);
    } else {
      formik.setFieldValue(
        "weddingTheme",
        formik.values.weddingTheme.filter((theme) => theme !== value)
      );
    }
  };

  return (
    <div className="weddingInquiryContainer">
      <div className="inquiryBackground"></div>
      <div className="header">
        <h1>{t("weddingInquiry.header1")}</h1>
      </div>
      <form
        action="https://formspree.io/f/mgejprbd"
        method="POST"
      >
        <div className="field">
          <div className="box">
            <div className="textField">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Enter your first name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                style={{ fontSize: "1.4rem" }}
              />
              {formik.errors.firstName && (
                <p className="errorText">{formik.errors.firstName}</p>
              )}
            </div>
            <div className="textField">
              <label htmlFor="partnerName">Partner Name</label>
              <input
                id="partnerName"
                name="partnerName"
                type="text"
                placeholder="Enter your partner's name"
                value={formik.values.partnerName}
                onChange={formik.handleChange}
                style={{ fontSize: "1.4rem" }}
              />
              {formik.errors.partnerName && (
                <p className="errorText">{formik.errors.partnerName}</p>
              )}
            </div>
          </div>
        </div>
        <div className="field">
          <div className="box">
            <div className="textField">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                style={{ fontSize: "1.4rem" }}
              />
              {formik.errors.email && <p className="errorText">{formik.errors.email}</p>}
            </div>
            <div className="textField">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                style={{ fontSize: "1.4rem" }}
              />
              {formik.errors.phone && <p className="errorText">{formik.errors.phone}</p>}
            </div>
          </div>
        </div>
        <div className="field">
          <div className="box">
            <div className="textField">
              <label htmlFor="weddingDate">Wedding Date</label>
              <input
                id="weddingDate"
                name="weddingDate"
                type="date"
                placeholder="Select your wedding date"
                value={formik.values.weddingDate}
                onChange={formik.handleChange}
                style={{ fontSize: "1.4rem" }}
              />
              {formik.errors.weddingDate && (
                <p className="errorText">{formik.errors.weddingDate}</p>
              )}
            </div>
            <div className="textField">
              <label htmlFor="venue">Venue</label>
              <input
                id="venue"
                name="venue"
                type="text"
                placeholder="Enter your venue"
                value={formik.values.venue}
                onChange={formik.handleChange}
                style={{ fontSize: "1.4rem" }}
              />
              {formik.errors.venue && <p className="errorText">{formik.errors.venue}</p>}
            </div>
          </div>
        </div>
        <div className="field">
          <div className="box">
            <div className="textField">
              <label htmlFor="guests">Number of Guests</label>
              <input
                id="guests"
                name="guests"
                type="number"
                placeholder="Enter the number of guests"
                value={formik.values.guests}
                onChange={formik.handleChange}
                style={{ fontSize: "1.4rem" }}
              />
              {formik.errors.guests && <p className="errorText">{formik.errors.guests}</p>}
            </div>
            <div className="textField">
              <label htmlFor="budget">Budget</label>
              <input
                id="budget"
                name="budget"
                type="number"
                placeholder="Enter your budget"
                value={formik.values.budget}
                onChange={formik.handleChange}
                style={{ fontSize: "1.4rem" }}
              />
              {formik.errors.budget && <p className="errorText">{formik.errors.budget}</p>}
            </div>
          </div>
        </div>
        <div className="field">
          <div className="box">
            <div className="textField">
              <label htmlFor="mailingAddress">Mailing Address</label>
              <input
                id="mailingAddress"
                name="mailingAddress"
                type="text"
                placeholder="Enter your mailing address"
                value={formik.values.mailingAddress}
                onChange={formik.handleChange}
                style={{ fontSize: "1.4rem" }}
              />
              {formik.errors.mailingAddress && (
                <p className="errorText">{formik.errors.mailingAddress}</p>
              )}
            </div>
            <div className="textField">
              <label htmlFor="eventType">Event Type</label>
              <select
                id="eventType"
                name="eventType"
                value={formik.values.eventType}
                onChange={formik.handleChange}
                style={{ fontSize: "1.4rem" }}
              >
                <option value="" style={{ fontSize: "1.4rem" }}>
                  Select event type
                </option>
                <option value="wedding" style={{ fontSize: "1.4rem" }}>
                  Wedding
                </option>
                <option value="engagement" style={{ fontSize: "1.4rem" }}>
                  Engagement
                </option>
                <option value="anniversary" style={{ fontSize: "1.4rem" }}>
                  Anniversary
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <div className="box">
            <div className="textField-preferred">
              <fieldset>
                <legend style={{ fontSize: "1.6rem" }}>
                  Preferred Contact Method
                </legend>
                <div>
                  <input
                    type="radio"
                    id="contactEmail"
                    name="contactMethod"
                    value="email"
                    checked={formik.values.contactMethod === "email"}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="contactEmail" style={{ fontSize: "1.4rem" }}>
                    Email
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="contactPhone"
                    name="contactMethod"
                    value="phone"
                    checked={formik.values.contactMethod === "phone"}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="contactPhone" style={{ fontSize: "1.4rem" }}>
                    Phone
                  </label>
                </div>
              </fieldset>
            </div>
            <div className="textField-wedding">
              <fieldset>
                <legend style={{ fontSize: "1.6rem" }}>Wedding Theme</legend>
                <div className="formControl">
                  <div>
                    <input
                      type="checkbox"
                      id="themeClassic"
                      name="weddingTheme"
                      value="classic"
                      checked={formik.values.weddingTheme.includes("classic")}
                      onChange={handleThemeChange}
                    />
                    <label
                      htmlFor="themeClassic"
                      style={{ fontSize: "1.4rem" }}
                    >
                      Classic
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="themeRustic"
                      name="weddingTheme"
                      value="rustic"
                      checked={formik.values.weddingTheme.includes("rustic")}
                      onChange={handleThemeChange}
                    />
                    <label htmlFor="themeRustic" style={{ fontSize: "1.4rem" }}>
                      Rustic
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="themeModern"
                      name="weddingTheme"
                      value="modern"
                      checked={formik.values.weddingTheme.includes("modern")}
                      onChange={handleThemeChange}
                    />
                    <label htmlFor="themeModern" style={{ fontSize: "1.4rem" }}>
                      Modern
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div className="field">
          <div className="box">
            <div className="textField-hear">
              <label htmlFor="howDidYouHear">How Did You Hear About Us?</label>
              <input
                id="howDidYouHear"
                name="howDidYouHear"
                type="text"
                placeholder="Tell us how you heard about us"
                value={formik.values.howDidYouHear}
                onChange={formik.handleChange}
                style={{ fontSize: "1.4rem" }}
              />
              {formik.errors.howDidYouHear && (
                <p className="errorText">{formik.errors.howDidYouHear}</p>
              )}
            </div>
          </div>
        </div>
        <div className="field">
          <div className="box">
            <div className="messageField">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Enter your message"
                value={formik.values.message}
                onChange={formik.handleChange}
                style={{ fontSize: "1.4rem" }}
              />
              {formik.errors.message && <p className="errorText">{formik.errors.message}</p>}
            </div>
          </div>
        </div>
        <div className="submitButton">
          <button type="submit" className="button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default WeddingInquiry;
