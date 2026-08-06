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

  const copy = {
    addMore: { es: "Añadir más unidades", en: "Add more units", fr: "Ajouter des unités" },
    addSelection: { es: "Añadir a la selección", en: "Add to selection", fr: "Ajouter à la sélection" },
    openSelection: { es: "Abrir mi selección", en: "Open my selection", fr: "Ouvrir ma sélection" },
    mySelection: { es: "Mi selección", en: "My selection", fr: "Ma sélection" },
    dialogLabel: { es: "Selección Balmain para revisión", en: "Balmain selection for review", fr: "Sélection Balmain à valider" },
    required: { es: "Este campo es obligatorio.", en: "This field is required.", fr: "Ce champ est obligatoire." },
    emailRequired: { es: "El correo profesional es obligatorio.", en: "A professional email address is required.", fr: "Une adresse e-mail professionnelle est requise." },
    emailInvalid: { es: "Usa un correo completo, por ejemplo nombre@empresa.com.", en: "Enter a complete address, for example name@company.com.", fr: "Saisissez une adresse complète, par exemple nom@entreprise.com." },
    phoneRequired: { es: "El teléfono es obligatorio.", en: "A telephone number is required.", fr: "Un numéro de téléphone est requis." },
    phoneInvalid: { es: "Incluye +, el código del país y al menos 7 dígitos.", en: "Include +, the country code and at least 7 digits.", fr: "Indiquez +, l'indicatif du pays et au moins 7 chiffres." },
    name: { es: "nombre y apellido", en: "full name", fr: "nom et prénom" },
    company: { es: "empresa", en: "company", fr: "entreprise" },
    optical: { es: "nombre de la óptica", en: "optical practice name", fr: "nom de l'opticien" },
    email: { es: "correo profesional", en: "professional email", fr: "e-mail professionnel" },
    phone: { es: "teléfono", en: "telephone", fr: "téléphone" },
    city: { es: "ciudad", en: "city", fr: "ville" },
    country: { es: "país", en: "country", fr: "pays" },
    decrease: { es: "Quitar una unidad", en: "Remove one unit", fr: "Retirer une unité" },
    quantity: { es: "Cantidad", en: "Quantity", fr: "Quantité" },
    increase: { es: "Añadir una unidad", en: "Add one unit", fr: "Ajouter une unité" },
    remove: { es: "Quitar {model}", en: "Remove {model}", fr: "Retirer {model}" },
    eyebrow: { es: "Selección profesional · Balmain Eyewear", en: "Professional selection · Balmain Eyewear", fr: "Sélection professionnelle · Balmain Eyewear" },
    title: { es: "Selección Balmain para revisión", en: "Balmain selection for review", fr: "Sélection Balmain à valider" },
    intro: { es: "Selecciona referencias y cantidades. Innova confirmará disponibilidad, condiciones comerciales y envío.", en: "Select references and quantities. Innova will confirm availability, commercial terms and shipping.", fr: "Sélectionnez les références et les quantités. Innova confirmera la disponibilité, les conditions commerciales et l'expédition." },
    close: { es: "Cerrar selección", en: "Close selection", fr: "Fermer la sélection" },
    referencesPieces: { es: "{references} referencias · {units} piezas", en: "{references} references · {units} units", fr: "{references} références · {units} pièces" },
    remaining: { es: "Faltan {count} piezas para completar el mínimo.", en: "{count} more units are required to reach the minimum.", fr: "Il manque {count} pièces pour atteindre le seuil minimum." },
    minimumMet: { es: "La selección cumple el mínimo profesional.", en: "The selection meets the professional minimum.", fr: "La sélection atteint le seuil professionnel." },
    minimum: { es: "Mínimo profesional: {count} piezas", en: "Professional minimum: {count} units", fr: "Seuil professionnel : {count} pièces" },
    emptyTitle: { es: "Todavía no has seleccionado productos.", en: "You have not selected any products yet.", fr: "Vous n'avez encore sélectionné aucun produit." },
    emptyBody: { es: "Explora el catálogo y combina modelos o coloridos hasta alcanzar {count} piezas.", en: "Explore the catalogue and combine models or colourways to reach {count} units.", fr: "Parcourez le catalogue et associez modèles et coloris jusqu'à atteindre {count} pièces." },
    catalogue: { es: "Ir al catálogo", en: "View catalogue", fr: "Voir le catalogue" },
    clientTitle: { es: "Datos de la óptica o empresa", en: "Optical practice or company details", fr: "Coordonnées de l'opticien ou de l'entreprise" },
    clientIntro: { es: "Estos datos se incluirán en el PDF profesional enviado a Innova Eyewear.", en: "These details will be included in the professional PDF sent to Innova Eyewear.", fr: "Ces informations figureront dans le PDF professionnel transmis à Innova Eyewear." },
    fullName: { es: "Nombre y apellido", en: "Full name", fr: "Nom et prénom" },
    companyLegal: { es: "Empresa / razón social", en: "Company / legal name", fr: "Entreprise / raison sociale" },
    opticalName: { es: "Nombre de la óptica", en: "Optical practice name", fr: "Nom de l'opticien" },
    professionalEmail: { es: "Correo profesional", en: "Professional email", fr: "E-mail professionnel" },
    phoneCountry: { es: "Teléfono (+ código del país)", en: "Telephone (+ country code)", fr: "Téléphone (+ indicatif du pays)" },
    notes: { es: "Observaciones", en: "Notes", fr: "Observations" },
    pdf: { es: "Descargar PDF de la selección", en: "Download selection PDF", fr: "Télécharger le PDF de la sélection" },
    whatsapp: { es: "Descargar PDF y abrir WhatsApp", en: "Download PDF and open WhatsApp", fr: "Télécharger le PDF et ouvrir WhatsApp" },
    prepareEmail: { es: "Descargar PDF y preparar correo", en: "Download PDF and prepare email", fr: "Télécharger le PDF et préparer l'e-mail" },
    attachment: { es: "Adjunta manualmente el PDF descargado. El documento no confirma disponibilidad ni condiciones comerciales.", en: "Attach the downloaded PDF manually. The document does not confirm availability or commercial terms.", fr: "Joignez manuellement le PDF téléchargé. Ce document ne confirme ni la disponibilité ni les conditions commerciales." },
    addProducts: { es: "Añade productos a la selección.", en: "Add products to the selection.", fr: "Ajoutez des produits à la sélection." },
    review: { es: "Revisa: {fields}.", en: "Review: {fields}.", fr: "Vérifiez : {fields}." },
    ready: { es: "Selección completa y lista para revisión comercial.", en: "Selection complete and ready for commercial review.", fr: "Sélection complète et prête pour validation commerciale." },
    notReady: { es: "La descarga aún no está disponible. {blockers}", en: "The download is not available yet. {blockers}", fr: "Le téléchargement n'est pas encore disponible. {blockers}" },
    pdfWhatsappDone: { es: "PDF descargado. Adjunta el archivo al mensaje de WhatsApp.", en: "PDF downloaded. Attach the file to the WhatsApp message.", fr: "PDF téléchargé. Joignez le fichier au message WhatsApp." },
    pdfEmailDone: { es: "PDF descargado. Adjunta el archivo al correo preparado.", en: "PDF downloaded. Attach the file to the prepared email.", fr: "PDF téléchargé. Joignez le fichier à l'e-mail préparé." },
    pdfDone: { es: "PDF de la selección descargado.", en: "Selection PDF downloaded.", fr: "PDF de la sélection téléchargé." },
    pdfError: { es: "No se pudo preparar el PDF. Revisa los datos obligatorios e inténtalo de nuevo.", en: "The PDF could not be prepared. Review the required details and try again.", fr: "Le PDF n'a pas pu être préparé. Vérifiez les informations obligatoires, puis réessayez." },
    messageTitle: { es: "SELECCIÓN BALMAIN PARA REVISIÓN", en: "BALMAIN SELECTION FOR REVIEW", fr: "SÉLECTION BALMAIN À VALIDER" },
    labelName: { es: "Nombre", en: "Name", fr: "Nom" },
    labelCompany: { es: "Empresa", en: "Company", fr: "Entreprise" },
    labelOptical: { es: "Óptica", en: "Optical practice", fr: "Opticien" },
    labelEmail: { es: "Correo", en: "Email", fr: "E-mail" },
    labelPhone: { es: "Teléfono", en: "Telephone", fr: "Téléphone" },
    labelCity: { es: "Ciudad", en: "City", fr: "Ville" },
    labelCountry: { es: "País", en: "Country", fr: "Pays" },
    labelNotes: { es: "Observaciones", en: "Notes", fr: "Observations" },
    attachmentLabel: { es: "Adjuntar", en: "Attach", fr: "Pièce jointe" },
    pdfTitle: { es: "SELECCIÓN PROFESIONAL B2B", en: "B2B PROFESSIONAL SELECTION", fr: "SÉLECTION PROFESSIONNELLE B2B" },
    client: { es: "Cliente", en: "Client", fr: "Client" },
    pdfSummary: { es: "{references} referencias - {units} piezas - mínimo profesional {minimum}", en: "{references} references - {units} units - professional minimum {minimum}", fr: "{references} références - {units} pièces - seuil professionnel {minimum}" },
    colourPending: { es: "Color por confirmar", en: "Colour to be confirmed", fr: "Coloris à confirmer" },
    materialPending: { es: "Material por confirmar", en: "Material to be confirmed", fr: "Matière à confirmer" },
    piecesUpper: { es: "PIEZAS", en: "UNITS", fr: "PIÈCES" },
    disclaimer: { es: "Documento preliminar. Innova Eyewear confirmará inventario, condiciones comerciales y transporte.", en: "Preliminary document. Innova Eyewear will confirm inventory, commercial terms and shipping.", fr: "Document préliminaire. Innova Eyewear confirmera le stock, les conditions commerciales et l'expédition." },
  };

  function t(key, values = {}) {
    let value = pick(copy[key] || key);
    Object.entries(values).forEach(([name, replacement]) => {
      value = value.replaceAll(`{${name}}`, String(replacement));
    });
    return value;
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
      if (!state.client[field].trim()) errors[field] = t("required");
    });
    if (!state.client.email.trim()) {
      errors.email = t("emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.client.email.trim())) {
      errors.email = t("emailInvalid");
    }
    if (!state.client.phone.trim()) {
      errors.phone = t("phoneRequired");
    } else if (!/^\+\d[\d\s().-]{6,}$/.test(state.client.phone.trim())) {
      errors.phone = t("phoneInvalid");
    }
    return errors;
  }

  function clientIssueSummary(errors) {
    const labels = {
      name: t("name"),
      company: t("company"),
      optical: t("optical"),
      email: t("email"),
      phone: t("phone"),
      city: t("city"),
      country: t("country"),
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
      button.textContent = hasProduct ? t("addMore") : t("addSelection");
      button.classList.toggle("is-added", hasProduct);
    });
    document.querySelectorAll("[data-order-count]").forEach((node) => {
      node.textContent = String(totalUnits());
    });
    const opener = document.querySelector("[data-order-open]");
    if (opener) {
      opener.setAttribute("aria-label", t("openSelection"));
      const label = opener.querySelector("span");
      if (label) label.textContent = t("mySelection");
    }
    document.querySelector(".order-drawer")?.setAttribute("aria-label", t("dialogLabel"));
  }

  function ensureUi() {
    if (document.querySelector("[data-balmain-order]")) return;
    document.body.insertAdjacentHTML("beforeend", `
      <div data-balmain-order>
        <button class="order-fab" type="button" data-order-open aria-label="${escapeHtml(t("openSelection"))}">
          <span>${escapeHtml(t("mySelection"))}</span><b data-order-count>0</b>
        </button>
        <div class="order-backdrop" data-order-backdrop hidden>
          <aside class="order-drawer" role="dialog" aria-modal="true" aria-label="${escapeHtml(t("dialogLabel"))}">
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
            <button type="button" data-order-action="decrease" aria-label="${escapeHtml(t("decrease"))}">−</button>
            <input type="number" min="1" max="9999" value="${item.quantity}" data-order-qty data-order-key="${escapeHtml(item.key)}" aria-label="${escapeHtml(t("quantity"))}">
            <button type="button" data-order-action="increase" aria-label="${escapeHtml(t("increase"))}">+</button>
          </div>
        </div>
        <button class="order-remove" type="button" data-order-action="remove" aria-label="${escapeHtml(t("remove", { model: item.model }))}">×</button>
      </article>
    `).join("");

    target.innerHTML = `
      <header class="order-drawer-head">
        <div>
          <p class="eyebrow">${escapeHtml(t("eyebrow"))}</p>
          <h2>${escapeHtml(t("title"))}</h2>
          <p>${escapeHtml(t("intro"))}</p>
          <small>${escapeHtml(state.orderNumber)}</small>
        </div>
        <button type="button" data-order-action="close" aria-label="${escapeHtml(t("close"))}">×</button>
      </header>
      <section class="order-progress">
        <div>${escapeHtml(t("referencesPieces", { references: state.items.length, units }))}</div>
        <div class="order-progress-track"><i style="width:${progress}%"></i></div>
        <div>
          <span>${escapeHtml(remaining ? t("remaining", { count: remaining }) : t("minimumMet"))}</span>
          <b>${escapeHtml(t("minimum", { count: MINIMUM_UNITS }))}</b>
        </div>
      </section>
      <div class="order-drawer-body">
        <section class="order-items">
          ${items || `
            <div class="order-empty">
              <h3>${escapeHtml(t("emptyTitle"))}</h3>
              <p>${escapeHtml(t("emptyBody", { count: MINIMUM_UNITS }))}</p>
              <a class="button button-dark" href="${document.body.dataset.base || ""}catalogo.html" data-order-action="catalog">${escapeHtml(t("catalogue"))}</a>
            </div>
          `}
        </section>
        <section class="order-client">
          <h3>${escapeHtml(t("clientTitle"))}</h3>
          <p>${escapeHtml(t("clientIntro"))}</p>
          <div class="order-client-grid">
            ${clientField("name", t("fullName"))}
            ${clientField("company", t("companyLegal"))}
            ${clientField("optical", t("opticalName"))}
            ${clientField("email", t("professionalEmail"), "email", "name@company.com")}
            ${clientField("phone", t("phoneCountry"), "tel", "+1 754 000 0000")}
            ${clientField("city", t("city"))}
            ${clientField("country", t("country"))}
            <label class="order-client-notes">
              <span>${escapeHtml(t("notes"))}</span>
              <textarea rows="3" data-client-field="notes">${escapeHtml(state.client.notes)}</textarea>
            </label>
          </div>
        </section>
        <section class="order-actions">
          <p data-order-validation></p>
          <button class="button button-dark" type="button" data-order-action="pdf">${escapeHtml(t("pdf"))}</button>
          <button class="button order-whatsapp" type="button" data-order-action="whatsapp">${escapeHtml(t("whatsapp"))}</button>
          <button class="button button-outline" type="button" data-order-action="email">${escapeHtml(t("prepareEmail"))}</button>
          <small>${escapeHtml(t("attachment"))}</small>
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
      if (!state.items.length) blockers.push(t("addProducts"));
      else if (units < MINIMUM_UNITS) blockers.push(t("remaining", { count: MINIMUM_UNITS - units }));
      if (Object.keys(errors).length) blockers.push(t("review", { fields: clientIssueSummary(errors) }));
      validation.textContent = ready
        ? t("ready")
        : t("notReady", { blockers: blockers.join(" ") });
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
    const lines = state.items.map((item) => `- ${item.model} | ${item.sku} | ${item.color} | ${item.quantity} ${t("piecesUpper").toLowerCase()}`);
    return [
      t("messageTitle"),
      state.orderNumber,
      "",
      `${t("labelName")}: ${state.client.name}`,
      `${t("labelCompany")}: ${state.client.company}`,
      `${t("labelOptical")}: ${state.client.optical}`,
      `${t("labelEmail")}: ${state.client.email}`,
      `${t("labelPhone")}: ${state.client.phone}`,
      `${t("labelCity")}: ${state.client.city}`,
      `${t("labelCountry")}: ${state.client.country}`,
      "",
      t("referencesPieces", { references: state.items.length, units: totalUnits() }),
      ...lines,
      state.client.notes ? `${t("labelNotes")}: ${state.client.notes}` : "",
      "",
      `${t("attachmentLabel")}: ${fileSlug()}.pdf`,
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
    page.drawText(safeText(t("pdfTitle")), { x: margin, y, size: 17, font: bold });
    y -= 18;
    const dateLocale = { es: "es-ES", en: "en-US", fr: "fr-FR" }[window.BalmainI18n?.current?.()] || "es-ES";
    page.drawText(`${safeText(state.orderNumber)} - ${new Date().toLocaleDateString(dateLocale)}`, { x: margin, y, size: 8, font: regular });
    y -= 28;
    page.drawRectangle({ x: margin, y: y - 104, width: width - margin * 2, height: 112, color: rgb(0.975, 0.978, 0.98) });
    y -= 14;
    [
      `${t("client")}: ${state.client.name}`,
      `${t("labelCompany")}: ${state.client.company}`,
      `${t("labelOptical")}: ${state.client.optical}`,
      `${t("labelEmail")}: ${state.client.email}`,
      `${t("labelPhone")}: ${state.client.phone}`,
      `${t("labelCity")}: ${state.client.city} - ${t("labelCountry")}: ${state.client.country}`,
      t("pdfSummary", { references: state.items.length, units: totalUnits(), minimum: MINIMUM_UNITS }),
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
      page.drawText(safeText(`${item.sku} - ${item.color || t("colourPending")}`), { x: margin + 122, y: y - 29, size: 7.5, font: regular });
      page.drawText(safeText(`${item.material || t("materialPending")} - ${item.measurements || ""}`), { x: margin + 122, y: y - 44, size: 7, font: regular });
      page.drawText(String(item.quantity), { x: width - margin - 35, y: y - 26, size: 16, font: bold });
      page.drawText(safeText(t("piecesUpper")), { x: width - margin - 40, y: y - 40, size: 6.5, font: regular });
      y -= 75;
    }

    page.drawText(safeText(t("disclaimer")), {
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
    const bytes = await pdf.save();
    const safeBuffer = new Uint8Array(bytes.byteLength);
    safeBuffer.set(bytes);
    return new Blob([safeBuffer.buffer], { type: "application/pdf" });
  }

  function download(blob, filename) {
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = filename;
    anchor.hidden = true;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(href), 2500);
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
        statusMessage = t("pdfWhatsappDone");
      } else if (action === "email") {
        window.location.href = `mailto:${INNOVA_EMAIL}?subject=${encodeURIComponent(`${state.orderNumber} · Balmain · ${state.client.optical}`)}&body=${encodeURIComponent(professionalMessage())}`;
        statusMessage = t("pdfEmailDone");
      } else {
        statusMessage = t("pdfDone");
      }
    } catch (error) {
      console.error("Balmain PDF error", error);
      statusMessage = t("pdfError");
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
