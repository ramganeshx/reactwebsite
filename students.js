const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({

    name: String,
    address: String,
    cart: String,
    email: String


})

const StudentModel = mongoose.model("student", StudentSchema)
module.exports = StudentModel;
