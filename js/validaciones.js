// Funciones de validación reutilizadas por los formularios del sitio
// (login, registro, contacto, mantenedores de producto y usuario).

const DOMINIOS_CORREO_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];

function correoConDominioValido(correo) {
  const partes = correo.trim().toLowerCase().split('@');
  if (partes.length !== 2) return false;
  return DOMINIOS_CORREO_PERMITIDOS.includes(partes[1]);
}

// Valida un RUT chileno sin puntos ni guión, ej: 19011022K
function validarRut(rutSinFormato) {
  const rut = rutSinFormato.trim().toUpperCase();
  if (!/^[0-9]{6,8}[0-9K]$/.test(rut)) return false;

  const cuerpo = rut.slice(0, -1);
  const dvIngresado = rut.slice(-1);

  let suma = 0;
  let multiplicador = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }
  const resto = 11 - (suma % 11);
  let dvEsperado;
  if (resto === 11) dvEsperado = '0';
  else if (resto === 10) dvEsperado = 'K';
  else dvEsperado = String(resto);

  return dvEsperado === dvIngresado;
}

// Marca visualmente un campo (grupo con [data-campo]) como inválido/válido
// y escribe el mensaje en el span #error-<campo>.
function marcarError(formulario, nombreCampo, mensaje) {
  const grupo = formulario.querySelector(`[data-campo="${nombreCampo}"]`);
  const spanError = document.getElementById(`error-${nombreCampo}`);
  if (grupo) {
    grupo.classList.add('invalido');
    grupo.classList.remove('valido');
  }
  if (spanError) spanError.textContent = mensaje;
}

function marcarValido(formulario, nombreCampo) {
  const grupo = formulario.querySelector(`[data-campo="${nombreCampo}"]`);
  const spanError = document.getElementById(`error-${nombreCampo}`);
  if (grupo) {
    grupo.classList.add('valido');
    grupo.classList.remove('invalido');
  }
  if (spanError) spanError.textContent = '';
}

function mostrarAlerta(elementoAlerta, tipo, mensaje) {
  elementoAlerta.classList.remove('exito', 'error');
  elementoAlerta.classList.add(tipo);
  elementoAlerta.textContent = mensaje;
}
