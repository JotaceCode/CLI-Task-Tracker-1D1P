import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtén la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas al archivo JSON y al DIRECTORIO
const filePath = path.join(__dirname, 'tasks', 'tasks.json');
const tasksDir = path.join(__dirname, 'tasks');

// Verifica si el directorio existe, si no, lo crea
if (!fs.existsSync(tasksDir)) {
    fs.mkdirSync(tasksDir, { recursive: true });
}

// Verifica si el archivo existe, si no, lo crea
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
}

// Leemos el archivo json para tenerlo en memoria
let tasks = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// Definimos la llamada para consola que tendrá un comando y los argumentos necesarios para las tareas (args)
const [,, command, ...args] = process.argv;

// Funciones para gestionar las tareas
switch(command) {
    case 'add':
        addTask(args.join(' '));
        break;
    case 'update':
        updateTask(args[0], args.slice(1).join(' '));
        break;
    case 'delete':
        deleteTask(args[0]);
        break;
    case 'mark-in-progress':
        updateTaskStatus(args[0], 'in-progress');
        break;
    case 'mark-done':
        updateTaskStatus(args[0], 'done');
        break;
    case 'list':
        listTasks(args[0]);
        break;
    default:
        console.log('Comando no reconocido');
}

// Función para guardar las tareas en el archivo task.json
function saveTasks(tasks) {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

export function addTask(description) {
    const task = {
        id: tasks.length + 1,
        description: description,
        status: 'to-do',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    try {
        tasks.push(task);
        saveTasks(tasks);
        console.log(`Tarea añadida correctamente - (ID: ${task.id})`);
    } catch (e) {
        console.log("No se pudo añadir la tarea.\nVuelva a intentarlo.", e.message);
    }
}

export function updateTask(id, description) {
    const task = tasks.find(tarea => tarea.id === parseInt(id));
    if (task) {
        try {
            task.description = description;
            task.updatedAt = new Date().toISOString();
            saveTasks(tasks);
            console.log(`Tarea actualizada correctamente - (ID: ${task.id})`);
        } catch (e) {
            console.log("No se pudo actualizar la descripción de la tarea.\nVuelva a intentarlo.", e.message);
        }
    } else {
        console.log("No existe el ID de la tarea.\nVuelva a intentarlo.");
    }
}

export function deleteTask(id) {
    const index = tasks.findIndex(tarea => tarea.id === parseInt(id));
    if (index !== -1) {
        tasks.splice(index, 1);
        saveTasks(tasks);
        console.log(`Tarea eliminada correctamente - (ID: ${id})`);
    } else {
        console.log("No existe el ID de la tarea.\nVuelva a intentarlo.");
    }
}

export function updateTaskStatus(id, status) {
    const task = tasks.find(tarea => tarea.id === parseInt(id));
    if (task) {
        try {
            task.status = status;
            task.updatedAt = new Date().toISOString();
            saveTasks(tasks);
            console.log(`Tarea marcada como ${status} - (ID: ${task.id})`);
        } catch (e) {
            console.log("No se pudo actualizar el estado de la tarea.\nVuelva a intentarlo.", e.message);
        }
    } else {
        console.log("No existe el ID de la tarea.\nVuelva a intentarlo.");
    }
}

export function listTasks(status) {
    let filteredTasks = tasks;
    if (status) {
        filteredTasks = tasks.filter(tarea => tarea.status === status);
    }
    filteredTasks.forEach(task => {
        console.log(`[${task.id}] ${task.description} - ${task.status}`);
    });
}
