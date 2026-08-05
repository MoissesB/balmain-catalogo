export type Locale = "es" | "en" | "fr";

export const localeLabels: Record<Locale, string> = {
  es: "ES",
  en: "EN",
  fr: "FR",
};

export const ui = {
  es: {
    search: "Buscar",
    close: "Cerrar",
    menu: "Menú",
    searchPlaceholder: "Buscar modelo, código, categoría, color o material",
    catalogSearch: "Buscador de catálogo",
    noResults: "No se encontraron modelos.",
    previewHint: "Selecciona un resultado para ver sus referencias.",
    distributedBy: "Distribuido por Innova",
    contactTeam: "Contactar al equipo comercial",
  },
  en: {
    search: "Search",
    close: "Close",
    menu: "Menu",
    searchPlaceholder: "Search by model, code, category, colour or material",
    catalogSearch: "Catalogue search",
    noResults: "No models were found.",
    previewHint: "Select a result to view its references.",
    distributedBy: "Distributed by Innova",
    contactTeam: "Contact the sales team",
  },
  fr: {
    search: "Rechercher",
    close: "Fermer",
    menu: "Menu",
    searchPlaceholder: "Rechercher par modèle, code, catégorie, couleur ou matériau",
    catalogSearch: "Recherche catalogue",
    noResults: "Aucun modèle trouvé.",
    previewHint: "Sélectionnez un résultat pour voir ses références.",
    distributedBy: "Distribué par Innova",
    contactTeam: "Contacter l’équipe commerciale",
  },
} as const;

type TranslationPair = { en: string; fr: string };

export const documentTranslations: Record<string, TranslationPair> = {
  "Inicio": { en: "Home", fr: "Accueil" },
  "La marca": { en: "The brand", fr: "La marque" },
  "Historia": { en: "History", fr: "Histoire" },
  "Filosofía": { en: "Philosophy", fr: "Philosophie" },
  "Colecciones": { en: "Collections", fr: "Collections" },
  "Catálogo de gafas": { en: "Eyewear catalogue", fr: "Catalogue de lunettes" },
  "Catálogo": { en: "Catalogue", fr: "Catalogue" },
  "Cuaderno": { en: "Journal", fr: "Journal" },
  "Blog": { en: "Journal", fr: "Journal" },
  "Guía para profesionales": { en: "Professional guide", fr: "Guide professionnel" },
  "Distribución B2B": { en: "B2B distribution", fr: "Distribution B2B" },
  "Contacto": { en: "Contact", fr: "Contact" },
  "Distribución profesional · Alfred Kerbs": { en: "Professional distribution · Alfred Kerbs", fr: "Distribution professionnelle · Alfred Kerbs" },
  "Volver a Innova Boutique": { en: "Back to Innova Boutique", fr: "Retour à Innova Boutique" },
  "Navegación global de Innova Boutique": { en: "Innova Boutique global navigation", fr: "Navigation générale d’Innova Boutique" },
  "Marcas": { en: "Brands", fr: "Marques" },
  "Pedido global": { en: "Multi-brand selection", fr: "Sélection multimarque" },
  "Gafas graduadas": { en: "Optical eyewear", fr: "Montures optiques" },
  "Gafas de sol": { en: "Sunglasses", fr: "Lunettes de soleil" },
  "Una selección para las tres firmas.": { en: "One selection for all three brands.", fr: "Une sélection commune aux trois marques." },
  "El mínimo comercial mayorista es de 50 piezas por cada marca incluida.": {
    en: "The professional minimum is 50 pieces for each included brand.",
    fr: "Le seuil professionnel est fixé à 50 pièces par marque incluse.",
  },
  "Abrir selección →": { en: "Open selection →", fr: "Ouvrir la sélection →" },
  "Una colección con identidad, lista para tu óptica.": {
    en: "A distinctive collection, selected for your optical business.",
    fr: "Une collection de caractère, pensée pour votre point de vente.",
  },
  "Explora modelos, combina colores y prepara un pedido profesional para tu óptica, cadena o departamento óptico. Innova Eyewear revisa disponibilidad y condiciones antes de confirmar la compra.": {
    en: "Explore models, combine colourways and prepare a professional selection for your optical practice, group or optical department. Innova Eyewear reviews availability and commercial terms before the selection becomes a confirmed order.",
    fr: "Explorez les modèles, associez les coloris et préparez une sélection professionnelle pour votre point de vente, votre enseigne ou votre département optique. Innova Eyewear étudie la disponibilité et les conditions commerciales avant de formaliser toute commande.",
  },
  "Cómo realizar el pedido": { en: "How the selection process works", fr: "Comprendre le parcours de sélection" },
  "El diseño se expresa también en el detalle.": {
    en: "Design is also expressed in the details.",
    fr: "Le design s’exprime aussi dans le détail.",
  },
  "Cada colección se entiende como una selección: forma, color y proporción deben mantener una dirección.": {
    en: "Each collection is conceived as a selection: shape, colour and proportion must follow a shared direction.",
    fr: "Chaque collection se conçoit comme un assortiment : formes, coloris et proportions suivent une direction commune.",
  },
  "Buscar": { en: "Search", fr: "Rechercher" },
  "Buscar nombre o código de modelo": { en: "Search by name or model code", fr: "Rechercher par nom ou code de modèle" },
  "Todos los colores": { en: "All colours", fr: "Tous les coloris" },
  "Colección actual": { en: "Current collection", fr: "Collection actuelle" },
  "Navegación principal": { en: "Main navigation", fr: "Navigation principale" },
  "Idioma": { en: "Language", fr: "Langue" },
  "modelos": { en: "models", fr: "modèles" },
  "modelo": { en: "model", fr: "modèle" },
  "referencias": { en: "references", fr: "références" },
  "imágenes verificadas": { en: "verified images", fr: "images vérifiées" },
  "Acetato": { en: "Acetate", fr: "Acétate" },
  "Titanium": { en: "Titanium", fr: "Titane" },
  "CATÁLOGO PROFESIONAL · 2026": { en: "PROFESSIONAL CATALOGUE · 2026", fr: "CATALOGUE PROFESSIONNEL · 2026" },
  "Menú": { en: "Menu", fr: "Menu" },
  "Filtros": { en: "Filters", fr: "Filtres" },
  "FILTROS": { en: "FILTERS", fr: "FILTRES" },
  "Material": { en: "Material", fr: "Matériau" },
  "Categoría": { en: "Category", fr: "Catégorie" },
  "Estilo": { en: "Style", fr: "Style" },
  "Talla": { en: "Size", fr: "Taille" },
  "Color": { en: "Colour", fr: "Coloris" },
  "Tipo": { en: "Type", fr: "Type" },
  "Novedades": { en: "New arrivals", fr: "Nouveautés" },
  "Óptica": { en: "Optical", fr: "Montures optiques" },
  "Solar": { en: "Sunglasses", fr: "Lunettes de soleil" },
  "Hombre": { en: "Men", fr: "Homme" },
  "Mujer": { en: "Women", fr: "Femme" },
  "Unisex": { en: "Unisex", fr: "Unisexe" },
  "Todos": { en: "All", fr: "Tous" },
  "Todas": { en: "All", fr: "Toutes" },
  "Ordenar": { en: "Sort", fr: "Trier" },
  "Selección editorial": { en: "Editorial selection", fr: "Sélection éditoriale" },
  "Nombre A–Z": { en: "Name A–Z", fr: "Nom A–Z" },
  "Nombre Z–A": { en: "Name Z–A", fr: "Nom Z–A" },
  "Más acabados": { en: "Most finishes", fr: "Plus de finitions" },
  "Limpiar filtros": { en: "Clear filters", fr: "Effacer les filtres" },
  "Mostrar ocultos": { en: "Show hidden", fr: "Afficher les masqués" },
  "Ocultar": { en: "Hide", fr: "Masquer" },
  "Restaurar": { en: "Restore", fr: "Restaurer" },
  "Cargar más": { en: "Load more", fr: "Charger plus" },
  "Sin coincidencias.": { en: "No matches.", fr: "Aucun résultat." },
  "Prueba con otro modelo, código o combinación de filtros.": {
    en: "Try another model, code or filter combination.",
    fr: "Essayez un autre modèle, code ou une autre combinaison de filtres.",
  },
  "Restablecer": { en: "Reset", fr: "Réinitialiser" },
  "Selección": { en: "Selection", fr: "Sélection" },
  "SELECCIÓN B2B": { en: "B2B SELECTION", fr: "SÉLECTION PROFESSIONNELLE" },
  "Exportar CSV": { en: "Export CSV", fr: "Exporter en CSV" },
  "Tu selección está vacía.": { en: "Your selection is empty.", fr: "Votre sélection est vide." },
  "Mi pedido": { en: "My selection", fr: "Ma sélection" },
  "Añadir a mi pedido": { en: "Add to my selection", fr: "Ajouter à ma sélection" },
  "Añadir más unidades": { en: "Add more units", fr: "Ajouter des pièces" },
  "Revisar pedido": { en: "Review selection", fr: "Revoir la sélection" },
  "Preparar pedido": { en: "Prepare selection", fr: "Préparer la sélection" },
  "Preparar mi pedido": { en: "Prepare my selection", fr: "Préparer ma sélection" },
  "Revisar mi pedido": { en: "Review my selection", fr: "Revoir ma sélection" },
  "Puede combinar modelos y colores. Pedido mayorista mínimo de 50 piezas.": {
    en: "You may combine models and colourways. Professional minimum: 50 pieces.",
    fr: "Vous pouvez associer modèles et coloris. Seuil professionnel : 50 pièces.",
  },
  "Añadir referencia": { en: "Add reference", fr: "Ajouter la référence" },
  "Añadido a selección": { en: "Added to selection", fr: "Ajouté à la sélection" },
  "Consultar disponibilidad": { en: "Check availability", fr: "Consulter la disponibilité" },
  "Contactar a Innova": { en: "Contact Innova", fr: "Contacter Innova" },
  "Ampliar imagen": { en: "Enlarge image", fr: "Agrandir l’image" },
  "Acabados": { en: "Finishes", fr: "Finitions" },
  "ACABADOS": { en: "FINISHES", fr: "FINITIONS" },
  "Catálogo profesional sin precios públicos": {
    en: "Professional catalogue with no public prices",
    fr: "Catalogue professionnel sans prix publics",
  },
  "Medidas verificadas": { en: "Verified measurements", fr: "Mesures vérifiées" },
  "Consultar disponibilidad con Innova": {
    en: "Check availability with Innova",
    fr: "Vérifier la disponibilité auprès d’Innova",
  },
  "Colores disponibles": { en: "Available colours", fr: "Coloris disponibles" },
  "Referencia": { en: "Reference", fr: "Référence" },
  "DESCRIPCIÓN · MODELO": { en: "DESCRIPTION · MODEL", fr: "DESCRIPTION · MODÈLE" },
  "RELACIONADOS": { en: "RELATED", fr: "MODÈLES ASSOCIÉS" },
  "Continúa la selección.": { en: "Continue your selection.", fr: "Poursuivez votre sélection." },
  "Explorar catálogo": { en: "Explore catalogue", fr: "Explorer le catalogue" },
  "ÓPTICA": { en: "OPTICAL", fr: "MONTURES OPTIQUES" },
  "SOL": { en: "SUN", fr: "LUNETTES DE SOLEIL" },
  "Monturas con identidad para ampliar la recomendación diaria y diferenciar el surtido.": {
    en: "Distinctive frames designed to broaden daily recommendations and differentiate the assortment.",
    fr: "Des montures distinctives pour enrichir le conseil au quotidien et différencier l’assortiment.",
  },
  "Diseño, color y presencia para reforzar la oferta solar de cada temporada.": {
    en: "Design, colour and presence to strengthen the seasonal sunwear offer.",
    fr: "Design, coloris et présence pour renforcer l’offre de lunettes de soleil de chaque saison.",
  },
  "PEDIDO PROFESIONAL · INNOVA EYEWEAR": {
    en: "PROFESSIONAL SELECTION · INNOVA EYEWEAR",
    fr: "SÉLECTION PROFESSIONNELLE · INNOVA EYEWEAR",
  },
  "Construye el surtido Alfred Kerbs de tu óptica, cadena o departamento óptico.": {
    en: "Build the Alfred Kerbs assortment for your optical practice, group or optical department.",
    fr: "Composez l’assortiment Alfred Kerbs de votre point de vente, réseau ou département optique.",
  },
  "Selecciona referencias y cantidades, completa los datos de tu empresa y genera un pedido profesional. Innova revisará inventario, condiciones comerciales, cobro y envío antes de la confirmación final.": {
    en: "Select references and quantities, enter your company details and generate a professional selection file. Innova will review availability, commercial terms, payment and shipping before any order is confirmed.",
    fr: "Sélectionnez les références et les quantités, renseignez votre entreprise et générez un dossier de sélection professionnelle. Innova étudiera le stock, les conditions commerciales, le règlement et l’expédition avant de formaliser toute commande.",
  },
  "Una colección preparada para incorporarse a tu oferta profesional.": {
    en: "A collection ready to join your professional offer.",
    fr: "Une collection prête à intégrer votre offre professionnelle.",
  },
  "Combina modelos y colores, alcanza el mínimo mayorista de 50 piezas y envía la selección completa a Innova.": {
    en: "Combine models and colourways, reach the 50-piece professional minimum and send the complete selection to Innova.",
    fr: "Associez modèles et coloris, atteignez le seuil professionnel de 50 pièces et transmettez la sélection complète à Innova.",
  },
  "Explora la colección, compara acabados y prepara un pedido completo para la revisión comercial de Innova Eyewear.": {
    en: "Explore the collection, compare finishes and prepare a complete selection for Innova Eyewear’s commercial review.",
    fr: "Explorez la collection, comparez les finitions et préparez une sélection complète pour l’étude commerciale d’Innova Eyewear.",
  },
  "Descubrir la marca": { en: "Discover the brand", fr: "Découvrir la marque" },
  "Ver catálogo": { en: "View catalogue", fr: "Voir le catalogue" },
  "Programa profesional": { en: "Professional programme", fr: "Programme professionnel" },
  "Empezar conversación": { en: "Start a conversation", fr: "Échanger avec l’équipe" },
  "Explorar": { en: "Explore", fr: "Explorer" },
  "Profesional": { en: "Professional", fr: "Professionnel" },
  "Administración": { en: "Administration", fr: "Administration" },
  "Privacidad": { en: "Privacy", fr: "Confidentialité" },
  "Catálogo profesional": { en: "Professional catalogue", fr: "Catalogue professionnel" },
  "Catálogo profesional Alfred Kerbs": { en: "Alfred Kerbs professional catalogue", fr: "Catalogue professionnel Alfred Kerbs" },
  "Distribuidor: Innova": { en: "Distributor: Innova", fr: "Distributeur : Innova" },
  "Contacto comercial Innova": { en: "Innova sales contact", fr: "Contact commercial Innova" },
  "Distribuidor oficial para este catálogo profesional.": {
    en: "Official distributor for this professional catalogue.",
    fr: "Catalogue professionnel distribué par Innova Eyewear.",
  },
  "Este catálogo es una herramienta informativa para ópticas y distribuidores. No es una tienda online y no muestra precios públicos.": {
    en: "This catalogue supports professional selection for opticians and distribution partners. It is not a consumer sales channel and displays no public prices.",
    fr: "Ce catalogue accompagne la sélection professionnelle des opticiens et partenaires de distribution. Aucun prix public n’y est affiché.",
  },
  "Todos los datos comerciales y la disponibilidad deben confirmarse con Innova.": {
    en: "All commercial information and availability must be confirmed with Innova.",
    fr: "Toutes les informations commerciales et la disponibilité doivent être confirmées auprès d’Innova.",
  },
  "Diseñadas para expresar lo que no necesita explicación.": {
    en: "Designed to express what needs no explanation.",
    fr: "Conçues pour exprimer ce qui n’a pas besoin d’être expliqué.",
  },
  "Monturas contemporáneas con carácter, presentadas en una herramienta profesional para ópticas independientes y distribuidores.": {
    en: "Contemporary frames with character, presented in a professional tool for independent opticians and distributors.",
    fr: "Des montures contemporaines de caractère, présentées dans un catalogue destiné aux opticiens indépendants et partenaires de distribution.",
  },
  "Descubre la colección completa.": {
    en: "Discover the complete collection.",
    fr: "Découvrez la collection complète.",
  },
  "Una colección singular merece una selección informada.": {
    en: "A distinctive collection deserves an informed selection.",
    fr: "Une collection singulière mérite une sélection éclairée.",
  },
  "Alfred Kerbs entiende las gafas como una forma de identidad: objetos cotidianos que revelan carácter mediante proporción, material y color.": {
    en: "Alfred Kerbs sees eyewear as a form of identity: everyday objects that reveal character through proportion, material and colour.",
    fr: "Alfred Kerbs conçoit les lunettes comme une forme d’identité : des objets quotidiens qui révèlent le caractère par la proportion, la matière et la couleur.",
  },
  "Desde Barcelona, el estudio trabaja entre la memoria de los códigos clásicos y una sensibilidad contemporánea. Una mirada editorial, precisa y abierta a quienes se atreven a ser.": {
    en: "From Barcelona, the studio works between the memory of classic codes and a contemporary sensibility. An editorial, precise perspective, open to those who dare to be themselves.",
    fr: "Depuis Barcelone, le studio travaille entre la mémoire des codes classiques et une sensibilité contemporaine. Un regard éditorial, précis et ouvert à celles et ceux qui osent être eux-mêmes.",
  },
  "Leer nuestra historia": { en: "Read our story", fr: "Lire notre histoire" },
  "Modelos con presencia.": { en: "Models with presence.", fr: "Des modèles qui s’affirment." },
  "Una lectura inicial del catálogo: óptica y sol, materiales verificados y acabados listos para comparar.": {
    en: "An initial view of the catalogue: optical and sun, verified materials and finishes ready to compare.",
    fr: "Un premier regard sur le catalogue : montures optiques, lunettes de soleil, matériaux vérifiés et finitions prêtes à comparer.",
  },
  "Formas con intención para la mirada cotidiana.": {
    en: "Intentional shapes for everyday vision.",
    fr: "Des formes affirmées pour le regard quotidien.",
  },
  "Volumen, color y una presencia inequívoca.": {
    en: "Volume, colour and an unmistakable presence.",
    fr: "Volume, couleur et présence sans équivoque.",
  },
  "Revelar, no imponer.": { en: "Reveal, never impose.", fr: "Révéler, sans imposer." },
  "El brandbook de Alfred Kerbs sitúa la identidad en el centro del proceso. La montura acompaña a la persona: no la disfraza, amplifica su manera de estar.": {
    en: "The Alfred Kerbs brand book places identity at the centre of the process. The frame accompanies the wearer: it does not disguise them, it amplifies their way of being.",
    fr: "La charte de marque Alfred Kerbs place l’identité au centre du processus. La monture accompagne la personne : elle ne la déguise pas, elle révèle sa manière d’être.",
  },
  "El trabajo con acetatos, proporciones y acabados conecta el cuidado de un atelier con una actitud contemporánea y lista para vivir.": {
    en: "The work with acetates, proportions and finishes connects the care of an atelier with a contemporary attitude made for life.",
    fr: "Le travail des acétates, des proportions et des finitions relie le soin d’un atelier à une attitude contemporaine pensée pour être vécue.",
  },
  "Conocer la filosofía": { en: "Discover the philosophy", fr: "Découvrir la philosophie" },
  "Compara referencias, prepara tu selección y habla con el equipo profesional sobre disponibilidad, condiciones y soporte para tu óptica.": {
    en: "Compare references, prepare your selection and speak with the professional team about availability, terms and support for your optical store.",
    fr: "Comparez les références, préparez votre sélection et échangez avec l’équipe professionnelle sur la disponibilité, les conditions et l’accompagnement de votre point de vente.",
  },
  "Ideas para mirar mejor.": { en: "Ideas for seeing better.", fr: "Des idées pour mieux regarder." },
  "Producto, curaduría y conversación para equipos que entienden la óptica como cultura visual.": {
    en: "Product, curation and conversation for teams that understand eyewear as visual culture.",
    fr: "Produit, sélection et dialogue pour les équipes qui envisagent l’optique comme une culture visuelle.",
  },
  "Solicita acceso profesional y recibe información adaptada a tu mercado.": {
    en: "Request professional access and receive information tailored to your market.",
    fr: "Demandez un accès professionnel et recevez des informations adaptées à votre marché.",
  },
  "Una montura puede revelar una forma de estar.": {
    en: "A frame can reveal a way of being.",
    fr: "Une monture peut révéler une façon d’être.",
  },
  "Alfred Kerbs crea gafas con una sensibilidad contemporánea: piezas expresivas, construidas para convivir con la identidad de quien las lleva.": {
    en: "Alfred Kerbs creates eyewear with a contemporary sensibility: expressive pieces designed to live with the identity of the person wearing them.",
    fr: "Alfred Kerbs crée des lunettes à la sensibilité contemporaine : des pièces expressives conçues pour accompagner l’identité de celles et ceux qui les portent.",
  },
  "Diseño que acompaña, no impone.": {
    en: "Design that accompanies, never imposes.",
    fr: "Un design qui accompagne, sans imposer.",
  },
  "Clásico y vanguardia, en conversación.": {
    en: "Classic and avant-garde in conversation.",
    fr: "Classique et avant-garde en dialogue.",
  },
  "Construye una selección con identidad.": {
    en: "Build a selection with identity.",
    fr: "Composez une sélection avec une identité.",
  },
  "Dos miradas. Un lenguaje común.": {
    en: "Two perspectives. One shared language.",
    fr: "Deux regards. Un langage commun.",
  },
  "Óptica y solar se presentan como capítulos de una misma dirección creativa, con cada variante vinculada a su referencia e imagen.": {
    en: "Optical and sun are presented as chapters of the same creative direction, with every variant linked to its reference and image.",
    fr: "Les montures optiques et les lunettes de soleil forment deux chapitres d’une même direction créative, chaque variante étant reliée à sa référence et à son image.",
  },
  "Explorar colección": { en: "Explore collection", fr: "Explorer la collection" },
  "El gesto cotidiano.": { en: "The everyday gesture.", fr: "Le geste quotidien." },
  "Presencia bajo la luz.": { en: "Presence under the light.", fr: "Une présence sous la lumière." },
  "Barcelona como punto de partida.": {
    en: "Barcelona as a starting point.",
    fr: "Barcelone comme point de départ.",
  },
  "La historia verificable de Alfred Kerbs está ligada a Barcelona y a una forma de entender las gafas como objetos de diseño, expresión y cultura visual.": {
    en: "The documented history of Alfred Kerbs is tied to Barcelona and to an understanding of eyewear as an object of design, expression and visual culture.",
    fr: "L’histoire documentée d’Alfred Kerbs est liée à Barcelone et à une vision des lunettes comme objets de design, d’expression et de culture visuelle.",
  },
  "Un proyecto de eyewear nacido en Barcelona.": {
    en: "An eyewear project born in Barcelona.",
    fr: "Un projet de lunettes né à Barcelone.",
  },
  "Una identidad que se renueva sin borrar su memoria.": {
    en: "An identity renewed without erasing its memory.",
    fr: "Une identité qui se renouvelle sans effacer sa mémoire.",
  },
  "La historia continúa en cada colección.": {
    en: "The story continues in every collection.",
    fr: "L’histoire se poursuit dans chaque collection.",
  },
  "Explora el catálogo actual y sus referencias verificadas.": {
    en: "Explore the current catalogue and its verified references.",
    fr: "Explorez le catalogue actuel et ses références vérifiées.",
  },
  "Ver colecciones": { en: "View collections", fr: "Voir les collections" },
  "Crear para celebrar la identidad.": {
    en: "Create to celebrate identity.",
    fr: "Créer pour célébrer l’identité.",
  },
  "Una visión editorial de las gafas: precisa en sus datos, libre en su expresión y consciente de la relación entre objeto, rostro y cultura.": {
    en: "An editorial vision of eyewear: precise in its data, free in its expression and aware of the relationship between object, face and culture.",
    fr: "Une vision éditoriale des lunettes : précise dans ses données, libre dans son expression et consciente du lien entre objet, visage et culture.",
  },
  "La forma tiene intención. El detalle le da sentido.": {
    en: "Shape has intention. Detail gives it meaning.",
    fr: "La forme a une intention. Le détail lui donne du sens.",
  },
  "Una herramienta hecha para decidir mejor.": {
    en: "A tool designed for better decisions.",
    fr: "Un outil conçu pour mieux décider.",
  },
  "Compara acabados, medidas, materiales e imágenes antes de preparar tu selección profesional.": {
    en: "Compare finishes, measurements, materials and images before preparing your professional selection.",
    fr: "Comparez les finitions, mesures, matériaux et images avant de préparer votre sélection professionnelle.",
  },
  "Abrir catálogo": { en: "Open catalogue", fr: "Ouvrir le catalogue" },
  "Una colaboración construida alrededor de la óptica independiente.": {
    en: "A partnership built around independent opticians.",
    fr: "Une collaboration construite autour de l’optique indépendante.",
  },
  "Producto con contexto, datos con trazabilidad.": {
    en: "Product with context, data with traceability.",
    fr: "Des produits contextualisés, des données traçables.",
  },
  "Presenta tu óptica al equipo.": {
    en: "Introduce your optical store to the team.",
    fr: "Présentez votre point de vente à l’équipe.",
  },
  "Tu contacto profesional para Alfred Kerbs.": {
    en: "Your professional Alfred Kerbs contact.",
    fr: "Votre contact professionnel Alfred Kerbs.",
  },
  "Innova distribuye este catálogo para ópticas y distribuidores. Consulta modelos, referencias, disponibilidad y condiciones directamente con su equipo comercial.": {
    en: "Innova distributes this catalogue for opticians and distributors. Check models, references, availability and terms directly with its sales team.",
    fr: "Innova distribue ce catalogue auprès des professionnels de l’optique et partenaires de distribution. Consultez les modèles, références, disponibilités et conditions directement avec son équipe commerciale.",
  },
  "La disponibilidad y las condiciones comerciales se confirman directamente con Innova.": {
    en: "Availability and commercial terms are confirmed directly with Innova.",
    fr: "La disponibilité et les conditions commerciales sont confirmées directement auprès d’Innova.",
  },
  "Busca por modelo o código, filtra la colección y prepara una selección descargable para tu óptica. Los datos proceden de las fichas oficiales auditadas.": {
    en: "Search by model or code, filter the collection and prepare a downloadable selection for your optical store. The data comes from audited official product sheets.",
    fr: "Recherchez par modèle ou code, filtrez la collection et préparez une sélection téléchargeable pour votre point de vente. Les données proviennent de fiches officielles vérifiées.",
  },
  "Ideas para mirar, seleccionar y presentar.": {
    en: "Ideas for viewing, selecting and presenting.",
    fr: "Des idées pour regarder, sélectionner et présenter.",
  },
  "Un espacio editorial para profesionales: criterios de curaduría, lectura de producto y cultura visual aplicados a la óptica independiente.": {
    en: "An editorial space for professionals: curation criteria, product insight and visual culture applied to independent eyewear.",
    fr: "Un espace éditorial pour les professionnels : critères de sélection, lecture produit et culture visuelle appliqués à l’optique indépendante.",
  },
  "Hablemos de tu selección.": {
    en: "Let’s talk about your selection.",
    fr: "Parlons de votre sélection.",
  },
  "Información clara para una conversación concreta.": {
    en: "Clear information for a focused conversation.",
    fr: "Des informations claires pour un échange concret.",
  },
  "Para tu negocio": { en: "For your business", fr: "Pour votre entreprise" },
  "INNOVA EYEWEAR · DISTRIBUCIÓN PROFESIONAL DE ALFRED KERBS": {
    en: "INNOVA EYEWEAR · PROFESSIONAL DISTRIBUTION OF ALFRED KERBS",
    fr: "INNOVA EYEWEAR · DISTRIBUTION PROFESSIONNELLE D’ALFRED KERBS",
  },
  "Distribución profesional por Innova Eyewear para ópticas, cadenas retail y departamentos ópticos.": {
    en: "Professional distribution by Innova Eyewear for optical stores, retail chains and optical departments.",
    fr: "Distribution professionnelle par Innova Eyewear pour les professionnels de l’optique, les enseignes et les départements optiques.",
  },
  "Innova Eyewear": { en: "Innova Eyewear", fr: "Innova Eyewear" },
  "Servicios comerciales": { en: "Commercial services", fr: "Services commerciaux" },
  "Selección de producto": { en: "Product selection", fr: "Sélection de produits" },
  "Contacto comercial": { en: "Sales contact", fr: "Contact commercial" },
  "Ideas para tu negocio": { en: "Ideas for your business", fr: "Idées pour votre entreprise" },
  "Alfred Kerbs · Distribución Innova Eyewear": {
    en: "Alfred Kerbs · Distributed by Innova Eyewear",
    fr: "Alfred Kerbs · Distribué par Innova Eyewear",
  },
  "La marca · Alfred Kerbs": { en: "The brand · Alfred Kerbs", fr: "La marque · Alfred Kerbs" },
  "Historia · Alfred Kerbs": { en: "History · Alfred Kerbs", fr: "Histoire · Alfred Kerbs" },
  "Filosofía de diseño · Alfred Kerbs": {
    en: "Design philosophy · Alfred Kerbs",
    fr: "Philosophie du design · Alfred Kerbs",
  },
  "Colecciones · Alfred Kerbs": { en: "Collections · Alfred Kerbs", fr: "Collections · Alfred Kerbs" },
  "Colección Alfred Kerbs · Alfred Kerbs": {
    en: "Alfred Kerbs collection · Alfred Kerbs",
    fr: "Collection Alfred Kerbs · Alfred Kerbs",
  },
  "Ideas para tu negocio · Alfred Kerbs": {
    en: "Ideas for your business · Alfred Kerbs",
    fr: "Perspectives professionnelles · Alfred Kerbs",
  },
  "INNOVA EYEWEAR · EQUIPO COMERCIAL": {
    en: "INNOVA EYEWEAR · SALES TEAM",
    fr: "INNOVA EYEWEAR · ÉQUIPE COMMERCIALE",
  },
  "Alfred Kerbs · Distribución profesional": {
    en: "Alfred Kerbs · Professional distribution",
    fr: "Alfred Kerbs · Distribution professionnelle",
  },
  "ALFRED KERBS · DISTRIBUCIÓN INNOVA EYEWEAR": {
    en: "ALFRED KERBS · DISTRIBUTED BY INNOVA EYEWEAR",
    fr: "ALFRED KERBS · DISTRIBUÉ PAR INNOVA EYEWEAR",
  },
  "Una colección con identidad para negocios que quieren diferenciarse.": {
    en: "A collection with identity for businesses that want to stand out.",
    fr: "Une collection de caractère pour les entreprises qui veulent se différencier.",
  },
  "Descubre una propuesta de eyewear contemporáneo para ópticas, cadenas retail y departamentos ópticos. Innova Eyewear te acompaña desde la selección de producto hasta su incorporación en tu punto de venta.": {
    en: "Discover a contemporary eyewear proposition for optical stores, retail chains and optical departments. Innova Eyewear supports you from product selection through to its introduction at the point of sale.",
    fr: "Découvrez une proposition de lunettes contemporaines destinée aux professionnels de l’optique, aux enseignes et aux départements optiques. Innova Eyewear vous accompagne de la sélection des produits jusqu’à leur mise en place en point de vente.",
  },
  "Ver la colección": { en: "View the collection", fr: "Voir la collection" },
  "Ver los": { en: "View all", fr: "Voir les" },
  "AÑADIR MÁS UNIDADES": { en: "ADD MORE UNITS", fr: "AJOUTER DES PIÈCES" },
  "Medidas ·": { en: "Measurements ·", fr: "Mesures ·" },
  "Medidas · referencia": { en: "Measurements · reference", fr: "Mesures · référence" },
  "modelo encontrado": { en: "model found", fr: "modèle trouvé" },
  "modelos encontrados": { en: "models found", fr: "modèles trouvés" },
  "Conocer Alfred Kerbs": { en: "Discover Alfred Kerbs", fr: "Découvrir Alfred Kerbs" },
  "vistas de producto": { en: "product views", fr: "vues des produits" },
  "SELECCIÓN PARA PUNTO DE VENTA": {
    en: "POINT-OF-SALE SELECTION",
    fr: "SÉLECTION POUR LE POINT DE VENTE",
  },
  "Modelos que aportan valor al surtido.": {
    en: "Models that add value to your assortment.",
    fr: "Des modèles qui valorisent votre assortiment.",
  },
  "Óptica y sol en una selección versátil, pensada para crear una propuesta diferenciada y fácil de presentar a cada cliente.": {
    en: "Optical and sun styles in a versatile selection designed to create a distinctive proposition that is easy to present to every customer.",
    fr: "Montures optiques et lunettes de soleil composent un assortiment polyvalent, pensé pour différencier votre offre et faciliter le conseil auprès de chaque client.",
  },
  "Diseño contemporáneo para enriquecer la recomendación diaria.": {
    en: "Contemporary design to enrich everyday recommendations.",
    fr: "Un design contemporain pour enrichir le conseil au quotidien.",
  },
  "Color y personalidad para activar la temporada.": {
    en: "Colour and personality to energise the season.",
    fr: "Couleur et personnalité pour dynamiser la saison.",
  },
  "INNOVA EYEWEAR · SOCIO COMERCIAL": {
    en: "INNOVA EYEWEAR · COMMERCIAL PARTNER",
    fr: "INNOVA EYEWEAR · PARTENAIRE COMMERCIAL",
  },
  "Lleva Alfred Kerbs a tu negocio con una selección pensada para vender.": {
    en: "Bring Alfred Kerbs to your business with a selection designed to sell.",
    fr: "Intégrez Alfred Kerbs à votre offre avec une sélection pensée pour le point de vente.",
  },
  "Nuestro equipo acompaña a ópticas independientes, grupos regionales y grandes cuentas en la construcción del surtido, la presentación de la colección y la planificación comercial.": {
    en: "Our team supports independent optical stores, regional groups and key accounts in assortment building, collection presentation and commercial planning.",
    fr: "Notre équipe accompagne les opticiens indépendants, groupes régionaux et grands comptes dans la construction de l’assortiment, la présentation de la collection et la planification commerciale.",
  },
  "Hablar con un asesor": { en: "Speak with an advisor", fr: "Parler à un conseiller" },
  "Servicios para tu negocio": { en: "Services for your business", fr: "Services pour votre entreprise" },
  "INNOVA EYEWEAR · INSIGHTS": { en: "INNOVA EYEWEAR · INSIGHTS", fr: "INNOVA EYEWEAR · INSIGHTS" },
  "Ideas para seleccionar, presentar y vender mejor.": {
    en: "Ideas to select, present and sell better.",
    fr: "Des idées pour mieux sélectionner, présenter et valoriser.",
  },
  "Curaduría de producto, color y cultura visual para equipos que quieren convertir una colección singular en una experiencia de compra relevante.": {
    en: "Product curation, colour and visual culture for teams that want to turn a distinctive collection into a relevant buying experience.",
    fr: "Sélection de produits, coloris et culture visuelle pour les équipes qui souhaitent transformer une collection singulière en une expérience de marque cohérente en point de vente.",
  },
  "ALFRED KERBS · INNOVA EYEWEAR": { en: "ALFRED KERBS · INNOVA EYEWEAR", fr: "ALFRED KERBS · INNOVA EYEWEAR" },
  "Una nueva firma para diferenciar tu oferta.": {
    en: "A new brand to differentiate your offer.",
    fr: "Une nouvelle marque pour différencier votre offre.",
  },
  "Cuéntanos sobre tu negocio y diseñaremos contigo una propuesta de colección adaptada a tu mercado.": {
    en: "Tell us about your business and we will design a collection proposition tailored to your market.",
    fr: "Parlez-nous de votre entreprise et nous construirons avec vous une proposition de collection adaptée à votre marché.",
  },
  "Solicitar asesoramiento": { en: "Request advice", fr: "Demander conseil" },
  "INNOVA EYEWEAR · DISTRIBUCIÓN PROFESIONAL": {
    en: "INNOVA EYEWEAR · PROFESSIONAL DISTRIBUTION",
    fr: "INNOVA EYEWEAR · DISTRIBUTION PROFESSIONNELLE",
  },
  "Un socio comercial para desarrollar Alfred Kerbs en tu mercado.": {
    en: "A commercial partner to develop Alfred Kerbs in your market.",
    fr: "Un partenaire commercial pour développer Alfred Kerbs sur votre marché.",
  },
  "Desde una óptica independiente hasta una cadena o un departamento óptico, Innova Eyewear crea una propuesta comercial adaptada a la escala, el público y los objetivos de cada negocio.": {
    en: "From an independent optical store to a chain or optical department, Innova Eyewear creates a commercial proposition tailored to the scale, audience and objectives of every business.",
    fr: "Du point de vente indépendant à l’enseigne ou au département optique, Innova Eyewear construit une proposition commerciale adaptée à l’échelle, au public et aux objectifs de chaque entreprise.",
  },
  "Una relación comercial pensada para crecer.": {
    en: "A commercial relationship designed to grow.",
    fr: "Une relation commerciale pensée pour grandir.",
  },
  "Accede a la colección completa, compara referencias y prepara una primera selección. El equipo de Innova aporta visión de surtido, atención comercial y soporte para presentar Alfred Kerbs con coherencia en cada punto de venta.": {
    en: "Access the complete collection, compare references and prepare an initial selection. The Innova team brings assortment expertise, sales support and guidance to present Alfred Kerbs consistently at every point of sale.",
    fr: "Accédez à la collection complète, comparez les références et préparez une première sélection. L’équipe Innova apporte son expertise assortiment, son accompagnement commercial et son soutien pour présenter Alfred Kerbs avec cohérence dans chaque point de vente.",
  },
  "HABLEMOS DE TU NEGOCIO": { en: "LET’S TALK ABOUT YOUR BUSINESS", fr: "PARLONS DE VOTRE ENTREPRISE" },
  "Diseñemos juntos tu próxima selección.": {
    en: "Let’s design your next selection together.",
    fr: "Construisons ensemble votre prochaine sélection.",
  },
  "Conecta con un asesor de Innova Eyewear para conocer la colección, disponibilidad y oportunidades comerciales.": {
    en: "Connect with an Innova Eyewear advisor to discuss the collection, availability and commercial opportunities.",
    fr: "Échangez avec un conseiller Innova Eyewear sur la collection, les disponibilités et les opportunités commerciales.",
  },
  "Hablar con Innova": { en: "Speak with Innova", fr: "Parler à Innova" },
  "Cuéntanos tu proyecto": { en: "Tell us about your project", fr: "Parlez-nous de votre projet" },
  "Comparte tu mercado, formato de negocio, número de puntos de venta y objetivos de surtido.": {
    en: "Share your market, business format, number of points of sale and assortment goals.",
    fr: "Présentez votre marché, votre format commercial, votre nombre de points de vente et vos objectifs d’assortiment.",
  },
  "Construimos la selección": { en: "We build the selection", fr: "Nous construisons la sélection" },
  "Definimos contigo un mix de modelos, colores y referencias alineado con tu cliente.": {
    en: "Together we define a mix of models, colours and references aligned with your customer.",
    fr: "Nous définissons avec vous un assortiment de modèles, de coloris et de références adapté à votre clientèle.",
  },
  "Activamos la colección": { en: "We activate the collection", fr: "Nous préparons le lancement de la collection" },
  "Coordinamos disponibilidad, condiciones comerciales y próximos pasos para tu lanzamiento.": {
    en: "We coordinate availability, commercial terms and next steps for your launch.",
    fr: "Nous coordonnons les disponibilités, les conditions commerciales et les prochaines étapes de votre lancement.",
  },
  "Hablemos de la próxima colección de tu negocio.": {
    en: "Let’s talk about your business’s next collection.",
    fr: "Parlons de la prochaine collection de votre entreprise.",
  },
  "El equipo de Innova Eyewear atiende a ópticas, cadenas, grupos de compra y departamentos ópticos interesados en incorporar Alfred Kerbs a su propuesta comercial.": {
    en: "The Innova Eyewear team works with optical stores, chains, buying groups and optical departments interested in adding Alfred Kerbs to their commercial offer.",
    fr: "L’équipe Innova Eyewear accompagne les professionnels de l’optique, enseignes, groupements d’achat et départements optiques souhaitant intégrer Alfred Kerbs à leur offre commerciale.",
  },
  "DISTRIBUCIÓN Y ATENCIÓN COMERCIAL": {
    en: "DISTRIBUTION AND SALES SUPPORT",
    fr: "DISTRIBUTION ET ACCOMPAGNEMENT COMMERCIAL",
  },
  "Cuéntanos qué tipo de negocio gestionas y nuestro equipo te ayudará a construir la selección adecuada.": {
    en: "Tell us what kind of business you manage and our team will help you build the right selection.",
    fr: "Présentez-nous votre activité et notre équipe vous aidera à construire la sélection adaptée.",
  },
  "ALFRED KERBS · COLECCIÓN PROFESIONAL": {
    en: "ALFRED KERBS · PROFESSIONAL COLLECTION",
    fr: "ALFRED KERBS · COLLECTION PROFESSIONNELLE",
  },
  "Una colección diseñada para ampliar el valor de tu surtido.": {
    en: "A collection designed to increase the value of your assortment.",
    fr: "Une collection pensée pour renforcer la valeur de votre assortiment.",
  },
  "Explora la colección, compara acabados y crea una selección para compartir directamente con tu asesor de Innova Eyewear.": {
    en: "Explore the collection, compare finishes and create a selection to share directly with your Innova Eyewear advisor.",
    fr: "Explorez la collection, comparez les finitions et créez une sélection à partager directement avec votre conseiller Innova Eyewear.",
  },
  "Comparte esta selección con tu asesor de Innova y recibe una propuesta comercial adaptada a tu negocio.": {
    en: "Share this selection with your Innova advisor and receive a commercial proposition tailored to your business.",
    fr: "Partagez cette sélection avec votre conseiller Innova et recevez une proposition commerciale adaptée à votre entreprise.",
  },
  "Detalles en ficha": { en: "Details on product page", fr: "Détails sur la fiche" },
  "Disponible para consulta comercial con Innova": {
    en: "Available for commercial enquiry with Innova",
    fr: "Disponibilité à confirmer auprès d’Innova",
  },
  "Innova Eyewear · Distribución, atención comercial y soporte de cuenta": {
    en: "Innova Eyewear · Distribution, sales support and account service",
    fr: "Innova Eyewear · Distribution, accompagnement commercial et suivi de compte",
  },
  "Solicitar disponibilidad": { en: "Request availability", fr: "Demander la disponibilité" },
  "Guía de medidas": { en: "Size guide", fr: "Guide des mesures" },
  "COMPLETA LA PROPUESTA": { en: "COMPLETE THE OFFER", fr: "COMPLÉTEZ VOTRE SÉLECTION" },
  "Construye un surtido con más posibilidades.": {
    en: "Build an assortment with more possibilities.",
    fr: "Construisez un assortiment riche en possibilités.",
  },
  "Alfred Kerbs crea gafas con una sensibilidad contemporánea: piezas expresivas que aportan identidad, conversación y un punto de vista reconocible al punto de venta.": {
    en: "Alfred Kerbs creates eyewear with a contemporary sensibility: expressive pieces that bring identity, conversation and a recognisable point of view to the point of sale.",
    fr: "Alfred Kerbs crée des lunettes à la sensibilité contemporaine : des pièces expressives qui apportent identité, dialogue et signature reconnaissable au point de vente.",
  },
  "La marca entiende el diseño como una forma de celebrar la identidad. Cada modelo combina proporción, color y presencia para ofrecer al profesional una colección capaz de conectar con clientes que buscan algo personal y diferente.": {
    en: "The brand understands design as a way to celebrate identity. Each model combines proportion, colour and presence to offer professionals a collection that connects with customers looking for something personal and different.",
    fr: "La marque conçoit le design comme une manière de célébrer l’identité. Chaque modèle associe proportion, coloris et présence pour offrir aux professionnels une collection capable de répondre aux attentes d’une clientèle en quête de singularité.",
  },
  "Desde Barcelona, la propuesta reúne memoria visual y una sensibilidad joven. El resultado es un lenguaje reconocible que permite construir un surtido coherente sin renunciar a la variedad.": {
    en: "From Barcelona, the proposition brings together visual memory and a youthful sensibility. The result is a recognisable language that makes it possible to build a coherent assortment without sacrificing variety.",
    fr: "Depuis Barcelone, la proposition réunit mémoire visuelle et sensibilité contemporaine. Il en résulte un langage reconnaissable qui permet de construire un assortiment cohérent sans renoncer à la variété.",
  },
  "La atención al detalle, los acetatos de base natural y la combinación de formas clásicas y contemporáneas crean una propuesta visual con argumentos claros para la recomendación en tienda.": {
    en: "Attention to detail, natural-based acetates and the combination of classic and contemporary shapes create a visual proposition with clear reasons to recommend it in store.",
    fr: "L’attention portée aux détails, les acétates d’origine naturelle et l’association de formes classiques et contemporaines créent une proposition visuelle aux arguments clairs pour le conseil en point de vente.",
  },
  "Incorpora una firma con identidad a tu propuesta.": {
    en: "Add a brand with identity to your offer.",
    fr: "Intégrez une marque de caractère à votre offre.",
  },
  "Explora la colección y habla con Innova Eyewear para crear el surtido adecuado para tu negocio.": {
    en: "Explore the collection and speak with Innova Eyewear to create the right assortment for your business.",
    fr: "Explorez la collection et échangez avec Innova Eyewear pour créer l’assortiment adapté à votre entreprise.",
  },
  "Dos colecciones para construir un surtido con personalidad.": {
    en: "Two collections to build an assortment with personality.",
    fr: "Deux collections pour construire un assortiment de caractère.",
  },
  "Combina óptica y solar dentro de una misma dirección creativa, con modelos y colores preparados para aportar variedad, coherencia y nuevas oportunidades de recomendación.": {
    en: "Combine optical and sun styles within a single creative direction, with models and colours designed to bring variety, coherence and new recommendation opportunities.",
    fr: "Associez montures optiques et lunettes de soleil au sein d’une même direction créative, avec des modèles et des coloris pensés pour apporter variété, cohérence et nouvelles possibilités de conseil.",
  },
  "modelos para enriquecer la recomendación diaria con diseño y personalidad.": {
    en: "models to enrich everyday recommendations with design and personality.",
    fr: "modèles pour enrichir le conseil au quotidien avec design et personnalité.",
  },
  "modelos solares para activar la temporada con color y presencia.": {
    en: "sun styles to energise the season with colour and presence.",
    fr: "modèles de lunettes de soleil pour dynamiser la saison avec coloris et présence.",
  },
  "Diseño para la recomendación diaria.": {
    en: "Design for everyday recommendations.",
    fr: "Le design au service du conseil au quotidien.",
  },
  "Una temporada con más personalidad.": {
    en: "A season with more personality.",
    fr: "Une saison avec plus de personnalité.",
  },
  "HISTORIA · BARCELONA": { en: "HISTORY · BARCELONA", fr: "HISTOIRE · BARCELONE" },
  "Alfred Kerbs nace de una forma barcelonesa de mirar: abierta, creativa y capaz de convertir las gafas en objetos de diseño, expresión y cultura visual.": {
    en: "Alfred Kerbs was born from a Barcelona way of seeing: open, creative and capable of turning eyewear into objects of design, expression and visual culture.",
    fr: "Alfred Kerbs naît d’une manière barcelonaise de regarder : ouverte, créative et capable de transformer les lunettes en objets de design, d’expression et de culture visuelle.",
  },
  "La marca crea eyewear para “the new now”: una mirada presente que combina referencias del pasado con una sensibilidad joven, mediterránea y conectada con la moda contemporánea.": {
    en: "The brand creates eyewear for “the new now”: a contemporary perspective that combines references from the past with a youthful, Mediterranean sensibility connected to contemporary fashion.",
    fr: "La marque crée des lunettes pour « the new now » : un regard actuel qui associe les références du passé à une sensibilité contemporaine, méditerranéenne et liée à la mode.",
  },
  "Esa tensión entre memoria y actualidad define una colección fácil de reconocer y abierta a perfiles diversos, una cualidad especialmente valiosa para construir una propuesta de venta con identidad.": {
    en: "This tension between memory and the present defines a collection that is easy to recognise and open to diverse profiles, an especially valuable quality when building a retail proposition with identity.",
    fr: "Cette tension entre mémoire et présent définit une collection facilement reconnaissable et ouverte à des profils variés, une qualité particulièrement précieuse pour construire une proposition commerciale de caractère.",
  },
  "Explora la colección actual y descubre cómo puede enriquecer la propuesta de tu negocio.": {
    en: "Explore the current collection and discover how it can enrich your business proposition.",
    fr: "Explorez la collection actuelle et découvrez comment elle peut enrichir la proposition de votre entreprise.",
  },
  "Conectar": { en: "Connect", fr: "Nous contacter" },
  "Cada modelo abre una conversación entre diseño, cliente y punto de venta.": {
    en: "Each model opens a conversation between design, customer and point of sale.",
    fr: "Chaque modèle ouvre un dialogue entre le design, la clientèle et le point de vente.",
  },
  "Una visión editorial de las gafas: libre en su expresión y consciente de la relación entre objeto, rostro, cultura y experiencia de compra.": {
    en: "An editorial vision of eyewear: free in its expression and conscious of the relationship between object, face, culture and buying experience.",
    fr: "Une vision éditoriale des lunettes : libre dans son expression et consciente du lien entre objet, visage, culture et expérience en point de vente.",
  },
  "Alfred Kerbs compara su proceso con el trabajo de un couturier: atención cercana al detalle, acetatos de base natural y una convivencia deliberada entre geometrías clásicas y de vanguardia.": {
    en: "Alfred Kerbs compares its process to the work of a couturier: close attention to detail, natural-based acetates and a deliberate dialogue between classic and avant-garde geometries.",
    fr: "Alfred Kerbs compare son processus au travail d’un couturier : attention minutieuse aux détails, acétates d’origine naturelle et dialogue délibéré entre géométries classiques et avant-gardistes.",
  },
  "DEL CONCEPTO AL PUNTO DE VENTA": {
    en: "FROM CONCEPT TO POINT OF SALE",
    fr: "DU CONCEPT AU POINT DE VENTE",
  },
  "Una colección para recomendar con confianza.": {
    en: "A collection to recommend with confidence.",
    fr: "Une collection à conseiller en toute confiance.",
  },
  "Compara modelos, colores y medidas para crear una selección coherente con el perfil de tu cliente.": {
    en: "Compare models, colours and measurements to create a selection aligned with your customer profile.",
    fr: "Comparez les modèles, les coloris et les mesures pour créer une sélection cohérente avec le profil de votre clientèle.",
  },
  "Una mirada comercial a la curaduría, el producto y la cultura visual para ópticas, cadenas y equipos que buscan construir una oferta con más valor.": {
    en: "A commercial perspective on curation, product and visual culture for optical stores, chains and teams looking to build a higher-value offer.",
    fr: "Un regard commercial sur la sélection, le produit et la culture visuelle pour les professionnels de l’optique, enseignes et équipes souhaitant construire une offre à plus forte valeur.",
  },
  "INNOVA EYEWEAR · CONTACTO COMERCIAL": {
    en: "INNOVA EYEWEAR · SALES CONTACT",
    fr: "INNOVA EYEWEAR · CONTACT COMMERCIAL",
  },
  "Hablemos de tu próxima selección.": {
    en: "Let’s talk about your next selection.",
    fr: "Parlons de votre prochaine sélection.",
  },
  "Cuéntanos sobre tu empresa, tus puntos de venta y el tipo de cliente al que te diriges. Nuestro equipo preparará una conversación comercial relevante para tu negocio.": {
    en: "Tell us about your company, points of sale and target customer. Our team will prepare a relevant commercial conversation for your business.",
    fr: "Présentez-nous votre entreprise, vos points de vente et votre clientèle cible. Notre équipe préparera un échange commercial pertinent pour votre activité.",
  },
  "Una propuesta adaptada a tu mercado.": {
    en: "A proposition tailored to your market.",
    fr: "Une proposition adaptée à votre marché.",
  },
  "Comparte tus objetivos y un asesor de Innova Eyewear se pondrá en contacto contigo.": {
    en: "Share your goals and an Innova Eyewear advisor will contact you.",
    fr: "Partagez vos objectifs et un conseiller Innova Eyewear vous contactera.",
  },
  "Cuéntanos sobre tu negocio y tus objetivos": {
    en: "Tell us about your business and your goals",
    fr: "Présentez votre entreprise et vos objectifs",
  },
  "Acepto que Innova Eyewear utilice mis datos para atender esta consulta comercial.": {
    en: "I agree that Innova Eyewear may use my data to respond to this commercial enquiry.",
    fr: "J’accepte qu’Innova Eyewear utilise mes données pour répondre à cette demande commerciale.",
  },
  "Solicitar contacto comercial": { en: "Request sales contact", fr: "Demander un contact commercial" },
  "Enviar consulta": { en: "Send enquiry", fr: "Envoyer la demande" },
  "Vuelve al inicio o continúa descubriendo la colección Alfred Kerbs.": {
    en: "Return home or continue discovering the Alfred Kerbs collection.",
    fr: "Retournez à l’accueil ou poursuivez votre découverte de la collection Alfred Kerbs.",
  },
  "Alfred Kerbs sitúa la identidad en el centro del proceso. La montura acompaña a la persona: no la disfraza, amplifica su manera de estar.": {
    en: "Alfred Kerbs places identity at the centre of the process. The frame accompanies the wearer: it does not disguise them, it amplifies their way of being.",
    fr: "Alfred Kerbs place l’identité au cœur du processus. La monture accompagne la personne : elle ne la déguise pas, elle amplifie sa manière d’être.",
  },
  "Empresa *": { en: "Company *", fr: "Entreprise *" },
  "Persona de contacto *": { en: "Contact person *", fr: "Personne de contact *" },
  "Email profesional *": { en: "Business email *", fr: "E-mail professionnel *" },
  "Teléfono": { en: "Phone", fr: "Téléphone" },
  "País": { en: "Country", fr: "Pays" },
  "Ciudad": { en: "City", fr: "Ville" },
  "Sitio web": { en: "Website", fr: "Site web" },
  "Nombre *": { en: "Name *", fr: "Nom *" },
  "Email *": { en: "Email *", fr: "E-mail *" },
  "Empresa": { en: "Company", fr: "Entreprise" },
  "Asunto *": { en: "Subject *", fr: "Objet *" },
  "Mensaje *": { en: "Message *", fr: "Message *" },
  "Enviando…": { en: "Sending…", fr: "Envoi…" },
  "Seleccionar idioma": { en: "Select language", fr: "Sélectionner la langue" },
  "Idiomas": { en: "Languages", fr: "Langues" },
  "Leer artículo": { en: "Read article", fr: "Lire l’article" },
  "Blog profesional": { en: "Professional journal", fr: "Journal professionnel" },
  "Correo comercial": { en: "Sales email", fr: "E-mail commercial" },
  "Innova Eyewear, distribuidor profesional de Alfred Kerbs": { en: "Innova Eyewear, professional distributor of Alfred Kerbs", fr: "Innova Eyewear, distributeur professionnel d’Alfred Kerbs" },
  "COMPRA PROFESIONAL": { en: "PROFESSIONAL PURCHASING", fr: "SÉLECTION PROFESSIONNELLE" },
  "Cómo comprar": { en: "How to prepare your selection", fr: "Comment préparer votre sélection" },
  "Cambiar catálogo de marca": { en: "Change brand catalogue", fr: "Changer de catalogue de marque" },
  "Abrir Alfred Kerbs": { en: "Open Alfred Kerbs", fr: "Ouvrir Alfred Kerbs" },
  "Abrir Balmain Eyewear": { en: "Open Balmain Eyewear", fr: "Ouvrir Balmain Eyewear" },
  "Abrir Silhouette": { en: "Open Silhouette", fr: "Ouvrir Silhouette" },
  "Abrir mi pedido": { en: "Open my selection", fr: "Ouvrir ma sélection" },
  "Ayuda comercial de Innova Eyewear": { en: "Innova Eyewear professional guidance", fr: "Accompagnement professionnel Innova Eyewear" },
  "Exclusivo para ópticas": { en: "Exclusively for optical professionals", fr: "Réservé aux professionnels de l’optique" },
  "Cerrar ayuda": { en: "Close guidance", fr: "Fermer l’aide" },
  "Este catálogo es exclusivo para ópticas y empresas del sector. Selecciona modelos y cantidades hasta completar el mínimo mayorista de 50 piezas de Alfred Kerbs.": {
    en: "This catalogue is reserved for optical professionals and industry businesses. Select models and quantities until the 50-piece professional minimum for Alfred Kerbs is reached.",
    fr: "Ce catalogue est réservé aux professionnels de l’optique et aux entreprises du secteur. Sélectionnez les modèles et les quantités jusqu’au seuil professionnel de 50 pièces Alfred Kerbs.",
  },
  "Después descarga el pedido en PDF. Innova valida la óptica, la disponibilidad, las condiciones comerciales y el transporte antes de confirmar.": {
    en: "Then download the selection as a PDF. Innova validates the optical business, availability, commercial terms and shipping before confirmation.",
    fr: "Téléchargez ensuite le dossier de sélection au format PDF. Innova étudie le compte professionnel, la disponibilité, les conditions commerciales et le transport avant toute confirmation.",
  },
  "Explorar el catálogo": { en: "Explore the catalogue", fr: "Explorer le catalogue" },
  "Ver el proceso de compra": { en: "View the selection process", fr: "Voir le parcours de sélection" },
  "DETALLES DEL MODELO": { en: "MODEL DETAILS", fr: "DÉTAILS DU MODÈLE" },
  "GUÍA DE MEDIDAS": { en: "SIZE GUIDE", fr: "GUIDE DES MESURES" },
  "Añade la referencia y la cantidad a tu pedido. Innova Eyewear revisará disponibilidad, condiciones comerciales y envío antes de confirmar la operación.": {
    en: "Add the reference and quantity to your selection. Innova Eyewear will review availability, commercial terms and shipping before confirming the order.",
    fr: "Ajoutez la référence et la quantité à votre sélection. Innova Eyewear étudiera la disponibilité, les conditions commerciales et l’expédition avant de formaliser toute commande.",
  },
  "Las medidas se expresan en milímetros y corresponden a la referencia indicada.": {
    en: "Measurements are given in millimetres and correspond to the stated reference.",
    fr: "Les mesures sont exprimées en millimètres et correspondent à la référence indiquée.",
  },
  "Cómo construir un surtido óptico con identidad": {
    en: "How to build a distinctive optical assortment",
    fr: "Construire un assortiment optique de caractère",
  },
  "Cómo leer las medidas de una montura óptica": {
    en: "How to read the measurements of an optical frame",
    fr: "Lire les mesures d’une monture optique",
  },
  "Cómo presentar color y acabados en una óptica": {
    en: "How to present colour and finishes in an optical store",
    fr: "Présenter les coloris et les finitions en point de vente optique",
  },
  "Una selección comercial coherente combina lectura del cliente, arquitectura de color y una proporción consciente entre piezas protagonistas y modelos de continuidad.": {
    en: "A coherent commercial selection combines customer insight, colour architecture and a considered balance between statement pieces and continuity models.",
    fr: "Un assortiment commercial cohérent associe connaissance de la clientèle, architecture des coloris et équilibre maîtrisé entre pièces fortes et modèles de continuité.",
  },
  "Leer las medidas antes de comprar una montura": {
    en: "Read frame measurements before purchasing",
    fr: "Interpréter les mesures avant de sélectionner une monture",
  },
  "Ancho total, varilla, puente y lente cuentan historias distintas. Interpretarlas juntas reduce dudas y mejora la recomendación en tienda.": {
    en: "Overall width, temple length, bridge and lens dimensions each tell a different story. Reading them together reduces uncertainty and improves in-store advice.",
    fr: "Largeur totale, longueur de branche, pont et dimensions du verre apportent des indications complémentaires. Les interpréter ensemble facilite le conseil en point de vente.",
  },
  "Presentar color y acabados en el punto de venta": {
    en: "Presenting colour and finishes at the point of sale",
    fr: "Présenter les coloris et les finitions en point de vente",
  },
  "El color funciona mejor cuando el equipo puede relacionarlo con material, luz y proporción, sin reducir la recomendación a una etiqueta cromática.": {
    en: "Colour performs best when the team can relate it to material, light and proportion, rather than reducing the recommendation to a colour label.",
    fr: "Le coloris prend tout son sens lorsque l’équipe le relie à la matière, à la lumière et aux proportions, sans réduire le conseil à une simple étiquette chromatique.",
  },
  "Construir un surtido óptico con identidad no consiste en acumular formas distintas. La curaduría empieza por entender qué papel debe cumplir cada montura dentro del espacio, qué conversaciones quiere abrir el equipo de venta y cómo se relacionan los colores entre sí.": {
    en: "Building a distinctive optical assortment is not about accumulating different shapes. Curation begins by defining the role of each frame in the space, the conversations the sales team wants to open and the way colours relate to one another.",
    fr: "Construire un assortiment optique de caractère ne consiste pas à accumuler les formes. La sélection commence par le rôle de chaque monture dans l’espace, le dialogue que l’équipe souhaite engager et la manière dont les coloris se répondent.",
  },
  "Una colección que se pueda leer": { en: "A collection with a clear structure", fr: "Une collection à la lecture claire" },
  "La compra profesional gana claridad cuando se organiza por familias: piezas que definen el tono, modelos que amplían el rango de uso y referencias que conectan ambas zonas. Esta estructura facilita la presentación, la formación del equipo y el seguimiento de la rotación sin perder intención estética.": {
    en: "Professional buying becomes clearer when the assortment is organised into families: pieces that set the tone, models that broaden usage and references that bridge both areas. This structure supports presentation, team training and sell-through monitoring without losing aesthetic intent.",
    fr: "La sélection professionnelle gagne en clarté lorsqu’elle s’organise par familles : pièces qui donnent le ton, modèles qui élargissent les usages et références qui relient les deux. Cette structure facilite la présentation, la formation des équipes et le suivi de la rotation sans perdre l’intention esthétique.",
  },
  "Color, material y proporción": { en: "Colour, material and proportion", fr: "Coloris, matière et proportion" },
  "Los acabados deben revisarse junto a sus códigos, medidas y materiales antes de asociar un modelo a un perfil de cliente. Una selección equilibrada no exige uniformidad; exige que cada diferencia tenga una función reconocible.": {
    en: "Finishes should be reviewed alongside their codes, measurements and materials before assigning a model to a customer profile. A balanced selection does not require uniformity; it requires every difference to have a recognisable purpose.",
    fr: "Les finitions doivent être étudiées avec leurs codes, leurs mesures et leurs matières avant d’associer un modèle à un profil de clientèle. Un assortiment équilibré n’exige pas l’uniformité : chaque différence doit avoir une fonction identifiable.",
  },
  "La identidad aparece cuando el conjunto mantiene una dirección, incluso cuando cada pieza conserva su carácter.": {
    en: "Identity emerges when the whole follows a clear direction, even as each piece retains its character.",
    fr: "L’identité apparaît lorsque l’ensemble suit une direction claire, même si chaque pièce conserve son caractère.",
  },
  "Las medidas técnicas ayudan a comparar modelos y a orientar una recomendación más precisa. En la colección Alfred Kerbs se organizan mediante ancho de montura, longitud de varilla, puente, ancho de lente y altura de lente.": {
    en: "Technical measurements help compare models and guide more precise recommendations. In the Alfred Kerbs collection they are organised by frame width, temple length, bridge, lens width and lens height.",
    fr: "Les mesures techniques facilitent la comparaison des modèles et permettent un conseil plus précis. Dans la collection Alfred Kerbs, elles sont structurées autour de la largeur de monture, de la longueur de branche, du pont, de la largeur et de la hauteur du verre.",
  },
  "Comparar dentro de un contexto": { en: "Compare in context", fr: "Comparer dans son contexte" },
  "Dos modelos con el mismo ancho de lente pueden responder de forma distinta por el puente, la geometría del frontal o la longitud de varilla. Por eso la lectura más útil cruza varias medidas y conserva siempre la referencia concreta de color.": {
    en: "Two models with the same lens width can fit differently because of the bridge, front geometry or temple length. The most useful assessment therefore combines several measurements while keeping the exact colour reference in view.",
    fr: "Deux modèles de même largeur de verre peuvent offrir un porté différent selon le pont, la géométrie de la face ou la longueur de branche. L’analyse la plus pertinente croise donc plusieurs mesures tout en conservant la référence exacte du coloris.",
  },
  "Mejor información, mejor recomendación": { en: "Better information, better advice", fr: "Mieux informer pour mieux conseiller" },
  "Presentar medidas, imágenes y códigos de forma consistente agiliza la conversación entre comprador, equipo comercial y punto de venta. También ayuda al equipo a explicar las diferencias con claridad y a ofrecer alternativas dentro de una misma colección.": {
    en: "Presenting measurements, images and codes consistently streamlines the conversation between buyer, sales team and point of sale. It also helps the team explain differences clearly and offer alternatives within the same collection.",
    fr: "Présenter de manière cohérente les mesures, les images et les codes fluidifie les échanges entre acheteur, équipe commerciale et point de vente. L’équipe peut ainsi expliquer clairement les différences et proposer des alternatives au sein d’une même collection.",
  },
  "La misma montura puede cambiar de presencia con un acabado cristal, havana, negro o una combinación metálica. En la compra profesional, el color debe leerse como parte de la construcción visual completa y no como una muestra aislada.": {
    en: "The same frame can take on a different presence in crystal, Havana, black or a metallic combination. In professional buying, colour should be read as part of the complete visual construction, not as an isolated swatch.",
    fr: "Une même monture change de présence selon qu’elle adopte une finition cristal, havane, noire ou une combinaison métallique. Dans la sélection professionnelle, le coloris se lit comme une composante de l’ensemble visuel, jamais comme un échantillon isolé.",
  },
  "Trabajar con códigos claros": { en: "Work with clear codes", fr: "S’appuyer sur des codes clairs" },
  "Los nombres comerciales ayudan a narrar el producto, mientras que los códigos facilitan pedidos y reposiciones. Mostrar ambos datos junto a una imagen consistente mejora la recomendación y aporta confianza al proceso de venta.": {
    en: "Commercial names help tell the product story, while codes make ordering and replenishment easier. Showing both alongside consistent imagery improves advice and builds confidence in the sales process.",
    fr: "Les noms commerciaux donnent du relief au produit, tandis que les codes facilitent les commandes et le réassort. Présenter les deux avec une image cohérente renforce la qualité du conseil et la confiance dans le processus commercial.",
  },
  "De la selección al lineal": { en: "From selection to display", fr: "De la sélection à la présentation" },
  "Una paleta útil combina continuidad y contraste. Repetir un tono en distintas formas puede crear ritmo; introducir un acabado inesperado aporta foco. El objetivo no es cubrir todos los colores, sino dar a cada referencia una razón para estar en la selección.": {
    en: "A useful palette combines continuity and contrast. Repeating a tone across different shapes can create rhythm; introducing an unexpected finish adds focus. The aim is not to cover every colour, but to give each reference a reason to belong in the selection.",
    fr: "Une palette pertinente associe continuité et contraste. Répéter un ton sur différentes formes crée un rythme ; introduire une finition inattendue apporte un point d’attention. L’objectif n’est pas de couvrir tous les coloris, mais de donner à chaque référence une raison d’intégrer l’assortiment.",
  },
  "Monturas de acetato dispuestas en una composición editorial": { en: "Acetate frames arranged in an editorial composition", fr: "Montures en acétate dans une composition éditoriale" },
  "Montura solar de acetato sobre tejido blanco": { en: "Acetate sunglasses on white fabric", fr: "Lunettes de soleil en acétate sur textile blanc" },
  "Dos monturas de acetato reflejadas sobre una superficie azul": { en: "Two acetate frames reflected on a blue surface", fr: "Deux montures en acétate reflétées sur une surface bleue" },
  "01 / ENFOQUE": { en: "01 / APPROACH", fr: "01 / APPROCHE" },
  "01 / ÓPTICA": { en: "01 / OPTICAL", fr: "01 / MONTURES OPTIQUES" },
  "02 / MIRADA": { en: "02 / PERSPECTIVE", fr: "02 / REGARD" },
  "02 / SOLAR": { en: "02 / SUN", fr: "02 / LUNETTES DE SOLEIL" },
  "Abrir navegación": { en: "Open navigation", fr: "Ouvrir la navigation" },
  "404 · PÁGINA NO ENCONTRADA": { en: "404 · PAGE NOT FOUND", fr: "404 · PAGE INTROUVABLE" },
  "Archivo de campaña · Selección editorial": {
    en: "Campaign archive · Editorial selection",
    fr: "Archives de campagne · Sélection éditoriale",
  },
  "CANAL PROFESIONAL": { en: "PROFESSIONAL CHANNEL", fr: "RÉSEAU PROFESSIONNEL" },
  "Cerrar ampliación": { en: "Close enlarged view", fr: "Fermer l’agrandissement" },
  "Cerrar selección": { en: "Close selection", fr: "Fermer la sélection" },
  "COLECCIÓN 01": { en: "COLLECTION 01", fr: "COLLECTION 01" },
  "COLECCIÓN 02": { en: "COLLECTION 02", fr: "COLLECTION 02" },
  "COLECCIONES": { en: "COLLECTIONS", fr: "COLLECTIONS" },
  "CONTACTO COMERCIAL · INNOVA": { en: "SALES CONTACT · INNOVA", fr: "CONTACT COMMERCIAL · INNOVA" },
  "CONTINUAR": { en: "CONTINUE", fr: "CONTINUER" },
  "CUADERNO PROFESIONAL": { en: "PROFESSIONAL JOURNAL", fr: "JOURNAL PROFESSIONNEL" },
  "Diseñar no es imponer un personaje, sino abrir una posibilidad de expresión.": {
    en: "Design is not about imposing a character, but opening up a possibility for expression.",
    fr: "Concevoir ne consiste pas à imposer un personnage, mais à ouvrir une possibilité d’expression.",
  },
  "DISTRIBUCIÓN PROFESIONAL DE ALFRED KERBS": {
    en: "PROFESSIONAL DISTRIBUTION OF ALFRED KERBS",
    fr: "DISTRIBUTION PROFESSIONNELLE D’ALFRED KERBS",
  },
  "El lenguaje oficial habla de nostalgia y contemporaneidad. En producto, esa tensión aparece en la convivencia entre formas reconocibles, proporciones con presencia y combinaciones de color que desplazan lo familiar.": {
    en: "The brand language speaks of nostalgia and contemporaneity. In the product, this tension appears in the dialogue between recognisable shapes, confident proportions and colour combinations that shift the familiar.",
    fr: "Le langage de la marque évoque la nostalgie et la contemporanéité. Dans le produit, cette tension se manifeste dans le dialogue entre formes reconnaissables, proportions affirmées et associations de coloris qui renouvellent les codes familiers.",
  },
  "Esta vista ha quedado fuera de la colección.": {
    en: "This view is no longer part of the collection.",
    fr: "Cette page ne fait plus partie de la collection.",
  },
  "EVOLUCIÓN": { en: "EVOLUTION", fr: "ÉVOLUTION" },
  "FILOSOFÍA DE DISEÑO": { en: "DESIGN PHILOSOPHY", fr: "PHILOSOPHIE DU DESIGN" },
  "Forma, proporción y presencia.": { en: "Shape, proportion and presence.", fr: "Forme, proportion et présence." },
  "Imagen ampliada": { en: "Enlarged image", fr: "Image agrandie" },
  "LA MARCA": { en: "THE BRAND", fr: "LA MARQUE" },
  "LA MARCA · BARCELONA": { en: "THE BRAND · BARCELONA", fr: "LA MARQUE · BARCELONE" },
  "Leer la filosofía de diseño": { en: "Read the design philosophy", fr: "Lire la philosophie du design" },
  "MANIFIESTO": { en: "MANIFESTO", fr: "MANIFESTE" },
  "Más notas del cuaderno.": { en: "More notes from the journal.", fr: "Plus de notes du journal." },
  "ORIGEN": { en: "ORIGIN", fr: "ORIGINE" },
  "PARA PROFESIONALES": { en: "FOR PROFESSIONALS", fr: "POUR LES PROFESSIONNELS" },
  "Producto, materia y composición.": { en: "Product, material and composition.", fr: "Produit, matière et composition." },
  "SEGUIR LEYENDO": { en: "KEEP READING", fr: "POURSUIVRE LA LECTURE" },
  "SELECCIÓN ÓPTICA": { en: "OPTICAL SELECTION", fr: "SÉLECTION DE MONTURES OPTIQUES" },
  "SELECCIÓN SOLAR": { en: "SUN SELECTION", fr: "SÉLECTION DE LUNETTES DE SOLEIL" },
  "Sol": { en: "Sun", fr: "Lunettes de soleil" },
  "Sun": { en: "Sun", fr: "Lunettes de soleil" },
  "Optical": { en: "Optical", fr: "Monture optique" },
  "Una colección se construye también desde el color.": {
    en: "A collection is also built through colour.",
    fr: "Une collection se construit aussi par la couleur.",
  },
  "Vistas del producto": { en: "Product views", fr: "Vues du produit" },
  "Volver al inicio": { en: "Back to home", fr: "Retour à l’accueil" },
};

export function translateDocumentText(text: string, locale: Locale) {
  if (locale === "es") return text;
  const normalized = text.trim().replace(/\s+/g, " ");
  const direct = documentTranslations[normalized];
  if (direct) {
    const leading = text.match(/^\s*/)?.[0] ?? "";
    const trailing = text.match(/\s*$/)?.[0] ?? "";
    return `${leading}${direct[locale]}${trailing}`;
  }

  if (normalized.endsWith(" · Alfred Kerbs")) {
    const baseTitle = normalized.slice(0, -" · Alfred Kerbs".length);
    const translatedBase = documentTranslations[baseTitle];
    if (translatedBase) return `${translatedBase[locale]} · Alfred Kerbs`;
  }

  const productPageTitle = normalized.match(/^(.+) · Alfred Kerbs para ópticas y grandes cuentas · Alfred Kerbs$/);
  if (productPageTitle) {
    return locale === "en"
      ? `${productPageTitle[1]} · Alfred Kerbs for optical professionals and key accounts · Alfred Kerbs`
      : `${productPageTitle[1]} · Alfred Kerbs pour professionnels de l’optique et grands comptes · Alfred Kerbs`;
  }

  const colorNames: Record<string, { en: string; fr: string }> = {
    AMARILLO: { en: "Yellow", fr: "Jaune" },
    AZUL: { en: "Blue", fr: "Bleu" },
    BEIGE: { en: "Beige", fr: "Beige" },
    CAREY: { en: "Tortoiseshell", fr: "Écaille" },
    CHAMPAGNE: { en: "Champagne", fr: "Champagne" },
    CRISTAL: { en: "Crystal", fr: "Cristal" },
    GRIS: { en: "Grey", fr: "Gris" },
    HAVANA: { en: "Havana", fr: "Havane" },
    "MARRÓN": { en: "Brown", fr: "Marron" },
    MORADO: { en: "Purple", fr: "Violet" },
    NARANJA: { en: "Orange", fr: "Orange" },
    NEGRO: { en: "Black", fr: "Noir" },
    ORO: { en: "Gold", fr: "Or" },
    ROJO: { en: "Red", fr: "Rouge" },
    ROSA: { en: "Pink", fr: "Rose" },
    VERDE: { en: "Green", fr: "Vert" },
  };
  const translateColorList = (value: string) => {
    const parts = value.split(",").map((part) => part.trim());
    if (!parts.length || !parts.every((part) => colorNames[part])) return null;
    return parts.map((part) => colorNames[part][locale]).join(", ");
  };
  const codedColor = normalized.match(/^([A-Z0-9]+) · (.+)$/);
  if (codedColor) {
    const translatedColors = translateColorList(codedColor[2]);
    if (translatedColors) return `${codedColor[1]} · ${translatedColors}`;
  }
  const translatedColor = translateColorList(normalized);
  if (translatedColor) return translatedColor;

  const catalogueCount = normalized.match(/^Ver los (\d+) modelos$/i);
  if (catalogueCount) {
    const translated = locale === "en"
      ? `View all ${catalogueCount[1]} models`
      : `Voir les ${catalogueCount[1]} modèles`;
    return normalized === normalized.toUpperCase() ? translated.toUpperCase() : translated;
  }

  const resultsCount = normalized.match(/^(\d+) (modelo encontrado|modelos encontrados)$/i);
  if (resultsCount) {
    const singular = resultsCount[2].toLowerCase() === "modelo encontrado";
    const translated = locale === "en"
      ? `${resultsCount[1]} ${singular ? "model found" : "models found"}`
      : `${resultsCount[1]} ${singular ? "modèle trouvé" : "modèles trouvés"}`;
    return normalized === normalized.toUpperCase() ? translated.toUpperCase() : translated;
  }

  const measurementReference = normalized.match(/^Medidas · referencia (.+)$/);
  if (measurementReference) {
    return locale === "en"
      ? `Measurements · reference ${measurementReference[1]}`
      : `Mesures · référence ${measurementReference[1]}`;
  }

  const prefixedLabels: Array<[string, string, string]> = [
    ["Ocultar ", "Hide ", "Masquer "],
    ["Restaurar ", "Restore ", "Restaurer "],
    ["Ver ", "View ", "Voir "],
    ["Quitar ", "Remove ", "Retirer "],
    ["Mostrar ", "Show ", "Afficher "],
    ["Cerrar ", "Close ", "Fermer "],
  ];
  for (const [source, english, french] of prefixedLabels) {
    if (text.trim().startsWith(source)) {
      const leading = text.match(/^\s*/)?.[0] ?? "";
      return `${leading}${locale === "en" ? english : french}${text.trim().slice(source.length)}`;
    }
  }

  const shortProduct = normalized.match(
    /^(.+) es una montura (solar|óptica) de Alfred Kerbs disponible en (\d+) (?:acabado|acabados)\. Una propuesta contemporánea para aportar identidad y nuevas posibilidades de recomendación a tu surtido\.$/,
  );
  if (shortProduct) {
    const [, name, kind, count] = shortProduct;
    if (locale === "en") {
      return `${name} is an Alfred Kerbs ${kind === "solar" ? "sun frame" : "optical frame"} available in ${count} ${count === "1" ? "finish" : "finishes"}. A contemporary proposition designed to bring identity and new recommendation opportunities to your assortment.`;
    }
    return `${name} est ${kind === "solar" ? "un modèle de lunettes de soleil" : "une monture optique"} Alfred Kerbs disponible en ${count} ${count === "1" ? "finition" : "finitions"}. Une proposition contemporaine pensée pour affirmer l’identité de votre assortiment et enrichir le conseil en point de vente.`;
  }

  if (normalized.includes("amplía la propuesta profesional de Alfred Kerbs")) {
    const name = normalized.split(" amplía la propuesta")[0];
    return locale === "en"
      ? `${name} expands the professional Alfred Kerbs offer. Designed for optical stores, chains and optical departments seeking to differentiate their assortment, it combines the brand’s contemporary language with clear commercial appeal that is easy to present.`
      : `${name} enrichit l’offre professionnelle Alfred Kerbs. Pensée pour les professionnels de l’optique, les enseignes et les départements optiques souhaitant différencier leur assortiment, cette monture associe le langage contemporain de la marque à des arguments commerciaux clairs et faciles à présenter.`;
  }

  if (normalized.startsWith("La colección ofrece ")) {
    return locale === "en"
      ? "The collection offers several colour variants. Each reference brings together its code, product imagery and sizing data to make comparison easier and support a coherent assortment."
      : "La collection propose plusieurs variantes de couleur. Chaque référence réunit son code, ses images produit et ses mesures afin de faciliter la comparaison et de construire un assortiment cohérent.";
  }

  if (normalized.startsWith("La referencia mostrada incorpora una guía de medidas") || normalized.startsWith("El equipo de Innova Eyewear puede ayudarte")) {
    return locale === "en"
      ? "The sizing guide makes it easier to compare options and prepare in-store recommendations. The Innova Eyewear team can help you define the colour mix, check availability and develop a collection proposition tailored to your business and customer profile."
      : "Le guide des mesures facilite la comparaison des options et la préparation du conseil en point de vente. L’équipe Innova Eyewear peut vous aider à définir l’assortiment de coloris, consulter les disponibilités et développer une proposition de collection adaptée au profil de votre entreprise et de votre clientèle.";
  }

  const replacements: Record<string, TranslationPair> = {
    " modelos": { en: " models", fr: " modèles" },
    " modelo": { en: " model", fr: " modèle" },
    " referencias": { en: " references", fr: " références" },
    " referencia": { en: " reference", fr: " référence" },
    " acabados": { en: " finishes", fr: " finitions" },
    " acabado": { en: " finish", fr: " finition" },
    " vistas de producto": { en: " product views", fr: " vues des produits" },
    "Distribuido por Innova": { en: "Distributed by Innova", fr: "Distribué par Innova" },
    "Guía de medidas": { en: "Size guide", fr: "Guide des mesures" },
    "Talla ": { en: "Size ", fr: "Taille " },
  };
  let translated = text;
  for (const [source, target] of Object.entries(replacements)) {
    translated = translated.replaceAll(source, target[locale]);
  }
  return translated;
}
