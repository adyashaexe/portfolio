/* ============================================================
   experience-section.js — turns vertical scroll into horizontal
   travel along a sticky timeline. A glowing path line draws itself
   as you go, lighting a node for each stop, and each panel's text
   fades in as it reaches the middle of the screen.
   Honors prefers-reduced-motion (the CSS stacks the panels instead).
   ============================================================ */
(function () {
  "use strict";
  var section = document.getElementById("experience");
  var track = document.getElementById("exp-track");
  var bar = document.getElementById("exp-bar");
  if (!section || !track) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  section.classList.add("exp-js");

  var years = Array.prototype.slice.call(track.querySelectorAll("[data-parallax]"));
  var panels = Array.prototype.slice.call(track.querySelectorAll(".panel:not(.intro)"));
  var overflow = 0;

  /* path line + one node per panel */
  var line = document.createElement("div");
  line.className = "exp-line";
  line.setAttribute("aria-hidden", "true");
  var fill = document.createElement("i");
  fill.className = "fill";
  line.appendChild(fill);
  var nodes = panels.map(function (p) {
    var n = document.createElement("div");
    n.className = "exp-node";
    var label = document.createElement("span");
    label.textContent = p.getAttribute("data-step") || "";
    n.appendChild(label);
    line.appendChild(n);
    return n;
  });
  track.insertBefore(line, track.firstChild);

  var xs = [];
  function layout() {
    var vw = window.innerWidth, vh = window.innerHeight;
    var rightPad = Math.min(vw * 0.08, 100);
    overflow = Math.max(0, track.scrollWidth - vw + rightPad);
    section.style.height = (vh + overflow) + "px";   // 1px of scroll = 1px of travel
    xs = panels.map(function (p, i) {
      var x = p.offsetLeft + p.offsetWidth / 2;
      nodes[i].style.left = x + "px";
      return x;
    });
  }
  layout();
  window.addEventListener("resize", layout);
  window.addEventListener("load", layout);

  var clamp = function (v, lo, hi) { return Math.min(hi, Math.max(lo, v)); };

  function target() {
    var vh = window.innerHeight, total = section.offsetHeight - vh;
    return clamp(-section.getBoundingClientRect().top / total, 0, 1);
  }
  function apply(q) {
    track.style.transform = "translate3d(" + (-q * overflow) + "px,0,0)";
    bar.style.width = (q * 100) + "%";
    var mid = window.innerWidth / 2;

    // the path fills up to the middle of the screen
    var headX = mid + q * overflow;
    fill.style.width = Math.max(0, headX) + "px";
    for (var n = 0; n < nodes.length; n++) nodes[n].classList.toggle("on", xs[n] < headX + 4);

    // read first, write after, to avoid layout thrash
    var yr = years.map(function (y) { var r = y.parentElement.getBoundingClientRect(); return (r.left + r.width / 2 - mid) * -0.1; });
    var pk = panels.map(function (el) {
      var r = el.getBoundingClientRect();
      return clamp(1 - Math.abs(r.left + r.width / 2 - mid) / (window.innerWidth * 0.62), 0, 1);
    });
    years.forEach(function (y, i) { y.style.transform = "translate3d(" + yr[i].toFixed(1) + "px,0,0)"; });
    panels.forEach(function (el, i) {
      el.style.opacity = (0.62 + 0.38 * pk[i]).toFixed(3);
      el.style.scale = (0.93 + 0.07 * pk[i]).toFixed(4);
      el.classList.toggle("lit", pk[i] > 0.42);
    });
  }
  window.smoothScroll(target, apply);
})();
