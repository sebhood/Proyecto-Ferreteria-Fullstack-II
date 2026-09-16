// Lee el parámetro ?codigo= de la URL y muestra el detalle del producto,
// con selector de cantidad y botón para añadir al carrito.
document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('contenido-producto');
  const parametros = new URLSearchParams(window.location.search);
  const codigo = parametros.get('codigo');
  const producto = codigo ? obtenerProductoPorCodigo(codigo) : null;

  if (!producto) {
    contenedor.innerHTML = '<p>No se encontró el producto solicitado. <a href="productos.html">Volver al catálogo</a>.</p>';
    return;
  }

  document.title = `${producto.nombre} | Ferretería Los Maestros`;
  document.getElementById('miga-producto').textContent = producto.nombre;

  const sinStock = producto.stock <= 0;

  contenedor.innerHTML = `
    <div class="detalle-producto">
      <div class="imagen-grande" aria-hidden="true">🔩</div>
      <div>
        <h1>${producto.nombre}</h1>
        <p class="precio-producto" style="font-size:1.6rem;">${formatoCLP(producto.precio)}</p>
        <p>${producto.descripcion || 'Sin descripción disponible.'}</p>
        <p><strong>Marca:</strong> ${producto.marca} &nbsp;|&nbsp; <strong>Unidad:</strong> ${producto.unidad}</p>
        <p><strong>Categoría:</strong> ${producto.categoria} — ${producto.subcategoria}</p>
        <p>
          <span class="etiqueta-stock ${sinStock ? 'bajo' : 'ok'}">
            ${sinStock ? 'Sin stock disponible' : producto.stock + ' unidades disponibles'}
          </span>
        </p>

        <form id="form-agregar" onsubmit="return false;">
          <div class="selector-cantidad">
            <label for="cantidad">Cantidad:</label>
            <input type="number" id="cantidad" min="1" max="${Math.max(producto.stock, 1)}" value="1" ${sinStock ? 'disabled' : ''}>
          </div>
          <button type="submit" class="boton boton-primario" id="boton-agregar" ${sinStock ? 'disabled' : ''}>
            ${sinStock ? 'Sin stock' : 'Añadir al carrito'}
          </button>
        </form>
        <p id="mensaje-agregado" style="color:var(--exito); font-weight:600; min-height:1.2rem;"></p>
      </div>
    </div>
  `;

  const formulario = document.getElementById('form-agregar');
  if (formulario && !sinStock) {
    formulario.addEventListener('submit', () => {
      const cantidad = Number(document.getElementById('cantidad').value) || 1;
      agregarAlCarrito(producto.codigo, cantidad);
      document.getElementById('carrito-contador').textContent = totalItemsCarrito();
      document.getElementById('mensaje-agregado').textContent = `Añadiste ${cantidad} unidad(es) al carrito.`;
    });
  }
});
