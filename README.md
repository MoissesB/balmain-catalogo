# BALMAIN Eyewear B2B

Sitio estatico HTML/CSS/JavaScript para publicar en GitHub Pages como catalogo B2B premium de Balmain Eyewear para Innova.

## Paginas

- `index.html`: landing B2B con historia, ADN, materiales, categorias, destacados y contacto Innova.
- `catalogo.html`: catalogo general con filtros por categoria y busqueda interna.
- `producto.html?slug=b-aura`: ficha editorial dinamica de producto.
- `pages/categorias/*.html`: paginas por categoria.

## Datos

- Productos: `data/productos.json`.
- Textos generales, categorias y contacto: `data/contenido.json`.
- No hay precios visibles.

## Agregar una imagen a un producto

1. Ubica la categoria, producto y variante en `assets/images/productos/`.
2. Agrega la imagen dentro de la carpeta de la variante, por ejemplo `assets/images/productos/fashion-drops/b-aura/bps-200a-51/`.
3. Edita la variante correspondiente en `data/productos.json` y agrega la ruta relativa en `imagenes.frontal`, `imagenes.lateral`, `imagenes.detalle` o `imagenes.hero`.

## Agregar o editar un producto

1. Abre `data/productos.json`.
2. Duplica un objeto de producto existente.
3. Cambia `slug`, `nombre`, `categoria`, `descripcion`, `especificaciones` y `variantes`.
4. Usa rutas relativas, nunca rutas locales tipo `C:\`.

## Cambiar textos ES / EN

- Textos generales: `data/contenido.json`.
- Textos por producto: `data/productos.json`, campos `descripcion.es`, `descripcion.en`, `color.es` y `color.en`.
- Textos fijos de interfaz: atributos `data-text-es` y `data-text-en` en los HTML.

## Publicacion

El repositorio esta preparado para GitHub Pages. Antes de publicar, revisar `git status`, confirmar que no entren videos pesados y subir con:

```bash
git add .
git commit -m "Construir catalogo B2B premium Balmain Balmain"
git push
```

