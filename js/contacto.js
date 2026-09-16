// Validación del formulario de contacto según reglas del Anexo 1:
// nombre requerido (máx 100), correo con dominio restringido (máx 100),
// comentario requerido (máx 500).
document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('form-contacto');
  const alerta = document.getElementById('alerta-formulario');
  const campoNombre = document.getElementById('nombre');
  const campoCorreo = document.getElementById('correo');
  const campoComentario = document.getElementById('comentario');
  const contadorComentario = document.getElementById('contador-comentario');

  campoComentario.addEventListener('input', () => {
    contadorComentario.textContent = campoComentario.value.length;
  });

  function validarNombre() {
    const valor = campoNombre.value.trim();
    if (!valor) return marcarError(formulario, 'nombre', 'El nombre es obligatorio.'), false;
    if (valor.length > 100) return marcarError(formulario, 'nombre', 'Máximo 100 caracteres.'), false;
    marcarValido(formulario, 'nombre');
    return true;
  }

  function validarCorreo() {
    const valor = campoCorreo.value.trim();
    if (!valor) return marcarError(formulario, 'correo', 'El correo es obligatorio.'), false;
    if (valor.length > 100) return marcarError(formulario, 'correo', 'Máximo 100 caracteres.'), false;
    if (!correoConDominioValido(valor)) return marcarError(formulario, 'correo', 'Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.'), false;
    marcarValido(formulario, 'correo');
    return true;
  }

  function validarComentario() {
    const valor = campoComentario.value.trim();
    if (!valor) return marcarError(formulario, 'comentario', 'El comentario es obligatorio.'), false;
    if (valor.length > 500) return marcarError(formulario, 'comentario', 'Máximo 500 caracteres.'), false;
    marcarValido(formulario, 'comentario');
    return true;
  }

  campoNombre.addEventListener('blur', validarNombre);
  campoCorreo.addEventListener('blur', validarCorreo);
  campoComentario.addEventListener('blur', validarComentario);

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const valido = [validarNombre(), validarCorreo(), validarComentario()].every(Boolean);
    if (!valido) {
      mostrarAlerta(alerta, 'error', 'Revisa los campos marcados en rojo.');
      return;
    }
    mostrarAlerta(alerta, 'exito', `¡Gracias, ${campoNombre.value.trim()}! Recibimos tu mensaje y te responderemos a la brevedad.`);
    formulario.reset();
    contadorComentario.textContent = '0';
    formulario.querySelectorAll('.grupo-campo').forEach(g => g.classList.remove('valido', 'invalido'));
  });
});
