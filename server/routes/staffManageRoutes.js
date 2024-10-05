const express = require('express')
const router = express.Router()
const StaffManageController = require('../controllers/StaffManageController')
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.get('/', StaffManageController.getAllStaffs)
router.get('/:id', StaffManageController.getStaff)
router.post('/', StaffManageController.newStaff)
router.patch('/', StaffManageController.updateStaff)
router.delete('/', StaffManageController.deleteStaff)

module.exports = router