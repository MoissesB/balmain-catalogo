(function () {
  const adminTrigger = "innova-panel";
  const adminKeyStorage = "balmainAdminPanelKey";
  let refreshSearch = null;

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

  function adminAccessModal(openPanel) {
    let modal = document.querySelector("[data-admin-access]");
    if (!modal) {
      modal = document.createElement("div");
      modal.className = "admin-access-overlay";
      modal.hidden = true;
      modal.dataset.adminAccess = "";
      modal.innerHTML = `
        <form class="admin-access-card" data-admin-access-form>
          <button class="icon-button admin-access-close" type="button" data-admin-access-close aria-label="Cerrar">x</button>
          <p class="eyebrow">Panel temporal B2B</p>
          <h2>Modo gestion local</h2>
          <p data-admin-access-copy></p>
          <input type="password" data-admin-access-key autocomplete="off" placeholder="Clave temporal">
          <small data-admin-access-error></small>
          <button class="button button-dark" type="submit">Entrar</button>
        </form>
      `;
      document.body.appendChild(modal);
      modal.querySelector("[data-admin-access-close]").addEventListener("click", () => {
        modal.hidden = true;
      });
      modal.addEventListener("click", (event) => {
        if (event.target === modal) modal.hidden = true;
      });
    }

    const storedKey = localStorage.getItem(adminKeyStorage);
    const copy = modal.querySelector("[data-admin-access-copy]");
    const error = modal.querySelector("[data-admin-access-error]");
    const input = modal.querySelector("[data-admin-access-key]");
    copy.textContent = storedKey
      ? "Ingresa la clave temporal creada en este navegador."
      : "Crea una clave temporal para este navegador. No es seguridad real: GitHub Pages es estatico.";
    error.textContent = "";
    input.value = "";
    modal.hidden = false;
    input.focus();

    modal.querySelector("[data-admin-access-form]").onsubmit = (event) => {
      event.preventDefault();
      const value = input.value.trim();
      if (value.length < 4) {
        error.textContent = "Usa al menos 4 caracteres.";
        return;
      }
      if (!storedKey) {
        localStorage.setItem(adminKeyStorage, value);
        modal.hidden = true;
        openPanel();
        return;
      }
      if (value === storedKey) {
        modal.hidden = true;
        openPanel();
      } else {
        error.textContent = "Acceso no valido.";
      }
    };
  }

  function inventoryPanel(allProducts) {
    let panel = document.querySelector("[data-inventory-admin]");
    if (!panel) {
      panel = document.createElement("div");
      panel.className = "inventory-admin-overlay";
      panel.hidden = true;
      panel.dataset.inventoryAdmin = "";
      panel.innerHTML = `
        <section class="inventory-admin-panel" role="dialog" aria-modal="true" aria-label="Panel temporal B2B">
          <header class="inventory-admin-head">
            <div>
              <p class="eyebrow">Panel temporal B2B</p>
              <h2>Gestion visual de inventario</h2>
              <p>Los cambios se guardan en este navegador. Para publicarlos, exporta el JSON y actualiza data/inventario.json con commit.</p>
            </div>
            <button class="icon-button" type="button" data-admin-close aria-label="Cerrar">x</button>
          </header>
          <div class="inventory-admin-actions">
            <button class="button button-outline" type="button" data-admin-select-all>Seleccionar todo</button>
            <button class="button button-outline" type="button" data-admin-action="hidden">Ocultar</button>
            <button class="button button-outline" type="button" data-admin-action="soldout">Agotado</button>
            <button class="button button-outline" type="button" data-admin-action="lowstock">Pocas unidades</button>
            <button class="button button-outline" type="button" data-admin-action="normal">Normal / mostrar</button>
            <button class="button button-dark" type="button" data-admin-export>Exportar JSON</button>
            <button class="button button-outline" type="button" data-admin-reset>Limpiar local</button>
          </div>
          <p class="inventory-admin-message" data-admin-message></p>
          <div class="inventory-admin-list" data-admin-list></div>
          <textarea class="inventory-admin-export" data-admin-export-output readonly hidden></textarea>
        </section>
      `;
      document.body.appendChild(panel);
      panel.querySelector("[data-admin-close]").addEventListener("click", () => {
        panel.hidden = true;
      });
      panel.addEventListener("click", (event) => {
        if (event.target === panel) panel.hidden = true;
      });
    }

    const list = panel.querySelector("[data-admin-list]");
    const message = panel.querySelector("[data-admin-message]");
    const output = panel.querySelector("[data-admin-export-output]");

    function codes(product) {
      return (product.variantes || []).map((variant) => variant.codigo).filter(Boolean).slice(0, 5).join(" · ");
    }

    function renderRows() {
      list.innerHTML = allProducts
        .map((product) => {
          const image = window.BalmainCatalog.imageFor(product);
          const status = window.BalmainCatalog.productStatus(product);
          return `
            <label class="inventory-admin-row inventory-${status}">
              <input type="checkbox" value="${escapeHtml(product.slug)}" data-admin-check>
              <span class="inventory-admin-thumb">${image ? `<img src="${window.BalmainCatalog.asset(image)}" alt="${escapeHtml(product.nombre)}" loading="lazy" decoding="async">` : ""}</span>
              <span class="inventory-admin-copy">
                <strong>${escapeHtml(product.nombre)}</strong>
                <small>${escapeHtml(pick(product.categoriaLabel))} · ${escapeHtml(codes(product))}</small>
              </span>
              <span class="inventory-admin-status">${escapeHtml(window.BalmainCatalog.statusLabel(status))}</span>
            </label>
          `;
        })
        .join("");
    }

    function selectedSlugs() {
      return Array.from(panel.querySelectorAll("[data-admin-check]:checked")).map((input) => input.value);
    }

    panel.querySelectorAll("[data-admin-action]").forEach((button) => {
      button.onclick = () => {
        const slugs = selectedSlugs();
        if (!slugs.length) {
          message.textContent = "Selecciona uno o varios productos.";
          return;
        }
        window.BalmainCatalog.setLocalInventoryState(slugs, button.dataset.adminAction);
        message.textContent = `${slugs.length} producto(s) actualizados en este navegador.`;
        output.hidden = true;
        renderRows();
      };
    });

    panel.querySelector("[data-admin-select-all]").onclick = () => {
      const checks = Array.from(panel.querySelectorAll("[data-admin-check]"));
      const shouldCheck = checks.some((input) => !input.checked);
      checks.forEach((input) => {
        input.checked = shouldCheck;
      });
      message.textContent = shouldCheck ? "Productos seleccionados." : "Seleccion limpia.";
    };

    panel.querySelector("[data-admin-export]").onclick = () => {
      output.hidden = false;
      output.value = JSON.stringify(window.BalmainCatalog.exportInventory(), null, 2);
      output.focus();
      output.select();
      message.textContent = "JSON listo para publicar en data/inventario.json.";
    };

    panel.querySelector("[data-admin-reset]").onclick = () => {
      window.BalmainCatalog.resetLocalInventory();
      output.hidden = true;
      message.textContent = "Cambios locales eliminados.";
      renderRows();
    };

    renderRows();
    message.textContent = "";
    panel.hidden = false;
  }

  async function initSearch() {
    const overlay = document.querySelector("[data-search-overlay]");
    const input = document.querySelector("[data-search-input]");
    const results = document.querySelector("[data-search-results]");
    const preview = document.querySelector("[data-search-preview]");
    if (!overlay || !input || !results || !preview || !window.BalmainCatalog) return;

    const allProducts = await window.BalmainCatalog.getProducts();
    await window.BalmainCatalog.getInventory();

    function searchableProducts() {
      return window.BalmainCatalog.visibleProducts(allProducts);
    }

    function renderPreview(product, forcedImage) {
      const image = forcedImage || window.BalmainCatalog.imageFor(product);
      const codes = (product.variantes || []).map((variant) => variant.codigo).slice(0, 5).join(" · ");
      preview.innerHTML = image
        ? `
          <img src="${window.BalmainCatalog.asset(image)}" alt="${escapeHtml(product.nombre)}" decoding="async">
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
            `<button type="button" class="search-mini-thumb" data-preview-src="${window.BalmainCatalog.asset(image.src)}" aria-label="${escapeHtml(product.nombre)} ${escapeHtml(image.slot)}"><img src="${window.BalmainCatalog.asset(image.src)}" alt="" loading="lazy" decoding="async"></button>`
        )
        .join("");
    }

    function render() {
      const query = input.value.trim().toLowerCase();
      const products = searchableProducts();
      const pool = query
        ? products.filter((product) => window.BalmainCatalog.productSearchText(product).includes(query)).slice(0, 12)
        : products.filter((product) => product.destacado).slice(0, 12);

      results.innerHTML = pool
        .map((product) => {
          const image = window.BalmainCatalog.imageFor(product);
          const codes = (product.variantes || []).map((variant) => variant.codigo).slice(0, 3).join(" · ");
          const status = window.BalmainCatalog.productStatus(product);
          return `
            <article class="search-result inventory-${status}" data-search-slug="${escapeHtml(product.slug)}">
              <a class="search-result-main" href="${window.BalmainCatalog.productHref(product.slug)}">
                <span class="search-thumb">${image ? `<img src="${window.BalmainCatalog.asset(image)}" alt="${escapeHtml(product.nombre)}" loading="lazy" decoding="async">` : ""}</span>
                <span>
                  <strong>${escapeHtml(product.nombre)}</strong>
                  <small>${escapeHtml(pick(product.categoriaLabel))} · ${escapeHtml(codes)}</small>
                  ${status !== "normal" ? `<em>${escapeHtml(window.BalmainCatalog.statusLabel(status))}</em>` : ""}
                </span>
              </a>
              <span class="search-mini-gallery">${resultThumbs(product)}</span>
            </article>
          `;
        })
        .join("");

      if (pool[0]) renderPreview(pool[0]);
      if (!pool[0]) preview.innerHTML = `<div class="image-placeholder"><span>BALMAIN</span></div>`;
      results.querySelectorAll("[data-search-slug]").forEach((node) => {
        const product = allProducts.find((item) => item.slug === node.dataset.searchSlug);
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

    refreshSearch = render;

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
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && input.value.trim() === adminTrigger) {
        event.preventDefault();
        adminAccessModal(() => inventoryPanel(allProducts));
      }
    });
    input.addEventListener("input", render);
    window.addEventListener("balmain:languagechange", render);
    window.addEventListener("balmain:inventorychange", render);
  }

  window.BalmainSearch = {
    initSearch,
    refresh() {
      refreshSearch?.();
    },
  };
})();
