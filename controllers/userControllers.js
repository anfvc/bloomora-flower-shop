import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";

export const updateUser = async (req, res) =>{
    const obj = {...req.body}
    const {id} = req.params

try {
    const updatedUser = await User.findByIdAndUpdate(id, obj,{new: true});

    if(!updatedUser){
        return res.status(StatusCodes.NOT_FOUND).json({msg: "User not found"})
    }

    //  if(req.body.password !==req.body.confirmPassword) throw new UnauthenticatedError("Invalid credentials");

    // const hashedPassword = await hashPassword(req.body.password);
    // req.body.password = hashedPassword;
    // const hashedConfirmPassword = await hashPassword(req.body.confirmPassword);
    // req.body.confirmPassword = hashedConfirmPassword;

    res.status(StatusCodes.OK).json({msg: 'update user', updatedUser})
    
} catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
}

}

export const getUser = async (req, res)=>{
    const foundUser = await User.findById(req.user.userId)
     //console.log("foundUser", foundUser);
    res.json({user: foundUser})
    // res.end()
  }