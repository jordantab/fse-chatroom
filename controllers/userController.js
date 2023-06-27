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

                // Here call the method to add user to the db
                let temp = await newUser.createUser();
                console.log(temp)
                // Redirect to chatroom only when the user is successfully registered
                res.redirect('/chatroom');
            }

        } catch (err) {
            res.status(500).json({ error: 'An error occurred while logging in' });
        }
    }
}

module.exports = UserController;

// // Create a new user
// exports.createUser = async (req, res) => {
//     // Get the details from the request body
//     const { username, password } = req.body;

//     try {
//         // Create a new user
//         const newUser = await User.createNewUser(username, password);

//         // Set the user details in session
//         req.session.user = {
//             id: newUser.id,
//             username: newUser.username
//         };

//         // Redirect to the chatroom
//         res.redirect('/chatroom');
//     } catch (error) {
//         // Handle error
//         console.log(error);
//         res.redirect('/register');
//     }
// };

// // Validate an existing user
// exports.loginUser = async (req, res) => {
//     // Get the details from the request body
//     const { username, password } = req.body;

//     try {
//         // Validate the user
//         const validUser = await User.validateUser(username, password);

//         if(validUser) {
//             // Set the user details in session
//             req.session.user = {
//                 id: validUser.id,
//                 username: validUser.username
//             };

//             // Redirect to the chatroom
//             res.redirect('/chatroom');
//         } else {
//             res.redirect('/login');
//         }
//     } catch (error) {
//         // Handle error
//         console.log(error);
//         res.redirect('/login');
//     }
// };

// // Logout the user
// exports.logoutUser = (req, res) => {
//     // Clear the session
//     req.session.destroy((err) => {
//         if(err) {
//             // Handle error
//             console.log(err);
//         }
//         // Redirect to the login page
//         res.redirect('/login');
//     });
// };
