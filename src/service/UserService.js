const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const { genneralAccessToken, genneralRefreshToken } = require('./jwtService')

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })

            if (checkUser !== null) {
                resolve({
                    status: 'OK',
                    message: "The email is already"
                })

            }
            const hash = bcrypt.hashSync(password, 10)
            const createUser = await User.create({
                name,
                email,
                password: hash,
                confirmPassword,
                phone
            })

            if (createUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createUser
                })
            }
            resolve({})
        } catch (e) {
            reject(e)
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = userLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })

            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: "The email is not define"
                })

            }

            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            console.log("compareeee", comparePassword);
            if (!comparePassword) {
                resolve({
                    status: 'OK',
                    message: "The password incorrrect"
                })
            }

            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            if (createUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    access_token,
                    refresh_token
                })
            }
            resolve({})
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    loginUser
}