const { User, Match } = require('../models')


class UserController {
    static async registerUser(req, res, next) {
        try {
            
        } catch (error) {
            console.log(error)
        }
    }

    static async getAllUsers(req, res, next) {
        try {
            const users = await User.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [{
                    model: Match,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                }]
            })
            res.status(200).json(users)
        } catch (error) {
            console.log(error)
        }
    }
}


module.exports = UserController