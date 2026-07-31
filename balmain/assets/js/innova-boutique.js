(function () {
  const isLocal = /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);
  const portalUrl = window.INNOVA_BOUTIQUE_URL
    || (isLocal ? "http://localhost:3100" : window.location.origin);
  const targetOrigin = new URL(portalUrl).origin;
  const alfredUrl = isLocal
    ? "http://localhost:3001"
    : "https://alfred-kerbs-innova-eyewear.moisses.chatgpt.site";
  const balmainUrl = isLocal
    ? "http://localhost:3101"
    : `${portalUrl.replace(/\/+$/, "")}/balmain/`;
  const silhouetteUrl = isLocal
    ? "http://localhost:5174"
    : "https://moissesb.github.io/innova-silhouette-catalogo";
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
    dock.className = "balmain-catalog-dock";
    dock.innerHTML = `
      <div class="balmain-commercial-help" data-balmain-commercial-help>
        <button class="balmain-commercial-help__trigger" type="button" aria-expanded="false">
          <span><small>COMPRA PROFESIONAL</small><b>Cómo comprar</b></span><i aria-hidden="true">?</i>
        </button>
        <aside class="balmain-commercial-help__panel" hidden aria-label="Ayuda comercial de Innova Eyewear">
          <header><div><small>INNOVA EYEWEAR</small><strong>Exclusivo para ópticas</strong></div><button type="button" aria-label="Cerrar ayuda">×</button></header>
          <p>Este catálogo no realiza ventas al público. Selecciona modelos y cantidades hasta completar un mínimo de 18 piezas de Balmain Eyewear.</p>
          <p>Después descarga el pedido en PDF. Innova valida la óptica, la disponibilidad, las condiciones comerciales y el transporte antes de confirmar.</p>
          <a href="${balmainUrl}/catalogo.html">Explorar el catálogo <span>→</span></a>
          <a href="${portalUrl}/#seleccion">Ver el proceso de compra <span>→</span></a>
        </aside>
      </div>
      <nav class="balmain-catalog-dock__brands" aria-label="Cambiar catálogo de marca">
        <a href="${alfredUrl}" aria-label="Abrir Alfred Kerbs"><img src="${portalUrl}/assets/alfred-kerbs-logo.png" alt=""></a>
        <a class="is-current" href="${balmainUrl}" aria-label="Abrir Balmain Eyewear" aria-current="page"><img src="${portalUrl}/assets/balmain-logo-transparent.png" alt=""></a>
        <a class="balmain-catalog-dock__silhouette" href="${silhouetteUrl}" aria-label="Abrir Silhouette"><span>Silhouette</span></a>
      </nav>
      <span class="balmain-catalog-dock__order-slot" aria-hidden="true"></span>
    `;
    document.body.appendChild(dock);

    const help = dock.querySelector(".balmain-commercial-help");
    const trigger = help.querySelector(".balmain-commercial-help__trigger");
    const panel = help.querySelector(".balmain-commercial-help__panel");
    const setOpen = (open) => {
      panel.hidden = !open;
      trigger.setAttribute("aria-expanded", String(open));
    };
    trigger.addEventListener("click", () => setOpen(panel.hidden));
    panel.querySelector("header button").addEventListener("click", () => setOpen(false));
  }

  window.InnovaBoutiqueOrder = { add, portalUrl };
  getBridge();
})();
