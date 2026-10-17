(function () {
  const local = /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);
  const alfredProductionUrl = "https://alfred-kerbs-innova-eyewear.moisses.chatgpt.site/";
  const silhouetteProductionUrl = "https://moissesb.github.io/innova-silhouette-catalogo/";
  const jiscoProductionUrl = "https://moissesb.github.io/innova-jisco-catalogo/";
  window.INNOVA_BOUTIQUE_CONFIG = {
    local,
    maintenanceMode: false,
    metaPixelId: "2084249839110651",
    portalUrl: local ? "http://localhost:3100" : window.location.origin,
    allowedOrigins: local
      ? ["http://localhost:3000", "http://localhost:3001", "http://localhost:3100", "http://localhost:3101", "http://localhost:3112", "http://localhost:5174"]
      : [window.location.origin, new URL(alfredProductionUrl).origin, new URL(silhouetteProductionUrl).origin, new URL(jiscoProductionUrl).origin],
    brands: {
      "alfred-kerbs": local ? "http://localhost:3001" : "/alfred-kerbs/",
      balmain: local ? "http://localhost:3101" : "/balmain/",
      silhouette: local ? "http://localhost:5174" : "/silhouette/",
      jisco: "/jisco/",
    },
    brandAssets: {
      "alfred-kerbs": local ? "http://localhost:3001" : alfredProductionUrl,
      balmain: local ? "http://localhost:3101" : "/balmain/",
      silhouette: local ? "http://localhost:5174" : silhouetteProductionUrl,
      jisco: local ? "http://localhost:3112" : jiscoProductionUrl,
    },
  };
})();
