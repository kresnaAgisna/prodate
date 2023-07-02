const express = require('express')
const user = require('./user')
const match = require('./match')
const authenticateUser = require('../middlewares/authentication')
const router = express.Router()

router.use('/users', user)
router.use(authenticateUser)
router.use('/matches', match)


module.exports = router