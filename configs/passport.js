const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

function initialize(passport) {
    const authenticateUser = async (username, password, done) => {
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

    passport.use(new LocalStrategy({ usernameField: 'Username', passwordField: 'Password'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser(async (id, done) => {
        return done(null, await User.findById(id))
    });
    
}

module.exports = initialize