const jwt = require('jsonwebtoken')
const User = require('../models/User')

const verifyJWT = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization
    
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
    
        const token = authHeader.split(' ')[1]

        if (!token) {
            return res.status(401).json({ message: 'Authorization token is malformed' })
        }
    
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.status(403).json({ message: 'Forbidden' })

                const user = await User.findById(decoded.UserInfo.id);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' })
                }

                req.user.id = decoded.UserInfo.id
                req.user.username = decoded.UserInfo.username
                req.roles = decoded.UserInfo.roles
                next()
            }
        )
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired' })
        }
        return res.status(401).json({ message: 'Unauthorized' })
    }
}

module.exports = verifyJWT 