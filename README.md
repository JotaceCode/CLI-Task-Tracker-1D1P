

---

# 📋 CLI Task Tracker

Bienvenido al **CLI Task Tracker**, una aplicación de línea de comandos desarrollada con Node.js para gestionar tareas mediante un archivo JSON. Este proyecto te permite **crear**, **actualizar**, **borrar** y **consultar** tareas, así como sus estados, de manera eficiente y sencilla desde la consola.

## 🚀 Características

- **Crear tareas**: Añade nuevas tareas a tu archivo JSON.
- **Actualizar tareas**: Modifica tareas existentes y cambia su estado.
- **Borrar tareas**: Elimina tareas del archivo JSON.
- **Consultar tareas**: Visualiza la lista de tareas y sus detalles.

## 🛠 Requisitos

- [Node.js](https://nodejs.org/) v14 o superior

## 📥 Instalación

1. **Clona el repositorio**:

    ```bash
    git clone https://github.com/JotaceCode/cli-task-tracker-1D1P.git
    cd cli-task-tracker-1D1P
    ```

2. **Instala las dependencias**:

    ```bash
    npm install
    ```

## 🚀 Uso

Aquí te mostramos cómo utilizar las principales funcionalidades de la aplicación:

1. **Crear una tarea**:

    ```bash
    node index.js add "Nombre de la tarea" "Descripción de la tarea"
    ```

2. **Actualizar una tarea**:

    ```bash
    node index.js update <ID de la tarea> "Nombre actualizado" "Descripción actualizada" "Nuevo estado"
    ```

3. **Borrar una tarea**:

    ```bash
    node index.js delete <ID de la tarea>
    ```

4. **Consultar tareas**:

    ```bash
    node index.js list
    ```
5. **Actualizar a DONE el estado de una tarea**:

    ```bash
    node index.js mark-done <ID de la tarea>
    ```

6. **Actualizar a IN-PROGRESS el estado de una tarea**:

    ```bash
    node index.js mark-in-progress <ID de la tarea>
    ```

## 🛠 Estructura del Proyecto

- `index.js` – Archivo principal donde se maneja la lógica de la aplicación.
- `tasks.json` – Archivo JSON donde se almacenan las tareas.
- `package.json` – Archivo de configuración del proyecto y dependencias.

## 💬 Contribuciones

Si quieres contribuir a este proyecto, por favor sigue estos pasos:

1. **Haz un fork** del repositorio.
2. **Crea una nueva rama** para tus cambios (`git checkout -b feature/nueva-funcionalidad`).
3. **Realiza tus cambios** y haz commit (`git commit -am 'Añadida nueva funcionalidad'`).
4. **Haz push** a la rama (`git push origin feature/nueva-funcionalidad`).
5. **Abre un Pull Request** en GitHub.


## 📞 Contacto

Para cualquier consulta, puedes contactar a [josvelsei@gmail.com](mailto:josvelsei@gmail.com).

---
