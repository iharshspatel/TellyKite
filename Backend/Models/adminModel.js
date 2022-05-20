const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminSchema = new mongoose.Schema({
    admin_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    role: {
        type: String,
        default: "admin"
    },
    name: String,
    // address:String,
    // Date:Date,
    // contactno:Number,
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: [true, 'please enter your password'],
        minlength: [6, 'min length of password should be 6'],
        select: false
    },


});
adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});
//JWT
adminSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}
//compare password
adminSchema.methods.comparePassword = async function (enteredPassword) {
    // console.log(bcrypt.compare(enteredPassword, this.password));
    const bool = await bcrypt.compare(enteredPassword, this.password);
    // console.log(bool);
    return bool;
}
// Generating Password Reset Token
adminSchema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};
module.exports = mongoose.model("Admin", adminSchema);