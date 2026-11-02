(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");

  function closeMenu() {
    if (!navToggle || !navLinks) return;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
    navLinks.classList.remove("is-open");
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      navLinks.classList.toggle("is-open", !isOpen);
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", function (event) {
      if (!navLinks.contains(event.target) && !navToggle.contains(event.target)) closeMenu();
    });
  }

  var filters = Array.from(document.querySelectorAll("[data-filter]"));
  var cases = Array.from(document.querySelectorAll(".case-study[data-category]"));
  var count = document.querySelector(".filter-count");

  if (filters.length && cases.length) {
    filters.forEach(function (button) {
      button.addEventListener("click", function () {
        var selected = button.getAttribute("data-filter");

        filters.forEach(function (filter) {
          var active = filter === button;
          filter.classList.toggle("is-active", active);
          filter.setAttribute("aria-pressed", String(active));
        });

        var visible = 0;
        cases.forEach(function (item) {
          var categories = (item.getAttribute("data-category") || "").split(/\s+/);
          var show = selected === "all" || categories.indexOf(selected) !== -1;
          item.hidden = !show;
          if (show) visible += 1;
        });

        if (count) {
          count.textContent = visible + (visible === 1 ? " entry" : " entries");
        }
      });
    });
  }

  var revealItems = document.querySelectorAll("[data-reveal]");
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !reduceMotion) {
    var observer = new IntersectionObserver(function (entries, currentObserver) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -25px 0px" });

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }
})();
