// Formulario de creación/edición de producto (mantenedor del panel admin).
// Reglas de validación según Anexo 1: código (texto, min 3), nombre (max 100),
// descripción opcional (max 500), precio (>=0, decimales), stock (entero >=0),
// stock crítico opcional (entero >=0), categoría requerida, imagen opcional.
document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('form-producto');
  const alerta = document.getElementById('alerta-formulario');
  const parametros = new URLSearchParams(window.location.search);
  const codigoEdicion = parametros.get('codigo');

  const campos = {
    codigo: document.getElementById('codigo'),
    nombre: document.getElementById('nombre'),
    descripcion: document.getElementById('descripcion'),
    precio: document.getElementById('precio'),
    categoria: document.getElementById('categoria'),
    stock: document.getElementById('stock'),
    stockCritico: document.getElementById('stock-critico'),
    imagen: document.getElementById('imagen'),
  };

  if (codigoEdicion) {
    const producto = obtenerProductoPorCodigo(codigoEdicion);
    if (producto) {
      document.getElementById('titulo-formulario').textContent = `Editar producto: ${producto.nombre}`;
      document.getElementById('codigo-original').value = producto.codigo;
      campos.codigo.value = producto.codigo;
      campos.codigo.readOnly = true;
      campos.nombre.value = producto.nombre;
      campos.descripcion.value = producto.descripcion || '';
      campos.precio.value = producto.precio;
      campos.categoria.value = producto.categoria;
      campos.stock.value = producto.stock;
      campos.stockCritico.value = producto.stockCritico ?? '';
      campos.imagen.value = producto.imagen || '';
    }
  }

  function validarCodigo() {
    const valor = campos.codigo.value.trim();
    if (valor.length < 3) return marcarError(formulario, 'codigo', 'El código debe tener al menos 3 caracteres.'), false;
    const codigoOriginal = document.getElementById('codigo-original').value;
    const existente = obtenerProductoPorCodigo(valor);
    if (existente && valor !== codigoOriginal) return marcarError(formulario, 'codigo', 'Ya existe un producto con este código.'), false;
    marcarValido(formulario, 'codigo');
    return true;
  }

  function validarNombre() {
    const valor = campos.nombre.value.trim();
    if (!valor) return marcarError(formulario, 'nombre', 'El nombre es obligatorio.'), false;
    if (valor.length > 100) return marcarError(formulario, 'nombre', 'Máximo 100 caracteres.'), false;
    marcarValido(formulario, 'nombre');
    return true;
  }

  function validarDescripcion() {
    if (campos.descripcion.value.length > 500) return marcarError(formulario, 'descripcion', 'Máximo 500 caracteres.'), false;
    marcarValido(formulario, 'descripcion');
    return true;
  }

  function validarPrecio() {
    const valor = Number(campos.precio.value);
    if (campos.precio.value === '' || Number.isNaN(valor) || valor < 0) {
      return marcarError(formulario, 'precio', 'El precio es obligatorio y no puede ser negativo.'), false;
    }
    marcarValido(formulario, 'precio');
    return true;
  }

  function validarCategoria() {
    if (!campos.categoria.value) return marcarError(formulario, 'categoria', 'Selecciona una categoría.'), false;
    marcarValido(formulario, 'categoria');
    return true;
  }

  function validarStock() {
    const valor = Number(campos.stock.value);
    if (campos.stock.value === '' || !Number.isInteger(valor) || valor < 0) {
      return marcarError(formulario, 'stock', 'El stock es obligatorio, debe ser un entero mayor o igual a 0.'), false;
    }
    marcarValido(formulario, 'stock');
    return true;
  }

  function validarStockCritico() {
    if (campos.stockCritico.value === '') { marcarValido(formulario, 'stock-critico'); return true; }
    const valor = Number(campos.stockCritico.value);
    if (!Number.isInteger(valor) || valor < 0) {
      return marcarError(formulario, 'stock-critico', 'Debe ser un número entero mayor o igual a 0.'), false;
    }
    marcarValido(formulario, 'stock-critico');
    return true;
  }

  campos.codigo.addEventListener('blur', validarCodigo);
  campos.nombre.addEventListener('blur', validarNombre);
  campos.descripcion.addEventListener('input', validarDescripcion);
  campos.precio.addEventListener('input', validarPrecio);
  campos.categoria.addEventListener('change', validarCategoria);
  campos.stock.addEventListener('input', validarStock);
  campos.stockCritico.addEventListener('input', validarStockCritico);

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const valido = [
      validarCodigo(), validarNombre(), validarDescripcion(),
      validarPrecio(), validarCategoria(), validarStock(), validarStockCritico(),
    ].every(Boolean);

    if (!valido) {
      mostrarAlerta(alerta, 'error', 'Revisa los campos marcados en rojo.');
      return;
    }

    const productos = obtenerProductos();
    const codigoOriginal = document.getElementById('codigo-original').value;
    const nuevoProducto = {
      codigo: campos.codigo.value.trim(),
      categoria: campos.categoria.value,
      subcategoria: '',
      nombre: campos.nombre.value.trim(),
      descripcion: campos.descripcion.value.trim(),
      marca: '',
      unidad: 'Unidad',
      precio: Number(campos.precio.value),
      stock: Number(campos.stock.value),
      stockCritico: campos.stockCritico.value === '' ? null : Number(campos.stockCritico.value),
      imagen: campos.imagen.value.trim(),
    };

    let listaActualizada;
    if (codigoOriginal) {
      listaActualizada = productos.map(p => p.codigo === codigoOriginal ? { ...p, ...nuevoProducto } : p);
    } else {
      listaActualizada = [...productos, nuevoProducto];
    }
    guardarProductos(listaActualizada);

    mostrarAlerta(alerta, 'exito', 'Producto guardado correctamente.');
    setTimeout(() => { window.location.href = 'productos.html'; }, 900);
  });
});
