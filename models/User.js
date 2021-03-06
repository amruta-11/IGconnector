const mongoose = require('mongoose');

//Schema - basically definition of your data or like a structure
//Mongoose has a class named schema which creates schema for storing data into mongoDB
const Schema = mongoose.Schema;

//Defining schema using json
const UserSchema = new Schema({

    // Email will be unique for each user
    email : {
        type: String,
        required: true
    },
    // username will be unique for each user
    username: {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    },
});

//User is an internal name & if anyones want to call that file they can call .User
//usertable = the name of the table in MongoDB
//UserSchema = will be used to create the usertable
module.exports = User = mongoose.model('userTable', UserSchema)