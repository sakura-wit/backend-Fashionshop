const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const AuthMiddleware = (req, res, next) => {
    const check = req.headers.token
    const token = req.headers.token?.split(' ')[1]
    // console.log('check', token);
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }

        const { payload } = user
        if (payload?.isAdmin) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }
    })
}


const AuthUserMiddleware = (req, res, next) => {

    const token = req.headers.token?.split(' ')[1]
    const userId = req.params.id

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }
        const { payload } = user
        if (payload.isAdmin || userId === payload.id) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }
    })
}

module.exports = {
    AuthMiddleware,
    AuthUserMiddleware
}