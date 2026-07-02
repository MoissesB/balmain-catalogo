(function () {
  function lang() {
    return window.BalmainI18n ? window.BalmainI18n.current() : "es";
  }

  function pick(value) {
    return window.BalmainI18n ? window.BalmainI18n.pick(value) : value?.es || value?.en || value || "";
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => {
      const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
      return map[char];
    });
  }

  async function initSearch() {
    const overlay = document.querySelector("[data-search-overlay]");
    const input = document.querySelector("[data-search-input]");
    const results = document.querySelector("[data-search-results]");
    const preview = document.querySelector("[data-search-preview]");
    if (!overlay || !input || !results || !preview || !window.BalmainCatalog) return;

    const products = await window.BalmainCatalog.getProducts();

    function renderPreview(product, forcedImage) {
      const image = forcedImage || window.BalmainCatalog.imageFor(product);
      const codes = (product.variantes || []).map((variant) => variant.codigo).slice(0, 5).join(" · ");
      preview.innerHTML = image
        ? `
          <img src="${window.BalmainCatalog.asset(image)}" alt="${escapeHtml(product.nombre)}">
          <div>
            <p class="eyebrow">${escapeHtml(pick(product.categoriaLabel))}</p>
            <h3>${escapeHtml(product.nombre)}</h3>
            <p>${escapeHtml(pick(product.descripcionCorta))}</p>
            <small>${escapeHtml(codes)}</small>
          </div>
        `
        : `<div class="image-placeholder"><span>${escapeHtml(product.nombre)}</span></div>`;
    }

    function resultThumbs(product) {
      return window.BalmainCatalog
        .cardImages(product)
        .map(
          (image) =>
            `<button type="button" class="search-mini-thumb" data-preview-src="${window.BalmainCatalog.asset(image.src)}" aria-label="${escapeHtml(product.nombre)} ${escapeHtml(image.slot)}"><img src="${window.BalmainCatalog.asset(image.src)}" alt="" loading="lazy"></button>`
        )
        .join("");
    }

    function render() {
      const query = input.value.trim().toLowerCase();
      const pool = query
        ? products.filter((product) => window.BalmainCatalog.productSearchText(product).includes(query)).slice(0, 12)
        : products.filter((product) => product.destacado).slice(0, 12);

      results.innerHTML = pool
        .map((product) => {
          const image = window.BalmainCatalog.imageFor(product);
          const codes = (product.variantes || []).map((variant) => variant.codigo).slice(0, 3).join(" · ");
          return `
            <article class="search-result" data-search-slug="${escapeHtml(product.slug)}">
              <a class="search-result-main" href="${window.BalmainCatalog.productHref(product.slug)}">
                <span class="search-thumb">${image ? `<img src="${window.BalmainCatalog.asset(image)}" alt="${escapeHtml(product.nombre)}" loading="lazy">` : ""}</span>
                <span>
                  <strong>${escapeHtml(product.nombre)}</strong>
                  <small>${escapeHtml(pick(product.categoriaLabel))} · ${escapeHtml(codes)}</small>
                </span>
              </a>
              <span class="search-mini-gallery">${resultThumbs(product)}</span>
            </article>
          `;
        })
        .join("");

      if (pool[0]) renderPreview(pool[0]);
      results.querySelectorAll("[data-search-slug]").forEach((node) => {
        const product = products.find((item) => item.slug === node.dataset.searchSlug);
        node.addEventListener("mouseenter", () => {
          if (product) renderPreview(product);
        });
        node.querySelectorAll("[data-preview-src]").forEach((thumb) => {
          thumb.addEventListener("mouseenter", () => {
            if (product) renderPreview(product, thumb.dataset.previewSrc);
          });
          thumb.addEventListener("focus", () => {
            if (product) renderPreview(product, thumb.dataset.previewSrc);
          });
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
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !overlay.hidden) {
        overlay.hidden = true;
        document.body.classList.remove("search-open");
      }
    });
    input.addEventListener("input", render);
    window.addEventListener("balmain:languagechange", render);
  }

  window.BalmainSearch = { initSearch };
})();
