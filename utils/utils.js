import fs from 'fs';

// Función para leer y parsear un archivo JSON
export const loadConfig = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error al cargar la configuración: ${filePath}`, error);
        process.exit(1);
    }
};

// Función para mezclar dos configuraciones
export const mergeConfigs = (baseConfig, newConfig) => {
    return { ...baseConfig, ...newConfig };
};
/**
 * Escribir el archivo settings.json
 */
export const writeConfig = (settingsPath, config) => {
    try {
        fs.writeFileSync(settingsPath, JSON.stringify(config, null, 4));
        console.log('Archivo settings.json creado.');
    } catch (error) {
        console.error('Error al escribir el archivo settings.json', error);
        process.exit(1);
    }
}
