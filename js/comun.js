// Comportamiento compartido por todas las páginas: menú hamburguesa y año del footer
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
  if (anioSpan) {
    anioSpan.textContent = new Date().getFullYear();
  }
});
