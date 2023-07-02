const express = require('express')
const UserController = require('../controllers/userController')
const router = express.Router()

router.get('/', UserController.getAllUsers)
router.post('/register', UserController.registerUser)
router.post('/login', UserController.registerUser)


module.exports = router