import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";

export const updateUser = async (req, res) => {
  const obj = req.body;
  const { id } = req.params;
  console.log("obj", obj);
  try {
    const updatedUser = await User.findByIdAndUpdate(id, obj, { new: true });

    if (obj.password !== obj.confirmPassword)
      throw new UnauthenticatedError("Invalid credentials");

    const hashedPassword = await hashPassword(obj.password);
    updatedUser.password = hashedPassword;

    const hashedConfirmPassword = await hashPassword(obj.confirmPassword);
    updatedUser.confirmPassword = hashedConfirmPassword;

    if (!updatedUser) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }

    console.log("updatedUser", updatedUser);
    res.status(StatusCodes.OK).json({ msg: "update user", updatedUser });
    //console.log("updatedUser",updatedUser);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  const foundUser = await User.findById(req.user.userId);
  console.log("foundUser", foundUser);
  res.json({ user: foundUser });
  // res.end()
};
