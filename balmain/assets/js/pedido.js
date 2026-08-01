(function () {
  const STORAGE_KEY = "balmain-professional-order-v1";
  const MINIMUM_UNITS = 50;
  const INNOVA_EMAIL = "info@innova-eyewear.com";
  const INNOVA_WHATSAPP = "17542704613";
  const emptyClient = {
    name: "",
    company: "",
    optical: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    notes: "",
  };

  let state = {
    items: [],
    client: { ...emptyClient },
    orderNumber: "",
  };
  let drawerOpen = false;
  let working = false;
  let statusMessage = "";

  function pick(value) {
    return window.BalmainI18n?.pick(value) || value?.es || value?.en || value || "";
  }

  function safeText(value) {
    return String(value ?? "")
      .replaceAll("•", "-")
      .replaceAll("·", "-")
      .replaceAll("—", "-")
      .replaceAll("–", "-")
      .replaceAll("’", "'")
      .replaceAll("…", "...")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => {
      const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
      return map[char];
    });
  }

  function newOrderNumber() {
    const date = new Date();
    const stamp = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("");
    return `BM-${stamp}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  }

  function read() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (saved?.items && Array.isArray(saved.items)) {
        state = {
          items: saved.items,
          client: { ...emptyClient, ...(saved.client || {}) },
          orderNumber: saved.orderNumber || newOrderNumber(),
        };
        return;
      }
    } catch (_error) {
      localStorage.removeItem(STORAGE_KEY);
    }
    state.orderNumber = newOrderNumber();
  }

  function write() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent("balmain:orderchange", { detail: summary() }));
    syncBoutiqueState();
  }

  function totalUnits() {
    return state.items.reduce((total, item) => total + Number(item.quantity || 0), 0);
  }

  function summary() {
    return {
      references: state.items.length,
      units: totalUnits(),
      minimum: MINIMUM_UNITS,
    };
  }

  function clientValidationErrors() {
    const errors = {};
    ["name", "company", "optical", "city", "country"].forEach((field) => {
      if (!state.client[field].trim()) errors[field] = "Este campo es obligatorio.";
    });
    if (!state.client.email.trim()) {
      errors.email = "El correo profesional es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.client.email.trim())) {
      errors.email = "Usa un correo completo, por ejemplo nombre@empresa.com.";
    }
    if (!state.client.phone.trim()) {
      errors.phone = "El teléfono es obligatorio.";
    } else if (!/^\+\d[\d\s().-]{6,}$/.test(state.client.phone.trim())) {
      errors.phone = "Incluye +, el código del país y al menos 7 dígitos.";
    }
    return errors;
  }

  function clientIssueSummary(errors) {
    const labels = {
      name: "nombre y apellido",
      company: "empresa",
      optical: "nombre de la óptica",
      email: "correo profesional",
      phone: "teléfono",
      city: "ciudad",
      country: "país",
    };
    return Object.keys(errors).map((field) => labels[field]).join(", ");
  }

  function isReady() {
    return state.items.length > 0
      && totalUnits() >= MINIMUM_UNITS
      && Object.keys(clientValidationErrors()).length === 0;
  }

  function productItem(product, variantIndex) {
    const variants = product.variantes || [];
    const variant = variants[variantIndex] || variants[0] || {};
    const rawImage = variant.imagenes?.frontal
      || variant.imagenes?.hero
      || variant.imagenes?.lateral
      || window.BalmainCatalog?.imageFor(product)
      || "";
    const image = rawImage ? window.BalmainCatalog?.asset(rawImage) || rawImage : "";
    const sku = variant.codigo || product.slug;
    return {
      key: `${product.slug}:${sku}`,
      productId: product.slug,
      slug: product.slug,
      model: product.nombre,
      category: pick(product.categoriaLabel),
      collection: product.coleccion || "Balmain Eyewear",
      sku,
      color: pick(variant.color),
      material: (product.materiales || []).join(" + "),
      measurements: product.especificaciones?.size || "",
      image,
      quantity: 1,
    };
  }

  function syncBoutiqueState() {
    window.InnovaBoutiqueOrder?.replace(state.items.map((item) => ({
      productId: item.productId,
      sku: item.sku,
      name: item.model,
      model: item.model,
      color: item.color,
      material: item.material,
      measurements: item.measurements,
      collection: item.collection,
      image: item.image,
      catalogUrl: new URL(`producto.html?slug=${encodeURIComponent(item.slug)}`, window.location.href).href,
      quantity: item.quantity,
    })), state.client);
  }

  function addProduct(product, variantIndex = 0, quantity = 1) {
    const item = productItem(product, variantIndex);
    const safeQuantity = Math.max(1, Math.min(999, Math.floor(Number(quantity)) || 1));
    const found = state.items.find((current) => current.key === item.key);
    if (found) found.quantity = Math.min(9999, found.quantity + safeQuantity);
    else state.items.push({ ...item, quantity: safeQuantity });
    write();
    updateQuickAddLabels();
    renderDrawer();
  }

  async function addBySlug(slug, variantIndex = 0, quantity = 1) {
    const products = await window.BalmainCatalog?.getProducts();
    const product = products?.find((item) => item.slug === slug);
    if (product) addProduct(product, variantIndex, quantity);
  }

  function updateQuantity(key, quantity) {
    const item = state.items.find((entry) => entry.key === key);
    if (!item) return;
    if (quantity < 1) state.items = state.items.filter((entry) => entry.key !== key);
    else item.quantity = Math.min(9999, Math.max(1, Math.floor(quantity) || 1));
    write();
    updateQuickAddLabels();
    renderDrawer();
  }

  function updateQuickAddLabels() {
    document.querySelectorAll("[data-order-add]").forEach((button) => {
      const slug = button.dataset.orderSlug;
      const variantIndex = Number(button.dataset.orderVariant || 0);
      const productKey = `${slug}:`;
      const hasProduct = state.items.some((item) => {
        if (!item.key.startsWith(productKey)) return false;
        if (!Number.isFinite(variantIndex)) return true;
        return true;
      });
      button.textContent = hasProduct ? "Añadir más unidades" : "Añadir al pedido";
      button.classList.toggle("is-added", hasProduct);
    });
    document.querySelectorAll("[data-order-count]").forEach((node) => {
      node.textContent = String(totalUnits());
    });
  }

  function ensureUi() {
    if (document.querySelector("[data-balmain-order]")) return;
    document.body.insertAdjacentHTML("beforeend", `
      <div data-balmain-order>
        <button class="order-fab" type="button" data-order-open aria-label="Abrir mi pedido">
          <span>Mi pedido</span><b data-order-count>0</b>
        </button>
        <div class="order-backdrop" data-order-backdrop hidden>
          <aside class="order-drawer" role="dialog" aria-modal="true" aria-label="Pedido Balmain para revisión">
            <div data-order-drawer-content></div>
          </aside>
        </div>
      </div>
    `);

    document.querySelector("[data-order-open]")?.addEventListener("click", open);
    document.querySelector("[data-order-backdrop]")?.addEventListener("mousedown", (event) => {
      if (event.target === event.currentTarget) close();
    });
    document.addEventListener("click", async (event) => {
      const addButton = event.target.closest("[data-order-add]");
      if (addButton) {
        event.preventDefault();
        await addBySlug(
          addButton.dataset.orderSlug,
          Number(addButton.dataset.orderVariant || 0),
          Number(addButton.dataset.orderQuantity || 1),
        );
      }

      const action = event.target.closest("[data-order-action]")?.dataset.orderAction;
      if (!action) return;
      if (action === "close") close();
      if (action === "catalog") close();
      if (action === "remove") updateQuantity(event.target.closest("[data-order-key]")?.dataset.orderKey, 0);
      if (action === "decrease" || action === "increase") {
        const row = event.target.closest("[data-order-key]");
        const item = state.items.find((entry) => entry.key === row?.dataset.orderKey);
        if (item) updateQuantity(item.key, item.quantity + (action === "increase" ? 1 : -1));
      }
      if (["pdf", "whatsapp", "email"].includes(action)) await runAction(action);
    });
    document.addEventListener("change", (event) => {
      const quantity = event.target.closest("[data-order-qty]");
      if (quantity) updateQuantity(quantity.dataset.orderKey, Number(quantity.value));
    });
    document.addEventListener("input", (event) => {
      const field = event.target.closest("[data-client-field]");
      if (!field) return;
      state.client[field.dataset.clientField] = field.value;
      write();
      refreshValidation();
    });
  }

  function clientField(name, label, type = "text", placeholder = "") {
    return `
      <label>
        <span>${label} *</span>
        <input
          type="${type}"
          value="${escapeHtml(state.client[name])}"
          data-client-field="${name}"
          placeholder="${escapeHtml(placeholder)}"
          ${name === "phone" ? 'pattern="\\+[0-9][0-9\\s().-]{6,}"' : ""}
        >
        <small data-client-error="${name}"></small>
      </label>
    `;
  }

  function renderDrawer() {
    const target = document.querySelector("[data-order-drawer-content]");
    if (!target) return;
    const units = totalUnits();
    const remaining = Math.max(0, MINIMUM_UNITS - units);
    const progress = Math.min(100, (units / MINIMUM_UNITS) * 100);
    const items = state.items.map((item) => `
      <article class="order-item" data-order-key="${escapeHtml(item.key)}">
        <a href="${window.BalmainCatalog?.asset(`producto.html?slug=${encodeURIComponent(item.slug)}`) || `producto.html?slug=${encodeURIComponent(item.slug)}`}">
          ${item.image ? `<img src="${escapeHtml(item.image)}" alt="" loading="lazy">` : ""}
        </a>
        <div>
          <strong>${escapeHtml(item.model)}</strong>
          <span>${escapeHtml(item.sku)} · ${escapeHtml(item.color)}</span>
          <div class="order-quantity">
            <button type="button" data-order-action="decrease" aria-label="Quitar una unidad">−</button>
            <input type="number" min="1" max="9999" value="${item.quantity}" data-order-qty data-order-key="${escapeHtml(item.key)}" aria-label="Cantidad">
            <button type="button" data-order-action="increase" aria-label="Añadir una unidad">+</button>
          </div>
        </div>
        <button class="order-remove" type="button" data-order-action="remove" aria-label="Quitar ${escapeHtml(item.model)}">×</button>
      </article>
    `).join("");

    target.innerHTML = `
      <header class="order-drawer-head">
        <div>
          <p class="eyebrow">Selección profesional · Balmain Eyewear</p>
          <h2>Pedido Balmain para revisión</h2>
          <p>Selecciona referencias y cantidades. Innova confirmará disponibilidad, condiciones comerciales y envío.</p>
          <small>${escapeHtml(state.orderNumber)}</small>
        </div>
        <button type="button" data-order-action="close" aria-label="Cerrar pedido">×</button>
      </header>
      <section class="order-progress">
        <div><strong>${state.items.length}</strong> referencias · <strong>${units}</strong> piezas</div>
        <div class="order-progress-track"><i style="width:${progress}%"></i></div>
        <div>
          <span>${remaining ? `Faltan ${remaining} piezas para completar el mínimo.` : "La selección cumple el mínimo inicial."}</span>
          <b>Mínimo inicial: ${MINIMUM_UNITS} piezas</b>
        </div>
      </section>
      <div class="order-drawer-body">
        <section class="order-items">
          ${items || `
            <div class="order-empty">
              <h3>Todavía no has seleccionado productos.</h3>
              <p>Explora el catálogo y combina modelos o colores hasta alcanzar 50 piezas.</p>
              <a class="button button-dark" href="${document.body.dataset.base || ""}catalogo.html" data-order-action="catalog">Ir al catálogo</a>
            </div>
          `}
        </section>
        <section class="order-client">
          <h3>Datos de la óptica o empresa</h3>
          <p>Estos datos se incluirán en el PDF profesional enviado a Innova Eyewear.</p>
          <div class="order-client-grid">
            ${clientField("name", "Nombre y apellido")}
            ${clientField("company", "Empresa / razón social")}
            ${clientField("optical", "Nombre de la óptica")}
            ${clientField("email", "Correo profesional", "email", "nombre@empresa.com")}
            ${clientField("phone", "Teléfono (+ código del país)", "tel", "+1 754 000 0000")}
            ${clientField("city", "Ciudad")}
            ${clientField("country", "País")}
            <label class="order-client-notes">
              <span>Observaciones</span>
              <textarea rows="3" data-client-field="notes">${escapeHtml(state.client.notes)}</textarea>
            </label>
          </div>
        </section>
        <section class="order-actions">
          <p data-order-validation></p>
          <button class="button button-dark" type="button" data-order-action="pdf">Descargar PDF del pedido</button>
          <button class="button order-whatsapp" type="button" data-order-action="whatsapp">Descargar PDF y abrir WhatsApp</button>
          <button class="button button-outline" type="button" data-order-action="email">Descargar PDF y preparar correo</button>
          <small>Adjunta manualmente el PDF descargado. El documento no confirma disponibilidad ni condiciones comerciales.</small>
          ${statusMessage ? `<div class="order-notice" role="status">${escapeHtml(statusMessage)}</div>` : ""}
        </section>
      </div>
    `;
    refreshValidation();
    updateQuickAddLabels();
  }

  function refreshValidation() {
    const units = totalUnits();
    const errors = clientValidationErrors();
    const ready = isReady();
    const validation = document.querySelector("[data-order-validation]");
    if (validation) {
      const blockers = [];
      if (!state.items.length) blockers.push("Añade productos a la selección.");
      else if (units < MINIMUM_UNITS) blockers.push(`Faltan ${MINIMUM_UNITS - units} piezas para completar el mínimo.`);
      if (Object.keys(errors).length) blockers.push(`Revisa: ${clientIssueSummary(errors)}.`);
      validation.textContent = ready
        ? "Pedido completo y listo para preparar."
        : `No se puede descargar todavía. ${blockers.join(" ")}`;
      validation.classList.toggle("is-ready", ready);
    }
    document.querySelectorAll("[data-client-field]").forEach((field) => {
      const message = errors[field.dataset.clientField] || "";
      field.toggleAttribute("aria-invalid", Boolean(message));
      field.closest("label")?.classList.toggle("has-error", Boolean(message));
      const error = field.closest("label")?.querySelector("[data-client-error]");
      if (error) error.textContent = message;
    });
    document.querySelectorAll("[data-order-action='pdf'], [data-order-action='whatsapp'], [data-order-action='email']")
      .forEach((button) => { button.disabled = !ready || working; });
  }

  function open() {
    drawerOpen = true;
    const backdrop = document.querySelector("[data-order-backdrop]");
    if (backdrop) backdrop.hidden = false;
    document.body.classList.add("order-open");
    renderDrawer();
  }

  function close() {
    drawerOpen = false;
    const backdrop = document.querySelector("[data-order-backdrop]");
    if (backdrop) backdrop.hidden = true;
    document.body.classList.remove("order-open");
  }

  function fileSlug() {
    const company = safeText(state.client.optical || state.client.company || "cliente")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60);
    return `${state.orderNumber.toLowerCase()}-balmain-${company}`;
  }

  function professionalMessage() {
    const lines = state.items.map((item) => `- ${item.model} | ${item.sku} | ${item.color} | ${item.quantity} piezas`);
    return [
      "PEDIDO BALMAIN PARA REVISIÓN",
      state.orderNumber,
      "",
      `Nombre: ${state.client.name}`,
      `Empresa: ${state.client.company}`,
      `Óptica: ${state.client.optical}`,
      `Correo: ${state.client.email}`,
      `Teléfono: ${state.client.phone}`,
      `Ciudad: ${state.client.city}`,
      `País: ${state.client.country}`,
      "",
      `${state.items.length} referencias · ${totalUnits()} piezas`,
      ...lines,
      state.client.notes ? `Observaciones: ${state.client.notes}` : "",
      "",
      `Adjuntar: ${fileSlug()}.pdf`,
    ].filter(Boolean).join("\n");
  }

  async function imageAsJpeg(source) {
    if (!source) return null;
    const response = await fetch(new URL(source, window.location.href).href);
    const blob = await response.blob();
    const bitmap = await createImageBitmap(blob);
    const canvas = document.createElement("canvas");
    const scale = Math.min(1, 700 / Math.max(bitmap.width, bitmap.height));
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext("2d");
    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    return fetch(canvas.toDataURL("image/jpeg", 0.82)).then((result) => result.arrayBuffer());
  }

  async function createPdf() {
    if (!window.PDFLib) throw new Error("PDF unavailable");
    const { PDFDocument, StandardFonts, rgb } = window.PDFLib;
    const pdf = await PDFDocument.create();
    const regular = await pdf.embedFont(StandardFonts.Helvetica);
    const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
    const width = 595.28;
    const height = 841.89;
    const margin = 42;

    async function embed(source) {
      try {
        const bytes = await imageAsJpeg(source);
        return bytes ? await pdf.embedJpg(bytes) : null;
      } catch (_error) {
        return null;
      }
    }

    const base = document.body.dataset.base || "";
    const [brandLogo, innovaLogo] = await Promise.all([
      embed(`${base}assets/images/marca/balmain-logo.png`),
      embed(`${base}assets/images/marca/innova-official.png`),
    ]);

    function addPage() {
      const page = pdf.addPage([width, height]);
      page.drawRectangle({ x: 0, y: height - 82, width, height: 82, color: rgb(0.965, 0.96, 0.95) });
      page.drawLine({ start: { x: 0, y: height - 82 }, end: { x: width, y: height - 82 }, thickness: 1.5, color: rgb(0.07, 0.07, 0.07) });
      if (brandLogo) {
        const dims = brandLogo.scaleToFit(135, 42);
        page.drawImage(brandLogo, { x: margin, y: height - 63, width: dims.width, height: dims.height });
      } else page.drawText("BALMAIN PARIS", { x: margin, y: height - 52, size: 16, font: bold });
      if (innovaLogo) {
        const dims = innovaLogo.scaleToFit(90, 42);
        page.drawImage(innovaLogo, { x: width - margin - dims.width, y: height - 63, width: dims.width, height: dims.height });
      } else page.drawText("INNOVA EYEWEAR", { x: width - 146, y: height - 52, size: 10, font: bold });
      return page;
    }

    let page = addPage();
    let y = height - 116;
    page.drawText("PEDIDO PROFESIONAL B2B", { x: margin, y, size: 17, font: bold });
    y -= 18;
    page.drawText(`${safeText(state.orderNumber)} - ${new Date().toLocaleDateString("es")}`, { x: margin, y, size: 8, font: regular });
    y -= 28;
    page.drawRectangle({ x: margin, y: y - 104, width: width - margin * 2, height: 112, color: rgb(0.975, 0.978, 0.98) });
    y -= 14;
    [
      `Cliente: ${state.client.name}`,
      `Empresa: ${state.client.company}`,
      `Optica: ${state.client.optical}`,
      `Correo: ${state.client.email}`,
      `Telefono: ${state.client.phone}`,
      `Ciudad: ${state.client.city} - Pais: ${state.client.country}`,
      `${state.items.length} referencias - ${totalUnits()} piezas - minimo inicial ${MINIMUM_UNITS}`,
    ].forEach((line) => {
      page.drawText(safeText(line), { x: margin, y, size: 8, font: regular });
      y -= 13;
    });
    y -= 22;

    for (const item of state.items) {
      if (y < 105) {
        page = addPage();
        y = height - 112;
      }
      page.drawRectangle({ x: margin, y: y - 61, width: width - margin * 2, height: 66, color: rgb(0.985, 0.98, 0.975) });
      const image = await embed(item.image);
      if (image) {
        const dims = image.scaleToFit(105, 48);
        page.drawImage(image, { x: margin + 6, y: y - 52, width: dims.width, height: dims.height });
      }
      page.drawText(safeText(item.model), { x: margin + 122, y: y - 13, size: 10, font: bold });
      page.drawText(safeText(`${item.sku} - ${item.color || "Color por confirmar"}`), { x: margin + 122, y: y - 29, size: 7.5, font: regular });
      page.drawText(safeText(`${item.material || "Material por confirmar"} - ${item.measurements || ""}`), { x: margin + 122, y: y - 44, size: 7, font: regular });
      page.drawText(String(item.quantity), { x: width - margin - 35, y: y - 26, size: 16, font: bold });
      page.drawText("PIEZAS", { x: width - margin - 40, y: y - 40, size: 6.5, font: regular });
      y -= 75;
    }

    page.drawText("Documento preliminar. Innova Eyewear confirmara inventario, condiciones comerciales y transporte.", {
      x: margin,
      y: 55,
      size: 7.5,
      font: regular,
    });
    pdf.getPages().forEach((current, index, pages) => {
      current.drawLine({ start: { x: margin, y: 39 }, end: { x: width - margin, y: 39 }, thickness: 0.5, color: rgb(0.82, 0.82, 0.82) });
      current.drawText(`${state.orderNumber} - ${INNOVA_EMAIL}`, { x: margin, y: 23, size: 7, font: regular });
      current.drawText(`${index + 1}/${pages.length}`, { x: width - margin - 18, y: 23, size: 7, font: regular });
    });
    return new Blob([await pdf.save()], { type: "application/pdf" });
  }

  function download(blob, filename) {
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = filename;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(href), 1500);
  }

  async function runAction(action) {
    if (!isReady() || working) return;
    working = true;
    statusMessage = "";
    refreshValidation();
    try {
      const blob = await createPdf();
      download(blob, `${fileSlug()}.pdf`);
      if (action === "whatsapp") {
        window.open(`https://wa.me/${INNOVA_WHATSAPP}?text=${encodeURIComponent(professionalMessage())}`, "_blank", "noopener,noreferrer");
        statusMessage = "PDF descargado. Adjunta el archivo al mensaje de WhatsApp.";
      } else if (action === "email") {
        window.location.href = `mailto:${INNOVA_EMAIL}?subject=${encodeURIComponent(`${state.orderNumber} · Balmain · ${state.client.optical}`)}&body=${encodeURIComponent(professionalMessage())}`;
        statusMessage = "PDF descargado. Adjunta el archivo al correo preparado.";
      } else {
        statusMessage = "PDF del pedido descargado.";
      }
    } catch (_error) {
      statusMessage = "No se pudo preparar el PDF. Inténtalo de nuevo.";
    } finally {
      working = false;
      if (drawerOpen) renderDrawer();
    }
  }

  function init() {
    read();
    ensureUi();
    updateQuickAddLabels();
    window.setTimeout(syncBoutiqueState, 0);
    window.addEventListener("balmain:languagechange", renderDrawer);
  }

  window.BalmainOrder = {
    init,
    open,
    close,
    addProduct,
    addBySlug,
    summary,
    refresh: updateQuickAddLabels,
    hasProduct(slug) {
      return state.items.some((item) => item.slug === slug);
    },
  };
})();
