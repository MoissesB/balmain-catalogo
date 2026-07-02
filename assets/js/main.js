(function () {
  async function init() {
    window.BalmainI18n?.applyStatic();

    document.querySelectorAll("[data-lang-option]").forEach((button) => {
      button.addEventListener("click", () => window.BalmainI18n?.setLang(button.dataset.langOption));
    });

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
    await window.BalmainSearch?.initSearch();

    window.addEventListener("balmain:languagechange", async () => {
      if (page === "home") await window.BalmainCatalog.renderHome();
      if (page === "categoria") await window.BalmainCatalog.renderCategory();
      if (page === "producto") await window.BalmainCatalog.renderProduct();
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
