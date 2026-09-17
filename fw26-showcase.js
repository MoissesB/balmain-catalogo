(function () {
  const catalogue = window.INNOVA_SHOWCASE_PRODUCTS?.brands?.balmain;
  if (!Array.isArray(catalogue)) return;
  const collection = [
    ["Ingrid", "avant-garde", "ingrid", "bps-206a-56"],
    ["Diva", "avant-garde", "diva", "bps-209a-53"],
    ["Emblem II", "iconic", "emblem-ii", "bps-211a-54"],
    ["Emblem I", "iconic", "emblem-i", "bps-212a-52"],
    ["Scarlett", "avant-garde", "scarlett", "bps-213a-60"],
    ["Dean", "avant-garde", "dean", "bps-214a-60"],
    ["Amelia", "fashion-drops", "amelia", "bps-218a-136"],
    ["Essence I", "aspirational", "essence-i", "bpx-207a-53"],
    ["Essence II", "aspirational", "essence-ii", "bpx-208a-53"],
    ["Focus I", "aspirational", "focus-i", "bpx-215a-53"],
    ["Fade", "aspirational", "fade", "bpx-216a-53"],
    ["Focus II", "aspirational", "focus-ii", "bpx-217a-57"],
  ];
  catalogue.unshift(...collection.map(([name, category, slug, sku]) => ({
    name,
    collection: "FW26",
    meta: `FW26 · ${category}`,
    path: `/producto.html?slug=${slug}`,
    image: `/assets/images/productos/fw26/${sku}/frontal.jpg`,
  })));
})();
