let productosEnCarrito = localStorage.getItem("productos-en-carrito");

productosEnCarrito = JSON.parse(productosEnCarrito);
// console.log(productosEnCarrito);

const contCarritoVacio = document.querySelector(".carrito-vacio");
const contCarritoProductos = document.querySelector(".carrito-productos");
const contCarritoAcciones = document.querySelector(".carrito-acciones");
const contCarritoComprado = document.querySelector(".carrito-comprado");
let buttonsEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const buttonVaciar = document.querySelector(".carrito-acciones-vaciar");
const contTotal = document.querySelector(".total");
const buttonComprar = document.querySelector(".carrito-acciones-comprar");

function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        contCarritoVacio.classList.add("disabled");
        contCarritoProductos.classList.remove("disabled");
        contCarritoAcciones.classList.remove("disabled");
        contCarritoComprado.classList.add("disabled");
    
        contCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
                div.innerHTML = `<img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Producto</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$ ${producto.precio} MX</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$ ${producto.precio * producto.cantidad} MX</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash3-fill"></i></button>`;
    
            contCarritoProductos.append(div);
        });
        
    } else {
        contCarritoVacio.classList.remove("disabled");
        contCarritoProductos.classList.add("disabled");
        contCarritoAcciones.classList.add("disabled");
        contCarritoComprado.classList.add("disabled");
    }
    updateButtonsEliminar();
    updateTotal();
}

cargarProductosCarrito();

function updateButtonsEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminar.forEach(button => {
        button.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(event) {
    Toastify({
        text: "ELIMINADO",
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
    let idButton = event.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idButton);
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

buttonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    Swal.fire({
        title: '<strong>¿Quieres vaciar tu carrito?</strong>',
        icon: 'question',
        html:
          `Se borrarán ${productosEnCarrito.reduce((acumulador,producto) => acumulador + producto.cantidad , 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          productosEnCarrito.length = 0;
          localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
          cargarProductosCarrito();
        }
      });
}

function updateTotal() {
    const totalCalculado = productosEnCarrito.reduce((acumulador, producto) => acumulador + (producto.cantidad * producto.precio), 0);
    total.innerText = `$ ${totalCalculado} MX`;
}

buttonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    contCarritoVacio.classList.add("disabled");
    contCarritoProductos.classList.add("disabled");
    contCarritoAcciones.classList.add("disabled");
    contCarritoComprado.classList.remove("disabled");
}
