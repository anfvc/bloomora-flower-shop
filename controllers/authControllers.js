import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  // the first user will be an admin
  const isFirstAccount = await User.countDocuments() === 0
    req.body.role = isFirstAccount ? 'admin' : 'user';

    if(req.body.password !==req.body.confirmPassword) throw new UnauthenticatedError("Invalid credentials");

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  const hashedConfirmPassword = await hashPassword(req.body.confirmPassword);
  req.body.confirmPassword = hashedConfirmPassword;
  
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({
    msg: `${user.firstName} ${user.lastName} has successfully registered.`,
    id: user._id,
  });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  console.log("user", user);
  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));
    const hashedPassword = await hashPassword(req.body.password);
    
  if (!isValidUser) throw new UnauthenticatedError("Invalid login credentials");

  const token = createJWT({ userId: user._id, role: user.role });
 
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: true,
  });
console.log("login");
  res.status(StatusCodes.OK).json({
      msg: `${user.email} has successfully logged in.`, user});
};

export const logout = (req, res) => {
  
  res.clearCookie("token")
    console.log('logout');
  res.status(StatusCodes.OK).json({ msg: "User logged out!" });
};


