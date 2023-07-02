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

    static async getUserProfile(req, res, next) {
        const {id} = req.user
        try {
            const user = await User.findByPk(id, {
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [
                {
                    model: Profile,
                    attributes: {
                        exclude: ['updatedAt', 'createdAt']
                    }
                },
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

            const response = JSON.parse(JSON.stringify(user)) 
            delete response.password

            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async createProfile(req, res, next) {
        const { firstName, lastName, gender, age} = req.body
        const userId = req.user.id
        try {
            const findProfile = await Profile.findOne({
                where: {
                    UserId: userId
                }
            })

            if(findProfile) {
                throw ({name: 'AlreadyExist', message: 'This user already have a profile'})
            }

            const newProfile = await Profile.create({
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