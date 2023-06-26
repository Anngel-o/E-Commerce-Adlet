// PRODUCTOS
const precioBolsa = 230;
const productos = [
    // Bolsas
    {
        id: "bolsa-beso-rosa",
        titulo: "Bolsa Beso Rosa",
        imagen: "./img/bolsa-azul-rey.jpg",
        categoria: {
            nombre: "Bolsas",
            id: "bolsas"
        },
        precio: precioBolsa
    },
    {
        id: "bolsa-lila",
        titulo: "Bolsa Lila",
        imagen: "./img/bolsa-azul-rey.jpg",
        categoria: {
            nombre: "Bolsas",
            id: "bolsas"
        },
        precio: precioBolsa
    },
    {
        id: "bolsa-lila-pequena",
        titulo: "Bolsa Lila Pequeña",
        imagen: "./img/bolsa-azul-rey.jpg",
        categoria: {
            nombre: "Bolsas",
            id: "bolsas"
        },
        precio: precioBolsa
    },
    {
        id: "bolsa-azul-rey",
        titulo: "Bolsa Azul Rey",
        imagen: "./img/bolsa-azul-rey.jpg",
        categoria: {
            nombre: "Bolsas",
            id: "bolsas"
        },
        precio: precioBolsa
    },
    {
        id: "bolsa-verde",
        titulo: "Bolsa Verde",
        imagen: "./img/bolsa-azul-rey.jpg",
        categoria: {
            nombre: "Bolsas",
            id: "bolsas"
        },
        precio: precioBolsa
    },
    {
        id: "bolsa-olivo",
        titulo: "Bolsa Olivo",
        imagen: "./img/bolsa-azul-rey.jpg",
        categoria: {
            nombre: "Bolsas",
            id: "bolsas"
        },
        precio: precioBolsa
    },
    {
        id: "bolsa-roja",
        titulo: "Bolsa Roja",
        imagen: "./img/bolsa-azul-rey.jpg",
        categoria: {
            nombre: "Bolsas",
            id: "bolsas"
        },
        precio: precioBolsa
    },
    {
        id: "bolsa-buganbilia",
        titulo: "Bolsa Buganbilia",
        imagen: "./img/bolsa-tommy.jpg",
        categoria: {
            nombre: "Bolsas",
            id: "bolsas"
        },
        precio: precioBolsa
    },
    {
        id: "bolsa-negra",
        titulo: "Bolsa Negra",
        imagen: "./img/bolsa-tommy.jpg",
        categoria: {
            nombre: "Bolsas",
            id: "bolsas"
        },
        precio: precioBolsa
    },
    {
        id: "bolsa-negra-mono",
        titulo: "Bolsa Negra Moño",
        imagen: "./img/bolsa-tommy.jpg",
        categoria: {
            nombre: "Bolsas",
            id: "bolsas"
        },
        precio: precioBolsa
    },
    {
        id: "bolsa-tommy",
        titulo: "Bolsa Tommy",
        imagen: "./img/bolsa-tommy.jpg",
        categoria: {
            nombre: "Bolsas",
            id: "bolsas"
        },
        precio: precioBolsa
    },
    {
        id: "bolsa-olivo",
        titulo: "Bolsa Olivo",
        imagen: "./img/bolsa-tommy.jpg",
        categoria: {
            nombre: "Accesorios",
            id: "accesorios"
        },
        precio: precioBolsa
    },
    {
        id: "bolsa-camel",
        titulo: "Bolsa Camel",
        imagen: "./img/bolsa-tommy.jpg",
        categoria: {
            nombre: "Zapatos",
            id: "zapatos"
        },
        precio: precioBolsa
    },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".button-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");

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
}

loadProducts(productos);

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