const User = require('../models/user');

class UserService {
    static async getUsers() {
        console.log(User.fetchAll());
        return User.fetchAll();
    }

    static async getUserById(id) {
        return User.findById(id);
    }

    static async createUser(name, usercode, password) {
        return User.create(name, usercode, password);
    }

    static async updateUser(id, name, usercode, password) {
        return User.update(id, name, usercode, password);
    }
}

module.exports = UserService;