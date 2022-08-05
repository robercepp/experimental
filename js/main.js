/* Este proyecto es un módulo eCommerce para una pagina ya existente de una Ilustradora Gráfica. la idea es crear un catalogo de productos a vender, implementar un carrito de compras donde cargarlos, y añadir un modulo de pagos y encargos */

//Anabella Avena - Ilustradora Gráfica - módulo eCommerce.

//Constructor de Usuarios.
class Usuario {
    constructor(id, nombreDeUsuario, nombre, apellido, edad, email, contrasena, pregunta, respuesta) {
        this.id = id;
        this.nombreDeUsuario = nombreDeUsuario;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = parseFloat(edad);
        this.email = email;
        this.contrasena = contrasena;
        this.pregunta = pregunta;
        this.respuesta = respuesta;
    }
}

const usuarios = [];
let idcounter = 0;
let idtotal = idcounter;


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
let email = ""
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

//Modo obscuro switch
let modoobscuro = document.getElementById('switch-label')

modoobscuro.addEventListener('click', () => {
    document.documentElement.classList.toggle("dark-mode");
    document.querySelector(".invertir").classList.toggle("modo-obscuro")
});


//A partir de aquí comienza el menú...
BIENVENIDA();

function BIENVENIDA() {

    contenido.innerHTML = `
    <form id="formulario" class="menu-intro">
    <div class="elements">
    <input class="inputs" placeholder="nombre de usuario" type="text">
    </div>
    <div class="elements">
    <input class="inputs" placeholder="contraseña" type="password">
    </div>
    <div class="button-container">
    <button type="submit" class="button">Ingresar</button>
    </div>
    </form>
    <div class="elements-especial">
    <a id="crearCuenta" class= "pista" href="">crear una cuenta</a>
    <a id="recuperarCuenta" class= "pista" href="">olvidé mi contraseña</a>
    </div>
    `
    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        if (e.target[0].value === "" || e.target[1].value === "") {
            alerta.innerHTML = "Por favor llene los campos antes de continuar"
        } else {
            const chequearUsuario = obj => obj.nombreDeUsuario === e.target[0].value;
            if (usuarios.some(chequearUsuario) === false) {
                alerta.innerHTML = "el nombre de usuario no se encuentra o la contraseña es incorrecta."
            } else {
                const encontrado = usuarios.find((user) => {
                    return user.nombreDeUsuario === e.target[0].value;
                });
                if (encontrado.contrasena === e.target[1].value) {
                    nombre = encontrado.nombre;
                    apellido = encontrado.apellido;
                    email = encontrado.email;
                    bienvenido.innerHTML = "Bienvenido/a, " + nombre;
                    alerta.replaceChildren();
                    MENUPRINCIPAL(), 0;
                } else {
                    alerta.innerHTML = "el nombre de usuario no se encuentra o la contraseña es incorrecta."
                }
            }
        }
    });
    const crearCuenta = document.getElementById("crearCuenta");
    crearCuenta.addEventListener("click", (e) => {
        e.preventDefault();
        CREARUSUARIO();
    });
    const recuperarContrasena = document.getElementById("recuperarCuenta");
    recuperarContrasena.addEventListener("click", (e) => {
        e.preventDefault();
        RECUPERARUSUARIO();
    })
}

function RECUPERARUSUARIO() {
    titulo.innerHTML = "---Asistente de recuperación de Contraseña---";
    contenido.innerHTML = `
    <p class="elements"> Bienvenido al asistente de recuperación de contraseña </p>
    <p class="elements">le haremos algunas preguntas para verificar su identidad</p>
    <p class="pista">paso 1</p>
    <form id="formulario" class="menu-intro">
    <p class="pista">cuál es tu nombre de usuario?</p>
    <div class="elements">
    <input id="nombre-usuario" class="inputs" placeholder="nombre de usuario" type="text">
    </div>
    <div class="button-container">
    <button type="reset" value="reset" class="button">Limpiar</button>
    <button id="continuar" type="submit" class="button">Siguiente</button>
    </div>
    </form>
    <button id="salida">volver</button>
    `
    const volver = document.getElementById("salida");
    volver.addEventListener("mouseup", (e) => {
        e.preventDefault();
        alerta.innerHTML = "";
        BIENVENIDA();
    });
    const paso1 = document.getElementById("formulario");
    paso1.addEventListener("submit", (e) => {
        e.preventDefault();
        const chequearUsuario = obj => obj.nombreDeUsuario === e.target[0].value;
        if (usuarios.some(chequearUsuario) === false) {
            alerta.innerHTML = "No se encuentra al usuario"
        } else {
            const encontrado = usuarios.find((user) => {
                return user.nombreDeUsuario === e.target[0].value;
            });
            contenido.innerHTML = `
    <p class="elements">Su cuenta '${encontrado.nombreDeUsuario}' ha sido detectada</p>
    <form id="formulario2" class="menu-intro">
    <p class="pista">paso 2</p>
    <div class="elements">
    <p class="pista">cuál es tu correo electrónico</p>
    <input id="e-mail" class="inputs" placeholder="usuario@servidor.com" type="email">
    </div>
    <div class="elements">
    <p class="pista">cuantos años tenés?</p>
    <input id="edad" class="inputs" placeholder="tu edad" type="number">
    </div>
    <div class="button-container">
    <button type="reset" value="reset" class="button">Limpiar</button>
    <button id="continuar" type="submit" class="button">Siguiente</button>
    </div>
    </form>
    <button id="salida">volver</button>
    `
            const paso2 = document.getElementById("formulario2");
            paso2.addEventListener("submit", (e) => {
                e.preventDefault();
                if (encontrado.email == e.target[0].value) {
                    if (encontrado.edad === parseInt(e.target[1].value)) {

                        contenido.innerHTML = `
    <p class="elements">Una última pregunta. agradecemos su paciencia.</p>
    <form id="formulario3" class="menu-intro">
    <p class="pista">paso 3</p>
    <div class="elements">
    <p class="pista">${encontrado.pregunta}</p>
    <input id="pregunta" class="inputs" placeholder="su respuesta aquí" type="text">
    </div>
    <div class="button-container">
    <button type="reset" value="reset" class="button">Limpiar</button>
    <button id="continuar" type="submit" class="button">Siguiente</button>
    </div>
    </form>
    <button id="salida">volver</button>
    `
                        const paso3 = document.getElementById("formulario3");
                        paso3.addEventListener("submit", (e) => {
                            e.preventDefault();
                            if (encontrado.respuesta === e.target[0].value) {
                                contenido.innerHTML = `
    <p class="elements">Su contraseña es: "${encontrado.contrasena}"</p>
    <p class="elements">gracias por su paciencia.</p>
    <button id="salida">volver</button>
    `
                                const volver = document.getElementById("salida");
                                volver.addEventListener("mouseup", (e) => {
                                    e.preventDefault();
                                    alerta.innerHTML = "";
                                    BIENVENIDA();
                                });
                            } else {
                                alerta.innerHTML = "alerta: su respuesta no es correcta";
                            }
                        });
                    } else {
                        alerta.innerHTML = "alerta: la edad ingresada no es la correcta";
                    }
                } else {
                    alerta.innerHTML = "el email no coincide con el registrado en nuestra base de datos";
                }
            });
        }
    })
}

function CREARUSUARIO() {
    titulo.innerHTML = "---Creador de Cuenta---";
    contenido.innerHTML = `
<p class="elements"> En esta sección podrás crear tu cuenta! </p>
<p class="pista">por favor llena todos los campos a continuación</p>
<form id="formulario" class="menu-intro">
<div class="elements">
<input id="nombre-usuario" class="inputs" placeholder="Elige un nombre de usuario" type="text">
</div>
<div class="elements">
<input id="nombre" class="inputs" placeholder="tu nombre" type="text">
</div>
<div class="elements">
<input id="apellido" class="inputs" placeholder="tu apellido" type="text">
</div>
<div class="elements">
<p class="pista"> tu fecha de cumpleaños </p>
<input id="fecha-nac" class="inputs" placeholder="dd/mm/aaaa" type="date">
</div>
<div class="elements">
<input id="email-1" class="inputs" placeholder="tu e-mail" type="email">
<input id="email-2" class="inputs" placeholder="repite tu email" type="email">
</div>
<div class="elements">
<input id="contraseña-1" class="inputs" placeholder="contraseña" type="password">
<input id="contraseña-2" class="inputs" placeholder="repita contraseña" type="password">
</div>
<div class="elements center">
<p class="pista"> Ingrese una pregunta y una respuesta que le servirá para recuperar su contraseña.</p>
<input id="pregunta" class="inputs separador" placeholder="ej: nombre de mascota?" type="text">
<input id="respuesta" class="inputs separador" placeholder="respuesta" type="text">
</div>
<div class="button-container">
<button type="reset" value="reset" class="button">Limpiar</button>
<button id="crear-usuario" type="submit" class="button">Crear Usuario</button>
</div>
</form>
<button id="salida">volver</button>
`
    const volver = document.getElementById("salida");
    volver.addEventListener("mouseup", (e) => {
        e.preventDefault();
        alerta.innerHTML = "";
        BIENVENIDA();
    });
    const agregarUsuario = document.getElementById("formulario");
    agregarUsuario.addEventListener("submit", (e) => {
        e.preventDefault();
        const chequearUsuario = obj => obj.nombreDeUsuario === e.target[0].value;
        const años = parseInt(e.target[3].value);

        function calcularEdad(cumpleaños) {
            var edadDifMs = Date.now() - cumpleaños;
            var ageDate = new Date(edadDifMs);
            return Math.abs(ageDate.getUTCFullYear() - años);
        }

        if (e.target[0].value === "") {
            alerta.innerHTML = "debes escribir un nombre de usuario";
            document.querySelector("#nombre-usuario").classList.toggle("red-border");
        } else if (usuarios.some(chequearUsuario) === true || usuarios == []) {
            alerta.innerHTML = "Lo sentimos, el nombre de usuario ya está ocupado, por favor elija otro.";
            document.querySelector("#nombre-usuario").classList.toggle("red-border")
        } else if (e.target[1].value === "") {
            alerta.innerHTML = "debes escribir tu nombre";
            document.querySelector("#nombre").classList.toggle("red-border");
        } else if (e.target[2].value === "") {
            alerta.innerHTML = "debes escribir un apellido";
            document.querySelector("#apellido").classList.toggle("red-border");
        } else if (e.target[3].value === "") {
            alerta.innerHTML = "debes escribir tu fecha de nacimiento";
            document.querySelector("#fecha-nac").classList.toggle("red-border");
        } else if (e.target[4].value === "" || e.target[5].value === "") {
            alerta.innerHTML = "cuidado, debes escribir una email válido.";
            document.querySelector("#email-1").classList.toggle("red-border");
            document.querySelector("#email-2").classList.toggle("red-border");
        } else if (e.target[4].value !== e.target[5].value) {
            alerta.innerHTML = "los e-mails escritos no coinciden. por favor intente nuevamente.";
            document.querySelector("#email-1").classList.toggle("red-border");
            document.querySelector("#email-2").classList.toggle("red-border");
        } else if (e.target[6].value === "" || e.target[7].value === "") {
            alerta.innerHTML = "cuidado, debes escribir una contraseña ";
            document.querySelector("#contraseña-1").classList.toggle("red-border");
            document.querySelector("#contraseña-2").classList.toggle("red-border");
        } else if (e.target[6].value !== e.target[7].value) {
            alerta.innerHTML = "las contraseñas no coinciden, intentelo nuevamente.";
            document.querySelector("#contraseña-1").classList.toggle("red-border");
            document.querySelector("#contraseña-2").classList.toggle("red-border");
        } else if (e.target[8].value === "" || e.target[9].value === "") {
            alerta.innerHTML = "cuidado, debes escribir una pregunta y una respuesta de seguridad.";
            document.querySelector("#pregunta").classList.toggle("red-border");
            document.querySelector("#respuesta").classList.toggle("red-border");
        } else {
            idcounter = idcounter + 1
            const newUser = new Usuario(idcounter, e.target[0].value, e.target[1].value, e.target[2].value, calcularEdad(años), e.target[4].value, e.target[6].value, e.target[8].value, e.target[9].value);
            usuarios.push(newUser)
            document.querySelectorAll('#formulario input').forEach((input) => {
                input.value = '';
            });
            alerta.innerHTML = "Usuario creado satisfactoriamente";
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
                <div class="resultado-cabecera"> 
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
                                <div class="td-precio">$${(carritoDeCompras.precio*iva).toFixed(2)}</div>
                                <div class="td-cantidad">${carritoDeCompras.cantidad}</div>
                                <div class="td-subtotal">$${(carritoDeCompras.subtotal*iva).toFixed(2)}</div>
                                <div class="td-form"> <form id="quitar-${numeracion}">
                                <input style='width:2em' type="number" min="1">
                                <button class="boton-contextual">quitar</button>
                                </form>
                                `;
        eliminar(numeracion);
    }, carritoDeCompras);

    function eliminar(numero) {
        const quitar = document.querySelector("#quitar-" + numero);
        quitar.addEventListener("submit", (e) => {
            e.preventDefault();
            cantidades = parseInt(e.target[0].value);
            if (carritoDeCompras[(numero - 1)].cantidad >= cantidades) {
                carritoDeCompras[(numero - 1)].cantidad = carritoDeCompras[(numero - 1)].cantidad - cantidades;
                carritoDeCompras[(numero - 1)].subtotal = carritoDeCompras[(numero - 1)].subtotal - (carritoDeCompras[(numero - 1)].precio * cantidades);
                catalogoDeBusqueda[carritoDeCompras[(numero - 1)].id].stock = catalogoDeBusqueda[carritoDeCompras[(numero - 1)].id].stock + cantidades;
                alerta.innerHTML = cantidades + "x " + carritoDeCompras[(numero - 1)].nombre + " ha sido eliminado del carrito de compras.";
                if (carritoDeCompras[(numero - 1)].cantidad === 0) {
                    const borrar = document.querySelector("#item-" + numero);
                    borrar.remove();
                    let borrado = carritoDeCompras.splice(numero - 1, 1);
                }
                MENUCARRITO();
            } else if (e.target[0].value === "") {
                alerta.innerHTML = "debes ingresar una cantidad para quitar";
            } else {
                alerta.innerHTML = "cuidado, no puedes quitar mas items de los que has agregado";
            }
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
                    ENTREGABOLETA();
                } else if (pago > precioConIva) {
                    let vuelto = pago - precioConIva.toFixed(2);
                    alerta.innerHTML = "Al parecer nos has enviado mas dinero del que era necesario, por ello te reenviamos $" + vuelto.toFixed(2) + " como vuelto por tu compra.";
                    ENTREGABOLETA();
                } else if (pago < precioConIva && pago > 0) {
                    let pagoInsuficiente = precioConIva.toFixed(2) - pago;
                    alerta.innerHTML = "Vaya!, al parecer has pagado $" + pago + ". Lamentablemente te faltan $" + pagoInsuficiente.toFixed(2) + " para completar los $" + precioConIva.toFixed(2) + " que se necesitan.</ br>Te devolvemos el dinero, Volvamos a completar la transacción.";
                }
            });
        }
    });
}

function ENTREGABOLETA() {
    const listadoCarrito = carritoDeCompras.map((carritoDeCompras) => "-" + carritoDeCompras.cantidad + "x " + carritoDeCompras.nombre + "<br />Subtotal: $" + carritoDeCompras.subtotal * iva + "<br />");
    const precioSinIva = carritoDeCompras.reduce((acumulador, carritoDeCompras) => {
        return acumulador + carritoDeCompras.subtotal;
    }, 0);
    const precioConIva = precioSinIva * iva;
    const fechaDeCompra = new Date();
    const dia = fechaDeCompra.toLocaleDateString();
    const hora = fechaDeCompra.toLocaleTimeString();
    contenido.innerHTML = "Su boleta de compra:<br />Factura tipo C consumidor final<br />Anabella Avena n°0001-000001<br />Fecha de compra: " + dia + "<br />hora: " + hora + "<br />Nombre: " + nombre + "<br />Apellido: " + apellido + "<br />email: " + email + "<br />Items comprados:<br />" + listadoCarrito + "<br />Total monto: $" + precioConIva.toFixed(2) + "-.<br />Muchas gracias por su compra!";
    carritoDeCompras.splice(0, carritoDeCompras.length);
    alerta.innerHTML += "</ br> Ha salido de la tienda, esperamos volver a verlo pronto."
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