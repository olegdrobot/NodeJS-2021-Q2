const { v4: uuidv4 } = require('uuid');

/** Class representing a User */

class User {

  /**
   * Create a User
   * @param (string) id - ID of Board
   * @param (string) name - The user name
   * @param (string) login - The user login
   * @param (string) password - The user password
  */

  constructor({
    id = uuidv4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
    * Return User object
    * @param (class) user - Class User instance
    * @return (object) 
  */

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
