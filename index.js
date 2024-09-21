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
    .parse(process.argv);

const options = program.opts();

const vscodeDir = path.join(process.cwd(), '.vscode');
const settingsPath = path.join(vscodeDir, 'settings.json');

// Cargar configuraciones básicas o existentes
let finalConfig = {};
if (fs.existsSync(settingsPath)) {
    finalConfig = loadConfig(settingsPath);
} else {
    if (!fs.existsSync(vscodeDir)) {
        fs.mkdirSync(vscodeDir);
        console.log('Carpeta .vscode creada.');
    }
}

// Agregar configuraciones basadas en las banderas
if (options.tailwind) {
    const tailwindConfig = loadConfig(path.join(__dirname, 'preconfigs', 'tailwind.json'));
    finalConfig = mergeConfigs(finalConfig, tailwindConfig);
    console.log('Configuración de Tailwind agregada.');
}

if (options.copilot) {
    const copilotConfig = loadConfig(path.join(__dirname, 'preconfigs', 'copilot.json'));
    finalConfig = mergeConfigs(finalConfig, copilotConfig);
    console.log('Configuración de Copilot agregada.');
}

// Guardar el archivo settings.json final
fs.writeFileSync(settingsPath, JSON.stringify(finalConfig, null, 2), 'utf-8');
console.log('.vscode/settings.json actualizado exitosamente.');
