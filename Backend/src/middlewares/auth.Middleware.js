const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const redis = require('../config/cache');

// function for token verification
async function authUser(req, res, next) {

 
    // getting token fron cookies
    const token = req.cookies.token 

    // console.log("cookie token",token) --> debugging
    // if token is not provided in cookies
    if (!token) {
        return res.status(401).json({
            message: "Token is not Provided"
        })
    }

    // checking if token is blacklisted
    const isBlackListed = await redis.get(token)
    // console.log("redis result",isBlackListed) --> debugging
    if (isBlackListed) {
        // console.log("token is blacklisted") -->  debugging
        return res.status(401).json({
            message: "Token is Blacklisted, as User LoggedOut"
        })
    }
    // console.log("token is not blacklisted") --> debugging

    // token verification through jwt.verify
    // decoded is users data
    // also calling next function to pass user data to next middleware
    try {
        const decoded = jwt.verify(
            token, 
            process.env.JWT_SECRET
        )
        req.user = decoded
        next()
    }
 
    // if token is not valid
    catch (err) {
        return res.status(401).json({
            message: "Token is not Valid"
        })
    }
}

module.exports = {
    authUser
}