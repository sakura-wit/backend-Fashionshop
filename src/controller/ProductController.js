const Product = require('../models/ProductModel')
const ProductService = require('../service/ProductService')

const createProduct = async (req, res) => {

    try {

        const { name, image, type, price, countInStock, rating, description, discount, selled } = req.body

        if (!name || !image || !type || !price || !countInStock || !rating) {
            return res.status(200).json({
                status: 'ERR',
                message: 'the input is required'
            })
        }
        const response = await ProductService.createProduct(req.body)
        return res.status(200).json(response)
    } catch (e) {
        console.log('errr ', e);
        return res.status(404).json({
            message: e

        })
    }
}

const updateProduct = async (req, res) => {
    try {

        productId = req.params.id
        const data = req.body

        if (!productId) {
            return res.status(404).json({
                status: "ERR",
                message: "The productId is required"
            })
        }
        const response = await ProductService.updateProduct(productId, data)
        return res.status(200).json(response)

    } catch (e) {
        console.log('errr ', e);
        return res.status(404).json({
            message: e

        })
    }
}

const deleteProduct = async (req, res) => {
    try {


        const productId = req.params.id
        if (!productId) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }

        const response = await ProductService.deleteProduct(productId)
        return res.status(200).json(response)

    } catch (e) {
        console.log('errr ', e);
        return res.status(404).json({
            message: e

        })
    }
}

const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await ProductService.getAllProduct(Number(limit) || 8, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        console.log('errr ', e);
        return res.status(404).json({
            message: e

        })
    }
}

const getDetailProduct = async (req, res) => {

    try {
        const idProduct = req.params.id
        if (!idProduct) {
            res.status(404).json({
                status: 'ERR',
                message: "The id is required"
            })
        }

        const response = await ProductService.getDetailProduct(idProduct)
        return res.status(200).json(response)
    } catch (e) {
        console.log('errr ', e);
        return res.status(404).json({
            message: e

        })
    }
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getDetailProduct
}