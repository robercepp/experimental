/* Este proyecto es un módulo eCommerce para una pagina ya existente de una Ilustradora Gráfica. la idea es crear un catalogo de productos a vender, implementar un carrito de compras donde cargarlos, y añadir un modulo de pagos y encargos */

//Anabella Avena - Ilustradora Gráfica - módulo eCommerce.

//Constructor de Productos.
class Producto {
    constructor(id, tipo, nombre, precio, stockDisponible) {
        this.id = id;
        this.tipo = tipo;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.stock = stockDisponible;
        this.stockDisponible = parseInt(stockDisponible);
    }
}
//esto debe ir aquí arriba sino no anda nada... :(
const catalogoDeBusqueda = [];
const carritoDeCompras = [];

// Creando Productos
//Libretas
const libretaChicasGamer = new Producto(0, "Libreta", "Libreta de Chicas Gamer", 12.5, 10);
const libretaSixFanarts = new Producto(1, "Libreta", "Libreta de Six Fanarts", 10.5, 15);
const libretaLuluMartins = new Producto(2, "Libreta", "Libreta de Lulu Martins", 11.0, 6);
const libretaChristineHug = new Producto(3, "Libreta", "Libreta de Christine Hug", 12.0, 8);

//Stickers
const stickerSirenas = new Producto(4, "Sticker", "Stickers de Sirenas", 3.50, 6);
const stickerChicas = new Producto(5, "Sticker", "Stickers de Chicas", 3.0, 7);
const stickerHalloween = new Producto(6, "Sticker", "Stickers de Halloween", 2.75, 10);
const stickerAnimales = new Producto(7, "Sticker", "Stickers de Animales", 3.5, 10);

//Posters
const posterNocheVerano = new Producto(8, "Poster", "Poster de una Noche de Verano", 5.75, 6);
const posterAmantesMariposa = new Producto(9, "Poster", "Poster de Amantes Mariposa", 6.0, 8);
const posterDeSanValentin = new Producto(10, "Poster", "Poster de San Valentín espacial", 5.0, 10);
const posterDeGatos = new Producto(11, "Poster", "Poster de Gatos", 5.50, 7);

//Se crea el catálogo de búsqueda
catalogoDeBusqueda.push(libretaChicasGamer, libretaSixFanarts, libretaLuluMartins, libretaChristineHug, stickerSirenas, stickerChicas, stickerHalloween, stickerAnimales, posterNocheVerano, posterAmantesMariposa, posterDeSanValentin, posterDeGatos);



//variables y constantes generales
let nombre = "";
let apellido = "";
const iva = 1.21;
let titulo = document.createElement("h4");
document.getElementsByClassName("titulo-relativo")[0].appendChild(titulo);
let alerta = document.createElement("p");
document.getElementsByClassName("alertas")[0].append(alerta);
let bienvenido = document.createElement("p");
document.getElementsByClassName("bienvenido")[0].appendChild(bienvenido);
const tr = document.createElement("tr");
const contenido = document.querySelector(".contenido")
const cabecera = document.createElement("div");
cabecera.className = "cabecera";
cabecera.id = "cabecera"
const salida = document.createElement("div");



const interruptor = document.getElementById("switch-label");
interruptor.addEventListener("click", (e) => {
    e.preventDefault
    console.log(document.getElementById("switch-label").checked)
    COLORCHANGER();
})

function COLORCHANGER () {
    if (document.getElementById("switch-label").checked == true) {
       document.body.style.backgroundColor = "red";
    } else if (document.getElementById("switch-label").checked == false) { 
       document.body.style.background = "linear-gradient(0deg, rgba(136,0,255,1) 0%, rgba(0,0,0,1) 100%)";
    }
}



//A partir de aquí comienza el menú...
BIENVENIDA();

function BIENVENIDA() {
    contenido.innerHTML = `
    <p class="elements"> Por favor ingrese su nombre y apellido </p>
    <form id="formulario" class="menu-intro">
    <div class="elements">
    <input id="nombre" placeholder="nombre" type="text">
    </div>
    <div class="elements">
    <input id="apellido" placeholder="apellido" type="text">
    </div>
    <div class="button-container">
    <button type="submit" class="button">Siguiente --></button>
    </div>
    </form>
    `
    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        if (e.target[0].value === "" || e.target[1].value === "") {
            alerta.innerHTML = "Por favor llene los campos antes de continuar"
        } else {
            nombre = e.target[0].value;
            apellido = e.target[1].value;
            bienvenido.innerHTML = "Bienvenido/a, " + nombre;
            alerta.replaceChildren();
            window.setTimeout(MENUPRINCIPAL(), 0);
        }
    });
}

function MENUPRINCIPAL() {
    titulo.innerHTML = "---Menu Principal---";
    contenido.innerHTML = `
    <p>Bienvenido/a al simulador de tienda, aquí podrás ver mi catálogo de items en venta.</p>
    <p>Por favor elige una opción:</p>
    <button id="opcion-1" class="opciones-menu">Buscar un Producto</button>
    <p>Cátalogo de productos</p>
    <button id="opcion-2" class="opciones-menu">Libretas</button>
    <button id="opcion-3" class="opciones-menu">Sticker</button>
    <button id="opcion-4" class="opciones-menu">Posters</button>
    <p>Mas Opciones</p>
    <button id="opcion-5" class="opciones-menu">Carrito de Compras</button>
    <button id="opcion-6" class="opciones-menu">Salir</button>
    `
    const opcion1 = document.getElementById("opcion-1");
    opcion1.addEventListener("mouseup", (e) => {
        MENUBUSQUEDA();
    });
    const opcion2 = document.getElementById("opcion-2");
    opcion2.addEventListener("mouseup", () => {
        window.setTimeout(MENU("Libreta", "Libretas"), 0);
    });
    const opcion3 = document.getElementById("opcion-3");
    opcion3.addEventListener("mouseup", () => {
        window.setTimeout(MENU("Sticker", "Stickers"), 0);
    });
    const opcion4 = document.getElementById("opcion-4");
    opcion4.addEventListener("mouseup", () => {
        window.setTimeout(MENU("Poster", "Posters"), 0);
    });
    const opcion5 = document.getElementById("opcion-5");
    opcion5.addEventListener("mouseup", () => {
        window.setTimeout(MENUCARRITO, 0);
    });
    const opcion6 = document.getElementById("opcion-6");
    opcion6.addEventListener("mouseup", () => {
        window.setTimeout(EXITPROGRAM(), 0);
    });
}

function MENUBUSQUEDA() {
    contenido.innerHTML = '';
    let busqueda;
    let numeracion = 0;
    let encontrado;
    let cantidades;
    titulo.innerHTML = "---Menu de Busqueda---";
    contenido.innerHTML = `
    <p>---Buscador de Productos---</p>
    <p>Escriba el tipo o el nombre del ítem que esté buscando.</p>
    </br>
    <form id="formulario">
    <div class=buscador-container>
    <input id="buscador" style='width:20em' type="text"></input>
    <button class="boton-buscar" type="submit">Buscar</button>
    </div>
    <p class= "pista">Pista: puede ser un tipo como 'Sticker' o 'Poster', o alguna palabra clave.</p>
    </form>
    <button id="salida">volver</button>
    `
    const volver = document.getElementById("salida");
    volver.addEventListener("mouseup", (e) => {
        e.preventDefault();
        alerta.innerHTML = "";
        MENUPRINCIPAL();
    });
    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        busqueda = e.target[0].value;
        if (busqueda === "") {
            alerta.innerHTML = "Por favor llene los campos antes de continuar"
        } else {
            encontrado = catalogoDeBusqueda.filter(producto => producto.tipo.toLowerCase().includes(busqueda.toLowerCase()) || producto.nombre.toLowerCase().includes(busqueda.toLowerCase()));
            alerta.replaceChildren();
            if (encontrado.length == 0) {
                alerta.innerHTML = "Lo sentimos," + " '" + busqueda + "' " + "no ha arrojado ninún resultado, lo intentamos de nuevo?";
            } else {
                contenido.replaceChildren();
                const listaDeBusqueda = (funcion, encontrado) => {
                    for (const item of encontrado) {
                        numeracion = numeracion + 1;
                        funcion(item);
                    }
                }
                document.getElementsByClassName("contenido")[0].appendChild(cabecera);
                cabecera.innerHTML = `
                <p>Hemos encontrado los siguientes items relacionados con: "${busqueda}"</p>
                <div class=resultado-cabecera> 
                <div class="td-tipo">tipo</div>
                    <div class="td-nombre">nombre</div>
                    <div class="td-precio">precio</div>
                    <div class="td-stock">stock</div>
                    <div class="td-form">carrito</div>
                    </div>
                `
                listaDeBusqueda((encontrado) => {
                    const resultado = document.createElement("div");
                    resultado.className = "resultado";
                    document.getElementsByClassName("contenido")[0].appendChild(resultado);
                    resultado.innerHTML = `
                    <div class="td-tipo">${encontrado.tipo}</div>
                    <div class="td-nombre">${encontrado.nombre}</div>
                    <div class="td-precio">$${encontrado.precio}</div>
                    <div class="td-stock">${encontrado.stock}</div>
                    <div class="td-form"> <form id="agregado-${numeracion}">
                    <input style='width:2em' type="number" min="1">
                    <button class="boton-contextual">agregar</button>
                    </form>
                    </div>
                    `;
                    gestorCarrito(numeracion);
                }, encontrado);
                document.getElementsByClassName("contenido")[0].appendChild(salida);
                salida.innerHTML = `
                <button id="salida">volver</button>
                `
                const volver = document.getElementById("salida");
                volver.addEventListener("mouseup", (e) => {
                    e.preventDefault();
                    alerta.innerHTML = "";
                    MENUBUSQUEDA();
                });

                function gestorCarrito(numero) {
                    const agregar = document.querySelector("#agregado-" + numero);
                    agregar.addEventListener("submit", (e) => {
                        e.preventDefault();
                        cantidades = parseInt(e.target[0].value);
                        alerta.innerHTML = "";
                        document.querySelectorAll("input").forEach((input) => {
                            input.value = "";
                        });
                        if (catalogoDeBusqueda[encontrado[(numero - 1)].id].stock > 0) {
                            if (catalogoDeBusqueda[encontrado[(numero - 1)].id].stock >= cantidades) {
                                catalogoDeBusqueda[encontrado[(numero - 1)].id].stock = catalogoDeBusqueda[encontrado[(numero - 1)].id].stock - cantidades;
                                carritoDeCompras.push({
                                    id: catalogoDeBusqueda[encontrado[(numero - 1)].id].id,
                                    tipo: catalogoDeBusqueda[encontrado[(numero - 1)].id].tipo,
                                    cantidad: cantidades,
                                    nombre: catalogoDeBusqueda[encontrado[(numero - 1)].id].nombre,
                                    precio: (catalogoDeBusqueda[encontrado[(numero - 1)].id].precio),
                                    subtotal: (cantidades * catalogoDeBusqueda[encontrado[(numero - 1)].id].precio)
                                });
                                if (cantidades == 1) {
                                    alerta.innerHTML = catalogoDeBusqueda[encontrado[(numero - 1)].id].nombre + " ha sido añadido al carrito.";
                                } else {
                                    alerta.innerHTML = cantidades + "x " + catalogoDeBusqueda[encontrado[(numero - 1)].id].nombre + " han sido añadidos al carrito.";
                                }
                            } else {
                                alerta.innerHTML = "Atención: Stock insuficiente para cumplir la demanda, puedes pedir " + catalogoDeBusqueda[encontrado[(numero - 1)].id].stock + " unidades o menos.";
                            }
                        } else {
                            alerta.innerHTML = "Al parecer nos hemos quedado sin stock, por favor intenta mas tarde.";
                        }
                    });
                }
            }
        }
    });
}

function MENU(clase, tipoPlural) {
    contenido.innerHTML = '';
    let busqueda = clase;
    let numeracion = 0;
    let encontrado = "";
    let cantidades;
    titulo.innerHTML = "---Menu de " + tipoPlural + "---";
    encontrado = catalogoDeBusqueda.filter(producto => producto.tipo.toLowerCase().includes(busqueda.toLowerCase()) || producto.nombre.toLowerCase().includes(busqueda.toLowerCase()));
    const listaDeBusqueda = (funcion, encontrado) => {
        for (const item of encontrado) {
            numeracion = numeracion + 1;
            funcion(item);
        }
    }
    document.getElementsByClassName("contenido")[0].appendChild(cabecera);
    cabecera.innerHTML = `
                <p>Nuestro catálogo de ${tipoPlural}</p>
                <div class=resultado-cabecera> 
                    <div class="td-nombre">nombre</div>
                    <div class="td-precio">precio</div>
                    <div class="td-stock">stock</div>
                    <div class="td-form">carrito</div>
                    </div>
                `
    listaDeBusqueda((encontrado) => {
        const resultado = document.createElement("div");
        resultado.className = "resultado";
        document.getElementsByClassName("contenido")[0].appendChild(resultado);
        resultado.innerHTML = `
                    <div class="td-nombre">${encontrado.nombre}</div>
                    <div class="td-precio">$${encontrado.precio}</div>
                    <div class="td-stock">${encontrado.stock}</div>
                    <div class="td-form"> <form id="agregado-${numeracion}">
                    <input style='width:2em' type="number" min="1">
                    <button class="boton-contextual">agregar</button>
                    </form>
                    </div>
                    `;
        gestorCarrito(numeracion);
    }, encontrado);
    const salida = document.createElement("div");
    document.getElementsByClassName("contenido")[0].appendChild(salida);
    salida.innerHTML = `
                <button id="salida">volver</button>
                `
    const volver = document.getElementById("salida");
    volver.addEventListener("mouseup", (e) => {
        e.preventDefault();
        alerta.innerHTML = "";
        MENUPRINCIPAL();
    });

    function gestorCarrito(numero) {
        const agregar = document.querySelector("#agregado-" + numero);
        agregar.addEventListener("submit", (e) => {
            e.preventDefault();
            cantidades = parseInt(e.target[0].value);
            alerta.innerHTML = "";
            document.querySelectorAll("input").forEach((input) => {
                input.value = "";
            });
            if (catalogoDeBusqueda[encontrado[(numero - 1)].id].stock > 0) {
                if (catalogoDeBusqueda[encontrado[(numero - 1)].id].stock >= cantidades) {
                    catalogoDeBusqueda[encontrado[(numero - 1)].id].stock = catalogoDeBusqueda[encontrado[(numero - 1)].id].stock - cantidades;
                    carritoDeCompras.push({
                        id: catalogoDeBusqueda[encontrado[(numero - 1)].id].id,
                        tipo: catalogoDeBusqueda[encontrado[(numero - 1)].id].tipo,
                        cantidad: cantidades,
                        nombre: catalogoDeBusqueda[encontrado[(numero - 1)].id].nombre,
                        precio: (catalogoDeBusqueda[encontrado[(numero - 1)].id].precio),
                        subtotal: (cantidades * catalogoDeBusqueda[encontrado[(numero - 1)].id].precio)
                    });
                    if (cantidades == 1) {
                        alerta.innerHTML = catalogoDeBusqueda[encontrado[(numero - 1)].id].nombre + " ha sido añadido al carrito.";
                        MENU(clase, tipoPlural)
                    } else {
                        alerta.innerHTML = cantidades + "x " + catalogoDeBusqueda[encontrado[(numero - 1)].id].nombre + " han sido añadidos al carrito.";
                        MENU(clase, tipoPlural)
                    }
                } else {
                    alerta.innerHTML = "Atención: Stock insuficiente para cumplir la demanda, puedes pedir " + catalogoDeBusqueda[encontrado[(numero - 1)].id].stock + " unidades o menos.";
                }
            } else {
                alerta.innerHTML = "Al parecer nos hemos quedado sin stock, por favor intenta mas tarde.";
            }
        });
    }
}

function MENUCARRITO() {
    numeracion = 0;
    let precioSinIva = carritoDeCompras.reduce((acumulador, carritoDeCompras) => {
        return acumulador + carritoDeCompras.subtotal;
    }, 0);
    let precioConIva = precioSinIva * iva;
    let pago;
    contenido.innerHTML = '';
    titulo.innerHTML = "---Carrito de compras---"
    document.getElementsByClassName("contenido")[0].appendChild(cabecera);
    cabecera.innerHTML = `
                <p>Repasemos lo que has cargado en el carrito antes de confirmar...</p>
                <div class=resultado-cabecera> 
                <div class="td-tipo">tipo</div>
                    <div class="td-nombre">nombre</div>
                    <div class="td-precio">precio unitario</div>
                    <div class="td-cantidad">cantidad</div>
                    <div class="td-subtotal">subtotal</div>
                    <div class="td-quitar">quitar</div>
                    </div>
                `
    const listaDeBusqueda = (funcion, encontrado) => {
        for (const item of encontrado) {
            numeracion = numeracion + 1;
            funcion(item);
        }
    }
    listaDeBusqueda((carritoDeCompras) => {
        const resultado = document.createElement("div");
        resultado.className = "resultado";
        resultado.id = "item-" + numeracion;
        document.getElementsByClassName("contenido")[0].appendChild(resultado);
        resultado.innerHTML = `
                    <div class="td-tipo">${carritoDeCompras.tipo}</div>
                                <div class="td-nombre">${carritoDeCompras.nombre}</div>
                                <div class="td-precio">$${carritoDeCompras.precio}</div>
                                <div class="td-cantidad">${carritoDeCompras.cantidad}</div>
                                <div class="td-subtotal">$${carritoDeCompras.subtotal}</div>
                                <button id="agregado-${numeracion}" class="boton-contextual">quitar</button>
                                `;
        eliminar(numeracion);
    }, carritoDeCompras);

    function eliminar(numero) {
        const quitar = document.querySelector("#agregado-" + numero);
        quitar.addEventListener("mouseup", (e) => {
            e.preventDefault();
            catalogoDeBusqueda[carritoDeCompras[(numero - 1)].id].stock = catalogoDeBusqueda[carritoDeCompras[(numero - 1)].id].stock + carritoDeCompras[(numero - 1)].cantidad;
            alerta.innerHTML = carritoDeCompras[(numero - 1)].cantidad + "x " + carritoDeCompras[(numero - 1)].nombre + " ha sido eliminado del carrito de compras.";
            const borrar = document.querySelector("#item-" + numero);
            borrar.remove();
            let borrado = carritoDeCompras.splice(numero - 1, 1);
            MENUCARRITO();
        });
    }
    salida.className = "foot"
    document.getElementsByClassName("contenido")[0].appendChild(salida);
    salida.innerHTML = `
    <div class="total-container"><div class="total"> Total: $${precioConIva.toFixed(2)}*</div>
    <div class="nota">*el precio incl. iva.</div></div>
                <button id="pagar">confirmar compra</button>
                <button id="cancelar">cancelar compra</button>
                <button id="salida">volver</button>
                `
    const volver = document.getElementById("salida");
    volver.addEventListener("mouseup", (e) => {
        e.preventDefault();
        alerta.innerHTML = "";
        MENUPRINCIPAL();
    });
    const cancelar = document.getElementById("cancelar");
    cancelar.addEventListener("mouseup", (e) => {
        e.preventDefault();
        alerta.innerHTML = "";
        EXITPROGRAM();
    });
    const pagar = document.getElementById("pagar");
    pagar.addEventListener("mouseup", (e) => {
        e.preventDefault();
        if (carritoDeCompras.length < 1) {
            alerta.innerHTML = "Lo sentimos. no puedes continuar si no has cargado ningun ítem en el carrito"
        } else {
            alerta.innerHTML = "";
            contenido.innerHTML = "";

            titulo.innerHTML = "---Carrito de Compras---";
            contenido.innerHTML = `
            <p>El precio total a pagar es de: $<u>${precioConIva.toFixed(2)}</u>.-</p>
            </br>
            <p>Por favor ingrese la suma a continuación</p>
            <form id="formulario">
            <input id="pago" type="text">
            <button type="submit" class="confirmar-pago">Confirmar Pago</button>
            </form>
            <button id="salida">volver</button>
            `

            const salida = document.getElementById("salida");
            salida.addEventListener("mouseup", (e) => {
                e.preventDefault();
                contenido.innerHTML = "";
                MENUCARRITO();
            })
            const confirmar = document.getElementById("formulario");
            confirmar.addEventListener("submit", (e) => {
                e.preventDefault();
                pago = parseFloat(e.target[0].value);
                document.querySelectorAll("input").forEach((input) => {
                        input.value = "";
                    });
                if (pago == precioConIva.toFixed(2)) {
                    alerta.innerHTML = "El pago de: $" + precioConIva.toFixed(2) + " se ha acreditado correctamente.";
                    CIERREDECOMPRA();
                } else if (pago > precioConIva) {
                    let vuelto = pago - precioConIva.toFixed(2);
                    alerta.innerHTML = "Al parecer nos has enviado mas dinero del que era necesario, por ello te reenviamos $" + vuelto.toFixed(2) + " como vuelto por tu compra.";
                    CIERREDECOMPRA();
                } else if (pago < precioConIva && pago > 0) {
                    let pagoInsuficiente = precioConIva.toFixed(2) - pago;
                    alerta.innerHTML = "Vaya!, al parecer has pagado $" + pago + ". Lamentablemente te faltan $" + pagoInsuficiente.toFixed(2) + " para completar los $" + precioConIva.toFixed(2) + " que se necesitan.</ br>Te devolvemos el dinero, Volvamos a completar la transacción.";
                }
            });
        }
    });
}

function CIERREDECOMPRA() {
    const listadoCarrito = carritoDeCompras.map((carritoDeCompras) => "-" + carritoDeCompras.cantidad + "x " + carritoDeCompras.nombre + "<br />Subtotal: $" + carritoDeCompras.subtotal + "<br />");
    const precioSinIva = carritoDeCompras.reduce((acumulador, carritoDeCompras) => {
        return acumulador + carritoDeCompras.subtotal;
    }, 0);
    const precioConIva = precioSinIva * iva;
    contenido.innerHTML = `<p>Por favor introduzca a continuación un correo electrónico para poder enviarte los productos.</p>
    <form id="formulario">
    <div class=buscador-container>
    <input id="buscador" placeholder="usuario@servidor.com" style='width:20em' type="email"></input>
    <button class="boton-buscar" type="submit">enviar</button>
    </div>
    </form>
    <button id="salida">volver</button>
    `
    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        email = e.target[0].value;
        if (email === "") {
            alerta.innerHTML = "Por favor llene los campos antes de continuar"
        } else {
            ENTREGABOLETA();
        };
    })

    function ENTREGABOLETA() {
        const fechaDeCompra = new Date();
        const dia = fechaDeCompra.toLocaleDateString();
        const hora = fechaDeCompra.toLocaleTimeString();
        contenido.innerHTML = "Su boleta de compra:<br />Factura tipo C consumidor final<br />Anabella Avena n°0001-000001<br />Fecha de compra: " + dia + "<br />hora: " + hora + "<br />Nombre: " + nombre + "<br />Apellido: " + apellido + "<br />email: " + email + "<br />Items comprados:<br />" + listadoCarrito + "<br />Total monto: $" + precioConIva.toFixed(2) + "-.<br />Muchas gracias por su compra!";
        carritoDeCompras.splice(0, carritoDeCompras.length);
        alerta.innerHTML = "Ha salido de la tienda, esperamos volver a verlo pronto."
    }
}

function EXITPROGRAM() {
    contenido.innerHTML = "";
    if (carritoDeCompras.length > 0) {
        contenido.innerHTML = `
        <p>Al parecer ha dejado cargado el carrito de compras.</p>
        <p>Desea revisarlo antes de salir?</p>
        <button id="si"class="opciones-menu">si</button>
        <button id="no"class="opciones-menu">no</button>
    `
        const si = document.getElementById("si");
        si.addEventListener("mouseup", (e) => {
            e.preventDefault;
            MENUCARRITO();
        });
        const no = document.getElementById("no");
        no.addEventListener("mouseup", (e) => {
            e.preventDefault;
            contenido.innerHTML = "Ha salido de la tienda, esperamos volver a verlo pronto.";
        });
    } else {
        contenido.innerHTML = "Ha salido de la tienda, esperamos volver a verlo pronto.";
    }
}