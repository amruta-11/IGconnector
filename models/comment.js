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
        type: Schema.Types.ObjectId,
        ref: 'postTable',
        required: true
    },
});

module.exports = IGComment = mongoose.model('commentTable', CommentSchema);
