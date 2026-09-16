// Listado de usuarios del panel de administración, con acciones editar/eliminar.
document.addEventListener('DOMContentLoaded', () => {
  const cuerpo = document.getElementById('cuerpo-usuarios');
  const sesionActual = obtenerSesion();

  function render() {
    const usuarios = obtenerUsuarios();
    cuerpo.innerHTML = usuarios.map(u => `
      <tr>
        <td>${u.run}</td>
        <td>${u.nombre} ${u.apellidos || ''}</td>
        <td>${u.correo}</td>
        <td><span class="insignia-rol">${u.tipoUsuario}</span></td>
        <td>${u.comuna || '-'}</td>
        <td class="acciones-tabla">
          <a class="boton boton-outline" href="usuario-form.html?run=${encodeURIComponent(u.run)}">Editar</a>
          <button type="button" class="boton boton-peligro" data-eliminar="${u.run}" ${u.run === sesionActual.run ? 'disabled title="No puedes eliminar tu propia cuenta"' : ''}>Eliminar</button>
        </td>
      </tr>
    `).join('');

    cuerpo.querySelectorAll('[data-eliminar]:not([disabled])').forEach(boton => {
      boton.addEventListener('click', () => {
        if (!confirm('¿Eliminar este usuario del sistema?')) return;
        const usuarios = obtenerUsuarios().filter(u => u.run !== boton.dataset.eliminar);
        guardarUsuarios(usuarios);
        render();
      });
    });
  }

  render();
});
