# Panel temporal B2B

Este sitio funciona en GitHub Pages, por lo que no tiene backend ni base de datos.
El panel temporal usa `localStorage` para pruebas visuales en el navegador actual.

## Acceso temporal

1. Abrir el buscador del sitio.
2. Escribir exactamente `innova-panel`.
3. Presionar Enter.
4. La primera vez, crear una clave temporal local.
5. En siguientes accesos, usar esa misma clave en ese navegador.

La palabra de activacion no es una medida de seguridad real. Todo JavaScript publicado en GitHub Pages puede inspeccionarse.

## Estados disponibles

- `normal`: producto visible sin etiqueta.
- `hidden`: producto oculto en Home, catalogo, categorias y buscador.
- `soldout`: producto visible con etiqueta "Agotado" y CTA de proxima disponibilidad.
- `lowstock`: producto visible con etiqueta "Pocas unidades".

## Como publicar cambios para todos

1. Marcar productos en el panel.
2. Usar "Exportar JSON".
3. Actualizar `data/inventario.json` con el JSON exportado.
4. Hacer commit y push.

Solo despues del commit y push los estados quedan visibles para todas las personas en GitHub Pages o en un dominio propio conectado a GitHub Pages.

## Camino futuro

Para administracion real se necesita un backend, CMS, base de datos o servicio externo autenticado. En ese caso el panel podria guardar cambios publicos sin editar archivos manualmente.
