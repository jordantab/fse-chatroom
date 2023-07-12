// Import User model
const User = require('../models/user')
const passport = require('passport')

class userController {
    static async authenticateUser(username, password, done) {
        // Check if username exists
        const user = await User.findByUsername(username)

        // If the user doesn't exist
        if (!user) {
            return done(null, false, { message: 'No user with that username' })
        }

        try {
            // Check the user's password input
            if (await user.checkPassword(password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Incorrect Password'})
            }
        } catch (err) {
            return done(err)
        }
    }

    static serializeUser(user, done) {
        done(null, user.id)
    }

    static async deserializeUser(id, done) {
        return done(null, await User.findById(id))
    }

    static async register(req, res, next) {
        try {
            let username = req.body.Username;
            let password = req.body.Password;

            // Check if username already exists
            const user = await User.findByUsername(username);

            if (user) {
                res.send('<script>alert("This username is taken. Please login"); window.location.href="/register";</script>');
            } else {
                // Create new user instance
                let newUser = new User({ username: username, password: password });

                // Save new user to db
                await newUser.createUser();
                console.log(`${username} created an account`)

                // Log the user in and redirect to the chatroom
                req.login(newUser, function(err) {
                    if (err) { return next(err); }
                    res.redirect('/chatroom')
                })
            }

        } catch (err) {
            res.status(500).json({ error: 'An error occurred while logging in' });
        }
    }

    static logout(req, res) {
        req.logout(function(err) {
            if (err) { return next(err) }
            res.redirect('/')
        })
    }
}

module.exports = userController;
