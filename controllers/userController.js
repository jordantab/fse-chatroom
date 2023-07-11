// Import User model
const User = require('../models/user')
const passport = require('passport')

class userController {
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

                // // Redirect to chatroom when the user is successfully registered
                // res.redirect('/chatroom');
                next()
            }

        } catch (err) {
            res.status(500).json({ error: 'An error occurred while logging in' });
        }
    }
}

module.exports = userController;
