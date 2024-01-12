const express = require("express")
const router = express.Router()
const orderController = require('../controller/OrderController')
const { AuthMiddleware, AuthUserMiddleware } = require('../middleware/AuthMiddleware')

router.post('/create-order', orderController.createOrder)
router.get('/get-allOrder', orderController.getAllOrder)
router.put('/update-order/:id', orderController.updateOrder)

module.exports = router