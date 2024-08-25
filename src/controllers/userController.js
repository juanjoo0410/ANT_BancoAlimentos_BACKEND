const User = require('../models/user');

class UserController {
    static async getUsers(req, res) {
        User.getAll((err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving users."
                });
            else res.send(data);
        });
    }

    static async getUser(req, res) {
        User.findById(req.params.userId, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found User with id ${req.params.userId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error retrieving User with id " + req.params.userId
                    });
                }
            } else res.send(data);
        });
    }

    static async createUser(req, res) {
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }
    
        // Crear un usuario
        const user = new User({
            name: req.body.name,
            usercode: req.body.usercode,
            password: req.body.password
        });
    
        // Guardar el usuario en la base de datos
        User.create(user, (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the User."
                });
            else res.send(data);
        });
    }

    static async updateUser(req, res) {
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }
    
        // Actualizar el usuario en la base de datos
        User.updateById(req.params.userId, new User(req.body), (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found User with id ${req.params.userId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating User with id " + req.params.userId
                    });
                }
            } else res.send(data);
        });
    }
}

module.exports = UserController;