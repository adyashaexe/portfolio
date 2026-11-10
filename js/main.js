/* ============================================================
   main.js — shared behaviour: config binding, loader, nav, toast,
   resume button, reveal-on-scroll, project modal.
   ============================================================ */
(function () {
  "use strict";
  var SITE = window.SITE || {};
  var PROJECTS = window.PROJECTS || [];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* rAF-throttled scroll helper shared by the other modules */
  var scrollFns = [], ticking = false;
  window.onScrollRaf = function (fn) {
    scrollFns.push(fn); fn();
  };
  function runScroll() { ticking = false; scrollFns.forEach(function (f) { f(); }); }
  function queue() { if (!ticking) { ticking = true; requestAnimationFrame(runScroll); } }
  window.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("resize", queue);

  /* ---------- Toast ---------- */
  window.toast = function (msg, ms) {
    var box = $("#toasts"), t = document.createElement("div");
    t.className = "toast"; t.textContent = msg; box.appendChild(t);
    setTimeout(function () { t.classList.add("out"); setTimeout(function () { t.remove(); }, 380); }, ms || 3600);
  };

  /* ---------- Bind config to the page ---------- */
  $$("[data-href]").forEach(function (a) {
    var k = a.getAttribute("data-href");
    a.href = k === "mailto" ? "mailto:" + SITE.email : SITE[k] || "#";
  });
  var photo = $("#hero-photo");
  if (photo) {
    photo.addEventListener("error", function () {
      if (photo.getAttribute("data-fallback")) return;
      photo.setAttribute("data-fallback", "1"); photo.src = SITE.photoFallback;
    });
    photo.src = SITE.photo || SITE.photoFallback;
  }
  var tag = $("#hero-tagline"); if (tag && SITE.tagline) tag.textContent = SITE.tagline;
  var yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Résumé buttons ---------- */
  function downloadResume(e) {
    e.preventDefault();
    var href = SITE.resume;
    function go() {
      var a = document.createElement("a");
      a.href = href; a.download = SITE.resumeFileName || "resume.pdf";
      document.body.appendChild(a); a.click(); a.remove();
    }
    fetch(href, { method: "HEAD" })
      .then(function (r) {
        if (r.ok) go();
        else window.toast("Résumé not found yet. Add your PDF at " + href + " (see README).", 5200);
      })
      .catch(go); // e.g. opened straight from disk (file://), just try the download
  }
  $$("[data-resume]").forEach(function (el) {
    el.setAttribute("href", SITE.resume || "#");
    el.addEventListener("click", downloadResume);
  });

  /* ---------- Copy email ---------- */
  var copy = $("#copy-mail");
  if (copy) copy.addEventListener("click", function () {
    var done = function () { window.toast("Email copied: " + SITE.email); };
    if (navigator.clipboard) navigator.clipboard.writeText(SITE.email).then(done, done);
    else done();
  });

  /* ---------- Preloader (orbital wavy dots) ---------- */
  (function () {
    var c = $("#orbit"), loader = $("#loader");
    if (!c || !loader) return;
    var x = c.getContext("2d"), S = 440, R = 150, N = 28, t0 = performance.now(), dead = false;
    function frame(now) {
      var t = (now - t0) / 1000; x.clearRect(0, 0, S, S);
      for (var i = 0; i < N; i++) {
        var a = (i / N) * Math.PI * 2 + t * 1.2, w = Math.sin(a * 3 + t * 3) * 14;
        var px = S / 2 + Math.cos(a) * (R + w), py = S / 2 + Math.sin(a) * (R + w);
        x.beginPath(); x.arc(px, py, 2 + 1.6 * Math.pow(Math.sin(a * 2 + t * 2), 2), 0, 7);
        x.fillStyle = "rgba(242,242,240," + (0.35 + 0.65 * ((i / N + t * 0.3) % 1)) + ")"; x.fill();
      }
      if (!dead) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    var hidden = false;
    function hide() {
      if (hidden) return; hidden = true;
      loader.classList.add("done");
      setTimeout(function () { dead = true; revealHero(); }, 850);
      revealHero();
    }
    window.addEventListener("load", function () { setTimeout(hide, reduce ? 0 : 1100); });
    setTimeout(hide, 3500);
  })();

  /* ---------- Reveal on scroll (re-triggers on revisit) ---------- */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { e.target.classList.toggle("in", e.isIntersecting); });
  }, { threshold: 0.15 });
  $$(".rv").forEach(function (el) { io.observe(el); });
  function revealHero() { $$("#home .rv").forEach(function (el) { el.classList.add("in"); }); }

  /* ---------- Header state + scroll-spy ---------- */
  var header = $("#site-header"), links = $$("[data-nav]");
  var spyIds = ["home", "about", "experience", "projects", "focus", "skills", "contact"];
  window.onScrollRaf(function () {
    header.classList.toggle("scrolled", window.scrollY > 40);
    var cur = "home", vh = window.innerHeight;
    spyIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < vh * 0.4) cur = id;
    });
    links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("data-nav") === cur); });
  });

  /* ---------- Mobile drawer ---------- */
  var drawer = $("#drawer"), burger = $("#burger");
  function drawerSet(open) {
    drawer.classList.toggle("open", open);
    drawer.setAttribute("aria-hidden", String(!open));
    burger.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  }
  burger.addEventListener("click", function () { drawerSet(true); });
  $("#drawer-close").addEventListener("click", function () { drawerSet(false); });
  drawer.addEventListener("click", function (e) {
    if (e.target === drawer || e.target.closest("a")) drawerSet(false);
  });

  /* ---------- Project modal ---------- */
  var modal = $("#modal"), card = $("#modal-card"), lastFocus = null;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  window.openProject = function (i) {
    var p = PROJECTS[i]; if (!p) return;
    lastFocus = document.activeElement;
    card.innerHTML =
      '<button class="close" aria-label="Close">✕</button>' +
      '<span class="eyebrow">' + esc(p.kind) + " · " + esc(p.status) + "</span>" +
      '<h3 id="m-title">' + esc(p.name) + "</h3>" +
      '<img class="m-img" src="' + esc(p.image) + '" alt="">' +
      "<p>" + esc(p.blurb) + "</p>" +
      '<div class="grid"><div><h4>What it covers</h4><ul>' +
      p.done.map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("") +
      '</ul></div><div><h4>Stack</h4><div class="chips">' +
      p.stack.map(function (s) { return "<span>" + esc(s) + "</span>"; }).join("") +
      '</div></div></div><div class="links"><a class="btn solid" href="' + esc(p.link) +
      '" target="_blank" rel="noopener">View on GitHub ↗</a></div>';
    modal.classList.add("open"); modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    var close = $(".close", card); close.addEventListener("click", closeProject); close.focus();
  };
  function closeProject() {
    modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  modal.addEventListener("click", function (e) { if (e.target === modal) closeProject(); });
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeProject(); drawerSet(false); }
  });
})();
