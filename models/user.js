class User {
    constructor(username, password) {
      this.username = username;
      this.password = password;
    }
  
    // Method to create a new user in the db
    async createUser() {

      // Add new user to db
      return ('user created')
    }

    // Method to find a user by username
  static async findByUsername(username) {
    // return null
    return new User(username,'123')
  }

  // Method to check if the provided password matches the stored password
  async checkPassword(inputPassword) {
    return this.password === inputPassword;
  }

  }
  module.exports = User;
