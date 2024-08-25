const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = function(user) {
    this.name = user.name;
    this.usercode = user.usercode;
    this.password = user.password;
};

User.getAll = (result) => {
    db.query("SELECT * FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("users: ", res);
        result(null, res);
    });
};

User.findById = (id, result) => {
    db.query("SELECT * FROM users WHERE id_user = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // If no user found with the given ID
        result({ kind: "not_found" }, null);
    });
};

User.create = (newUser, result) => {
    bcrypt.hash(newUser.password, 10, (err, hashedPassword) => {
        if (err) {
            result(err, null);
            return;
        }
        db.query("INSERT INTO users (name, usercode, password) values (?,?,?)",
            [newUser.name, newUser.usercode, hashedPassword], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("created user: ", { id: res.insertId, ...newUser });
            result(null, { id: res.insertId, ...newUser });
        });
    });
};

User.updateById = (id, user, result) => {
    bcrypt.hash(user.password, 10, (err, hashedPassword) => {
        if (err) {
            result(err, null);
            return;
        }
        db.query(
            "UPDATE users SET name = ?, usercode = ?, password = ? WHERE id_user = ?",
            [user.name, user.usercode, hashedPassword, id],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
    
                if (res.affectedRows === 0) {
                    // Not found User with the id
                    result({ kind: "not_found" }, null);
                    return;
                }
    
                console.log("updated user: ", { id: id, ...user });
                result(null, { id: id, ...user });
            }
        );
    });
};

module.exports = User;