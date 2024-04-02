const mongoose = require('mongoose');

const {MONGODB_URL} = require("./index");

exports.DBconnection = async () =>{
    await mongoose.connect(MONGODB_URL);
    console.log('database connected')
}