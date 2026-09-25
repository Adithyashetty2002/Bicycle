(function () {
  "use strict";

  var config = window.BICYCLE_SITE_CONFIG || {};
  var cdnBase = (config.imageCdnBase || "").replace(/\/$/, "");

  if (cdnBase) {
    document.querySelectorAll("[data-cdn-src]").forEach(function (image) {
      image.src = cdnBase + "/" + image.getAttribute("data-cdn-src");
    });
  }

  document.querySelectorAll("[data-current-year]").forEach(function (node) {
    node.textContent = new Date().getFullYear();
  });

  var footer = document.querySelector(".site-footer");
  if (footer && !footer.querySelector(".footer-grid")) {
    var footerGrid = document.createElement("div");
    footerGrid.className = "shell footer-grid";
    footerGrid.innerHTML = "<div><a class=\"brand footer-brand\" href=\"/\"><span class=\"brand-mark\" aria-hidden=\"true\"><span></span><span></span></span><span>VAYU</span></a><p class=\"footer-note\">Bicycles for the everyday ride.</p></div><div><p class=\"footer-label\">Explore</p><a href=\"/bicycles/\">Bicycles</a><a href=\"/bicycles/compare/\">Compare</a><a href=\"/about/\">About</a><a href=\"/faq/\">FAQ</a><a href=\"/contact/\">Contact</a></div><div><p class=\"footer-label\">Information</p><a href=\"/privacy/\">Privacy</a><a href=\"/cookies/\">Cookies</a><a href=\"/terms/\">Terms</a><a href=\"/sales-disclaimer/\">Sales disclaimer</a><a href=\"/warranty-returns/\">Warranty and returns</a></div><div><p class=\"footer-label\">Need a hand?</p><a href=\"/contact/\">Send an enquiry</a><button class=\"footer-button\" type=\"button\" data-open-consent>Cookie preferences</button><a href=\"/accessibility/\">Accessibility</a></div>";
    footer.insertBefore(footerGrid, footer.firstChild);
  }

  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".site-nav");
  if (nav && !nav.querySelector("[data-home-link]")) {
    var homeLink = document.createElement("a");
    homeLink.href = "/";
    homeLink.textContent = "Home";
    homeLink.setAttribute("data-home-link", "");
    if (window.location.pathname === "/") { homeLink.setAttribute("aria-current", "page"); }
    nav.insertBefore(homeLink, nav.firstChild);
  }
  if (nav && !toggle) {
    nav.id = "site-nav";
    toggle = document.createElement("button");
    toggle.className = "menu-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "site-nav");
    toggle.innerHTML = "<span class=\"sr-only\">Open menu</span><span></span><span></span>";
    nav.parentNode.insertBefore(toggle, nav);
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  var modelSelect = document.querySelector("#bicycle-model");
  var requestedModel = new URLSearchParams(window.location.search).get("model");
  if (modelSelect && requestedModel) {
    modelSelect.value = requestedModel;
  }

  var filters = document.querySelectorAll("[data-filter]");
  var products = document.querySelectorAll("[data-category]");
  var empty = document.querySelector(".catalogue-empty");
  var filterState = { category: "all", age: "all", level: "all" };
  function productMatches(product, key, value) {
    if (value === "all") { return true; }
    return (product.getAttribute("data-" + key) || "").split(" ").indexOf(value) !== -1;
  }
  filters.forEach(function (filter) {
    filter.addEventListener("click", function () {
      var group = filter.getAttribute("data-filter-group") || "category";
      var value = filter.getAttribute("data-filter");
      var count = 0;
      filterState[group] = value;
      document.querySelectorAll("[data-filter-group=\"" + group + "\"]").forEach(function (button) {
        button.setAttribute("aria-pressed", String(button === filter));
      });
      products.forEach(function (product) {
        var show = productMatches(product, "category", filterState.category) &&
          productMatches(product, "age", filterState.age) &&
          productMatches(product, "level", filterState.level);
        product.hidden = !show;
        if (show) { count += 1; }
      });
      if (empty) { empty.style.display = count ? "none" : "block"; }
    });
  });
  if (filters.length) {
    var requestedFilters = new URLSearchParams(window.location.search);
    ["category", "age", "level"].forEach(function (group) {
      var value = requestedFilters.get(group);
      var button = value && document.querySelector("[data-filter-group=\"" + group + "\"][data-filter=\"" + value + "\"]");
      if (button) { button.click(); }
    });
  }

  var consentKey = "vayu-analytics-consent";
  var banner = document.querySelector("[data-consent-banner]");
  if (!banner) {
    banner = document.createElement("section");
    banner.className = "consent-banner";
    banner.hidden = true;
    banner.setAttribute("data-consent-banner", "");
    banner.setAttribute("aria-labelledby", "consent-title");
    banner.innerHTML = "<div><h2 id=\"consent-title\">Your privacy choices</h2><p>We use optional analytics to understand how the site is used.</p></div><div class=\"consent-actions\"><button class=\"button button-plain\" type=\"button\" data-consent=\"denied\">Reject</button><button class=\"button button-primary\" type=\"button\" data-consent=\"granted\">Accept</button></div>";
    document.body.appendChild(banner);
  }
  function applyConsent(value) {
    localStorage.setItem(consentKey, value);
    window.dispatchEvent(new CustomEvent("vayu:consent", { detail: value }));
    if (banner) { banner.hidden = true; }
  }
  if (banner && !localStorage.getItem(consentKey)) { banner.hidden = false; }
  document.querySelectorAll("[data-consent]").forEach(function (button) {
    button.addEventListener("click", function () { applyConsent(button.getAttribute("data-consent")); });
  });
  document.querySelectorAll("[data-open-consent]").forEach(function (button) {
    button.addEventListener("click", function () { if (banner) { banner.hidden = false; } });
  });
})();
