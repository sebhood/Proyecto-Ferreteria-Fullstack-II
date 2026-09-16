// Protege las vistas de administración: solo el rol "Administrador" puede
// acceder. Si no hay sesión o el rol no corresponde, se redirige al login.
(function protegerVistaAdmin() {
  const sesion = obtenerSesion();
  if (!sesion || sesion.tipoUsuario !== 'Administrador') {
    window.location.href = '../login.html';
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const nombreSpan = document.getElementById('admin-nombre-usuario');
  const sesion = obtenerSesion();
  if (nombreSpan && sesion) nombreSpan.textContent = sesion.nombre;

  const botonSalir = document.getElementById('admin-cerrar-sesion');
  if (botonSalir) {
    botonSalir.addEventListener('click', (e) => {
      e.preventDefault();
      cerrarSesion();
      window.location.href = '../login.html';
    });
  }
});
