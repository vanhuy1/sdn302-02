const Department = require('../models/Department')

const getAllDepartment = async (req, res) => {
    try {
        const department = await Department.find({})
        res.status(200).json(department)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getDepartment = async (req, res) => {
    try {
        const { id } = req.params
        const department = await Department.findById(id);
        res.status(200).json(department)
    } catch (err) {
        res.status(500).json({ message: error.message });
    }
}

const newDepartment = async (req, res) => {
    try {
        const departments = await Department.create(req.body)
        res.status(200).json(departments)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteDepartment = async (req, res) => {

    try {
        const { id } = req.params
        const department = await Department.findByIdAndDelete(id)

        if (!department) {
            return res.status(404).json({ message: "Department not found!" })
        }

        res.status(200).json({ message: "Department deleted successfully!" })
    } catch (err) {
        res.status(500).json({ message: error.message })
    }

}

module.exports = {
    getAllDepartment,
    getDepartment,
    newDepartment,
    deleteDepartment

}