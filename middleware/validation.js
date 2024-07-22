import { BadRequestError } from "../errors/customErrors.js";
import User from "../models/User.js";
import { validationResult, body } from "express-validator";

export const validateRegisterInputs = [
  body("firstName").notEmpty().withMessage("First name is required."),
  body("lastName").notEmpty().withMessage("Last name is required."),
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email format.")
    .custom(async (email) => {
      const userExists = await User.findOne({ email });
      if (userExists) throw new BadRequestError("Email already exists.");
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must have min. 8 chars with at least 1 symbol, 1 uppercase, 1 lowercase and 1 number"
    ),
    // submit password part
    body("confirmPassword")
    .notEmpty()
    .withMessage("Please confirm password"),
    
    
];

export const validateLoginInputs = [
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email format."),

  body("password").notEmpty().withMessage("Password is required."),
 
];

export function userValidationErrorHandling(req, res, next) {
  const errors = validationResult(req);
  console.log(errors);

  if (errors.isEmpty()) {
    return next();
  }

  const error = new Error(
    errors
      .array()
      .map((error) => error.msg)
      .join(", ")
  );
  next(error);
}
