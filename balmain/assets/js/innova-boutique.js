(function () {
  const isLocal = /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);
  const portalUrl = window.INNOVA_BOUTIQUE_URL
    || (isLocal ? "http://localhost:3100" : window.location.origin);
  const targetOrigin = new URL(portalUrl).origin;
  const alfredUrl = isLocal
    ? "http://localhost:3001"
    : `${portalUrl.replace(/\/+$/, "")}/alfred-kerbs/`;
  const balmainUrl = isLocal
    ? "http://localhost:3101"
    : `${portalUrl.replace(/\/+$/, "")}/balmain/`;
  const silhouetteUrl = isLocal
    ? "http://localhost:5174"
    : `${portalUrl.replace(/\/+$/, "")}/silhouette/`;
  const jiscoUrl = `${portalUrl.replace(/\/+$/, "")}/jisco/`;
  let bridge;

  function getBridge() {
    if (bridge) return bridge;
    bridge = document.createElement("iframe");
    bridge.className = "innova-boutique-bridge";
    bridge.src = `${portalUrl}/bridge.html`;
    bridge.title = "Sincronización de pedido Innova Boutique";
    bridge.tabIndex = -1;
    bridge.setAttribute("aria-hidden", "true");
    bridge.addEventListener("load", () => {
      bridge.dataset.ready = "true";
    });
    document.body.appendChild(bridge);
    return bridge;
  }

  function absoluteUrl(value) {
    if (!value) return "";
    return new URL(value, window.location.href).href;
  }

  function add(item) {
    const payload = {
      ...item,
      brand: "balmain",
      key: item.key || `balmain:${item.sku || item.productId}`,
      image: absoluteUrl(item.image),
      catalogUrl: absoluteUrl(item.catalogUrl || window.location.href),
      quantity: Math.max(1, Number(item.quantity) || 1),
    };
    const frame = getBridge();
    const send = () => frame.contentWindow?.postMessage({
      type: "innova-boutique:add-item",
      item: payload,
    }, targetOrigin);
    if (frame.dataset.ready === "true") send();
    else frame.addEventListener("load", () => {
      frame.dataset.ready = "true";
      send();
    }, { once: true });
  }

  function replace(items, client) {
    const payload = {
      type: "innova-boutique:replace-brand",
      brand: "balmain",
      client: client || {},
      items: (items || []).map((item) => ({
        ...item,
        brand: "balmain",
        key: `balmain:${item.sku || item.productId}`,
        image: absoluteUrl(item.image),
        catalogUrl: absoluteUrl(item.catalogUrl || window.location.href),
        quantity: Math.max(1, Number(item.quantity) || 1),
      })),
    };

    if (window.parent !== window) window.parent.postMessage(payload, targetOrigin);

    const frame = getBridge();
    const send = () => frame.contentWindow?.postMessage(payload, targetOrigin);
    if (frame.dataset.ready === "true") send();
    else frame.addEventListener("load", () => {
      frame.dataset.ready = "true";
      send();
    }, { once: true });
  }

  document.querySelectorAll("[data-boutique-track]").forEach((track) => {
    const shell = track.closest("[data-boutique-rail]");
    shell?.querySelector("[data-boutique-prev]")?.addEventListener("click", () => {
      track.scrollBy({ left: -track.clientWidth * 0.7, behavior: "smooth" });
    });
    shell?.querySelector("[data-boutique-next]")?.addEventListener("click", () => {
      track.scrollBy({ left: track.clientWidth * 0.7, behavior: "smooth" });
    });
  });

  if (!document.querySelector("[data-balmain-commercial-help]")) {
    const dock = document.createElement("div");
    dock.id = "balmain-catalog-dock";
    dock.className = "balmain-catalog-dock";
    dock.innerHTML = `
      <div class="balmain-commercial-help" data-balmain-commercial-help>
        <button class="balmain-commercial-help__trigger" type="button" aria-expanded="false">
          <span><small>COMPRA PROFESIONAL</small><b>Cómo comprar</b></span><i aria-hidden="true">?</i>
        </button>
        <aside class="balmain-commercial-help__panel" hidden aria-label="Ayuda comercial de Innova Eyewear">
          <header><div><small>INNOVA EYEWEAR</small><strong>Exclusivo para ópticas</strong></div><button type="button" aria-label="Cerrar ayuda">×</button></header>
          <p>Este catálogo es exclusivo para ópticas y empresas del sector. El pedido global reúne las cuatro marcas; el código especial autorizado permite cualquier cantidad de cada una.</p>
          <p>Después descarga el pedido en PDF. Innova valida la óptica, la disponibilidad, las condiciones comerciales y el transporte antes de confirmar.</p>
          <a href="${balmainUrl}/catalogo.html">Explorar el catálogo <span>→</span></a>
          <button type="button" data-balmain-local-order>Ver selección Balmain →</button>
          <a href="${portalUrl}/#seleccion">Ver el proceso de compra <span>→</span></a>
        </aside>
      </div>
      <nav class="balmain-catalog-dock__brands" aria-label="Cambiar catálogo de marca">
        <a href="${alfredUrl}" target="_top" aria-label="Abrir Alfred Kerbs"><img src="${portalUrl}/assets/alfred-kerbs-logo.png" alt=""></a>
        <a class="is-current" href="${balmainUrl}" target="_top" aria-label="Abrir Balmain Eyewear" aria-current="page"><img src="${portalUrl}/assets/balmain-logo-transparent.png" alt=""></a>
        <a class="balmain-catalog-dock__silhouette" href="${silhouetteUrl}" target="_top" aria-label="Abrir Silhouette"><img src="${portalUrl}/assets/logos/silhouette-on-light.png" alt="Silhouette"></a>
        <a class="balmain-catalog-dock__jisco" href="${jiscoUrl}" target="_top" aria-label="Abrir JISCO"><img src="${portalUrl}/assets/jisco-logo-original.png" alt="JISCO"></a>
      </nav>
      <span class="balmain-catalog-dock__order-slot"><button class="balmain-global-order" type="button" data-balmain-global-order>MI SELECCIÓN <b data-balmain-global-count>0</b></button></span>
    `;
    document.body.appendChild(dock);
    const dockToggle = document.createElement("button");
    dockToggle.className = "balmain-catalog-dock__toggle";
    dockToggle.type = "button";
    dockToggle.setAttribute("aria-controls", dock.id);
    document.body.appendChild(dockToggle);
    const dockPreferenceKey = "innova-brand-dock-collapsed-v1";
    let dockCollapsed = false;
    try { dockCollapsed = localStorage.getItem(dockPreferenceKey) === "1"; } catch {}
    const updateDockVisibility = () => {
      dock.hidden = dockCollapsed;
      document.body.classList.toggle("balmain-dock-collapsed", dockCollapsed);
      dockToggle.setAttribute("aria-expanded", String(!dockCollapsed));
      dockToggle.setAttribute("aria-label", dockCollapsed ? "Mostrar barra de marcas y selección" : "Ocultar barra de marcas y selección");
      dockToggle.textContent = dockCollapsed ? "↑" : "↓";
      dockToggle.classList.toggle("is-collapsed", dockCollapsed);
    };
    dockToggle.addEventListener("click", () => {
      dockCollapsed = !dockCollapsed;
      if (dockCollapsed) {
        help.querySelector(".balmain-commercial-help__panel").hidden = true;
        help.querySelector(".balmain-commercial-help__trigger").setAttribute("aria-expanded", "false");
      }
      try { localStorage.setItem(dockPreferenceKey, dockCollapsed ? "1" : "0"); } catch {}
      updateDockVisibility();
    });
    updateDockVisibility();

    const help = dock.querySelector(".balmain-commercial-help");
    const trigger = help.querySelector(".balmain-commercial-help__trigger");
    const panel = help.querySelector(".balmain-commercial-help__panel");
    const setOpen = (open) => {
      panel.hidden = !open;
      trigger.setAttribute("aria-expanded", String(open));
    };
    trigger.addEventListener("click", () => setOpen(panel.hidden));
    panel.querySelector("header button").addEventListener("click", () => setOpen(false));
    panel.querySelector("[data-balmain-local-order]").addEventListener("click", () => { setOpen(false); window.BalmainOrder?.open(); });
    const globalCount = dock.querySelector("[data-balmain-global-count]");
    const updateGlobalCount = () => {
      try {
        const saved = JSON.parse(localStorage.getItem("innova-boutique-order-v1") || "null");
        globalCount.textContent = String((saved?.items || []).reduce((sum, item) => sum + Number(item.quantity || 0), 0));
      } catch { globalCount.textContent = "0"; }
    };
    updateGlobalCount();
    window.addEventListener("storage", updateGlobalCount);
    dock.querySelector("[data-balmain-global-order]").addEventListener("click", () => {
      let overlay = document.querySelector("[data-balmain-global-overlay]");
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.className = "balmain-global-overlay";
        overlay.dataset.balmainGlobalOverlay = "";
        overlay.innerHTML = '<button type="button" class="balmain-global-overlay__close" aria-label="Cerrar selección">×</button><iframe title="Mi selección global de Innova" class="balmain-global-overlay__frame"></iframe>';
        document.body.appendChild(overlay);
        overlay.querySelector("button").addEventListener("click", () => { overlay.hidden = true; });
      }
      overlay.hidden = false;
      overlay.querySelector("iframe").src = `${portalUrl}/?embeddedOrder=1#pedido`;
      updateGlobalCount();
    });
    document.addEventListener("click", (event) => {
      if (event.target.closest('[data-order-action="open-global"]')) dock.querySelector("[data-balmain-global-order]").click();
    });
    window.addEventListener("message", (event) => {
      if (event.origin === targetOrigin && event.data?.type === "innova-boutique:close-order") document.querySelector("[data-balmain-global-overlay]")?.setAttribute("hidden", "");
    });
  }

  window.InnovaBoutiqueOrder = { add, replace, portalUrl };
  getBridge();
})();
