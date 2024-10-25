const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const loginLimiter = require('../middleware/loginLimiter')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/')
    .post(loginLimiter, authController.login)

router.route('/refresh')
    .get(authController.refresh)

router.route('/logout')
    .post(authController.logout)

router.route('/profile').get(verifyJWT, authController.viewProfile)
router.route('/profile').put(verifyJWT, authController.editProfile)
router.route('/change-password').post(verifyJWT, authController.changePassword)

module.exports = router