const express = require('express')
const user = require('./user')
const match = require('./match')
const router = express.Router()

router.use('/users', user)
router.use('/matches', match)


module.exports = router