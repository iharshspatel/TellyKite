const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" });
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const errorMiddleware = require("./middleware/error")
const cors = require('cors');

app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(process.env.DBPATH + "/TallyDB", { useNewUrlParser: true });

//Routes
const reseller = require("./Routes/resellerRoutes")
const customer = require("./Routes/customerRoute")
const admin = require("./Routes/adminRoute")
app.use("/api", customer);
app.use("/api", reseller);
app.use("/api", admin);
app.use(errorMiddleware);

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});
const server = app.listen(4000, function (Req, res) {
    console.log("server started at port 4000.")
})
// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});
