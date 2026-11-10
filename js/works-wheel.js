/* ============================================================
   works-wheel.js — 3D cylindrical "drum reel" of projects.
   Drag (mouse: vertical, touch: horizontal so the page still
   scrolls), momentum, snapping, arrow keys and prev/next buttons.
   Click the front card to open its details.
   ============================================================ */
(function () {
  "use strict";
  var P = window.PROJECTS || [];
  var wheel = document.getElementById("wheel"), drum = document.getElementById("drum");
  if (!wheel || !P.length) return;

  var N = P.length;
  var copies = Math.max(1, Math.ceil(9 / N));
  var total = N * copies;
  var step = 360 / total;
  var H = 300;                                         // card height (matches CSS)
  var R = (H / 2) / Math.tan((step / 2) * Math.PI / 180) + 36;
  var degPerPx = (180 / (Math.PI * R)) * 1.15;

  // build cards
  var items = [];
  for (var i = 0; i < total; i++) {
    var p = P[i % N], el = document.createElement("div");
    el.className = "w-item"; el.setAttribute("data-i", i);
    el.style.transform = "rotateX(" + (-i * step) + "deg) translateZ(" + R + "px)";
    el.innerHTML = '<img src="' + p.image + '" alt="" draggable="false">' +
      '<div class="cap"><b></b><span></span></div>';
    if (p.accent) { el.style.setProperty("--a1", p.accent[0]); el.style.setProperty("--a2", p.accent[1]); }
    el.querySelector("b").textContent = p.name;
    el.querySelector("span").textContent = p.status;
    drum.appendChild(el); items.push(el);
  }

  var a = 0, v = 0, target = null, running = false, dragging = false;
  var countEl = document.getElementById("wheel-count"), nameEl = document.getElementById("wheel-name"),
      statusEl = document.getElementById("wheel-status"), lastIdx = -1;
  var mod = function (n, m) { return ((n % m) + m) % m; };
  var wrap180 = function (d) { return mod(d + 180, 360) - 180; };

  function render() {
    drum.style.transform = "translateZ(" + (-R) + "px) rotateX(" + a + "deg)";
    for (var i = 0; i < total; i++) {
      var d = Math.abs(wrap180(a - i * step));
      items[i].style.opacity = Math.max(0, 1 - d / (step * 3)).toFixed(3);
      items[i].style.pointerEvents = d < step * 1.6 ? "auto" : "none";
    }
    var idx = mod(Math.round(a / step), total) % N;
    if (idx !== lastIdx) {
      lastIdx = idx;
      countEl.textContent = "0" + (idx + 1) + " / 0" + N;
      nameEl.textContent = P[idx].name; statusEl.textContent = P[idx].kind;
      var ac = P[idx].accent || ["#a78bfa", "#22d3ee"], box = nameEl.parentNode;
      box.style.setProperty("--a1", ac[0]); box.style.setProperty("--a2", ac[1]);
      if (nameEl.animate && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        nameEl.animate([{ opacity: 0, transform: "translateY(12px)", filter: "blur(6px)" }, { opacity: 1, transform: "none", filter: "blur(0)" }],
          { duration: 500, easing: "cubic-bezier(.16,1,.3,1)" });
      }
    }
  }

  function tick() {
    if (!dragging) {
      if (Math.abs(v) > 0.04) { a += v; v *= 0.94; target = null; }
      else {
        if (target === null) target = Math.round(a / step) * step;
        a += (target - a) * 0.13;
        if (Math.abs(target - a) < 0.01) { a = target; target = null; running = false; }
      }
    }
    render();
    if (running) requestAnimationFrame(tick);
  }
  function start() { if (!running) { running = true; requestAnimationFrame(tick); } }
  function go(n) {                                      // move n steps from the nearest snap
    v = 0; target = (Math.round(a / step) + n) * step; start();
  }
  function goToIndex(i) {
    var t = i * step; t += 360 * Math.round((a - t) / 360);
    v = 0; target = t; start();
  }

  // ----- pointer interaction -----
  var sx = 0, sy = 0, lx = 0, ly = 0, moved = 0, downItem = null, touch = false;
  wheel.addEventListener("pointerdown", function (e) {
    if (e.button !== undefined && e.button !== 0) return;
    dragging = true; moved = 0; v = 0; target = null; touch = e.pointerType === "touch";
    sx = lx = e.clientX; sy = ly = e.clientY;
    downItem = e.target.closest(".w-item"); wheel.classList.add("dragging");
    window.addEventListener("pointermove", onMove); window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp); start();
  });
  function onMove(e) {
    var dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY;
    moved += Math.abs(dx) + Math.abs(dy);
    var delta = (touch ? -dx : -dy) * degPerPx;
    a += delta; v = delta;
  }
  function onUp(e) {
    dragging = false; wheel.classList.remove("dragging");
    window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp);
    window.removeEventListener("pointercancel", onUp);
    if (moved < 6 && downItem && e.type === "pointerup") {          // a click, not a drag
      var i = +downItem.getAttribute("data-i");
      if (Math.abs(wrap180(a - i * step)) < step / 2) window.openProject(i % N);
      else goToIndex(i);
    }
    start();
  }

  wheel.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); go(1); }
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); window.openProject(mod(Math.round(a / step), total) % N); }
  });
  document.getElementById("wheel-prev").addEventListener("click", function () { go(-1); });
  document.getElementById("wheel-next").addEventListener("click", function () { go(1); });

  render();
})();
