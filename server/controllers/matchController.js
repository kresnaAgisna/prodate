const { Match, User } = require('../models')


class MatchController {
    static async followUser(req, res, next) {
        const followingId = +req.user.id
        const followerId = +req.params.id
        try {
            // Check if followed User exist
            const findUser = await User.findByPk(followerId)
    
            if(!findUser) {
                throw ({name: 'notFound', message: 'Followed user not found'})
            }
            // Check if User already follow target User
            const findMatch = await Match.findOne({ where: { followingId, followerId }})

            if(findMatch) {
                throw ({name: 'AlreadyExist', message: 'You already followed this user'})
            }
            
            const followUser = await Match.create({followingId, followerId})

            res.status(200).json(followUser)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = MatchController