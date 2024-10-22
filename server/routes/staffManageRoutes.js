const express = require('express')
const router = express.Router()
const StaffManageController = require('../controllers/StaffManageController')
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.get('/', StaffManageController.getAllStaffs)
router.get('/:staffId', StaffManageController.getStaffById)
router.post('/', StaffManageController.createNewStaff)
router.patch('/:staffId', StaffManageController.updateStaff)
router.delete('/:staffId', StaffManageController.deleteStaff)

module.exports = router