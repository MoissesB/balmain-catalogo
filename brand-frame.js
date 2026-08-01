(function () {
  const ORDER_STORAGE_KEY = "innova-boutique-order-v1";
  const body = document.body;
  const brand = body.dataset.brand || "";
  const source = body.dataset.source || "";
  const frame = document.querySelector("[data-brand-frame]");
  const loader = document.querySelector("[data-brand-loader]");
  if (!frame || !source) return;

  const sourceUrl = new URL(source);
  const sourceOrigin = sourceUrl.origin;

  function currentRoute() {
    const value = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    return value.startsWith("/") ? value : "/";
  }

  function targetUrl(route) {
    if (brand === "silhouette") return `${source.replace(/\/+$/, "/")}#${route}`;
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
    frame.contentWindow?.postMessage({
      type: "innova-boutique:order-updated",
      count: order.items.reduce((total, item) => total + Number(item.quantity || 0), 0),
    }, sourceOrigin);
  }

  frame.addEventListener("load", () => loader?.classList.add("is-hidden"));
  window.addEventListener("hashchange", showRoute);
  window.addEventListener("message", (event) => {
    if (event.source !== frame.contentWindow || event.origin !== sourceOrigin) return;
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
      return;
    }
    if (event.data?.type === "innova-brand-route" && event.data.brand === brand) {
      const route = String(event.data.route || "/");
      const normalized = route.startsWith("/") ? route : `/${route}`;
      if (currentRoute() !== normalized) window.history.replaceState(null, "", `#${encodeURI(normalized)}`);
    }
  });
  showRoute();
})();
