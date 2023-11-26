const express = require("express")
const router = express.Router()
const productController = require('../controller/ProductController')
const { AuthMiddleware, AuthUserMiddleware } = require('../middleware/AuthMiddleware')

router.post('/create-product', productController.createProduct)
router.put('/update-product/:id', productController.updateProduct)
router.delete('/delete-product/:id', AuthMiddleware, productController.deleteProduct)
router.get('/get-allProduct', productController.getAllProduct)
router.get('/get-detailProduct/:id', AuthUserMiddleware, productController.getDetailProduct)

module.exports = router