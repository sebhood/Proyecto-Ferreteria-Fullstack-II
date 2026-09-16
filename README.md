# Ferretería Los Maestros — Tienda Online (Evaluación Parcial 1, DSY1104)

Proyecto frontend desarrollado con **HTML5, CSS3 y JavaScript** para la Evaluación Parcial 1 de Desarrollo Fullstack II, siguiendo las instrucciones detalladas del Anexo 1 (tienda + panel de administración) sobre el caso "Ferretería Los Maestros" (Forma E, La Serena).

No usa backend real: **`localStorage`** simula la persistencia de productos, usuarios, sesión y carrito de compras (ver `js/almacenamiento.js`).

## Estructura del proyecto

```
frontend/
├── index.html               # Home tienda: banner + productos destacados
├── productos.html            # Listado completo de productos con filtros
├── producto-detalle.html      # Detalle de producto + añadir al carrito
├── carrito.html                # Carrito de compras (localStorage)
├── registro.html                # Registro de nuevos clientes
├── login.html                    # Inicio de sesión
├── nosotros.html                  # Historia de la empresa y ubicación
├── blogs.html                      # Listado de noticias/blog
├── blog-detalle-1.html              # Detalle blog #1
├── blog-detalle-2.html               # Detalle blog #2
├── contacto.html                      # Formulario de contacto
├── admin/                               # Panel de administración (rol Administrador)
│   ├── index.html                        # Home admin con resumen
│   ├── productos.html                     # Mantenedor: listado de productos
│   ├── producto-form.html                  # Mantenedor: crear/editar producto
│   ├── usuarios.html                        # Mantenedor: listado de usuarios
│   └── usuario-form.html                     # Mantenedor: crear/editar usuario
├── css/
│   └── estilos.css                            # Hoja de estilos externa única
├── js/
│   ├── datos.js               # Catálogo semilla (85 productos) + regiones/comunas
│   ├── almacenamiento.js       # Capa de persistencia en localStorage
│   ├── validaciones.js          # Validadores reutilizables (RUT, dominio de correo, etc.)
│   ├── nav.js                     # Menú hamburguesa, contador de carrito, estado de sesión
│   ├── productos-ui.js              # Plantilla de tarjeta de producto
│   ├── inicio.js, productos-lista.js  # Renderizado de home y catálogo
│   ├── producto-detalle.js              # Vista de detalle
│   ├── carrito.js                         # Lógica del carrito
│   ├── registro.js, login.js, contacto.js   # Validación de formularios públicos
│   └── admin-*.js                             # Guardia de acceso y mantenedores admin
└── README.md
```

## Funcionalidades implementadas (según Anexo 1)

**Tienda (pública):**
- Home con menú (logo + carrito), banner y grilla de productos con precio.
- Listado de productos con búsqueda y filtro por categoría; detalle de producto con selector de cantidad.
- Carrito de compras persistido en `localStorage`, con edición de cantidades y confirmación de pedido.
- Registro e inicio de sesión, con sesión reflejada en el menú (nombre de usuario / cerrar sesión).
- Blog con listado y 2 detalles.
- Formulario de contacto.

**Validaciones JavaScript (reglas exactas del Anexo 1):**
- Login: correo obligatorio (máx. 100, solo `@duoc.cl`, `@profesor.duoc.cl` o `@gmail.com`), contraseña de 4 a 10 caracteres.
- Registro/Usuario: RUN chileno validado con dígito verificador (7 a 9 caracteres, sin puntos ni guion), nombre (máx. 50), apellidos (máx. 100), correo con dominio restringido, dirección (máx. 300), región/comuna dependientes.
- Contacto: nombre (máx. 100), correo con dominio restringido, comentario (máx. 500).
- Producto (admin): código (mín. 3), nombre (máx. 100), descripción opcional (máx. 500), precio (≥0, decimales), stock (entero ≥0), stock crítico opcional con alerta visual, categoría requerida.

**Panel de administración (protegido, solo rol Administrador):**
- Acceso restringido: redirige a `login.html` si no hay sesión de Administrador (`js/admin-guard.js`).
- Mantenedor de productos: listar, crear, editar, eliminar.
- Mantenedor de usuarios: listar, crear, editar, eliminar (con roles Administrador / Vendedor / Cliente).

**General:**
- HTML5 semántico (`header`, `nav`, `main`, `section`, `article`, `footer`) en todas las páginas.
- Hoja de estilos CSS externa única, con diseño responsive (móvil ≥360px, tablet ≥768px, escritorio ≥1280px).
- Repositorio Git con historial de commits descriptivos.

## Cuenta de prueba

Se inicializa automáticamente un usuario Administrador en `localStorage` la primera vez que se abre el sitio:

- **Correo:** `admin@duoc.cl`
- **Contraseña:** `admin123`

## Cómo ejecutar

No requiere instalación ni build. Abrir `index.html` en el navegador, o servir la carpeta con un servidor estático (ej. extensión "Live Server" de VS Code). **Nota:** si se abre con `file://` algunos navegadores restringen `localStorage` entre archivos; se recomienda usar un servidor local.

## Alcance y próximas etapas

Esta entrega corresponde a la Evaluación Parcial 1 (frontend estático con persistencia en `localStorage`). Las siguientes evaluaciones del examen transversal incorporarán el stack completo exigido por el docente: backend con microservicios Spring Boot, base de datos relacional, autenticación real con JWT, y mapa de cobertura de despacho (Leaflet/Google Maps).
