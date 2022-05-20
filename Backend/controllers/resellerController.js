
const Reseller = require("../Models/resellerModel")
const Customer = require("../Models/customersModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const bcrypt = require("bcryptjs");
global.crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
//register reseller
exports.registerreseller = catchAsyncError(async (req, res, next) => {
    const { name, email, password, username, customerCount } = req.body;
    const reseller = await Reseller.create({
        name,
        email,
        password,
        username,
        customerCount
    })
    console.log(req.body);
    // console.log("Controller")
    // sendToken(reseller, 200, res);
    res.status(200).json({
        reseller
    })

});

// get all resellers for dropdown

exports.getAllReseller = catchAsyncError(async (req,res,next)=>{
    const resellers = await Reseller.find();

    res.status(200).json({
        success:true,
        resellers
    })
})

// get the logged in reseller
exports.getReseller = catchAsyncError(async (req, res) => {
    // console.log(req)
    const reseller = await Reseller.findById(req.reseller.id);
    if (!reseller) {
        res.status(400);
    }
    res.status(200).json({
        success: true,
        reseller
    })
});

// get all  customers of Reseller
exports.getCustomersOfReseller = catchAsyncError(async (req, res, next) => {
    const reseller_id = req.reseller.id;
    console.log(reseller_id);
    const customers = await Customer.find({ reseller_id });
    if (!customers) {
        return next(new ErrorHandler("No customers found", 400));
    }
    console.log(customers);
    res.status(200).json({
        success: true,
        customers
    })
})

//login reseller
exports.loginReseller = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;


    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));

    }
    const reseller = await Reseller.findOne({ email }).select("+password");

    if (!reseller) {
        return next(new ErrorHandler("Invalid username ", 401));

    }
    const isPasswordMatched = await reseller.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid  password", 401));

    }

    sendToken(reseller, 200, res);
}
)

//logut client
exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({

        success: true,
        message: "Logged out successfully"
    })
})

// Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const reseller = await Reseller.findOne({ email: req.body.email });

    if (!reseller) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Get ResetPassword Token
    const resetToken = reseller.getResetPasswordToken();

    await reseller.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
    )}/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
        await sendEmail({
            email: reseller.email,
            subject: `TellyKite Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${reseller.email} successfully`,
        });
    } catch (error) {
        reseller.resetPasswordToken = undefined;
        reseller.resetPasswordExpire = undefined;

        await reseller.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
});


// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const reseller = await Reseller.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!reseller) {
        return next(
            new ErrorHandler(
                "Reset Password Token is invalid or has been expired",
                400
            )
        );
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not password", 400));
    }

    reseller.password = req.body.password;
    reseller.resetPasswordToken = undefined;
    reseller.resetPasswordExpire = undefined;

    await reseller.save();

    sendToken(reseller, 200, res);
});


// update Reseller password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const reseller = await Reseller.findById(req.reseller.id).select("+password");

    const isPasswordMatched = await reseller.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("password does not match", 400));
    }

    reseller.password = req.body.newPassword;

    await reseller.save();

    sendToken(reseller, 200, res);
});