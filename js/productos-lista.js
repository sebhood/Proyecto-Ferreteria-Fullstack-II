// Renderiza y filtra la grilla de productos en productos.html
document.addEventListener('DOMContentLoaded', () => {
  const rejilla = document.getElementById('rejilla-productos');
  if (!rejilla) return;

  const contador = document.getElementById('contador-resultados');
  const inputBuscar = document.getElementById('buscar');
  const selectCategoria = document.getElementById('filtro-categoria');
  const productos = obtenerProductos();

  const categorias = [...new Set(productos.map(p => p.categoria))].sort();
  categorias.forEach(cat => {
    const opcion = document.createElement('option');
    opcion.value = cat;
    opcion.textContent = cat;
    selectCategoria.appendChild(opcion);
  });

  function renderizar() {
    const texto = inputBuscar.value.trim().toLowerCase();
    const categoria = selectCategoria.value;

    const filtrados = productos.filter(p => {
      const coincideTexto = !texto ||
        p.nombre.toLowerCase().includes(texto) ||
        p.marca.toLowerCase().includes(texto) ||
        p.codigo.toLowerCase().includes(texto);
      const coincideCategoria = !categoria || p.categoria === categoria;
      return coincideTexto && coincideCategoria;
    });

    rejilla.innerHTML = filtrados.length
      ? filtrados.map(tarjetaProductoHTML).join('')
      : '<p>No se encontraron productos con esos filtros.</p>';

    rejilla.querySelectorAll('[data-agregar]').forEach(boton => {
      boton.addEventListener('click', () => {
        agregarAlCarrito(boton.dataset.agregar, 1);
        document.getElementById('carrito-contador').textContent = totalItemsCarrito();
        boton.textContent = 'Añadido ✓';
        setTimeout(() => { boton.textContent = 'Añadir al carrito'; }, 1200);
      });
    });

    contador.textContent = `${filtrados.length} de ${productos.length} productos mostrados`;
  }

  inputBuscar.addEventListener('input', renderizar);
  selectCategoria.addEventListener('change', renderizar);
  renderizar();
});
