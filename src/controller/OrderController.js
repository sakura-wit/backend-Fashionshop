const OrderService = require('../service/OrderService')

const createOrder = async (req, res) => {
    // console.log('req', req.body);

    try {

        const { orderItems, confirm, email, name, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice, user, isPaid,
            paidAt, isDelivered, deliveredAt } = req.body

        if (!orderItems || !shippingAddress || !paymentMethod || !itemsPrice || !shippingPrice || !totalPrice || !user) {
            return res.status(200).json({
                status: 'ERR',
                message: 'the input is required'
            })
        }
        const response = await OrderService.createOrder(req.body)
        return res.status(200).json(response)
    } catch (e) {
        console.log('errr ', e);
        return res.status(404).json({
            message: e

        })
    }
}

const getAllOrder = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await OrderService.getAllOrder(Number(limit), Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        console.log('errr ', e);
        return res.status(404).json({
            message: e

        })
    }
}


const updateOrder = async (req, res) => {
    try {

        orderId = req.params.id
        const data = req.body

        if (!orderId) {
            return res.status(404).json({
                status: "ERR",
                message: "The productId is required"
            })
        }
        const response = await OrderService.updateOrder(orderId, data)
        return res.status(200).json(response)

    } catch (e) {
        console.log('errr ', e);
        return res.status(404).json({
            message: e

        })
    }
}

module.exports = {
    createOrder,
    getAllOrder,
    updateOrder
}