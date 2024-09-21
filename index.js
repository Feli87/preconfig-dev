#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { program } from 'commander';
import { loadConfig, mergeConfigs, writeConfig } from './utils/utils.js';

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const preconfigsDir = path.join(__dirname, 'preconfigs');

// Cargar opciones dinámicamente
const preconfigDirs = fs.readdirSync(preconfigsDir).filter(dir => fs.lstatSync(path.join(preconfigsDir, dir)).isDirectory());

for (const dir of preconfigDirs) {
    const optionFile = path.join(preconfigsDir, dir, `${dir}.option.js`);
    if (fs.existsSync(optionFile)) {
        const optionLogic = await import(optionFile);
        optionLogic.default(program);
    }
}

// Procesar las opciones del CLI
program.parse(process.argv);
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
    let date = new Date().toISOString().replace(/:/g, '-');
    const backupPath = path.join(vscodeDir, `settings.back.${date}.json`);
    fs.renameSync(settingsPath, backupPath);
    console.log('Archivo settings.json renombrado a settings.back.json.');
    finalConfig = {};
} else {
    if (!fs.existsSync(vscodeDir)) {
        fs.mkdirSync(vscodeDir);
        console.log('Carpeta .vscode creada.');
    }
}

/**
 * Cargar y aplicar configuraciones
 */
const commandMap = {};

for (const dir of preconfigDirs) {
    const configPath = path.join(preconfigsDir, dir, `${dir}.json`);
    const commandFile = path.join(preconfigsDir, dir, `${dir}.js`);
    
    if (fs.existsSync(configPath) && fs.existsSync(commandFile)) {
        commandMap[dir] = { configPath, commandFile };
    }
}

for (const [key, { configPath, commandFile }] of Object.entries(commandMap)) {
    if (options[key]) {
        const commandLogic = await import(commandFile);
        commandLogic.default(); // Llama a la función por defecto
        const configJson = loadConfig(configPath);
        finalConfig = mergeConfigs(finalConfig, configJson);
        console.log(`Configuración de ${key} agregada.`);
    }
}

/**
 * Escribir el archivo settings.json
 */
writeConfig(settingsPath, finalConfig);
