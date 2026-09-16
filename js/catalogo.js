// Renderiza y filtra la tabla del catálogo a partir de PRODUCTOS (js/productos.js)
document.addEventListener('DOMContentLoaded', () => {
  const cuerpo = document.getElementById('cuerpo-catalogo');
  const contador = document.getElementById('contador-resultados');
  const inputBuscar = document.getElementById('buscar');
  const selectCategoria = document.getElementById('filtro-categoria');
  const selectStock = document.getElementById('filtro-stock');
  const botonLimpiar = document.getElementById('boton-limpiar');

  const categorias = [...new Set(PRODUCTOS.map(p => p.categoria))].sort();
  categorias.forEach(cat => {
    const opcion = document.createElement('option');
    opcion.value = cat;
    opcion.textContent = cat;
    selectCategoria.appendChild(opcion);
  });

  function renderizar() {
    const texto = inputBuscar.value.trim().toLowerCase();
    const categoria = selectCategoria.value;
    const stock = selectStock.value;

    const filtrados = PRODUCTOS.filter(p => {
      const coincideTexto = !texto ||
        p.nombre.toLowerCase().includes(texto) ||
        p.marca.toLowerCase().includes(texto) ||
        p.codigo.toLowerCase().includes(texto);
      const coincideCategoria = !categoria || p.categoria === categoria;
      const coincideStock =
        !stock ||
        (stock === 'disponible' && p.stock > p.stockMin) ||
        (stock === 'bajo' && p.stock <= p.stockMin);
      return coincideTexto && coincideCategoria && coincideStock;
    });

    cuerpo.innerHTML = '';
    if (filtrados.length === 0) {
      cuerpo.innerHTML = '<tr><td colspan="7">No se encontraron productos con esos filtros.</td></tr>';
    } else {
      const fragmento = document.createDocumentFragment();
      filtrados.forEach(p => {
        const fila = document.createElement('tr');
        const bajoStock = p.stock <= p.stockMin;
        fila.innerHTML = `
          <td>${p.codigo}</td>
          <td>${p.nombre}</td>
          <td>${p.categoria} — ${p.subcategoria}</td>
          <td>${p.marca}</td>
          <td>${p.unidad}</td>
          <td>${formatoCLP(p.pVenta)}</td>
          <td><span class="etiqueta-stock ${bajoStock ? 'bajo' : 'ok'}">${p.stock} ${bajoStock ? '(bajo mínimo)' : 'disponibles'}</span></td>
        `;
        fragmento.appendChild(fila);
      });
      cuerpo.appendChild(fragmento);
    }

    contador.textContent = `${filtrados.length} de ${PRODUCTOS.length} productos mostrados`;
  }

  inputBuscar.addEventListener('input', renderizar);
  selectCategoria.addEventListener('change', renderizar);
  selectStock.addEventListener('change', renderizar);
  botonLimpiar.addEventListener('click', () => {
    inputBuscar.value = '';
    selectCategoria.value = '';
    selectStock.value = '';
    renderizar();
  });

  renderizar();
});
