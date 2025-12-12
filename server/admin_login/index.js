require("dotenv").config();
const cors = require("cors")

const express = require("express");

const bcrypt = require("bcryptjs")

const nodemailer = require("nodemailer")

const jwt = require("jsonwebtoken")

const router = require("./crud/router")

const dataschema = require("./schema/schema");

const forgotEmailSchema = require("./schema/emailschema");

// const forgotPassSchema = require("../schema/forgotschema");

const dotenv = require("dotenv");

const mongoose = require("mongoose");


const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.json());

app.use("/api", router);


mongoose.connect(process.env.DB)
    .then(() => {
        console.log("DB is connected successfully");

    })
    .catch(() => {
        console.log("DB Isn't connected");

    })




app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);

});