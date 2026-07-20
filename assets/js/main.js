(function () {
  async function init() {
    window.BalmainI18n?.applyStatic();

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
    await window.BalmainCatalog.renderContactSurfaces();
    await window.BalmainSearch?.initSearch();

    window.addEventListener("balmain:languagechange", async () => {
      if (page === "home") await window.BalmainCatalog.renderHome();
      if (page === "categoria") await window.BalmainCatalog.renderCategory();
      if (page === "producto") await window.BalmainCatalog.renderProduct();
      await window.BalmainCatalog.renderContactSurfaces();
    });

    window.addEventListener("balmain:inventorychange", async () => {
      if (page === "home") await window.BalmainCatalog.renderHome();
      if (page === "catalogo") await window.BalmainCatalog.renderCatalog();
      if (page === "categoria") await window.BalmainCatalog.renderCategory();
      if (page === "producto") await window.BalmainCatalog.renderProduct();
      await window.BalmainSearch?.refresh?.();
    });
  }

  document.addEventListener("DOMContentLoaded", init);

  function initHeroVideo() {
    const video = document.querySelector("[data-hero-video]");
    if (!video || !video.dataset.videoSrc) return;

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
        () => {
          video.closest(".hero-home")?.classList.add("has-video");
        },
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
