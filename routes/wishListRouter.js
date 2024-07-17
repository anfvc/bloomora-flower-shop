import express from "express"
import { addToWishList, getWishList } from "../controllers/wishListController.js"

const router = express.Router()

router.get('/get/:userId', getWishList)
router.post('/add/:userId', addToWishList)

export default router