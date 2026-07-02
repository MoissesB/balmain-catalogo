(function () {
  const state = {
    lang: localStorage.getItem("balmain-lang") || "es",
  };

  function current() {
    return state.lang;
  }

  function pick(value) {
    if (!value) return "";
    if (typeof value === "string") return value;
    return value[state.lang] || value.es || value.en || "";
  }

  function applyStatic(root = document) {
    document.documentElement.lang = state.lang;
    root.querySelectorAll("[data-text-es], [data-text-en]").forEach((node) => {
      const value = node.dataset[state.lang === "en" ? "textEn" : "textEs"];
      if (typeof value === "string") node.textContent = value;
    });
    root.querySelectorAll("[data-text-placeholder-es], [data-text-placeholder-en]").forEach((node) => {
      const value = node.dataset[state.lang === "en" ? "textPlaceholderEn" : "textPlaceholderEs"];
      if (typeof value === "string") node.setAttribute("placeholder", value);
    });
    root.querySelectorAll("[data-lang-option]").forEach((button) => {
      button.classList.toggle("active", button.dataset.langOption === state.lang);
    });
  }

  function setLang(lang) {
    if (!["es", "en"].includes(lang)) return;
    state.lang = lang;
    localStorage.setItem("balmain-lang", lang);
    applyStatic();
    window.dispatchEvent(new CustomEvent("balmain:languagechange", { detail: { lang } }));
  }

  window.BalmainI18n = { current, pick, applyStatic, setLang };
})();
