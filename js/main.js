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
  /* Eases a scroll-driven value so sections glide instead of snapping. */
  window.smoothScroll = function (getTarget, apply) {
    var cur = getTarget(), tgt = cur, run = false;
    function loop() {
      cur += (tgt - cur) * 0.12;
      if (Math.abs(tgt - cur) < 0.0004) { cur = tgt; run = false; }
      apply(cur);
      if (run) requestAnimationFrame(loop);
    }
    window.onScrollRaf(function () { tgt = getTarget(); if (!run) { run = true; requestAnimationFrame(loop); } });
    apply(cur);
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

  /* ---------- Preloader: "hello" in many languages ---------- */
  (function () {
    var loader = $("#loader"), wordEl = $("#hello-word"), langEl = $("#hello-lang"), bar = $("#ld-bar");
    if (!loader || !wordEl) return;
    var GREET = [
      ["Hello", "English"], ["ନମସ୍କାର", "Odia"], ["नमस्ते", "Hindi"], ["Hola", "Spanish"],
      ["Bonjour", "French"], ["こんにちは", "Japanese"], ["안녕하세요", "Korean"], ["Ciao", "Italian"],
      ["你好", "Chinese"], ["Привет", "Russian"], ["Hello", "English"]
    ];
    var COLORS = [["#a78bfa", "#6366f1"], ["#22d3ee", "#3b82f6"], ["#f472b6", "#fb7185"], ["#fbbf24", "#f97316"]];
    var EASE = "cubic-bezier(.16,1,.3,1)";
    var i = 0, seqDone = false, loaded = document.readyState === "complete", hidden = false, timer;

    function show(n) {
      var g = GREET[n], c = COLORS[n % COLORS.length], last = n === GREET.length - 1;
      wordEl.textContent = g[0]; langEl.textContent = g[1];
      wordEl.style.backgroundImage = "linear-gradient(100deg," + c[0] + "," + c[1] + ")";
      bar.style.width = ((n + 1) / GREET.length * 100) + "%";
      if (wordEl.animate && !reduce) {
        wordEl.animate([
          { opacity: 0, transform: "translateY(42%) scale(.94)", filter: "blur(14px)" },
          { opacity: 1, transform: "none", filter: "blur(0)" }
        ], { duration: last ? 700 : 420, easing: EASE, fill: "both" });
        langEl.animate([{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "none" }],
          { duration: 420, easing: EASE, fill: "both" });
      }
    }
    function next() {
      i++;
      if (i >= GREET.length) { seqDone = true; return check(); }
      show(i);
      timer = setTimeout(next, i === GREET.length - 1 ? 900 : 250);
    }
    function check() { if (seqDone && loaded) hide(); }
    function hide() {
      if (hidden) return; hidden = true; clearTimeout(timer);
      loader.classList.add("done");
      document.body.classList.add("ready");
      setTimeout(revealHero, reduce ? 0 : 450);
    }

    show(0);
    if (reduce) { window.addEventListener("load", function () { setTimeout(hide, 300); }); setTimeout(hide, 1500); return; }
    timer = setTimeout(next, 600);
    if (!loaded) window.addEventListener("load", function () { loaded = true; check(); });
    loader.addEventListener("click", hide);       // click to skip
    setTimeout(hide, 7000);                       // failsafe
  })();

  /* ---------- Reveal on scroll (re-triggers on revisit) ---------- */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { e.target.classList.toggle("in", e.isIntersecting); });
  }, { threshold: 0.15 });
  $$(".rv").forEach(function (el) { io.observe(el); });
  window.observeReveal = function (el) { el.classList.add("rv"); io.observe(el); };
  function revealHero() { $$("#home .rv").forEach(function (el) { el.classList.add("in"); }); }

  /* ---------- Header state + scroll-spy ---------- */
  var prog = $("#progress i");
  var header = $("#site-header"), links = $$("[data-nav]");
  var spyIds = ["home", "about", "experience", "projects", "focus", "skills", "contact"];
  window.onScrollRaf(function () {
    header.classList.toggle("scrolled", window.scrollY > 40);
    if (prog) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.transform = "scaleX(" + (max > 0 ? Math.min(1, window.scrollY / max) : 0) + ")";
    }
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
      p.stack.map(function (s, k) { return '<span style="--i:' + k + '">' + esc(s) + "</span>"; }).join("") +
      '</div></div></div><div class="links"><a class="btn solid" href="' + esc(p.link) +
      '" target="_blank" rel="noopener">View on GitHub ↗</a></div>';
    var ac = p.accent || ["#a78bfa", "#22d3ee"];
    card.style.setProperty("--a1", ac[0]); card.style.setProperty("--a2", ac[1]);
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
