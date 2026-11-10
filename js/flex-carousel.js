/* ============================================================
   flex-carousel.js — accordion-style card slider. Hover (on
   devices with a pointer), click, tap or arrow keys to expand a
   card. Hero links with data-focus jump straight to a card.
   ============================================================ */
(function () {
  "use strict";
  var F = window.FOCUS || [];
  var root = document.getElementById("flexcar");
  if (!root || !F.length) return;
  var canHover = window.matchMedia("(hover: hover)").matches;
  var cards = [], active = 0, lockUntil = 0;

  F.forEach(function (f, i) {
    var c = document.createElement("div");
    c.className = "fc"; c.setAttribute("role", "tab"); c.tabIndex = 0;
    c.innerHTML = '<img alt="" draggable="false"><span class="vlabel"></span>' +
      '<div class="body"><h3></h3><p></p><div class="chips"></div></div>';
    c.querySelector("img").src = f.image;
    c.querySelector(".vlabel").textContent = f.title;
    c.querySelector("h3").textContent = f.title;
    c.querySelector("p").textContent = f.text;
    if (f.accent) { c.style.setProperty("--a1", f.accent[0]); c.style.setProperty("--a2", f.accent[1]); }
    f.tags.forEach(function (t, k) {
      var s = document.createElement("span"); s.textContent = t; s.style.setProperty("--i", k);
      c.querySelector(".chips").appendChild(s);
    });
    c.addEventListener("click", function () { select(i); });
    if (canHover) c.addEventListener("mouseenter", function () {
      if (Date.now() > lockUntil) select(i);   // ignore hovers caused by the page scrolling under the cursor
    });
    c.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); select(Math.min(F.length - 1, i + 1), true); }
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); select(Math.max(0, i - 1), true); }
      else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(i); }
    });
    root.appendChild(c); cards.push(c);
  });

  function select(i, focus) {
    active = i;
    cards.forEach(function (c, k) {
      c.classList.toggle("active", k === i);
      c.setAttribute("aria-selected", k === i ? "true" : "false");
    });
    if (focus) cards[i].focus();
  }
  select(0);

  Array.prototype.forEach.call(document.querySelectorAll("[data-focus]"), function (a) {
    a.addEventListener("click", function () {
      lockUntil = Date.now() + 1800;
      select(+a.getAttribute("data-focus"));
    });
  });
  window.FlexCarousel = { select: select };
})();
