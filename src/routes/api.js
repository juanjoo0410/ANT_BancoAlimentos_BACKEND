const express = require('express');
const router = express.Router();

// Ruta GET
router.get('/', (req, res) => {
    res.json({ message: '¡Bienvenido a la API!' });
});

module.exports = router;