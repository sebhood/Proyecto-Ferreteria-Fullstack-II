// Plantilla HTML compartida para renderizar una tarjeta de producto
// (usada en index.html y productos.html).
function tarjetaProductoHTML(p) {
  return `
    <article class="tarjeta-producto">
      <div class="imagen-producto" aria-hidden="true">🔩</div>
      <div class="cuerpo-tarjeta">
        <h3><a href="producto-detalle.html?codigo=${p.codigo}">${p.nombre}</a></h3>
        <span class="precio-producto">${formatoCLP(p.precio)}</span>
        <button type="button" class="boton boton-primario" data-agregar="${p.codigo}">Añadir al carrito</button>
      </div>
    </article>
  `;
}
