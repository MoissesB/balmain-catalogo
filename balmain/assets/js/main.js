(function () {
  async function init() {
    await loadLocalFeatures();
    initInnovaGlobalHeader();
    window.BalmainI18n?.applyStatic();
    window.BalmainOrder?.init();
    window.BalmainBlog?.init();

    document.querySelectorAll("[data-lang-option]").forEach((button) => {
      button.addEventListener("click", () => window.BalmainI18n?.setLang(button.dataset.langOption));
    });

    initHeroVideo();

    const menu = document.querySelector("[data-nav-links]");
    document.querySelector("[data-menu-toggle]")?.addEventListener("click", () => {
      menu?.classList.toggle("open");
      document.body.classList.toggle("menu-open");
    });

    const page = document.body.dataset.page;
    if (page === "home") await window.BalmainCatalog.renderHome();
    if (page === "catalogo") await window.BalmainCatalog.renderCatalog();
    if (page === "categoria") await window.BalmainCatalog.renderCategory();
    if (page === "producto") await window.BalmainCatalog.renderProduct();
    window.BalmainOrder?.refresh();
    await window.BalmainCatalog.renderContactSurfaces();
    await window.BalmainSearch?.initSearch();

    window.addEventListener("balmain:languagechange", async () => {
      if (page === "home") await window.BalmainCatalog.renderHome();
      if (page === "categoria") await window.BalmainCatalog.renderCategory();
      if (page === "producto") await window.BalmainCatalog.renderProduct();
      window.BalmainOrder?.refresh();
      await window.BalmainCatalog.renderContactSurfaces();
    });

    window.addEventListener("balmain:inventorychange", async () => {
      if (page === "home") await window.BalmainCatalog.renderHome();
      if (page === "catalogo") await window.BalmainCatalog.renderCatalog();
      if (page === "categoria") await window.BalmainCatalog.renderCategory();
      if (page === "producto") await window.BalmainCatalog.renderProduct();
      window.BalmainOrder?.refresh();
      await window.BalmainSearch?.refresh?.();
    });
  }

  document.addEventListener("DOMContentLoaded", init);

  function loadScript(src, id) {
    if (document.querySelector(`[data-local-feature="${id}"]`)) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.dataset.localFeature = id;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async function loadLocalFeatures() {
    const base = document.body.dataset.base || "";
    await loadScript(`${base}assets/js/vendor/pdf-lib.min.js`, "pdf-lib");
    await Promise.all([
      loadScript(`${base}assets/js/pedido.js?v=20260801-pdf-profesional`, "balmain-order"),
      loadScript(`${base}assets/js/blog.js?v=20260730a`, "balmain-blog"),
    ]);
  }

  function initInnovaGlobalHeader() {
    if (document.querySelector("[data-innova-global-header]")) return;
    const base = document.body.dataset.base || "";
    const isLocal = /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);
    const portal = isLocal ? "http://localhost:3100" : window.location.origin;
    const alfred = isLocal
      ? "http://localhost:3001"
      : `${portal.replace(/\/+$/, "")}/alfred-kerbs/`;
    const silhouette = isLocal
      ? "http://localhost:5174"
      : `${portal.replace(/\/+$/, "")}/silhouette/`;
    const silhouetteRoute = (path) => isLocal
      ? `${silhouette}/${String(path).replace(/^\/+/, "")}`
      : `${silhouette}/#/${String(path).replace(/^\/+/, "")}`;

    document.body.insertAdjacentHTML("afterbegin", `
      <header class="innova-global-header" data-innova-global-header>
        <a class="innova-global-home" href="${portal}" aria-label="Volver a Innova Boutique" data-text-es="INNOVA BOUTIQUE" data-text-en="INNOVA BOUTIQUE" data-text-fr="INNOVA BOUTIQUE">INNOVA BOUTIQUE</a>
        <span class="innova-global-context" data-text-es="Distribución profesional · Balmain Eyewear" data-text-en="Professional distribution · Balmain Eyewear" data-text-fr="Distribution professionnelle · Balmain Eyewear">Distribución profesional · Balmain Eyewear</span>
        <nav class="innova-global-nav" aria-label="Navegación global de Innova Boutique">
          <div class="innova-global-mega-shell">
            <button type="button"><span data-text-es="Marcas" data-text-en="Brands" data-text-fr="Marques">Marcas</span> <span aria-hidden="true">⌄</span></button>
            <div class="innova-global-mega">
              <div data-innova-mega-brand="alfred-kerbs">
                <span>01 · Barcelona</span>
                <a href="${alfred}"><strong>Alfred Kerbs</strong></a>
                <a href="${alfred}/catalogo?category=optical" data-text-es="Óptica" data-text-en="Optical frames" data-text-fr="Montures optiques">Óptica</a>
                <a href="${alfred}/catalogo?category=sun" data-text-es="Sol" data-text-en="Sunglasses" data-text-fr="Lunettes de soleil">Sol</a>
              </div>
              <div data-innova-mega-brand="balmain">
                <span>02 · París</span>
                <a href="${base}index.html"><strong>Balmain Eyewear</strong></a>
                <a href="${base}pages/categorias/avant-garde.html">Avant-Garde</a>
                <a href="${base}pages/categorias/iconic.html">Iconic</a>
                <a href="${base}pages/categorias/aspirational.html">Aspirational</a>
                <a href="${base}pages/categorias/fashion-drops.html">Fashion Drops</a>
              </div>
              <div data-innova-mega-brand="silhouette">
                <span>03 · Austria</span>
                <a href="${silhouette}"><strong>Silhouette</strong></a>
                <a href="${silhouetteRoute("catalogo/gafas-graduadas")}" data-text-es="Gafas graduadas" data-text-en="Optical frames" data-text-fr="Montures optiques">Gafas graduadas</a>
                <a href="${silhouetteRoute("catalogo/gafas-de-sol")}" data-text-es="Gafas de sol" data-text-en="Sunglasses" data-text-fr="Lunettes de soleil">Gafas de sol</a>
                <a href="${silhouetteRoute("catalogo/atelier-next")}">Atelier</a>
              </div>
              <aside class="innova-global-mega-visual">
                <div class="innova-global-mega-visual__media" aria-hidden="true">
                  <img class="is-active" data-innova-mega-image="alfred-kerbs" src="${portal}/assets/campaign-alfred.webp" alt="">
                  <img data-innova-mega-image="balmain" src="${portal}/assets/campaign-balmain.webp" alt="">
                  <img data-innova-mega-image="silhouette" src="${portal}/assets/campaign-silhouette.webp" alt="">
                </div>
                <div class="innova-global-mega-visual__content">
                  <span data-text-es="PEDIDO GLOBAL" data-text-en="MULTI-BRAND SELECTION" data-text-fr="SÉLECTION MULTIMARQUE">PEDIDO GLOBAL</span>
                  <strong data-text-es="Una selección para las tres firmas." data-text-en="One selection for all three brands." data-text-fr="Une sélection commune aux trois marques.">Una selección para las tres firmas.</strong>
                  <p data-text-es="El mínimo comercial mayorista es de 50 piezas por cada marca incluida." data-text-en="Each included brand must reach the 50-piece professional minimum." data-text-fr="Chaque marque incluse doit atteindre le seuil professionnel de 50 pièces.">El mínimo comercial mayorista es de 50 piezas por cada marca incluida.</p>
                  <a href="${portal}/#seleccion" data-text-es="Abrir selección →" data-text-en="Open selection →" data-text-fr="Ouvrir la sélection →">Abrir selección →</a>
                </div>
              </aside>
            </div>
          </div>
          <a href="${portal}/#innova">Innova Eyewear</a>
          <a class="innova-global-order" href="${portal}/#seleccion" data-text-es="Pedido global" data-text-en="Multi-brand selection" data-text-fr="Sélection multimarque">Pedido global</a>
        </nav>
        <details class="innova-global-mobile">
          <summary data-text-es="Marcas" data-text-en="Brands" data-text-fr="Marques">Marcas</summary>
          <div class="innova-global-mobile-panel">
            <a href="${portal}">Innova Boutique</a>
            <a href="${alfred}" data-text-es="Alfred Kerbs · Óptica y Sol" data-text-en="Alfred Kerbs · Optical frames and sunglasses" data-text-fr="Alfred Kerbs · Montures optiques et lunettes de soleil">Alfred Kerbs · Óptica y Sol</a>
            <a href="${base}catalogo.html">Balmain · Todas las colecciones</a>
            <a href="${silhouette}" data-text-es="Silhouette · Óptica, Sol y Atelier" data-text-en="Silhouette · Optical frames, sunglasses and Atelier" data-text-fr="Silhouette · Montures optiques, lunettes de soleil et Atelier">Silhouette · Óptica, Sol y Atelier</a>
            <a href="${portal}/#seleccion" data-text-es="Pedido global · 50 piezas por marca" data-text-en="Multi-brand selection · 50 pieces per brand" data-text-fr="Sélection multimarque · 50 pièces par marque">Pedido global · 50 piezas por marca</a>
          </div>
        </details>
      </header>
    `);

    const megaSections = document.querySelectorAll("[data-innova-mega-brand]");
    const megaImages = document.querySelectorAll("[data-innova-mega-image]");
    const activateMegaCampaign = (brand) => {
      megaImages.forEach((image) => {
        image.classList.toggle("is-active", image.dataset.innovaMegaImage === brand);
      });
    };
    megaSections.forEach((section) => {
      const activate = () => activateMegaCampaign(section.dataset.innovaMegaBrand);
      section.addEventListener("mouseenter", activate);
      section.addEventListener("focusin", activate);
    });
  }

  function initHeroVideo() {
    const video = document.querySelector("[data-hero-video]");
    if (!video) return;

    const markReady = () => {
      video.closest(".hero-home")?.classList.add("has-video");
    };

    if (!video.dataset.videoSrc) {
      if (video.readyState >= 2) markReady();
      video.addEventListener("canplay", markReady, { once: true });
      const playPromise = video.play();
      if (playPromise?.catch) playPromise.catch(() => {});
      return;
    }

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const connection = navigator.connection || {};
    const saveData = connection.saveData;
    const slowConnection = /(^2g|3g)/.test(connection.effectiveType || "");
    if (reduceMotion || saveData || slowConnection) return;

    const loadVideo = () => {
      if (video.dataset.loaded) return;
      video.dataset.loaded = "true";
      const source = video.dataset.videoSrc;
      video.src = source.includes("#") ? source : `${source}#t=0,18`;
      video.addEventListener(
        "canplay",
        markReady,
        { once: true }
      );
      const playPromise = video.play();
      if (playPromise?.catch) playPromise.catch(() => {});
    };

    const scheduleLoad = () => {
      const delay = window.matchMedia?.("(max-width: 760px)")?.matches ? 1600 : 350;
      const queue = () => {
        if ("requestIdleCallback" in window) {
          window.requestIdleCallback(loadVideo, { timeout: 2200 });
          return;
        }
        loadVideo();
      };
      window.setTimeout(queue, delay);
    };

    if (document.readyState === "complete") {
      scheduleLoad();
      return;
    }

    window.addEventListener("load", scheduleLoad, { once: true });
  }
})();
