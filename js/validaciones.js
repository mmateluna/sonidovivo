/* ============================================
   SONIDO VIVO - validaciones.js
   Validaciones de formularios (nivel principiante)
   ============================================ */

/* --------------------------------------------------
   HELPERS GENERALES
   -------------------------------------------------- */

/** Muestra un mensaje de error bajo un campo */
function mostrarError(idCampo, mensaje) {
  const campo = document.getElementById(idCampo);
  const error = document.getElementById("error-" + idCampo);

  if (campo) {
    campo.classList.add("campo-invalido");
  }
  if (error) {
    error.textContent = mensaje;
    error.classList.add("visible");
  }
}

/** Limpia el error de un campo */
function limpiarError(idCampo) {
  const campo = document.getElementById(idCampo);
  const error = document.getElementById("error-" + idCampo);

  if (campo) {
    campo.classList.remove("campo-invalido");
  }
  if (error) {
    error.textContent = "";
    error.classList.remove("visible");
  }
}

/** Valida formato de correo con una expresión regular básica */
function esCorreoValido(correo) {
  // Patrón simple: texto@texto.texto
  const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return patron.test(correo);
}

/* --------------------------------------------------
   VALIDACIÓN DE RUN CHILENO (Módulo 11)
   El RUN debe venir sin puntos ni guión.
   Ejemplo válido: 123456785
   -------------------------------------------------- */
function calcularDigitoVerificador(cuerpo) {
  // Algoritmo Módulo 11:
  // Se multiplican los dígitos de derecha a izquierda
  // por la secuencia 2, 3, 4, 5, 6, 7 y se repite.
  let suma = 0;
  let multiplicador = 2;

  // Recorremos el cuerpo de derecha a izquierda
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma = suma + parseInt(cuerpo.charAt(i)) * multiplicador;
    multiplicador = multiplicador + 1;
    if (multiplicador > 7) {
      multiplicador = 2;
    }
  }

  const resto = suma % 11;
  const digito = 11 - resto;

  // Casos especiales
  if (digito === 11) {
    return "0";
  }
  if (digito === 10) {
    return "K";
  }
  return String(digito);
}

function validarRun(run) {
  // Debe tener solo números y una K al final (opcional)
  // Sin puntos ni guión
  if (!run || run.trim() === "") {
    return false;
  }

  const runLimpio = run.trim().toUpperCase();

  // Solo números y eventualmente K al final
  if (!/^[0-9]+[0-9K]$/.test(runLimpio)) {
    return false;
  }

  // Separar cuerpo y dígito verificador
  const cuerpo = runLimpio.slice(0, -1);
  const dvIngresado = runLimpio.slice(-1);
  const dvCalculado = calcularDigitoVerificador(cuerpo);

  return dvIngresado === dvCalculado;
}

/* --------------------------------------------------
   1. VALIDAR LOGIN
   -------------------------------------------------- */
function validarFormularioLogin(evento) {
  // Evitamos que el formulario se envíe de verdad
  evento.preventDefault();

  let esValido = true;

  const correo = document.getElementById("login-correo").value.trim();
  const clave = document.getElementById("login-clave").value;

  // Limpiamos errores previos
  limpiarError("login-correo");
  limpiarError("login-clave");

  // Correo: obligatorio, máx 100, formato válido
  if (correo === "") {
    mostrarError("login-correo", "El correo es obligatorio.");
    esValido = false;
  } else if (correo.length > 100) {
    mostrarError("login-correo", "El correo no puede superar 100 caracteres.");
    esValido = false;
  } else if (!esCorreoValido(correo)) {
    mostrarError("login-correo", "Ingresa un correo válido (ej: nombre@correo.cl).");
    esValido = false;
  }

  // Contraseña: obligatoria, entre 4 y 10 caracteres
  if (clave === "") {
    mostrarError("login-clave", "La contraseña es obligatoria.");
    esValido = false;
  } else if (clave.length < 4 || clave.length > 10) {
    mostrarError("login-clave", "La contraseña debe tener entre 4 y 10 caracteres.");
    esValido = false;
  }

  if (esValido) {
    const mensaje = document.getElementById("mensaje-login");
    if (mensaje) {
      mensaje.textContent = "Inicio de sesión simulado exitoso. ¡Bienvenido/a!";
      mensaje.classList.add("visible");
    }
  }

  return esValido;
}

/* --------------------------------------------------
   2. VALIDAR CONTACTO
   -------------------------------------------------- */
function validarFormularioContacto(evento) {
  evento.preventDefault();

  let esValido = true;

  const nombre = document.getElementById("contacto-nombre").value.trim();
  const correo = document.getElementById("contacto-correo").value.trim();
  const comentario = document.getElementById("contacto-comentario").value.trim();

  limpiarError("contacto-nombre");
  limpiarError("contacto-correo");
  limpiarError("contacto-comentario");

  // Nombre: obligatorio, máx 100
  if (nombre === "") {
    mostrarError("contacto-nombre", "El nombre es obligatorio.");
    esValido = false;
  } else if (nombre.length > 100) {
    mostrarError("contacto-nombre", "El nombre no puede superar 100 caracteres.");
    esValido = false;
  }

  // Correo: obligatorio, máx 100, formato válido
  if (correo === "") {
    mostrarError("contacto-correo", "El correo es obligatorio.");
    esValido = false;
  } else if (correo.length > 100) {
    mostrarError("contacto-correo", "El correo no puede superar 100 caracteres.");
    esValido = false;
  } else if (!esCorreoValido(correo)) {
    mostrarError("contacto-correo", "Ingresa un correo válido.");
    esValido = false;
  }

  // Comentario: obligatorio, máx 500
  if (comentario === "") {
    mostrarError("contacto-comentario", "El comentario es obligatorio.");
    esValido = false;
  } else if (comentario.length > 500) {
    mostrarError("contacto-comentario", "El comentario no puede superar 500 caracteres.");
    esValido = false;
  }

  if (esValido) {
    const mensaje = document.getElementById("mensaje-contacto");
    if (mensaje) {
      mensaje.textContent = "¡Mensaje enviado! Te responderemos pronto.";
      mensaje.classList.add("visible");
    }
    document.getElementById("form-contacto").reset();
  }

  return esValido;
}

/* --------------------------------------------------
   3. VALIDAR REGISTRO / USUARIO
   Sirve para registro.html y admin-usuarios.html
   -------------------------------------------------- */
function validarFormularioUsuario(evento) {
  evento.preventDefault();

  let esValido = true;

  // Obtenemos los valores (ids compartidos entre registro y admin)
  const run = document.getElementById("run").value.trim();
  const nombre = document.getElementById("nombre").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const tipo = document.getElementById("tipo-usuario").value;
  const region = document.getElementById("region").value;
  const comuna = document.getElementById("comuna").value;
  const direccion = document.getElementById("direccion").value.trim();

  // Limpiar errores
  limpiarError("run");
  limpiarError("nombre");
  limpiarError("apellidos");
  limpiarError("correo");
  limpiarError("tipo-usuario");
  limpiarError("region");
  limpiarError("comuna");
  limpiarError("direccion");

  // RUN: obligatorio, sin puntos ni guión, dígito verificador válido
  if (run === "") {
    mostrarError("run", "El RUN es obligatorio.");
    esValido = false;
  } else if (run.includes(".") || run.includes("-")) {
    mostrarError("run", "Ingresa el RUN sin puntos ni guión (ej: 123456785).");
    esValido = false;
  } else if (!validarRun(run)) {
    mostrarError("run", "El RUN no es válido. Revisa el dígito verificador.");
    esValido = false;
  }

  // Nombre: obligatorio, máx 50
  if (nombre === "") {
    mostrarError("nombre", "El nombre es obligatorio.");
    esValido = false;
  } else if (nombre.length > 50) {
    mostrarError("nombre", "El nombre no puede superar 50 caracteres.");
    esValido = false;
  }

  // Apellidos: obligatorios, máx 100
  if (apellidos === "") {
    mostrarError("apellidos", "Los apellidos son obligatorios.");
    esValido = false;
  } else if (apellidos.length > 100) {
    mostrarError("apellidos", "Los apellidos no pueden superar 100 caracteres.");
    esValido = false;
  }

  // Correo: obligatorio, máx 100, formato válido
  if (correo === "") {
    mostrarError("correo", "El correo es obligatorio.");
    esValido = false;
  } else if (correo.length > 100) {
    mostrarError("correo", "El correo no puede superar 100 caracteres.");
    esValido = false;
  } else if (!esCorreoValido(correo)) {
    mostrarError("correo", "Ingresa un correo válido.");
    esValido = false;
  }

  // Tipo de usuario: debe seleccionar uno
  if (tipo === "") {
    mostrarError("tipo-usuario", "Selecciona un tipo de usuario.");
    esValido = false;
  }

  // Región y Comuna: obligatorios
  if (region === "") {
    mostrarError("region", "Selecciona una región.");
    esValido = false;
  }

  if (comuna === "") {
    mostrarError("comuna", "Selecciona una comuna.");
    esValido = false;
  }

  // Dirección: obligatoria, máx 300
  if (direccion === "") {
    mostrarError("direccion", "La dirección es obligatoria.");
    esValido = false;
  } else if (direccion.length > 300) {
    mostrarError("direccion", "La dirección no puede superar 300 caracteres.");
    esValido = false;
  }

  if (esValido) {
    const mensaje = document.getElementById("mensaje-usuario");
    if (mensaje) {
      mensaje.textContent = "Usuario guardado correctamente (simulación).";
      mensaje.classList.add("visible");
    }
  }

  return esValido;
}

/* --------------------------------------------------
   CONECTAR VALIDACIONES AL CARGAR LA PÁGINA
   -------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  const formLogin = document.getElementById("form-login");
  if (formLogin) {
    formLogin.addEventListener("submit", validarFormularioLogin);
  }

  const formContacto = document.getElementById("form-contacto");
  if (formContacto) {
    formContacto.addEventListener("submit", validarFormularioContacto);
  }

  const formUsuario = document.getElementById("form-usuario");
  if (formUsuario) {
    formUsuario.addEventListener("submit", validarFormularioUsuario);
  }

  // Formulario de producto admin (simulado, sin validación estricta)
  const formProducto = document.getElementById("form-producto");
  if (formProducto) {
    formProducto.addEventListener("submit", function (evento) {
      evento.preventDefault();
      const mensaje = document.getElementById("mensaje-producto");
      if (mensaje) {
        mensaje.textContent = "Producto guardado correctamente (simulación).";
        mensaje.classList.add("visible");
      }
    });
  }
});
