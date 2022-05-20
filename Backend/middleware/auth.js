const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const Admin = require("../Models/adminModel")
const Customer = require("../Models/customersModel")
const Reseller = require("../Models/resellerModel")
exports.isAuthenticatedAdmin = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    // console.log(token);
    if (!token) {
        return next(new ErrorHandler("Please login to access this page", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findById(decodedData.id);
    next();
});
exports.isAuthenticatedReseller = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    // console.log(token);
    if (!token) {
        return next(new ErrorHandler("Please login reseller to access this page", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.reseller = await Reseller.findById(decodedData.id);
    next();
});
exports.isAuthenticatedCustomer = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    // console.log(token);
    if (!token) {
        return next(new ErrorHandler("Please login customer to access this page", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.customer = await Customer.findById(decodedData.id);
    next();
});

exports.authRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.admin.role)) {
            return next(new ErrorHandler(`Role: ${req.admin.role} is not alowed to access this resource`, 403));
        }
        next();
    }
}