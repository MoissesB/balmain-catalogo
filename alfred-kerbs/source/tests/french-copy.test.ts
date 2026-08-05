import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { translateDocumentText } from "../lib/i18n";

test("la version française distingue la sélection de la commande", () => {
  assert.equal(translateDocumentText("Mi pedido", "fr"), "Ma sélection");
  assert.equal(translateDocumentText("Añadir a mi pedido", "fr"), "Ajouter à ma sélection");
  assert.equal(
    translateDocumentText("PEDIDO PROFESIONAL · INNOVA EYEWEAR", "fr"),
    "SÉLECTION PROFESSIONNELLE · INNOVA EYEWEAR",
  );
  assert.equal(translateDocumentText("Revisar mi pedido", "fr"), "Revoir ma sélection");
  assert.equal(translateDocumentText("Añadir más unidades", "fr"), "Ajouter des pièces");
});

test("la terminología francesa es óptica, comercial y natural", () => {
  assert.equal(translateDocumentText("Óptica", "fr"), "Montures optiques");
  assert.equal(translateDocumentText("Solar", "fr"), "Lunettes de soleil");
  assert.equal(translateDocumentText("Color", "fr"), "Coloris");
  assert.equal(translateDocumentText("Exportar CSV", "fr"), "Exporter en CSV");
  assert.equal(translateDocumentText("Buscar nombre o código de modelo", "fr"), "Rechercher par nom ou code de modèle");
  assert.equal(translateDocumentText("Ver los 99 modelos", "fr"), "Voir les 99 modèles");
  assert.equal(translateDocumentText("98 modelos encontrados", "fr"), "98 modèles trouvés");
  assert.equal(translateDocumentText("Medidas · referencia HV", "fr"), "Mesures · référence HV");
});

test("la portada, el blog y la ayuda comercial no conservan texto español en francés", () => {
  assert.equal(
    translateDocumentText("Una colección con identidad, lista para tu óptica.", "fr"),
    "Une collection de caractère, pensée pour votre point de vente.",
  );
  assert.equal(
    translateDocumentText("Cómo construir un surtido óptico con identidad", "fr"),
    "Construire un assortiment optique de caractère",
  );
  assert.equal(
    translateDocumentText("Cómo comprar", "fr"),
    "Comment préparer votre sélection",
  );
});

test("la versión inglesa mantiene un recorrido B2B de selección antes de la commande", () => {
  assert.equal(translateDocumentText("Mi pedido", "en"), "My selection");
  assert.equal(translateDocumentText("Añadir a mi pedido", "en"), "Add to my selection");
  assert.equal(
    translateDocumentText("PEDIDO PROFESIONAL · INNOVA EYEWEAR", "en"),
    "PROFESSIONAL SELECTION · INNOVA EYEWEAR",
  );
  assert.equal(translateDocumentText("Cómo realizar el pedido", "en"), "How the selection process works");
  assert.equal(translateDocumentText("Cómo comprar", "en"), "How to prepare your selection");
  assert.equal(
    translateDocumentText("Innova Eyewear, distribuidor profesional de Alfred Kerbs", "en"),
    "Innova Eyewear, professional distributor of Alfred Kerbs",
  );
});

test("la localización francesa cubre metadatos, contadores y coloris dinámicos", () => {
  assert.equal(translateDocumentText("La marca · Alfred Kerbs", "fr"), "La marque · Alfred Kerbs");
  assert.equal(
    translateDocumentText("Cómo leer las medidas de una montura óptica · Alfred Kerbs", "fr"),
    "Lire les mesures d’une monture optique · Alfred Kerbs",
  );
  assert.equal(
    translateDocumentText("AQUILES · Alfred Kerbs para ópticas y grandes cuentas · Alfred Kerbs", "fr"),
    "AQUILES · Alfred Kerbs pour professionnels de l’optique et grands comptes · Alfred Kerbs",
  );
  assert.equal(translateDocumentText("98 MODELOS ENCONTRADOS", "fr"), "98 MODÈLES TROUVÉS");
  assert.equal(translateDocumentText("Medidas ·", "fr"), "Mesures ·");
  assert.equal(translateDocumentText("Medidas · referencia", "fr"), "Mesures · référence");
  assert.equal(translateDocumentText("modelos encontrados", "fr"), "modèles trouvés");
  assert.equal(translateDocumentText("HV · HAVANA", "fr"), "HV · Havane");
  assert.equal(translateDocumentText("NEGRO, ORO", "fr"), "Noir, Or");
  assert.equal(translateDocumentText("Añadir más unidades", "fr"), "Ajouter des pièces");
  assert.equal(translateDocumentText("AÑADIR MÁS UNIDADES", "fr"), "AJOUTER DES PIÈCES");
});

test("las fuentes francesas no reintroducen terminología literal o minorista", () => {
  const sources = [
    readFileSync(new URL("../lib/i18n.ts", import.meta.url), "utf8"),
    readFileSync(new URL("../components/ProfessionalOrderProvider.tsx", import.meta.url), "utf8"),
    readFileSync(new URL("../components/ProfessionalPurchaseInfo.tsx", import.meta.url), "utf8"),
  ].join("\n");

  for (const forbidden of [
    "minimum grossiste",
    "Le brandbook",
    "mix de couleurs",
    "recommandation quotidienne",
    "recommandations en magasin",
    "chaînes retail",
    "Démarrer une conversation",
    "fr: \"Connecter\"",
    "fr: \"vues produit\"",
    "Wholesale minimum",
    "My order",
    "PROFESSIONAL ORDER",
  ]) {
    assert.doesNotMatch(sources, new RegExp(forbidden, "i"), forbidden);
  }
});

test("el proveedor de idioma traduce también nodos de texto añadidos dinámicamente", () => {
  const provider = readFileSync(new URL("../components/LanguageProvider.tsx", import.meta.url), "utf8");
  assert.match(provider, /node instanceof Text/);
  assert.match(provider, /translateTextNode\(node, nextLocale\)/);
  assert.match(provider, /record\.type === "characterData"/);
  assert.match(provider, /characterData: true/);
  assert.match(provider, /\[alt\]/);
});

test("el pie usa el activo de Innova apto para fondo oscuro", () => {
  const footer = readFileSync(new URL("../components/SiteFooter.tsx", import.meta.url), "utf8");
  const styles = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(footer, /src="\/media\/brand\/innova-logo\.png"/);
  assert.match(footer, /alt="Innova Eyewear, distribuidor profesional de Alfred Kerbs"/);
  assert.equal(
    translateDocumentText("Innova Eyewear, distribuidor profesional de Alfred Kerbs", "fr"),
    "Innova Eyewear, distributeur professionnel d’Alfred Kerbs",
  );
  assert.match(styles, /\.footer-innova-logo[\s\S]*filter:\s*brightness\(0\) invert\(1\)/);
});
