const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'userTable',
        required: true    
    },
    //We are storing co-ordinates only & will be using OpenCage API to get city name
    location: {
        type: {
          type: String,
          enum: ['Point'],
          required: true
        },
        coordinates: {
          type: [Number], // []Array containing 1.longitute & 2.latitude
          required: true
        }
    },
    imageURL: {
        type: String, 
        required: true
    },
    content:  {
        type: String, 
        required: false
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'userTable'
    }],
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'userTable'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'commentTable'
    }]
});


module.exports = Post = mongoose.model('postTable', PostSchema);
