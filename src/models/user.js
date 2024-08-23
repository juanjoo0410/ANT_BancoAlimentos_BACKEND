const db = require('../config/db');

class User {
    static async fetchAll() {
        const [rows] = await db.query('SELECT * FROM users');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM users WHERE id_user = ?', [id]);
        return rows[0];
    }

    static async create(name, usercode, password) {
        const [result] = await db.query('INSERT INTO users (name, usercode, password) VALUES (?, ?, ?)', [name, usercode, password]);
        return { id: result.id_user, name, usercode, password };
    }

    static async update(id, name, usercode, password) {
        await db.query('UPDATE users SET name = ?, usercode = ?, password = ? WHERE id_user = ?', [name, usercode, password, id]);
        return { id, name, usercode, password };
    }
}

module.exports = User;