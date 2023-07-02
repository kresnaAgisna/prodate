const { User, Profile, Match } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {
    static async registerUser(req, res, next) {
        const { email, password } = req.body
        try {
            const newUser = await User.create({ email, password})

            res.status(201).json({id: newUser.id, email })
        } catch (error) {
            next(error)
        }
    }

    static async loginuser(req, res, next) {
        const { email, password } = req.body
        try {
            if(!email || !password) {
                throw({name: 'InvalidEmailPassowrd', message: 'Invalid email/password'})
            }
            const findUser = await User.findOne({where: { email }})

            if(!findUser || !comparePassword(password, findUser.password)) {
                throw({name: 'InvalidEmailPassowrd', message: 'Invalid email/password'})
            }

            const access_token = signToken({id: findUser.id})

            res.status(200).json({access_token})
        } catch (error) {
            next(error)
        }
    }

    static async getAllUsers(req, res, next) {
        try {
            const users = await User.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [
                {
                    association: 'follower',
                    attributes: ['id']
                }, 
                {
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

    static async createProfile(req, res, next) {
        const { firstName, lastName, gender, age} = req.body
        const userId = req.user.id
        try {
            const newProfile = Profile.create({
                firstName,
                lastName,
                gender,
                age,
                UserId: userId
            })

            res.status(201).json(newProfile)
        } catch (error) {
            next(error)
        }
    }
}


module.exports = UserController