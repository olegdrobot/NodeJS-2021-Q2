import * as uuid from 'uuid';

interface IUser {
    name: string;
    login: string;
    password: string;
    id?: string;
}

/** Class representing a User */

class User {

  /**
   * Create a User
   * @param (string) id - ID of Board
   * @param (string) name - The user name
   * @param (string) login - The user login
   * @param (string) password - The user password
  */

    
    name: string;
    login: string;
    password: string;
    id?: string;
    
  constructor({
    id = uuid.v4(),
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

  static toResponse(user: Partial<IUser>) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;