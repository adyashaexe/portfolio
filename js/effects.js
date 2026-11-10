/* ============================================================
   effects.js — extra motion: cursor glow, magnetic buttons, card
   tilt, count-up numbers, hero particle field, staggered reveals.
   All of it is skipped for prefers-reduced-motion.
   ============================================================ */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- staggered reveals ---------- */
  $$(".facts").forEach(function (f) {
    f.classList.remove("rv");
    Array.prototype.forEach.call(f.children, function (c, i) {
      c.style.setProperty("--d", (i * 0.1) + "s");
      if (window.observeReveal) window.observeReveal(c);
    });
  });
  $$("#contact .wrap > p, #contact .links-row").forEach(function (e, i) {
    e.style.setProperty("--d", (0.1 + i * 0.12) + "s");
    if (window.observeReveal) window.observeReveal(e);
  });
  $$("#home .rv").forEach(function (e, i) { e.style.setProperty("--d", (i * 0.12) + "s"); });

  /* ---------- count-up numbers ---------- */
  var counters = $$("[data-count]");
  if (counters.length) {
    var cio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting || e.target.dataset.done) return;
        e.target.dataset.done = "1";
        var end = +e.target.getAttribute("data-count"), t0 = performance.now(), dur = 1600;
        if (reduce) { e.target.textContent = end; return; }
        (function step(now) {
          var k = Math.min(1, (now - t0) / dur), v = 1 - Math.pow(1 - k, 4);
          e.target.textContent = Math.round(end * v);
          if (k < 1) requestAnimationFrame(step);
        })(t0);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { cio.observe(c); });
  }

  if (reduce) return;

  /* ---------- card tilt ---------- */
  window.attachTilt = function (el, max) {
    if (!fine) return;
    el.classList.add("tilt");
    el.addEventListener("pointermove", function (e) {
      var r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--ry", ((px - 0.5) * max * 2).toFixed(2) + "deg");
      el.style.setProperty("--rx", ((0.5 - py) * max * 2).toFixed(2) + "deg");
      el.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
      el.style.setProperty("--my", (py * 100).toFixed(1) + "%");
      el.classList.add("moving");
    });
    el.addEventListener("pointerleave", function () {
      el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); el.classList.remove("moving");
    });
  };
  $$(".panel:not(.intro)").forEach(function (p) { window.attachTilt(p, 3); });
  window.attachTilt($("#contact-form"), 2);

  /* ---------- magnetic buttons ---------- */
  if (fine) {
    $$(".btn, .cta, .circle, .social").forEach(function (b) {
      b.addEventListener("pointermove", function (e) {
        var r = b.getBoundingClientRect();
        b.style.translate = ((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1) + "px " +
                            ((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1) + "px";
      });
      b.addEventListener("pointerleave", function () { b.style.translate = "0 0"; });
    });
  }

  /* ---------- cursor glow ---------- */
  var glow = $("#glow");
  if (glow && fine) {
    var gx = innerWidth / 2, gy = innerHeight / 2, tx = gx, ty = gy, run = false;
    var loop = function () {
      gx += (tx - gx) * 0.14; gy += (ty - gy) * 0.14;
      glow.style.transform = "translate3d(" + gx.toFixed(1) + "px," + gy.toFixed(1) + "px,0)";
      if (Math.abs(tx - gx) + Math.abs(ty - gy) > 0.3) requestAnimationFrame(loop); else run = false;
    };
    window.addEventListener("pointermove", function (e) {
      tx = e.clientX; ty = e.clientY; glow.style.opacity = 1;
      if (!run) { run = true; requestAnimationFrame(loop); }
    }, { passive: true });
    document.addEventListener("pointerleave", function () { glow.style.opacity = 0; });
  }

  /* ---------- hero particle field ---------- */
  var cv = $("#fx");
  if (cv && cv.getContext) {
    var x = cv.getContext("2d"), dpr = Math.min(2, window.devicePixelRatio || 1);
    var W = 0, H = 0, pts = [], vis = true, mx = -999, my = -999, raf = 0;
    var COL_D = ["167,139,250", "34,211,238", "244,114,182", "251,191,36"], COL_L = ["106,77,240", "10,143,168", "217,45,120", "184,106,0"];
    var COL = COL_D, rootEl = document.documentElement;
    var size = function () {
      var r = cv.getBoundingClientRect(); W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(70, Math.max(24, W * H / 17000))); pts = [];
      for (var i = 0; i < n; i++) pts.push({
        x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.6 + 0.7, k: i % 4
      });
    };
    var frame = function () {
      x.clearRect(0, 0, W, H);
      COL = rootEl.getAttribute("data-theme") === "light" ? COL_L : COL_D;
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i]; p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = W + 10; else if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10; else if (p.y > H + 10) p.y = -10;
        x.beginPath(); x.arc(p.x, p.y, p.r, 0, 6.2832); x.fillStyle = "rgba(" + COL[p.k] + ",.85)"; x.fill();
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = dx * dx + dy * dy;
          if (d < 12100) { x.strokeStyle = "rgba(" + COL[p.k] + "," + (0.16 * (1 - d / 12100)).toFixed(3) + ")"; x.lineWidth = 1; x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(q.x, q.y); x.stroke(); }
        }
        var mdx = p.x - mx, mdy = p.y - my, md = mdx * mdx + mdy * mdy;
        if (md < 28000) { x.strokeStyle = "rgba(" + COL[p.k] + "," + (0.35 * (1 - md / 28000)).toFixed(3) + ")"; x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(mx, my); x.stroke(); }
      }
      if (vis) raf = requestAnimationFrame(frame);
    };
    size(); window.addEventListener("resize", size);
    window.addEventListener("pointermove", function (e) { var r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; }, { passive: true });
    new IntersectionObserver(function (es) {
      vis = es[0].isIntersecting; cancelAnimationFrame(raf); if (vis) raf = requestAnimationFrame(frame);
    }).observe(cv);
    raf = requestAnimationFrame(frame);
  }
})();
