/* ============================================================
   contact.js — the "type a message" form. Messages are sent through
   FormSubmit (see SITE.formEndpoint in js/config.js). If that fails,
   it falls back to opening the visitor's email app, pre-filled.
   ============================================================ */
(function () {
  "use strict";
  var SITE = window.SITE || {};
  var form = document.getElementById("contact-form");
  if (!form) return;
  var btn = document.getElementById("cf-send"), status = document.getElementById("cf-status");
  var $ = function (id) { return document.getElementById(id); };

  function setStatus(msg, kind) { status.textContent = msg; status.className = "cf-status" + (kind ? " " + kind : ""); }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var fd = new FormData(form);
    if (fd.get("_honey")) return;                       // a bot filled the hidden field
    var name = (fd.get("name") || "").trim(), email = (fd.get("email") || "").trim(), message = (fd.get("message") || "").trim();

    var ok = true;
    ["cf-name", "cf-email", "cf-msg"].forEach(function (id) { $(id).parentNode.classList.remove("invalid"); });
    function bad(id) { $(id).parentNode.classList.add("invalid"); ok = false; }
    if (!name) bad("cf-name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) bad("cf-email");
    if (message.length < 5) bad("cf-msg");
    if (!ok) { setStatus("Almost there. Fix the highlighted fields and try again.", "err"); return; }

    btn.disabled = true; btn.textContent = "Sending..."; setStatus("", "");
    fetch(SITE.formEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        name: name, email: email, message: message,
        _subject: "Portfolio message from " + name, _replyto: email, _template: "table", _captcha: "false"
      })
    })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, body: j }; }); })
      .then(function (r) {
        if (!r.ok || String(r.body.success) === "false") throw new Error("send failed");
        form.reset();
        setStatus("Sent. I read everything, so expect a reply soon.", "ok");
        if (window.toast) window.toast("Message delivered. No Trojans detected.");
      })
      .catch(function () {
        var href = "mailto:" + SITE.email + "?subject=" + encodeURIComponent("Portfolio message from " + name) +
          "&body=" + encodeURIComponent(message + "\n\n" + name + " (" + email + ")");
        setStatus("Couldn't send from the page, so I opened your email app instead.", "err");
        window.location.href = href;
      })
      .then(function () { btn.disabled = false; btn.textContent = "Send message"; });
  });
})();
