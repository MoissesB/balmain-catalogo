(function () {
  const cache = {
    products: null,
    content: null,
  };

  const innovaContact = {
    telefono: "+1 (754) 270-4613",
    email: "info@innova-eyewear.com",
    whatsapp: "+1 (754) 270-4613",
    whatsappUrl: "https://wa.me/17542704613",
    instagram: "https://www.instagram.com/innova_eyewear/",
    direccion: "1206 STIRLING ROAD STE 3B, DANIA BEACH FL 33004, United States",
    mensajeWhatsapp: {
      es: "Hola, estoy interesado en recibir informacion B2B sobre la coleccion Balmain Eyewear.",
      en: "Hello, I am interested in receiving B2B information about the Balmain Eyewear collection.",
    },
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

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => {
      const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
      return map[char];
    });
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

  function contact() {
    return cache.content?.contacto || innovaContact;
  }

  function lang() {
    return window.BalmainI18n ? window.BalmainI18n.current() : "es";
  }

  function pick(value) {
    return window.BalmainI18n ? window.BalmainI18n.pick(value) : value?.es || value?.en || value || "";
  }

  function primaryImageForVariant(variant) {
    const images = variant?.imagenes || {};
    return images.frontal || images.hero || images.lateral || images.detalle || images.marketing || images.case || "";
  }

  function variantImages(variant) {
    const seen = new Set();
    const images = [];
    const map = variant?.imagenes || {};
    ["frontal", "lateral", "detalle", "hero", "marketing", "case"].forEach((slot) => {
      if (map[slot] && !seen.has(map[slot])) {
        seen.add(map[slot]);
        images.push({ src: map[slot], slot, code: variant.codigo || "" });
      }
    });
    return images;
  }

  function imageFor(product) {
    for (const variant of product.variantes || []) {
      const candidate = primaryImageForVariant(variant);
      if (candidate) return candidate;
    }
    return "";
  }

  function allImages(product) {
    const seen = new Set();
    const images = [];
    for (const variant of product.variantes || []) {
      variantImages(variant).forEach((image) => {
        if (!seen.has(image.src)) {
          seen.add(image.src);
          images.push({
            ...image,
            label: `${variant.codigo || product.nombre} ${image.slot}`,
          });
        }
      });
    }
    return images;
  }

  function cardImages(product) {
    return allImages(product).slice(0, 3);
  }

  function seoDescription(product) {
    const description =
      pick(product.metaDescription) ||
      pick(product.descripcionCorta) ||
      pick(product.marketingDescription) ||
      pick(product.descripcion);
    return String(description || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 158);
  }

  function ensureMeta(selector, attrs) {
    let node = document.head.querySelector(selector);
    if (!node) {
      node = document.createElement("meta");
      Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
      document.head.appendChild(node);
    }
    return node;
  }

  function updatePageSeo({ title, description, image, canonical }) {
    if (title) document.title = title;
    const cleanDescription = String(description || "").trim();
    if (cleanDescription) {
      ensureMeta('meta[name="description"]', { name: "description" }).setAttribute("content", cleanDescription);
      ensureMeta('meta[property="og:description"]', { property: "og:description" }).setAttribute("content", cleanDescription);
      ensureMeta('meta[name="twitter:description"]', { name: "twitter:description" }).setAttribute("content", cleanDescription);
    }
    if (title) {
      ensureMeta('meta[property="og:title"]', { property: "og:title" }).setAttribute("content", title);
      ensureMeta('meta[name="twitter:title"]', { name: "twitter:title" }).setAttribute("content", title);
    }
    if (image) {
      const imageUrl = new URL(asset(image), window.location.href).href;
      ensureMeta('meta[property="og:image"]', { property: "og:image" }).setAttribute("content", imageUrl);
      ensureMeta('meta[name="twitter:image"]', { name: "twitter:image" }).setAttribute("content", imageUrl);
    }
    ensureMeta('meta[name="twitter:card"]', { name: "twitter:card" }).setAttribute("content", "summary_large_image");
    ensureMeta('meta[property="og:type"]', { property: "og:type" }).setAttribute("content", "website");
    if (canonical) {
      let link = document.head.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }
  }

  function placeholder(label) {
    return `<div class="image-placeholder"><span>${escapeHtml(label || "BALMAIN")}</span></div>`;
  }

  function productHref(slug) {
    return url(`producto.html?slug=${encodeURIComponent(slug)}`);
  }

  function whatsappHref(message) {
    return `${contact().whatsappUrl || innovaContact.whatsappUrl}?text=${encodeURIComponent(message)}`;
  }

  function productMessage(product, variant) {
    const base =
      pick(product.b2bMessage) ||
      (lang() === "en"
        ? `Hello, I am interested in B2B information about the Balmain Eyewear model ${product.nombre}. I would like to check availability and variants.`
        : `Hola, estoy interesado en informacion B2B sobre el modelo ${product.nombre} de Balmain Eyewear. Quisiera consultar disponibilidad y variantes.`);
    if (!variant?.codigo) return base;
    return lang() === "en" ? `${base} Selected variant: ${variant.codigo}.` : `${base} Variante seleccionada: ${variant.codigo}.`;
  }

  function genericMessage() {
    return pick(contact().mensajeWhatsapp) || innovaContact.mensajeWhatsapp.es;
  }

  function variantCodes(product, limit = 4) {
    const codes = (product.variantes || []).map((variant) => variant.codigo).filter(Boolean);
    const visible = codes.slice(0, limit).join(" · ");
    const hiddenCount = Math.max(0, codes.length - limit);
    return `${visible}${hiddenCount ? ` +${hiddenCount}` : ""}`;
  }

  function materialSummary(product) {
    const materials = product.materiales || [];
    const clean = materials
      .map((item) => String(item).replace(/\s+/g, " ").trim())
      .filter(Boolean)
      .slice(0, 2);
    if (clean.length) return clean.join(" · ");
    return pick(product.categoriaLabel);
  }

  function productCard(product, compact = false) {
    const images = cardImages(product);
    const title = escapeHtml(product.nombre);
    const category = escapeHtml(pick(product.categoriaLabel));
    const shortDescription = escapeHtml(pick(product.descripcionCorta) || pick(product.descripcion));
    const materials = escapeHtml(materialSummary(product));
    const codes = escapeHtml(variantCodes(product, compact ? 3 : 4));
    const variants = product.variantes || [];
    const infoHref = whatsappHref(productMessage(product, variants[0]));
    const imageClass = images.length ? `image-count-${Math.min(images.length, 3)} ${images.length > 1 ? "has-alt" : ""}` : "";
    const imageMarkup = images.length
      ? images
          .map(
            (image, index) =>
              `<img class="card-img card-img-${index + 1}" src="${asset(image.src)}" alt="${title} ${escapeHtml(image.code || image.slot)}" loading="lazy" decoding="async">`
          )
          .join("")
      : placeholder(title);

    return `
      <article class="product-card ${compact ? "compact" : ""}">
        <a class="product-media ${imageClass}" href="${productHref(product.slug)}" aria-label="${title}">
          <span class="product-image-stack">${imageMarkup}</span>
          <span class="tag">${product.coleccion || "SS26"}</span>
        </a>
        <div class="product-card-copy">
          <p class="eyebrow">${category}</p>
          <h3><a href="${productHref(product.slug)}">${title}</a></h3>
          <p class="product-card-description">${shortDescription}</p>
          <p class="product-card-material">${materials}</p>
          <div class="product-card-meta">
            <span>${variants.length} ${lang() === "en" ? "variants" : "variantes"}</span>
            <small>${codes}</small>
          </div>
          <div class="card-actions">
            <a class="text-link" href="${productHref(product.slug)}">${lang() === "en" ? "View details" : "Ver detalles"}</a>
            <a class="text-link muted" href="${infoHref}" target="_blank" rel="noopener">${lang() === "en" ? "Request info" : "Solicitar informacion"}</a>
          </div>
          <div class="product-card-tooltip">
            <strong>${title}</strong>
            <span>${shortDescription}</span>
          </div>
        </div>
      </article>
    `;
  }

  function categoryLink(slug) {
    return url(`pages/categorias/${slug}.html`);
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
          const href = categoryLink(category.slug);
          return `
            <article class="category-card" data-category="${escapeHtml(category.slug)}">
              <a href="${href}" class="category-media">
                ${category.imagen ? `<img src="${asset(category.imagen)}" alt="${escapeHtml(pick(category.label))}" loading="lazy" decoding="async">` : placeholder(pick(category.label))}
              </a>
              <div>
                <p class="eyebrow">${grouped[category.slug] || 0} ${lang() === "en" ? "models" : "modelos"}</p>
                <h3>${escapeHtml(pick(category.label))}</h3>
                <p>${escapeHtml(pick(category.descripcion))}</p>
                <a class="text-link" href="${href}">${lang() === "en" ? "View category" : "Ver categoria"}</a>
              </div>
            </article>
          `;
        })
        .join("");
    }
    if (featuredTarget) {
      featuredTarget.innerHTML = products
        .filter((product) => product.destacado)
        .slice(0, 12)
        .map((product) => productCard(product, true))
        .join("");
    }
  }

  function productSearchText(product) {
    const specs = Object.values(product.especificaciones || {}).join(" ");
    const variants = (product.variantes || []).map((variant) => `${variant.codigo} ${pick(variant.color)}`).join(" ");
    return `${product.nombre} ${pick(product.categoriaLabel)} ${pick(product.descripcionCorta)} ${product.categoria} ${specs} ${variants}`.toLowerCase();
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
      grid.innerHTML = filtered.map((product) => productCard(product)).join("");
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

  function categoryContextMarkup(category, products) {
    const materialItems = pick(category.materiales) || [];
    return `
      <section class="section category-context" id="categoryContext">
        <div class="category-context-copy">
          <p class="eyebrow">${lang() === "en" ? "B2B category focus" : "Enfoque B2B de categoria"}</p>
          <h2>${escapeHtml(pick(category.label))}</h2>
          <p>${escapeHtml(pick(category.b2b) || pick(category.descripcion))}</p>
          <div class="category-stat-row">
            <span><strong>${products.length}</strong>${lang() === "en" ? "models available" : "modelos disponibles"}</span>
            <span><strong>SS26</strong>${lang() === "en" ? "commercial catalogue" : "catalogo comercial"}</span>
          </div>
        </div>
        <div class="category-context-media">
          ${category.imagenMarketing ? `<img src="${asset(category.imagenMarketing)}" alt="${escapeHtml(pick(category.label))} marketing" loading="lazy" decoding="async">` : placeholder(pick(category.label))}
        </div>
      </section>
      <section class="section category-materials" id="categoryMaterials">
        <div>
          <p class="eyebrow">${lang() === "en" ? "Materials and selling codes" : "Materiales y codigos de venta"}</p>
          <h2>${lang() === "en" ? "Useful arguments for professional buyers" : "Argumentos utiles para compradores profesionales"}</h2>
        </div>
        <div class="material-chip-list">
          ${materialItems.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
        </div>
      </section>
    `;
  }

  async function renderCategory() {
    const categorySlug = document.body.dataset.category;
    const [allProducts, content] = await Promise.all([getProducts(), getContent()]);
    const products = allProducts.filter((product) => product.categoria === categorySlug);
    const category = content.categorias?.[categorySlug];
    const target = document.getElementById("categoryProducts");
    const section = document.querySelector(".category-products");
    const hero = document.querySelector(".category-hero");

    if (category?.imagen && hero) {
      const heroPositions = {
        "avant-garde": "center 44%",
        iconic: "center 48%",
        aspirational: "center 36%",
        "fashion-drops": "center 38%",
      };
      hero.style.setProperty("--hero-image", `url("${new URL(asset(category.imagen), window.location.href).href}")`);
      hero.style.setProperty("--hero-position", heroPositions[categorySlug] || "center");
    }
    if (section && category) {
      document.getElementById("categoryContext")?.remove();
      document.getElementById("categoryMaterials")?.remove();
      section.insertAdjacentHTML("beforebegin", categoryContextMarkup(category, products));
    }
    if (target) target.innerHTML = products.map((product) => productCard(product)).join("");
  }

  function specsMarkup(product) {
    const labels = {
      frame: lang() === "en" ? "Frame" : "Montura",
      temple: lang() === "en" ? "Temple" : "Varilla",
      nosePads: lang() === "en" ? "Nose pads" : "Plaquetas",
      lenses: lang() === "en" ? "Lenses" : "Lentes",
      size: lang() === "en" ? "Size" : "Medida",
      country: lang() === "en" ? "Country of origin" : "Pais de origen",
    };
    return Object.entries(labels)
      .map(([key, label]) => {
        const value = product.especificaciones?.[key] || (lang() === "en" ? "Confirm with Innova" : "Confirmar con Innova");
        return `<div><dt>${label}</dt><dd>${escapeHtml(value)}</dd></div>`;
      })
      .join("");
  }

  function materialsMarkup(product) {
    const items = product.materiales || [];
    if (!items.length) {
      return `<p>${lang() === "en" ? "Materials available on commercial inquiry with Innova." : "Materiales disponibles bajo consulta comercial con Innova."}</p>`;
    }
    return `<div class="material-chip-list product-materials">${items.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>`;
  }

  function variantsMarkup(product) {
    return (product.variantes || [])
      .map((variant, index) => {
        const image = primaryImageForVariant(variant);
        return `
          <button class="variant-row ${index === 0 ? "active" : ""}" type="button" data-variant-index="${index}" data-variant-code="${escapeHtml(variant.codigo)}">
            <span class="variant-thumb">${image ? `<img src="${asset(image)}" alt="${escapeHtml(product.nombre)} ${escapeHtml(variant.codigo)}" loading="lazy" decoding="async">` : placeholder(variant.codigo)}</span>
            <span>
              <strong>${escapeHtml(variant.codigo)}</strong>
              <small>${escapeHtml(pick(variant.color))}</small>
            </span>
          </button>
        `;
      })
      .join("");
  }

  function variantOptionMarkup(product, variant, index) {
    const image = primaryImageForVariant(variant);
    return `
      <button class="variant-option ${index === 0 ? "active" : ""}" type="button" data-variant-index="${index}" data-variant-code="${escapeHtml(variant.codigo)}">
        <span class="variant-option-thumb">${image ? `<img src="${asset(image)}" alt="${escapeHtml(product.nombre)} ${escapeHtml(variant.codigo)}" loading="lazy" decoding="async">` : placeholder(variant.codigo)}</span>
        <span class="variant-option-copy">
          <strong>${escapeHtml(variant.codigo)}</strong>
          <small>${escapeHtml(pick(variant.color))}</small>
          <em>${escapeHtml(product.nombre)}</em>
        </span>
      </button>
    `;
  }

  function variantSelectorMarkup(product, variants) {
    const firstVariant = variants[0] || {};
    const firstImage = primaryImageForVariant(firstVariant);
    return `
      <div class="variant-select-shell" id="topVariantSelector">
        <button class="variant-select-toggle" type="button" id="variantSelectToggle" aria-expanded="false" aria-controls="variantSelectMenu">
          <span class="variant-select-thumb" id="variantSelectThumb">${firstImage ? `<img src="${asset(firstImage)}" alt="${escapeHtml(product.nombre)} ${escapeHtml(firstVariant.codigo || "")}" decoding="async">` : placeholder(firstVariant.codigo || product.nombre)}</span>
          <span class="variant-select-copy">
            <span>${lang() === "en" ? "Selected variant" : "Variante seleccionada"}</span>
            <strong id="variantSelectCode">${escapeHtml(firstVariant.codigo || "")}</strong>
            <small id="variantSelectColor">${escapeHtml(pick(firstVariant.color))}</small>
          </span>
          <span class="variant-select-icon" aria-hidden="true"></span>
        </button>
        <div class="variant-select-menu" id="variantSelectMenu" hidden>
          ${variants.map((variant, index) => variantOptionMarkup(product, variant, index)).join("")}
        </div>
      </div>
    `;
  }

  function galleryMarkup(images) {
    return images
      .map(
        (image, index) =>
          `<button type="button" class="${index === 0 ? "active" : ""}" data-gallery-src="${asset(image.src)}"><img src="${asset(image.src)}" alt="${escapeHtml(image.label || image.slot)}" loading="lazy" decoding="async"></button>`
      )
      .join("");
  }

  function bindGallery(images) {
    const thumbs = document.getElementById("galleryThumbs");
    const mainImage = document.getElementById("mainProductImage");
    if (!thumbs || !mainImage) return;
    thumbs.innerHTML = galleryMarkup(images);
    thumbs.querySelectorAll("[data-gallery-src]").forEach((button) => {
      button.addEventListener("click", () => {
        mainImage.src = button.dataset.gallerySrc || mainImage.src;
        thumbs.querySelectorAll("[data-gallery-src]").forEach((item) => item.classList.toggle("active", item === button));
      });
    });
  }

  async function renderProduct() {
    const [products, content] = await Promise.all([getProducts(), getContent()]);
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug") || "b-aura";
    const product = products.find((item) => item.slug === slug);
    const target = document.getElementById("productRoot");
    if (!target) return;
    if (!product) {
      target.innerHTML = `<section class="empty-state section"><h1>${lang() === "en" ? "Product not found" : "Producto no encontrado"}</h1><a class="button button-dark" href="${url("catalogo.html")}">${lang() === "en" ? "Back to catalogue" : "Volver al catalogo"}</a></section>`;
      return;
    }

    const variants = product.variantes || [];
    const firstVariant = variants[0] || {};
    const firstImages = variantImages(firstVariant);
    const heroImage = firstImages[0]?.src || imageFor(product);
    const related = products.filter((item) => (product.relacionados || []).includes(item.slug)).slice(0, 4);
    const layout = `layout-${(product.orden % 3) + 1}`;
    const productWhatsapp = whatsappHref(productMessage(product, firstVariant));
    const category = content.categorias?.[product.categoria] || {};
    const pageTitle = `${product.nombre} ${product.coleccion || "SS26"} | BALMAIN Eyewear B2B Innova`;
    const pageDescription = seoDescription(product);
    updatePageSeo({
      title: pageTitle,
      description: pageDescription,
      image: heroImage,
      canonical: `${window.location.origin}${window.location.pathname}?slug=${encodeURIComponent(product.slug)}`,
    });

    target.innerHTML = `
      <section class="product-hero ${layout}">
        <div class="product-hero-copy">
          <p class="eyebrow">${escapeHtml(pick(product.categoriaLabel))} · ${escapeHtml(product.coleccion)} · ${lang() === "en" ? "Distributed by Innova" : "Distribuido por Innova"}</p>
          <h1>${escapeHtml(product.nombre)}</h1>
          <p>${escapeHtml(pick(product.marketingDescription) || pick(product.descripcion))}</p>
          <dl class="selected-variant-card">
            <div><dt>${lang() === "en" ? "Selected code" : "Codigo seleccionado"}</dt><dd id="selectedVariantCode">${escapeHtml(firstVariant.codigo || "")}</dd></div>
            <div><dt>${lang() === "en" ? "Color" : "Color"}</dt><dd id="selectedVariantColor">${escapeHtml(pick(firstVariant.color))}</dd></div>
          </dl>
          <div class="hero-actions">
            <a class="button button-dark" id="productWhatsApp" href="${productWhatsapp}" target="_blank" rel="noopener">${lang() === "en" ? "Request information" : "Solicitar informacion"}</a>
            <a class="button button-outline" href="mailto:${contact().email}?subject=${encodeURIComponent(`Consulta B2B ${product.nombre}`)}">${lang() === "en" ? "Email Innova" : "Enviar email a Innova"}</a>
          </div>
          ${variants.length ? variantSelectorMarkup(product, variants) : ""}
        </div>
        <div class="product-hero-media zoom-frame">
          ${heroImage ? `<img id="mainProductImage" src="${asset(heroImage)}" alt="${escapeHtml(product.nombre)}" decoding="async" fetchpriority="high">` : placeholder(product.nombre)}
        </div>
      </section>

      <section class="section product-gallery-section">
        <div class="gallery-thumbs" id="galleryThumbs"></div>
      </section>

      <section class="section product-story-grid">
        <div>
          <p class="eyebrow">${lang() === "en" ? "Commercial description" : "Descripcion comercial"}</p>
          <h2>${escapeHtml(product.nombre)} ${lang() === "en" ? "for professional buying" : "para compra profesional"}</h2>
          <p>${escapeHtml(pick(product.descripcionCorta))}</p>
          <p>${escapeHtml(pick(product.designStory))}</p>
          <p>${escapeHtml(pick(product.commercialUse))}</p>
          ${product.fuenteCatalogo ? `<p class="source-note">${escapeHtml(pick(product.fuenteCatalogo))}</p>` : ""}
        </div>
        <div>
          <p class="eyebrow">${lang() === "en" ? "Variants" : "Variantes"}</p>
          <h2>${lang() === "en" ? "Available codes" : "Codigos disponibles"}</h2>
          <div class="variant-list" id="variantList">${variantsMarkup(product)}</div>
        </div>
      </section>

      <section class="section product-details-grid">
        <div>
          <p class="eyebrow">${lang() === "en" ? "Technical details" : "Detalles tecnicos"}</p>
          <h2>${lang() === "en" ? "Specifications from catalogue" : "Especificaciones del catalogo"}</h2>
          <dl class="spec-list">${specsMarkup(product)}</dl>
        </div>
        <div>
          <p class="eyebrow">${lang() === "en" ? "Materials" : "Materiales"}</p>
          <h2>${lang() === "en" ? "Commercial talking points" : "Argumentos comerciales"}</h2>
          ${materialsMarkup(product)}
          <div class="category-mini-panel">
            <span>${escapeHtml(pick(category.label) || pick(product.categoriaLabel))}</span>
            <p>${escapeHtml(pick(category.b2b) || pick(product.b2b?.mensaje))}</p>
          </div>
        </div>
      </section>

      <section class="section b2b-panel innova-b2b-panel">
        <div>
          <p class="eyebrow">Innova B2B</p>
          <h2>${lang() === "en" ? "Request availability with Innova" : "Solicitar disponibilidad con Innova"}</h2>
          <p>${escapeHtml(pick(product.b2b?.mensaje))}</p>
          <div class="innova-contact-line">
            <a href="mailto:${contact().email}">${escapeHtml(contact().email)}</a>
            <a href="${whatsappHref(productMessage(product, firstVariant))}" target="_blank" rel="noopener">${escapeHtml(contact().whatsapp)}</a>
          </div>
        </div>
        <div class="innova-wordmark" aria-label="Innova">INNOVA</div>
      </section>

      <section class="section packaging-showcase">
        <div>
          <p class="eyebrow">Packaging</p>
          <h2>${lang() === "en" ? "Premium presentation assets" : "Presentacion premium y estuches"}</h2>
          <p>${lang() === "en" ? "The SS26 catalogue includes premium packaging references for professional presentations and delivery discussions with Innova." : "El catalogo SS26 incluye referencias de packaging premium para presentaciones profesionales y conversaciones de entrega con Innova."}</p>
        </div>
        <img src="${asset(content.site?.assets?.packaging || "assets/images/marketing/packaging-ss26.jpg")}" alt="BALMAIN Eyewear packaging SS26" loading="lazy" decoding="async">
      </section>

      <section class="section related-products">
        <div class="section-heading">
          <p class="eyebrow">${lang() === "en" ? "Related" : "Relacionados"}</p>
          <h2>${lang() === "en" ? "Same category" : "Misma categoria"}</h2>
        </div>
        <div class="product-grid">${related.map((item) => productCard(item, true)).join("")}</div>
      </section>
    `;

    function updateVariant(index) {
      const variant = variants[index] || variants[0] || {};
      const images = variantImages(variant);
      const mainImage = document.getElementById("mainProductImage");
      const first = images[0]?.src || imageFor(product);
      if (mainImage && first) mainImage.src = asset(first);
      document.getElementById("selectedVariantCode").textContent = variant.codigo || "";
      document.getElementById("selectedVariantColor").textContent = pick(variant.color) || "";
      const cta = document.getElementById("productWhatsApp");
      if (cta) cta.href = whatsappHref(productMessage(product, variant));
      const selectCode = document.getElementById("variantSelectCode");
      const selectColor = document.getElementById("variantSelectColor");
      const selectThumb = document.getElementById("variantSelectThumb");
      if (selectCode) selectCode.textContent = variant.codigo || "";
      if (selectColor) selectColor.textContent = pick(variant.color) || "";
      if (selectThumb) {
        const thumbImage = primaryImageForVariant(variant);
        selectThumb.innerHTML = thumbImage
          ? `<img src="${asset(thumbImage)}" alt="${escapeHtml(product.nombre)} ${escapeHtml(variant.codigo || "")}" decoding="async">`
          : placeholder(variant.codigo || product.nombre);
      }
      document.querySelectorAll("[data-variant-index]").forEach((button) => {
        button.classList.toggle("active", Number(button.dataset.variantIndex) === index);
      });
      bindGallery(images.length ? images : allImages(product));
    }

    document.querySelectorAll("[data-variant-index]").forEach((button) => {
      button.addEventListener("click", () => updateVariant(Number(button.dataset.variantIndex || 0)));
    });
    const selectorToggle = document.getElementById("variantSelectToggle");
    const selectorMenu = document.getElementById("variantSelectMenu");
    selectorToggle?.addEventListener("click", () => {
      const isOpen = selectorToggle.getAttribute("aria-expanded") === "true";
      selectorToggle.setAttribute("aria-expanded", String(!isOpen));
      if (selectorMenu) selectorMenu.hidden = isOpen;
    });
    document.addEventListener("click", (event) => {
      const shell = document.getElementById("topVariantSelector");
      if (!shell || shell.contains(event.target)) return;
      selectorToggle?.setAttribute("aria-expanded", "false");
      if (selectorMenu) selectorMenu.hidden = true;
    });
    selectorMenu?.querySelectorAll("[data-variant-index]").forEach((button) => {
      button.addEventListener("click", () => {
        selectorToggle?.setAttribute("aria-expanded", "false");
        if (selectorMenu) selectorMenu.hidden = true;
      });
    });
    bindProductZoom();
    updateVariant(0);
  }

  function bindProductZoom() {
    const frame = document.querySelector(".zoom-frame");
    const image = document.getElementById("mainProductImage");
    if (!frame || !image) return;
    let lastPointerType = "mouse";

    frame.addEventListener("pointermove", (event) => {
      const rect = frame.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      frame.style.setProperty("--zoom-x", `${Math.max(0, Math.min(100, x))}%`);
      frame.style.setProperty("--zoom-y", `${Math.max(0, Math.min(100, y))}%`);
      if (event.pointerType !== "touch") frame.classList.add("is-zooming");
    });
    frame.addEventListener("pointerenter", (event) => {
      if (event.pointerType !== "touch") frame.classList.add("is-zooming");
    });
    frame.addEventListener("pointerdown", (event) => {
      lastPointerType = event.pointerType || "mouse";
    });
    frame.addEventListener("pointerleave", () => {
      frame.classList.remove("is-zooming", "touch-zooming");
      frame.style.setProperty("--zoom-x", "50%");
      frame.style.setProperty("--zoom-y", "50%");
    });
    frame.addEventListener("click", () => {
      if (lastPointerType === "mouse") return;
      frame.classList.toggle("touch-zooming");
    });
  }

  async function renderContactSurfaces() {
    await getContent();
    const data = contact();
    const message = genericMessage();
    document.querySelectorAll("[data-contact-email]").forEach((node) => {
      node.textContent = data.email;
      if (node.tagName === "A") node.href = `mailto:${data.email}`;
    });
    document.querySelectorAll("[data-contact-phone]").forEach((node) => {
      node.textContent = data.telefono;
      if (node.tagName === "A") node.href = `tel:${data.telefono.replace(/[^\d+]/g, "")}`;
    });
    document.querySelectorAll("[data-contact-whatsapp]").forEach((node) => {
      node.textContent = data.whatsapp;
      if (node.tagName === "A") {
        node.href = whatsappHref(message);
        node.target = "_blank";
        node.rel = "noopener";
      }
    });
    document.querySelectorAll("[data-contact-instagram]").forEach((node) => {
      node.textContent = "@innova_eyewear";
      if (node.tagName === "A") {
        node.href = data.instagram;
        node.target = "_blank";
        node.rel = "noopener";
      }
    });
    document.querySelectorAll("[data-contact-address]").forEach((node) => {
      node.textContent = data.direccion;
    });
    document.querySelectorAll("[data-whatsapp-general]").forEach((node) => {
      node.href = whatsappHref(message);
      node.target = "_blank";
      node.rel = "noopener";
    });
  }

  window.BalmainCatalog = {
    asset,
    getProducts,
    getContent,
    imageFor,
    variantImages,
    allImages,
    cardImages,
    productHref,
    productCard,
    productSearchText,
    whatsappHref,
    productMessage,
    genericMessage,
    renderHome,
    renderCatalog,
    renderCategory,
    renderProduct,
    renderContactSurfaces,
  };
})();
