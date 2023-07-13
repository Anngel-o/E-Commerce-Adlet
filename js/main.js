let productos = [];
fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        loadProducts(productos);
    })

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".button-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numCarrito = document.querySelector(".numCarrito");


function loadProducts(productosElegidos) {
    contenedorProductos.innerHTML = ``;

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <center><img class="producto-imagen" src="${producto.imagen}" alt=${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio"> $${producto.precio} MX</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div></center>`;
            contenedorProductos.append(div);
    });  
    updateButtonsAgregar();
    // console.log(botonesAgregar);
}

botonesCategorias.forEach(button => {
    button.addEventListener("click", (event) => {
        botonesCategorias.forEach(button => button.classList.remove("active"));
        event.currentTarget.classList.add("active");

        if (event.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id == event.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosButton = productos.filter(producto => producto.categoria.id === event.currentTarget.id);
            loadProducts(productosButton);   
        } else {
            tituloPrincipal.innerText = "Todos los Productos";
            loadProducts(productos);   
        }
    });
});

function updateButtonsAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(button => {
        button.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;
let productosEnCarritoStorage = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoStorage) {
    productosEnCarrito = JSON.parse(productosEnCarritoStorage);
    updateNumCarrito();
} else {
    productosEnCarrito = [];
}

console.log(productosEnCarrito);

function agregarAlCarrito(event) {
    Toastify({
        text: "AGREGADO",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #961717, #D08467)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
      
    const idButton = event.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idButton);
    
    if (productosEnCarrito.some(producto => producto.id === idButton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idButton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1; 
        productosEnCarrito.push(productoAgregado);
    } 
    // console.log(productosEnCarrito);

    updateNumCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function updateNumCarrito() {
    let newNumCarrito = productosEnCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
    numCarrito.innerText = newNumCarrito;
}