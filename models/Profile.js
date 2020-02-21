const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    // The auto-generated id of ProfileSchema Doc will be called 'profileId' in other models
    // userId is same as object id in userTable
    // [] Array of ObjectIds
    // Schema.ObjectId - Datatype for document ID

    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'userTable',
        required: true    
    },
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    profilepic: {
        type: String
    },
    // userName will be unique for each user
    userName: {
        type: String,
        required: true
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'userTable'
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'userTable'
    }],
    isPrivate: {
        type: Boolean,
        required: true
    }
});


//Profile is an internal name & if anyone wants to call that file they can call .Profile
//profileTable = the name of the table in MongoDB
//ProfileSchema = will be used to create the mongoDB doc for profileTable
module.exports = Profile = mongoose.model('profileTable', ProfileSchema);