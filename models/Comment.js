const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const commentSchema = new Schema({
    shortId: {
        type: String,
        unique: true
    },
    text: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    postLink: {
        type: String,
        required: true
    },
    
    _author: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    
    _post: {
        type: Schema.ObjectId,
        ref: 'Post',
    },
});


const populateAuthor = function(next) {
    this.populate({
        path: '_author',
        select: 'username createdAt -_id',
        match: {
            'isDeleted': false
        }
    });
    next();
};

// const populatePost = function(next) {
//     this.populate({
//         path: '_post',
//         select: 'title createdAt -_id'
//     });
//     next();
// };

commentSchema.pre('find', populateAuthor);
commentSchema.pre('findOne', populateAuthor);


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;