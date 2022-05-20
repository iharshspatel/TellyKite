
const Customer = require("../Models/customersModel")
const Reseller = require("../Models/resellerModel")
// const Customer = require("../Models/customerModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const bcrypt = require("bcryptjs");
global.crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");


// Register customer
exports.registercustomer = catchAsyncError(async (req, res, next) => {
    let { name, email, password, username, Telly_version, company, location, plan_type, address, cellno, telephone, Expiry, purchasedate,reseller_id, TellyAccounts } = req.body;
    Expiry = new Date(Expiry);
    console.log(TellyAccounts)
    try{
    if(reseller_id){
        var customer = await Customer.create({
            name,
            email,
            password,
            username,
            Telly_version,
            location,
            plan_type,
            company,
            address,
            mode: "reseller",
            Expiry,
            reseller_id,
            TellyAccounts,
            purchasedate
        })

    }else{
    var customer = await Customer.create({
        name,
        email,
        password,
        username,
        Telly_version,
        location,
        plan_type,
        company,
        address,
        mode: "direct",
        Expiry,
        TellyAccounts,
        purchasedate
    })
}
}
catch(err){
    console.log(err)
}


    // sendToken(customer, 200, res);
    res.status(200).json({
        customer
    })

});
exports.registercustomerreseller = catchAsyncError(async (req, res, next) => {
    const { name, email, password, username } = req.body;
    const customer = await Customer.create({
        name,
        email,
        password,
        username,
        mode: "reseller"
    })

    const reseller = await Reseller.findById(req.reseller.id);
    reseller.customerCount++;
    customer.reseller_id = reseller.id;

    // console.log(req.body);

    sendToken(customer, 200, res);

});

// Add new Telly Account for the customer
exports.addtellyaccount = catchAsyncError(async (req, res, next) => {
    const { username, password } = req.body;
    const customer = await Customer.findById(req.customer.id);
    const account = {
        tellyUsername: username,
        tellyPassword: password
    }
    customer.TellyAccounts.push(account);
    // console.log(req.body);
    customer.save();
    // console.log("Controller")
    console.log(customer.TellyAccounts)
    res.status(200).json({

        success: true,
        message: "New Telly account added successfully"
    })
});
// get logged in customer
exports.getCustomer = catchAsyncError(async (req, res) => {

    const customer = await Customer.findById(req.customer.id);
    if (!customer) {
        res.status(400);
    }
    res.status(200).json({
        success: true,
        customer
    })
});

// log in customer
exports.loginCustomer = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;


    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));

    }
    const customer = await Customer.findOne({ email }).select("+password");

    if (!customer) {
        return next(new ErrorHandler("Invalid username ", 401));

    }
    const isPasswordMatched = await customer.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid  password", 401));

    }

    sendToken(customer, 200, res);
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
    const customer = await Customer.findOne({ email: req.body.email });

    if (!customer) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Get ResetPassword Token
    const resetToken = customer.getResetPasswordToken();

    await customer.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
    )}/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `TallyKite Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${customer.email} successfully`,
        });
    } catch (error) {
        customer.resetPasswordToken = undefined;
        customer.resetPasswordExpire = undefined;

        await customer.save({ validateBeforeSave: false });

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

    const customer = await Customer.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!customer) {
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

    customer.password = req.body.password;
    customer.resetPasswordToken = undefined;
    customer.resetPasswordExpire = undefined;

    await customer.save();

    sendToken(customer, 200, res);
});
