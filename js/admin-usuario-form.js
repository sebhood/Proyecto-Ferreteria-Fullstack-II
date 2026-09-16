// Formulario de creación/edición de usuario (mantenedor del panel admin).
// Reglas según Anexo 1: RUN validado (7-9, sin puntos/guion), nombre (max 50),
// apellidos (max 100), correo con dominio restringido (max 100), fecha nacimiento
// opcional, tipo de usuario (Administrador/Vendedor/Cliente), región/comuna
// dependientes, dirección (max 300, requerida).
document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('form-usuario');
  const alerta = document.getElementById('alerta-formulario');
  const parametros = new URLSearchParams(window.location.search);
  const runEdicion = parametros.get('run');
  const selectRegion = document.getElementById('region');
  const selectComuna = document.getElementById('comuna');

  Object.keys(REGIONES).forEach(region => {
    const opcion = document.createElement('option');
    opcion.value = region;
    opcion.textContent = region;
    selectRegion.appendChild(opcion);
  });

  function cargarComunas(regionSeleccionada, comunaAMarcar) {
    const comunas = REGIONES[regionSeleccionada] || [];
    selectComuna.innerHTML = '<option value="">Seleccione la comuna</option>' +
      comunas.map(c => `<option value="${c}" ${c === comunaAMarcar ? 'selected' : ''}>${c}</option>`).join('');
    selectComuna.disabled = comunas.length === 0;
  }

  selectRegion.addEventListener('change', () => cargarComunas(selectRegion.value));

  const campos = {
    run: document.getElementById('run'),
    nombre: document.getElementById('nombre'),
    apellidos: document.getElementById('apellidos'),
    correo: document.getElementById('correo'),
    tipoUsuario: document.getElementById('tipo-usuario'),
    region: selectRegion,
    comuna: selectComuna,
    direccion: document.getElementById('direccion'),
    clave: document.getElementById('clave'),
  };

  if (runEdicion) {
    const usuario = obtenerUsuarioPorRun(runEdicion);
    if (usuario) {
      document.getElementById('titulo-formulario').textContent = `Editar usuario: ${usuario.nombre}`;
      document.getElementById('run-original').value = usuario.run;
      campos.run.value = usuario.run;
      campos.run.readOnly = true;
      campos.nombre.value = usuario.nombre;
      campos.apellidos.value = usuario.apellidos || '';
      campos.correo.value = usuario.correo;
      document.getElementById('fecha-nacimiento').value = usuario.fechaNacimiento || '';
      campos.tipoUsuario.value = usuario.tipoUsuario;
      campos.region.value = usuario.region || '';
      cargarComunas(usuario.region, usuario.comuna);
      campos.direccion.value = usuario.direccion || '';
      campos.clave.removeAttribute('required');
      campos.clave.placeholder = 'Dejar en blanco para no cambiarla';
    }
  }

  function validarRun() {
    const valor = campos.run.value.trim().toUpperCase();
    if (valor.length < 7 || valor.length > 9) return marcarError(formulario, 'run', 'El RUN debe tener entre 7 y 9 caracteres.'), false;
    if (!validarRut(valor)) return marcarError(formulario, 'run', 'El RUN ingresado no es válido.'), false;
    const runOriginal = document.getElementById('run-original').value;
    if (obtenerUsuarioPorRun(valor) && valor !== runOriginal) return marcarError(formulario, 'run', 'Ya existe un usuario con este RUN.'), false;
    marcarValido(formulario, 'run');
    return true;
  }

  function validarNombre() {
    const valor = campos.nombre.value.trim();
    if (!valor) return marcarError(formulario, 'nombre', 'El nombre es obligatorio.'), false;
    if (valor.length > 50) return marcarError(formulario, 'nombre', 'Máximo 50 caracteres.'), false;
    marcarValido(formulario, 'nombre');
    return true;
  }

  function validarApellidos() {
    const valor = campos.apellidos.value.trim();
    if (!valor) return marcarError(formulario, 'apellidos', 'Los apellidos son obligatorios.'), false;
    if (valor.length > 100) return marcarError(formulario, 'apellidos', 'Máximo 100 caracteres.'), false;
    marcarValido(formulario, 'apellidos');
    return true;
  }

  function validarCorreo() {
    const valor = campos.correo.value.trim();
    if (!valor) return marcarError(formulario, 'correo', 'El correo es obligatorio.'), false;
    if (valor.length > 100) return marcarError(formulario, 'correo', 'Máximo 100 caracteres.'), false;
    if (!correoConDominioValido(valor)) return marcarError(formulario, 'correo', 'Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.'), false;
    const runOriginal = document.getElementById('run-original').value;
    const existente = obtenerUsuarioPorCorreo(valor);
    if (existente && existente.run !== runOriginal) return marcarError(formulario, 'correo', 'Ya existe un usuario con este correo.'), false;
    marcarValido(formulario, 'correo');
    return true;
  }

  function validarTipoUsuario() {
    if (!campos.tipoUsuario.value) return marcarError(formulario, 'tipo-usuario', 'Selecciona un tipo de usuario.'), false;
    marcarValido(formulario, 'tipo-usuario');
    return true;
  }

  function validarRegion() {
    if (!campos.region.value) return marcarError(formulario, 'region', 'Selecciona una región.'), false;
    marcarValido(formulario, 'region');
    return true;
  }

  function validarComuna() {
    if (!campos.comuna.value) return marcarError(formulario, 'comuna', 'Selecciona una comuna.'), false;
    marcarValido(formulario, 'comuna');
    return true;
  }

  function validarDireccion() {
    const valor = campos.direccion.value.trim();
    if (!valor) return marcarError(formulario, 'direccion', 'La dirección es obligatoria.'), false;
    if (valor.length > 300) return marcarError(formulario, 'direccion', 'Máximo 300 caracteres.'), false;
    marcarValido(formulario, 'direccion');
    return true;
  }

  function validarClave() {
    if (!campos.clave.hasAttribute('required') && campos.clave.value === '') {
      marcarValido(formulario, 'clave');
      return true;
    }
    if (campos.clave.value.length < 4 || campos.clave.value.length > 10) {
      return marcarError(formulario, 'clave', 'La contraseña debe tener entre 4 y 10 caracteres.'), false;
    }
    marcarValido(formulario, 'clave');
    return true;
  }

  campos.run.addEventListener('blur', validarRun);
  campos.nombre.addEventListener('blur', validarNombre);
  campos.apellidos.addEventListener('blur', validarApellidos);
  campos.correo.addEventListener('blur', validarCorreo);
  campos.tipoUsuario.addEventListener('change', validarTipoUsuario);
  campos.region.addEventListener('change', validarRegion);
  campos.comuna.addEventListener('change', validarComuna);
  campos.direccion.addEventListener('blur', validarDireccion);
  campos.clave.addEventListener('input', validarClave);

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const valido = [
      validarRun(), validarNombre(), validarApellidos(), validarCorreo(),
      validarTipoUsuario(), validarRegion(), validarComuna(), validarDireccion(), validarClave(),
    ].every(Boolean);

    if (!valido) {
      mostrarAlerta(alerta, 'error', 'Revisa los campos marcados en rojo.');
      return;
    }

    const runOriginal = document.getElementById('run-original').value;
    const usuarios = obtenerUsuarios();
    const datosUsuario = {
      run: campos.run.value.trim().toUpperCase(),
      nombre: campos.nombre.value.trim(),
      apellidos: campos.apellidos.value.trim(),
      correo: campos.correo.value.trim(),
      fechaNacimiento: document.getElementById('fecha-nacimiento').value,
      tipoUsuario: campos.tipoUsuario.value,
      region: campos.region.value,
      comuna: campos.comuna.value,
      direccion: campos.direccion.value.trim(),
    };
    if (campos.clave.value) datosUsuario.clave = campos.clave.value;

    let listaActualizada;
    if (runOriginal) {
      listaActualizada = usuarios.map(u => u.run === runOriginal ? { ...u, ...datosUsuario } : u);
    } else {
      datosUsuario.clave = campos.clave.value;
      listaActualizada = [...usuarios, datosUsuario];
    }
    guardarUsuarios(listaActualizada);

    mostrarAlerta(alerta, 'exito', 'Usuario guardado correctamente.');
    setTimeout(() => { window.location.href = 'usuarios.html'; }, 900);
  });
});
