(function () {
  const languages = ["es", "en", "fr"];
  const storedLang = localStorage.getItem("balmain-lang");
  const state = {
    lang: languages.includes(storedLang) ? storedLang : "es",
  };

  function datasetKey(prefix, lang) {
    return `${prefix}${lang.charAt(0).toUpperCase()}${lang.slice(1)}`;
  }

  function current() {
    return state.lang;
  }

  function pick(value) {
    if (!value) return "";
    if (typeof value === "string") return value;
    return value[state.lang] || value.es || value.en || value.fr || "";
  }

  function applyStatic(root = document) {
    document.documentElement.lang = state.lang;
    root.querySelectorAll("[data-text-es], [data-text-en], [data-text-fr]").forEach((node) => {
      const value = node.dataset[datasetKey("text", state.lang)] || node.dataset.textEs || node.dataset.textEn || node.dataset.textFr;
      if (typeof value === "string") node.textContent = value;
    });
    root.querySelectorAll("[data-text-placeholder-es], [data-text-placeholder-en], [data-text-placeholder-fr]").forEach((node) => {
      const value =
        node.dataset[datasetKey("textPlaceholder", state.lang)] ||
        node.dataset.textPlaceholderEs ||
        node.dataset.textPlaceholderEn ||
        node.dataset.textPlaceholderFr;
      if (typeof value === "string") node.setAttribute("placeholder", value);
    });
    root.querySelectorAll("[data-lang-option]").forEach((button) => {
      button.classList.toggle("active", button.dataset.langOption === state.lang);
    });
  }

  function setLang(lang) {
    if (!languages.includes(lang)) return;
    state.lang = lang;
    localStorage.setItem("balmain-lang", lang);
    applyStatic();
    window.dispatchEvent(new CustomEvent("balmain:languagechange", { detail: { lang } }));
  }

  window.BalmainI18n = { current, pick, applyStatic, setLang };
})();
