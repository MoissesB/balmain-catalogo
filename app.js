(function () {
  const STORAGE_KEY = "innova-boutique-order-v1";
  const HERO_PROGRESS_KEY = "innova-boutique-hero-progress-v2";
  const config = window.INNOVA_BOUTIQUE_CONFIG || { brands: {} };
  const brandLabels = {
    "alfred-kerbs": "Alfred Kerbs",
    balmain: "Balmain Eyewear",
    silhouette: "Silhouette",
  };
  const translate = (value) => window.INNOVA_I18N?.t(value) || value;

  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
  if (!window.location.hash) {
    window.history.replaceState(null, "", "#inicio");
    window.requestAnimationFrame(() => {
      document.getElementById("inicio")?.scrollIntoView({ block: "start" });
    });
  }

  document.querySelectorAll("[data-brand-link]").forEach((link) => {
    const brand = link.dataset.brandLink;
    link.href = config.brands?.[brand] || "#";
  });

  function brandDestination(brand, path = "") {
    const base = config.brands?.[brand];
    if (!base) return "#";
    const normalizedBase = new URL(base, window.location.href);
    normalizedBase.pathname = `${normalizedBase.pathname.replace(/\/+$/, "")}/`;
    return new URL(String(path).replace(/^\/+/, ""), normalizedBase).href;
  }

  function brandAssetDestination(brand, path = "") {
    const base = config.assets?.[brand] || config.brands?.[brand];
    if (!base) return "#";
    const normalizedBase = new URL(base, window.location.href);
    normalizedBase.pathname = `${normalizedBase.pathname.replace(/\/+$/, "")}/`;
    return new URL(String(path).replace(/^\/+/, ""), normalizedBase).href;
  }

  function brandRouteDestination(brand, path = "") {
    if (["alfred-kerbs", "silhouette"].includes(brand) && !config.local) {
      const base = brandDestination(brand);
      const route = String(path).replace(/^\/+/, "");
      return route ? `${base.replace(/\/+$/, "/")}#/${route}` : base;
    }
    return brandDestination(brand, path);
  }

  document.querySelectorAll("[data-brand-route]").forEach((link) => {
    const [brand, ...pathParts] = link.dataset.brandRoute.split(":");
    link.href = brandRouteDestination(brand, pathParts.join(":"));
  });

  document.querySelectorAll("[data-brand-asset]").forEach((image) => {
    const [brand, ...pathParts] = image.dataset.brandAsset.split(":");
    image.src = brandAssetDestination(brand, pathParts.join(":"));
    image.addEventListener("error", () => {
      if (image.dataset.fallbackApplied) return;
      image.dataset.fallbackApplied = "true";
      image.src = brand === "silhouette"
        ? "assets/campaign-silhouette.webp"
        : brand === "balmain"
          ? "assets/campaign-balmain.webp"
          : "assets/alfred-kerbs.webp";
    }, { once: true });
  });

  const showcaseProducts = window.INNOVA_SHOWCASE_PRODUCTS?.brands || {};
  const escapeAttribute = (value) => escapeHtml(value).replaceAll("`", "&#96;");

  document.querySelectorAll("[data-product-carousel]").forEach((carousel) => {
    const brand = carousel.dataset.productCarousel;
    const products = showcaseProducts[brand] || [];
    const track = carousel.querySelector("[data-product-track]");
    const previous = carousel.querySelector("[data-product-prev]");
    const next = carousel.querySelector("[data-product-next]");
    const pageLabel = carousel.querySelector("[data-product-page]");
    let page = 0;

    if (!track || !products.length) return;
    track.innerHTML = products.map((product) => `
      <a class="product-preview" href="${escapeAttribute(brandRouteDestination(brand, product.path))}">
        <span class="product-preview-media">
          <img src="${escapeAttribute(brandAssetDestination(brand, product.image))}" alt="${escapeAttribute(`${product.name} · ${brandLabels[brand] || brand}`)}" loading="lazy">
        </span>
        <span class="product-preview-copy">
          <b>${escapeHtml(product.name)}</b>
          <small>${escapeHtml(product.meta || "")}</small>
        </span>
      </a>
    `).join("");

    const perPage = () => window.matchMedia("(max-width: 680px)").matches ? 1 : 3;
    const totalPages = () => Math.max(1, Math.ceil(products.length / perPage()));
    const update = (nextPage) => {
      page = Math.max(0, Math.min(totalPages() - 1, nextPage));
      track.style.transform = `translateX(-${page * 100}%)`;
      if (pageLabel) pageLabel.textContent = `${String(page + 1).padStart(2, "0")} / ${String(totalPages()).padStart(2, "0")}`;
      previous?.toggleAttribute("disabled", page === 0);
      next?.toggleAttribute("disabled", page === totalPages() - 1);
    };
    previous?.addEventListener("click", () => update(page - 1));
    next?.addEventListener("click", () => update(page + 1));
    window.addEventListener("resize", () => update(Math.min(page, totalPages() - 1)), { passive: true });
    track.querySelectorAll("img").forEach((image) => {
      image.addEventListener("error", () => {
        image.src = brand === "silhouette"
          ? "assets/campaign-silhouette.webp"
          : brand === "balmain"
            ? "assets/campaign-balmain.webp"
            : "assets/alfred-kerbs.webp";
      }, { once: true });
    });
    update(0);
  });

  const heroFilm = document.querySelector("[data-hero-film]");
  const heroVideos = heroFilm ? [...heroFilm.querySelectorAll("[data-hero-video]")] : [];
  const heroSwitches = heroFilm ? [...heroFilm.querySelectorAll("[data-hero-switch]")] : [];
  const heroReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const HERO_SEGMENT_SECONDS = 5;
  const HERO_DWELL_MS = HERO_SEGMENT_SECONDS * 1000;
  let heroFilmIndex = 0;
  const heroFilmOffsets = (() => {
    try {
      const stored = JSON.parse(window.sessionStorage.getItem(HERO_PROGRESS_KEY) || "[]");
      return heroVideos.map((_, index) => Math.max(0, Number(stored[index]) || 0));
    } catch {
      return heroVideos.map(() => 0);
    }
  })();
  let heroFilmTimer = 0;
  let heroFilmVisible = true;
  let heroFilmRequest = 0;
  let heroFilmReady = false;

  function prepareHeroVideo(video, seconds, onReady) {
    if (video.readyState > 0) {
      onReady(seconds);
    } else {
      video.addEventListener("loadedmetadata", () => onReady(seconds), { once: true });
    }
  }

  function scheduleHeroFilm() {
    window.clearTimeout(heroFilmTimer);
    if (!heroFilmVisible || heroReducedMotion.matches || heroVideos.length < 2 || document.hidden) return;
    heroFilmTimer = window.setTimeout(() => {
      heroVideos[heroFilmIndex]?.pause();
      heroFilmOffsets[heroFilmIndex] += HERO_SEGMENT_SECONDS;
      window.sessionStorage.setItem(HERO_PROGRESS_KEY, JSON.stringify(heroFilmOffsets));
      const nextIndex = (heroFilmIndex + 1) % heroVideos.length;
      showHeroFilm(nextIndex);
    }, HERO_DWELL_MS);
  }

  function showHeroFilm(nextIndex) {
    if (!heroVideos.length) return;
    const requestedIndex = (nextIndex + heroVideos.length) % heroVideos.length;
    const requestedOffset = heroFilmOffsets[requestedIndex];
    const request = ++heroFilmRequest;
    const activeVideo = heroVideos[requestedIndex];
    const activeBrand = activeVideo.dataset.heroVideo;

    prepareHeroVideo(activeVideo, requestedOffset, (segmentStart) => {
      if (request !== heroFilmRequest) return;
      const duration = Number.isFinite(activeVideo.duration) && activeVideo.duration > 0
        ? activeVideo.duration
        : 0;
      const playbackStart = duration ? segmentStart % duration : 0;
      let playbackStarted = false;
      let seekFallback = 0;

      const startPlayback = () => {
        if (playbackStarted || request !== heroFilmRequest) return;
        playbackStarted = true;
        window.clearTimeout(seekFallback);
        heroFilmIndex = requestedIndex;
        heroFilmReady = true;
        heroFilm.dataset.activeBrand = activeBrand;
        heroFilm.dataset.segmentStart = String(playbackStart);

        heroVideos.forEach((video, index) => {
          const active = index === heroFilmIndex;
          video.classList.toggle("is-active", active);
          video.dataset.segmentStart = active ? String(playbackStart) : "";
          if (active) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });

        heroSwitches.forEach((link) => {
          const active = link.dataset.heroSwitch === activeBrand;
          link.classList.toggle("is-active", active);
          if (active) {
            link.setAttribute("aria-current", "true");
          } else {
            link.removeAttribute("aria-current");
          }
        });
        scheduleHeroFilm();
      };

      if (Math.abs(activeVideo.currentTime - playbackStart) <= 0.25) {
        startPlayback();
        return;
      }

      activeVideo.addEventListener("seeked", startPlayback, { once: true });
      try {
        activeVideo.currentTime = playbackStart;
        seekFallback = window.setTimeout(startPlayback, 1500);
      } catch {
        startPlayback();
      }
    });
  }

  if (heroFilm && "IntersectionObserver" in window) {
    const heroObserver = new IntersectionObserver(([entry]) => {
      heroFilmVisible = entry.isIntersecting;
      if (heroFilmVisible) {
        if (heroFilmReady) {
          heroVideos[heroFilmIndex]?.play().catch(() => {});
          scheduleHeroFilm();
        }
      } else {
        window.clearTimeout(heroFilmTimer);
        heroVideos.forEach((video) => video.pause());
      }
    }, { threshold: .08 });
    heroObserver.observe(heroFilm);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      window.clearTimeout(heroFilmTimer);
      heroVideos.forEach((video) => video.pause());
    } else if (heroFilmVisible && heroFilmReady) {
      heroVideos[heroFilmIndex]?.play().catch(() => {});
      scheduleHeroFilm();
    }
  });

  showHeroFilm(0);

  document.querySelectorAll(".product-preview-media").forEach((media) => {
    media.addEventListener("pointermove", (event) => {
      const bounds = media.getBoundingClientRect();
      media.style.setProperty("--zoom-x", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
      media.style.setProperty("--zoom-y", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
    });
    media.addEventListener("pointerleave", () => {
      media.style.setProperty("--zoom-x", "50%");
      media.style.setProperty("--zoom-y", "50%");
    });
  });

  const track = document.querySelector("[data-brand-track]");
  const cards = track ? [...track.children] : [];
  let carouselIndex = 0;

  function updateCarousel(nextIndex) {
    if (!track || !cards.length) return;
    carouselIndex = (nextIndex + cards.length) % cards.length;
    track.style.transform = `translateX(-${carouselIndex * 100}%)`;
    const current = document.querySelector("[data-carousel-current]");
    if (current) current.textContent = String(carouselIndex + 1).padStart(2, "0");
  }

  document.querySelector("[data-carousel-prev]")?.addEventListener("click", () => updateCarousel(carouselIndex - 1));
  document.querySelector("[data-carousel-next]")?.addEventListener("click", () => updateCarousel(carouselIndex + 1));

  const globalHeader = document.querySelector("[data-global-header]");
  const globalMenuToggle = document.querySelector("[data-global-menu-toggle]");
  const globalMegaToggle = document.querySelector(".global-mega-toggle");
  globalMenuToggle?.addEventListener("click", () => {
    const open = globalHeader?.classList.toggle("is-menu-open");
    globalMenuToggle.textContent = open ? "Cerrar" : "Menú";
  });
  globalMegaToggle?.addEventListener("click", () => {
    const open = globalHeader?.classList.toggle("is-mega-open");
    globalMegaToggle.setAttribute("aria-expanded", String(Boolean(open)));
  });

  const globalMega = document.querySelector("[data-global-mega]");
  const megaBrandGroups = [...document.querySelectorAll("[data-mega-brand]")];
  const megaImages = [...document.querySelectorAll("[data-mega-image]")];
  const megaBrands = megaImages.map((image) => image.dataset.megaImage).filter(Boolean);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let megaBrandIndex = 0;
  let megaVisualTimer = 0;

  function showMegaBrand(brand) {
    const nextIndex = megaBrands.indexOf(brand);
    if (nextIndex >= 0) megaBrandIndex = nextIndex;
    megaImages.forEach((image) => {
      image.classList.toggle("is-active", image.dataset.megaImage === brand);
    });
  }

  function startMegaVisualRotation() {
    window.clearInterval(megaVisualTimer);
    if (reduceMotion || megaBrands.length < 2) return;
    megaVisualTimer = window.setInterval(() => {
      megaBrandIndex = (megaBrandIndex + 1) % megaBrands.length;
      showMegaBrand(megaBrands[megaBrandIndex]);
    }, 3800);
  }

  megaBrandGroups.forEach((group) => {
    const brand = group.dataset.megaBrand;
    group.addEventListener("pointerenter", () => {
      window.clearInterval(megaVisualTimer);
      showMegaBrand(brand);
    });
    group.addEventListener("focusin", () => {
      window.clearInterval(megaVisualTimer);
      showMegaBrand(brand);
    });
  });
  globalMega?.addEventListener("pointerleave", startMegaVisualRotation);
  globalMega?.addEventListener("focusout", (event) => {
    if (!globalMega.contains(event.relatedTarget)) startMegaVisualRotation();
  });
  startMegaVisualRotation();

  const focusTrack = document.querySelector("[data-focus-track]");
  const focusCards = [...document.querySelectorAll("[data-focus-card]")];
  let selectedFocusCard = focusCards.find((card) => card.classList.contains("is-active")) || focusCards[0];

  function showFocusCard(card) {
    if (!card) return;
    focusCards.forEach((item) => {
      item.classList.toggle("is-active", item === card);
    });
  }

  focusCards.forEach((card) => {
    card.addEventListener("pointerenter", () => showFocusCard(card));
    card.addEventListener("focus", () => showFocusCard(card));
    card.addEventListener("click", () => {
      selectedFocusCard = card;
      showFocusCard(card);
    });
  });
  focusTrack?.addEventListener("pointerleave", () => showFocusCard(selectedFocusCard));

  function blankOrder() {
    return {
      items: [],
      client: {
        name: "",
        company: "",
        optical: "",
        email: "",
        phone: "",
        city: "",
        country: "",
        notes: "",
      },
    };
  }

  function readOrder() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      return parsed && Array.isArray(parsed.items)
        ? { ...blankOrder(), ...parsed, client: { ...blankOrder().client, ...(parsed.client || {}) } }
        : blankOrder();
    } catch {
      return blankOrder();
    }
  }

  let order = readOrder();
  const shell = document.querySelector("[data-order-shell]");
  const itemsRoot = document.querySelector("[data-order-items]");
  const status = document.querySelector("[data-order-status]");

  function saveOrder() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
    renderOrder();
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[character]);
  }

  function groupItemsByBrand(items) {
    return items.reduce((groups, item) => {
      const brand = item.brand || "other";
      if (!groups[brand]) groups[brand] = [];
      groups[brand].push(item);
      return groups;
    }, {});
  }

  function brandTotals() {
    return Object.fromEntries(Object.entries(groupItemsByBrand(order.items)).map(([brand, items]) => [
      brand,
      items.reduce((total, item) => total + Number(item.quantity || 0), 0),
    ]));
  }

  function incompleteBrands() {
    return Object.entries(brandTotals()).filter(([, total]) => total < 18);
  }

  function resolveOrderItemImage(item) {
    if (!item.image) return "";
    try {
      return new URL(item.image, config.brands?.[item.brand] || window.location.origin).href;
    } catch {
      return item.image;
    }
  }

  function clientValidationErrors() {
    const errors = {};
    const requiredFields = ["name", "company", "optical", "city", "country"];
    requiredFields.forEach((key) => {
      if (!order.client[key].trim()) errors[key] = "Este campo es obligatorio.";
    });

    if (!order.client.email.trim()) {
      errors.email = "El correo profesional es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(order.client.email.trim())) {
      errors.email = "Usa un correo completo, por ejemplo nombre@empresa.com.";
    }

    if (!order.client.phone.trim()) {
      errors.phone = "El teléfono es obligatorio.";
    } else if (!/^\+\d[\d\s().-]{6,}$/.test(order.client.phone.trim())) {
      errors.phone = "Incluye +, el código del país y al menos 7 dígitos.";
    }
    return errors;
  }

  function validateClient() {
    return Object.keys(clientValidationErrors()).length === 0;
  }

  function clientIssueSummary(errors) {
    const labels = {
      name: "nombre y apellido",
      company: "empresa",
      optical: "nombre de la óptica",
      email: "correo profesional",
      phone: "teléfono",
      city: "ciudad",
      country: "país",
    };
    return Object.keys(errors).map((key) => labels[key]).join(", ");
  }

  function renderOrder() {
    const totalUnits = order.items.reduce((total, item) => total + Number(item.quantity || 0), 0);
    const totals = brandTotals();
    const completedBrands = Object.values(totals).filter((total) => total >= 18).length;
    document.querySelectorAll("[data-order-count]").forEach((node) => { node.textContent = String(totalUnits); });
    const units = document.querySelector("[data-order-units]");
    const brands = document.querySelector("[data-order-brands]");
    const brandsLabel = document.querySelector("[data-order-brands-label]");
    if (units) units.textContent = String(totalUnits);
    if (brands) brands.textContent = String(completedBrands);
    if (brandsLabel) brandsLabel.textContent = completedBrands === 1 ? "marca lista" : "marcas listas";
    const incomplete = incompleteBrands();
    const clientErrors = clientValidationErrors();
    const ready = order.items.length > 0 && incomplete.length === 0 && Object.keys(clientErrors).length === 0;
    document.querySelector("[data-order-pdf]")?.toggleAttribute(
      "disabled",
      !ready,
    );
    if (status) {
      const blockers = [];
      if (!order.items.length) {
        blockers.push("Añade productos a la selección.");
      } else if (incomplete.length) {
        blockers.push(`Completa 18 piezas en ${incomplete.map(([brand]) => brandLabels[brand] || brand).join(", ")}.`);
      }
      if (Object.keys(clientErrors).length) {
        blockers.push(`Revisa: ${clientIssueSummary(clientErrors)}.`);
      }
      status.textContent = ready ? "Pedido completo y listo para preparar." : `No se puede descargar todavía. ${blockers.join(" ")}`;
      status.classList.toggle("is-ready", ready);
    }
    document.querySelectorAll("[data-client]").forEach((field) => {
      const key = field.dataset.client;
      const message = clientErrors[key] || "";
      field.toggleAttribute("aria-invalid", Boolean(message));
      field.closest("label")?.classList.toggle("has-error", Boolean(message));
      const error = document.querySelector(`[data-client-error="${key}"]`);
      if (error) error.textContent = message;
    });
    const minimumNote = document.querySelector("[data-order-minimum]");
    if (minimumNote) {
      minimumNote.textContent = incomplete.length
        ? `Pendiente: ${incomplete.map(([brand, total]) => `${brandLabels[brand] || brand} ${total}/18`).join(" · ")}`
        : order.items.length ? "Mínimo comercial completado en todas las marcas." : "18 piezas mínimas por marca.";
      minimumNote.classList.toggle("is-complete", order.items.length > 0 && incomplete.length === 0);
    }

    if (!itemsRoot) return;
    if (!order.items.length) {
      itemsRoot.innerHTML = `
        <div class="empty-order">
          <span>SELECCIÓN PROFESIONAL</span>
          <h3>Tu pedido multimarcas comienza en cada catálogo.</h3>
          <p>Entra en Alfred Kerbs, Balmain o Silhouette y añade las referencias que quieras revisar con Innova.</p>
          <a href="#marcas" data-order-close>Explorar marcas →</a>
        </div>`;
      return;
    }

    itemsRoot.innerHTML = Object.entries(groupItemsByBrand(order.items)).map(([brand, items]) => `
      <section class="order-brand-group">
        <h3>${escapeHtml(brandLabels[brand] || brand)} <span>${totals[brand]}/18 piezas</span></h3>
        <div class="brand-minimum ${totals[brand] >= 18 ? "is-complete" : ""}">
          <span><i style="width:${Math.min(100, (totals[brand] / 18) * 100)}%"></i></span>
          <small>${totals[brand] >= 18 ? "Mínimo completado" : `Faltan ${18 - totals[brand]} piezas`}</small>
        </div>
        ${items.map((item) => `
          <article>
            ${item.image ? `<img src="${escapeHtml(resolveOrderItemImage(item))}" alt="">` : `<div class="order-placeholder">${escapeHtml((brandLabels[item.brand] || item.brand).slice(0, 2))}</div>`}
            <div><b>${escapeHtml(item.name || item.model)}</b><span>${escapeHtml(item.sku || "")}${item.color ? ` · ${escapeHtml(item.color)}` : ""}</span></div>
            <label><span>Cantidad</span><input type="number" min="1" max="999" value="${Number(item.quantity) || 1}" data-order-quantity="${escapeHtml(item.key)}"></label>
            <button type="button" data-order-remove="${escapeHtml(item.key)}" aria-label="Quitar ${escapeHtml(item.name || item.model)}">×</button>
          </article>`).join("")}
      </section>`).join("");

    itemsRoot.querySelectorAll("[data-order-quantity]").forEach((input) => {
      input.addEventListener("change", () => {
        const item = order.items.find((entry) => entry.key === input.dataset.orderQuantity);
        if (item) item.quantity = Math.max(1, Math.min(999, Number(input.value) || 1));
        saveOrder();
      });
    });
    itemsRoot.querySelectorAll("[data-order-remove]").forEach((button) => {
      button.addEventListener("click", () => {
        order.items = order.items.filter((item) => item.key !== button.dataset.orderRemove);
        saveOrder();
      });
    });
  }

  function setDrawer(open) {
    if (!shell) return;
    shell.hidden = !open;
    document.body.classList.toggle("order-open", open);
    if (open) shell.querySelector("[data-order-close]")?.focus();
  }

  const chatPanel = document.querySelector("[data-chat-panel]");
  const chatToggle = document.querySelector("[data-chat-toggle]");

  function setChat(open) {
    if (!chatPanel || !chatToggle) return;
    chatPanel.hidden = !open;
    chatToggle.setAttribute("aria-expanded", String(open));
  }

  chatToggle?.addEventListener("click", () => setChat(chatPanel?.hidden !== false));
  document.querySelector("[data-chat-close]")?.addEventListener("click", () => setChat(false));
  document.querySelector("[data-chat-order]")?.addEventListener("click", () => {
    setChat(false);
    setDrawer(true);
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-order-open]")) setDrawer(true);
    if (event.target.closest("[data-order-close]")) setDrawer(false);
  });

  document.querySelectorAll("[data-client]").forEach((field) => {
    const key = field.dataset.client;
    field.value = order.client[key] || "";
    field.addEventListener("input", () => {
      order.client[key] = field.value;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
      renderOrder();
    });
  });

  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY) return;
    order = readOrder();
    renderOrder();
  });

  window.addEventListener("message", (event) => {
    if (event.data?.type !== "innova-boutique:add-item") return;
    const allowed = new Set(config.allowedOrigins || [window.location.origin]);
    if (!allowed.has(event.origin)) return;
    const item = event.data.item;
    const key = String(item.key || `${item.brand}:${item.sku || item.productId}`);
    const existing = order.items.find((entry) => entry.key === key);
    if (existing) existing.quantity += Math.max(1, Number(item.quantity) || 1);
    else order.items.push({ ...item, key, quantity: Math.max(1, Number(item.quantity) || 1) });
    saveOrder();
  });

  async function downloadPdf() {
    if (!order.items.length) return;
    const incomplete = incompleteBrands();
    if (incomplete.length) {
      status.textContent = `Completa 18 piezas por marca: ${incomplete.map(([brand, total]) => `${brandLabels[brand] || brand} ${total}/18`).join(" · ")}.`;
      return;
    }
    if (!validateClient()) {
      status.textContent = `No se puede descargar todavía. Revisa: ${clientIssueSummary(clientValidationErrors())}.`;
      return;
    }
    status.textContent = "Preparando PDF…";
    try {
      if (!window.PDFLib) throw new Error("PDF library unavailable");
      const { PDFDocument, StandardFonts, rgb } = window.PDFLib;
      const pdfDocument = await PDFDocument.create();
      const regular = await pdfDocument.embedFont(StandardFonts.Helvetica);
      const bold = await pdfDocument.embedFont(StandardFonts.HelveticaBold);
      const pageSize = [595.28, 841.89];
      const margin = 42;
      const black = rgb(0.08, 0.075, 0.075);
      const gray = rgb(0.43, 0.41, 0.4);
      const line = rgb(0.86, 0.85, 0.84);
      const pale = rgb(0.965, 0.968, 0.97);
      const white = rgb(1, 1, 1);
      const embeddedImages = new Map();

      function pdfText(value) {
        return String(value || "")
          .replace(/[–—]/g, "-")
          .replace(/[‘’]/g, "'")
          .replace(/[“”]/g, '"')
          .replace(/…/g, "...")
          .replace(/[^\x20-\x7E\xA0-\xFF]/g, " ");
      }

      async function embedImageFromUrl(source) {
        if (!source) return null;
        const absoluteUrl = new URL(source, window.location.href).href;
        if (embeddedImages.has(absoluteUrl)) return embeddedImages.get(absoluteUrl);
        const pending = (async () => {
          try {
            const response = await fetch(absoluteUrl, { cache: "force-cache", mode: "cors" });
            if (!response.ok) return null;
            const blob = await response.blob();
            const type = blob.type.toLowerCase();
            if (type.includes("png")) {
              return pdfDocument.embedPng(new Uint8Array(await blob.arrayBuffer()));
            }
            if (type.includes("jpeg") || type.includes("jpg")) {
              return pdfDocument.embedJpg(new Uint8Array(await blob.arrayBuffer()));
            }
            const bitmap = await createImageBitmap(blob);
            const canvas = document.createElement("canvas");
            canvas.width = bitmap.width;
            canvas.height = bitmap.height;
            const context = canvas.getContext("2d");
            context.fillStyle = "#ffffff";
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.drawImage(bitmap, 0, 0);
            bitmap.close();
            const jpegBlob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.9));
            return jpegBlob
              ? pdfDocument.embedJpg(new Uint8Array(await jpegBlob.arrayBuffer()))
              : null;
          } catch (error) {
            console.warn("PDF image omitted", absoluteUrl, error);
            return null;
          }
        })();
        embeddedImages.set(absoluteUrl, pending);
        return pending;
      }

      function drawContained(targetPage, image, x, bottom, width, height) {
        if (!image) return;
        const scale = Math.min(width / image.width, height / image.height);
        const imageWidth = image.width * scale;
        const imageHeight = image.height * scale;
        targetPage.drawImage(image, {
          x: x + (width - imageWidth) / 2,
          y: bottom + (height - imageHeight) / 2,
          width: imageWidth,
          height: imageHeight,
        });
      }

      function wrap(value, font, size, maxWidth) {
        const words = pdfText(value).split(/\s+/).filter(Boolean);
        const lines = [];
        let current = "";
        words.forEach((word) => {
          const candidate = current ? `${current} ${word}` : word;
          if (font.widthOfTextAtSize(candidate, size) <= maxWidth || !current) {
            current = candidate;
          } else {
            lines.push(current);
            current = word;
          }
        });
        if (current) lines.push(current);
        return lines;
      }

      const innovaLogo = await embedImageFromUrl("assets/innova-logo.png");
      const brandLogoSources = {
        "alfred-kerbs": "assets/alfred-kerbs-logo.png",
        balmain: "assets/balmain-logo-transparent.png",
      };
      const brandLogos = {};
      for (const [brand, source] of Object.entries(brandLogoSources)) {
        brandLogos[brand] = await embedImageFromUrl(source);
      }

      status.textContent = "Preparando imágenes y datos del pedido…";
      const productImages = new Map();
      await Promise.all(order.items.map(async (item) => {
        const source = resolveOrderItemImage(item);
        productImages.set(item.key, await embedImageFromUrl(source));
      }));

      let page = null;
      let y = 0;

      function drawPageHeader(targetPage) {
        drawContained(targetPage, innovaLogo, margin, 786, 118, 30);
        targetPage.drawText("SELECCION PROFESIONAL", {
          x: 403,
          y: 799,
          size: 7,
          font: bold,
          color: gray,
        });
        targetPage.drawLine({
          start: { x: margin, y: 778 },
          end: { x: pageSize[0] - margin, y: 778 },
          thickness: 0.75,
          color: line,
        });
      }

      function newPage() {
        page = pdfDocument.addPage(pageSize);
        drawPageHeader(page);
        y = 752;
      }

      function drawText(value, x, atY, size = 9, font = regular, color = black) {
        page.drawText(pdfText(value), { x, y: atY, size, font, color });
      }

      newPage();
      drawText("PEDIDO MULTIMARCAS", margin, y, 22, bold);
      y -= 22;
      drawText(
        `INNOVA-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}  ·  ${new Date().toLocaleDateString("es-ES")}`,
        margin,
        y,
        8,
        regular,
        gray,
      );
      y -= 30;

      page.drawRectangle({ x: margin, y: y - 112, width: 511, height: 112, color: pale });
      drawText("DATOS DE LA OPTICA O EMPRESA", margin + 15, y - 20, 8, bold, gray);
      const leftDetails = [
        ["Cliente", order.client.name],
        ["Optica", order.client.optical],
        ["Correo", order.client.email],
      ];
      const rightDetails = [
        ["Empresa", order.client.company],
        ["Telefono", order.client.phone],
        ["Ubicacion", `${order.client.city}, ${order.client.country}`],
      ];
      leftDetails.forEach(([label, value], index) => {
        drawText(label.toUpperCase(), margin + 15, y - 42 - index * 22, 6, bold, gray);
        drawText(value, margin + 70, y - 42 - index * 22, 8, regular, black);
      });
      rightDetails.forEach(([label, value], index) => {
        drawText(label.toUpperCase(), margin + 270, y - 42 - index * 22, 6, bold, gray);
        drawText(value, margin + 327, y - 42 - index * 22, 8, regular, black);
      });
      y -= 136;

      if (order.client.notes.trim()) {
        drawText("OBSERVACIONES", margin, y, 7, bold, gray);
        y -= 13;
        wrap(order.client.notes, regular, 8, 511).slice(0, 3).forEach((noteLine) => {
          drawText(noteLine, margin, y, 8, regular, black);
          y -= 12;
        });
        y -= 12;
      }

      for (const [brand, items] of Object.entries(groupItemsByBrand(order.items))) {
        if (y < 155) newPage();
        const brandTotal = items.reduce((total, item) => total + Number(item.quantity || 0), 0);
        page.drawRectangle({ x: margin, y: y - 38, width: 511, height: 38, color: black });
        if (brandLogos[brand]) {
          page.drawRectangle({ x: margin + 9, y: y - 31, width: 118, height: 24, color: white });
          drawContained(page, brandLogos[brand], margin + 14, y - 28, 108, 18);
        } else {
          drawText((brandLabels[brand] || brand).toUpperCase(), margin + 14, y - 24, 11, bold, white);
        }
        drawText(`${brandTotal} PIEZAS  ·  MINIMO COMPLETADO`, 386, y - 23, 7, bold, white);
        y -= 50;

        for (const item of items) {
          if (y < 112) newPage();
          const cardHeight = 72;
          const cardBottom = y - cardHeight;
          page.drawRectangle({
            x: margin,
            y: cardBottom,
            width: 511,
            height: cardHeight,
            color: white,
            borderColor: line,
            borderWidth: 0.7,
          });
          page.drawRectangle({
            x: margin + 8,
            y: cardBottom + 8,
            width: 104,
            height: 56,
            color: rgb(0.985, 0.985, 0.985),
          });
          const productImage = productImages.get(item.key);
          if (productImage) {
            drawContained(page, productImage, margin + 12, cardBottom + 11, 96, 50);
          } else {
            drawText((brandLabels[item.brand] || item.brand || "IN").slice(0, 2).toUpperCase(), margin + 52, cardBottom + 31, 11, bold, gray);
          }
          drawText(item.name || item.model, margin + 126, cardBottom + 48, 10, bold, black);
          drawText(`${item.sku || ""}${item.color ? `  ·  ${item.color}` : ""}`, margin + 126, cardBottom + 31, 7.5, regular, gray);
          const technical = [item.material, item.measurements].filter(Boolean).join("  ·  ");
          if (technical) drawText(technical, margin + 126, cardBottom + 16, 7, regular, gray);
          drawText(String(item.quantity), 503, cardBottom + 37, 14, bold, black);
          drawText("PIEZAS", 493, cardBottom + 22, 6, bold, gray);
          y -= cardHeight + 8;
        }
        y -= 14;
      }

      if (y < 92) newPage();
      page.drawLine({
        start: { x: margin, y: y },
        end: { x: pageSize[0] - margin, y },
        thickness: 0.75,
        color: line,
      });
      y -= 18;
      wrap(
        "Documento preparado para revision comercial de Innova Eyewear. La disponibilidad, las condiciones comerciales y el transporte se confirmaran antes de formalizar el pedido.",
        regular,
        7.5,
        511,
      ).forEach((footerLine) => {
        drawText(footerLine, margin, y, 7.5, regular, gray);
        y -= 11;
      });

      const pages = pdfDocument.getPages();
      pages.forEach((targetPage, index) => {
        targetPage.drawLine({
          start: { x: margin, y: 34 },
          end: { x: pageSize[0] - margin, y: 34 },
          thickness: 0.5,
          color: line,
        });
        targetPage.drawText("INNOVA EYEWEAR  ·  info@innova-eyewear.com  ·  +1 (754) 270-4613", {
          x: margin,
          y: 20,
          size: 6.5,
          font: regular,
          color: gray,
        });
        targetPage.drawText(`${index + 1} / ${pages.length}`, {
          x: pageSize[0] - margin - 18,
          y: 20,
          size: 6.5,
          font: bold,
          color: gray,
        });
      });

      const bytes = await pdfDocument.save();
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = window.document.createElement("a");
      link.href = url;
      const companyName = (order.client.optical || order.client.company || "pedido")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      link.download = `innova-boutique-${companyName}-${new Date().toISOString().slice(0, 10)}.pdf`;
      window.document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
      status.textContent = translate("PDF descargado. Envíalo al equipo comercial de Innova Eyewear.");
    } catch (error) {
      console.error("Innova Boutique PDF generation failed", error);
      status.textContent = translate("No se pudo preparar el PDF. Inténtalo nuevamente.");
    }
  }

  document.querySelector("[data-order-pdf]")?.addEventListener("click", downloadPdf);
  renderOrder();
})();
