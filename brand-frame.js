(function () {
  const body = document.body;
  const brand = body.dataset.brand || "";
  const source = body.dataset.source || "";
  const frame = document.querySelector("[data-brand-frame]");
  const loader = document.querySelector("[data-brand-loader]");
  if (!frame || !source) return;

  const sourceUrl = new URL(source);
  const sourceOrigin = sourceUrl.origin;

  function currentRoute() {
    const value = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    return value.startsWith("/") ? value : "/";
  }

  function targetUrl(route) {
    if (brand === "silhouette") {
      return `${source.replace(/\/+$/, "/")}#${route}`;
    }
    return new URL(route.replace(/^\/+/, ""), source.replace(/\/+$/, "/")).href;
  }

  function showRoute() {
    const target = targetUrl(currentRoute());
    if (frame.dataset.target === target) return;
    frame.dataset.target = target;
    frame.src = target;
  }

  frame.addEventListener("load", () => loader?.classList.add("is-hidden"));
  window.addEventListener("hashchange", showRoute);
  window.addEventListener("message", (event) => {
    if (event.source !== frame.contentWindow || event.origin !== sourceOrigin) return;
    if (event.data?.type !== "innova-brand-route" || event.data?.brand !== brand) return;
    const route = String(event.data.route || "/");
    const normalized = route.startsWith("/") ? route : `/${route}`;
    if (currentRoute() === normalized) return;
    window.history.replaceState(null, "", `#${encodeURI(normalized)}`);
  });
  showRoute();
})();
