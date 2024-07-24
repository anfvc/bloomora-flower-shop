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
    

<<<<<<< HEAD
    const updatedUser = await User.findByIdAndUpdate(id, {
        $set: obj
    }, { new: true });
    
    res.status(StatusCodes.OK).json({ msg: "update user", updatedUser });
    
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
=======
     if(req.body.password !==req.body.confirmPassword) throw new UnauthenticatedError("Invalid credentials");

    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;
    const hashedConfirmPassword = await hashPassword(req.body.confirmPassword);
    req.body.confirmPassword = hashedConfirmPassword;

    res.status(StatusCodes.OK).json({msg: 'update user', updatedUser})

} catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
}

}

export const getUser = async (req, res)=>{
    const foundUser = await User.findById(req.user.userId)
     console.log("foundUser", foundUser);
    res.json({user: foundUser})
    // res.end()
>>>>>>> 05a5708 (created stripe checkout sessions)
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
