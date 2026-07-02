(function () {
  function lang() {
    return window.BalmainI18n ? window.BalmainI18n.current() : "es";
  }

  function pick(value) {
    return window.BalmainI18n ? window.BalmainI18n.pick(value) : value?.es || value?.en || value || "";
  }

  async function initSearch() {
    const overlay = document.querySelector("[data-search-overlay]");
    const input = document.querySelector("[data-search-input]");
    const results = document.querySelector("[data-search-results]");
    const preview = document.querySelector("[data-search-preview]");
    if (!overlay || !input || !results || !preview || !window.BalmainCatalog) return;

    const products = await window.BalmainCatalog.getProducts();

    function renderPreview(product) {
      const image = window.BalmainCatalog.imageFor(product);
      preview.innerHTML = image
        ? `<img src="${window.BalmainCatalog.asset(image)}" alt="${product.nombre}"><div><p class="eyebrow">${pick(product.categoriaLabel)}</p><h3>${product.nombre}</h3></div>`
        : `<div class="image-placeholder"><span>${product.nombre}</span></div>`;
    }

    function render() {
      const query = input.value.trim().toLowerCase();
      const pool = query
        ? products.filter((product) => window.BalmainCatalog.productSearchText(product).includes(query)).slice(0, 10)
        : products.filter((product) => product.destacado).slice(0, 10);
      results.innerHTML = pool
        .map((product) => {
          const image = window.BalmainCatalog.imageFor(product);
          const codes = (product.variantes || []).map((variant) => variant.codigo).slice(0, 3).join(" · ");
          return `
            <a class="search-result" href="${window.BalmainCatalog.productHref(product.slug)}" data-search-slug="${product.slug}">
              <span class="search-thumb">${image ? `<img src="${window.BalmainCatalog.asset(image)}" alt="${product.nombre}" loading="lazy">` : ""}</span>
              <span><strong>${product.nombre}</strong><small>${pick(product.categoriaLabel)} · ${codes}</small></span>
            </a>
          `;
        })
        .join("");
      if (pool[0]) renderPreview(pool[0]);
      results.querySelectorAll("[data-search-slug]").forEach((node) => {
        node.addEventListener("mouseenter", () => {
          const product = products.find((item) => item.slug === node.dataset.searchSlug);
          if (product) renderPreview(product);
        });
      });
    }

    document.querySelectorAll("[data-search-open]").forEach((button) => {
      button.addEventListener("click", () => {
        overlay.hidden = false;
        document.body.classList.add("search-open");
        input.focus();
        render();
      });
    });
    document.querySelectorAll("[data-search-close]").forEach((button) => {
      button.addEventListener("click", () => {
        overlay.hidden = true;
        document.body.classList.remove("search-open");
      });
    });
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        overlay.hidden = true;
        document.body.classList.remove("search-open");
      }
    });
    input.addEventListener("input", render);
    window.addEventListener("balmain:languagechange", render);
  }

  window.BalmainSearch = { initSearch };
})();
