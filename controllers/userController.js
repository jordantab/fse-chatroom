// // Import User model
const User = require('../models/user')

class UserController {
    static async login(req, res) {
        try {
            let username = req.body.Username
            let password = req.body.Password

            const user = await User.findByUsername(username)
            let checkPassword = await user.checkPassword(password)

            if (checkPassword) {
                res.redirect('/chatroom')
            }else {
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
            console.log(user)

            if (user) {
                res.send('<script>alert("This username is taken. Please login"); window.location.href="/register";</script>');
            } else {
                // Create new user instance
                let newUser = new User(username, password);
                
                // Add new user to db
                
                // Redirect to chatroom only when the user is successfully registered
                res.redirect('/chatroom');
            }

        } catch (err) {
            res.status(500).json({ error: 'An error occurred while logging in' });
        }
    }
}

module.exports = UserController;
