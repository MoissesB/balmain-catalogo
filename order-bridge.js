(function () {
  const STORAGE_KEY = "innova-boutique-order-v1";
  const config = window.INNOVA_BOUTIQUE_CONFIG || {};
  const allowed = new Set(config.allowedOrigins || [window.location.origin]);

  function readOrder() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      return value && Array.isArray(value.items) ? value : { items: [], client: {} };
    } catch {
      return { items: [], client: {} };
    }
  }

  function mergeClient(order, client) {
    if (!client || typeof client !== "object") return order;
    order.client = { ...(order.client || {}) };
    for (const [field, value] of Object.entries(client)) {
      if (typeof value === "string" && value.trim()) order.client[field] = value;
    }
    return order;
  }

  function saveItem(item) {
    const order = readOrder();
    const key = String(item.key || `${item.brand}:${item.sku || item.productId}`);
    const quantity = Math.max(1, Math.min(999, Number(item.quantity) || 1));
    const existing = order.items.find((entry) => entry.key === key);
    if (existing) existing.quantity = Math.min(999, existing.quantity + quantity);
    else order.items.push({ ...item, key, quantity });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
    return order;
  }

  function replaceBrandItems(brand, items, client) {
    const order = mergeClient(readOrder(), client);
    order.items = order.items.filter((item) => item.brand !== brand);
    for (const item of items) {
      if (!item || item.brand !== brand) continue;
      const key = String(item.key || `${brand}:${item.sku || item.productId}`);
      const quantity = Math.max(1, Math.min(999, Number(item.quantity) || 1));
      order.items.push({ ...item, brand, key, quantity });
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
    return order;
  }

  function notifySource(event, order) {
    event.source?.postMessage({
      type: "innova-boutique:order-updated",
      count: order.items.reduce((total, item) => total + Number(item.quantity || 0), 0),
    }, event.origin);
  }

  window.addEventListener("message", (event) => {
    if (!allowed.has(event.origin)) return;
    if (event.data?.type === "innova-boutique:add-item" && event.data.item?.brand) {
      notifySource(event, saveItem(event.data.item));
      return;
    }
    if (
      event.data?.type === "innova-boutique:replace-brand"
      && event.data.brand
      && Array.isArray(event.data.items)
    ) {
      notifySource(event, replaceBrandItems(event.data.brand, event.data.items, event.data.client));
    }
  });
})();
