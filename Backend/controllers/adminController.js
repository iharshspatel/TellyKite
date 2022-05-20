

const Admin = require("../Models/adminModel")
const Customer = require("../Models/customersModel")
const Reseller = require("../Models/resellerModel")

const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const bcrypt = require("bcryptjs");
global.crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// Register Admin <<( !!!For Testing!!! )>>
exports.registeradmin = catchAsyncError(async (req, res, next) => {
    const { name, email, password, username } = req.body;
    const admin = await Admin.create({
        name,
        email,
        password,
        username
    })

    sendToken(admin, 200, res);

});

// get logged in Admin
exports.getAdmin = catchAsyncError(async (req, res) => {

    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
        res.status(400);
    }
    // const resellerCount = await Reseller.count();
    // const customerCount = await Customer.count();
    // const directCustomerCount = await Customer.count({ mode: "direct" })
    // const nonDirectCustomerCount = await Customer.count({ mode: { $ne: "direct" } })

    res.status(200).json({
        success: true,
        // resellerCount,
        // customerCount,
        // directCustomerCount,
        // nonDirectCustomerCount,
        admin
    })
});
// exports.getbyemail = catchAsyncError(async (req, res) => {
//     const admin = await Admin.findOne({ email: req.body.email });
//     const reseller = await Reseller.findOne({ email: req.body.email });
//     const customer = await Customer.findOne({ email: req.body.email });
//     if (admin) {
//         res.status(200).json({
//             success: true,
//             message: "admin present",
//             role: "admin",

//         })
//     }
//     else if (reseller) {
//         res.status(200).json({
//             success: true,
//             message: "reseller present",
//             role: "reseller"
//         })
//     }
//     else if (customer) {
//         res.status(200).json({
//             success: true,
//             message: "customer present",
//             role: "customer"
//         })
//     }
//     else {
//         res.status(200).json({
//             success: false,
//             message: "email not present",
//             role: "undefined"
//         });
//     }
// })

// update Reseller Profile
exports.updateProfileReseller = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        company: req.body.company,
        website: req.body.website,
        location: req.body.location,
        telephoneNumber: req.body.telephoneNumber
    };

    const reseller = await Reseller.findByIdAndUpdate(req.body.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});
// update Custoemr Profile
exports.updateProfileCustomer = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        company: req.body.company,
        website: req.body.website,
        location: req.body.location,
        telephoneNumber: req.body.telephoneNumber
    };

    const customer = await Customer.findByIdAndUpdate(req.body.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});
// login admin
exports.loginAdmin = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;


    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));

    }
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
        return next(new ErrorHandler("Invalid username ", 401));
    }
    const isPasswordMatched = await admin.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid  password", 401));

    }
    // const resellerCount = await Reseller.count();
    // const customerCount = await Customer.count();
    // const directCustomerCount = await Customer.count({ mode: "direct" })
    // const nonDirectCustomerCount = await Customer.count({ mode: { $ne: "direct" } })
    sendToken(admin, 200, res);

    // res.status(200).json({
    //     success: true,
    //     resellerCount,
    //     customerCount,
    //     directCustomerCount,
    //     nonDirectCustomerCount
    // })

}
)
//total resellers and customers
exports.total = catchAsyncError(async (req, res, next) => {
    const resellerCount = await Reseller.count();
    const customerCount = await Customer.count();
    const directCustomerCount = await Customer.count({ mode: "direct" })
    const nonDirectCustomerCount = await Customer.count({ mode: { $ne: "direct" } })

    res.status(200).json({
        success: true,
        resellerCount,
        customerCount,
        directCustomerCount,
        nonDirectCustomerCount
    })
})
//logout client
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
    const admin = await Admin.findOne({ email: req.body.email });

    if (!admin) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Get ResetPassword Token
    const resetToken = admin.getResetPasswordToken();

    await admin.save({ validateBeforeSave: false });

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
            message: `Email sent to ${admin.email} successfully`,
        });
    } catch (error) {
        admin.resetPasswordToken = undefined;
        admin.resetPasswordExpire = undefined;

        await admin.save({ validateBeforeSave: false });

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

    const admin = await Admin.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!admin) {
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

    admin.password = req.body.password;
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpire = undefined;

    await admin.save();

    sendToken(admin, 200, res);
});
//top Reseller
exports.topReseller = catchAsyncError(async (req, res, next) => {
    const reseller = await Reseller.findOne().sort('-customerCount').limit(1);
    res.status(200).json({
        success: true,
        reseller
    });
});
//top 5 resellers
exports.topFiveResellers = catchAsyncError(async (req, res, next) => {
    const topResellers = await Reseller.find().sort(' -customerCount').limit(5);
    res.status(200).json({
        success: true,
        topResellers
    });
});
// Get all Reselleres
exports.getAllResellers = catchAsyncError(async (req, res, next) => {
    const reseller = await Reseller.find();

    res.status(200).json({
        success: true,
        reseller,
    });
});

// Get all Customers
exports.getAllCustomers = catchAsyncError(async (req, res, next) => {
    const customer = await Customer.find();

    res.status(200).json({
        success: true,
        customer,
    });
});


// Delete Reseller
exports.deleteReseller = catchAsyncError(async (req, res, next) => {
    const reseller = await Reseller.findById(req.params.id);

    if (!reseller) {
        return next(
            new ErrorHandler(`Reseller does not exist with Id: ${req.params.id}`, 400)
        );
    }
    await reseller.remove();
    res.status(200).json({
        success: true,
        message: "Reseller Deleted Successfully",
    });
});
// Delete Customer
exports.deleteCustomer = catchAsyncError(async (req, res, next) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
        return next(
            new ErrorHandler(`Customer does not exist with Id: ${req.params.id}`, 400)
        );
    }
    await customer.remove();

    res.status(200).json({
        success: true,
        message: "Customer Deleted Successfully",
    });
});
//expiry filter
exports.expiryfilter = catchAsyncError(async (req, res, next) => {
    // const date=Data.now();
    const { days } = req.body;
    const today = new Date();
    // console.log(days)

    // console.log(Date())
    const newdate = new Date(today.setDate(today.getDate() + days + 1))
    // console.log(newdate)
    const expiringCustomers = await Customer.find({
        Expiry: { $lt: newdate }
    })

    const resellers = await Reseller.find();
    const resellerList = resellers.map(reseller =>  {
        return {resellerid: reseller._id, resellerusername:reseller.username}
    })

    const t = expiringCustomers.map((customer)=>{
       let p = {}
        for(let i=0; i<resellerList.length; i++){
          if(resellerList[i].resellerid.toString() === customer.reseller_id.toString()){
              p = {...customer._doc,resellername : resellerList[i].resellerusername}
        }
    }
        return p
    })




    

    if (!expiringCustomers) {
        return next(
            new ErrorHandler(`No Customer found`)
        );
    }
    res.status(200).json({
        success: true,
        t
    })
})