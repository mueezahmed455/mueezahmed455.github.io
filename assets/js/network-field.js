(function () {
  "use strict";

  var canvas = document.getElementById("hero-network");
  if (!canvas || !canvas.getContext) return;
  var context = canvas.getContext("2d");
  if (!context) return;

  var hero = canvas.closest(".hero-section");
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  var width = 0;
  var height = 0;
  var dpr = 1;
  var nodes = [];
  var pointer = { x: -1000, y: -1000 };
  var frame = 0;
  var visible = true;
  var running = false;
  var count = window.innerWidth < 700 ? 34 : 58;
  var connectionRadius = 145;

  function makeNodes() {
    nodes = [];
    for (var i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.1 + 0.55,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  function resize() {
    var bounds = canvas.getBoundingClientRect();
    width = Math.max(1, bounds.width);
    height = Math.max(1, bounds.height);
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    makeNodes();
    draw();
  }

  function draw() {
    context.clearRect(0, 0, width, height);
    var theme = document.documentElement.getAttribute("data-theme");
    var lineColor = theme === "light" ? "21, 111, 109" : "112, 228, 223";
    var pointColor = theme === "light" ? "20, 105, 104" : "197, 239, 107";

    for (var i = 0; i < nodes.length; i++) {
      var a = nodes[i];
      for (var j = i + 1; j < nodes.length; j++) {
        var b = nodes[j];
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < connectionRadius) {
          var alpha = (1 - distance / connectionRadius) * 0.17;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.strokeStyle = "rgba(" + lineColor + "," + alpha + ")";
          context.lineWidth = 0.65;
          context.stroke();
        }
      }
      var mouseX = a.x - pointer.x;
      var mouseY = a.y - pointer.y;
      var mouseDistance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
      if (mouseDistance < 150) {
        var glowAlpha = (1 - mouseDistance / 150) * 0.28;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(pointer.x, pointer.y);
        context.strokeStyle = "rgba(" + pointColor + "," + glowAlpha + ")";
        context.lineWidth = 0.7;
        context.stroke();
      }
      context.beginPath();
      context.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
      context.fillStyle = "rgba(" + pointColor + ",0.55)";
      context.fill();
    }
  }

  function animate() {
    if (!running || !visible) return;
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var dx = node.x - pointer.x;
      var dy = node.y - pointer.y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 115 && distance > 0) {
        var force = (115 - distance) / 115;
        node.vx += (dx / distance) * force * 0.014;
        node.vy += (dy / distance) * force * 0.014;
      }
      node.vx *= 0.995;
      node.vy *= 0.995;
      node.x += node.vx;
      node.y += node.vy;
      if (node.x < -10) node.x = width + 10;
      if (node.x > width + 10) node.x = -10;
      if (node.y < -10) node.y = height + 10;
      if (node.y > height + 10) node.y = -10;
    }
    draw();
    frame = window.requestAnimationFrame(animate);
  }

  function start() {
    if (running || !visible) return;
    running = true;
    frame = window.requestAnimationFrame(animate);
  }

  function stop() {
    running = false;
    if (frame) window.cancelAnimationFrame(frame);
  }

  canvas.addEventListener("pointermove", function (event) {
    var bounds = canvas.getBoundingClientRect();
    pointer.x = event.clientX - bounds.left;
    pointer.y = event.clientY - bounds.top;
  });
  canvas.addEventListener("pointerleave", function () {
    pointer.x = -1000;
    pointer.y = -1000;
  });
  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("portfolio-theme-change", draw);

  if ("IntersectionObserver" in window && hero) {
    var observer = new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) start();
      else stop();
    }, { threshold: 0.01 });
    observer.observe(hero);
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop();
    else if (visible) start();
  });

  resize();
  start();
})();
