"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { catalogImageUrl, type Product } from "../lib/catalog";
import { useLanguage } from "./LanguageProvider";

const STORAGE_KEY = "ak-professional-order-v1";
export const MINIMUM_ORDER_UNITS = 50;
const INNOVA_EMAIL = "info@innova-eyewear.com";
const INNOVA_WHATSAPP = "17542704613";
const INNOVA_BOUTIQUE_URL =
  process.env.NEXT_PUBLIC_INNOVA_BOUTIQUE_URL ?? "https://innova-boutique.com";

type OrderItem = {
  key: string;
  productId: string;
  slug: string;
  model: string;
  category: string;
  collection: "optical" | "sun";
  sku: string;
  colorCode: string;
  color: string;
  material: string;
  measurements: string;
  image: string;
  quantity: number;
};

type ClientData = {
  name: string;
  company: string;
  optical: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  notes: string;
};

type StoredOrder = {
  items: OrderItem[];
  client: ClientData;
  orderNumber: string;
};

type OrderContextValue = {
  items: OrderItem[];
  totalUnits: number;
  open: () => void;
  addProduct: (product: Product, variantIndex?: number, quantity?: number) => void;
  hasVariant: (product: Product, variantIndex?: number) => boolean;
};

const emptyClient: ClientData = {
  name: "",
  company: "",
  optical: "",
  email: "",
  phone: "",
  city: "",
  country: "",
  notes: "",
};

const orderCopy = {
  es: {
    button: "Mi pedido",
    kicker: "SELECCIÓN PROFESIONAL",
    title: "Pedido Alfred Kerbs para revisión",
    intro: "Seleccione referencias y cantidades. Innova confirmará disponibilidad, condiciones comerciales y envío.",
    close: "Cerrar pedido",
    references: "referencias",
    units: "piezas",
    minimum: "Mínimo mayorista: 50 piezas",
    ready: "La selección cumple el mínimo inicial.",
    remaining: (count: number) => `Faltan ${count} piezas para cumplir el mínimo.`,
    emptyTitle: "Todavía no ha seleccionado productos.",
    emptyText: "Explore el catálogo y añada modelos o colores. Puede combinarlos hasta alcanzar 50 piezas.",
    catalog: "Ir al catálogo",
    quantity: "Cantidad",
    remove: "Quitar",
    clientTitle: "Datos de la óptica o empresa",
    clientIntro: "Los campos obligatorios se incluirán en el PDF y en el mensaje para Innova.",
    name: "Nombre y apellido",
    company: "Empresa / razón social",
    optical: "Nombre de la óptica",
    email: "Correo profesional",
    phone: "Teléfono (+ código de país)",
    city: "Ciudad",
    country: "País",
    notes: "Observaciones",
    required: "Complete los datos obligatorios y alcance 50 piezas para habilitar el envío.",
    valid: "Pedido completo y listo para preparar.",
    pdf: "Descargar PDF del pedido",
    whatsapp: "Descargar PDF y abrir WhatsApp",
    emailAction: "Descargar PDF y preparar correo",
    note: "Adjunte manualmente el PDF descargado antes de enviar el mensaje. Innova confirmará disponibilidad, condiciones comerciales y transporte.",
    pdfTitle: "PEDIDO ALFRED KERBS PARA REVISIÓN",
    clientData: "DATOS DEL CLIENTE",
    products: "PRODUCTOS DEL PEDIDO",
    summary: "RESUMEN",
    finalNote: "Documento preliminar: no es un pedido confirmado. Innova Eyewear revisará la cuenta, el inventario y las condiciones comerciales.",
    preparedWhatsapp: "PDF descargado. Adjúntelo al mensaje de WhatsApp.",
    preparedEmail: "PDF descargado. Adjúntelo al correo preparado.",
    error: "No se pudo preparar el archivo. Inténtelo de nuevo.",
  },
  en: {
    button: "My selection",
    kicker: "PROFESSIONAL SELECTION",
    title: "Alfred Kerbs selection for review",
    intro: "Select references and quantities. Innova will review availability, commercial terms and shipping before any order is confirmed.",
    close: "Close selection",
    references: "references",
    units: "pieces",
    minimum: "Professional minimum: 50 pieces",
    ready: "The selection meets the professional minimum.",
    remaining: (count: number) => `${count} more pieces are needed to meet the professional minimum.`,
    emptyTitle: "No products selected yet.",
    emptyText: "Explore the catalogue and add models or colourways. Combine them until you reach 50 pieces.",
    catalog: "Go to catalogue",
    quantity: "Quantity",
    remove: "Remove",
    clientTitle: "Optical practice or company details",
    clientIntro: "Required fields will be included in the PDF and the message for Innova.",
    name: "Full name",
    company: "Company / legal name",
    optical: "Optical practice name",
    email: "Professional email",
    phone: "Phone (+ country code)",
    city: "City",
    country: "Country",
    notes: "Notes",
    required: "Complete the required details and reach 50 pieces to enable submission.",
    valid: "Selection complete and ready for commercial review.",
    pdf: "Download selection PDF",
    whatsapp: "Download PDF and open WhatsApp",
    emailAction: "Download PDF and prepare email",
    note: "Manually attach the downloaded PDF before sending. Innova will review availability, commercial terms and shipping before any order is confirmed.",
    pdfTitle: "ALFRED KERBS SELECTION FOR REVIEW",
    clientData: "PROFESSIONAL DETAILS",
    products: "SELECTED PRODUCTS",
    summary: "SUMMARY",
    finalNote: "Preliminary document: this is not a confirmed order. Innova Eyewear will review the account, inventory and commercial terms.",
    preparedWhatsapp: "PDF downloaded. Attach it to the WhatsApp message.",
    preparedEmail: "PDF downloaded. Attach it to the prepared email.",
    error: "The file could not be prepared. Please try again.",
  },
  fr: {
    button: "Ma sélection",
    kicker: "SÉLECTION PROFESSIONNELLE",
    title: "Sélection Alfred Kerbs à soumettre",
    intro: "Sélectionnez les références et les quantités. Innova étudiera la disponibilité, les conditions commerciales et l’expédition avant de formaliser toute commande.",
    close: "Fermer la sélection",
    references: "références",
    units: "pièces",
    minimum: "Seuil professionnel : 50 pièces",
    ready: "La sélection atteint le seuil professionnel.",
    remaining: (count: number) => `Il manque ${count} pièces pour atteindre le seuil professionnel.`,
    emptyTitle: "Aucun produit sélectionné.",
    emptyText: "Explorez le catalogue et ajoutez des modèles ou des coloris jusqu’à atteindre 50 pièces.",
    catalog: "Voir le catalogue",
    quantity: "Quantité",
    remove: "Retirer",
    clientTitle: "Coordonnées du point de vente ou de l’entreprise",
    clientIntro: "Les champs obligatoires seront inclus dans le dossier PDF destiné à Innova.",
    name: "Nom et prénom",
    company: "Entreprise / raison sociale",
    optical: "Nom du point de vente",
    email: "E-mail professionnel",
    phone: "Téléphone (+ indicatif du pays)",
    city: "Ville",
    country: "Pays",
    notes: "Observations",
    required: "Complétez les données obligatoires et atteignez 50 pièces pour pouvoir transmettre la sélection.",
    valid: "Sélection complète et prête pour l’étude commerciale.",
    pdf: "Télécharger la sélection en PDF",
    whatsapp: "Télécharger la sélection et ouvrir WhatsApp",
    emailAction: "Télécharger la sélection et préparer l’e-mail",
    note: "Joignez manuellement le PDF téléchargé. Innova étudiera la disponibilité, les conditions commerciales et le transport avant de formaliser toute commande.",
    pdfTitle: "SÉLECTION ALFRED KERBS POUR ÉTUDE COMMERCIALE",
    clientData: "COORDONNÉES PROFESSIONNELLES",
    products: "PRODUITS SÉLECTIONNÉS",
    summary: "RÉSUMÉ",
    finalNote: "Document préliminaire : cette sélection ne constitue pas une commande. Innova Eyewear étudiera le compte, le stock et les conditions commerciales avant toute confirmation.",
    preparedWhatsapp: "Le dossier PDF a été téléchargé. Joignez-le au message WhatsApp.",
    preparedEmail: "Le dossier PDF a été téléchargé. Joignez-le à l’e-mail préparé.",
    error: "Le fichier n’a pas pu être préparé. Veuillez réessayer.",
  },
};

const validationCopy = {
  es: {
    required: "Este campo es obligatorio.",
    emailRequired: "El correo profesional es obligatorio.",
    emailInvalid: "Usa un correo completo, por ejemplo nombre@empresa.com.",
    phoneRequired: "El teléfono es obligatorio.",
    phoneInvalid: "Incluye +, el código del país y al menos 7 dígitos.",
    cannotDownload: "No se puede descargar todavía.",
    addProducts: "Añade productos a la selección.",
    minimum: (count: number) => `Faltan ${count} piezas para completar el mínimo.`,
    review: (fields: string) => `Revisa: ${fields}.`,
    labels: {
      name: "nombre y apellido",
      company: "empresa",
      optical: "nombre de la óptica",
      email: "correo profesional",
      phone: "teléfono",
      city: "ciudad",
      country: "país",
    },
  },
  en: {
    required: "This field is required.",
    emailRequired: "Professional email is required.",
    emailInvalid: "Use a complete email, for example name@company.com.",
    phoneRequired: "Phone number is required.",
    phoneInvalid: "Include +, the country code and at least 7 digits.",
    cannotDownload: "The PDF cannot be downloaded yet.",
    addProducts: "Add products to the selection.",
    minimum: (count: number) => `${count} more pieces are needed to meet the minimum.`,
    review: (fields: string) => `Review: ${fields}.`,
    labels: {
      name: "full name",
      company: "company",
      optical: "optical-store name",
      email: "professional email",
      phone: "phone",
      city: "city",
      country: "country",
    },
  },
  fr: {
    required: "Ce champ est obligatoire.",
    emailRequired: "L’e-mail professionnel est obligatoire.",
    emailInvalid: "Utilisez un e-mail complet, par exemple nom@entreprise.com.",
    phoneRequired: "Le téléphone est obligatoire.",
    phoneInvalid: "Indiquez +, l’indicatif du pays et au moins 7 chiffres.",
    cannotDownload: "Le PDF ne peut pas encore être téléchargé.",
    addProducts: "Ajoutez des produits à la sélection.",
    minimum: (count: number) => `Il manque ${count} pièces pour atteindre le seuil professionnel.`,
    review: (fields: string) => `À vérifier : ${fields}.`,
    labels: {
      name: "nom et prénom",
      company: "entreprise",
      optical: "nom du point de vente",
      email: "e-mail professionnel",
      phone: "téléphone",
      city: "ville",
      country: "pays",
    },
  },
};

const OrderContext = createContext<OrderContextValue | null>(null);

function newOrderNumber() {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replaceAll("-", "");
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AK-${date}-${suffix}`;
}

function variantMeasurements(product: Product, variantIndex: number) {
  return Object.entries(product.variants[variantIndex]?.dimensions ?? {})
    .map(([label, value]) => `${label}: ${value}`)
    .join(" · ");
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1800);
}

function syncBoutiqueOrder(items: OrderItem[], client: ClientData) {
  const targetOrigin = new URL(INNOVA_BOUTIQUE_URL).origin;
  const payload = {
    type: "innova-boutique:replace-brand",
    brand: "alfred-kerbs",
    client,
    items: items.map((item) => ({
      key: `alfred-kerbs:${item.sku}`,
      brand: "alfred-kerbs",
      productId: item.productId,
      name: item.model,
      sku: item.sku,
      color: item.color,
      material: item.material,
      measurements: item.measurements,
      collection: item.collection,
      quantity: item.quantity,
      image: item.image ? new URL(item.image, window.location.origin).href : "",
      catalogUrl: new URL(`/catalogo/${item.slug}`, window.location.origin).href,
    })),
  };

  // When Alfred Kerbs is opened through innova-boutique.com, the first-party
  // wrapper stores the full brand order without relying on partitioned iframe storage.
  if (window.parent !== window) window.parent.postMessage(payload, targetOrigin);

  const bridge = document.querySelector<HTMLIFrameElement>(".innova-boutique-order-bridge");
  if (!bridge) return;
  const send = () => bridge.contentWindow?.postMessage(payload, targetOrigin);
  if (bridge.dataset.ready === "true") send();
  else bridge.addEventListener("load", send, { once: true });
}

async function imageAsJpegDataUrl(source: string) {
  const response = await fetch(source);
  const bitmap = await createImageBitmap(await response.blob());
  const canvas = document.createElement("canvas");
  const scale = Math.min(1, 900 / Math.max(bitmap.width, bitmap.height));
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas unavailable");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.82);
}

export function ProfessionalOrderProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideOrderUi = pathname.startsWith("/admin");
  const { locale } = useLanguage();
  const copy = orderCopy[locale];
  const validation = validationCopy[locale];
  const [items, setItems] = useState<OrderItem[]>([]);
  const [client, setClient] = useState<ClientData>(emptyClient);
  const [orderNumber, setOrderNumber] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [working, setWorking] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null") as StoredOrder | null;
      if (saved?.items && Array.isArray(saved.items)) {
        queueMicrotask(() => {
          setItems(saved.items);
          setClient({ ...emptyClient, ...saved.client });
          setOrderNumber(saved.orderNumber || newOrderNumber());
        });
        return;
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    queueMicrotask(() => setOrderNumber(newOrderNumber()));
  }, []);

  useEffect(() => {
    if (!orderNumber) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, client, orderNumber }));
  }, [client, items, orderNumber]);

  useEffect(() => {
    syncBoutiqueOrder(items, client);
  }, [client, items]);

  const totalUnits = items.reduce((total, item) => total + item.quantity, 0);
  type RequiredClientField = Exclude<keyof ClientData, "notes">;
  const clientErrors: Partial<Record<RequiredClientField, string>> = {};
  (["name", "company", "optical", "city", "country"] as const).forEach((field) => {
    if (!client[field].trim()) clientErrors[field] = validation.required;
  });
  if (!client.email.trim()) clientErrors.email = validation.emailRequired;
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client.email.trim())) clientErrors.email = validation.emailInvalid;
  const phoneValid = /^\+\d[\d\s().-]{6,}$/.test(client.phone.trim());
  if (!client.phone.trim()) clientErrors.phone = validation.phoneRequired;
  else if (!phoneValid) clientErrors.phone = validation.phoneInvalid;
  const ready = totalUnits >= MINIMUM_ORDER_UNITS
    && items.length > 0
    && Object.keys(clientErrors).length === 0;
  const issueFields = (Object.keys(clientErrors) as RequiredClientField[])
    .map((field) => validation.labels[field])
    .join(", ");
  const validationBlockers = [
    !items.length ? validation.addProducts : "",
    items.length > 0 && totalUnits < MINIMUM_ORDER_UNITS
      ? validation.minimum(MINIMUM_ORDER_UNITS - totalUnits)
      : "",
    issueFields ? validation.review(issueFields) : "",
  ].filter(Boolean);
  const validationMessage = ready
    ? copy.valid
    : `${validation.cannotDownload} ${validationBlockers.join(" ")}`;

  function addProduct(product: Product, variantIndex = 0, quantity = 1) {
    const variant = product.variants[variantIndex] ?? product.variants[0];
    const key = `${product.id}:${variant.sap_reference}`;
    const image = variant.images.find((item) => item.view === "frontal") ?? variant.images[0];
    const safeQuantity = Math.max(1, Math.min(999, Math.floor(quantity) || 1));
    setItems((current) => {
      const found = current.find((item) => item.key === key);
      if (found) {
        return current.map((item) =>
          item.key === key ? { ...item, quantity: Math.min(9999, item.quantity + safeQuantity) } : item,
        );
      }
      return [
        ...current,
        {
          key,
          productId: product.id,
          slug: product.slug,
          model: product.name,
          category: product.category_label,
          collection: product.collection,
          sku: variant.sap_reference,
          colorCode: variant.reference,
          color: variant.color,
          material: variant.materials.join(" + "),
          measurements: variantMeasurements(product, variantIndex),
          image: image ? catalogImageUrl(image.local_path) : "",
          quantity: safeQuantity,
        },
      ];
    });
  }

  function updateQuantity(key: string, quantity: number) {
    if (quantity < 1) {
      setItems((current) => current.filter((item) => item.key !== key));
      return;
    }
    setItems((current) =>
      current.map((item) => item.key === key ? { ...item, quantity: Math.min(9999, quantity) } : item),
    );
  }

  function fileSlug() {
    const company = (client.optical || client.company || "cliente")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60);
    return `${orderNumber.toLowerCase()}-alfred-kerbs-${company}`;
  }

  async function pdfBlob() {
    const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
    const document = await PDFDocument.create();
    const regular = await document.embedFont(StandardFonts.Helvetica);
    const bold = await document.embedFont(StandardFonts.HelveticaBold);
    const pageWidth = 595.28;
    const pageHeight = 841.89;
    const margin = 43;
    const safe = (value: string) => value
      .replaceAll("·", "-")
      .replaceAll("—", "-")
      .replaceAll("–", "-")
      .replaceAll("’", "'")
      .replaceAll("…", "...");

    function wrap(value: string, maxWidth: number, size: number, font = regular) {
      const words = safe(value).split(/\s+/);
      const lines: string[] = [];
      let line = "";
      for (const word of words) {
        const candidate = line ? `${line} ${word}` : word;
        if (font.widthOfTextAtSize(candidate, size) <= maxWidth || !line) line = candidate;
        else {
          lines.push(line);
          line = word;
        }
      }
      if (line) lines.push(line);
      return lines;
    }

    async function embedJpeg(source: string) {
      const dataUrl = await imageAsJpegDataUrl(source);
      return document.embedJpg(await fetch(dataUrl).then((response) => response.arrayBuffer()));
    }

    const [brandLogo, innovaLogo] = await Promise.all([
      embedJpeg("/media/brand/logo-dark.png").catch(() => null),
      embedJpeg("/media/brand/innova-logo.png").catch(() => null),
    ]);

    function addPage() {
      const page = document.addPage([pageWidth, pageHeight]);
      page.drawRectangle({
        x: 0,
        y: pageHeight - 82,
        width: pageWidth,
        height: 82,
        color: rgb(0.961, 0.953, 0.945),
      });
      page.drawLine({
        start: { x: 0, y: pageHeight - 82 },
        end: { x: pageWidth, y: pageHeight - 82 },
        thickness: 1.8,
        color: rgb(0.137, 0.122, 0.125),
      });
      if (brandLogo) {
        const dims = brandLogo.scaleToFit(150, 34);
        page.drawImage(brandLogo, { x: margin, y: pageHeight - 57, width: dims.width, height: dims.height });
      }
      if (innovaLogo) {
        const dims = innovaLogo.scaleToFit(106, 45);
        page.drawImage(innovaLogo, { x: pageWidth - margin - dims.width, y: pageHeight - 62, width: dims.width, height: dims.height });
      }
      return page;
    }

    let page = addPage();
    let y = pageHeight - 122;
    page.drawText(safe(copy.pdfTitle), { x: margin, y, size: 18, font: bold, color: rgb(0.137, 0.122, 0.125) });
    y -= 18;
    page.drawText(`${orderNumber} - ${new Date().toLocaleDateString(locale)}`, { x: margin, y, size: 8, font: regular, color: rgb(0.36, 0.34, 0.34) });
    y -= 31;
    page.drawText(safe(copy.clientData), { x: margin, y, size: 9, font: bold, color: rgb(0.137, 0.122, 0.125) });
    page.drawText(safe(copy.summary), { x: 335, y, size: 9, font: bold, color: rgb(0.137, 0.122, 0.125) });
    y -= 16;
    const clientLines = [
      `${copy.name}: ${client.name}`,
      `${copy.company}: ${client.company}`,
      `${copy.optical}: ${client.optical}`,
      `${copy.email}: ${client.email}`,
      `${copy.phone}: ${client.phone}`,
      `${copy.city}: ${client.city} - ${copy.country}: ${client.country}`,
    ];
    clientLines.forEach((line, index) => {
      page.drawText(safe(line), { x: margin, y: y - index * 13, size: 8, font: regular });
    });
    [
      `${items.length} ${copy.references}`,
      `${totalUnits} ${copy.units}`,
      copy.minimum,
    ].forEach((line, index) => {
      page.drawText(safe(line), { x: 335, y: y - index * 13, size: 8, font: regular });
    });
    y -= 88;
    page.drawText(safe(copy.products), { x: margin, y, size: 9, font: bold });
    y -= 15;

    for (const item of items) {
      if (y < 115) {
        page = addPage();
        y = pageHeight - 115;
      }
      const rowHeight = 72;
      page.drawRectangle({
        x: margin,
        y: y - rowHeight + 9,
        width: pageWidth - margin * 2,
        height: rowHeight,
        color: rgb(0.98, 0.976, 0.972),
      });
      if (item.image) {
        const productImage = await embedJpeg(item.image).catch(() => null);
        if (productImage) {
          const dims = productImage.scaleToFit(115, 57);
          page.drawImage(productImage, {
            x: margin + 5,
            y: y - rowHeight + 16 + (57 - dims.height) / 2,
            width: dims.width,
            height: dims.height,
          });
        }
      }
      page.drawText(safe(item.model), { x: margin + 132, y: y - 12, size: 10, font: bold });
      page.drawText(safe(`${item.sku} - ${item.colorCode} - ${item.color}`), { x: margin + 132, y: y - 28, size: 7.5, font: regular });
      wrap(`${item.material || "-"} - ${item.measurements || "-"}`, 245, 7, regular).slice(0, 2).forEach((line, index) => {
        page.drawText(line, { x: margin + 132, y: y - 42 - index * 10, size: 7, font: regular });
      });
      page.drawText(String(item.quantity), { x: pageWidth - margin - 36, y: y - 27, size: 16, font: bold });
      page.drawText(safe(copy.units.toUpperCase()), { x: pageWidth - margin - 40, y: y - 42, size: 6.5, font: regular });
      y -= rowHeight + 8;
    }

    if (y < 120) {
      page = addPage();
      y = pageHeight - 120;
    }
    page.drawRectangle({
      x: margin,
      y: y - 72,
      width: pageWidth - margin * 2,
      height: 72,
      color: rgb(0.937, 0.925, 0.914),
    });
    page.drawText("INNOVA EYEWEAR", { x: margin + 12, y: y - 18, size: 8, font: bold });
    wrap(copy.finalNote, pageWidth - margin * 2 - 24, 7.5, regular).forEach((line, index) => {
      page.drawText(line, { x: margin + 12, y: y - 35 - index * 10, size: 7.5, font: regular });
    });

    const pages = document.getPages();
    pages.forEach((currentPage, index) => {
      currentPage.drawLine({
        start: { x: margin, y: 39 },
        end: { x: pageWidth - margin, y: 39 },
        thickness: 0.5,
        color: rgb(0.84, 0.82, 0.81),
      });
      currentPage.drawText(`${orderNumber} - ${INNOVA_EMAIL} - innova-eyewear.com`, {
        x: margin,
        y: 23,
        size: 7,
        font: regular,
        color: rgb(0.36, 0.34, 0.34),
      });
      currentPage.drawText(`${index + 1}/${pages.length}`, {
        x: pageWidth - margin - 18,
        y: 23,
        size: 7,
        font: regular,
        color: rgb(0.36, 0.34, 0.34),
      });
    });

    const bytes = await document.save();
    const safeBuffer = new Uint8Array(bytes.byteLength);
    safeBuffer.set(bytes);
    return new Blob([safeBuffer.buffer], { type: "application/pdf" });
  }

  function professionalMessage() {
    const productLines = items.map(
      (item) => `• ${item.model} | ${item.sku} | ${item.color} | ${item.quantity} ${copy.units}`,
    );
    return [
      copy.pdfTitle,
      orderNumber,
      "",
      `${copy.name}: ${client.name}`,
      `${copy.company}: ${client.company}`,
      `${copy.optical}: ${client.optical}`,
      `${copy.email}: ${client.email}`,
      `${copy.phone}: ${client.phone}`,
      `${copy.city}: ${client.city}`,
      `${copy.country}: ${client.country}`,
      "",
      `${items.length} ${copy.references} · ${totalUnits} ${copy.units}`,
      ...productLines,
      "",
      client.notes ? `${copy.notes}: ${client.notes}` : "",
      `Adjuntar / Attach: ${fileSlug()}.pdf`,
    ].filter(Boolean).join("\n");
  }

  async function runAction(action: "pdf" | "whatsapp" | "email") {
    if (!ready || working) return;
    setWorking(true);
    setMessage("");
    try {
      const pdf = await pdfBlob();
      downloadBlob(pdf, `${fileSlug()}.pdf`);
      if (action === "whatsapp") {
        window.open(`https://wa.me/${INNOVA_WHATSAPP}?text=${encodeURIComponent(professionalMessage())}`, "_blank", "noopener,noreferrer");
        setMessage(copy.preparedWhatsapp);
      } else if (action === "email") {
        window.location.href = `mailto:${INNOVA_EMAIL}?subject=${encodeURIComponent(`${orderNumber} · Alfred Kerbs · ${client.optical}`)}&body=${encodeURIComponent(professionalMessage())}`;
        setMessage(copy.preparedEmail);
      }
    } catch {
      setMessage(copy.error);
    } finally {
      setWorking(false);
    }
  }

  const contextValue = useMemo<OrderContextValue>(() => ({
    items,
    totalUnits,
    open: () => setDrawerOpen(true),
    addProduct,
    hasVariant: (product, variantIndex = 0) => {
      const variant = product.variants[variantIndex] ?? product.variants[0];
      return items.some((item) => item.key === `${product.id}:${variant.sap_reference}`);
    },
  }), [items, totalUnits]);

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
      <iframe
        aria-hidden="true"
        className="innova-boutique-order-bridge"
        onLoad={(event) => { event.currentTarget.dataset.ready = "true"; }}
        src={`${INNOVA_BOUTIQUE_URL}/bridge.html`}
        tabIndex={-1}
        title="Sincronización de pedido Innova Boutique"
      />
      {!hideOrderUi && (
        <button className="order-fab" type="button" onClick={() => setDrawerOpen(true)} aria-label={copy.button}>
          <span>{copy.button}</span>
          <b>{totalUnits}</b>
        </button>
      )}
      {!hideOrderUi && drawerOpen && (
        <div
          className="drawer-backdrop order-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setDrawerOpen(false);
          }}
        >
          <aside className="order-drawer" role="dialog" aria-modal="true" aria-label={copy.title}>
            <header className="order-drawer__header">
              <div>
                <span className="eyebrow">{copy.kicker}</span>
                <h2>{copy.title}</h2>
                <p>{copy.intro}</p>
                <small>{orderNumber}</small>
              </div>
              <button type="button" onClick={() => setDrawerOpen(false)} aria-label={copy.close}>×</button>
            </header>
            <div className="order-progress">
              <div><strong>{items.length}</strong> {copy.references} · <strong>{totalUnits}</strong> {copy.units}</div>
              <div className="order-progress__track"><i style={{ width: `${Math.min(100, totalUnits / MINIMUM_ORDER_UNITS * 100)}%` }} /></div>
              <div><span>{totalUnits >= MINIMUM_ORDER_UNITS ? copy.ready : copy.remaining(MINIMUM_ORDER_UNITS - totalUnits)}</span><b>{copy.minimum}</b></div>
            </div>
            <div className="order-drawer__body">
              <section className="order-items">
                {items.map((item) => (
                  <article key={item.key}>
                    <Link href={`/catalogo/${item.slug}`} onClick={() => setDrawerOpen(false)}>
                      {item.image && <Image src={item.image} alt="" width={112} height={66} />}
                    </Link>
                    <div>
                      <strong>{item.model}</strong>
                      <span>{item.sku} · {item.color}</span>
                      <label>
                        <span>{copy.quantity}</span>
                        <input
                          type="number"
                          min={1}
                          max={9999}
                          value={item.quantity}
                          onChange={(event) => {
                            if (event.target.value === "") return;
                            updateQuantity(item.key, Number(event.target.value));
                          }}
                        />
                      </label>
                    </div>
                    <button type="button" onClick={() => updateQuantity(item.key, 0)} aria-label={`${copy.remove} ${item.model}`}>×</button>
                  </article>
                ))}
                {!items.length && (
                  <div className="order-empty">
                    <h3>{copy.emptyTitle}</h3>
                    <p>{copy.emptyText}</p>
                    <Link className="button button--dark" href="/catalogo" onClick={() => setDrawerOpen(false)}>{copy.catalog}</Link>
                  </div>
                )}
              </section>
              <section className="order-client">
                <h3>{copy.clientTitle}</h3>
                <p>{copy.clientIntro}</p>
                <div className="order-client__grid">
                  {([
                    ["name", copy.name, true, "text"],
                    ["company", copy.company, true, "text"],
                    ["optical", copy.optical, true, "text"],
                    ["email", copy.email, true, "email"],
                    ["phone", copy.phone, true, "tel"],
                    ["city", copy.city, true, "text"],
                    ["country", copy.country, true, "text"],
                  ] as const).map(([field, label, required, type]) => (
                    <label key={field} className={clientErrors[field] ? "has-error" : undefined}>
                      <span>{label}{required ? " *" : ""}</span>
                      <input
                        type={type}
                        value={client[field]}
                        onChange={(event) => setClient((current) => ({ ...current, [field]: event.target.value }))}
                        aria-invalid={clientErrors[field] ? true : undefined}
                        aria-describedby={clientErrors[field] ? `order-client-error-${field}` : undefined}
                        required={required}
                        placeholder={field === "email" ? "nombre@empresa.com" : field === "phone" ? "+1 754 000 0000" : undefined}
                        inputMode={field === "email" ? "email" : field === "phone" ? "tel" : undefined}
                        autoComplete={field === "email" ? "email" : field === "phone" ? "tel" : undefined}
                        pattern={field === "phone" ? "\\+[0-9][0-9\\s().-]{6,}" : undefined}
                      />
                      <small id={`order-client-error-${field}`}>{clientErrors[field]}</small>
                    </label>
                  ))}
                  <label className="order-client__notes">
                    <span>{copy.notes}</span>
                    <textarea
                      rows={3}
                      value={client.notes}
                      onChange={(event) => setClient((current) => ({ ...current, notes: event.target.value }))}
                    />
                  </label>
                </div>
              </section>
              <section className="order-actions">
                <p className={ready ? "is-ready" : ""} role="status">{validationMessage}</p>
                <button className="button button--dark" disabled={!ready || working} onClick={() => runAction("pdf")}>{copy.pdf}</button>
                <button className="button order-button--whatsapp" disabled={!ready || working} onClick={() => runAction("whatsapp")}>{copy.whatsapp}</button>
                <button className="button button--outline" disabled={!ready || working} onClick={() => runAction("email")}>{copy.emailAction}</button>
                <small>{copy.note}</small>
                {message && <div className="admin-notice" role="status">{message}</div>}
              </section>
            </div>
          </aside>
        </div>
      )}
    </OrderContext.Provider>
  );
}

export function useProfessionalOrder() {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useProfessionalOrder debe usarse dentro de ProfessionalOrderProvider.");
  return context;
}

export function OpenOrderButton({ className = "button button--dark", children = "Preparar pedido" }: { className?: string; children?: ReactNode }) {
  const order = useProfessionalOrder();
  return <button className={className} type="button" onClick={order.open}>{children}</button>;
}
