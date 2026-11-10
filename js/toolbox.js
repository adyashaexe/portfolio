/* ============================================================
   toolbox.js — renders the Toolbox from window.TOOLBOX (edit it in
   js/projects-data.js). Two counter-scrolling marquees, plus grouped
   chips that pop in one by one and then drift gently.
   ============================================================ */
(function () {
  "use strict";
  var T = window.TOOLBOX || [];
  var grid = document.getElementById("skillgrid"), mq = document.getElementById("tech-marquee");
  if (!grid || !T.length) return;

  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls; if (txt) e.textContent = txt; return e;
  }

  // groups
  T.forEach(function (g) {
    var card = el("div", "group");
    card.style.setProperty("--c", g.color);
    var h = el("h3"); h.appendChild(el("i")); h.appendChild(document.createTextNode(g.title));
    var box = el("div", "techs");
    g.items.forEach(function (name, i) {
      var chip = el("span", "tech"); chip.style.setProperty("--i", i);
      chip.appendChild(el("span", "", name)); box.appendChild(chip);
    });
    card.appendChild(h); card.appendChild(box); grid.appendChild(card);
    if (window.attachTilt) window.attachTilt(card, 5);
  });

  // marquee rows
  if (mq) {
    var all = [];
    T.forEach(function (g) { g.items.forEach(function (n) { all.push({ n: n, c: g.color }); }); });
    function row(list, rev) {
      var r = el("div", "tm-row" + (rev ? " rev" : ""));
      list.concat(list).forEach(function (t) {
        var s = el("span"); s.style.setProperty("--c", t.c);
        s.appendChild(el("i")); s.appendChild(document.createTextNode(t.n)); r.appendChild(s);
      });
      return r;
    }
    var half = Math.ceil(all.length / 2);
    mq.appendChild(row(all.slice(0, half).concat(all.slice(half)), false));
    mq.appendChild(row(all.slice().reverse(), true));
  }

  // pop in when visible (re-triggers on revisit)
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { e.target.classList.toggle("in", e.isIntersecting); });
  }, { threshold: 0.25 });
  Array.prototype.forEach.call(grid.children, function (c) { io.observe(c); });
})();
