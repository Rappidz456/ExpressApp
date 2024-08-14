const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user name"]
    },
    email: {
        type: String,
        required: [true, "Please add the email address"],
        unique: [true, "Email is already taken"]
    },
    password: {
        type: String,
        required: [true, "Please provide the provide"]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)