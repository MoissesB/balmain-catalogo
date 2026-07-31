(function () {
  const STORAGE_KEY = "balmain-blog-posts-v1";
  const allowedTags = new Set(["P", "H2", "H3", "STRONG", "B", "EM", "I", "UL", "OL", "LI", "A", "BLOCKQUOTE", "TABLE", "THEAD", "TBODY", "TR", "TH", "TD", "BR"]);
  const seedPosts = [
    {
      id: "balmain-ss26",
      slug: "balmain-ss26-claves-para-el-punto-de-venta",
      title: "Balmain Eyewear SS26: claves para presentar la colección",
      excerpt: "Una lectura comercial de las familias, materiales y códigos visuales que ayudan a construir una selección coherente para ópticas premium.",
      content: "<p>La colección Balmain Eyewear SS26 propone una lectura clara para el punto de venta: siluetas reconocibles, detalles de construcción visibles y una gama capaz de combinar piezas de impacto con referencias de uso cotidiano.</p><h2>Construir un surtido legible</h2><p>La selección profesional gana fuerza cuando cada montura cumple una función. Las familias Avant-Garde, Iconic, Aspirational y Fashion Drops permiten ordenar la propuesta según carácter, ocasión de uso y perfil de cliente.</p><blockquote>Innova Eyewear acompaña la selección y confirma disponibilidad antes de formalizar cada pedido.</blockquote>",
      image: "assets/images/marketing/editorial-bgrand.jpg",
      status: "published",
      createdAt: "2026-07-18T10:00:00.000Z",
      updatedAt: "2026-07-18T10:00:00.000Z",
    },
    {
      id: "materiales-balmain",
      slug: "como-presentar-materiales-y-acabados-balmain",
      title: "Cómo presentar materiales y acabados Balmain",
      excerpt: "Recomendaciones para convertir los detalles técnicos de cada montura en argumentos claros para el equipo de venta.",
      content: "<p>Los materiales y acabados son una parte esencial del relato Balmain Eyewear. En la presentación profesional conviene relacionar cada detalle con el diseño general de la montura y con el tipo de cliente al que se dirige.</p><h2>Del detalle al argumento comercial</h2><p>La lectura debe comenzar por la forma, continuar por el color y terminar en los elementos constructivos. Esta secuencia facilita una recomendación natural y evita sobrecargar la conversación con especificaciones aisladas.</p>",
      image: "assets/images/marketing/editorial-olivier.jpg",
      status: "published",
      createdAt: "2026-07-12T10:00:00.000Z",
      updatedAt: "2026-07-12T10:00:00.000Z",
    },
    {
      id: "pedido-inicial-balmain",
      slug: "planificar-un-pedido-inicial-balmain",
      title: "Planificar un pedido inicial Balmain para tu óptica",
      excerpt: "Una guía práctica para combinar categorías, variantes y cantidades antes de enviar la selección a revisión de Innova Eyewear.",
      content: "<p>Un pedido inicial debe ofrecer variedad sin perder dirección. El nuevo selector profesional permite combinar referencias y colores, ajustar cantidades y preparar un PDF con los datos de la óptica.</p><h2>El mínimo como punto de partida</h2><p>La selección Balmain requiere un mínimo inicial de 18 piezas. Antes de confirmar, Innova Eyewear revisa inventario, condiciones comerciales y transporte con cada cliente profesional.</p>",
      image: "assets/images/marketing/editorial-pulse.jpg",
      status: "published",
      createdAt: "2026-07-05T10:00:00.000Z",
      updatedAt: "2026-07-05T10:00:00.000Z",
    },
  ];

  function base() {
    return document.body.dataset.base || "";
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => {
      const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
      return map[char];
    });
  }

  function sanitizeHtml(value) {
    const parser = new DOMParser();
    const documentNode = parser.parseFromString(`<div>${value || ""}</div>`, "text/html");
    const root = documentNode.body.firstElementChild;
    Array.from(root.querySelectorAll("*")).forEach((node) => {
      if (!allowedTags.has(node.tagName)) {
        node.replaceWith(...node.childNodes);
        return;
      }
      Array.from(node.attributes).forEach((attribute) => {
        if (node.tagName === "A" && attribute.name === "href" && /^(https?:|mailto:)/i.test(attribute.value)) return;
        node.removeAttribute(attribute.name);
      });
      if (node.tagName === "A") {
        node.setAttribute("target", "_blank");
        node.setAttribute("rel", "noopener noreferrer");
      }
    });
    return root.innerHTML;
  }

  function slugify(value) {
    return String(value || "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 90);
  }

  function readPosts() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (Array.isArray(saved)) return saved;
    } catch (_error) {
      localStorage.removeItem(STORAGE_KEY);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedPosts));
    return seedPosts.map((post) => ({ ...post }));
  }

  function writePosts(posts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    window.dispatchEvent(new CustomEvent("balmain:blogchange"));
  }

  function publishedPosts() {
    return readPosts()
      .filter((post) => post.status === "published")
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  function imageUrl(image) {
    if (!image) return "";
    if (/^(data:|https?:|\/)/.test(image)) return image;
    return `${base()}${image}`;
  }

  function postHref(post) {
    return `${base()}blog/?slug=${encodeURIComponent(post.slug)}`;
  }

  function postCard(post) {
    return `
      <article class="brand-blog-card">
        <a class="brand-blog-card-media" href="${postHref(post)}">
          ${post.image ? `<img src="${escapeHtml(imageUrl(post.image))}" alt="${escapeHtml(post.title)}" loading="lazy">` : ""}
        </a>
        <div>
          <p class="eyebrow">Balmain Eyewear · ${new Date(post.createdAt).toLocaleDateString("es")}</p>
          <h2><a href="${postHref(post)}">${escapeHtml(post.title)}</a></h2>
          <p>${escapeHtml(post.excerpt)}</p>
          <a class="text-link" href="${postHref(post)}">Leer publicación</a>
        </div>
      </article>
    `;
  }

  function renderBlog() {
    const root = document.querySelector("[data-blog-root]");
    if (!root) return;
    const slug = new URLSearchParams(window.location.search).get("slug");
    const posts = publishedPosts();
    if (slug) {
      const post = posts.find((item) => item.slug === slug);
      if (!post) {
        root.innerHTML = `<section class="section empty-state"><h1>Publicación no encontrada</h1><a class="button button-dark" href="${base()}blog/">Volver al blog</a></section>`;
        return;
      }
      document.title = `${post.title} | Blog Balmain Eyewear`;
      root.innerHTML = `
        <article class="brand-blog-post">
          <header>
            <p class="eyebrow">Blog profesional · Balmain Eyewear</p>
            <h1>${escapeHtml(post.title)}</h1>
            <p>${escapeHtml(post.excerpt)}</p>
            <time datetime="${escapeHtml(post.createdAt)}">${new Date(post.createdAt).toLocaleDateString("es", { year: "numeric", month: "long", day: "numeric" })}</time>
          </header>
          ${post.image ? `<figure><img src="${escapeHtml(imageUrl(post.image))}" alt="${escapeHtml(post.title)}"></figure>` : ""}
          <div class="brand-blog-content">${sanitizeHtml(post.content)}</div>
          <footer><a class="text-link" href="${base()}blog/">← Volver al blog Balmain</a></footer>
        </article>
      `;
      return;
    }
    root.innerHTML = `
      <section class="brand-blog-hero">
        <p class="eyebrow">Blog profesional · Balmain Eyewear</p>
        <h1>Diseño, producto y selección para ópticas.</h1>
        <p>Publicaciones independientes de Balmain para compradores profesionales, equipos de venta y puntos de distribución.</p>
      </section>
      <section class="section brand-blog-grid">${posts.map(postCard).join("")}</section>
    `;
  }

  function ensureNavigation() {
    document.querySelectorAll("[data-nav-links]").forEach((nav) => {
      if (nav.querySelector("[data-balmain-blog-link]")) return;
      const link = document.createElement("a");
      link.href = `${base()}blog/`;
      link.dataset.balmainBlogLink = "";
      link.textContent = "Blog";
      nav.appendChild(link);
    });
  }

  function editorMarkup(post = {}) {
    return `
      <form class="brand-blog-editor" data-blog-editor>
        <input type="hidden" name="id" value="${escapeHtml(post.id || "")}">
        <label><span>Título</span><input name="title" required value="${escapeHtml(post.title || "")}"></label>
        <label><span>Resumen</span><textarea name="excerpt" rows="3" required>${escapeHtml(post.excerpt || "")}</textarea></label>
        <label><span>Contenido HTML permitido</span><textarea name="content" rows="10" required placeholder="<p>Texto...</p><h2>Subtítulo</h2>">${escapeHtml(post.content || "")}</textarea></label>
        <label><span>URL de imagen</span><input name="image" value="${escapeHtml(post.image || "")}" placeholder="https://..."></label>
        <label><span>Subir imagen</span><input name="imageFile" type="file" accept="image/jpeg,image/png,image/webp"></label>
        <label class="brand-blog-publish"><input name="published" type="checkbox" ${post.status === "published" ? "checked" : ""}> Publicar ahora</label>
        <div class="brand-blog-editor-actions">
          <button class="button button-dark" type="submit">Guardar publicación</button>
          <button class="button button-outline" type="button" data-blog-editor-reset>Nueva publicación</button>
        </div>
        <p data-blog-editor-message></p>
      </form>
    `;
  }

  function openAdmin() {
    let overlay = document.querySelector("[data-blog-admin]");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "inventory-admin-overlay";
      overlay.hidden = true;
      overlay.dataset.blogAdmin = "";
      overlay.innerHTML = `
        <section class="inventory-admin-panel brand-blog-admin" role="dialog" aria-modal="true" aria-label="Publicaciones Balmain">
          <header class="inventory-admin-head">
            <div><p class="eyebrow">Portal independiente · Balmain</p><h2>Publicaciones del blog</h2><p>Crea borradores o publica contenido exclusivo de esta marca.</p></div>
            <button class="icon-button" type="button" data-blog-admin-close aria-label="Cerrar">x</button>
          </header>
          <div class="brand-blog-admin-layout">
            <aside data-blog-admin-list></aside>
            <div data-blog-admin-editor></div>
          </div>
        </section>
      `;
      document.body.appendChild(overlay);
      overlay.querySelector("[data-blog-admin-close]").addEventListener("click", () => { overlay.hidden = true; });
      overlay.addEventListener("click", (event) => { if (event.target === overlay) overlay.hidden = true; });
    }

    const list = overlay.querySelector("[data-blog-admin-list]");
    const editor = overlay.querySelector("[data-blog-admin-editor]");
    let editingId = "";

    function drawList() {
      const posts = readPosts();
      list.innerHTML = `
        <button class="button button-dark" type="button" data-blog-new>Nueva publicación</button>
        <div class="brand-blog-admin-posts">
          ${posts.map((post) => `
            <button type="button" data-blog-edit="${escapeHtml(post.id)}">
              <strong>${escapeHtml(post.title)}</strong>
              <span>${post.status === "published" ? "Publicada" : "Borrador"}</span>
            </button>
          `).join("")}
        </div>
      `;
      list.querySelector("[data-blog-new]").addEventListener("click", () => drawEditor());
      list.querySelectorAll("[data-blog-edit]").forEach((button) => {
        button.addEventListener("click", () => {
          const post = readPosts().find((item) => item.id === button.dataset.blogEdit);
          drawEditor(post);
        });
      });
    }

    function drawEditor(post) {
      editingId = post?.id || "";
      editor.innerHTML = editorMarkup(post);
      editor.querySelector("[data-blog-editor-reset]").addEventListener("click", () => drawEditor());
      editor.querySelector("[data-blog-editor]").addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const title = String(data.get("title") || "").trim();
        const excerpt = String(data.get("excerpt") || "").trim();
        const content = sanitizeHtml(String(data.get("content") || ""));
        const file = data.get("imageFile");
        let image = String(data.get("image") || "").trim();
        const message = form.querySelector("[data-blog-editor-message]");
        if (file instanceof File && file.size) {
          if (file.size > 1_500_000) {
            message.textContent = "La imagen supera 1,5 MB. Optimízala antes de subirla.";
            return;
          }
          image = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result || ""));
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        }
        const posts = readPosts();
        const now = new Date().toISOString();
        const current = posts.find((item) => item.id === editingId);
        const record = {
          id: current?.id || `balmain-${Date.now()}`,
          slug: current?.slug || `${slugify(title)}-${Date.now().toString().slice(-5)}`,
          title,
          excerpt,
          content,
          image,
          status: data.get("published") ? "published" : "draft",
          createdAt: current?.createdAt || now,
          updatedAt: now,
        };
        const next = current ? posts.map((item) => item.id === current.id ? record : item) : [record, ...posts];
        writePosts(next);
        editingId = record.id;
        message.textContent = record.status === "published" ? "Publicación guardada y visible." : "Borrador guardado.";
        drawList();
      });
    }

    drawList();
    drawEditor();
    overlay.hidden = false;
  }

  function init() {
    readPosts();
    ensureNavigation();
    renderBlog();
    window.addEventListener("balmain:blogchange", renderBlog);
  }

  window.BalmainBlog = {
    init,
    openAdmin,
    posts: readPosts,
  };
})();
