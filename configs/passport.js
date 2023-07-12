const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const userController = require('../controllers/userController')

function initialize(passport) {
    passport.use(new LocalStrategy({ usernameField: 'Username', passwordField: 'Password'}, userController.authenticateUser))
    passport.serializeUser(userController.serializeUser)
    passport.deserializeUser(userController.deserializeUser);
    
}

module.exports = initialize