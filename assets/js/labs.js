(function () {
  "use strict";

  var architecture = {
    identity: {
      code: "COMPONENT / 01",
      title: "Agent identity",
      copy: "A governed action should be attributable to a specific agent identity and bounded by the permissions assigned to it. Identity is context for policy evaluation, not a substitute for policy.",
      principle: "Attribution before authorisation."
    },
    policy: {
      code: "COMPONENT / 02",
      title: "Policy evaluation",
      copy: "The proposed action is checked against explicit rules: which tool is registered, what resource is in scope and which operations are permitted. A decision should be deterministic enough to inspect and test.",
      principle: "Rules at the action boundary."
    },
    approval: {
      code: "COMPONENT / 03",
      title: "Human approval",
      copy: "Some actions should pause for a person. Approval should be scoped, traceable and time-bounded. A high-risk action should not become an unrestricted permission simply because someone approved one request.",
      principle: "Human judgement with bounded authority."
    },
    evidence: {
      code: "COMPONENT / 04",
      title: "Evidence and outcome",
      copy: "The system should retain what was requested, the decision that was made and the outcome of execution. This makes operational review possible and helps teams distinguish intent from actual behaviour.",
      principle: "Record the decision and what followed."
    }
  };

  document.querySelectorAll("[data-architecture]").forEach(function (button) {
    button.addEventListener("click", function () {
      var item = architecture[button.getAttribute("data-architecture")];
      if (!item) return;
      document.querySelectorAll("[data-architecture]").forEach(function (other) {
        var selected = other === button;
        other.classList.toggle("is-selected", selected);
        other.setAttribute("aria-pressed", String(selected));
      });
      var code = document.getElementById("architecture-code");
      var title = document.getElementById("architecture-title");
      var copy = document.getElementById("architecture-copy");
      var principle = document.getElementById("architecture-principle");
      if (code) code.textContent = item.code;
      if (title) title.textContent = item.title;
      if (copy) copy.textContent = item.copy;
      if (principle) principle.textContent = item.principle;
    });
  });

  var jwtInput = document.getElementById("jwt-input");
  var jwtResult = document.getElementById("jwt-result");
  var jwtInspect = document.getElementById("jwt-inspect");
  var jwtClear = document.getElementById("jwt-clear");

  function decodeSegment(segment) {
    var base64 = segment.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) base64 += "=";
    var binary = window.atob(base64);
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    var decoded = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    return JSON.parse(decoded);
  }

  function renderJwtError(message) {
    if (!jwtResult) return;
    var box = document.createElement("div");
    box.className = "jwt-empty";
    var title = document.createElement("span");
    title.textContent = "TOKEN NOT DECODED";
    var detail = document.createElement("p");
    detail.textContent = message;
    box.append(title, detail);
    jwtResult.replaceChildren(box);
  }

  function renderJwtBlock(label, value) {
    var block = document.createElement("div");
    block.className = "jwt-output-block";
    var title = document.createElement("div");
    title.className = "jwt-output-title";
    title.textContent = label;
    var pre = document.createElement("pre");
    pre.textContent = JSON.stringify(value, null, 2);
    block.append(title, pre);
    return block;
  }

  function inspectJwt() {
    if (!jwtInput || !jwtResult) return;
    var token = jwtInput.value.trim();
    if (!token) {
      renderJwtError("Paste a token to inspect its structure.");
      return;
    }
    var parts = token.split(".");
    if (parts.length !== 3 || !parts[0] || !parts[1]) {
      renderJwtError("A compact JWT should contain three dot-separated segments.");
      return;
    }
    try {
      var header = decodeSegment(parts[0]);
      var payload = decodeSegment(parts[1]);
      if (!header || typeof header !== "object" || Array.isArray(header)) throw new Error("The header is not a JSON object.");
      if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new Error("The payload is not a JSON object.");
      var wrapper = document.createElement("div");
      wrapper.append(renderJwtBlock("HEADER / JSON", header), renderJwtBlock("PAYLOAD / JSON", payload));
      var signature = document.createElement("div");
      signature.className = "jwt-output-title";
      signature.style.marginTop = "10px";
      signature.style.color = "var(--orange)";
      signature.textContent = "SIGNATURE / PRESENT — NOT VERIFIED";
      wrapper.appendChild(signature);
      if (header.alg === "none") {
        var warning = document.createElement("p");
        warning.textContent = "The header declares alg=none. This inspector does not validate token security.";
        warning.style.color = "var(--orange)";
        warning.style.fontSize = "9px";
        wrapper.appendChild(warning);
      }
      if (typeof payload.exp === "number") {
        var expiry = document.createElement("p");
        expiry.style.margin = "8px 0 0";
        expiry.style.color = "var(--muted)";
        expiry.style.fontSize = "8px";
        var date = new Date(payload.exp * 1000);
        expiry.textContent = "exp claim: " + (isNaN(date.getTime()) ? "invalid timestamp" : date.toISOString());
        wrapper.appendChild(expiry);
      }
      jwtResult.replaceChildren(wrapper);
    } catch (error) {
      renderJwtError(error && error.message ? error.message : "Unable to decode this token.");
    }
  }

  if (jwtInspect) jwtInspect.addEventListener("click", inspectJwt);
  if (jwtInput) jwtInput.addEventListener("keydown", function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") inspectJwt();
  });
  if (jwtClear) jwtClear.addEventListener("click", function () {
    if (jwtInput) jwtInput.value = "";
    renderJwtError("Header and payload appear here after inspection.");
  });

  var terminalOutput = document.getElementById("terminal-output");
  var terminalForm = document.getElementById("terminal-form");
  var terminalInput = document.getElementById("terminal-command");
  var terminalClear = document.getElementById("terminal-clear");

  function terminalLine(text, className) {
    if (!terminalOutput) return;
    var line = document.createElement("div");
    line.className = "terminal-line" + (className ? " " + className : "");
    line.textContent = text;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  var terminalCommands = {
    help: "Commands: help · whoami · projects · stack · research · open <project> · contact · clear",
    whoami: "Mueez Ahmed / Computer Science / product engineering / AI systems / applied research",
    projects: "Projects: cognify · xgroup · phishswipe · auzbiz · spectra-gnn. Early concepts: pyflow · kebablab.",
    stack: "Documented project stack: TypeScript · Next.js · React · Node.js · Express · PostgreSQL · Drizzle · Redis · Docker · MCP · Python · Three.js.",
    research: "SPECTRA-GNN is a graph neural network manuscript in progress. It is not yet a published paper.",
    contact: "Email: mueezahmad69@gmail.com"
  };
  var projectTargets = {
    cognify: "/projects/#cognify",
    xgroup: "/projects/#xgroup",
    phishswipe: "/projects/#phishswipe",
    auzbiz: "/projects/#auzbiz",
    "spectra-gnn": "/projects/#spectra-gnn",
    pyflow: "/projects/#pyflow",
    kebablab: "/projects/#kebablab"
  };

  function runTerminalCommand(raw) {
    if (!terminalOutput) return;
    var input = raw.trim();
    if (!input) return;
    terminalLine("guest@site:~$ " + input, "terminal-command-echo");
    var parts = input.split(/\s+/);
    var command = parts[0].toLowerCase();
    var argument = (parts[1] || "").toLowerCase();
    if (command === "clear") {
      terminalOutput.replaceChildren();
      return;
    }
    if (command === "open") {
      var destination = projectTargets[argument];
      if (destination) {
        terminalLine("Opening project note: " + argument, "terminal-output-line");
        window.location.href = destination;
      } else {
        terminalLine("Unknown project. Try: open cognify", "terminal-error");
      }
      return;
    }
    if (command === "contact") {
      terminalLine(terminalCommands.contact, "terminal-output-line");
      terminalLine("Opening your email application…", "terminal-muted");
      window.location.href = "mailto:mueezahmad69@gmail.com";
      return;
    }
    if (Object.prototype.hasOwnProperty.call(terminalCommands, command)) {
      terminalLine(terminalCommands[command], "terminal-output-line");
      return;
    }
    terminalLine("Command not found. Type help to see the local commands.", "terminal-error");
  }

  if (terminalForm && terminalInput) {
    terminalForm.addEventListener("submit", function (event) {
      event.preventDefault();
      runTerminalCommand(terminalInput.value);
      terminalInput.value = "";
    });
  }
  if (terminalClear && terminalOutput) {
    terminalClear.addEventListener("click", function () {
      terminalOutput.replaceChildren();
      terminalLine("Console cleared. Type help to see available commands.", "terminal-muted");
    });
  }

  var archiveFilters = Array.from(document.querySelectorAll("[data-archive-filter]"));
  var archiveEntries = Array.from(document.querySelectorAll(".archive-entry[data-archive-category]"));
  var archiveCount = document.getElementById("archive-count");

  if (archiveFilters.length && archiveEntries.length) {
    archiveFilters.forEach(function (button) {
      button.addEventListener("click", function () {
        var selected = button.getAttribute("data-archive-filter");
        var visible = 0;
        archiveFilters.forEach(function (filter) {
          var active = filter === button;
          filter.classList.toggle("is-active", active);
          filter.setAttribute("aria-pressed", String(active));
        });
        archiveEntries.forEach(function (entry) {
          var categories = (entry.getAttribute("data-archive-category") || "").split(/\s+/);
          var show = selected === "all" || categories.indexOf(selected) !== -1;
          entry.hidden = !show;
          if (show) visible++;
        });
        if (archiveCount) archiveCount.textContent = "Showing " + visible + (visible === 1 ? " entry" : " entries");
      });
    });
  }
})();
