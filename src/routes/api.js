const express = require('express');
const router = express.Router();

// Ruta GET
router.get('/', (req, res) => {
    res.json({ message: '¡Bienvenido a la API!' });
});

// Ruta POST simple
router.post('/data', (req, res) => {
    const { name, age } = req.body;
    res.json({ message: `Hola ${name}, tienes ${age} años.` });
});

module.exports = router;