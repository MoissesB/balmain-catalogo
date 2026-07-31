(function () {
  const STORAGE_KEY = "innova-boutique-language";
  const supported = ["es", "en", "fr"];
  let locale = supported.includes(localStorage.getItem(STORAGE_KEY))
    ? localStorage.getItem(STORAGE_KEY)
    : "es";

  const en = {
    "Innova Boutique · Luxury Eyewear Portfolio": "Innova Boutique · Luxury Eyewear Portfolio",
    "INNOVA EYEWEAR · DISTRIBUCIÓN PROFESIONAL DE MARCAS DE LUJO": "INNOVA EYEWEAR · PROFESSIONAL DISTRIBUTION OF LUXURY BRANDS",
    "Boutique": "Boutique",
    "Marcas y colecciones": "Brands and collections",
    "Óptica": "Optical",
    "Sol": "Sun",
    "Gafas graduadas": "Eyeglasses",
    "Gafas de sol": "Sunglasses",
    "PEDIDO GLOBAL": "GLOBAL ORDER",
    "50 piezas mínimas por cada marca incluida.": "50-piece minimum for each included brand.",
    "Abrir selección →": "Open selection →",
    "Cómo comprar": "How to order",
    "Mi selección": "My selection",
    "Menú": "Menu",
    "Cerrar": "Close",
    "INNOVA BOUTIQUE · LUXURY EYEWEAR": "INNOVA BOUTIQUE · LUXURY EYEWEAR",
    "Tres firmas.": "Three brands.",
    "Una visión": "One extraordinary",
    "extraordinaria.": "vision.",
    "Una puerta de entrada profesional a colecciones de diseño, ingeniería y carácter para ópticas, cadenas y departamentos especializados.": "A professional gateway to collections defined by design, engineering and character for optical stores, retail chains and specialized departments.",
    "Explorar las marcas": "Explore the brands",
    "Preparar selección": "Prepare selection",
    "COLECCIONES INNOVA BOUTIQUE": "INNOVA BOUTIQUE COLLECTIONS",
    "Elige una firma.": "Choose a brand.",
    "Acerca la mirada.": "Take a closer look.",
    "Pasa el cursor para ver cada firma en primer plano y haz clic sobre la imagen para abrir su catálogo.": "Hover to bring each brand into focus, then click the image to open its catalog.",
    "Óptica · Sol": "Optical · Sun",
    "Cuatro colecciones": "Four collections",
    "Óptica · Sol · Atelier": "Optical · Sun · Atelier",
    "SELECCIÓN DE PRODUCTO": "PRODUCT SELECTION",
    "Tres formas de entender la mirada.": "Three approaches to eyewear.",
    "Acerca cada montura para revisar su silueta y entra con un clic en el catálogo completo de la firma.": "Zoom in on each frame to review its silhouette, then enter the brand’s complete catalog with one click.",
    "Acetatos expresivos, color y proporción para una selección óptica contemporánea.": "Expressive acetate, color and proportion for a contemporary optical assortment.",
    "Explorar Alfred Kerbs": "Explore Alfred Kerbs",
    "Óptica · Acetato": "Optical · Acetate",
    "Arquitectura de alta costura, metales de precisión y monturas con presencia inmediata.": "Couture architecture, precision metalwork and frames with immediate presence.",
    "Explorar Balmain": "Explore Balmain",
    "Ligereza, titanio de alta tecnología y precisión visual en todos los ángulos.": "Lightness, high-tech titanium and visual precision from every angle.",
    "Explorar Silhouette": "Explore Silhouette",
    "Titanio de alta tecnología": "High-tech titanium",
    "Titanio · SPX®+": "Titanium · SPX®+",
    "PORTFOLIO INNOVA BOUTIQUE": "INNOVA BOUTIQUE PORTFOLIO",
    "El lujo no responde a una sola definición.": "Luxury has more than one definition.",
    "Cada firma ocupa un territorio propio. Juntas construyen una propuesta completa para clientes que reconocen el diseño, el oficio y la innovación.": "Each brand occupies its own territory. Together they create a complete proposition for clients who recognize design, craftsmanship and innovation.",
    "BARCELONA · EXPRESIÓN CONTEMPORÁNEA": "BARCELONA · CONTEMPORARY EXPRESSION",
    "Acetatos con identidad, proporciones expresivas y una mirada mediterránea que convierte la montura en gesto personal.": "Distinctive acetate, expressive proportions and a Mediterranean outlook that turns every frame into a personal statement.",
    "Entrar al catálogo": "Enter catalog",
    "PARIS · COUTURE EYEWEAR": "PARIS · COUTURE EYEWEAR",
    "Arquitectura, presencia y códigos de alta costura para una selección óptica de impacto y reconocimiento inmediato.": "Architecture, presence and couture codes for a high-impact optical assortment with instant recognition.",
    "AUSTRIA · LIGHTNESS & INNOVATION": "AUSTRIA · LIGHTNESS & INNOVATION",
    "Ingeniería ultraligera, titanio de alta tecnología y precisión sin tornillos para una experiencia óptica excepcional.": "Ultralight engineering, high-tech titanium and screwless precision for an exceptional optical experience.",
    "La expresión más ligera del portfolio.": "The lightest expression in the portfolio.",
    "Una firma para ópticas que buscan precisión, confort y una estética depurada. Silhouette aporta ingeniería austríaca y monturas ultraligeras a una selección profesional contemporánea.": "A brand for optical businesses seeking precision, comfort and a refined aesthetic. Silhouette brings Austrian engineering and ultralight frames to a contemporary professional assortment.",
    "Explorar la colección Silhouette": "Explore the Silhouette collection",
    "Descubrir el modelo": "Discover the model",
    "UNA SOLA SELECCIÓN PROFESIONAL": "ONE PROFESSIONAL SELECTION",
    "Combina marcas.": "Combine brands.",
    "Conserva la precisión.": "Keep the precision.",
    "Explora cada catálogo de forma independiente y reúne las referencias elegidas en un único pedido profesional. Cada marca incluida debe alcanzar un mínimo de 50 piezas.": "Explore each catalog independently and gather your chosen references into one professional order. Every included brand must reach a minimum of 50 pieces.",
    "Explora": "Explore",
    "Accede al universo completo de cada firma.": "Access the complete universe of each brand.",
    "Selecciona": "Select",
    "Añade modelos, colores y cantidades desde cada catálogo.": "Add models, colors and quantities from each catalog.",
    "Completa el mínimo": "Meet the minimum",
    "Alcanza 50 piezas dentro de cada marca que quieras incluir.": "Reach 50 pieces for every brand you wish to include.",
    "Envía": "Send",
    "Descarga el PDF para revisión comercial de Innova.": "Download the PDF for Innova’s commercial review.",
    "Abrir mi selección": "Open my selection",
    "DISTRIBUCIÓN PROFESIONAL": "PROFESSIONAL DISTRIBUTION",
    "Una relación comercial. Tres universos de marca.": "One commercial relationship. Three brand universes.",
    "Innova Eyewear acompaña la selección, disponibilidad, condiciones comerciales y coordinación del pedido para ópticas, cadenas retail y departamentos ópticos.": "Innova Eyewear supports product selection, availability, commercial terms and order coordination for optical stores, retail chains and optical departments.",
    "Correo": "Email",
    "Marcas": "Brands",
    "Equipo comercial": "Commercial team",
    "COMPRA PROFESIONAL": "PROFESSIONAL PURCHASING",
    "Exclusivo para ópticas": "Exclusively for optical businesses",
    "Innova Boutique trabaja exclusivamente con ópticas y empresas del sector. Selecciona modelos y cantidades hasta completar un mínimo mayorista de 50 piezas en cada marca incluida.": "Innova Boutique works exclusively with optical stores and industry businesses. Select models and quantities until you reach a 50-piece wholesale minimum for each included brand.",
    "Después descarga el pedido en PDF. Innova valida la óptica, la disponibilidad, las condiciones comerciales y el transporte antes de confirmar.": "Then download the order as a PDF. Innova validates the optical business, availability, commercial terms and transport before confirmation.",
    "Explorar los catálogos": "Explore the catalogs",
    "Abrir mi pedido": "Open my order",
    "Ver el proceso de compra": "View the ordering process",
    "Selección multimarcas": "Multi-brand selection",
    "Datos de la óptica o empresa": "Optical store or company details",
    "Estos datos se incluirán en el PDF profesional enviado a Innova Eyewear.": "These details will be included in the professional PDF sent to Innova Eyewear.",
    "Nombre y apellido *": "Full name *",
    "Empresa / razón social *": "Company / legal name *",
    "Nombre de la óptica *": "Optical-store name *",
    "Correo profesional *": "Professional email *",
    "Teléfono (+ código del país) *": "Phone (+ country code) *",
    "Ciudad *": "City *",
    "País *": "Country *",
    "Observaciones": "Notes",
    "Total": "Total",
    "piezas ·": "pieces ·",
    "marcas listas": "brands ready",
    "marca lista": "brand ready",
    "50 piezas mínimas por marca.": "50-piece minimum per brand.",
    "Descargar pedido en PDF": "Download order PDF",
    "Este campo es obligatorio.": "This field is required.",
    "El correo profesional es obligatorio.": "Professional email is required.",
    "Usa un correo completo, por ejemplo nombre@empresa.com.": "Use a complete email, for example name@company.com.",
    "El teléfono es obligatorio.": "Phone number is required.",
    "Incluye +, el código del país y al menos 7 dígitos.": "Include +, the country code and at least 7 digits.",
    "Pedido completo y listo para preparar.": "Order complete and ready to prepare.",
    "Mínimo comercial completado en todas las marcas.": "Commercial minimum completed for every brand.",
    "Selección profesional": "Professional selection",
    "Cantidad": "Quantity",
    "Mínimo completado": "Minimum completed",
    "Preparando PDF…": "Preparing PDF…",
    "PDF descargado. Envíalo al equipo comercial de Innova Eyewear.": "PDF downloaded. Send it to the Innova Eyewear commercial team.",
    "No se pudo preparar el PDF. Inténtalo nuevamente.": "The PDF could not be prepared. Please try again.",
    "Ver catálogo completo": "View complete catalog",
    "Producto anterior": "Previous product",
    "Producto siguiente": "Next product",
    "Abrir menú": "Open menu",
    "Navegación principal": "Main navigation",
    "Abrir catálogo por marca": "Open catalog by brand",
    "Marcas y monturas disponibles": "Available brands and frames",
    "Ayuda comercial de Innova Eyewear": "Innova Eyewear commercial help",
    "Cerrar ayuda": "Close help",
    "Cerrar selección": "Close selection"
  };

  const fr = {
    ...en,
    "INNOVA EYEWEAR · DISTRIBUCIÓN PROFESIONAL DE MARCAS DE LUJO": "INNOVA EYEWEAR · DISTRIBUTION PROFESSIONNELLE DE MARQUES DE LUXE",
    "Marcas y colecciones": "Marques et collections",
    "Óptica": "Optique",
    "Sol": "Solaire",
    "Gafas graduadas": "Lunettes de vue",
    "Gafas de sol": "Lunettes de soleil",
    "PEDIDO GLOBAL": "COMMANDE GLOBALE",
    "50 piezas mínimas por cada marca incluida.": "Minimum de 50 pièces pour chaque marque incluse.",
    "Abrir selección →": "Ouvrir la sélection →",
    "Cómo comprar": "Comment commander",
    "Mi selección": "Ma sélection",
    "Menú": "Menu",
    "Cerrar": "Fermer",
    "Tres firmas.": "Trois marques.",
    "Una visión": "Une vision",
    "extraordinaria.": "extraordinaire.",
    "Una puerta de entrada profesional a colecciones de diseño, ingeniería y carácter para ópticas, cadenas y departamentos especializados.": "Une porte d’entrée professionnelle vers des collections de design, d’ingénierie et de caractère pour opticiens, chaînes et départements spécialisés.",
    "Explorar las marcas": "Explorer les marques",
    "Preparar selección": "Préparer la sélection",
    "COLECCIONES INNOVA BOUTIQUE": "COLLECTIONS INNOVA BOUTIQUE",
    "Elige una firma.": "Choisissez une marque.",
    "Acerca la mirada.": "Approchez le regard.",
    "Pasa el cursor para ver cada firma en primer plano y haz clic sobre la imagen para abrir su catálogo.": "Survolez chaque marque pour la mettre au premier plan, puis cliquez sur l’image pour ouvrir son catalogue.",
    "Óptica · Sol": "Optique · Solaire",
    "Cuatro colecciones": "Quatre collections",
    "Óptica · Sol · Atelier": "Optique · Solaire · Atelier",
    "SELECCIÓN DE PRODUCTO": "SÉLECTION DE PRODUITS",
    "Tres formas de entender la mirada.": "Trois façons d’envisager le regard.",
    "Acerca cada montura para revisar su silueta y entra con un clic en el catálogo completo de la firma.": "Zoomez sur chaque monture pour examiner sa silhouette, puis accédez au catalogue complet de la marque en un clic.",
    "Acetatos expresivos, color y proporción para una selección óptica contemporánea.": "Acétates expressifs, couleur et proportion pour un assortiment optique contemporain.",
    "Explorar Alfred Kerbs": "Explorer Alfred Kerbs",
    "Óptica · Acetato": "Optique · Acétate",
    "Arquitectura de alta costura, metales de precisión y monturas con presencia inmediata.": "Architecture couture, métaux de précision et montures à la présence immédiate.",
    "Explorar Balmain": "Explorer Balmain",
    "Ligereza, titanio de alta tecnología y precisión visual en todos los ángulos.": "Légèreté, titane high-tech et précision visuelle sous tous les angles.",
    "Explorar Silhouette": "Explorer Silhouette",
    "Titanio de alta tecnología": "Titane high-tech",
    "Titanio · SPX®+": "Titane · SPX®+",
    "PORTFOLIO INNOVA BOUTIQUE": "PORTFOLIO INNOVA BOUTIQUE",
    "El lujo no responde a una sola definición.": "Le luxe ne répond pas à une seule définition.",
    "Cada firma ocupa un territorio propio. Juntas construyen una propuesta completa para clientes que reconocen el diseño, el oficio y la innovación.": "Chaque marque occupe son propre territoire. Ensemble, elles composent une proposition complète pour les clients sensibles au design, au savoir-faire et à l’innovation.",
    "BARCELONA · EXPRESIÓN CONTEMPORÁNEA": "BARCELONE · EXPRESSION CONTEMPORAINE",
    "Acetatos con identidad, proporciones expresivas y una mirada mediterránea que convierte la montura en gesto personal.": "Des acétates identitaires, des proportions expressives et un regard méditerranéen qui font de la monture un geste personnel.",
    "Entrar al catálogo": "Accéder au catalogue",
    "PARIS · COUTURE EYEWEAR": "PARIS · LUNETTERIE COUTURE",
    "Arquitectura, presencia y códigos de alta costura para una selección óptica de impacto y reconocimiento inmediato.": "Architecture, présence et codes de la haute couture pour un assortiment optique à fort impact et immédiatement reconnaissable.",
    "AUSTRIA · LIGHTNESS & INNOVATION": "AUTRICHE · LÉGÈRETÉ ET INNOVATION",
    "Ingeniería ultraligera, titanio de alta tecnología y precisión sin tornillos para una experiencia óptica excepcional.": "Ingénierie ultralégère, titane high-tech et précision sans vis pour une expérience optique exceptionnelle.",
    "La expresión más ligera del portfolio.": "L’expression la plus légère du portfolio.",
    "Una firma para ópticas que buscan precisión, confort y una estética depurada. Silhouette aporta ingeniería austríaca y monturas ultraligeras a una selección profesional contemporánea.": "Une marque destinée aux opticiens qui recherchent précision, confort et esthétique épurée. Silhouette apporte l’ingénierie autrichienne et des montures ultralégères à un assortiment professionnel contemporain.",
    "Explorar la colección Silhouette": "Explorer la collection Silhouette",
    "Descubrir el modelo": "Découvrir le modèle",
    "UNA SOLA SELECCIÓN PROFESIONAL": "UNE SEULE SÉLECTION PROFESSIONNELLE",
    "Combina marcas.": "Combinez les marques.",
    "Conserva la precisión.": "Préservez la précision.",
    "Explora cada catálogo de forma independiente y reúne las referencias elegidas en un único pedido profesional. Cada marca incluida debe alcanzar un mínimo de 50 piezas.": "Explorez chaque catalogue séparément et réunissez les références choisies dans une seule commande professionnelle. Chaque marque incluse doit atteindre un minimum de 50 pièces.",
    "Explora": "Explorez",
    "Accede al universo completo de cada firma.": "Accédez à l’univers complet de chaque marque.",
    "Selecciona": "Sélectionnez",
    "Añade modelos, colores y cantidades desde cada catálogo.": "Ajoutez modèles, couleurs et quantités depuis chaque catalogue.",
    "Completa el mínimo": "Atteignez le minimum",
    "Alcanza 50 piezas dentro de cada marca que quieras incluir.": "Atteignez 50 pièces pour chaque marque que vous souhaitez inclure.",
    "Envía": "Envoyez",
    "Descarga el PDF para revisión comercial de Innova.": "Téléchargez le PDF pour la révision commerciale d’Innova.",
    "Abrir mi selección": "Ouvrir ma sélection",
    "DISTRIBUCIÓN PROFESIONAL": "DISTRIBUTION PROFESSIONNELLE",
    "Una relación comercial. Tres universos de marca.": "Une relation commerciale. Trois univers de marque.",
    "Innova Eyewear acompaña la selección, disponibilidad, condiciones comerciales y coordinación del pedido para ópticas, cadenas retail y departamentos ópticos.": "Innova Eyewear accompagne la sélection, la disponibilité, les conditions commerciales et la coordination de la commande pour les opticiens, chaînes et départements optiques.",
    "Correo": "E-mail",
    "Marcas": "Marques",
    "Equipo comercial": "Équipe commerciale",
    "COMPRA PROFESIONAL": "ACHAT PROFESSIONNEL",
    "Exclusivo para ópticas": "Réservé aux professionnels de l’optique",
    "Innova Boutique trabaja exclusivamente con ópticas y empresas del sector. Selecciona modelos y cantidades hasta completar un mínimo mayorista de 50 piezas en cada marca incluida.": "Innova Boutique travaille exclusivement avec les opticiens et les entreprises du secteur. Sélectionnez les modèles et les quantités jusqu’à atteindre un minimum grossiste de 50 pièces pour chaque marque incluse.",
    "Después descarga el pedido en PDF. Innova valida la óptica, la disponibilidad, las condiciones comerciales y el transporte antes de confirmar.": "Téléchargez ensuite la commande au format PDF. Innova valide l’entreprise, la disponibilité, les conditions commerciales et le transport avant confirmation.",
    "Explorar los catálogos": "Explorer les catalogues",
    "Abrir mi pedido": "Ouvrir ma commande",
    "Ver el proceso de compra": "Voir le processus de commande",
    "Selección multimarcas": "Sélection multimarque",
    "Datos de la óptica o empresa": "Coordonnées de l’opticien ou de l’entreprise",
    "Estos datos se incluirán en el PDF profesional enviado a Innova Eyewear.": "Ces informations seront incluses dans le PDF professionnel envoyé à Innova Eyewear.",
    "Nombre y apellido *": "Nom et prénom *",
    "Empresa / razón social *": "Entreprise / raison sociale *",
    "Nombre de la óptica *": "Nom du magasin d’optique *",
    "Correo profesional *": "E-mail professionnel *",
    "Teléfono (+ código del país) *": "Téléphone (+ indicatif pays) *",
    "Ciudad *": "Ville *",
    "País *": "Pays *",
    "Observaciones": "Remarques",
    "piezas ·": "pièces ·",
    "marcas listas": "marques prêtes",
    "marca lista": "marque prête",
    "50 piezas mínimas por marca.": "Minimum de 50 pièces par marque.",
    "Descargar pedido en PDF": "Télécharger la commande en PDF",
    "Este campo es obligatorio.": "Ce champ est obligatoire.",
    "El correo profesional es obligatorio.": "L’e-mail professionnel est obligatoire.",
    "Usa un correo completo, por ejemplo nombre@empresa.com.": "Saisissez une adresse complète, par exemple nom@entreprise.com.",
    "El teléfono es obligatorio.": "Le numéro de téléphone est obligatoire.",
    "Incluye +, el código del país y al menos 7 dígitos.": "Indiquez +, l’indicatif pays et au moins 7 chiffres.",
    "Pedido completo y listo para preparar.": "Commande complète et prête à être préparée.",
    "Mínimo comercial completado en todas las marcas.": "Minimum commercial atteint pour toutes les marques.",
    "Selección profesional": "Sélection professionnelle",
    "Cantidad": "Quantité",
    "Mínimo completado": "Minimum atteint",
    "Preparando PDF…": "Préparation du PDF…",
    "PDF descargado. Envíalo al equipo comercial de Innova Eyewear.": "PDF téléchargé. Envoyez-le à l’équipe commerciale d’Innova Eyewear.",
    "No se pudo preparar el PDF. Inténtalo nuevamente.": "Le PDF n’a pas pu être généré. Veuillez réessayer.",
    "Ver catálogo completo": "Voir le catalogue complet",
    "Producto anterior": "Produit précédent",
    "Producto siguiente": "Produit suivant",
    "Abrir menú": "Ouvrir le menu",
    "Navegación principal": "Navigation principale",
    "Abrir catálogo por marca": "Ouvrir le catalogue par marque",
    "Marcas y monturas disponibles": "Marques et montures disponibles",
    "Ayuda comercial de Innova Eyewear": "Aide commerciale Innova Eyewear",
    "Cerrar ayuda": "Fermer l’aide",
    "Cerrar selección": "Fermer la sélection"
  };

  const dictionaries = { en, fr };
  const textSources = new WeakMap();
  const attributeSources = new WeakMap();
  let lastLocale = "es";
  let observer;
  let frame = 0;

  function translateCore(source, target = locale) {
    if (target === "es" || !source) return source;
    const exact = dictionaries[target][source];
    if (exact) return exact;

    const replacements = target === "en"
      ? [
          [/^(\d+) piezas$/, "$1 pieces"],
          [/^Faltan (\d+) piezas$/, "$1 pieces remaining"],
          [/^Completa 50 piezas en (.+)\.$/, "Reach 50 pieces for $1."],
          [/^Revisa: (.+)\.$/, "Review: $1."],
          [/^No se puede descargar todavía\.\s*/, "The PDF cannot be downloaded yet. "],
          [/^Pendiente: /, "Pending: "],
          [/^Quitar (.+)$/, "Remove $1"]
        ]
      : [
          [/^(\d+) piezas$/, "$1 pièces"],
          [/^Faltan (\d+) piezas$/, "$1 pièces restantes"],
          [/^Completa 50 piezas en (.+)\.$/, "Atteignez 50 pièces pour $1."],
          [/^Revisa: (.+)\.$/, "Vérifiez : $1."],
          [/^No se puede descargar todavía\.\s*/, "Le PDF ne peut pas encore être téléchargé. "],
          [/^Pendiente: /, "En attente : "],
          [/^Quitar (.+)$/, "Retirer $1"]
        ];
    return replacements.reduce((value, entry) => value.replace(entry[0], entry[1]), source);
  }

  function preserveWhitespace(source, target = locale) {
    const leading = source.match(/^\s*/)?.[0] || "";
    const trailing = source.match(/\s*$/)?.[0] || "";
    const core = source.trim().replace(/\s+/g, " ");
    return `${leading}${translateCore(core, target)}${trailing}`;
  }

  function skipText(node) {
    const parent = node.parentElement;
    return !parent || Boolean(parent.closest("script, style, noscript, svg, [data-no-translate]"));
  }

  function translateTextNode(node) {
    if (skipText(node)) return;
    const current = node.nodeValue || "";
    let source = textSources.get(node);
    if (source === undefined) {
      source = current;
      textSources.set(node, source);
    } else {
      const previous = preserveWhitespace(source, lastLocale);
      const next = preserveWhitespace(source, locale);
      if (current !== previous && current !== next) {
        source = current;
        textSources.set(node, source);
      }
    }
    const translated = preserveWhitespace(source);
    if (translated !== current) node.nodeValue = translated;
  }

  function translateAttributes(element) {
    const names = ["placeholder", "aria-label", "title", "content"];
    let sources = attributeSources.get(element);
    if (!sources) {
      sources = new Map();
      attributeSources.set(element, sources);
    }
    names.forEach((name) => {
      const current = element.getAttribute(name);
      if (current === null) return;
      let source = sources.get(name);
      if (source === undefined) {
        source = current;
        sources.set(name, source);
      } else {
        const previous = translateCore(source, lastLocale);
        const next = translateCore(source, locale);
        if (current !== previous && current !== next) {
          source = current;
          sources.set(name, source);
        }
      }
      const translated = translateCore(source);
      if (translated !== current) element.setAttribute(name, translated);
    });
  }

  function translateDocument() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      translateTextNode(node);
      node = walker.nextNode();
    }
    document.querySelectorAll("[placeholder], [aria-label], [title], meta[name='description']").forEach(translateAttributes);
    document.documentElement.lang = locale;
    document.querySelectorAll("[data-language]").forEach((button) => {
      const active = button.dataset.language === locale;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    lastLocale = locale;
    window.dispatchEvent(new CustomEvent("innova:languagechange", { detail: { locale } }));
  }

  function scheduleTranslation() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      frame = 0;
      translateDocument();
    });
  }

  function setLocale(nextLocale) {
    if (!supported.includes(nextLocale)) return;
    locale = nextLocale;
    localStorage.setItem(STORAGE_KEY, locale);
    scheduleTranslation();
  }

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => setLocale(button.dataset.language));
  });

  window.INNOVA_I18N = {
    get locale() { return locale; },
    setLocale,
    t: (source, target) => translateCore(source, target || locale),
    translateDocument: scheduleTranslation
  };

  translateDocument();
  observer = new MutationObserver(scheduleTranslation);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["placeholder", "aria-label", "title"]
  });
})();
