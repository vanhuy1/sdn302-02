const User = require('../models/User')
const bcrypt = require('bcrypt')

const getAllUsers = async (req, res) => {
    // Get all users from MongoDB
    const users = await User.find().select('-password').lean()

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
}

const createNewUser = async (req, res) => {
    const { username, password, name, address, birthDay, identifyNumber, phoneNumber, roles } = req.body

    // Confirm data
    if (!username || !password || !name || !address || !birthDay || !identifyNumber || !phoneNumber) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate username
    const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = (!Array.isArray(roles) || !roles.length)
        ? { username, "password": hashedPwd, name, address, birthDay, identifyNumber, phoneNumber }
        : { username, "password": hashedPwd, name, address, birthDay, identifyNumber, phoneNumber, roles }

    // Create and store new user 
    const user = await User.create(userObject)

    if (user) { //created 
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
}

const updateUser = async (req, res) => {
    const { username, name, gender, address, birthDay, identifyNumber, phoneNumber, roles } = req.body

    // Confirm data 
    if (!id || !username || !name || !Array.isArray(gender) || !gender.length || typeof gender !== 'boolean' || !address || birthDay || !identifyNumber || !phoneNumber || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate 
    const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.username = username
    user.name = name
    user.gender = gender
    user.address = address
    user.birthDay = birthDay
    user.identifyNumber = identifyNumber
    user.phoneNumber = phoneNumber
    user.roles = roles
    user.active = active

    if (password) {
        // Hash password 
        user.password = await bcrypt.hash(password, 10) // salt rounds 
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
}

const getUser = async (req, res) => {

}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    getUser
}