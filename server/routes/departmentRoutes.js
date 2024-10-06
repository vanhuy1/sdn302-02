const DepartmentController = require('../controllers/DepartmentController')
const express = require('express')
const router = express.Router()

router.get('/', DepartmentController.getAllDepartment)
router.post('/', DepartmentController.newDepartment)
router.delete('/', DepartmentController.deleteDepartment)

module.exports = router