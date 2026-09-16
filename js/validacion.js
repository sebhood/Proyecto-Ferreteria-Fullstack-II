// Validación del formulario de cotización: mensajes de error personalizados,
// sugerencias de productos (datalist) y prevención de envío con datos incorrectos.
document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('form-cotizacion');
  const alerta = document.getElementById('alerta-formulario');

  const campos = {
    nombre: document.getElementById('nombre'),
    tipoCliente: document.getElementById('tipo-cliente'),
    correo: document.getElementById('correo'),
    telefono: document.getElementById('telefono'),
    producto: document.getElementById('producto'),
    cantidad: document.getElementById('cantidad'),
    terminos: document.getElementById('terminos'),
  };

  // Sugerencias de productos a partir del catálogo (js/productos.js)
  const listaSugerencias = document.getElementById('sugerencias-productos');
  if (typeof PRODUCTOS !== 'undefined' && listaSugerencias) {
    PRODUCTOS.forEach(p => {
      const opcion = document.createElement('option');
      opcion.value = p.nombre;
      listaSugerencias.appendChild(opcion);
    });
  }

  const REGEX_TELEFONO = /^(\+?56)?[\s-]?9\d{8}$|^(\+?56)?[\s-]?[2-9]\d{7,8}$/;
  const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function marcarError(nombreCampo, mensaje) {
    const grupo = formulario.querySelector(`[data-campo="${nombreCampo}"]`);
    const spanError = document.getElementById(`error-${nombreCampo}`);
    grupo.classList.add('invalido');
    grupo.classList.remove('valido');
    if (spanError) spanError.textContent = mensaje;
  }

  function marcarValido(nombreCampo) {
    const grupo = formulario.querySelector(`[data-campo="${nombreCampo}"]`);
    const spanError = document.getElementById(`error-${nombreCampo}`);
    grupo.classList.add('valido');
    grupo.classList.remove('invalido');
    if (spanError) spanError.textContent = '';
  }

  function validarNombre() {
    const valor = campos.nombre.value.trim();
    if (valor.length < 3) {
      marcarError('nombre', 'Ingresa tu nombre completo (mínimo 3 caracteres).');
      return false;
    }
    if (!/^[a-zA-ZÀ-ÿñÑ\s]+$/.test(valor)) {
      marcarError('nombre', 'El nombre solo puede contener letras y espacios.');
      return false;
    }
    marcarValido('nombre');
    return true;
  }

  function validarTipoCliente() {
    if (!campos.tipoCliente.value) {
      marcarError('tipo-cliente', 'Selecciona si eres particular o contratista.');
      return false;
    }
    marcarValido('tipo-cliente');
    return true;
  }

  function validarCorreo() {
    const valor = campos.correo.value.trim();
    if (!valor) {
      marcarError('correo', 'El correo electrónico es obligatorio.');
      return false;
    }
    if (!REGEX_CORREO.test(valor)) {
      marcarError('correo', 'Ingresa un correo válido, ej: nombre@dominio.cl');
      return false;
    }
    marcarValido('correo');
    return true;
  }

  function validarTelefono() {
    const valor = campos.telefono.value.trim().replace(/\s+/g, '');
    if (!valor) {
      marcarError('telefono', 'El teléfono es obligatorio.');
      return false;
    }
    if (!REGEX_TELEFONO.test(valor)) {
      marcarError('telefono', 'Ingresa un teléfono chileno válido, ej: +56912345678.');
      return false;
    }
    marcarValido('telefono');
    return true;
  }

  function validarProducto() {
    const valor = campos.producto.value.trim();
    if (valor.length < 3) {
      marcarError('producto', 'Indica el producto que te interesa (mínimo 3 caracteres).');
      return false;
    }
    marcarValido('producto');
    return true;
  }

  function validarCantidad() {
    const valor = Number(campos.cantidad.value);
    if (!campos.cantidad.value || Number.isNaN(valor)) {
      marcarError('cantidad', 'Ingresa la cantidad que necesitas.');
      return false;
    }
    if (valor < 1 || valor > 9999 || !Number.isInteger(valor)) {
      marcarError('cantidad', 'La cantidad debe ser un número entero entre 1 y 9999.');
      return false;
    }
    marcarValido('cantidad');
    return true;
  }

  function validarTerminos() {
    if (!campos.terminos.checked) {
      marcarError('terminos', 'Debes aceptar ser contactado para continuar.');
      return false;
    }
    marcarValido('terminos');
    return true;
  }

  campos.nombre.addEventListener('blur', validarNombre);
  campos.tipoCliente.addEventListener('change', validarTipoCliente);
  campos.correo.addEventListener('blur', validarCorreo);
  campos.telefono.addEventListener('blur', validarTelefono);
  campos.producto.addEventListener('blur', validarProducto);
  campos.cantidad.addEventListener('input', validarCantidad);
  campos.terminos.addEventListener('change', validarTerminos);

  const mensaje = document.getElementById('mensaje');
  const contadorMensaje = document.getElementById('contador-mensaje');
  if (mensaje && contadorMensaje) {
    mensaje.addEventListener('input', () => {
      contadorMensaje.textContent = mensaje.value.length;
    });
  }

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const validaciones = [
      validarNombre(),
      validarTipoCliente(),
      validarCorreo(),
      validarTelefono(),
      validarProducto(),
      validarCantidad(),
      validarTerminos(),
    ];

    const formularioValido = validaciones.every(Boolean);

    alerta.classList.remove('exito', 'error');

    if (!formularioValido) {
      alerta.classList.add('error');
      alerta.textContent = 'Revisa los campos marcados en rojo antes de enviar tu solicitud.';
      const primerInvalido = formulario.querySelector('.grupo-campo.invalido');
      if (primerInvalido) {
        primerInvalido.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    alerta.classList.add('exito');
    alerta.textContent = `¡Gracias, ${campos.nombre.value.trim()}! Recibimos tu solicitud de cotización. Te contactaremos a ${campos.correo.value.trim()} a la brevedad.`;
    formulario.reset();
    Object.keys(campos).forEach(nombreCampo => {
      const key = nombreCampo === 'tipoCliente' ? 'tipo-cliente' : nombreCampo;
      const grupo = formulario.querySelector(`[data-campo="${key}"]`);
      if (grupo) grupo.classList.remove('valido', 'invalido');
    });
    if (contadorMensaje) contadorMensaje.textContent = '0';
  });
});
