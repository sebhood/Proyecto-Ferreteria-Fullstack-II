// Listado de productos del panel de administración, con acciones editar/eliminar.
document.addEventListener('DOMContentLoaded', () => {
  const cuerpo = document.getElementById('cuerpo-productos');

  function render() {
    const productos = obtenerProductos();
    cuerpo.innerHTML = productos.map(p => {
      const bajoStock = p.stockCritico != null && p.stock <= p.stockCritico;
      return `
        <tr>
          <td>${p.codigo}</td>
          <td>${p.nombre}</td>
          <td>${p.categoria}</td>
          <td>${formatoCLP(p.precio)}</td>
          <td><span class="etiqueta-stock ${bajoStock ? 'bajo' : 'ok'}">${p.stock}</span></td>
          <td class="acciones-tabla">
            <a class="boton boton-outline" href="producto-form.html?codigo=${encodeURIComponent(p.codigo)}">Editar</a>
            <button type="button" class="boton boton-peligro" data-eliminar="${p.codigo}">Eliminar</button>
          </td>
        </tr>
      `;
    }).join('');

    cuerpo.querySelectorAll('[data-eliminar]').forEach(boton => {
      boton.addEventListener('click', () => {
        if (!confirm('¿Eliminar este producto del catálogo?')) return;
        const productos = obtenerProductos().filter(p => p.codigo !== boton.dataset.eliminar);
        guardarProductos(productos);
        render();
      });
    });
  }

  render();
});
