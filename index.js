
let titulo = document.getElementById("header");
titulo.innerHTML = "<h1>Adolfina Decoracion</h1>";

let texto = document.getElementById("texto");
texto.innerHTML = "<h2>¿Quienes somos?</h2><p>Adolfina Decoracion surgio como un proyecto de hermanas. Desde chicas nos encantaba coser, diseñar, mezclar texturas y colores</p>";

class Producto {
    constructor(id, nombre, precio, cantidad, tamaño) {
        this.id= id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.tamaño = tamaño;
        this.img = img;
    }
}

const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})


botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})


const contadorCarrito =document.getElementById('contadorCarrito')

const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')



let carrito = []

let catalogoProductos = [];

catalogoProductos.push(new Producto(1, "Almohadon de pana ", 700, 0, "40x40 cm", img= 'imagenes/almohadonpana.jpg'));
catalogoProductos.push(new Producto(2, "Almohadon de tusor ", 700, 0, "40x40 cm", img= 'imagenes/almtusor.jpg'));
catalogoProductos.push(new Producto(3, "Almohadon de gasa ", 800, 0, "50x30 cm",img= 'imagenes/gasaalm.jpg'));
catalogoProductos.push(new Producto(4, "Almohada para cama ", 1300, 0, "50x40 cm", img= 'imagenes/almcama.jpg'));
catalogoProductos.push(new Producto(5, "Cortinas de gasa ", 13000, 0, "200x150 cm", img= 'imagenes/cortinas.jpg'));
catalogoProductos.push(new Producto(6, "Cortinas de tusor ", 15000, 0, "200x150 cm", img= 'imagenes/cortinas2.jpg'));
catalogoProductos.push(new Producto(7, "Cortinas de lino ", 17000, 0, "200x150 cm"));
catalogoProductos.push(new Producto(8, "Cortinas de Blackout ", 18000, 0, "200x150 cm"));
catalogoProductos.push(new Producto(9, "Cortinas de baño ", 5000, 0, "180x150 cm",img='imagenes/coortbaño.jpg'));
catalogoProductos.push(new Producto(10, "Mantel de tusor ", 5000, 0, "200x150 cm",img= 'imagenes/manteltuss.jpg'));
catalogoProductos.push(new Producto(11, "Mantel waffle ", 7000, 0, "200x150 cm"));
catalogoProductos.push(new Producto(12, "Mantel gasa ", 5000, 0, "200x150 cm",img= 'imagenes/gasam.jpg'));
catalogoProductos.push(new Producto(13, "Delantal ", 1500, 0, "70x40 cm",img= 'imagenes/delantal.jpg'));
catalogoProductos.push(new Producto(14, "Juego de servilletas x 8 ", 4000, 0, "40x40 cm",img= 'imagenes/servilleta.jpg'));
catalogoProductos.push(new Producto(15, "Juego sabanas para cama king ", 20000, 0, "200 x 200 cm",img= 'imagenes/cama.jpg'));
catalogoProductos.push(new Producto(16, "Juego sabanas para cama Queen ", 18000, 0, "160 x 200 cm",img= 'imagenes/cama2.jpg'));
catalogoProductos.push(new Producto(17, "Juego sabanas para cama 2 plazas y media ", 14000, 0, "140 x 190cm",img= 'imagenes/cama.jpg'));
catalogoProductos.push(new Producto(18, "Juego sabanas para cama 1 plaza y media ", 10000, 0, "190 x 090 cm",img= 'imagenes/cama1p.jpg'));
catalogoProductos.push(new Producto(19, "Pie de cama ", 9000, 0, "200 x 150 cm",img= 'imagenes/piecama.jpg'));

//////

    
    catalogoProductos.forEach((producto) => {
        const div = document.createElement('div')
        div.className = "col-md-4 mt-3";
        div.id = `div-${producto.id}`;
        div.classList.add('producto')
        div.innerHTML =  `
    <div class="card">
        <div class="card-body">
        <img src=${producto.img} alt= "">
        <h3 class="card-title">${producto.id}.${producto.nombre}</h5>
        <p class="card-text">Precio: <b>$ ${producto.precio}</b></p>
        <p class="card-text">Tamaño: <b>${producto.tamaño}<b></p>
        <button id= "agregar${producto.id}" class="boton-agregar">Agregar <i class = "fas fa-shopping-cart"></i></button>
        </div>
    </div>`
    
    //  <img src= ${producto.img} alt="">
        contenedorProductos.appendChild(div);

        const boton = document.getElementById(`agregar${producto.id}`)

        boton.addEventListener('click' , () => {
            agregarCarrito(producto.id)
        })
    })


////


const agregarCarrito = (prodId) => {
    const existe = carrito.some (prod => prod.id === prodId)
    if(existe){
        const prod = carrito.map (prod => {
            if(prod.id === prodId){
                prod.cantidad++
            }
        })
    }else{
    const item =catalogoProductos.find ((prod) => prod.id === prodId)
    carrito.push(item)
    }
    actualizarCarrito()
}

const eliminarDelCarrito = (prodId) => {
    const item =carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()
    console.log(carrito)
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""

    carrito.forEach((prod) => {
    const div =document.createElement('div')
    div.className= ('productoEnCarrito')
    div.innerHTML= `
    <p>${prod.nombre}</p>
    <p>Precio : ${prod.precio}</p>
    <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
    <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`

    contenedorCarrito.appendChild(div)

    localStorage.setItem('carrito', JSON.stringify(carrito))
    })

    contadorCarrito.innerText = carrito.length
    console.log(carrito)
    precioTotal.innerText = carrito.reduce ((acc , prod) => acc + prod.cantidad * prod.precio, 0 )
}








