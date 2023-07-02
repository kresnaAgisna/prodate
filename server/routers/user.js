const express = require('express')
const UserController = require('../controllers/userController')
const authenticateUser = require('../middlewares/authentication')
const router = express.Router()

router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginuser)
router.use(authenticateUser)
router.get('/', UserController.getAllUsers)


module.exports = router