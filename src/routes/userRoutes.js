const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/', UserController.getUsers);

// Ruta para obtener un usuario por ID
router.get('/:id', UserController.getUser);

// Ruta para crear un nuevo usuario
router.post('/', UserController.createUser);

// Ruta para actualizar un usuario existente
router.put('/:id', UserController.updateUser);

module.exports = router;