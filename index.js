#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { program } = require('commander');

// Función para leer y parsear un archivo JSON
const loadConfig = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error al cargar la configuración: ${filePath}`, error);
        process.exit(1);
    }
};

// Función para mezclar dos configuraciones
const mergeConfigs = (baseConfig, newConfig) => {
    return { ...baseConfig, ...newConfig };
};

// Definir las opciones del CLI usando commander
program
    .option('-t, --tailwind', 'Agregar configuración de Tailwind CSS')
    .option('-c, --copilot', 'Agregar configuración de GitHub Copilot')
    .option('-p, --prettier', 'Agregar configuración de  Prettier')
    .parse(process.argv);

const options = program.opts();

/**
 * Definir la ruta del archivo settings.json
 */
const vscodeDir = path.join(process.cwd(), '.vscode');
const settingsPath = path.join(vscodeDir, 'settings.json');

/**
 * Configuración inicial del archivo settings.json
 */
let finalConfig = {};

/**
 * Verificar si ya existe un archivo settings.json
 */
if (fs.existsSync(settingsPath)) {
    finalConfig = loadConfig(settingsPath);
} else {
    if (!fs.existsSync(vscodeDir)) {
        fs.mkdirSync(vscodeDir);
        console.log('Carpeta .vscode creada.');
    }
}

/**
 * Cargar y mezclar configuraciones predefinidas
 */

// Configuración de Tailwind CSS
if (options.tailwind) {
    const tailwindConfig = loadConfig(path.join(__dirname, 'preconfigs', 'tailwind.json'));
    finalConfig = mergeConfigs(finalConfig, tailwindConfig);
    console.log('Configuración de Tailwind agregada.');
}

// Configuración de GitHub Copilot
if (options.copilot) {
    const copilotConfig = loadConfig(path.join(__dirname, 'preconfigs', 'copilot.json'));
    finalConfig = mergeConfigs(finalConfig, copilotConfig);
    console.log('Configuración de Copilot agregada.');
}

if (options.prettier) {
    const prettierConfig = loadConfig(path.join(__dirname, 'preconfigs', 'prettier.json'));
    finalConfig = mergeConfigs(finalConfig, prettierConfig);
    console.log('Configuración de ESLint y Prettier agregada.');
}


/**
 * Escribir el archivo settings.json
 */
fs.writeFileSync(settingsPath, JSON.stringify(finalConfig, null, 2), 'utf-8');

// Mensaje de éxito
console.log('.vscode/settings.json actualizado exitosamente.');
