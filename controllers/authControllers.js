import { StatusCodes } from "http-status-codes";
// import User from '../models/userModel.js'

export const register = async (req, res) => {
    // const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({msg: 'user created'})
}

export const login = async (req, res) =>{
    res.status(StatusCodes.OK).json({msg: 'user logged in'})
}