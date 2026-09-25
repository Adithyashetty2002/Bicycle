(function () {
  "use strict";

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

  var legalAcknowledgement = document.querySelector("[data-form-consent]");
  var consentSubmit = document.querySelector("[data-consent-submit]");
  if (legalAcknowledgement && consentSubmit) {
    function updateSubmitState() {
      var disabled = !legalAcknowledgement.checked;
      consentSubmit.disabled = disabled;
      consentSubmit.setAttribute("aria-disabled", String(disabled));
    }
    legalAcknowledgement.addEventListener("change", updateSubmitState);
    window.addEventListener("pageshow", updateSubmitState);
    updateSubmitState();
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
  var consentCookie = "vayu_analytics_consent";
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
  function hideConsentBanner() {
    if (!banner) { return; }
    banner.hidden = true;
    banner.setAttribute("aria-hidden", "true");
    banner.style.setProperty("display", "none", "important");
  }
  function showConsentBanner() {
    if (!banner) { return; }
    banner.style.removeProperty("display");
    banner.hidden = false;
    banner.removeAttribute("aria-hidden");
  }
  function updateConsentUi(value) {
    document.documentElement.setAttribute("data-analytics-consent", value || "unset");
    document.querySelectorAll("[data-consent]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.getAttribute("data-consent") === value));
    });
  }
  function readConsent() {
    try {
      var storedConsent = localStorage.getItem(consentKey);
      if (storedConsent) { return storedConsent; }
    } catch (error) {
      // Fall through to the consent cookie when storage is unavailable.
    }
    try {
      var prefix = consentCookie + "=";
      var cookie = document.cookie.split(";").map(function (part) { return part.trim(); }).find(function (part) {
        return part.indexOf(prefix) === 0;
      });
      return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : "";
    } catch (error) {
      return "";
    }
  }
  function storeConsent(value) {
    try {
      localStorage.setItem(consentKey, value);
    } catch (error) {
      // Privacy-focused browsers can block storage. The choice should still
      // take effect for the current page instead of leaving the banner stuck.
    }
    try {
      document.cookie = consentCookie + "=" + encodeURIComponent(value) + "; Max-Age=31536000; Path=/; SameSite=Lax";
    } catch (error) {
      // The banner still closes for this page when all persistence is blocked.
    }
  }
  function clearInvalidConsent() {
    try {
      localStorage.removeItem(consentKey);
    } catch (error) {
      // There is nothing else to clear when browser storage is unavailable.
    }
    try {
      document.cookie = consentCookie + "=; Max-Age=0; Path=/; SameSite=Lax";
    } catch (error) {
      // There is nothing else to clear when cookies are unavailable.
    }
  }
  function applyConsent(value) {
    if (value !== "granted" && value !== "denied") { return; }
    storeConsent(value);
    updateConsentUi(value);
    hideConsentBanner();
    window.dispatchEvent(new CustomEvent("vayu:consent", { detail: value }));
  }
  var savedConsent = readConsent();
  if (savedConsent !== "granted" && savedConsent !== "denied") {
    clearInvalidConsent();
    savedConsent = "";
  }
  updateConsentUi(savedConsent);
  if (banner) {
    if (savedConsent) { hideConsentBanner(); } else { showConsentBanner(); }
    banner.querySelectorAll("[data-consent]").forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        applyConsent(button.getAttribute("data-consent"));
      });
    });
  }
  document.addEventListener("click", function (event) {
    var opener = event.target.closest("[data-open-consent]");
    if (opener) {
      event.preventDefault();
      if (!banner) { return; }
      showConsentBanner();
      var firstChoice = banner.querySelector("[data-consent]");
      if (firstChoice) { firstChoice.focus(); }
    }
  });
})();
