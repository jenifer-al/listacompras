

   // 1. Array inicial
let carrito = [
  "CARNE", "PESCADO", "LACTEOS", "VERDURAS", "DULCES", 
  "EMBUTIDOS", "SALADOS", "PAN", "FRUTAS", 
  "CEPILLO DE DIENTES", "PASTA DE DIENTES", "JABÓN CORPORAL", 
  "CHAMPU", "PAPEL HIGIENICO", "JABON FACIAL",
  "REFRESCOS", "AGUA", "BEBIDAS ALCOHÓLICAS"
];

// 2. Mapear los elementos del HTML
const INPUT = document.getElementById("producto-input");
const LISTA = document.getElementById("lista-compras");
const PRODUCTOS = document.getElementById("num-prod");
const MENSAJE = document.getElementById("mensaje");

// 3. LA FUNCIÓN "DIBUJAR" (La que escribe en el HTML)
function actualizarVista() {
    // Si LISTA es null por el espacio en el ID del HTML, esto fallará. 
    // Asegúrate de que el HTML diga id="lista-compras"
    if (!LISTA) return; 

    LISTA.innerHTML = ""; // Limpia lo que haya
    carrito.forEach((item, i) => {
        LISTA.insertAdjacentHTML("beforeend", `<li id="${i}">${item}</li>`);
    });
    PRODUCTOS.innerText = carrito.length;
}

// 4. FUNCIONES DE LOS BOTONES
function agregar() {
    let producto = INPUT.value.toUpperCase().trim();
    let posicionExistente = carrito.indexOf(producto);

    if (posicionExistente !== -1) {
        MENSAJE.innerHTML = "¡El producto " + producto + " ya está en la lista!";
    } 
    else if (producto === "") {
        MENSAJE.innerText = "Escribe algo primero."; // Corregido de mensajeLog a MENSAJE
    } 
    else {
        carrito.push(producto);
        actualizarVista(); // <--- Llamamos a la función para ver el cambio
        MENSAJE.innerHTML = "Último producto agregado: " + producto;
        INPUT.value = "";
    }
}

function quitar() {
    let pos = prompt("¿Qué posición deseas eliminar?");
    let indice = parseInt(pos);

    if (!isNaN(indice) && indice >= 0 && indice < carrito.length) {
        let eliminado = carrito[indice];
        
        // Eliminar usando slice
        carrito = carrito.slice(0, indice).concat(carrito.slice(indice + 1));

        actualizarVista(); // <--- Llamamos a la función para ver el cambio
        MENSAJE.innerText = "Eliminado: " + eliminado;
    } else {
        MENSAJE.innerText = "Posición no válida.";
    }
}

function vaciar() {
    if (confirm("¿Vaciar todo el carrito?")) {
        carrito = [];
        actualizarVista(); // <--- Llamamos a la función para limpiar la pantalla
        MENSAJE.innerText = "Carrito vaciado correctamente.";
    }
}

// 5. EL DISPARADOR (La llave de encendido)
// Esto hace que la lista se llene nada más abrir la página
actualizarVista();