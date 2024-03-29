const express = require("express")
const router = express.Router()
const userController = require('../controller/UserController')
const { AuthMiddleware, AuthUserMiddleware } = require("../middleware/AuthMiddleware")

router.post('/sign-up', userController.createUser)
router.post('/sign-in', userController.loginUser)
// router.post('/log-out', userController.logoutUser)
router.put('/update-user/:id', userController.updateUser)
router.delete('/delete-user/:id', AuthMiddleware, userController.deleteUser)
router.get('/getAll/', AuthMiddleware, userController.getAllUser)
router.get('/getDetails/:id', userController.getDetailsUser)
router.post('/refresh-token', userController.refreshToken)


module.exports = router