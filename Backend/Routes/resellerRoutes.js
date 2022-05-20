const { Router } = require("express")
const express = require("express");
const { getAllResellers } = require("../controllers/adminController");
const { loginReseller, logout, getReseller, getCustomersOfReseller, registerreseller, forgotPassword, resetPassword } = require("../controllers/resellerController")
const router = express.Router()
const { authRole, isAuthenticatedReseller, isAuthenticatedAdmin } = require("../middleware/auth")
router.route("/reseller").get(isAuthenticatedReseller, getReseller);
router.route("/reseller/register").post(isAuthenticatedAdmin, registerreseller);
router.route("/resellers").get(isAuthenticatedAdmin,getAllResellers)
router.route("/reseller/login").post(loginReseller);
router.route("/reseller/getcustomers").get(isAuthenticatedReseller, getCustomersOfReseller);
router.route("/reseller/logout").get(logout);

router.route("/reseller/password/forgot").post(forgotPassword);
router.route("/reseller/password/reset/:token").put(resetPassword);
module.exports = router;

