const listaTareas = [];
let id = 1;

const inputTarea = document.querySelector(".inputTarea");
const botonAgregar = document.querySelector(".boton");
const contenedor = document.querySelector(".contenedor");

const totalTareasElement = document.getElementById("totalTareas");
const totalTareasRealizadasElement = document.getElementById("totalTareasRealizadas");

botonAgregar.addEventListener("click", agregarTarea);

function agregarTarea() {
    const descripcion = inputTarea.value;
    const tarea = { id: id, descripcion: descripcion, terminado: false };
    listaTareas.push(tarea);
    id++;
    inputTarea.value = "";
    mostrarListaHTML();
    actualizarContadores();
}

function mostrarListaHTML() {
    contenedor.innerHTML = "";
    listaTareas.forEach((tarea) => {
        contenedor.innerHTML += `<div class="tareascss">
            <p>${tarea.id}</p>
            <h3>${tarea.descripcion}</h3>
            <input type="checkbox" ${tarea.terminado ? "checked" : ""} onchange="checkearTarea(${tarea.id})">
            <button id=${tarea.id} onclick="borrarTarea(${tarea.id})">❌</button>
        </div>`;
    });
}

function borrarTarea(id) {
    const index = listaTareas.findIndex((tarea) => tarea.id === id);
    if (index !== -1) {
        listaTareas.splice(index, 1);
        mostrarListaHTML();
        actualizarContadores();
    }
}

function checkearTarea(id) {
    const index = listaTareas.findIndex((tarea) => tarea.id === id);
    if (index !== -1) {
        listaTareas[index].terminado = !listaTareas[index].terminado;
        mostrarListaHTML();
        actualizarContadores();
    }
}

function actualizarContadores() {
    const tareasPendientes = listaTareas.filter((tarea) => !tarea.terminado).length;
    const tareasCompletadas = listaTareas.filter((tarea) => tarea.terminado).length;
    totalTareasElement.textContent = tareasPendientes + tareasCompletadas;
    totalTareasRealizadasElement.textContent = tareasCompletadas;
}

listaTareas.push({ id: 1, descripcion: "Pasear perro ", terminado: false });
listaTareas.push({ id: 2, descripcion: "Realizar desafío Todolist", terminado: false });
listaTareas.push({ id: 3, descripcion: "Mandar Mail", terminado: false });

mostrarListaHTML();
actualizarContadores();