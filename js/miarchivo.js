
let titulo = document.getElementById("header");
titulo.innerHTML = "<h1>Adolfina Decoracion</h1>";

let texto = document.getElementById("texto");
texto.innerHTML = "<h2>¿Quienes somos?</h2><p>Adolfina Decoracion surgio como un proyecto de hermanas. Desde chicas nos encantaba coser, diseñar, mezclar texturas y colores</p>";


const contenedorProductos = document.getElementById("contenedor-productos")

async function obtenerProducto(){
    fetch("https://62e746fe0e5d74566af1490e.mockapi.io/productos")
    .then((response) => {
        console.log(response);
        return response.json();
    })
    .then((data) => {
        console.log(data);
        console.log(data[0].body);

    data.forEach((producto) => {
    const div = document.createElement('div')
    div.className = "col-md-4 mt-3";
    div.id = `div-${producto.id}`;
    div.classList.add('producto')
    div.innerHTML = `
    <div class="card">
        <div class="card-body">
        <h3 class="card-title">${producto.id}.${producto.nombre}</h5>
        <p class="card-text">Precio: <b>$ ${producto.precio}</b></p>
        <p class="card-text">Tamaño: <b>${producto.descripcion}<b></p>
        <button id= "agregar${producto.id}" class="boton-agregar">Agregar <i class = "fas fa-shopping-cart"></i></button>
        </div>
    </div>`

    contenedorProductos.appendChild(div);

    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {
        Toastify({
        text: `Agregaste ${producto.nombre} al carrito de compras`,
        className: "info",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();
        agregarCarrito(producto.id)
    })
})
    });

    let data = [];
    
}

obtenerProducto()
//me muestra la info del producto por esto



const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

document.addEventListener('DOMContentLoaded', () => {
    localStorage.getItem('carrito') && (carrito = JSON.parse(localStorage.getItem('carrito')))
    actualizarCarrito();
})
//operador logico AND


botonVaciar.addEventListener('click', () => {
    Swal.fire({
        title: 'Estas seguro que queres borrar el carrito de compras?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Eliminado!',
                'El carrito de compras fue eliminado con exito.',
                'success'
            )
            eliminar()
        }
    })
})

function eliminar() {
    carrito.length = 0
    actualizarCarrito()
}

const contadorCarrito = document.getElementById('contadorCarrito')

const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')



let carrito = []

const agregarCarrito = (prodId) => {
    const existe = carrito.some(prod => prod.id === prodId)
    if (existe) {
        const prod = carrito.map(prod => {
            prod.id === prodId && prod.cantidad++

        })
    } else {
        const item = obtenerProducto.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    actualizarCarrito()
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()
    console.log(carrito)
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""

    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
    <p>${producto.nombre}</p>
    <p>Precio : ${producto.precio}</p>
    <p>Cantidad: <span id="cantidad">${producto.cantidad}</span></p>
    <button onclick="eliminarDelCarrito(${producto.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`

        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))
    })

    contadorCarrito.innerText = carrito.length
    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    //rest parameters
}

