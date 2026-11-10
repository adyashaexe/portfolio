/* ============================================================
   writing.js — renders the Medium posts from window.WRITING
   (edit it in js/projects-data.js).
   ============================================================ */
(function () {
  "use strict";
  var W = window.WRITING || [];
  var box = document.getElementById("posts");
  if (!box || !W.length) return;

  W.forEach(function (w, i) {
    var a = document.createElement("a");
    a.className = "post";
    a.href = w.url; a.target = "_blank"; a.rel = "noopener";
    if (w.color) a.style.setProperty("--c", w.color);
    a.style.setProperty("--d", (i * 0.1) + "s");
    var when = document.createElement("span"); when.className = "when"; when.textContent = "Medium · " + w.date;
    var h = document.createElement("h3"); h.textContent = w.title;
    var p = document.createElement("p"); p.textContent = w.blurb;
    var go = document.createElement("span"); go.className = "go";
    go.appendChild(document.createTextNode("Read the story "));
    var arrow = document.createElement("span"); arrow.setAttribute("aria-hidden", "true"); arrow.textContent = "↗"; go.appendChild(arrow);
    a.appendChild(when); a.appendChild(h); a.appendChild(p); a.appendChild(go);
    box.appendChild(a);
    if (window.observeReveal) window.observeReveal(a);
  });
})();
