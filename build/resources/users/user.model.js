import * as uuid from 'uuid';
/** Class representing a User */
class User {
    constructor({ id = uuid.v4(), name = 'USER', login = 'user', password = 'P@55w0rd' } = {}) {
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
export default User;
