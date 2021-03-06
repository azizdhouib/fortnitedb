const models = require('../models/models');
const ids = require('short-id');

const commentController = {};




commentController.get = (req, res) => {
    res.json({
        message: 'From comment controller.'
    });
};


commentController.getComment = (req, res) => {
    let commentShortId  = req.params.shortId;
    models.Comment.findOne({ shortId: commentShortId }).then((result) => {
        // Retrieve comment's parent post
        models.Post.findById(result._post).then((parentPost) => {
            return res.status(200).json({
                success: true,
                data: result,
                parentPost
            });
        }).catch((error) => {
            console.log(error);
            return res.status(500).json({
                message: error
            });
        });
    }).catch((error) => {
        console.log(error);
        return res.status(500).json({
            message: error
        });
    });
};

// Retrieve all comments of a specific user
commentController.getAllUserComments = (req, res) => {
    models.Comment.find({ _author: req.user._id, isDeleted: false }).then((result) => {
        //console.log(result);
        return res.status(200).json({
            success: true,
            data: result
        });
    }).catch((error) => {
        console.log(error);
        return res.status(500).json({
            message: error
        });
    });
};

// Retrieve all comments
commentController.getAll = (req, res) => {
    models.Comment.find({}).then((result) => {
        console.log(result);
        return res.status(200).json({
            success: true,
            data: result
        });
    }).catch((error) => {
        console.log(error);
        return res.status(500).json({
            message: error
        });
    });
};


commentController.submitNewComment = (req, res) => {
    console.log(req.body)
    const { text, postLink } = req.body;
    const postId = req.params.postId;
    const shortId = ids.generate();
    const userId = req.user._id;
    
    // Check if shortId is unique
    while (shortIdExists(shortId)) {
        console.log(`shortIdExists: ${shortIdExists(shortId)}`);
        shortId = ids.generate();
    }

    // Get post by shortId and assign its ObjectId to parentPost
    models.Post.findOne({ shortId: postId }
    ).then((post) => {
        const newComment = new models.Comment({
            shortId,
            text,
            _author: userId,
            _post: post.id,
            postLink
        });
        
        newComment.save().then((result) => {
            console.log(`result: ${result}`)
            models.Post.findByIdAndUpdate(
                post.id,
                {
                    $push: {
                        '_comments': newComment._id
                    }
                }
            ).then((parent) => {
                //console.log(`parent: ${parent}`);
                return res.status(200).json({
                    success: true,
                    data: result,
                    parent
                });
            }).catch((error) => {
                return res.status(500).json({
                    message: error
                });
            });
        });
    });
};


commentController.deleteComment = (req, res) => {
    let shortId = req.body.shortId;
    let userId = req.user._id;
    console.log(req.body)
    models.Comment.findOneAndUpdate(
        { 
            shortId,
            _author: userId 
        },
        {
            $set: {
                isDeleted: true
            }
        },
        {
            new: true
        }
    ).then((result) => {
        console.log(result);
        return res.status(200).json({
            success: true,
            data: result,
            message: 'Comment deleted.'
        });
    }).catch((error) => {
        return res.status(200).json({
            success: true,
            data: error
        });
    });
};

/* POST methods */


const shortIdExists = (shortId) => {
    let result = false;
    models.Comment.findOne({ shortId }).then((post) => {
        if (post) result = true;
    });
    return result;
};



module.exports = commentController;