# Ferretería Los Maestros — Sitio Web (Evaluación Parcial 1, DSY1104)

Proyecto frontend estático desarrollado con **HTML5, CSS3 y JavaScript** para la Evaluación Parcial 1 de Desarrollo Fullstack II. Corresponde a la Forma E del caso "Ferretería Los Maestros" (La Serena).

## Estructura del proyecto

```
frontend/
├── index.html          # Página de inicio (hero, categorías, video institucional)
├── catalogo.html        # Catálogo de productos con filtros dinámicos y stock
├── nosotros.html         # Historia de la empresa, actores del negocio y mapa de ubicación
├── cotizar.html          # Formulario de solicitud de cotización con validación JS
├── css/
│   └── estilos.css       # Hoja de estilos externa única para todo el sitio
├── js/
│   ├── comun.js           # Menú hamburguesa responsive y año dinámico del footer
│   ├── productos.js        # Datos del catálogo (extraídos del Excel oficial del caso)
│   ├── catalogo.js          # Renderizado y filtrado de la tabla de productos
│   └── validacion.js         # Validaciones del formulario de cotización
└── README.md
```

## Funcionalidades implementadas

- Estructura HTML5 semántica: `header`, `nav`, `main`, `section`, `article`, `footer` en todas las páginas.
- Navegación por hipervínculos entre las 4 páginas, con menú responsive (hamburguesa en móvil).
- Imágenes, video embebido (YouTube) y mapa embebido (OpenStreetMap).
- Catálogo dinámico: búsqueda por texto, filtro por categoría y por disponibilidad de stock.
- Formulario de cotización con validación en JavaScript: campos obligatorios, formato de correo y teléfono chileno, cantidad numérica, checkbox de consentimiento, mensajes de error personalizados y sugerencias de producto (`datalist`) basadas en el catálogo.
- Hoja de estilos CSS externa aplicada de forma consistente en todas las páginas, con diseño responsive (móvil / tablet / escritorio).

## Cómo ejecutar

No requiere instalación ni build: abrir `index.html` directamente en el navegador, o servir la carpeta con cualquier servidor estático (ej. extensión "Live Server" de VS Code).

## Contexto del caso

Ferretería Los Maestros es un negocio familiar en La Serena con 22 años de trayectoria y un catálogo de más de 800 referencias. Este sitio corresponde a la primera entrega del proyecto transversal (bases del frontend); las siguientes etapas del examen incorporarán el stack completo definido en el documento de contexto (React, Spring Boot, base de datos, autenticación por roles, mapa de cobertura y flujo de pedidos).
