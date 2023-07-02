const { verifyToken } = require("../helpers/jwt")
const { User } = require("../models")

const authenticateUser = async(req, res, next) => {
    const { access_token } = req.headers
    try {
        if(!access_token) {
            throw({name: 'InvalidToken', message: 'Invalid token'})
        }

        const payload = verifyToken(access_token)

        const findUser = await User.findByPk(payload.id)

        if(!findUser) {
            throw({name: 'InvalidToken', message: 'Invalid token'})
        }

        req.user = payload
        
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authenticateUser