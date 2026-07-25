(function () {
  var media = window.matchMedia("(prefers-color-scheme: light)");

  function getPreference() {
    return localStorage.getItem("theme") || "auto";
  }

  function resolveTheme(pref) {
    return pref === "auto" ? (media.matches ? "light" : "dark") : pref;
  }

  function applyTheme(pref) {
    document.documentElement.setAttribute("data-theme", resolveTheme(pref));
    document.documentElement.setAttribute("data-theme-pref", pref);
    document.querySelectorAll(".theme-btn").forEach(function (btn) {
      var active = btn.getAttribute("data-theme-choice") === pref;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function setPreference(pref) {
    localStorage.setItem("theme", pref);
    applyTheme(pref);
  }

  function getPostWidth() {
    return localStorage.getItem("post-width") || "default";
  }

  function applyPostWidth(width) {
    var wide = width === "wide";
    document.documentElement.setAttribute("data-post-width", wide ? "wide" : "default");
    document.querySelectorAll(".post-width-toggle").forEach(function (button) {
      button.setAttribute("aria-pressed", wide ? "true" : "false");
      button.setAttribute("aria-label", wide ? "Use default reading view" : "Use wide reading view");
      button.setAttribute("title", wide ? "Use default reading view" : "Use wide reading view");
      button.querySelector("span").textContent = wide ? "Default view" : "Wide view";
    });
  }

  function togglePostWidth() {
    var width = getPostWidth() === "wide" ? "default" : "wide";
    localStorage.setItem("post-width", width);
    applyPostWidth(width);
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(getPreference());
    document.querySelectorAll(".theme-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setPreference(btn.getAttribute("data-theme-choice"));
      });
    });
    applyPostWidth(getPostWidth());
    document.querySelectorAll(".post-width-toggle").forEach(function (button) {
      button.addEventListener("click", togglePostWidth);
    });
  });

  media.addEventListener("change", function () {
    if (getPreference() === "auto") applyTheme("auto");
  });
})();
