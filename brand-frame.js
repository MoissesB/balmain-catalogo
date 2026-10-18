(function () {
  const ORDER_STORAGE_KEY = "innova-boutique-order-v1";
  const body = document.body;
  const brand = body.dataset.brand || "";
  const source = body.dataset.source || "";
  const frame = document.querySelector("[data-brand-frame]");
  const loader = document.querySelector("[data-brand-loader]");
  let orderOverlay = document.querySelector("[data-brand-order-overlay]");
  let orderFrame = document.querySelector("[data-brand-order-frame]");
  if (!frame || !source) return;

  if (!orderOverlay) {
    orderOverlay = document.createElement("div");
    orderOverlay.className = "brand-order-overlay";
    orderOverlay.dataset.brandOrderOverlay = "";
    orderOverlay.hidden = true;
    orderOverlay.innerHTML = '<button class="brand-order-close" type="button" data-brand-order-close aria-label="Cerrar selección">×</button><iframe class="brand-order-frame" data-brand-order-frame title="Mi selección de Innova Boutique" allowtransparency="true"></iframe>';
    document.body.appendChild(orderOverlay);
    orderFrame = orderOverlay.querySelector("[data-brand-order-frame]");
  }

  const dock = document.createElement("div");
  dock.id = "brand-catalog-dock";
  dock.className = "brand-catalog-dock";
  dock.innerHTML = `
    <div class="brand-catalog-dock__help">
      <button class="brand-catalog-dock__help-trigger" type="button" aria-expanded="false" aria-controls="brand-buying-help"><span><small>COMPRA PROFESIONAL</small><b>Cómo comprar</b></span><i aria-hidden="true">?</i></button>
      <aside class="brand-catalog-dock__help-panel" id="brand-buying-help" hidden>
        <strong>Cómo preparar tu selección</strong>
        <p>Elige modelos, acabados y cantidades en cualquiera de las cuatro marcas. Revisa el pedido global y descarga el PDF para contactar a Innova.</p>
        <p>Disponibilidad y condiciones sujetas a confirmación comercial.</p>
        <a href="${location.origin}/#seleccion" target="_top">Ver el proceso de compra →</a>
      </aside>
    </div>
    <nav class="brand-catalog-dock__brands" aria-label="Cambiar catálogo de marca">
      <a href="${location.origin}/alfred-kerbs/" aria-label="Abrir Alfred Kerbs"><img src="${location.origin}/assets/alfred-kerbs-logo.png" alt="Alfred Kerbs"></a>
      <a href="${location.origin}/balmain/" aria-label="Abrir Balmain Eyewear"><img src="${location.origin}/assets/balmain-logo-transparent.png" alt="Balmain"></a>
      <a href="${location.origin}/silhouette/" aria-label="Abrir Silhouette"><img src="${location.origin}/assets/logos/silhouette-on-light.png" alt="Silhouette"></a>
      <a href="${location.origin}/jisco-en-construccion/" aria-label="Abrir JISCO"><img src="${location.origin}/assets/jisco-logo-original.png" alt="JISCO"></a>
    </nav>
    <button class="brand-catalog-dock__order" type="button" aria-label="Abrir mi selección"><span>MI SELECCIÓN</span><b data-brand-order-count>0</b></button>`;
  document.body.appendChild(dock);
  const dockToggle = document.createElement("button");
  dockToggle.className = "brand-catalog-dock__toggle";
  dockToggle.type = "button";
  dockToggle.setAttribute("aria-controls", dock.id);
  document.body.appendChild(dockToggle);
  const dockPreferenceKey = "innova-brand-dock-collapsed-v1";
  let dockCollapsed = false;
  let brandModalOpen = false;
  try { dockCollapsed = localStorage.getItem(dockPreferenceKey) === "1"; } catch {}
  function updateDockVisibility() {
    dock.hidden = dockCollapsed || brandModalOpen;
    dockToggle.hidden = brandModalOpen;
    dockToggle.setAttribute("aria-expanded", String(!dockCollapsed));
    dockToggle.setAttribute("aria-label", dockCollapsed ? "Mostrar barra de marcas y selección" : "Ocultar barra de marcas y selección");
    dockToggle.textContent = dockCollapsed ? "↑" : "↓";
    dockToggle.classList.toggle("is-collapsed", dockCollapsed);
  }
  dockToggle.addEventListener("click", () => {
    dockCollapsed = !dockCollapsed;
    if (dockCollapsed) {
      const panel = dock.querySelector(".brand-catalog-dock__help-panel");
      panel.hidden = true;
      dock.querySelector(".brand-catalog-dock__help-trigger").setAttribute("aria-expanded", "false");
    }
    try { localStorage.setItem(dockPreferenceKey, dockCollapsed ? "1" : "0"); } catch {}
    updateDockVisibility();
  });
  updateDockVisibility();
  const currentBrand = dock.querySelector(`.brand-catalog-dock__brands a[href="${location.origin}/${brand}/"]`);
  currentBrand?.setAttribute("aria-current", "page");
  const helpTrigger = dock.querySelector(".brand-catalog-dock__help-trigger");
  const helpPanel = dock.querySelector(".brand-catalog-dock__help-panel");
  helpTrigger.addEventListener("click", () => {
    helpPanel.hidden = !helpPanel.hidden;
    helpTrigger.setAttribute("aria-expanded", String(!helpPanel.hidden));
  });
  dock.querySelector(".brand-catalog-dock__order").addEventListener("click", showOrder);

  const sourceUrl = new URL(source);
  const sourceOrigin = sourceUrl.origin;

  function currentRoute() {
    const value = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    return value.startsWith("/") ? value : "/";
  }

  function targetUrl(route) {
    if (brand === "jisco") return `${source.replace(/\/+$/, "/")}?v=20261018-jisco-blog#${route}`;
    if (brand === "silhouette") return `${source.replace(/\/+$/, "/")}?v=20261018-jisco-nav#${route}`;
    return new URL(route.replace(/^\/+/, ""), source.replace(/\/+$/, "/")).href;
  }

  function showRoute() {
    const target = targetUrl(currentRoute());
    if (frame.dataset.target === target) return;
    frame.dataset.target = target;
    frame.src = target;
  }

  function readGlobalOrder() {
    try {
      const saved = JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY) || "null");
      return saved && Array.isArray(saved.items) ? saved : { items: [], client: {} };
    } catch {
      return { items: [], client: {} };
    }
  }

  function updateOrderCount() {
    const count = readGlobalOrder().items.reduce((total, item) => total + Number(item.quantity || 0), 0);
    dock.querySelector("[data-brand-order-count]").textContent = String(count);
  }
  updateOrderCount();
  window.addEventListener("storage", updateOrderCount);

  function saveBrandOrder(payload) {
    const order = readGlobalOrder();
    order.items = order.items.filter((item) => item.brand !== brand);
    for (const item of Array.isArray(payload.items) ? payload.items : []) {
      if (!item || payload.brand !== brand) continue;
      const key = String(item.key || `${brand}:${item.sku || item.productId}`);
      order.items.push({ ...item, brand, key, quantity: Math.max(1, Math.min(9999, Number(item.quantity) || 1)) });
    }
    if (payload.client && typeof payload.client === "object") {
      order.client = { ...(order.client || {}) };
      for (const [field, value] of Object.entries(payload.client)) {
        if (typeof value === "string" && value.trim()) order.client[field] = value;
      }
    }
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
    updateOrderCount();
    frame.contentWindow?.postMessage({
      type: "innova-boutique:order-updated",
      count: order.items.reduce((total, item) => total + Number(item.quantity || 0), 0),
    }, sourceOrigin);
  }

  frame.addEventListener("load", () => loader?.classList.add("is-hidden"));
  function showOrder() {
    if (!orderOverlay || !orderFrame) return;
    orderOverlay.hidden = false;
    if (!orderFrame.src) orderFrame.src = `${location.origin}/?embeddedOrder=1&v=20261017-revision2#pedido`;
    else orderFrame.contentWindow?.location.reload();
  }
  function hideOrder() {
    if (orderOverlay) orderOverlay.hidden = true;
    frame.contentWindow?.focus();
  }
  orderOverlay?.querySelector("[data-brand-order-close]")?.addEventListener("click", hideOrder);
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && orderOverlay && !orderOverlay.hidden) hideOrder();
  });
  window.addEventListener("hashchange", () => {
    showRoute();
    window.INNOVA_META_PIXEL?.trackPageView();
  });
  window.addEventListener("message", (event) => {
    if (event.source === orderFrame?.contentWindow && event.origin === location.origin && event.data?.type === "innova-boutique:close-order") {
      hideOrder();
      return;
    }
    if (event.source !== frame.contentWindow || event.origin !== sourceOrigin) return;
    if (event.data?.type === "innova-boutique:modal-state" && event.data.brand === brand) {
      brandModalOpen = Boolean(event.data.open);
      updateDockVisibility();
      return;
    }
    if (event.data?.type === "innova-boutique:open-order" && brand === "jisco") {
      showOrder();
      return;
    }
    if (event.data?.type === "innova-boutique:replace-brand" && event.data.brand === brand) {
      saveBrandOrder(event.data);
      return;
    }
    if (event.data?.type === "innova-boutique:add-item" && event.data.item?.brand === brand) {
      const order = readGlobalOrder();
      const item = event.data.item;
      const key = String(item.key || `${brand}:${item.sku || item.productId}`);
      const existing = order.items.find((entry) => entry.key === key);
      if (existing) existing.quantity = Math.min(9999, Number(existing.quantity || 0) + Math.max(1, Number(item.quantity) || 1));
      else order.items.push({ ...item, brand, key, quantity: Math.max(1, Number(item.quantity) || 1) });
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
      updateOrderCount();
      return;
    }
    if (event.data?.type === "innova-brand-route" && event.data.brand === brand) {
      const route = String(event.data.route || "/");
      const normalized = route.startsWith("/") ? route : `/${route}`;
      if (brand === "jisco" && typeof event.data.title === "string" && event.data.title.length < 180) document.title = event.data.title;
      if (currentRoute() !== normalized) {
        window.history.replaceState(null, "", `#${encodeURI(normalized)}`);
        window.INNOVA_META_PIXEL?.trackPageView();
      }
    }
  });
  showRoute();
})();
