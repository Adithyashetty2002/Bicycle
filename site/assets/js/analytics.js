(function () {
  "use strict";
  var config = window.BICYCLE_SITE_CONFIG || {};
  var loaded = false;

  function addScript(src) {
    var script = document.createElement("script");
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
  }

  function loadAnalytics() {
    if (loaded) { return; }
    loaded = true;
    if (config.gaMeasurementId) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied" });
      window.gtag("js", new Date());
      window.gtag("config", config.gaMeasurementId, { send_page_view: true });
      addScript("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(config.gaMeasurementId));
    }
    if (config.clarityProjectId) {
      window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
      window.clarity("consentv2", { analytics_Storage: "granted", ad_Storage: "denied" });
      addScript("https://www.clarity.ms/tag/" + encodeURIComponent(config.clarityProjectId));
    }
  }

  function revokeAnalytics() {
    if (window.gtag) { window.gtag("consent", "update", { analytics_storage: "denied", ad_storage: "denied" }); }
    if (window.clarity) { window.clarity("consent", false); }
  }

  window.addEventListener("vayu:consent", function (event) {
    if (event.detail === "granted") { loadAnalytics(); } else { revokeAnalytics(); }
  });
  if (localStorage.getItem("vayu-analytics-consent") === "granted") { loadAnalytics(); }
})();
