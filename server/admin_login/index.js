require("dotenv").config();

const express = require("express");

const cors = require("cors")

const bcrypt = require("bcryptjs")

const nodemailer = require("nodemailer")

const jwt = require("jsonwebtoken")

const router = require("./crud/router")

const dotenv = require("dotenv");

const userSchema = require("./schema/schema")

const mongoose = require("mongoose");


const app = express();

const PORT = process.env.PORT || 4004;

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





