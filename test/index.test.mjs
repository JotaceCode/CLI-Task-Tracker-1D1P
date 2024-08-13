import { expect } from 'chai';
import sinon from 'sinon';
import mockFs from 'mock-fs';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Importa las funciones del archivo principal
import { addTask, updateTask, deleteTask, updateTaskStatus, listTasks } from '../src/index.js';

const filePath = path.join(__dirname, '../src/tasks', 'tasks.json');
const tasksDir = path.join(__dirname, "../src/tasks");

describe('Gestión de Tareas', () => {

    beforeEach(() => {
        // Mockeamos el sistema de archivos con un archivo tasks.json vacío
        mockFs({
            [tasksDir]: {
                'tasks.json': JSON.stringify([])
            }
        });
    });

    afterEach(() => {
        // Restauramos el sistema de archivos real
        mockFs.restore();
    });

    it('debería añadir una tarea correctamente', () => {
        addTask('Nueva tarea de prueba');
        const tasks = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        expect(tasks).to.have.lengthOf(1);
        expect(tasks[0]).to.include({
            description: 'Nueva tarea de prueba',
            status: 'to-do'
        });
        deleteTask(1)
    });

    it('debería actualizar la descripción de una tarea', () => {
        addTask('Tarea inicial');
        updateTask(1, 'Tarea actualizada');
        const tasks = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        expect(tasks[0].description).to.equal('Tarea actualizada');
        deleteTask(1)
    });

    it('debería eliminar una tarea', () => {
        addTask('Tarea para eliminar');
        deleteTask(1);
        const tasks = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        expect(tasks).to.have.lengthOf(0);
    });

    it('debería actualizar el estado de una tarea', () => {
        addTask('Tarea para actualizar estado');
        updateTaskStatus(1, 'in-progress');
        const tasks = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        expect(tasks[0].status).to.equal('in-progress');
        deleteTask(1)
    });

    it('debería listar las tareas', () => {
        addTask('Tarea 1');
        addTask('Tarea 2');
        const consoleLogSpy = sinon.spy(console, 'log');
        listTasks();
        expect(consoleLogSpy.calledTwice).to.be.true;
        consoleLogSpy.restore();
    });
});
