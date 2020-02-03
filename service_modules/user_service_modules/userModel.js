 const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")
// const Schema   = require("./userSchema")

const UserSchema = new mongoose.Schema({ 
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },   
    password: {
        type: String,
        required: true,
        minlength: 4,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        minlength: 2
    },
    lastName: {
        type: String,
        require: true,
        minlength: 2
    }
})

// Hash plain text password before saving
UserSchema.pre('save', async function(next) {

    if (this.isModified('password')) {
       this.password = await bcrypt.hash(this.password, 8);
    }
 
    next();
 });

module.exports = User = mongoose.model("user", UserSchema);