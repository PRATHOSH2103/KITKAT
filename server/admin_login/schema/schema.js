const mongoose = require("mongoose");

const dataschema = mongoose.Schema({

    role: {
        type: String,
        default: "admin"
    },

    name: {

        type: String,
        required: true,
        unique: true
    },
    password: {

        type: String,
        required: true,
        unique: true
    },

});


module.exports = mongoose.model("logindata", dataschema)


