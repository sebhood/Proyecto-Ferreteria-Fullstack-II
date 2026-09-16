// Renderiza el carrito de compras a partir de localStorage y permite
// cambiar cantidades, quitar productos y "pagar" (vacía el carrito).
document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('contenido-carrito');
  render();

  function render() {
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
      contenedor.innerHTML = `
        <div class="carrito-vacio">
          <p>Tu carrito está vacío.</p>
          <a href="productos.html" class="boton boton-primario">Ver productos</a>
        </div>
      `;
      return;
    }

    const filas = carrito.map(item => {
      const producto = obtenerProductoPorCodigo(item.codigo);
      if (!producto) return '';
      const subtotal = producto.precio * item.cantidad;
      return `
        <tr>
          <td>${producto.nombre}</td>
          <td>${formatoCLP(producto.precio)}</td>
          <td>
            <input type="number" min="1" max="${producto.stock}" value="${item.cantidad}" data-cantidad="${producto.codigo}">
          </td>
          <td>${formatoCLP(subtotal)}</td>
          <td><button type="button" class="boton boton-outline" data-quitar="${producto.codigo}">Quitar</button></td>
        </tr>
      `;
    }).join('');

    const total = carrito.reduce((acc, item) => {
      const producto = obtenerProductoPorCodigo(item.codigo);
      return acc + (producto ? producto.precio * item.cantidad : 0);
    }, 0);

    contenedor.innerHTML = `
      <div class="tabla-envoltorio">
        <table class="tabla-carrito">
          <thead>
            <tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th></th></tr>
          </thead>
          <tbody>${filas}</tbody>
        </table>
      </div>
      <div class="resumen-carrito">
        <div class="total-linea"><span>Total</span><span>${formatoCLP(total)}</span></div>
        <button type="button" class="boton boton-primario" id="boton-pagar" style="width:100%;">Confirmar pedido</button>
      </div>
      <p id="mensaje-carrito" style="margin-top:1rem; color: var(--exito); font-weight:600;"></p>
    `;

    contenedor.querySelectorAll('[data-cantidad]').forEach(input => {
      input.addEventListener('change', () => {
        const cantidad = Math.max(1, Number(input.value) || 1);
        actualizarCantidadCarrito(input.dataset.cantidad, cantidad);
        render();
      });
    });

    contenedor.querySelectorAll('[data-quitar]').forEach(boton => {
      boton.addEventListener('click', () => {
        quitarDelCarrito(boton.dataset.quitar);
        document.getElementById('carrito-contador').textContent = totalItemsCarrito();
        render();
      });
    });

    document.getElementById('boton-pagar').addEventListener('click', () => {
      vaciarCarrito();
      document.getElementById('carrito-contador').textContent = 0;
      render();
      contenedor.insertAdjacentHTML('afterbegin', '<p style="color:var(--exito); font-weight:700;">¡Gracias por tu compra! Te contactaremos para coordinar el retiro o despacho.</p>');
    });
  }
});
