import { Schema, model } from "mongoose";
import validator from "validator";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: "Incorrect email format. Please check.",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isStrongPassword(value, { minLength: 5 });
      },
      message:
        "Password must have minimum 5 characters, 1 lowercase character, 1 uppercase character, 1 number and 1 symbol.",
    },
  },
  role: {
    type: String,
    required: true,
    enum: [ "admin", "user" ],
    default: "user"
  }
});

const User = model("User", userSchema);

export default User;
