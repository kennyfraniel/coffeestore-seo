class Producto {
    constructor(id, nombre, precio, foto) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.foto = foto;
    }
}

class ElementoCarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
}

/**
 * Definiciones de constantes
 */
const estandarDolaresAmericanos = Intl.NumberFormat('en-US');

//Arrays donde guardaremos catálogo de productos y elementos en carrito
const productos = [];
let elementosCarrito = [];
if(localStorage.getItem("carrito")!=null){
    elementosCarrito=JSON.parse(localStorage.getItem("carrito"));
}

const contenedorProductos = document.getElementById('contenedor-productos');

const contenedorCarritoCompras = document.querySelector("#items")

const contenedorFooterCarrito = document.querySelector("#footer");

/**
 * Ejecución de funciones
 */

cargarProductos();
cargarCarrito();
dibujarCarrito();
dibujarCatalogoProductos();

/**
 * Definiciones de funciones
 */

function cargarProductos() {
    productos.push(new Producto(1, 'Cafiza', 10, 'imgjs/cafiza.jpg'));
    productos.push(new Producto(2, 'Café Cabrales', 12, 'imgjs/cabrales.jpg'));
    productos.push(new Producto(3, 'Filtros Cafetera', 25, 'imgjs/filtros.jpg'));
    productos.push(new Producto(4, 'Cafetera Moka Italiana', 80.98, 'imgjs/moka.jpg'));
    productos.push(new Producto(5, 'Molinillo Café', 50, 'imgjs/molino.jpg'));
    productos.push(new Producto(6, 'Brocha', 4, 'imgjs/brocha.jpg'));
    productos.push(new Producto(7, 'Tamper', 12, 'imgjs/tamper.jpg'));
    productos.push(new Producto(8, 'Pitcher', 10, 'imgjs/jarra.jpg'));

}

function cargarCarrito() {
    /*let elementoCarrito = new ElementoCarrito(
        new Producto(1, 'Cafiza', 10, '../imgjs/cafiza.jpg'),
        1
    );

    elementosCarrito.push(elementoCarrito);*/
}

function dibujarCarrito() {
    let sumaCarrito = 0;
    contenedorCarritoCompras.innerHTML = "";

    elementosCarrito.forEach(
        (elemento) => {
            let renglonesCarrito= document.createElement("tr");
            renglonesCarrito.innerHTML = `
                    <td>${elemento.producto.id}</td>
                    <td>${elemento.producto.nombre}</td>
                    <td><input id="cantidad-producto-${elemento.producto.id}" type="number" value="${elemento.cantidad}" min="1" max="1000" step="1" style="width: 50px;"/></td>
                    <td>$ ${elemento.producto.precio}</td>
                    <td>$ ${estandarDolaresAmericanos.format(elemento.producto.precio*elemento.cantidad)}</td>
                    <td><button id="eliminar-producto-${elemento.producto.id}" type="button" class="btn btn-danger"><i class="bi bi-trash-fill"></i></button></td>
            `;
            alert("Producto: "+elemento.producto.nombre+" fue agregado al carrito!")
            localStorage.setItem("carrito", JSON.stringify(elementosCarrito));

            contenedorCarritoCompras.append(renglonesCarrito);

            sumaCarrito+=elemento.cantidad*elemento.producto.precio;

            //agregamos evento a carrito
            let cantidadProductos = document.getElementById(`cantidad-producto-${elemento.producto.id}`);
            
            cantidadProductos.addEventListener("change", (e) => {
                let nuevaCantidad = e.target.value;
                elemento.cantidad = nuevaCantidad;
                dibujarCarrito();
            });
            let botonBorrarProducto = document.getElementById(`eliminar-producto-${elemento.producto.id}`);
            botonBorrarProducto.addEventListener('click', () => {
                removerProductoCarrito(elemento);
                dibujarCarrito();
            });
        }
    );
    
    if(elementosCarrito.length == 0) {
    contenedorFooterCarrito.innerHTML = `
    <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
    `;
    }else {
        contenedorFooterCarrito.innerHTML = `
        <th scope="row" colspan="5">Total de la compra: $${estandarDolaresAmericanos.format(sumaCarrito)}</th>
        `;
    }

}

function removerProductoCarrito(elementoAEliminar){
    const elementosAMantener = elementosCarrito.filter(
        (elemento) => elemento.producto.id != elementoAEliminar.producto.id 
    );
    elementosCarrito.length = 0;

    elementosAMantener.forEach((elemento) => elementosCarrito.push(elemento));
}

function crearCard(producto) {
    //Botón
    let botonAgregar = document.createElement("button");
    botonAgregar.className = "btn btn-success";
    botonAgregar.innerText = "Agregar";

    //Card body
    let cuerpoCarta = document.createElement("div");
    cuerpoCarta.className = "card-body";
    cuerpoCarta.innerHTML = `
        <h5>${producto.nombre}</h5>
        <p>$ ${producto.precio} USD</p>
    `;
    cuerpoCarta.append(botonAgregar);

    //Imagen
    let imagen = document.createElement("imgjs");
    imagen.src = producto.foto;
    imagen.className = "card-img-top";
    imagen.alt = producto.nombre;

    //Card
    let carta = document.createElement("div");
    carta.className = "card";
    carta.append(imagen);
    carta.append(cuerpoCarta);

    //Contenedor Card
    let contenedorCarta = document.createElement("div");
    contenedorCarta.className = "col-xs-6 col-sm-3 col-md-2";
    contenedorCarta.append(carta);

    //Agregar algunos eventos
    botonAgregar.onclick = () => {

        let elementoCarrito = new ElementoCarrito(producto, 1);
        elementosCarrito.push(elementoCarrito);

        dibujarCarrito();

    } 
    
    return contenedorCarta;

}

function dibujarCatalogoProductos() {
    contenedorProductos.innerHTML = "";

    productos.forEach(
        (producto) => {
            let contenedorCarta = crearCard(producto);
            contenedorProductos.append(contenedorCarta);
        }
    );

}



