require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const router = require('./routes');
const mysql = require('./config/db')
const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use(router);

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});