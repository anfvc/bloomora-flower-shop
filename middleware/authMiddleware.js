import { UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser =  (req, res, next) => {
    const {token} = req.cookies;
         console.log("token", token);
    if(!token){
        throw new UnauthenticatedError('line 7 authentication invalid')
    }
    try {
        const {userId, role} = verifyJWT(token);
        req.user = {userId, role}
        // const user = verifyJWT(token);
        // req.user = user
        // console.log("user", user);
        next()
    } catch (error) {
        throw new UnauthenticatedError('line 17 authentication invalid')
    }
}
