const express = require("express")
const router = express.Router()
const userController = require('../controller/UserController')

router.post('/', userController.createUser)
router.post('/sign-in', userController.loginUser)
module.exports = router