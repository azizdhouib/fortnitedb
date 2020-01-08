const models = require('../models/models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userController = {};


userController.get = (req, res) => {
    res.json({
        user: req.user
    });
};

userController.getAll = (req, res) => {
    models.User.find({}).then((result) => {
        
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


userController.createNewUser = (req, res) => {
    const { username, password, email, name } = req.body;
    console.log(req.body)
    const newUser = new models.User({
        username,
        password,
        email,
        name
    });

    models.User.createUser(newUser, (error, result) => {
        if (error) {
            console.log(error)
            if (error.errors.username) {
                return res.status(500).json({
                    message: error.errors.username.message
                });
            }
            if (error.errors.email) {
                return res.status(500).json({
                    message: error.errors.email.message
                });
            }
        } else {
            return res.status(200).json({
                success: true,
                data: result
            });
        }
    });
};


userController.updateUser = (req, res) => {
    const userId = req.user._id;
    const { username, email, name, curPassword } = req.body;
    console.log(req.body)
    models.User.findById(userId, (err, user) => {
        console.log(`Updating ${user.username}`);
        models.User.comparePassword(curPassword, user.password, (err, isMatch) => {
            if (isMatch) {
                console.log('Update password matched.');
                //let updatePassword = bcrypt.hashSync(newPassword, 10);
                
                    models.User.findByIdAndUpdate(
                        userId,
                        {
                            $set: {
                                username,
                                email,
                                name
                            }
                        },
                        {
                            new: true
                        }
                    ).then((updatedUser) => {
                        return res.status(200).json({
                            success: true,
                            data: updatedUser
                        });
                    }).catch((error) => {
                        console.log(error)
                        if (error.errors.username) {
                            return res.status(500).json({
                                message: error.errors.username.message
                            });
                        }
                        if (error.errors.email) {
                            return res.status(500).json({
                                message: error.errors.email.message
                            });
                        }
                    });
            } else {
                return res.status(500).json({
                    message: 'Wrong password.'
                });
            }
        });
    });
    
}

// Adds bookmark
userController.addBookmark = (req, res) => {
    const userId = req.user._id;
    const newBookmark = req.body.link
    console.log(req.body);
    models.User.findByIdAndUpdate(userId,
        {
            $addToSet: {
                bookmarks: newBookmark
            }
        },
        {
            new: true
        }
    ).then(updatedUser => {
        return res.status(200).json({
            success: true,
            data: updatedUser
        });
    }).catch((error) => {
        return res.status(500).json({
            message: error.errors
        });
    });
}


userController.removeBookmark = (req, res) => {
    const userId = req.user._id;
    const deletedBookmark = req.body.link
    console.log(req.body);
    models.User.findByIdAndUpdate(userId,
        {
            $pull: {
                bookmarks: deletedBookmark
            }
        },
        {
            new: true
        }
    ).then(updatedUser => {
        return res.status(200).json({
            success: true,
            data: updatedUser
        });
    }).catch((error) => {
        console.log(error)
        return res.status(500).json({
            message: error.errors
        });
    });
}


passport.use(new LocalStrategy((username, password, done) => {
    models.User.findOne({ username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Invalid credentials.' });
        }
        console.log(`Found ${user.username}`);
        models.User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err
            if (isMatch) {
                console.log('Password matched.');
                return done(null, user);
            } else {
                return done(null, false, {message: 'Invalid credentials.'});
            }
        });
    });
}));

passport.serializeUser((user, done) => {
    
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    models.User.findById(id, (err, user) => {
        //console.log(`Authorized ${id}`);
        done(err, user);
    });
});

// Login
userController.loginAuthentication = passport.authenticate('local', {
    successRedirect: '/api/user',
    failureRedirect: '/api/users',
    failureFlash: true
});

// Logout
userController.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out.');
    res.redirect('/api/allPosts');
};



module.exports = userController;