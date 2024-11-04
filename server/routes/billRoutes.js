const express = require('express')
const router = express.Router()
const billController = require('../controllers/billController')
const verifyJWT = require('../middleware/verifyJWT')

router.get('/:billId', verifyJWT, billController.getBillById)
router.put('/:billId', verifyJWT, billController.updateBill)
router.delete('/:billId', verifyJWT, billController.deleteBill)
router.get('/', verifyJWT, billController.getBillsByUser)
router.post('/', verifyJWT, billController.createBill)

module.exports = router