const { User, Match } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {
    static async registerUser(req, res, next) {
        const { email, password } = req.body
        try {
            const newUser = await User.create({ email, password})

            res.status(201).json({id: newUser.id, email })
        } catch (error) {
            console.log(error)
        }
    }

    static async loginuser(req, res, next) {
        const { email, password } = req.body
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
                    association: 'follower',
                    attributes: ['id']
                }, {
                    association: 'following',
                    attributes: ['id']
                }]
                // include: [{
                //     model: Match,
                //     attributes: {
                //         exclude: ['createdAt', 'updatedAt']
                //     },
                // }]
            })
            res.status(200).json(users)
        } catch (error) {
            console.log(error)
        }
    }
}


module.exports = UserController