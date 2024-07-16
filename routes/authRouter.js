import { Router } from "express";
import { register, login } from "../controllers/authControllers.js";
import {
  userValidationErrorHandling,
  validateLoginInputs,
  validateRegisterInputs,
} from "../middleware/validation.js";

const router = Router();

router.post(
  "/register",
  validateRegisterInputs, register
);
router.post("/login", validateLoginInputs, userValidationErrorHandling, login);

export default router;
