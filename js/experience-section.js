/* ============================================================
   experience-section.js — turns vertical scroll into horizontal
   travel along a sticky timeline. Honors prefers-reduced-motion
   (the CSS stacks the panels vertically instead).
   ============================================================ */
(function () {
  "use strict";
  var section = document.getElementById("experience");
  var track = document.getElementById("exp-track");
  var bar = document.getElementById("exp-bar");
  if (!section || !track) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var years = Array.prototype.slice.call(track.querySelectorAll("[data-parallax]"));
  var overflow = 0;

  function layout() {
    var vw = window.innerWidth, vh = window.innerHeight;
    var rightPad = Math.min(vw * 0.08, 100);
    overflow = Math.max(0, track.scrollWidth - vw + rightPad);
    section.style.height = (vh + overflow) + "px";   // 1px of scroll = 1px of travel
  }
  layout();
  window.addEventListener("resize", layout);
  window.addEventListener("load", layout);

  window.onScrollRaf(function () {
    var vh = window.innerHeight, total = section.offsetHeight - vh;
    var q = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / total));
    track.style.transform = "translate3d(" + (-q * overflow) + "px,0,0)";
    bar.style.width = (q * 100) + "%";
    var mid = window.innerWidth / 2;
    years.forEach(function (y) {
      var r = y.parentElement.getBoundingClientRect();
      y.style.transform = "translate3d(" + ((r.left + r.width / 2 - mid) * -0.1).toFixed(1) + "px,0,0)";
    });
  });
})();
