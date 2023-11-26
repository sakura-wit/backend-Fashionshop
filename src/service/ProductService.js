const Product = require("../models/ProductModel")


const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description, discount, selled } = newProduct
        try {
            const checkProduct = await Product.findOne({
                name: name
            })

            if (checkProduct !== null) {
                resolve({
                    status: 'OK',
                    message: "The name of product is already"
                })

            }

            const createProduct = await Product.create({
                name,
                image,
                type,
                price,
                countInStock,
                rating,
                description,
                discount,
                selled
            })

            if (createProduct) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createProduct
                })
            }
            resolve({})
        } catch (e) {
            reject(e)
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = Product.findOne({
                id: id
            })

            if (checkProduct === null) {
                resolve({
                    status: "done",
                    message: "The product is not define"
                })
            }

            const updateProduct = await Product.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: "OK",
                message: "update product SUCCESS",
                updateProduct
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })

            if (checkProduct === null) {
                resolve({
                    status: "Done",
                    message: "The id is not define"
                })
            }

            await Product.findOneAndDelete(id)
            resolve({
                status: "OK",
                message: "delete product Success"
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.count()

            if (filter) {
                const allProductFilter = await Product.find({ [filter[0]]: { '$regex': filter[1] } }).limit(limit).skip(limit * page)
                resolve({
                    status: 'OK',
                    message: 'get All SUCCESS',
                    data: allProductFilter,
                    total: totalProduct,
                    pageCurrent: page + 1,
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }

            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allProductSort = await Product.find().limit(limit).skip(limit * page).sort(objectSort)
                resolve({
                    status: 'OK',
                    message: 'get All SUCCESS',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: page + 1,
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }


            const allProduct = await Product.find().limit(limit).skip(limit * page)
            resolve({
                status: 'OK',
                message: 'get All SUCCESS',
                data: allProduct,
                total: totalProduct,
                pageCurrent: page + 1,
                totalPage: Math.ceil(totalProduct / limit)
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkIdProduct = Product.findOne({
                _id: id
            })

            if (checkIdProduct === null) {
                resolve({
                    status: "check done",
                    message: "The id is not define "
                })
            }

            const detailProduct = await Product.findById(id)
            resolve({
                status: "OK",
                detailProduct
            })

        } catch (e) {
            reject(e)
        }

    })
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getDetailProduct
}