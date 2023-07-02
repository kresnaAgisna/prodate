const { Match } = require('../models')


class MatchController {
    static async followUser(req, res, next) {
        const followingId = +req.body.followingId
        const followerId = +req.body.followerId
        console.log(followingId, followerId)
        try {
            const followUser = await Match.create({followingId, followerId})

            res.status(200).json(followUser)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = MatchController