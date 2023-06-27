class User {
    constructor(username, password) {
      this.username = username;
      this.password = password;
    }
  
    //Creates user
    async createUser() {
      // This would save the user to the database
      return ('user created')
    }

    // Method to find a user by username
  static async findByUsername(username) {
    return null
    // return new User(username,'123')
    // Query the database for a user with the given username
    // Let's assume "db.query" is a method that runs a SQL query and returns the result
    // const result = await db.query('SELECT * FROM users WHERE username = ?', [username]);

    // If a user is found, return a new User instance
    // if (result.rows.length > 0) {
    //   const user = result.rows[0];
    //   return new User(user.username, user.password);
    // }

    // If no user is found, return null
    // return null;
  }

  // Method to check if the provided password matches the stored password
  async checkPassword(inputPassword) {
    // This is a placeholder. In a real application, you'd want to hash the
    // inputPassword and compare it to the stored password hash.
    return this.password === inputPassword;
  }

  }
  module.exports = User;
