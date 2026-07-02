(function () {
  const cache = {
    products: null,
    content: null,
  };

  function root() {
    return document.body.dataset.base || "";
  }

  function url(path) {
    return root() + path;
  }

  function asset(path) {
    if (!path) return "";
    if (/^(https?:)?\/\//.test(path)) return path;
    return url(path);
  }

  async function getProducts() {
    if (!cache.products) {
      const response = await fetch(url("data/productos.json"));
      const data = await response.json();
      cache.products = data.productos || [];
    }
    return cache.products;
  }

  async function getContent() {
    if (!cache.content) {
      const response = await fetch(url("data/contenido.json"));
      cache.content = await response.json();
    }
    return cache.content;
  }

  function lang() {
    return window.BalmainI18n ? window.BalmainI18n.current() : "es";
  }

  function pick(value) {
    return window.BalmainI18n ? window.BalmainI18n.pick(value) : value?.es || value?.en || value || "";
  }

  function imageFor(product) {
    for (const variant of product.variantes || []) {
      const images = variant.imagenes || {};
      const candidate = images.hero || images.frontal || images.lateral || images.detalle;
      if (candidate) return candidate;
    }
    return "";
  }

  function allImages(product) {
    const seen = new Set();
    const images = [];
    for (const variant of product.variantes || []) {
      const map = variant.imagenes || {};
      ["hero", "frontal", "lateral", "detalle", "marketing", "case"].forEach((slot) => {
        if (map[slot] && !seen.has(map[slot])) {
          seen.add(map[slot]);
          images.push({ src: map[slot], label: `${variant.codigo} ${slot}` });
        }
      });
    }
    return images;
  }

  function placeholder(label) {
    return `<div class="image-placeholder"><span>${label || "BALMAIN"}</span></div>`;
  }

  function productHref(slug) {
    return url(`producto.html?slug=${encodeURIComponent(slug)}`);
  }

  function productCard(product, compact = false) {
    const image = imageFor(product);
    const variantCodes = (product.variantes || []).map((v) => v.codigo).slice(0, 4).join(" · ");
    const hiddenCount = Math.max(0, (product.variantes || []).length - 4);
    const title = product.nombre;
    const category = pick(product.categoriaLabel);
    const src = image ? `<img src="${asset(image)}" alt="${title} ${category}" loading="lazy">` : placeholder(title);
    return `
      <article class="product-card ${compact ? "compact" : ""}">
        <a class="product-media" href="${productHref(product.slug)}" aria-label="${title}">
          ${src}
          ${product.nuevo ? `<span class="tag">SS26</span>` : ""}
        </a>
        <div class="product-card-copy">
          <p class="eyebrow">${category}</p>
          <h3><a href="${productHref(product.slug)}">${title}</a></h3>
          <p>${(product.variantes || []).length} ${lang() === "en" ? "variants" : "variantes"}</p>
          <small>${variantCodes}${hiddenCount ? ` +${hiddenCount}` : ""}</small>
          <div class="card-actions">
            <a class="text-link" href="${productHref(product.slug)}">${lang() === "en" ? "View details" : "Ver detalles"}</a>
            <a class="text-link muted" href="${url("index.html#contacto")}">${lang() === "en" ? "Request info" : "Solicitar información"}</a>
          </div>
        </div>
      </article>
    `;
  }

  async function renderHome() {
    const [products, content] = await Promise.all([getProducts(), getContent()]);
    const categoriesTarget = document.getElementById("homeCategories");
    const featuredTarget = document.getElementById("featuredProducts");
    if (categoriesTarget) {
      const grouped = products.reduce((acc, product) => {
        acc[product.categoria] = (acc[product.categoria] || 0) + 1;
        return acc;
      }, {});
      categoriesTarget.innerHTML = Object.values(content.categorias)
        .map((category) => {
          const href = url(`pages/categorias/${category.slug}.html`);
          return `
            <article class="category-card">
              <a href="${href}" class="category-media">
                ${category.imagen ? `<img src="${asset(category.imagen)}" alt="${pick(category.label)}">` : placeholder(pick(category.label))}
              </a>
              <div>
                <p class="eyebrow">${grouped[category.slug] || 0} ${lang() === "en" ? "models" : "modelos"}</p>
                <h3>${pick(category.label)}</h3>
                <p>${pick(category.descripcion)}</p>
                <a class="text-link" href="${href}">${lang() === "en" ? "View category" : "Ver categoría"}</a>
              </div>
            </article>
          `;
        })
        .join("");
    }
    if (featuredTarget) {
      featuredTarget.innerHTML = products.filter((p) => p.destacado).slice(0, 12).map((p) => productCard(p, true)).join("");
    }
  }

  function productSearchText(product) {
    const specs = Object.values(product.especificaciones || {}).join(" ");
    const variants = (product.variantes || [])
      .map((variant) => `${variant.codigo} ${pick(variant.color)}`)
      .join(" ");
    return `${product.nombre} ${pick(product.categoriaLabel)} ${product.categoria} ${specs} ${variants}`.toLowerCase();
  }

  async function renderCatalog() {
    const products = await getProducts();
    const grid = document.getElementById("catalogGrid");
    if (!grid) return;
    const input = document.getElementById("catalogSearch");
    const count = document.getElementById("catalogCount");
    const empty = document.getElementById("catalogEmpty");
    let activeCategory = "all";

    function draw() {
      const query = (input?.value || "").trim().toLowerCase();
      const filtered = products.filter((product) => {
        const categoryOk = activeCategory === "all" || product.categoria === activeCategory;
        const queryOk = !query || productSearchText(product).includes(query);
        return categoryOk && queryOk;
      });
      grid.innerHTML = filtered.map((p) => productCard(p)).join("");
      if (count) count.textContent = `${filtered.length} ${lang() === "en" ? "models" : "modelos"}`;
      if (empty) empty.hidden = filtered.length > 0;
    }

    document.querySelectorAll("[data-filter-category]").forEach((button) => {
      button.addEventListener("click", () => {
        activeCategory = button.dataset.filterCategory || "all";
        document.querySelectorAll("[data-filter-category]").forEach((item) => item.classList.toggle("active", item === button));
        draw();
      });
    });
    input?.addEventListener("input", draw);
    window.addEventListener("balmain:languagechange", draw);
    draw();
  }

  async function renderCategory() {
    const category = document.body.dataset.category;
    const products = (await getProducts()).filter((product) => product.categoria === category);
    const target = document.getElementById("categoryProducts");
    if (target) target.innerHTML = products.map((p) => productCard(p)).join("");
  }

  function specsMarkup(product) {
    const labels = {
      frame: lang() === "en" ? "Frame" : "Montura",
      temple: lang() === "en" ? "Temple" : "Varilla",
      nosePads: lang() === "en" ? "Nose pads" : "Plaquetas",
      lenses: lang() === "en" ? "Lenses" : "Lentes",
      size: lang() === "en" ? "Size" : "Medida",
      country: lang() === "en" ? "Country of origin" : "País de origen",
    };
    return Object.entries(labels)
      .map(([key, label]) => {
        const value = product.especificaciones?.[key] || (lang() === "en" ? "Pending confirmation" : "Pendiente de confirmar");
        return `<div><dt>${label}</dt><dd>${value}</dd></div>`;
      })
      .join("");
  }

  function variantsMarkup(product) {
    return (product.variantes || [])
      .map((variant) => {
        const image = variant.imagenes?.hero || variant.imagenes?.frontal || variant.imagenes?.lateral || variant.imagenes?.detalle;
        return `
          <article class="variant-row" data-variant-code="${variant.codigo}">
            <div class="variant-thumb">${image ? `<img src="${asset(image)}" alt="${product.nombre} ${variant.codigo}" loading="lazy">` : placeholder(variant.codigo)}</div>
            <div>
              <strong>${variant.codigo}</strong>
              <span>${pick(variant.color)}</span>
            </div>
          </article>
        `;
      })
      .join("");
  }

  async function renderProduct() {
    const products = await getProducts();
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug") || "b-aura";
    const product = products.find((item) => item.slug === slug);
    const target = document.getElementById("productRoot");
    if (!target) return;
    if (!product) {
      target.innerHTML = `<section class="empty-state section"><h1>${lang() === "en" ? "Product not found" : "Producto no encontrado"}</h1><a class="button button-dark" href="${url("catalogo.html")}">${lang() === "en" ? "Back to catalogue" : "Volver al catálogo"}</a></section>`;
      return;
    }

    document.title = `${product.nombre} | BALMAIN Eyewear B2B`;
    const images = allImages(product);
    const heroImage = images[0]?.src || imageFor(product);
    const related = products.filter((item) => product.relacionados.includes(item.slug)).slice(0, 4);
    const layout = `layout-${(product.orden % 3) + 1}`;
    target.innerHTML = `
      <section class="product-hero ${layout}">
        <div class="product-hero-copy">
          <p class="eyebrow">${pick(product.categoriaLabel)} · ${product.coleccion}</p>
          <h1>${product.nombre}</h1>
          <p>${pick(product.descripcion)}</p>
          <div class="hero-actions">
            <a class="button button-dark" href="${url("index.html#contacto")}">${lang() === "en" ? "Request information" : "Solicitar información"}</a>
            <a class="button button-outline" href="${url("index.html#contacto")}">${lang() === "en" ? "Check availability" : "Consultar disponibilidad"}</a>
          </div>
        </div>
        <div class="product-hero-media zoom-frame">
          ${heroImage ? `<img id="mainProductImage" src="${asset(heroImage)}" alt="${product.nombre}">` : placeholder(product.nombre)}
        </div>
      </section>

      <section class="section product-gallery-section">
        <div class="gallery-thumbs" id="galleryThumbs">
          ${images
            .slice(0, 8)
            .map((image, index) => `<button type="button" class="${index === 0 ? "active" : ""}" data-gallery-src="${asset(image.src)}"><img src="${asset(image.src)}" alt="${image.label}" loading="lazy"></button>`)
            .join("")}
        </div>
      </section>

      <section class="section product-details-grid">
        <div>
          <p class="eyebrow">${lang() === "en" ? "Variants" : "Variantes"}</p>
          <h2>${lang() === "en" ? "Available codes" : "Códigos disponibles"}</h2>
          <div class="variant-list">${variantsMarkup(product)}</div>
        </div>
        <div>
          <p class="eyebrow">${lang() === "en" ? "Technical details" : "Detalles técnicos"}</p>
          <h2>${lang() === "en" ? "Specifications" : "Especificaciones"}</h2>
          <dl class="spec-list">${specsMarkup(product)}</dl>
        </div>
      </section>

      <section class="section b2b-panel">
        <div>
          <p class="eyebrow">Innova B2B</p>
          <h2>${lang() === "en" ? "Model available for commercial inquiry" : "Modelo disponible para consulta comercial"}</h2>
          <p>${pick(product.b2b?.mensaje)}</p>
        </div>
        <a class="button button-light" href="${url("index.html#contacto")}">${lang() === "en" ? "Contact Innova" : "Contactar a Innova"}</a>
      </section>

      <section class="section packaging-note">
        <p class="eyebrow">Packaging</p>
        <h2>${lang() === "en" ? "Premium packaging pending visual confirmation" : "Packaging premium pendiente de imagen identificada"}</h2>
        <p>${lang() === "en" ? "The PDF includes a packaging section, but no local packaging image was safely identified by filename." : "El PDF incluye una sección de packaging, pero no se identificó una imagen local de estuche por nombre de archivo."}</p>
      </section>

      <section class="section related-products">
        <div class="section-heading">
          <p class="eyebrow">${lang() === "en" ? "Related" : "Relacionados"}</p>
          <h2>${lang() === "en" ? "Same category" : "Misma categoría"}</h2>
        </div>
        <div class="product-grid">${related.map((p) => productCard(p, true)).join("")}</div>
      </section>
    `;

    document.querySelectorAll("[data-gallery-src]").forEach((button) => {
      button.addEventListener("click", () => {
        const img = document.getElementById("mainProductImage");
        if (img) img.src = button.dataset.gallerySrc || img.src;
        document.querySelectorAll("[data-gallery-src]").forEach((item) => item.classList.toggle("active", item === button));
      });
    });
  }

  window.BalmainCatalog = {
    asset,
    getProducts,
    getContent,
    imageFor,
    productHref,
    productCard,
    productSearchText,
    renderHome,
    renderCatalog,
    renderCategory,
    renderProduct,
  };
})();
