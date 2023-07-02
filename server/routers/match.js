const express = require('express')
const MatchController = require('../controllers/matchController')
const router = express.Router()


router.post('/:id', MatchController.followUser)


module.exports = router