// Renderiza la grilla de productos destacados en la página de inicio.
document.addEventListener('DOMContentLoaded', () => {
  const rejilla = document.getElementById('rejilla-destacados');
  if (!rejilla) return;

  const productos = obtenerProductos().slice(0, 8);
  rejilla.innerHTML = productos.map(tarjetaProductoHTML).join('');

  rejilla.querySelectorAll('[data-agregar]').forEach(boton => {
    boton.addEventListener('click', () => {
      agregarAlCarrito(boton.dataset.agregar, 1);
      document.getElementById('carrito-contador').textContent = totalItemsCarrito();
      boton.textContent = 'Añadido ✓';
      setTimeout(() => { boton.textContent = 'Añadir al carrito'; }, 1200);
    });
  });
});
