const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    postId: {
        type: Schema.ObjectId,
        ref: 'PostSchema'
    },
    likes: [{
        type: Schema.ObjectId,
        ref: 'UserSchema'
    }],
});

module.exports = IGComment = mongoose.model('commentTable', CommentSchema);
