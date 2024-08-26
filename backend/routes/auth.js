import express from "express"
import userController from "../controllers/userController.js"

const router = express.Router()

router.get("/", userController.checkCredentials)
router.post('/signup', userController.userSignup)
router.post('/login', userController.userLogin)
router.post('/logout', userController.userLogout)
router.post('/EditProfile', userController.editProfile)
router.get("/check-auth", userController.checkAuth)

export default router
