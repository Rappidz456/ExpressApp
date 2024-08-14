const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")

const registerUser = asyncHandler( async (req, res) => {
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }
    const emailAvailable = await User.findOne({email})
    if (emailAvailable) {
        res.status(400);
        throw new Error("User already register")
    }
    // Hash Password
    const hashedpassword = await bcrypt.hash(password, 10)
    console.log("The Hashed Password is : ", hashedpassword);
    const user = await User.create({
        username,
        email,
        password: hashedpassword
    })
    console.log(`User created Successfully ${user}`)
    if (user) {
        res.status(201).json({_id: user.id, email: user.email})
    }
    else{
        res.status(400);
        throw new Error("User Data is not valid")
    }
    res.json({message: "Register The User"})
})

const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
        res.status(400);
        throw new Error("All Fields are Mandatory")
    }
    const user = await User.findOne({email});
    // compare pasword with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jsonwebtoken.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        },
        process.env.ACCESS_TOKEN,
        {
            expiresIn: "15m"
        }
    )
        res.status(200).json({accessToken});
    }
    else{
        res.status(400);
        throw new Error("Email or Password is not valid")
    }
    res.json({message: "Login The User"})
})

const currentUser = asyncHandler( async (req, res) => {
    res.json(req.user)
})

module.exports = {registerUser, loginUser, currentUser}