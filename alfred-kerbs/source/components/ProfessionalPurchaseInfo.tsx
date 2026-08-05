"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { OpenOrderButton } from "./ProfessionalOrderProvider";

type Copy = {
  homeKicker: string;
  homeTitle: string;
  intro: string;
  referenceTitle: string;
  referenceText: string;
  referenceNote: string;
  processKicker: string;
  processTitle: string;
  steps: Array<{ title: string; text: string }>;
  faqKicker: string;
  faqTitle: string;
  faqIntro: string;
  confirmationTitle: string;
  groups: Array<{ title: string; items: Array<[string, string]> }>;
  closingTitle: string;
  closingText: string;
  openOrder: string;
  viewCatalog: string;
};

const copy: Record<"es" | "en" | "fr", Copy> = {
  es: {
    homeKicker: "COMPRA PARA ÓPTICAS · INNOVA EYEWEAR",
    homeTitle: "Todo lo necesario para preparar tu primer pedido.",
    intro: "Selecciona modelos y colores directamente en el catálogo. Innova revisa la cuenta comercial, confirma inventario, condiciones comerciales y transporte antes de formalizar la operación.",
    referenceTitle: "Pedido mayorista mínimo: 50 piezas",
    referenceText: "Puedes combinar modelos ópticos, solares y variantes de color hasta completar las 50 piezas.",
    referenceNote: "La selección queda pendiente de validación de inventario y condiciones comerciales por Innova Eyewear.",
    processKicker: "PROCESO DE COMPRA",
    processTitle: "De la selección al pedido para revisión.",
    steps: [
      { title: "Selecciona", text: "Añade monturas ópticas o solares y elige la cantidad de cada color." },
      { title: "Combina", text: "Mezcla modelos y referencias hasta alcanzar el mínimo mayorista de 50 piezas." },
      { title: "Completa", text: "Indica los datos de la óptica, empresa y persona responsable del pedido." },
      { title: "Envía", text: "Genera el PDF o prepara el envío por WhatsApp o correo para la revisión de Innova." },
    ],
    faqKicker: "INFORMACIÓN COMERCIAL",
    faqTitle: "Preguntas frecuentes para ópticas.",
    faqIntro: "Condiciones esenciales para preparar una selección informada y enviarla correctamente.",
    confirmationTitle: "Confirmación",
    groups: [
      {
        title: "Pedido y surtido",
        items: [
          ["¿Quién puede comprar?", "El catálogo está dirigido a ópticas, cadenas, departamentos ópticos y empresas del sector sujetas a validación comercial de Innova Eyewear."],
          ["¿Cuál es la compra mínima inicial?", "El pedido mayorista mínimo es de 50 piezas. Se pueden combinar modelos ópticos, solares, colores y cantidades."],
          ["¿Puedo elegir cada referencia?", "Sí. La herramienta permite seleccionar el modelo, el color y la cantidad. La disponibilidad definitiva se confirma al revisar el pedido."],
        ],
      },
      {
        title: "Confirmación comercial",
        items: [
          ["¿Cómo se confirman las condiciones comerciales?", "Innova revisa cada selección según país, disponibilidad, volumen y condiciones aplicables a la cuenta profesional."],
          ["¿Qué ocurre después de enviar el pedido?", "Innova revisa los datos de la óptica, valida inventario y condiciones, y coordina los siguientes pasos con el equipo responsable."],
          ["¿Puedo consultar disponibilidad antes de pagar?", "Sí. Ninguna selección se considera confirmada hasta que Innova valida las referencias y comunica la disponibilidad."],
        ],
      },
      {
        title: "Entrega y soporte",
        items: [
          ["¿El envío está incluido?", "No se ofrece envío gratuito de forma automática. El coste y la modalidad se confirman según destino, volumen y condiciones logísticas."],
          ["¿Qué documentos genera la web?", "Puedes descargar el pedido completo en PDF y prepararlo para enviarlo por WhatsApp o correo."],
          ["¿Cómo se gestiona una incidencia?", "La óptica debe informar a Innova con la referencia y evidencia disponible. Cada caso se revisa según las condiciones aplicables a Alfred Kerbs."],
          ["¿Puedo solicitar reposiciones?", "Sí, sujetas a inventario y condiciones comerciales vigentes. Innova confirma cada reposición antes de formalizarla."],
        ],
      },
    ],
    closingTitle: "Construye una selección lista para revisar.",
    closingText: "Elige referencias, alcanza 50 piezas y envía un pedido organizado al equipo de Innova Eyewear.",
    openOrder: "Abrir mi pedido",
    viewCatalog: "Ver catálogo",
  },
  en: {
    homeKicker: "PROFESSIONAL SELECTION · INNOVA EYEWEAR",
    homeTitle: "Everything you need to prepare your first selection.",
    intro: "Select models and colourways directly from the catalogue. Innova reviews the professional account, availability, commercial terms and shipping before any order is confirmed.",
    referenceTitle: "Professional minimum: 50 pieces",
    referenceText: "Combine optical models, sunglasses and colour variants until the 50-piece minimum is complete.",
    referenceNote: "The selection remains subject to inventory and commercial validation by Innova Eyewear.",
    processKicker: "SELECTION PROCESS",
    processTitle: "From curation to commercial review.",
    steps: [
      { title: "Select", text: "Add optical frames or sunglasses and choose the quantity for each colour." },
      { title: "Combine", text: "Build your assortment of models and references until the professional minimum of 50 pieces is reached." },
      { title: "Complete", text: "Enter the optical practice, company and selection-contact details." },
      { title: "Send", text: "Generate the PDF or prepare WhatsApp or email delivery for Innova’s review." },
    ],
    faqKicker: "COMMERCIAL INFORMATION",
    faqTitle: "Frequently asked questions for optical professionals.",
    faqIntro: "Essential conditions for preparing an informed selection and submitting it correctly.",
    confirmationTitle: "Confirmation",
    groups: [
      {
        title: "Selection and assortment",
        items: [
          ["Who is this catalogue for?", "The catalogue is intended for optical practices, groups, optical departments and industry businesses subject to Innova Eyewear’s commercial validation."],
          ["What is the initial professional minimum?", "The professional minimum is 50 pieces. Optical and sun models, colourways and quantities may be combined."],
          ["Can I choose every reference?", "Yes. The tool lets you select model, colourway and quantity. Final availability is confirmed during commercial review."],
        ],
      },
      {
        title: "Commercial confirmation",
        items: [
          ["How are commercial terms confirmed?", "Innova reviews each selection according to country, availability, volume and the terms applicable to the professional account."],
          ["What happens after submitting the selection?", "Innova reviews the optical-practice details, validates availability and terms, and coordinates the next steps with the responsible team."],
          ["Can availability be checked before payment?", "Yes. No selection is confirmed until Innova validates the references and communicates availability."],
        ],
      },
      {
        title: "Delivery and support",
        items: [
          ["Is shipping included?", "Free shipping is not automatically offered. Cost and method are confirmed according to destination, volume and logistics conditions."],
          ["Which documents does the site generate?", "You can download the complete selection as a PDF and prepare it for WhatsApp or email."],
          ["How is an issue handled?", "The optical practice should contact Innova with the reference and available evidence. Each case is reviewed under the applicable Alfred Kerbs terms."],
          ["Can I request replenishment?", "Yes, subject to inventory and current commercial terms. Innova confirms every replenishment before it is formalised."],
        ],
      },
    ],
    closingTitle: "Build a selection ready for review.",
    closingText: "Choose references, reach 50 pieces and send an organised selection to the Innova Eyewear team.",
    openOrder: "Open my selection",
    viewCatalog: "View catalogue",
  },
  fr: {
    homeKicker: "SÉLECTION PROFESSIONNELLE · INNOVA EYEWEAR",
    homeTitle: "Préparez une sélection adaptée à votre point de vente.",
    intro: "Composez votre sélection de modèles et de coloris dans le catalogue. Innova étudie le compte professionnel, le stock, les conditions commerciales et l’expédition avant de formaliser toute commande.",
    referenceTitle: "Seuil professionnel minimum : 50 pièces",
    referenceText: "Associez montures optiques, lunettes de soleil et variantes de coloris jusqu’au seuil professionnel de 50 pièces.",
    referenceNote: "La sélection reste soumise à la validation du stock et des conditions commerciales par Innova Eyewear.",
    processKicker: "PARCOURS DE SÉLECTION",
    processTitle: "De la sélection à l’étude commerciale.",
    steps: [
      { title: "Sélectionnez", text: "Ajoutez des montures optiques ou des lunettes de soleil et choisissez la quantité de chaque coloris." },
      { title: "Associez", text: "Composez votre assortiment de modèles et de références jusqu’au seuil professionnel de 50 pièces." },
      { title: "Complétez", text: "Renseignez le point de vente, l’entreprise et la personne responsable de la sélection." },
      { title: "Transmettez", text: "Générez le dossier PDF ou préparez son envoi pour l’étude d’Innova." },
    ],
    faqKicker: "INFORMATIONS COMMERCIALES",
    faqTitle: "Questions fréquentes des professionnels de l’optique.",
    faqIntro: "Les conditions essentielles pour préparer et transmettre votre sélection professionnelle.",
    confirmationTitle: "Confirmation",
    groups: [
      {
        title: "Sélection et assortiment",
        items: [
          ["À quels professionnels ce catalogue s’adresse-t-il ?", "Le catalogue s’adresse aux professionnels de l’optique, enseignes, départements optiques et entreprises du secteur, sous réserve de l’étude commerciale d’Innova Eyewear."],
          ["Quel est le seuil professionnel ?", "Le seuil professionnel minimum est de 50 pièces. Montures optiques, lunettes de soleil, coloris et quantités peuvent être associés."],
          ["Puis-je choisir chaque référence ?", "Oui. L’outil permet de choisir le modèle, le coloris et la quantité. La disponibilité finale est confirmée après l’étude commerciale d’Innova."],
        ],
      },
      {
        title: "Étude commerciale",
        items: [
          ["Comment les conditions commerciales sont-elles confirmées ?", "Innova examine chaque sélection selon le pays, le stock, le volume et les conditions applicables au compte professionnel."],
          ["Que se passe-t-il après l’envoi ?", "Innova étudie les données du point de vente, le stock et les conditions, puis coordonne les étapes suivantes avec l’équipe responsable."],
          ["Quand la disponibilité est-elle confirmée ?", "La disponibilité est communiquée après l’étude des références par Innova. Aucune commande n’est formalisée avant cette confirmation."],
        ],
      },
      {
        title: "Livraison et assistance",
        items: [
          ["La livraison est-elle incluse ?", "Les frais et le mode de livraison sont confirmés selon la destination, le volume et les conditions logistiques applicables."],
          ["Quels documents sont générés ?", "Vous pouvez télécharger un dossier PDF récapitulant votre sélection et le transmettre à Innova pour étude."],
          ["Comment gérer un incident ?", "Le point de vente doit contacter Innova avec la référence et les éléments disponibles. Chaque cas est examiné selon les conditions Alfred Kerbs applicables."],
          ["Puis-je demander un réassort ?", "Oui, sous réserve du stock et des conditions en vigueur. Innova confirme chaque réassort avant de formaliser la commande."],
        ],
      },
    ],
    closingTitle: "Composez une sélection prête pour l’étude commerciale.",
    closingText: "Choisissez les références, atteignez 50 pièces et transmettez un dossier structuré à Innova Eyewear.",
    openOrder: "Ouvrir ma sélection",
    viewCatalog: "Voir le catalogue",
  },
};

export function ProfessionalPurchaseInfo({ placement = "home" }: { placement?: "home" | "product" }) {
  const { locale } = useLanguage();
  const text = copy[locale];
  const isProduct = placement === "product";
  const faqContent = (
    <div className="purchase-faq">
      <div className="purchase-heading">
        <span className="eyebrow">{text.faqKicker}</span>
        <h2>{text.faqTitle}</h2>
        <p>{text.faqIntro}</p>
      </div>
      <div className="purchase-faq__grid">
        {text.groups.map((group, groupIndex) => (
          <section key={group.title}>
            <h3>{isProduct && groupIndex === 1 ? text.confirmationTitle : group.title}</h3>
            {group.items.map(([question, answer], itemIndex) => (
              <details key={question} open={groupIndex === 0 && itemIndex === 0}>
                <summary>{question}<span aria-hidden="true" /></summary>
                <p>{answer}</p>
              </details>
            ))}
          </section>
        ))}
      </div>
    </div>
  );

  if (isProduct) {
    return (
      <section className="professional-purchase professional-purchase--product" id="preguntas-compra">
        {faqContent}
      </section>
    );
  }

  return (
    <section
      className={`professional-purchase professional-purchase--${placement}`}
      id="pedido-profesional"
    >
      <div className="purchase-overview">
        <div className="purchase-reference">
          <div>
            <span className="eyebrow">{text.homeKicker}</span>
            <h2>{text.homeTitle}</h2>
          </div>
          <div>
            <p>{text.intro}</p>
            <strong>{text.referenceTitle}</strong>
            <p>{text.referenceText}</p>
            <small>{text.referenceNote}</small>
          </div>
        </div>

        <div className="purchase-process">
          <div className="purchase-heading">
            <span className="eyebrow">{text.processKicker}</span>
            <h2>{text.processTitle}</h2>
          </div>
          <div className="purchase-process__grid">
            {text.steps.map((step, index) => (
              <article key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      {faqContent}

      <div className="purchase-closing">
        <div>
          <span className="eyebrow">INNOVA EYEWEAR</span>
          <h2>{text.closingTitle}</h2>
          <p>{text.closingText}</p>
        </div>
        <div>
          <OpenOrderButton className="button button--light">{text.openOrder}</OpenOrderButton>
          <Link className="text-link text-link--light" href="/catalogo">{text.viewCatalog}<span className="professional-arrow" aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
