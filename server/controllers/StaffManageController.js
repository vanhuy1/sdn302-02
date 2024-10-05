const Staff = require('../models/Staff')
const Department = require('../models/Department')

const getAllStaffs = async (req, res) => {
    const staffs = await Staff.find().lean()

    if (!staffs.length) {
        return res.status(400).json({ message: 'No staffs found' })
    }

    const staffWithDepartment = await Promise.all(staffs.map(async (staff) => {
        const department = await Department.findById(staff.department).lean().exec()
        return { ...staff, departmentName: department.departmentName }
    }))

    res.json(staffWithDepartment)
}

const getStaff = async (req, res) => {

}

const newStaff = async (req, res) => {
    const { department, staffName, birthday, address, identityNumber, phoneNumber } = req.body

    if (!department, !staffName, !birthday, !address, !identityNumber, !phoneNumber) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const duplicate = await Staff.findOne({ identityNumber }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate Staff identity' })
    }

    const staff = await Staff.create({ department, staffName, birthday, address, identityNumber, phoneNumber })

    if (staff) { // Created 
        return res.status(201).json({ message: 'New staff created' })
    } else {
        return res.status(400).json({ message: 'Invalid staff data received' })
    }
}

const updateStaff = async (req, res) => {
    const { id, department, staffName, gender, birthday, address, identityNumber, phoneNumber, active } = req.body

    if (id, !department || !staffName || typeof gender !== "boolean" || !birthday || !address || !identityNumber || !phoneNumber, typeof active !== "boolean") {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const staff = await Staff.findById(id).exec()

    if (!staff) {
        return res.status(400).json({ message: 'Staff not found' })
    }

    const duplicate = await Staff.findOne({ identityNumber }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // if (duplicate) {
    //     return res.status(409).json({ message: 'Duplicate Staff identity' })
    // }

    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate staff identity' })
    }

    staff.department = department
    staff.staffName = staffName
    staff.gender = gender
    staff.birthday = birthday
    staff.address = address
    staff.identityNumber = identityNumber
    staff.phoneNumber = phoneNumber
    staff.active = active

    const updateStaff = await staff.save()

    res.json(`'${updateStaff.staffName}' update`)
}

const deleteStaff = async (req, res) => {

}

module.exports = {
    getAllStaffs,
    getStaff,
    newStaff,
    updateStaff,
    deleteStaff
}