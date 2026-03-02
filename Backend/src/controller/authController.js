const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

// above code is for requiring all essential files for authentication



// Register user function
async function registerUser(req, res) {

    // get user data from request which is send by postman
    const { username, email, password } = req.body

    // check if user already registered
    const isAlreadyRegistered = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    }
    )

    //  if user already registered then what message to show
    if (isAlreadyRegistered) {
        {
            return res.status(400).json({
                message: "User already registered Try Login"
            })
        }
    }

    // password encryption
    const hashedPassword = await bcrypt.hash(password, 10)


    // user creation
    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
    })

    // token generation
    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, {
        expiresIn: "3d"
    })

    // response with token
    res.cookie("token", token)

    // message response with user data
    return res.status(201).json({
        message: "userRegistered Succesfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}



async function loginUser(req, res) {

    // get user data from request from postman
    const { email, password , username } = req.body
    const user = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    }).select("+password")  // by default password is not visible
  

    // check if user exists
    if (!user) {
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }

    // token generation
    const token = jwt.sign({
        id: user._id,
        username: user.username
    },
        process.env.JWT_SECRET,
        {
            expiresIn: "3d"
        })
    // token send to cookies
    res.cookie("token",token)  
    
    return res.status(200).json({
        message:"User Logged In",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}



module.exports = {
    registerUser,
    loginUser
}