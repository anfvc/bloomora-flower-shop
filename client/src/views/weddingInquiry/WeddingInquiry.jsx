import React from "react";
import "./WeddingInquiry.css";
import { useFormik } from "formik";
import { useId } from "react";
import { useTranslation } from "react-i18next";
import { validationSchema } from "../../components/weddingInquiryValidation/weddingInquiryValidation";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function WeddingInquiry() {
  const { t } = useTranslation();

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstName: "",
      partnerName: "",
      email: "",
      mailing: "",
      phone: "",
      subject: "",
      message: "",
    },
    validationSchema: validationSchema,
  });

  const firstNameId = useId();
  const partnerNameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const mailingId = useId();
  const subjectId = useId();
  const messageId = useId();

  return (
    <div className="weddingInquiryContainer">
      <div className="inquiryBackground"></div>
      <div className="header">
        <h1>wedding inquiry form</h1>
      </div>
      <p>
        Thanks for choosing Bloomora, Inc. for your big day. We're thrilled to
        be a part of your event. Use the form below to tell us how we can best
        serve you!
      </p>
      <div className="field">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { marginRight: 10, width: "80ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id={firstNameId}
            name="firstName"
            label="First Name"
            variant="outlined"
            value={values.firstName}
            onChange={handleChange}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
            InputProps={{
              style: { fontSize: "1.4rem" },
            }}
            InputLabelProps={{
              style: { fontSize: "1.4rem" },
            }}
          />
          <TextField
            id={partnerNameId}
            name="partnerName"
            label="Partner Name"
            variant="outlined"
            value={values.partnerName}
            onChange={handleChange}
            error={Boolean(errors.partnersName)}
            helperText={errors.partnersName}
            InputProps={{
              style: { fontSize: "1.4rem" },
            }}
            InputLabelProps={{
              style: { fontSize: "1.4rem" },
            }}
          />
        </Box>
      </div>
      <div className="field">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { marginRight: 10, width: "80ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id={emailId}
            name="Email"
            label="Email"
            variant="outlined"
            value={values.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
            InputProps={{
              style: { fontSize: "1.4rem" },
            }}
            InputLabelProps={{
              style: { fontSize: "1.4rem" },
            }}
          />
          <TextField
            id={phoneId}
            name="phone"
            label="Phone"
            variant="outlined"
            value={values.phone}
            onChange={handleChange}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
            InputProps={{
              style: { fontSize: "1.4rem" },
            }}
            InputLabelProps={{
              style: { fontSize: "1.4rem" },
            }}
          />
        </Box>
      </div>
      <div className="field">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { marginRight: 10, width: "80ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id={mailingId}
            name="firstName"
            label="First Name"
            variant="outlined"
            value={values.mailing}
            onChange={handleChange}
            error={Boolean(errors.mailing)}
            helperText={errors.mailing}
            InputProps={{
              style: { fontSize: "1.4rem" },
            }}
            InputLabelProps={{
              style: { fontSize: "1.4rem" },
            }}
          />
          {/* <TextField
            id={lastNameId}
            name="partnersName"
            label="Partner Name"
            variant="outlined"
            value={values.partnersName}
            onChange={handleChange}
            error={Boolean(errors.partnersName)}
            helperText={errors.partnersName}
            InputProps={{
              style: { fontSize: "1.4rem" },
            }}
            InputLabelProps={{
              style: { fontSize: "1.4rem" },
            }}
          /> */}
        </Box>
      </div>
    </div>
  );
}

export default WeddingInquiry;
