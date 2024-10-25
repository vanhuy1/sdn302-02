const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const loginLimiter = require('../middleware/loginLimiter')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/')
.post(loginLimiter, authController.login)

router.route('/refresh')
.get(authController.refresh)

router.use(verifyJWT)
router.route('/logout')
    .post(authController.logout)

router.route('/profile').get(authController.viewProfile)
router.route('/profile').put(authController.editProfile)
router.route('/change-password').post(authController.changePassword)

module.exports = router