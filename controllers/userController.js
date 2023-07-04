// Import User model
const User = require('../models/user')

class userController {
    static async login(req, res) {
        try {
            let username = req.body.Username
            let password = req.body.Password

            const user = await User.findByUsername(username)
            
            // If the user doesn't exist
            if (!user) {
                return res.send('<script>alert("This username does not exist. Please try again."); window.location.href="/";</script>');
            }

            // Check the user's password input
            let checkPassword = await user.checkPassword(password)

            // If correct password, redirect user to chatroom
            if (checkPassword) {
                res.redirect('/chatroom')
            } else {
                res.send('<script>alert("Password is incorrect. Please try again."); window.location.href="/";</script>');
            }
        } catch (err) {
            res.status(500).json({ error: 'An error occurred while logging in' });
        }
    }

    static async register(req, res) {
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

                // Redirect to chatroom when the user is successfully registered
                res.redirect('/chatroom');
            }

        } catch (err) {
            res.status(500).json({ error: 'An error occurred while logging in' });
        }
    }
}

module.exports = userController;
