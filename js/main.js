/* ============================================
   SONIDO VIVO - main.js
   Lógica principal: productos, carrito,
   regiones/comunas y menú móvil
   ============================================ */

/* --------------------------------------------------
   1. ARREGLO DE PRODUCTOS (datos de prueba)
   Cada producto es un objeto con sus propiedades
   -------------------------------------------------- */
const productos = [
  {
    id: 1,
    codigo: "GA001",
    nombre: "Guitarra Acústica Folk",
    marca: "Yamaha",
    modelo: "F310",
    precio: 129990,
    categoria: "Guitarras Acústicas",
    stock: 8,
    stockCritico: 2,
    imagen: "img/yamaha-f310.png",
    descripcion: "Tapa de abeto, aros y fondo de meranti. Ideal para iniciantes."
  },
  {
    id: 2,
    codigo: "GA002",
    nombre: "Guitarra Acústica Dreadnought",
    marca: "Fender",
    modelo: "CD-60S",
    precio: 189990,
    categoria: "Guitarras Acústicas",
    stock: 5,
    stockCritico: 1,
    imagen: "img/fender-cd-60s.png",
    descripcion: "Tapa de abeto macizo, brazo de caoba. Sonido cálido y proyectado."
  },
  {
    id: 3,
    codigo: "GA003",
    nombre: "Guitarra Acústica Clásica 4/4",
    marca: "Yamaha",
    modelo: "C40",
    precio: 89990,
    categoria: "Guitarras Acústicas",
    stock: 10,
    stockCritico: 2,
    imagen: "img/yamaha-c40.png",
    descripcion: "Nailon, tapa de abeto. Ideal para estudio y flamenco."
  },
  {
    id: 4,
    codigo: "GA004",
    nombre: "Guitarra Electroacústica",
    marca: "Takamine",
    modelo: "GN20CE",
    precio: 349990,
    categoria: "Guitarras Acústicas",
    stock: 3,
    stockCritico: 1,
    imagen: "img/takamine-gn20ce.png",
    descripcion: "Pickup integrado, afinador incorporado."
  },
  {
    id: 5,
    codigo: "GA005",
    nombre: "Guitarra 3/4 Niños",
    marca: "Yamaha",
    modelo: "JR1",
    precio: 79990,
    categoria: "Guitarras Acústicas",
    stock: 6,
    stockCritico: 1,
    imagen: "img/yamaha-jr1.png",
    descripcion: "Tamaño reducido para niños de 6 a 10 años."
  },
  {
    id: 6,
    codigo: "GE001",
    nombre: "Guitarra Eléctrica Stratocaster",
    marca: "Squier",
    modelo: "Affinity Strat",
    precio: 249990,
    categoria: "Guitarras Eléctricas",
    stock: 5,
    stockCritico: 1,
    imagen: "img/squier-affinity-strat.png",
    descripcion: "Cuerpo de álamo, mástil de arce, pastillas SSS."
  },
  {
    id: 7,
    codigo: "GE002",
    nombre: "Guitarra Eléctrica Les Paul",
    marca: "Epiphone",
    modelo: "Les Paul Std",
    precio: 329990,
    categoria: "Guitarras Eléctricas",
    stock: 4,
    stockCritico: 1,
    imagen: "img/epiphone-les-paul-std.png",
    descripcion: "Cuerpo caoba, tapa arce, pastillas humbucker."
  },
  {
    id: 8,
    codigo: "GE003",
    nombre: "Guitarra Eléctrica SG",
    marca: "Epiphone",
    modelo: "SG Standard",
    precio: 319990,
    categoria: "Guitarras Eléctricas",
    stock: 3,
    stockCritico: 1,
    imagen: "img/epiphone-sg-standard.png",
    descripcion: "Cuerpo caoba, mástil caoba, 2 humbuckers."
  },
  {
    id: 9,
    codigo: "GE004",
    nombre: "Guitarra Eléctrica Telecaster",
    marca: "Squier",
    modelo: "Affinity Tele",
    precio: 239990,
    categoria: "Guitarras Eléctricas",
    stock: 4,
    stockCritico: 1,
    imagen: "img/squier-affinity-tele.png",
    descripcion: "Cuerpo álamo, clavijero vintage, 2 pastillas single."
  },
  {
    id: 10,
    codigo: "GE005",
    nombre: "Guitarra Eléctrica Semi-hollow",
    marca: "Epiphone",
    modelo: "ES-335",
    precio: 549990,
    categoria: "Guitarras Eléctricas",
    stock: 2,
    stockCritico: 1,
    imagen: "img/epiphone-es-335.png",
    descripcion: "Semi-hueca, 2 humbuckers, ideal para jazz y blues."
  },
  {
    id: 11,
    codigo: "BA001",
    nombre: "Bajo Eléctrico 4 Cuerdas",
    marca: "Squier",
    modelo: "Affinity PJ",
    precio: 299990,
    categoria: "Bajos Eléctricos",
    stock: 5,
    stockCritico: 1,
    imagen: "img/squier-affinity-pj.png",
    descripcion: "Pickup PJ, cuerpo álamo, mástil arce."
  },
  {
    id: 12,
    codigo: "BA002",
    nombre: "Bajo Eléctrico Jazz Bass",
    marca: "Fender",
    modelo: "Player Jazz",
    precio: 699990,
    categoria: "Bajos Eléctricos",
    stock: 2,
    stockCritico: 1,
    imagen: "img/fender-player-jazz.png",
    descripcion: "Alder body, 2 Alnico V Jazz single-coil."
  },
  {
    id: 13,
    codigo: "BA003",
    nombre: "Bajo Acústico 4 Cuerdas",
    marca: "Yamaha",
    modelo: "APX700II",
    precio: 429990,
    categoria: "Bajos Eléctricos",
    stock: 2,
    stockCritico: 1,
    imagen: "img/yamaha-apx700ii.png",
    descripcion: "Electroacústico, afinador incorporado."
  },
  {
    id: 14,
    codigo: "BT001",
    nombre: "Batería Acústica 5 piezas",
    marca: "Pearl",
    modelo: "Roadshow",
    precio: 599990,
    categoria: "Baterías",
    stock: 2,
    stockCritico: 1,
    imagen: "img/pearl-roadshow.png",
    descripcion: "Incluye stands, platillos y pedal de bombo."
  },
  {
    id: 15,
    codigo: "BT002",
    nombre: "Batería Electrónica 8 pads",
    marca: "Roland",
    modelo: "TD-02KV",
    precio: 799990,
    categoria: "Baterías",
    stock: 2,
    stockCritico: 1,
    imagen: "img/roland-td-02kv.png",
    descripcion: "Módulo TD-02, 8 pads de goma, pedal hi-hat."
  },
  {
    id: 16,
    codigo: "BT003",
    nombre: "Caja Snare 14",
    marca: "Pearl",
    modelo: "STE1450",
    precio: 89990,
    categoria: "Baterías",
    stock: 4,
    stockCritico: 1,
    imagen: "img/pearl-ste1450.png",
    descripcion: "Acero, 14x5, 10 tensores."
  },
  {
    id: 17,
    codigo: "BT004",
    nombre: "Platillo Hi-Hat 14",
    marca: "Zildjian",
    modelo: "A Series",
    precio: 149990,
    categoria: "Baterías",
    stock: 3,
    stockCritico: 1,
    imagen: "img/zildjian-a-series-hihat.png",
    descripcion: "Latón B20, sonido brillante y claro."
  },
  {
    id: 18,
    codigo: "BT005",
    nombre: "Platillo Crash 16",
    marca: "Zildjian",
    modelo: "A Series",
    precio: 129990,
    categoria: "Baterías",
    stock: 3,
    stockCritico: 1,
    imagen: "img/zildjian-a-series-crash.png",
    descripcion: "Latón B20, ataque rápido."
  },
  {
    id: 19,
    codigo: "TC001",
    nombre: "Teclado Digital 61 teclas",
    marca: "Yamaha",
    modelo: "PSR-E373",
    precio: 249990,
    categoria: "Teclados y Pianos",
    stock: 4,
    stockCritico: 1,
    imagen: "img/yamaha-psr-e373.png",
    descripcion: "61 teclas sensibles al tacto, 622 voces."
  },
  {
    id: 20,
    codigo: "TC002",
    nombre: "Piano Digital 88 teclas",
    marca: "Yamaha",
    modelo: "P-45",
    precio: 499990,
    categoria: "Teclados y Pianos",
    stock: 2,
    stockCritico: 1,
    imagen: "img/yamaha-p-45.png",
    descripcion: "88 teclas pesadas, 10 voces, pedal sustain incluido."
  },
  {
    id: 21,
    codigo: "TC003",
    nombre: "Sintetizador 49 teclas",
    marca: "Arturia",
    modelo: "MiniLab MKII",
    precio: 129990,
    categoria: "Teclados y Pianos",
    stock: 5,
    stockCritico: 1,
    imagen: "img/arturia-minilab-mkii.png",
    descripcion: "MIDI controller, 49 mini teclas."
  },
  {
    id: 22,
    codigo: "TC004",
    nombre: "Teclado MIDI 88 teclas",
    marca: "M-Audio",
    modelo: "Hammer 88",
    precio: 399990,
    categoria: "Teclados y Pianos",
    stock: 2,
    stockCritico: 1,
    imagen: "img/m-audio-hammer-88.png",
    descripcion: "88 teclas martillo, sin sonidos propios."
  },
  {
    id: 23,
    codigo: "AM001",
    nombre: "Amplificador Guitarra 15W",
    marca: "Fender",
    modelo: "Frontman 15G",
    precio: 99990,
    categoria: "Amplificadores",
    stock: 5,
    stockCritico: 1,
    imagen: "img/fender-frontman-15g.png",
    descripcion: "15W, distorsión incorporada, entrada auxiliar."
  },
  {
    id: 24,
    codigo: "AM002",
    nombre: "Amplificador Guitarra 40W",
    marca: "Marshall",
    modelo: "MG40GFX",
    precio: 299990,
    categoria: "Amplificadores",
    stock: 3,
    stockCritico: 1,
    imagen: "img/marshall-mg40gfx.png",
    descripcion: "40W, 4 canales, efectos digitales integrados."
  },
  {
    id: 25,
    codigo: "AM003",
    nombre: "Amplificador Bajo 100W",
    marca: "Hartke",
    modelo: "HD100",
    precio: 449990,
    categoria: "Amplificadores",
    stock: 2,
    stockCritico: 1,
    imagen: "img/hartke-hd100.png",
    descripcion: "100W, tweeter integrado, ecualizador de 4 bandas."
  },
  {
    id: 26,
    codigo: "AM004",
    nombre: "Amplificador Acústico 40W",
    marca: "Fishman",
    modelo: "Loudbox Mini",
    precio: 499990,
    categoria: "Amplificadores",
    stock: 2,
    stockCritico: 1,
    imagen: "img/fishman-loudbox-mini.png",
    descripcion: "60W, 2 canales, reverb y chorus incorporados."
  },
  {
    id: 27,
    codigo: "MI001",
    nombre: "Micrófono Dinámico Cardioide",
    marca: "Shure",
    modelo: "SM58",
    precio: 149990,
    categoria: "Micrófonos",
    stock: 8,
    stockCritico: 2,
    imagen: "img/shure-sm58.png",
    descripcion: "Estándar industria para voz en vivo."
  },
  {
    id: 28,
    codigo: "MI002",
    nombre: "Micrófono Dinámico Instrumento",
    marca: "Shure",
    modelo: "SM57",
    precio: 139990,
    categoria: "Micrófonos",
    stock: 6,
    stockCritico: 1,
    imagen: "img/shure-sm57.png",
    descripcion: "Ideal para captura de instrumentos y amplificadores."
  },
  {
    id: 29,
    codigo: "MI003",
    nombre: "Micrófono Condensador",
    marca: "Audio-Tech.",
    modelo: "AT2020",
    precio: 199990,
    categoria: "Micrófonos",
    stock: 4,
    stockCritico: 1,
    imagen: "img/audio-tech-at2020.png",
    descripcion: "Cardioide, XLR, ideal para grabación en estudio."
  },
  {
    id: 30,
    codigo: "MI004",
    nombre: "Micrófono USB de Condensador",
    marca: "Blue",
    modelo: "Yeti",
    precio: 299990,
    categoria: "Micrófonos",
    stock: 5,
    stockCritico: 1,
    imagen: "img/blue-yeti.png",
    descripcion: "USB, 4 patrones polares, ideal para streaming y podcast."
  },
  {
    id: 31,
    codigo: "PE001",
    nombre: "Pedal Distorsión",
    marca: "Boss",
    modelo: "DS-1",
    precio: 79990,
    categoria: "Pedales de Efectos",
    stock: 7,
    stockCritico: 1,
    imagen: "img/boss-ds-1.png",
    descripcion: "Clásico pedal de distorsión, 3 controles."
  },
  {
    id: 32,
    codigo: "PE002",
    nombre: "Pedal Reverb",
    marca: "Boss",
    modelo: "RV-6",
    precio: 179990,
    categoria: "Pedales de Efectos",
    stock: 4,
    stockCritico: 1,
    imagen: "img/boss-rv-6.png",
    descripcion: "8 modos de reverb, control de shimmer."
  },
  {
    id: 33,
    codigo: "PE003",
    nombre: "Pedal Multi-efectos",
    marca: "Boss",
    modelo: "ME-80",
    precio: 349990,
    categoria: "Pedales de Efectos",
    stock: 2,
    stockCritico: 1,
    imagen: "img/boss-me-80.png",
    descripcion: "Diseño tipo pedalboard, 8 efectos simultáneos."
  },
  {
    id: 34,
    codigo: "PE004",
    nombre: "Pedal Tuner Cromático",
    marca: "Boss",
    modelo: "TU-3",
    precio: 89990,
    categoria: "Pedales de Efectos",
    stock: 8,
    stockCritico: 2,
    imagen: "img/boss-tu-3.png",
    descripcion: "Afinador cromático, indicador de tono."
  },
  {
    id: 35,
    codigo: "PE005",
    nombre: "Pedal Delay",
    marca: "MXR",
    modelo: "Carbon Copy",
    precio: 179990,
    categoria: "Pedales de Efectos",
    stock: 4,
    stockCritico: 1,
    imagen: "img/mxr-carbon-copy.png",
    descripcion: "Delay analógico cálido, tiempo 600ms."
  },
  {
    id: 36,
    codigo: "PE006",
    nombre: "Pedal Overdrive",
    marca: "Ibanez",
    modelo: "TS9",
    precio: 99990,
    categoria: "Pedales de Efectos",
    stock: 6,
    stockCritico: 1,
    imagen: "img/ibanez-ts9.png",
    descripcion: "Tube Screamer clásico, sonido suave y orgánico."
  },
  {
    id: 37,
    codigo: "AC001",
    nombre: "Cuerdas Guitarra Eléctrica 09-42",
    marca: "Ernie Ball",
    modelo: "Super Slinky",
    precio: 8990,
    categoria: "Accesorios",
    stock: 25,
    stockCritico: 6,
    imagen: "img/ernie-ball-super-slinky.png",
    descripcion: "Juego 6 cuerdas, calibre ligero."
  },
  {
    id: 38,
    codigo: "AC002",
    nombre: "Cuerdas Guitarra Acústica 12-53",
    marca: "Ernie Ball",
    modelo: "Earthwood",
    precio: 10990,
    categoria: "Accesorios",
    stock: 20,
    stockCritico: 5,
    imagen: "img/ernie-ball-earthwood.png",
    descripcion: "Bronce fósforo, sonido cálido."
  },
  {
    id: 39,
    codigo: "AC003",
    nombre: "Cuerdas Bajo 45-105",
    marca: "Ernie Ball",
    modelo: "Regular Slinky",
    precio: 14990,
    categoria: "Accesorios",
    stock: 12,
    stockCritico: 3,
    imagen: "img/ernie-ball-regular-slinky.png",
    descripcion: "Cuerdas de níquel enrollado, set 4 cuerdas."
  },
  {
    id: 40,
    codigo: "AC004",
    nombre: "Púas de Guitarra x10 (0.73mm)",
    marca: "Fender",
    modelo: "351",
    precio: 3990,
    categoria: "Accesorios",
    stock: 50,
    stockCritico: 12,
    imagen: "img/fender-351.png",
    descripcion: "Celulosa, grosor medio."
  },
  {
    id: 41,
    codigo: "AC005",
    nombre: "Capotraste Guitarra",
    marca: "Dunlop",
    modelo: "Trigger",
    precio: 12990,
    categoria: "Accesorios",
    stock: 15,
    stockCritico: 3,
    imagen: "img/dunlop-trigger.png",
    descripcion: "Capotraste de resorte, compatible 6 cuerdas."
  },
  {
    id: 42,
    codigo: "AC006",
    nombre: "Afinador de Clip",
    marca: "Snark",
    modelo: "SN-5",
    precio: 8990,
    categoria: "Accesorios",
    stock: 20,
    stockCritico: 5,
    imagen: "img/snark-sn-5.png",
    descripcion: "Afinador cromático de clip, pantalla giratoria."
  },
  {
    id: 43,
    codigo: "AC007",
    nombre: "Cable Instrumento 3m",
    marca: "Monster",
    modelo: "S100-I-3",
    precio: 12990,
    categoria: "Accesorios",
    stock: 15,
    stockCritico: 3,
    imagen: "img/monster-s100-l-3.png",
    descripcion: "Cable trenzado, conectores dorados, 3 metros."
  },
  {
    id: 44,
    codigo: "AC008",
    nombre: "Cable Instrumento 6m",
    marca: "Monster",
    modelo: "S100-I-6",
    precio: 17990,
    categoria: "Accesorios",
    stock: 10,
    stockCritico: 2,
    imagen: "img/monster-s100-l-6.png",
    descripcion: "Cable trenzado, conectores dorados, 6 metros."
  },
  {
    id: 45,
    codigo: "AC009",
    nombre: "Soporte Guitarra de Piso",
    marca: "Hercules",
    modelo: "GS302B",
    precio: 22990,
    categoria: "Accesorios",
    stock: 12,
    stockCritico: 3,
    imagen: "img/hercules-GS302B.png",
    descripcion: "Soporte plegable con enganche automático."
  },
  {
    id: 46,
    codigo: "AC010",
    nombre: "Soporte Guitarra de Pared",
    marca: "Hercules",
    modelo: "WAH-202",
    precio: 18990,
    categoria: "Accesorios",
    stock: 10,
    stockCritico: 2,
    imagen: "img/hercules-WAH-202.png",
    descripcion: "Montaje a pared, enganche automático."
  },
  {
    id: 47,
    codigo: "ES001",
    nombre: "Interfaz de Audio 2x2 USB",
    marca: "Focusrite",
    modelo: "Scarlett Solo",
    precio: 149990,
    categoria: "Estudio y Grabación",
    stock: 4,
    stockCritico: 1,
    imagen: "img/focusrite-scarlett-solo.png",
    descripcion: "1 entrada XLR+instrumento, 2 salidas, 24bit/192kHz."
  },
  {
    id: 48,
    codigo: "ES002",
    nombre: "Auriculares de Estudio",
    marca: "Audio-Tech.",
    modelo: "ATH-M20x",
    precio: 79990,
    categoria: "Estudio y Grabación",
    stock: 6,
    stockCritico: 1,
    imagen: "img/audio-tech-ATH-M20x.png",
    descripcion: "Circumaurales, respuesta 15Hz-20kHz."
  },
  {
    id: 49,
    codigo: "ES003",
    nombre: "Auriculares de Estudio Pro",
    marca: "Audio-Tech.",
    modelo: "ATH-M50x",
    precio: 219990,
    categoria: "Estudio y Grabación",
    stock: 4,
    stockCritico: 1,
    imagen: "img/audio-tech-ATH-M50x.png",
    descripcion: "Referencia de industria, sonido neutro y detallado."
  },
  {
    id: 50,
    codigo: "ES004",
    nombre: "Monitor de Estudio 5",
    marca: "Yamaha",
    modelo: "HS5",
    precio: 349990,
    categoria: "Estudio y Grabación",
    stock: 2,
    stockCritico: 1,
    imagen: "img/yamaha-HS5.png",
    descripcion: "Altavoz activo, respuesta plana, ideal mezcla."
  },
  {
    id: 51,
    codigo: "ES005",
    nombre: "Pop Filter para Micrófono",
    marca: "Sennheiser",
    modelo: "MZP 40",
    precio: 14990,
    categoria: "Estudio y Grabación",
    stock: 8,
    stockCritico: 2,
    imagen: "img/sennheiser-mzp-40.png",
    descripcion: "Doble malla, brazo flexible con clip."
  }
];

/* --------------------------------------------------
   2. ARREGLO DE REGIONES Y COMUNAS (Chile)
   Nos enfocamos en Valparaíso y Metropolitana
   -------------------------------------------------- */
const regionesChile = [
  {
    nombre: "Región de Valparaíso",
    comunas: [
      "Valparaíso",
      "Viña del Mar",
      "Quilpué",
      "Villa Alemana",
      "Concón",
      "Quillota",
      "San Antonio",
      "Limache",
      "Olmué",
      "Casablanca"
    ]
  },
  {
    nombre: "Región Metropolitana",
    comunas: [
      "Santiago",
      "Providencia",
      "Las Condes",
      "Ñuñoa",
      "Maipú",
      "La Florida",
      "Puente Alto",
      "San Miguel",
      "La Reina",
      "Vitacura",
      "Estación Central",
      "Recoleta"
    ]
  }
];

/* --------------------------------------------------
   3. FUNCIONES DEL CARRITO (LocalStorage)
   El carrito se guarda como texto JSON en el navegador
   -------------------------------------------------- */

/** Lee el carrito desde localStorage y lo convierte a arreglo */
function obtenerCarrito() {
  const datos = localStorage.getItem("carritoSonidoVivo");
  // Si no hay nada guardado, devolvemos un arreglo vacío
  if (!datos) {
    return [];
  }
  return JSON.parse(datos);
}

/** Guarda el arreglo del carrito en localStorage */
function guardarCarrito(carrito) {
  localStorage.setItem("carritoSonidoVivo", JSON.stringify(carrito));
}

/** Agrega un producto al carrito por su id */
function agregarAlCarrito(idProducto) {
  const carrito = obtenerCarrito();
  // Buscamos el producto en nuestro arreglo
  const producto = productos.find(function (p) {
    return p.id === idProducto;
  });

  if (!producto) {
    alert("Producto no encontrado.");
    return;
  }

  // Revisamos si ya está en el carrito
  const itemExistente = carrito.find(function (item) {
    return item.id === idProducto;
  });

  if (itemExistente) {
    // Si ya existe, aumentamos la cantidad
    itemExistente.cantidad = itemExistente.cantidad + 1;
  } else {
    // Si no existe, lo agregamos con cantidad 1
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1
    });
  }

  guardarCarrito(carrito);
  alert('"' + producto.nombre + '" agregado al carrito.');
  actualizarContadorCarrito();
}

/** Elimina un producto del carrito por su id */
function eliminarDelCarrito(idProducto) {
  let carrito = obtenerCarrito();
  // Filtramos: dejamos solo los que NO tienen ese id
  carrito = carrito.filter(function (item) {
    return item.id !== idProducto;
  });
  guardarCarrito(carrito);
  // Volvemos a dibujar la tabla del carrito
  renderizarCarrito();
  actualizarContadorCarrito();
}

/** Calcula el total sumando precio * cantidad de cada ítem */
function calcularTotalCarrito() {
  const carrito = obtenerCarrito();
  let total = 0;
  carrito.forEach(function (item) {
    total = total + item.precio * item.cantidad;
  });
  return total;
}

/** Formatea un número como pesos chilenos: $189.990 */
function formatearPrecio(numero) {
  return "$" + numero.toLocaleString("es-CL");
}

/** Actualiza el número de ítems en el menú (si existe el elemento) */
function actualizarContadorCarrito() {
  const contador = document.getElementById("contador-carrito");
  if (!contador) {
    return;
  }
  const carrito = obtenerCarrito();
  let totalItems = 0;
  carrito.forEach(function (item) {
    totalItems = totalItems + item.cantidad;
  });
  contador.textContent = totalItems;
}

/* --------------------------------------------------
   4. RENDERIZAR CATÁLOGO
   Inyecta las tarjetas de productos en el HTML
   -------------------------------------------------- */
function renderizarCatalogo() {
  const contenedor = document.getElementById("lista-productos");
  if (!contenedor) {
    return; // No estamos en catalogo.html
  }

  let html = "";
  productos.forEach(function (producto) {
    html += `
      <article class="tarjeta-producto">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="info">
          <p class="categoria">${producto.categoria}</p>
          <h3>${producto.nombre}</h3>
          <p class="precio">${formatearPrecio(producto.precio)}</p>
          <div class="acciones">
            <a href="detalle-producto.html?id=${producto.id}" class="btn btn-secundario btn-pequeno">Ver detalle</a>
            <button class="btn btn-primario btn-pequeno" onclick="agregarAlCarrito(${producto.id})">Agregar</button>
          </div>
        </div>
      </article>
    `;
  });

  contenedor.innerHTML = html;
}

/* --------------------------------------------------
   5. RENDERIZAR PRODUCTOS DESTACADOS (index)
   Muestra solo los primeros 4 productos
   -------------------------------------------------- */
function renderizarDestacados() {
  const contenedor = document.getElementById("productos-destacados");
  if (!contenedor) {
    return;
  }

  // Un producto de distintos rubros para la portada
  const codigosDestacados = ["GA001", "GE001", "BT001", "TC002"];
  const destacados = codigosDestacados
    .map(function (codigo) {
      return productos.find(function (p) {
        return p.codigo === codigo;
      });
    })
    .filter(function (p) {
      return p;
    });
  let html = "";

  destacados.forEach(function (producto) {
    html += `
      <article class="tarjeta-producto">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="info">
          <p class="categoria">${producto.categoria}</p>
          <h3>${producto.nombre}</h3>
          <p class="precio">${formatearPrecio(producto.precio)}</p>
          <div class="acciones">
            <a href="detalle-producto.html?id=${producto.id}" class="btn btn-secundario btn-pequeno">Ver detalle</a>
            <button class="btn btn-primario btn-pequeno" onclick="agregarAlCarrito(${producto.id})">Agregar</button>
          </div>
        </div>
      </article>
    `;
  });

  contenedor.innerHTML = html;
}

/* --------------------------------------------------
   6. RENDERIZAR DETALLE DE PRODUCTO
   Lee el "?id=" de la URL y muestra ese producto
   -------------------------------------------------- */
function renderizarDetalleProducto() {
  const contenedor = document.getElementById("detalle-producto");
  if (!contenedor) {
    return;
  }

  // Obtenemos el id desde la URL: detalle-producto.html?id=3
  const parametros = new URLSearchParams(window.location.search);
  const id = parseInt(parametros.get("id"));

  const producto = productos.find(function (p) {
    return p.id === id;
  });

  if (!producto) {
    contenedor.innerHTML = "<p>Producto no encontrado. <a href='catalogo.html'>Volver al catálogo</a></p>";
    return;
  }

  contenedor.innerHTML = `
    <div>
      <img src="${producto.imagen}" alt="${producto.nombre}">
    </div>
    <div class="detalle-info">
      <p class="categoria">${producto.categoria}</p>
      <h2>${producto.nombre}</h2>
      <p><strong>${producto.marca}</strong> · ${producto.modelo}</p>
      <p class="precio">${formatearPrecio(producto.precio)}</p>
      <p>${producto.descripcion}</p>
      <div class="acciones mt-1">
        <button class="btn btn-primario" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        <a href="catalogo.html" class="btn btn-secundario">Volver al catálogo</a>
      </div>
    </div>
  `;
}

/* --------------------------------------------------
   7. RENDERIZAR CARRITO
   Dibuja la tabla con los ítems guardados
   -------------------------------------------------- */
function renderizarCarrito() {
  const contenedor = document.getElementById("contenido-carrito");
  if (!contenedor) {
    return;
  }

  const carrito = obtenerCarrito();

  // Si el carrito esta vacio se muestra un mensaje
  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <div class="carrito-vacio">
        <p>Tu carrito está vacío.</p>
        <a href="catalogo.html" class="btn btn-primario mt-1">Ir al catálogo</a>
      </div>
    `;
    return;
  }

  let html = `
    <table class="tabla-carrito">
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Subtotal</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
  `;

  carrito.forEach(function (item) {
    const subtotal = item.precio * item.cantidad;
    html += `
      <tr>
        <td><img src="${item.imagen}" alt="${item.nombre}"></td>
        <td>${item.nombre}</td>
        <td>${formatearPrecio(item.precio)}</td>
        <td>${item.cantidad}</td>
        <td>${formatearPrecio(subtotal)}</td>
        <td>
          <button class="btn btn-peligro btn-pequeno" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        </td>
      </tr>
    `;
  });

  html += `
      </tbody>
    </table>
    <p class="total-carrito">Total: ${formatearPrecio(calcularTotalCarrito())}</p>
    <a href="catalogo.html" class="btn btn-secundario">Seguir comprando</a>
  `;

  contenedor.innerHTML = html;
}

/* --------------------------------------------------
   8. REGIONES Y COMUNAS (selects dinamicos)
   Cuando cambia la region, se llenan las comunas
   -------------------------------------------------- */
function inicializarRegiones() {
  const selectRegion = document.getElementById("region");
  const selectComuna = document.getElementById("comuna");

  // Si no existen estos selects, salimos
  if (!selectRegion || !selectComuna) {
    return;
  }

  // Llenamos el select de regiones
  selectRegion.innerHTML = '<option value="">Seleccione una region</option>';
  regionesChile.forEach(function (region) {
    selectRegion.innerHTML += `<option value="${region.nombre}">${region.nombre}</option>`;
  });

  // Comuna vacía al inicio
  selectComuna.innerHTML = '<option value="">Seleccione una comuna</option>';

  // Cuando el usuario cambia la region...
  selectRegion.addEventListener("change", function () {
    const regionElegida = selectRegion.value;
    selectComuna.innerHTML = '<option value="">Seleccione una comuna</option>';

    // Buscamos la region en el arreglo
    const region = regionesChile.find(function (r) {
      return r.nombre === regionElegida;
    });

    if (region) {
      region.comunas.forEach(function (comuna) {
        selectComuna.innerHTML += `<option value="${comuna}">${comuna}</option>`;
      });
    }
  });
}

/* --------------------------------------------------
   9. MENU (movil)
   -------------------------------------------------- */
function inicializarMenuMovil() {
  const btnMenu = document.getElementById("btn-menu");
  const nav = document.getElementById("nav-principal");

  if (!btnMenu || !nav) {
    return;
  }

  btnMenu.addEventListener("click", function () {
    nav.classList.toggle("abierto");
  });
}

/* --------------------------------------------------
   10. DETALLE DE NOVEDAD
   Lee el ?id= de la URL
   -------------------------------------------------- */
const novedades = [
  {
    id: 1,
    titulo: "Cómo cuidar tu guitarra en invierno",
    fecha: "15 de agosto de 2026",
    imagen: "img/cuidadoguitarra.jpg",
    resumen: "Consejos prácticos para mantener tu guitarra en buen estado durante los meses fríos en Viña del Mar.",
    contenido: `
      <p>El invierno en la costa de Valparaíso trae humedad y cambios de temperatura que pueden afectar tus instrumentos de cuerda.</p>
      <p>Te recomendamos: guardar la guitarra en su estuche, usar un humidificador de estuche, aflojar ligeramente las cuerdas si no la usarás por semanas, y limpiar el diapasón con un paño seco después de cada uso.</p>
      <p>En Sonido Vivo ofrecemos servicio de mantenimiento y ajuste. ¡Visítanos en Viña del Mar!</p>
    `
  },
  {
    id: 2,
    titulo: "Novedades en teclados digitales 2026",
    fecha: "28 de agosto de 2026",
    imagen: "img/tecladosdigitales.jpg",
    resumen: "Conoce los nuevos modelos de teclados y pianos digitales que llegaron a nuestra tienda este mes.",
    contenido: `
      <p>Este mes recibimos una nueva partida de teclados Casio y pianos digitales Yamaha, ideales tanto para estudiantes como para músicos profesionales.</p>
      <p>Destacan el Casio CT-X700 con su motor de sonido AiX y el Yamaha P-45, un clásico para quienes buscan la sensación de un piano acústico en formato compacto.</p>
      <p>Ven a probarlos en nuestra sala de demo. ¡Te esperamos!</p>
    `
  }
];

function renderizarDetalleNovedad() {
  const contenedor = document.getElementById("detalle-novedad");
  if (!contenedor) {
    return;
  }

  const parametros = new URLSearchParams(window.location.search);
  const id = parseInt(parametros.get("id"));

  const novedad = novedades.find(function (n) {
    return n.id === id;
  });

  if (!novedad) {
    contenedor.innerHTML = "<p>Novedad no encontrada. <a href='novedades.html'>Volver</a></p>";
    return;
  }

  contenedor.innerHTML = `
    <article class="articulo-novedad">
      <img src="${novedad.imagen}" alt="${novedad.titulo}">
      <h2>${novedad.titulo}</h2>
      <p class="fecha">${novedad.fecha}</p>
      ${novedad.contenido}
      <a href="novedades.html" class="btn btn-secundario mt-1">Volver a novedades</a>
    </article>
  `;
}

/* --------------------------------------------------
   11. ADMIN: renderizar tabla de productos
   -------------------------------------------------- */
function renderizarTablaProductosAdmin() {
  const tbody = document.getElementById("tabla-productos-body");
  if (!tbody) {
    return;
  }

  let html = "";
  productos.forEach(function (producto) {
    html += `
      <tr>
        <td>${producto.codigo}</td>
        <td><img src="${producto.imagen}" alt="${producto.nombre}"></td>
        <td>${producto.nombre}</td>
        <td>${producto.categoria}</td>
        <td>${formatearPrecio(producto.precio)}</td>
        <td>${producto.stock}</td>
        <td>
          <button class="btn btn-secundario btn-pequeno" onclick="editarProductoSimulado(${producto.id})">Editar</button>
        </td>
      </tr>
    `;
  });
  tbody.innerHTML = html;
}

/** Simula cargar datos en el formulario de edición */
function editarProductoSimulado(id) {
  const producto = productos.find(function (p) {
    return p.id === id;
  });
  if (!producto) {
    return;
  }

  const campoCodigo = document.getElementById("prod-codigo");
  const campoNombre = document.getElementById("prod-nombre");
  const campoDescripcion = document.getElementById("prod-descripcion");
  const campoPrecio = document.getElementById("prod-precio");
  const campoCategoria = document.getElementById("prod-categoria");
  const campoImagen = document.getElementById("prod-imagen");
  const campoStock = document.getElementById("prod-stock");
  const campoStockCritico = document.getElementById("prod-stock-critico");

  if (campoCodigo) campoCodigo.value = producto.codigo;
  if (campoNombre) campoNombre.value = producto.nombre;
  if (campoDescripcion) campoDescripcion.value = producto.descripcion;
  if (campoPrecio) campoPrecio.value = producto.precio;
  if (campoCategoria) campoCategoria.value = producto.categoria;
  if (campoImagen) campoImagen.value = producto.imagen;
  if (campoStock) campoStock.value = producto.stock;
  if (campoStockCritico) campoStockCritico.value = producto.stockCritico;

  // Scroll hacia el formulario
  const form = document.getElementById("form-producto");
  if (form) {
    form.scrollIntoView({ behavior: "smooth" });
  }
}

/* --------------------------------------------------
   12. INICIALIZACIÓN AL CARGAR LA PÁGINA
   -------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  // Ejecutamos todas las funciones; cada una
  // revisa si el elemento existe en la página actual
  inicializarMenuMovil();
  actualizarContadorCarrito();
  renderizarCatalogo();
  renderizarDestacados();
  renderizarDetalleProducto();
  renderizarCarrito();
  renderizarDetalleNovedad();
  inicializarRegiones();
  renderizarTablaProductosAdmin();
});
