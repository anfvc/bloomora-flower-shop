import express from "express"
import { addToWishList, deleteFromWishlist, getWishList } from "../controllers/wishListController.js"

const router = express.Router()

router.get('/get/:userId', getWishList)
router.post('/add/:userId', addToWishList)
router.delete("/delete/:userId", deleteFromWishlist)

export default router