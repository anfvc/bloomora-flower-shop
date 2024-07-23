import express from "express"
import { deleteUser, updateUser } from "../controllers/userControllers.js"
import { authenticateUser } from "../middleware/authMiddleware.js"
import { getUser } from "../controllers/userControllers.js"

const router = express.Router()

router.patch("/update/:id", updateUser)
router.get("/refreshuser", authenticateUser, getUser)
router.delete("/delete/:id", deleteUser)

export default router