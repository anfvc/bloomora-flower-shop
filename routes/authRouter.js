import { Router } from "express";
import { register, login, logout, getUser } from "../controllers/authControllers.js";
import {
  userValidationErrorHandling,
  validateLoginInputs,
  validateRegisterInputs,
} from "../middleware/validation.js";
import { authenticateUser } from "../middleware/authMiddleware.js";


const router = Router();
// router.use(authenticateUser)
router.post("/register", validateRegisterInputs, register);

router.post("/login", validateLoginInputs,userValidationErrorHandling, login);

router.post("/logout", logout)
router.get("/refreshuser", authenticateUser, getUser)


export default router;
