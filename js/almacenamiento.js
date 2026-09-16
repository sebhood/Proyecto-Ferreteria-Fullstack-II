// Capa de persistencia del sitio usando localStorage.
// Simula el "backend" para esta entrega estática: productos, usuarios, sesión y carrito
// se guardan en el navegador y sobreviven entre páginas y recargas.
// Referencia: https://developer.mozilla.org/es/docs/Web/API/Window/localStorage

const CLAVES = {
  PRODUCTOS: 'ferreteria_productos',
  USUARIOS: 'ferreteria_usuarios',
  SESION: 'ferreteria_sesion',
  CARRITO: 'ferreteria_carrito',
};

// ---------- Productos ----------
function obtenerProductos() {
  const guardado = localStorage.getItem(CLAVES.PRODUCTOS);
  if (guardado) return JSON.parse(guardado);
  localStorage.setItem(CLAVES.PRODUCTOS, JSON.stringify(PRODUCTOS_SEMILLA));
  return PRODUCTOS_SEMILLA;
}

function guardarProductos(lista) {
  localStorage.setItem(CLAVES.PRODUCTOS, JSON.stringify(lista));
}

function obtenerProductoPorCodigo(codigo) {
  return obtenerProductos().find(p => p.codigo === codigo) || null;
}

// ---------- Usuarios ----------
function obtenerUsuarios() {
  const guardado = localStorage.getItem(CLAVES.USUARIOS);
  if (guardado) return JSON.parse(guardado);
  const usuarioAdminSemilla = [{
    run: '111111111',
    nombre: 'Admin',
    apellidos: 'Sistema',
    correo: 'admin@duoc.cl',
    clave: 'admin123',
    tipoUsuario: 'Administrador',
    region: 'Región de Coquimbo',
    comuna: 'La Serena',
    direccion: 'Av. Francisco de Aguirre 1234',
  }];
  localStorage.setItem(CLAVES.USUARIOS, JSON.stringify(usuarioAdminSemilla));
  return usuarioAdminSemilla;
}

function guardarUsuarios(lista) {
  localStorage.setItem(CLAVES.USUARIOS, JSON.stringify(lista));
}

function obtenerUsuarioPorRun(run) {
  return obtenerUsuarios().find(u => u.run === run) || null;
}

function obtenerUsuarioPorCorreo(correo) {
  return obtenerUsuarios().find(u => u.correo.toLowerCase() === correo.toLowerCase()) || null;
}

// ---------- Sesión ----------
function obtenerSesion() {
  const guardado = localStorage.getItem(CLAVES.SESION);
  return guardado ? JSON.parse(guardado) : null;
}

function iniciarSesion(usuario) {
  localStorage.setItem(CLAVES.SESION, JSON.stringify({
    run: usuario.run,
    nombre: usuario.nombre,
    correo: usuario.correo,
    tipoUsuario: usuario.tipoUsuario,
  }));
}

function cerrarSesion() {
  localStorage.removeItem(CLAVES.SESION);
}

// ---------- Carrito ----------
function obtenerCarrito() {
  const guardado = localStorage.getItem(CLAVES.CARRITO);
  return guardado ? JSON.parse(guardado) : [];
}

function guardarCarrito(items) {
  localStorage.setItem(CLAVES.CARRITO, JSON.stringify(items));
}

function agregarAlCarrito(codigo, cantidad) {
  const carrito = obtenerCarrito();
  const existente = carrito.find(i => i.codigo === codigo);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ codigo, cantidad });
  }
  guardarCarrito(carrito);
}

function quitarDelCarrito(codigo) {
  guardarCarrito(obtenerCarrito().filter(i => i.codigo !== codigo));
}

function actualizarCantidadCarrito(codigo, cantidad) {
  const carrito = obtenerCarrito();
  const item = carrito.find(i => i.codigo === codigo);
  if (item) {
    item.cantidad = cantidad;
    guardarCarrito(carrito);
  }
}

function vaciarCarrito() {
  guardarCarrito([]);
}

function totalItemsCarrito() {
  return obtenerCarrito().reduce((total, item) => total + item.cantidad, 0);
}
