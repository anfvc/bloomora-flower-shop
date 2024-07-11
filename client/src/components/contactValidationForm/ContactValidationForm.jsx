import * as yup from "yup";

export const validationSchema = yup.object({
  firstName: yup.string().required("Please do not leave the first name field empty."),
  lastName: yup.string().required("Please do not leave the last name field empty."),
  email: yup.string().email("Please enter a valid e-mail address.").required("Please do not leave the e-mail field empty."),
  phone: yup.string().matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,4}$/, "Please enter a valid phone number").required("Please do not leave the phone field empty"),
  subject: yup.string().required("Please select a subject."),
  message: yup.string().required("Please do not leave the message field empty.")
});