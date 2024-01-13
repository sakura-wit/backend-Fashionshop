const Order = require("../models/OrderProduct")

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, confirm, email, name, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice, user, isPaid,
            paidAt, isDelivered, deliveredAt, note } = newOrder
        try {

            const createOrder = await Order.create({
                orderItems,
                confirm,
                email,
                name,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice,
                user,
                isPaid,
                paidAt,
                isDelivered,
                deliveredAt,
                note
            })

            if (createOrder) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createOrder
                })
            }
            resolve({})
        } catch (e) {
            reject(e)
        }
    })
}


const getAllOrder = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalOrder = await Order.count()

            if (filter) {
                const allOrderFilter = await Order.find({ [filter[0]]: { '$regex': filter[1] } }).limit(limit).skip(limit * page)
                resolve({
                    status: 'OK',
                    message: 'get All SUCCESS',
                    data: allOrderFilter,
                    total: totalOrder,
                    pageCurrent: page + 1,
                    totalPage: Math.ceil(totalOrder / limit)
                })
            }

            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allOrderSort = await Order.find().limit(limit).skip(limit * page).sort(objectSort)
                resolve({
                    status: 'OK',
                    message: 'get All SUCCESS',
                    data: allOrderSort,
                    total: totalOrder,
                    pageCurrent: page + 1,
                    totalPage: Math.ceil(totalOrder / limit)
                })
            }


            const allOrder = await Order.find().limit(limit).skip(limit * page)
            resolve({
                status: 'OK',
                message: 'get All SUCCESS',
                data: allOrder,
                total: totalOrder,
                pageCurrent: page + 1,
                totalPage: Math.ceil(totalOrder / limit)
            })
        } catch (e) {
            reject(e)
        }
    })
}

const updateOrder = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkOrder = Order.findOne({
                id: id
            })

            if (checkOrder === null) {
                resolve({
                    status: "done",
                    message: "The product is not define"
                })
            }

            const updateOrder = await Order.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: "OK",
                message: "update product SUCCESS",
                updateOrder
            })
        } catch (e) {
            reject(e)
        }
    })
}


const deleteOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkOrder = await Order.findOne({
                _id: id
            })

            if (checkOrder === null) {
                resolve({
                    status: "Done",
                    message: "The id is not define"
                })
            }
            console.log('iddddd', id);
            await Order.findByIdAndDelete(id)
            resolve({
                status: "OK",
                message: "delete order Success"
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createOrder,
    getAllOrder,
    updateOrder,
    deleteOrder
}