const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// Method to create a new user in the db
UserSchema.methods.createUser = async function() {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)

  return this.save()
}

// Method to check if the provided password matches the stored password
UserSchema.methods.checkPassword = async function(password) {
  return await bcrypt.compare(password, this.password)
}

// Method to find a user by username
UserSchema.statics.findByUsername = function(username) {
  return this.findOne({ username: username })
}

// Method to find a user by id
UserSchema.statics.findById = function(id) {
  return this.findOne({ _id: id })
}

const User = mongoose.model('User', UserSchema)

module.exports = User
