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
    nombre: "Guitarra Acústica Yamaha F310",
    precio: 189990,
    categoria: "Guitarras",
    imagen: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400",
    descripcion: "Guitarra acústica ideal para principiantes. Sonido equilibrado y construcción resistente. Perfecta para estudiar y tocar en casa."
  },
  {
    id: 2,
    nombre: "Guitarra Eléctrica Fender Stratocaster",
    precio: 899990,
    categoria: "Guitarras",
    imagen: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=400",
    descripcion: "Clásico modelo Stratocaster con pastillas single-coil. Ideal para rock, blues y pop. Incluye funda."
  },
  {
    id: 3,
    nombre: "Batería Acústica Pearl Export",
    precio: 649990,
    categoria: "Baterías",
    imagen: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400",
    descripcion: "Kit completo de 5 cuerpos con platillos. Ideal para estudio y presentaciones en vivo. Acabado profesional."
  },
  {
    id: 4,
    nombre: "Batería Electrónica Roland TD-17",
    precio: 1199990,
    categoria: "Baterías",
    imagen: "https://images.unsplash.com/photo-1571327073757-71d13c24de30?w=400",
    descripcion: "Batería electrónica con pads de malla silenciosos. Ideal para practicar en departamentos sin molestar."
  },
  {
    id: 5,
    nombre: "Teclado Casio CT-X700",
    precio: 249990,
    categoria: "Teclados",
    imagen: "https://images.unsplash.com/photo-1520523839897-bd27f25be155?w=400",
    descripcion: "61 teclas con cientos de tonos y ritmos. Perfecto para aprender piano y composición musical."
  },
  {
    id: 6,
    nombre: "Piano Digital Yamaha P-45",
    precio: 449990,
    categoria: "Teclados",
    imagen: "https://images.unsplash.com/photo-1552422535-c45813c61732?w=400",
    descripcion: "88 teclas con acción martillo graduada. Sonido de piano de cola auténtico. Incluye pedal sustain."
  },
  {
    id: 7,
    nombre: "Amplificador Marshall MG15",
    precio: 159990,
    categoria: "Amplificadores",
    imagen: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400",
    descripcion: "Amplificador de guitarra 15W con efectos. Compacto y potente para ensayo y estudio."
  },
  {
    id: 8,
    nombre: "Micrófono Shure SM58",
    precio: 129990,
    categoria: "Audio",
    imagen: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400",
    descripcion: "El micrófono de voz más usado en el mundo. Ideal para escenarios y grabación. Resistente y confiable."
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

  // Tomamos solo los primeros 4
  const destacados = productos.slice(0, 4);
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
   Lee el ?id= de la URL y muestra ese producto
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

  // Si el carrito está vacío, mostramos un mensaje
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
   8. REGIONES Y COMUNAS (selects dinámicos)
   Cuando cambia la región, se llenan las comunas
   -------------------------------------------------- */
function inicializarRegiones() {
  const selectRegion = document.getElementById("region");
  const selectComuna = document.getElementById("comuna");

  // Si no existen estos selects, salimos
  if (!selectRegion || !selectComuna) {
    return;
  }

  // Llenamos el select de regiones
  selectRegion.innerHTML = '<option value="">Seleccione una región</option>';
  regionesChile.forEach(function (region) {
    selectRegion.innerHTML += `<option value="${region.nombre}">${region.nombre}</option>`;
  });

  // Comuna vacía al inicio
  selectComuna.innerHTML = '<option value="">Seleccione una comuna</option>';

  // Cuando el usuario cambia la región...
  selectRegion.addEventListener("change", function () {
    const regionElegida = selectRegion.value;
    selectComuna.innerHTML = '<option value="">Seleccione una comuna</option>';

    // Buscamos la región en el arreglo
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
   9. MENÚ HAMBURGUESA (móvil)
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
    imagen: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800",
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
    imagen: "https://images.unsplash.com/photo-1520523839897-bd27f25be155?w=800",
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
        <td>${producto.id}</td>
        <td><img src="${producto.imagen}" alt="${producto.nombre}"></td>
        <td>${producto.nombre}</td>
        <td>${producto.categoria}</td>
        <td>${formatearPrecio(producto.precio)}</td>
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

  const campoId = document.getElementById("prod-id");
  const campoNombre = document.getElementById("prod-nombre");
  const campoPrecio = document.getElementById("prod-precio");
  const campoCategoria = document.getElementById("prod-categoria");
  const campoImagen = document.getElementById("prod-imagen");

  if (campoId) campoId.value = producto.id;
  if (campoNombre) campoNombre.value = producto.nombre;
  if (campoPrecio) campoPrecio.value = producto.precio;
  if (campoCategoria) campoCategoria.value = producto.categoria;
  if (campoImagen) campoImagen.value = producto.imagen;

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
