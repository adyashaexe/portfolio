/* ============================================================
   scroll-expand-media.js — a small media card that expands to fill
   the screen as you scroll, unblurring and revealing the About text.
   ============================================================ */
(function () {
  "use strict";
  var scroll = document.getElementById("sx-scroll");
  if (!scroll) return;
  var card = document.getElementById("sx-card"), img = document.getElementById("sx-img"),
      shade = document.getElementById("sx-shade"), text = document.getElementById("sx-text"),
      left = document.getElementById("sx-left"), right = document.getElementById("sx-right"),
      hint = document.getElementById("sx-hint"), st = document.getElementById("statement");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // split the statement into words so they can light up one by one
  st.innerHTML = st.textContent.trim().split(/\s+/).map(function (w) { return '<span class="w">' + w + "</span>"; }).join(" ");
  var words = Array.prototype.slice.call(st.querySelectorAll(".w"));

  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var ease = function (t) { return 1 - Math.pow(1 - t, 3); };

  function render(p) {
    var vw = window.innerWidth, vh = window.innerHeight, small = vw < 760;
    var baseW = small ? 240 : 300, baseH = small ? 330 : 400;
    var e = ease(clamp(p / 0.7, 0, 1));
    card.style.width = lerp(baseW, vw, e) + "px";
    card.style.height = lerp(baseH, vh, e) + "px";
    card.style.borderRadius = lerp(28, 0, e) + "px";
    img.style.filter = "blur(" + lerp(10, 0, e).toFixed(2) + "px)";
    img.style.transform = "scale(" + lerp(1.12, 1, e).toFixed(3) + ")";
    left.style.transform = "translate3d(" + (-e * 55) + "vw,0,0)";
    right.style.transform = "translate3d(" + (e * 55) + "vw,0,0)";
    left.style.opacity = right.style.opacity = clamp(1 - e * 1.15, 0, 1);
    shade.style.opacity = clamp((p - 0.5) / 0.3, 0, 1);
    var t = clamp((p - 0.65) / 0.25, 0, 1);
    text.style.opacity = t; text.style.transform = "translateY(" + (1 - t) * 24 + "px)";
    var q = clamp((p - 0.7) / 0.28, 0, 1);
    words.forEach(function (w, i) { w.classList.toggle("on", i / words.length < q + 0.001 && q > 0); });
    hint.style.opacity = p < 0.04 ? 1 : 0;
  }

  if (reduce) {
    scroll.style.height = "100vh";
    var apply = function () { render(1); words.forEach(function (w) { w.classList.add("on"); }); };
    apply(); window.addEventListener("resize", apply);
    return;
  }
  window.smoothScroll(function () {
    var total = scroll.offsetHeight - window.innerHeight;
    return clamp(-scroll.getBoundingClientRect().top / total, 0, 1);
  }, render);
})();
