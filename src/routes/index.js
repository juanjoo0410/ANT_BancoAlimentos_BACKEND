const express = require('express');
const path = require('path');
const { readdirSync } = require('fs');
const ROUTES_PATH = __dirname;
const router = express.Router();

const cleanFileName = (filename) => {
    const file = filename.split('.').shift();
    return file;
};

// Lee el contenido del directorio y filtra los archivos
readdirSync(ROUTES_PATH).filter((filename) => {
    const cleanName = cleanFileName(filename);
    if (cleanName !== "index") {
        const modulePath = path.join(ROUTES_PATH, filename);
        try {
            const route = require(modulePath);

            // Verifica que el módulo sea una función
            if (typeof route === 'function' || typeof route === 'object') {
                router.use(`/${cleanName}`, route);
                console.log(`Ruta /${cleanName} registrada exitosamente.`);
            } else {
                console.warn(`El módulo en ${modulePath} no exporta un enrutador válido.`);
            }
        } catch (error) {
            console.error(`Error al importar la ruta ${modulePath}:`, error.message);
        }
    }
});

module.exports = router;