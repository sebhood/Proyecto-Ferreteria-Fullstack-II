// Comportamiento compartido por todas las páginas de la tienda:
// menú hamburguesa, año del footer, contador del carrito y estado de sesión en el nav.
document.addEventListener('DOMContentLoaded', () => {
  const botonMenu = document.querySelector('.boton-menu');
  const nav = document.querySelector('.nav-principal');

  if (botonMenu && nav) {
    botonMenu.addEventListener('click', () => {
      const abierto = nav.classList.toggle('abierto');
      botonMenu.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });
  }

  const anioSpan = document.getElementById('anio-actual');
  if (anioSpan) anioSpan.textContent = new Date().getFullYear();

  const contadorCarrito = document.getElementById('carrito-contador');
  if (contadorCarrito && typeof totalItemsCarrito === 'function') {
    contadorCarrito.textContent = totalItemsCarrito();
  }

  const zonaSesion = document.getElementById('nav-sesion');
  if (zonaSesion && typeof obtenerSesion === 'function') {
    const sesion = obtenerSesion();
    if (sesion) {
      zonaSesion.innerHTML = `
        <span class="texto-sesion">Hola, ${sesion.nombre}</span>
        ${sesion.tipoUsuario === 'Administrador' ? '<a href="admin/index.html">Administración</a>' : ''}
        <a href="#" id="boton-cerrar-sesion">Cerrar sesión</a>
      `;
      document.getElementById('boton-cerrar-sesion').addEventListener('click', (e) => {
        e.preventDefault();
        cerrarSesion();
        window.location.href = 'index.html';
      });
    } else {
      zonaSesion.innerHTML = `
        <a href="login.html">Iniciar sesión</a>
        <a href="registro.html">Registrarse</a>
      `;
    }
  }
});
