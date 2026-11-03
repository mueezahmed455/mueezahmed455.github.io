(function () {
  "use strict";

  var root = document.documentElement;
  var navToggle = document.getElementById("mobile-nav-toggle");
  var nav = document.getElementById("primary-navigation");
  var themeToggle = document.getElementById("theme-toggle");
  var commandDialog = document.getElementById("command-dialog");
  var guideDialog = document.getElementById("guide-dialog");
  var commandSearch = document.getElementById("command-search");
  var progress = document.getElementById("scroll-progress-bar");
  var backTop = document.getElementById("back-to-top");

  function closeNav() {
    if (!navToggle || !nav) return;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
    nav.classList.remove("is-open");
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      navToggle.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
      nav.classList.toggle("is-open", !open);
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
    document.addEventListener("click", function (event) {
      if (!nav.contains(event.target) && !navToggle.contains(event.target)) closeNav();
    });
  }

  function setTheme(theme) {
    var selected = theme === "light" ? "light" : "dark";
    root.setAttribute("data-theme", selected);
    try { localStorage.setItem("mueez-theme", selected); } catch (error) {}
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", selected === "dark" ? "Switch to light theme" : "Switch to dark theme");
      themeToggle.setAttribute("title", selected === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }
    window.dispatchEvent(new CustomEvent("portfolio-theme-change", { detail: { theme: selected } }));
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      setTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light");
    });
    setTheme(root.getAttribute("data-theme"));
  }

  var lastScroll = 0;
  var ticking = false;
  function updateScroll() {
    var scrollable = document.documentElement.scrollHeight - window.innerHeight;
    var amount = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    if (progress) progress.style.width = Math.max(0, Math.min(100, amount)) + "%";
    if (backTop) backTop.classList.toggle("is-visible", window.scrollY > 650);
    lastScroll = window.scrollY;
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(updateScroll);
      ticking = true;
    }
  }, { passive: true });
  updateScroll();

  if (backTop) {
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  var revealNodes = document.querySelectorAll("[data-reveal]");
  var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reducedMotion) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    revealNodes.forEach(function (node) { revealObserver.observe(node); });
  } else {
    revealNodes.forEach(function (node) { node.classList.add("is-visible"); });
  }

  function showDialog(dialog) {
    if (!dialog) return;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }
  function closeDialog(dialog) {
    if (!dialog) return;
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }

  document.querySelectorAll("[data-open-command]").forEach(function (button) {
    button.addEventListener("click", function () {
      showDialog(commandDialog);
      if (commandSearch) {
        commandSearch.value = "";
        filterCommands("");
        window.setTimeout(function () { commandSearch.focus(); }, 0);
      }
    });
  });

  document.querySelectorAll("[data-close-dialog]").forEach(function (button) {
    button.addEventListener("click", function () {
      closeDialog(document.getElementById(button.getAttribute("data-close-dialog")));
    });
  });

  [commandDialog, guideDialog].forEach(function (dialog) {
    if (!dialog) return;
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) closeDialog(dialog);
    });
  });

  var commandItems = Array.from(document.querySelectorAll(".command-item"));
  function filterCommands(query) {
    var value = (query || "").toLowerCase().trim();
    commandItems.forEach(function (item) {
      var match = !value || item.textContent.toLowerCase().indexOf(value) !== -1;
      item.hidden = !match;
    });
    document.querySelectorAll(".command-group").forEach(function (group) {
      var visible = group.querySelectorAll(".command-item:not([hidden])").length > 0;
      group.hidden = !visible;
    });
  }
  if (commandSearch) {
    commandSearch.addEventListener("input", function () { filterCommands(commandSearch.value); });
    commandSearch.addEventListener("keydown", function (event) {
      var visibleItems = commandItems.filter(function (item) { return !item.hidden; });
      if (event.key === "ArrowDown" && visibleItems.length) {
        event.preventDefault();
        visibleItems[0].focus();
      }
      if (event.key === "Escape") closeDialog(commandDialog);
    });
  }

  commandItems.forEach(function (item) {
    item.addEventListener("click", function () {
      var target = item.getAttribute("data-command-target");
      var action = item.getAttribute("data-command-action");
      closeDialog(commandDialog);
      if (action === "theme") {
        setTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light");
        return;
      }
      if (action === "contact") {
        window.location.href = "mailto:mueezahmad69@gmail.com";
        return;
      }
      if (!target) return;
      if (target.charAt(0) === "/") {
        window.location.href = target;
      } else {
        var element = document.querySelector(target);
        if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  document.addEventListener("keydown", function (event) {
    var target = event.target;
    var isTyping = target && (target.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(target.tagName));
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      showDialog(commandDialog);
      if (commandSearch) {
        commandSearch.value = "";
        filterCommands("");
        window.setTimeout(function () { commandSearch.focus(); }, 0);
      }
      return;
    }
    if (event.key === "/" && !isTyping && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      showDialog(commandDialog);
      if (commandSearch) {
        commandSearch.value = "";
        filterCommands("");
        window.setTimeout(function () { commandSearch.focus(); }, 0);
      }
      return;
    }
    if (event.key === "Escape") {
      closeNav();
      closeDialog(commandDialog);
      closeDialog(guideDialog);
    }
  });

  var guideLaunch = document.getElementById("guide-launch");
  var guideAnswer = document.getElementById("guide-answer");
  var guideTopics = {
    cognify: {
      label: "COGNIFY OS",
      text: "Cognify is a runtime control point for AI agent actions. It evaluates scoped identity and policy at the MCP tool boundary, can route actions to human approval and records decisions as evidence. It does not intercept arbitrary agent traffic outside its server."
    },
    stack: {
      label: "TECHNICAL PRACTICE",
      text: "The documented project stack includes TypeScript, Next.js, React, Node.js, Express, PostgreSQL, Drizzle ORM, Redis, Docker, MCP, Tailwind CSS and browser-based JavaScript. Specific technologies are listed on the projects where they are used."
    },
    research: {
      label: "RESEARCH",
      text: "SPECTRA-GNN is a graph neural network research manuscript in development through academic collaboration. It is not yet presented as a peer-reviewed paper or validated published result."
    },
    contact: {
      label: "CONTACT",
      text: "Email is the most reliable way to reach Mueez about engineering opportunities, collaborations or research.",
      link: "mailto:mueezahmad69@gmail.com",
      linkText: "Send an email ↗"
    }
  };

  if (guideLaunch) {
    guideLaunch.addEventListener("click", function () {
      showDialog(guideDialog);
    });
  }
  document.querySelectorAll("[data-guide-topic]").forEach(function (button) {
    button.addEventListener("click", function () {
      var data = guideTopics[button.getAttribute("data-guide-topic")];
      if (!data || !guideAnswer) return;
      guideAnswer.replaceChildren();
      var label = document.createElement("span");
      label.className = "micro-label";
      label.textContent = data.label;
      var paragraph = document.createElement("p");
      paragraph.textContent = data.text;
      guideAnswer.append(label, paragraph);
      if (data.link) {
        var link = document.createElement("a");
        link.href = data.link;
        link.textContent = data.linkText;
        link.style.display = "inline-block";
        link.style.marginTop = "10px";
        guideAnswer.appendChild(link);
      }
    });
  });

  document.querySelectorAll("[data-copy]").forEach(function (button) {
    button.addEventListener("click", function () {
      var value = button.getAttribute("data-copy");
      var previous = button.textContent;
      function success() {
        button.textContent = "Copied";
        button.setAttribute("aria-label", "Email copied to clipboard");
        window.setTimeout(function () {
          button.textContent = previous;
          button.removeAttribute("aria-label");
        }, 1800);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(success).catch(function () {
          fallbackCopy(value, success);
        });
      } else {
        fallbackCopy(value, success);
      }
    });
  });

  function fallbackCopy(value, done) {
    var field = document.createElement("textarea");
    field.value = value;
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    try {
      if (document.execCommand("copy")) done();
    } catch (error) {}
    field.remove();
  }
})();
