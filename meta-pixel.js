(function () {
  "use strict";

  const productionHosts = new Set(["innova-boutique.com", "www.innova-boutique.com"]);
  const localHosts = new Set(["localhost", "127.0.0.1", "::1"]);
  const currentHost = window.location.hostname.toLowerCase();
  const allowedHost = productionHosts.has(currentHost) || localHosts.has(currentHost);
  const config = window.INNOVA_BOUTIQUE_CONFIG || {};
  const pixelId = String(config.metaPixelId || "2084249839110651").trim();
  const status = {
    event: "PageView",
    initialized: false,
    lastPath: "",
    pageViewCount: 0,
    pixelId,
    reason: "",
  };

  window.INNOVA_META_PIXEL_STATUS = status;

  if (!allowedHost) {
    status.reason = "host-not-allowed";
    return;
  }

  if (!/^\d{10,20}$/.test(pixelId)) {
    status.reason = "missing-or-invalid-pixel-id";
    return;
  }

  if (
    window.__INNOVA_META_PIXEL_ID__ &&
    window.__INNOVA_META_PIXEL_ID__ !== pixelId
  ) {
    status.reason = "different-pixel-already-initialized";
    return;
  }

  window.__INNOVA_META_PIXEL_ID__ = pixelId;

  if (!window.fbq) {
    const fbq = function () {
      if (fbq.callMethod) {
        fbq.callMethod.apply(fbq, arguments);
      } else {
        fbq.queue.push(arguments);
      }
    };

    window.fbq = fbq;
    window._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];

    const script = document.createElement("script");
    script.async = true;
    script.id = "innova-meta-pixel";
    script.src = "https://connect.facebook.net/en_US/fbevents.js";

    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  }

  function trackPageView() {
    window.fbq("track", "PageView");
    status.pageViewCount += 1;
    status.lastPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  }

  window.INNOVA_META_PIXEL = Object.freeze({ trackPageView });
  window.fbq("init", pixelId);
  trackPageView();
  status.initialized = true;
  status.reason = "initialized";
})();
