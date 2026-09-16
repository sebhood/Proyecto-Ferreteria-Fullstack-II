// Validación y guardado del formulario de registro de clientes.
document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('form-registro');
  const alerta = document.getElementById('alerta-formulario');
  const selectRegion = document.getElementById('region');
  const selectComuna = document.getElementById('comuna');

  Object.keys(REGIONES).forEach(region => {
    const opcion = document.createElement('option');
    opcion.value = region;
    opcion.textContent = region;
    selectRegion.appendChild(opcion);
  });

  selectRegion.addEventListener('change', () => {
    const comunas = REGIONES[selectRegion.value] || [];
    selectComuna.innerHTML = '<option value="">Seleccione la comuna</option>' +
      comunas.map(c => `<option value="${c}">${c}</option>`).join('');
    selectComuna.disabled = comunas.length === 0;
  });

  const campos = {
    run: document.getElementById('run'),
    nombre: document.getElementById('nombre'),
    apellidos: document.getElementById('apellidos'),
    correo: document.getElementById('correo'),
    clave: document.getElementById('clave'),
    confirmarClave: document.getElementById('confirmar-clave'),
    telefono: document.getElementById('telefono'),
    region: selectRegion,
    comuna: selectComuna,
    direccion: document.getElementById('direccion'),
  };

  function validarRun() {
    const valor = campos.run.value.trim().toUpperCase();
    if (!valor) return marcarError(formulario, 'run', 'El RUN es obligatorio.'), false;
    if (valor.length < 7 || valor.length > 9) return marcarError(formulario, 'run', 'El RUN debe tener entre 7 y 9 caracteres.'), false;
    if (!validarRut(valor)) return marcarError(formulario, 'run', 'El RUN ingresado no es válido.'), false;
    if (obtenerUsuarioPorRun(valor)) return marcarError(formulario, 'run', 'Ya existe una cuenta registrada con este RUN.'), false;
    marcarValido(formulario, 'run');
    return true;
  }

  function validarNombre() {
    if (!campos.nombre.value.trim()) return marcarError(formulario, 'nombre', 'El nombre es obligatorio.'), false;
    if (campos.nombre.value.trim().length > 50) return marcarError(formulario, 'nombre', 'Máximo 50 caracteres.'), false;
    marcarValido(formulario, 'nombre');
    return true;
  }

  function validarApellidos() {
    if (!campos.apellidos.value.trim()) return marcarError(formulario, 'apellidos', 'Los apellidos son obligatorios.'), false;
    if (campos.apellidos.value.trim().length > 100) return marcarError(formulario, 'apellidos', 'Máximo 100 caracteres.'), false;
    marcarValido(formulario, 'apellidos');
    return true;
  }

  function validarCorreo() {
    const valor = campos.correo.value.trim();
    if (!valor) return marcarError(formulario, 'correo', 'El correo es obligatorio.'), false;
    if (valor.length > 100) return marcarError(formulario, 'correo', 'Máximo 100 caracteres.'), false;
    if (!correoConDominioValido(valor)) return marcarError(formulario, 'correo', 'Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.'), false;
    if (obtenerUsuarioPorCorreo(valor)) return marcarError(formulario, 'correo', 'Ya existe una cuenta registrada con este correo.'), false;
    marcarValido(formulario, 'correo');
    return true;
  }

  function validarClave() {
    const valor = campos.clave.value;
    if (valor.length < 4 || valor.length > 10) return marcarError(formulario, 'clave', 'La contraseña debe tener entre 4 y 10 caracteres.'), false;
    marcarValido(formulario, 'clave');
    return true;
  }

  function validarConfirmarClave() {
    if (campos.confirmarClave.value !== campos.clave.value || !campos.confirmarClave.value) {
      marcarError(formulario, 'confirmar-clave', 'Las contraseñas no coinciden.');
      return false;
    }
    marcarValido(formulario, 'confirmar-clave');
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

  campos.run.addEventListener('blur', validarRun);
  campos.nombre.addEventListener('blur', validarNombre);
  campos.apellidos.addEventListener('blur', validarApellidos);
  campos.correo.addEventListener('blur', validarCorreo);
  campos.clave.addEventListener('input', validarClave);
  campos.confirmarClave.addEventListener('input', validarConfirmarClave);
  campos.region.addEventListener('change', validarRegion);
  campos.comuna.addEventListener('change', validarComuna);
  campos.direccion.addEventListener('blur', validarDireccion);

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const valido = [
      validarRun(), validarNombre(), validarApellidos(), validarCorreo(),
      validarClave(), validarConfirmarClave(), validarRegion(), validarComuna(), validarDireccion(),
    ].every(Boolean);

    if (!valido) {
      mostrarAlerta(alerta, 'error', 'Revisa los campos marcados en rojo antes de continuar.');
      return;
    }

    const usuarios = obtenerUsuarios();
    usuarios.push({
      run: campos.run.value.trim().toUpperCase(),
      nombre: campos.nombre.value.trim(),
      apellidos: campos.apellidos.value.trim(),
      correo: campos.correo.value.trim(),
      clave: campos.clave.value,
      telefono: campos.telefono.value.trim(),
      tipoUsuario: 'Cliente',
      region: campos.region.value,
      comuna: campos.comuna.value,
      direccion: campos.direccion.value.trim(),
    });
    guardarUsuarios(usuarios);

    mostrarAlerta(alerta, 'exito', '¡Cuenta creada con éxito! Ya puedes iniciar sesión.');
    formulario.reset();
    selectComuna.disabled = true;
    setTimeout(() => { window.location.href = 'login.html'; }, 1500);
  });
});
