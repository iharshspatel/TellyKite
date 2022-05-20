const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const customerSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    reseller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reseller"
    },
    role: {
        type: String,
        default: "customer"
    },
    //dependent customer or independent customer
    mode: {
        type: String, //via reseller or direct

        required: true
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
    company: String,
    address: String,
    website: String,
    location: String,
    plan_type: String,
    Telly_version: String,
    Expiry: Date,
    purchasedate:Date,
    TellyAccounts: [{
        tellyUsername: String,
        tellyPassword: String,
        tellySerial: Number
    }]
});
customerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});
//JWT
customerSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}
//compare password
customerSchema.methods.comparePassword = async function (enteredPassword) {
    // console.log(bcrypt.compare(enteredPassword,this.password));
    const bool = await bcrypt.compare(enteredPassword, this.password);
    // console.log(bool);
    return bool;
}
// Generating Password Reset Token
customerSchema.methods.getResetPasswordToken = function () {
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
module.exports = mongoose.model("Customer", customerSchema);