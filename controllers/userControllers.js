import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

export const updateUser = async (req, res) => {
  let obj = req.body;
  const { id } = req.params;
  // console.log("obj", obj);
  try {
    const foundUser = await User.findById(id);
    if (!foundUser) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }
    

    const updatedUser = await User.findByIdAndUpdate(id, {
        $set: obj
    }, { new: true });
    
    res.status(StatusCodes.OK).json({ msg: "update user", updatedUser });
    
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  const foundUser = await User.findById(req.user.userId);
    res.status(StatusCodes.OK).json({ user: foundUser });
  
};

export const deleteUser = async (req, res) => {
  
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (deletedUser) {
      res.status(StatusCodes.OK).json({msg: `${deletedUser.firstName} ${deletedUser.lastName} was successfully deleted`})
    } else  res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });

  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}
