const UserService = require('../services/userService');

class UserController {
    static async getUsers(req, res) {
        try {
            const users = await UserService.getUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving users' });
        }
    }

    static async getUser(req, res) {
        try {
            const userId = parseInt(req.params.id, 10);
            const user = await UserService.getUserById(userId);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving user' });
        }
    }

    static async createUser(req, res) {
        const { name, email } = req.body;
        try {
            const newUser = await UserService.createUser(name, email);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: 'Error creating user' });
        }
    }

    static async updateUser(req, res) {
        const userId = parseInt(req.params.id, 10);
        const { name, email } = req.body;
        try {
            const user = await UserService.getUserById(userId);
            if (user) {
                const updatedUser = await UserService.updateUser(userId, name, email);
                res.json(updatedUser);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating user' });
        }
    }
}

module.exports = UserController;