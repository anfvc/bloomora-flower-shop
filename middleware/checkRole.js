import { StatusCodes } from "http-status-codes";

function checkRole(authorizedRole) {
  return function (req, res, next) {
    if (req.user.role !== authorizedRole) {
      return next(StatusCodes.UNAUTHORIZED).json(
        "You are unauthorized to perform this action."
      );
    }

    next();
  };
}

export default checkRole;
