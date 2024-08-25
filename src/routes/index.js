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
                newName = cleanName;
                if (cleanName.includes('Routes')) { // Verificar si el nombre contiene "Routes"
                    newName = cleanName.replace('Routes', ''); // Eliminar "Routes" si está presente
                }
                router.use(`/${newName}`, route);
                console.log(`Ruta /${newName} registrada exitosamente.`);
            } else {
                console.warn(`El módulo en ${modulePath} no exporta un enrutador válido.`);
            }
        } catch (error) {
            console.error(`Error al importar la ruta ${modulePath}:`, error.message);
        }
    }
});

module.exports = router;