function finalizarCompra() {
	const nombre = document.getElementById("nombre").value;
	const direccion = document.getElementById("direccion").value;
	const telefono = document.getElementById("telefono").value;
	const tarjeta = document.getElementById("tarjeta").value;

	if (!nombre || !direccion || !telefono || !tarjeta) {
		alert("Por favor, complete todos los campos.");
		return;
	}

	mostrarModal();
}

function mostrarModal() {
	const modal = new bootstrap.Modal(document.getElementById("modal"));

	// Obtener el total y la lista de productos
	const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
	const lista = document.getElementById("modalListaCarrito");
	lista.innerHTML = ""; // Limpiar la lista antes de agregar nuevos productos

	carrito.forEach((producto) => {
		const li = document.createElement("li");
		li.textContent = `${producto.nombre} - $${producto.precio}`;
		lista.appendChild(li);
	});

	// Actualizar el total en el modal
	const modalTotalCarrito = document.getElementById("modalTotalCarrito");
	modalTotalCarrito.textContent = total;

	modal.show();
}

function cerrarModal() {
	const modal = new bootstrap.Modal(document.getElementById("modal"));
	modal.hide();
	window.location.href = "index.html";
}

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const totalCarrito = document.getElementById("totalCarrito");
const listaCarrito = document.getElementById("listaCarrito");

function agregarAlCarrito() {
	const producto = {
		nombre: "CRM Universitario",
		precio: 5000,
	};

	carrito.push(producto);
	localStorage.setItem("carrito", JSON.stringify(carrito));
	actualizarCarrito();
}

function eliminarDelCarrito(index) {
	carrito.splice(index, 1);
	localStorage.setItem("carrito", JSON.stringify(carrito));
	actualizarCarrito();
}

function actualizarCarrito() {
	listaCarrito.innerHTML = "";
	let total = 0;

	carrito.forEach((producto, index) => {
		const li = document.createElement("li");
		li.textContent = `${producto.nombre} - $${producto.precio}`;
		li.className = "p-2";

		const btnEliminar = document.createElement("button");
		btnEliminar.textContent = "Eliminar";
		btnEliminar.className = "button-eliminar";
		btnEliminar.onclick = () => eliminarDelCarrito(index);
		li.appendChild(btnEliminar);
		listaCarrito.appendChild(li);
		total += producto.precio;
	});

	totalCarrito.textContent = total;
}

function procesarCompra() {
	window.location.href = "procesar.html";
}

actualizarCarrito();
