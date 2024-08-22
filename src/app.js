require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const apiRoutes = require('./routes/api');
const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});