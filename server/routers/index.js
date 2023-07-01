const express = require('express')
const user = require('./user')
const match = require('./match')
const router = express.Router()

router.use('/user', user)
router.use('/matchs', match)


module.exports = router