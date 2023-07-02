const express = require('express')
const UserController = require('../controllers/userController')
const authenticateUser = require('../middlewares/authentication')
const router = express.Router()

router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginuser)
router.use(authenticateUser)
router.get('/', UserController.availableUserList)
router.post('/profiles', UserController.createProfile)
router.get('/profiles', UserController.getUserProfile)


module.exports = router