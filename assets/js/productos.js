(function () {
  const cache = {
    products: null,
    content: null,
    inventory: null,
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
      fr: "Bonjour, je souhaite recevoir des informations B2B sur la collection Balmain Eyewear.",
    },
  };

  const inventoryStorageKey = "balmainInventoryLocal";
  const inventoryStatuses = ["normal", "hidden", "soldout", "lowstock"];
  const ui = {
    selectedVariantSuffix: {
      es: "Variante seleccionada: {code}.",
      en: "Selected variant: {code}.",
      fr: "Variante selectionnee : {code}.",
    },
    defaultProductMessage: {
      es: "Hola, estoy interesado en informacion B2B sobre el modelo {product} de Balmain Eyewear. Quisiera consultar disponibilidad y variantes.",
      en: "Hello, I am interested in B2B information about the Balmain Eyewear model {product}. I would like to check availability and variants.",
      fr: "Bonjour, je souhaite recevoir des informations B2B sur le modele {product} de Balmain Eyewear. Je voudrais consulter la disponibilite et les variantes.",
    },
    normal: { es: "Normal", en: "Normal", fr: "Normal" },
    hidden: { es: "Oculto temporalmente", en: "Temporarily hidden", fr: "Masque temporairement" },
    soldout: { es: "Agotado", en: "Sold out", fr: "Epuise" },
    lowstock: { es: "Pocas unidades", en: "Low stock", fr: "Peu d'unites" },
    checkNextAvailability: { es: "Consultar proxima disponibilidad", en: "Check next availability", fr: "Consulter la prochaine disponibilite" },
    requestInfo: { es: "Solicitar informacion", en: "Request info", fr: "Demander des informations" },
    requestInformation: { es: "Solicitar informacion", en: "Request information", fr: "Demander des informations" },
    variants: { es: "variantes", en: "variants", fr: "variantes" },
    models: { es: "modelos", en: "models", fr: "modeles" },
    viewDetails: { es: "Ver detalles", en: "View details", fr: "Voir les details" },
    viewCategory: { es: "Ver categoria", en: "View category", fr: "Voir la categorie" },
    b2bCategoryFocus: { es: "Enfoque B2B de categoria", en: "B2B category focus", fr: "Focus B2B de la categorie" },
    modelsAvailable: { es: "modelos disponibles", en: "models available", fr: "modeles disponibles" },
    commercialCatalogue: { es: "catalogo comercial", en: "commercial catalogue", fr: "catalogue commercial" },
    materialsSellingCodes: { es: "Materiales y codigos de venta", en: "Materials and selling codes", fr: "Matieres et codes de vente" },
    buyerArguments: { es: "Argumentos utiles para compradores profesionales", en: "Useful arguments for professional buyers", fr: "Arguments utiles pour acheteurs professionnels" },
    frame: { es: "Montura", en: "Frame", fr: "Monture" },
    temple: { es: "Varilla", en: "Temple", fr: "Branche" },
    nosePads: { es: "Plaquetas", en: "Nose pads", fr: "Plaquettes" },
    lenses: { es: "Lentes", en: "Lenses", fr: "Verres" },
    size: { es: "Medida", en: "Size", fr: "Taille" },
    country: { es: "Pais de origen", en: "Country of origin", fr: "Pays d'origine" },
    confirmInnova: { es: "Confirmar con Innova", en: "Confirm with Innova", fr: "Confirmer avec Innova" },
    materialsInquiry: {
      es: "Materiales disponibles bajo consulta comercial con Innova.",
      en: "Materials available on commercial inquiry with Innova.",
      fr: "Matieres disponibles sur consultation commerciale avec Innova.",
    },
    selectedVariant: { es: "Variante seleccionada", en: "Selected variant", fr: "Variante selectionnee" },
    productNotFound: { es: "Producto no encontrado", en: "Product not found", fr: "Produit introuvable" },
    backToCatalogue: { es: "Volver al catalogo", en: "Back to catalogue", fr: "Retour au catalogue" },
    distributedByInnova: { es: "Distribuido por Innova", en: "Distributed by Innova", fr: "Distribue par Innova" },
    selectedCode: { es: "Codigo seleccionado", en: "Selected code", fr: "Code selectionne" },
    color: { es: "Color", en: "Color", fr: "Couleur" },
    emailInnova: { es: "Enviar email a Innova", en: "Email Innova", fr: "Envoyer un email a Innova" },
    commercialDescription: { es: "Descripcion comercial", en: "Commercial description", fr: "Description commerciale" },
    professionalBuying: { es: "para compra profesional", en: "for professional buying", fr: "pour l'achat professionnel" },
    variantsTitle: { es: "Variantes", en: "Variants", fr: "Variantes" },
    availableCodes: { es: "Codigos disponibles", en: "Available codes", fr: "Codes disponibles" },
    technicalDetails: { es: "Detalles tecnicos", en: "Technical details", fr: "Details techniques" },
    specificationsCatalogue: { es: "Especificaciones del catalogo", en: "Specifications from catalogue", fr: "Specifications du catalogue" },
    materials: { es: "Materiales", en: "Materials", fr: "Matieres" },
    commercialTalkingPoints: { es: "Argumentos comerciales", en: "Commercial talking points", fr: "Arguments commerciaux" },
    requestAvailabilityInnova: { es: "Solicitar disponibilidad con Innova", en: "Request availability with Innova", fr: "Demander la disponibilite avec Innova" },
    premiumAssets: { es: "Presentacion premium y estuches", en: "Premium presentation assets", fr: "Presentation premium et etuis" },
    packagingCopy: {
      es: "El catalogo SS26 incluye referencias de packaging premium para presentaciones profesionales y conversaciones de entrega con Innova.",
      en: "The SS26 catalogue includes premium packaging references for professional presentations and delivery discussions with Innova.",
      fr: "Le catalogue SS26 inclut des references de packaging premium pour les presentations professionnelles et les discussions de livraison avec Innova.",
    },
    related: { es: "Relacionados", en: "Related", fr: "Associes" },
    sameCategory: { es: "Misma categoria", en: "Same category", fr: "Meme categorie" },
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

  async function getInventory() {
    if (!cache.inventory) {
      try {
        const response = await fetch(url("data/inventario.json"), { cache: "no-store" });
        cache.inventory = response.ok ? await response.json() : { productos: {} };
      } catch (_error) {
        cache.inventory = { productos: {} };
      }
    }
    return cache.inventory;
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

  function t(key, replacements = {}) {
    let value = pick(ui[key]) || "";
    Object.entries(replacements).forEach(([name, replacement]) => {
      value = value.replaceAll(`{${name}}`, replacement);
    });
    return value;
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
      ensureMeta('meta[property="og:url"]', { property: "og:url" }).setAttribute("content", canonical);
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
      t("defaultProductMessage", { product: product.nombre });
    if (!variant?.codigo) return base;
    return `${base} ${t("selectedVariantSuffix", { code: variant.codigo })}`;
  }

  function genericMessage() {
    return pick(contact().mensajeWhatsapp) || innovaContact.mensajeWhatsapp.es;
  }

  function normalizeInventoryStatus(status) {
    return inventoryStatuses.includes(status) ? status : "normal";
  }

  function readLocalInventory() {
    try {
      return JSON.parse(localStorage.getItem(inventoryStorageKey) || "{}");
    } catch (_error) {
      return {};
    }
  }

  function writeLocalInventory(map) {
    localStorage.setItem(inventoryStorageKey, JSON.stringify(map || {}));
  }

  function currentInventory() {
    return {
      ...(cache.inventory?.productos || {}),
      ...readLocalInventory(),
    };
  }

  function productStatus(productOrSlug) {
    const slug = typeof productOrSlug === "string" ? productOrSlug : productOrSlug?.slug;
    const entry = currentInventory()[slug] || {};
    return normalizeInventoryStatus(entry.estado || entry.status);
  }

  function statusLabel(status) {
    return t(normalizeInventoryStatus(status));
  }

  function visibleProducts(products) {
    return (products || []).filter((product) => productStatus(product) !== "hidden");
  }

  function setLocalInventoryState(slugs, status) {
    const cleanStatus = normalizeInventoryStatus(status);
    const map = readLocalInventory();
    (Array.isArray(slugs) ? slugs : [slugs]).filter(Boolean).forEach((slug) => {
      const hasPublishedState = Boolean(cache.inventory?.productos?.[slug]);
      if (cleanStatus === "normal" && !hasPublishedState) {
        delete map[slug];
      } else {
        map[slug] = {
          estado: cleanStatus,
          updatedAt: new Date().toISOString(),
        };
      }
    });
    writeLocalInventory(map);
    window.dispatchEvent(new CustomEvent("balmain:inventorychange"));
  }

  function resetLocalInventory() {
    localStorage.removeItem(inventoryStorageKey);
    window.dispatchEvent(new CustomEvent("balmain:inventorychange"));
  }

  function exportInventory() {
    return {
      version: new Date().toISOString().slice(0, 10),
      nota: "Estados publicados para GitHub Pages. Los cambios temporales del panel local deben copiarse aqui y luego comitearse.",
      productos: currentInventory(),
    };
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
    const status = productStatus(product);
    const isSoldOut = status === "soldout";
    const statusText = statusLabel(status);
    const images = cardImages(product);
    const title = escapeHtml(product.nombre);
    const category = escapeHtml(pick(product.categoriaLabel));
    const shortDescription = escapeHtml(pick(product.descripcionCorta) || pick(product.descripcion));
    const materials = escapeHtml(materialSummary(product));
    const codes = escapeHtml(variantCodes(product, compact ? 3 : 4));
    const variants = product.variantes || [];
    const infoHref = whatsappHref(productMessage(product, variants[0]));
    const requestLabel = isSoldOut ? t("checkNextAvailability") : t("requestInfo");
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
      <article class="product-card ${compact ? "compact" : ""} inventory-${status}" data-product-slug="${escapeHtml(product.slug)}">
        <a class="product-media ${imageClass}" href="${productHref(product.slug)}" aria-label="${title}">
          <span class="product-image-stack">${imageMarkup}</span>
          <span class="tag">${product.coleccion || "SS26"}</span>
          ${status !== "normal" ? `<span class="inventory-badge inventory-badge-${status}">${escapeHtml(statusText)}</span>` : ""}
        </a>
        <div class="product-card-copy">
          <p class="eyebrow">${category}</p>
          <h3><a href="${productHref(product.slug)}">${title}</a></h3>
          <p class="product-card-description">${shortDescription}</p>
          <p class="product-card-material">${materials}</p>
          <div class="product-card-meta">
            <span>${variants.length} ${t("variants")}</span>
            <small>${codes}</small>
          </div>
          <div class="card-actions">
            <a class="text-link" href="${productHref(product.slug)}">${t("viewDetails")}</a>
            <a class="text-link muted" href="${infoHref}" target="_blank" rel="noopener">${requestLabel}</a>
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
    const [allProducts, content] = await Promise.all([getProducts(), getContent(), getInventory()]);
    const products = visibleProducts(allProducts);
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
                ${(category.imagenCard || category.imagen) ? `<img src="${asset(category.imagenCard || category.imagen)}" alt="${escapeHtml(pick(category.label))}" loading="lazy" decoding="async">` : placeholder(pick(category.label))}
              </a>
              <div>
                <p class="eyebrow">${grouped[category.slug] || 0} ${t("models")}</p>
                <h3>${escapeHtml(pick(category.label))}</h3>
                <p>${escapeHtml(pick(category.descripcion))}</p>
                <a class="text-link" href="${href}">${t("viewCategory")}</a>
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
    const [allProducts] = await Promise.all([getProducts(), getInventory()]);
    const products = visibleProducts(allProducts);
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
      if (count) count.textContent = `${filtered.length} ${t("models")}`;
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
          <p class="eyebrow">${t("b2bCategoryFocus")}</p>
          <h2>${escapeHtml(pick(category.label))}</h2>
          <p>${escapeHtml(pick(category.b2b) || pick(category.descripcion))}</p>
          <div class="category-stat-row">
            <span><strong>${products.length}</strong>${t("modelsAvailable")}</span>
            <span><strong>SS26</strong>${t("commercialCatalogue")}</span>
          </div>
        </div>
        <div class="category-context-media">
          ${category.imagenMarketing ? `<img src="${asset(category.imagenMarketing)}" alt="${escapeHtml(pick(category.label))} marketing" loading="lazy" decoding="async">` : placeholder(pick(category.label))}
        </div>
      </section>
      <section class="section category-materials" id="categoryMaterials">
        <div>
          <p class="eyebrow">${t("materialsSellingCodes")}</p>
          <h2>${t("buyerArguments")}</h2>
        </div>
        <div class="material-chip-list">
          ${materialItems.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
        </div>
      </section>
    `;
  }

  async function renderCategory() {
    const categorySlug = document.body.dataset.category;
    const [allProducts, content] = await Promise.all([getProducts(), getContent(), getInventory()]);
    const products = visibleProducts(allProducts).filter((product) => product.categoria === categorySlug);
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
      frame: t("frame"),
      temple: t("temple"),
      nosePads: t("nosePads"),
      lenses: t("lenses"),
      size: t("size"),
      country: t("country"),
    };
    return Object.entries(labels)
      .map(([key, label]) => {
        const value = product.especificaciones?.[key] || t("confirmInnova");
        return `<div><dt>${label}</dt><dd>${escapeHtml(value)}</dd></div>`;
      })
      .join("");
  }

  function materialsMarkup(product) {
    const items = product.materiales || [];
    if (!items.length) {
      return `<p>${t("materialsInquiry")}</p>`;
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
            <span>${t("selectedVariant")}</span>
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
    const [products, content] = await Promise.all([getProducts(), getContent(), getInventory()]);
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug") || "b-aura";
    const product = products.find((item) => item.slug === slug);
    const target = document.getElementById("productRoot");
    if (!target) return;
    if (!product) {
      target.innerHTML = `<section class="empty-state section"><h1>${t("productNotFound")}</h1><a class="button button-dark" href="${url("catalogo.html")}">${t("backToCatalogue")}</a></section>`;
      return;
    }

    const variants = product.variantes || [];
    const status = productStatus(product);
    const statusText = statusLabel(status);
    const isSoldOut = status === "soldout";
    const firstVariant = variants[0] || {};
    const firstImages = variantImages(firstVariant);
    const heroImage = firstImages[0]?.src || imageFor(product);
    const related = visibleProducts(products).filter((item) => (product.relacionados || []).includes(item.slug)).slice(0, 4);
    const layout = `layout-${(product.orden % 3) + 1}`;
    const productWhatsapp = whatsappHref(productMessage(product, firstVariant));
    const productCtaText = isSoldOut ? t("checkNextAvailability") : t("requestInformation");
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
        <div class="product-hero-media zoom-frame">
          ${heroImage ? `<img id="mainProductImage" src="${asset(heroImage)}" alt="${escapeHtml(product.nombre)}" decoding="async" fetchpriority="high">` : placeholder(product.nombre)}
        </div>
        <div class="product-hero-copy">
          <p class="eyebrow">${escapeHtml(pick(product.categoriaLabel))} · ${escapeHtml(product.coleccion)} · ${t("distributedByInnova")}</p>
          ${status !== "normal" ? `<span class="product-status-pill product-status-${status}">${escapeHtml(statusText)}</span>` : ""}
          <h1>${escapeHtml(product.nombre)}</h1>
          <p>${escapeHtml(pick(product.marketingDescription) || pick(product.descripcion))}</p>
          <dl class="selected-variant-card">
            <div><dt>${t("selectedCode")}</dt><dd id="selectedVariantCode">${escapeHtml(firstVariant.codigo || "")}</dd></div>
            <div><dt>${t("color")}</dt><dd id="selectedVariantColor">${escapeHtml(pick(firstVariant.color))}</dd></div>
          </dl>
          <div class="hero-actions">
            <a class="button button-dark" id="productWhatsApp" href="${productWhatsapp}" target="_blank" rel="noopener">${productCtaText}</a>
            <a class="button button-outline" href="mailto:${contact().email}?subject=${encodeURIComponent(`Consulta B2B ${product.nombre}`)}">${t("emailInnova")}</a>
          </div>
          ${variants.length ? variantSelectorMarkup(product, variants) : ""}
        </div>
      </section>

      <section class="section product-gallery-section">
        <div class="gallery-thumbs" id="galleryThumbs"></div>
      </section>

      <section class="section product-story-grid">
        <div>
          <p class="eyebrow">${t("commercialDescription")}</p>
          <h2>${escapeHtml(product.nombre)} ${t("professionalBuying")}</h2>
          <p>${escapeHtml(pick(product.descripcionCorta))}</p>
          <p>${escapeHtml(pick(product.designStory))}</p>
          <p>${escapeHtml(pick(product.commercialUse))}</p>
          ${product.fuenteCatalogo ? `<p class="source-note">${escapeHtml(pick(product.fuenteCatalogo))}</p>` : ""}
        </div>
        <div>
          <p class="eyebrow">${t("variantsTitle")}</p>
          <h2>${t("availableCodes")}</h2>
          <div class="variant-list" id="variantList">${variantsMarkup(product)}</div>
        </div>
      </section>

      <section class="section product-details-grid">
        <div>
          <p class="eyebrow">${t("technicalDetails")}</p>
          <h2>${t("specificationsCatalogue")}</h2>
          <dl class="spec-list">${specsMarkup(product)}</dl>
        </div>
        <div>
          <p class="eyebrow">${t("materials")}</p>
          <h2>${t("commercialTalkingPoints")}</h2>
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
          <h2>${t("requestAvailabilityInnova")}</h2>
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
          <h2>${t("premiumAssets")}</h2>
          <p>${t("packagingCopy")}</p>
        </div>
        <img src="${asset(content.site?.assets?.packaging || "assets/images/marketing/packaging-ss26.jpg")}" alt="BALMAIN Eyewear packaging SS26" loading="lazy" decoding="async">
      </section>

      <section class="section related-products">
        <div class="section-heading">
          <p class="eyebrow">${t("related")}</p>
          <h2>${t("sameCategory")}</h2>
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
    getInventory,
    currentInventory,
    productStatus,
    statusLabel,
    visibleProducts,
    setLocalInventoryState,
    resetLocalInventory,
    exportInventory,
    renderHome,
    renderCatalog,
    renderCategory,
    renderProduct,
    renderContactSurfaces,
  };
})();
