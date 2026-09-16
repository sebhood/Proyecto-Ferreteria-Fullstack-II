// Validación del formulario de inicio de sesión según reglas del Anexo 1:
// correo requerido (máx 100, solo dominios permitidos) y contraseña de 4 a 10 caracteres.
document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('form-login');
  const alerta = document.getElementById('alerta-formulario');
  const campoCorreo = document.getElementById('correo');
  const campoClave = document.getElementById('clave');

  function validarCorreo() {
    const valor = campoCorreo.value.trim();
    if (!valor) return marcarError(formulario, 'correo', 'El correo es obligatorio.'), false;
    if (valor.length > 100) return marcarError(formulario, 'correo', 'Máximo 100 caracteres.'), false;
    if (!correoConDominioValido(valor)) return marcarError(formulario, 'correo', 'Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.'), false;
    marcarValido(formulario, 'correo');
    return true;
  }

  function validarClave() {
    const valor = campoClave.value;
    if (valor.length < 4 || valor.length > 10) return marcarError(formulario, 'clave', 'La contraseña debe tener entre 4 y 10 caracteres.'), false;
    marcarValido(formulario, 'clave');
    return true;
  }

  campoCorreo.addEventListener('blur', validarCorreo);
  campoClave.addEventListener('input', validarClave);

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const valido = [validarCorreo(), validarClave()].every(Boolean);
    if (!valido) {
      mostrarAlerta(alerta, 'error', 'Revisa los campos marcados en rojo.');
      return;
    }

    const usuario = obtenerUsuarioPorCorreo(campoCorreo.value.trim());
    if (!usuario || usuario.clave !== campoClave.value) {
      mostrarAlerta(alerta, 'error', 'Correo o contraseña incorrectos.');
      return;
    }

    iniciarSesion(usuario);
    mostrarAlerta(alerta, 'exito', `¡Bienvenido/a, ${usuario.nombre}!`);
    setTimeout(() => {
      window.location.href = usuario.tipoUsuario === 'Administrador' ? 'admin/index.html' : 'index.html';
    }, 900);
  });
});
