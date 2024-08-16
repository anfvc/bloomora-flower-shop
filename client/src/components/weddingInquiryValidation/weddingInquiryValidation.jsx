import * as yup from "yup";

export const validationSchema = yup.object({
  firstName: yup.string().required("Please do not leave the first name field empty."),
  partnerName: yup.string().required("Please do not leave the partner name field empty."),
  email: yup
    .string()
    .email("Please enter a valid e-mail address.")
    .required("Please do not leave the e-mail field empty."),
  phone: yup
    .string()
    .matches(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,4}$/,
      "Please enter a valid phone number."
    )
    .required("Please do not leave the phone field empty."),
  weddingDate: yup
    .date()
    .required("Please do not leave the wedding date field empty."),
  venue: yup.string().required("Please do not leave the venue field empty."),
  guests: yup
    .number()
    .min(1, "The number of guests must be at least 1.")
    .required("Please do not leave the number of guests field empty."),
  budget: yup
    .number()
    .min(1, "Please enter a valid budget.")
    .required("Please do not leave the budget field empty."),
  mailingAddress: yup.string().required("Please do not leave the mailing address field empty."),
  eventType: yup.string().required("Please select an event type."),
  contactMethod: yup.string().required("Please select a preferred contact method."),
  weddingTheme: yup.array().min(1, "Please select at least one wedding theme."),
  howDidYouHear: yup.string().required("Please let us know how you heard about us."),
  message: yup.string().required("Please do not leave the message field empty.")
});
