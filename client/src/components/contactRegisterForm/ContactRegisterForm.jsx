import React from "react";
import "./ContactRegisterForm.css";
import { useFormik } from "formik";
import { useId } from "react";
import { validationSchema } from "../contactValidationForm/ContactValidationForm";

function ContactRegisterForm() {
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },

    validationSchema : validationSchema
  });

  const firstNameId = useId();
  const lastNameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const subjectId = useId();
  const messageId = useId();

  return (
    <div className="contactRegisterFormContainer">
      <form onSubmit={handleSubmit}>
        <div className="firstName-lastName">
          <div className="firstName">
            <label htmlFor={firstNameId}>First Name</label>
            <input
              name="firstName"
              type="text"
              id={firstNameId}
              value={values.firstName}
              placeholder="Name"
              onChange={handleChange}
            />
            {errors.firstName && <p className="inputValidation">{errors.firstName}</p>}
          </div>
          <div className="lastName">
            <label htmlFor={lastNameId}>Last Name</label>
            <input
              name="lastName"
              type="text"
              id={lastNameId}
              value={values.lastName}
              placeholder="Last Name"
              onChange={handleChange}
            />
            {errors.lastName && <p className="inputValidation">{errors.lastName}</p>}
          </div>
        </div>
        <div className="email-phone">
          <div className="email">
            <label htmlFor={emailId}>Email</label>
            <input
              name="email"
              type="text"
              id={emailId}
              placeholder="abcd@example.com"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <p className="inputValidation">{errors.email}</p>}
          </div>
          <div className="phone">
            <label htmlFor={phoneId}>Phone</label>
            <input
              name="phone"
              type="text"
              id={phoneId}
              placeholder="+49 123 4567890"
              value={values.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="inputValidation">{errors.phone}</p>}
          </div>
        </div>
        <div className="subject">
          <label htmlFor={subjectId}>Select Subject</label>
          <select
            name="subject"
            id={subjectId}
            value={values.subject}
            onChange={handleChange}
          >
            <option value="" label="Select your subject" />
            <option value="Bouquet Order" label="Bouquet Order" />
            <option
              value="Special Event Arrangements"
              label="Special Event Arrangements"
            />
            <option value="Delivery Inquiry" label="Delivery Inquiry" />
            <option value="Custom Floral Design" label="Custom Floral Design" />
            <option value="Store Feedback" label="Store Feedback" />
            <option value="Other Inquiries" label="Other Inquiries" />
          </select>
          {errors.subject && <p className="inputValidation">{errors.subject}</p>}
        </div>
        <div className="message">
          <label htmlFor={messageId}>Message</label>
          <textarea
            name="message"
            id={messageId}
            value={values.message}
            onChange={handleChange}
            cols="30"
            rows="10"
          ></textarea>
          {errors.message && <p className="inputValidation">{errors.message}</p>}
        </div>
        <div className="submitButton">
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
  );
}

export default ContactRegisterForm;
