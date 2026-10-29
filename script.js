/* ==========================================================
   Builds the page from content/site.json.
   Staff edit content/site.json through the editing panel;
   nothing in this file needs to change for normal updates.
   ========================================================== */
(function () {
  document.documentElement.classList.remove("no-js");

  var ICONS = {
    book: '<path d="M3 5.5c3-1.2 6-1 9 1 3-2 6-2.2 9-1V19c-3-1.2-6-1-9 1-3-2-6-2.2-9-1z"/><path d="M12 6.5V20"/>',
    shield: '<path d="M12 2.5l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10v-6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    cap: '<path d="M12 4L23 9l-11 5L1 9z"/><path d="M5.5 11.8v4.7c3.5 3 9.5 3 13 0v-4.7"/><path d="M23 9v6"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
    wa: '<path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.3z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1a4 4 0 0 1-2-2l1-1-1-2z"/>',
    doc: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
    person: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    bell: '<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>'
  };
  var VALUE_ICONS = ["book", "shield", "star", "cap"];

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function icon(name) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[name] + "</svg>"; }
  function get(obj, path) { return path.split(".").reduce(function (o, k) { return o ? o[k] : undefined; }, obj); }
  function list(a) { return Array.isArray(a) ? a.filter(Boolean) : []; }
  function digits(p) { return String(p || "").replace(/\D/g, ""); }
  function tel(p) { return "tel:" + digits(p); }
  function wa(p, text) {
    var d = digits(p);
    if (d.indexOf("0") === 0) d = "92" + d.slice(1);
    return "https://wa.me/" + d + (text ? "?text=" + encodeURIComponent(text) : "");
  }
  function initials(name) {
    return String(name || "").split(/\s+/).filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join("").toUpperCase();
  }
  function paras(text) {
    return String(text || "").split(/\n\s*\n|\r\n\s*\r\n/).map(function (p) { return p.trim(); }).filter(Boolean)
      .map(function (p) { return "<p>" + esc(p).replace(/\n/g, "<br>") + "</p>"; }).join("");
  }
  function logo(c, cls) {
    if (c.school.logo) return '<img src="' + esc(c.school.logo) + '" alt="' + esc(c.school.name) + ' logo">';
    return '<svg viewBox="0 0 400 420" role="img" aria-label="School crest"' + (cls ? ' class="' + cls + '"' : "") + '><use href="#crest"></use></svg>';
  }
  function head(o, center) {
    return '<div class="head reveal' + (center ? " center" : "") + '">' +
      (o.eyebrow ? '<div class="eyebrow">' + esc(o.eyebrow) + "</div>" : "") +
      "<h2>" + esc(o.title) + "</h2>" +
      (o.intro ? "<p>" + esc(o.intro) + "</p>" : "") + "</div>";
  }

  /* ---------- page sections ---------- */
  function render(c) {
    var hm = c.headmaster, s = c.school, a = c.admissions, phoneTxt = esc(hm.phone);
    var html = "";

    // Hero
    var title = esc(c.hero.title);
    title = title.replace(/(Secondary School)$/, '<span class="accent">$1</span>');
    html +=
      '<section class="hero" id="top">' +
      '<div class="wrap">' +
      '<div>' +
      (c.announcement.show ? '<div class="badge-open reveal"><span class="tag">' + esc(c.announcement.text_en) + '</span><span class="urdu" lang="ur" dir="rtl">' + esc(c.announcement.text_ur) + "</span></div>" : "") +
      '<h1 class="reveal d1">' + title + "</h1>" +
      '<p class="lead reveal d2">' + esc(c.hero.intro) + "</p>" +
      '<div class="actions reveal d3"><button class="btn gold" type="button" data-apply>Apply for admission</button>' +
      '<a class="btn ghost" href="#admissions">Admission details</a></div>' +
      '<ul class="chips reveal d3">' + list(c.hero.chips).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
      "</div>" +
      '<div class="hero-art"><div class="halo"><span class="ring"></span><div class="crest-lg">' + logo(c) + "</div></div></div>" +
      "</div>" +
      '<svg class="hero-wave" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true"><path fill="#f4f7fc" d="M0 70V30c240 30 480 40 720 20S1200 0 1440 20v50z"/></svg>' +
      "</section>";

    // Important announcements strip (just under the top banner)
    var ann = c.announcements || {}, annItems = list(ann.items).filter(function (n) { return n.title; });
    var important = annItems.filter(function (n) { return n.important; }).slice(0, 3);
    if (important.length) {
      html += '<div class="notices"><div class="wrap"><div class="notice-list">' +
        important.map(function (n, i) {
          return '<a class="notice reveal d' + (i % 3) + '" href="#announcements"><div class="date">' + esc(n.date || "New") + "</div><h3>" + esc(n.title) + "</h3><p>" + esc(n.text) + "</p></a>";
        }).join("") + "</div></div></div>";
    }

    // Announcements
    var SHOW = 6;
    html += '<section id="announcements" class="ann-section"><div class="wrap">' + head(ann) +
      (annItems.length
        ? '<div class="ann-grid">' + annItems.map(function (n, i) {
            return '<article class="ann reveal d' + (i % 3) + (n.important ? " important" : "") + '"' + (i >= SHOW ? " data-more hidden" : "") + ">" +
              (n.image ? '<div class="ann-img"><img loading="lazy" src="' + esc(n.image) + '" alt=""></div>' : "") +
              '<div class="ann-body"><div class="ann-meta">' +
              (n.date ? '<span class="ann-date">' + icon("cal") + esc(n.date) + "</span>" : "") +
              (n.category ? '<span class="ann-cat">' + esc(n.category) + "</span>" : "") +
              (n.important ? '<span class="ann-imp">Important</span>' : "") +
              "</div><h3>" + esc(n.title) + '</h3><div class="ann-text">' + paras(n.text) + "</div>" +
              '<button class="ann-toggle" type="button" hidden>Read more</button></div></article>';
          }).join("") + "</div>" +
          (annItems.length > SHOW ? '<div class="center-btn"><button class="btn line" type="button" id="ann-all">View all announcements (' + annItems.length + ")</button></div>" : "")
        : '<div class="empty reveal">' + icon("bell") + "<p>No announcements right now. Please check back soon.</p></div>") +
      "</div></section>";

    // Values / About
    html += '<section id="about" class="alt"><div class="wrap">' + head(c.values) +
      '<div class="values-grid">' + list(c.values.items).map(function (v, i) {
        return '<div class="value reveal d' + (i % 4) + '"><div class="ico">' + icon(VALUE_ICONS[i % 4]) + "</div><h3>" + esc(v.title) + "</h3><p>" + esc(v.text) + "</p></div>";
      }).join("") + "</div></div></section>";

    // Minister's message
    var m = c.minister;
    if (m && m.show) {
      html += '<section class="minister" id="message"><div class="wrap">' +
        head({ eyebrow: m.eyebrow, title: "Message from the " + m.role }) +
        '<div class="min-grid">' +
        '<aside class="min-card reveal"><div class="min-photo">' +
        (m.photo ? '<img src="' + esc(m.photo) + '" alt="' + esc(m.name || m.role) + '">' : icon("person")) +
        '</div><div class="role">' + esc(m.role) + "</div>" +
        (m.name ? "<h3>" + esc(m.name) + "</h3>" : "<h3>Government of Sindh</h3>") +
        '<div class="gov">Education and Literacy Department</div></aside>' +
        '<div><div class="letter reveal d1"><div class="msg clamped" id="msg">' + paras(m.message) + "</div>" +
        '<button class="btn line read-more" type="button" id="read-more">Read full message</button></div>' +
        '<div class="stats">' + list(m.stats).map(function (st, i) {
          return '<div class="stat reveal d' + (i % 4) + '"><div class="num" data-count="' + esc(st.value) + '">' + esc(st.value) + '</div><div class="lbl">' + esc(st.label) + "</div></div>";
        }).join("") + "</div></div></div></div></section>";
    }

    // Teachers
    var t = c.teachers || {}, teachers = list(t.list).filter(function (x) { return x.name; });
    var groups = [];
    teachers.forEach(function (x) { if (x.section && groups.indexOf(x.section) < 0) groups.push(x.section); });
    html += '<section id="teachers" class="alt"><div class="wrap">' + head(t) +
      (teachers.length
        ? (groups.length > 1 ? '<div class="filters reveal" role="group" aria-label="Filter teachers"><button type="button" class="on" data-filter="">All</button>' +
            groups.map(function (g) { return '<button type="button" data-filter="' + esc(g) + '">' + esc(g) + "</button>"; }).join("") + "</div>" : "") +
          '<div class="teacher-grid">' + teachers.map(function (x, i) {
            return '<article class="teacher reveal d' + (i % 4) + '" data-section="' + esc(x.section || "") + '">' +
              '<div class="t-photo">' + (x.photo ? '<img loading="lazy" src="' + esc(x.photo) + '" alt="' + esc(x.name) + '">' : '<span class="t-init">' + esc(initials(x.name)) + "</span>") +
              (x.section ? '<span class="t-sec">' + esc(x.section) + "</span>" : "") + "</div>" +
              '<div class="t-body"><h3>' + esc(x.name) + "</h3>" +
              (x.subject ? '<div class="t-subj">' + esc(x.subject) + "</div>" : "") +
              (x.qualification ? '<div class="t-qual">' + icon("cap") + esc(x.qualification) + "</div>" : "") +
              (x.bio ? '<p class="t-bio">' + esc(x.bio) + "</p>" : "") + "</div></article>";
          }).join("") + "</div>"
        : '<div class="empty reveal">' + icon("person") + "<p>Teacher profiles will be added soon.</p></div>") +
      "</div></section>";

    // Classes
    var k = c.classes_section;
    html += '<section id="classes"><div class="wrap">' + head(k) +
      '<div class="sec-grid">' +
      '<div class="sec-card girls reveal"><span class="big">1–5</span><span class="tag">' + esc(k.girls.tag) + "</span><h3>" + esc(k.girls.title) + "</h3><p>" + esc(k.girls.text) + "</p></div>" +
      '<div class="sec-card boys reveal d1"><span class="big">6–10</span><span class="tag">' + esc(k.boys.tag) + "</span><h3>" + esc(k.boys.title) + "</h3><p>" + esc(k.boys.text) + "</p></div>" +
      "</div>" +
      '<div class="class-strip reveal"><span class="lbl">Classes</span><div class="class-pills">' +
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (n) { return "<span>" + n + "</span>"; }).join("") +
      "</div></div></div></section>";

    // Online
    var o = c.online;
    html += '<section class="online" id="online"><div class="wrap online-grid">' +
      "<div>" + head(o) + '<button class="btn gold reveal" type="button" data-apply data-mode="Online class">Apply for online class</button></div>' +
      '<div class="points">' + list(o.points).map(function (p, i) {
        return '<div class="point reveal d' + (i % 3) + '"><span class="n">' + (i + 1) + "</span><div><h3>" + esc(p.title) + "</h3><p>" + esc(p.text) + "</p></div></div>";
      }).join("") + "</div></div></section>";

    // Admissions
    html += '<section class="alt" id="admissions"><div class="wrap">' + head(a, true) +
      '<div class="steps">' + list(a.steps).map(function (st, i) {
        return '<div class="step reveal d' + (i % 4) + '"><div class="n">' + (i + 1) + "</div><h3>" + esc(st.title) + "</h3><p>" + esc(st.text) + "</p></div>";
      }).join("") + "</div>" +
      '<div class="adm-grid">' +
      '<div class="docs reveal"><h3>' + icon("doc").replace("<svg", '<svg width="26" height="26" fill="none" stroke="#d4a72c" stroke-width="2"') + " Documents to bring</h3><ul>" +
      list(a.documents).map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("") + "</ul>" +
      '<div style="margin-top:18px"><button class="btn" type="button" data-apply>Fill the admission form</button></div></div>' +
      '<div class="callout reveal d1"><h3>' + esc(a.callout_title) + "</h3><p>" + esc(a.callout_text) + '</p><p class="hm">Head Master: ' + esc(hm.name) + " · " + phoneTxt + "</p>" +
      '<div class="actions"><a class="btn" href="' + tel(hm.phone) + '">' + icon("phone") + 'Call now</a><button class="btn line" type="button" data-copy>' + icon("copy") + "Copy number</button></div></div>" +
      "</div>" +
      '<div class="banner reveal"><div><h3>' + esc(a.banner_title) + "</h3><p>" + esc(a.banner_text) + "</p></div>" +
      '<div class="actions"><button class="btn gold" type="button" data-apply>Apply now</button><a class="btn ghost" href="' + tel(hm.phone) + '">Call now</a></div></div>' +
      "</div></section>";

    // Gallery (only shows when photos are added)
    var photos = list(c.gallery && c.gallery.photos).filter(function (p) { return p.image; });
    if (photos.length) {
      html += '<section id="gallery"><div class="wrap">' + head({ eyebrow: "Gallery", title: c.gallery.title, intro: c.gallery.intro }) +
        '<div class="gallery-grid">' + photos.map(function (p, i) {
          return '<figure class="reveal d' + (i % 3) + '"><img loading="lazy" src="' + esc(p.image) + '" alt="' + esc(p.caption || "School photo") + '">' +
            (p.caption ? "<figcaption>" + esc(p.caption) + "</figcaption>" : "") + "</figure>";
        }).join("") + "</div></div></section>";
    }

    // Profile
    var prof = [
      ["School name", s.name], ["Short name", s.short_name], ["Type", s.type],
      ["Classes", s.classes], ["Sections", s.sections], ["Head Master", hm.name]
    ];
    html += '<section id="profile"' + (photos.length ? ' class="alt"' : "") + '><div class="wrap">' + head({ eyebrow: "School profile", title: "School at a glance" }) +
      '<div class="profile-grid">' + prof.filter(function (p) { return p[1]; }).map(function (p, i) {
        return '<div class="pf reveal d' + (i % 3) + '"><div class="k">' + esc(p[0]) + '</div><div class="v">' + esc(p[1]) + "</div></div>";
      }).join("") + "</div></div></section>";

    // Contact
    var ct = c.contact;
    html += '<section' + (photos.length ? "" : ' class="alt"') + ' id="contact"><div class="wrap">' + head(ct) +
      '<div class="contact-grid">' +
      '<div class="hm-card reveal"><div class="hm-top"><div class="avatar">' +
      (hm.photo ? '<img src="' + esc(hm.photo) + '" alt="' + esc(hm.name) + '">' : esc(initials(hm.name))) +
      '</div><div><div class="role">Head Master</div><h3>' + esc(hm.name) + "</h3></div></div>" +
      '<div class="phone" id="phone">' + phoneTxt + "</div>" +
      (ct.address ? '<div class="extra">' + esc(ct.address) + "</div>" : "") +
      (ct.email ? '<div class="extra"><a href="mailto:' + esc(ct.email) + '">' + esc(ct.email) + "</a></div>" : "") +
      '<div class="actions"><a class="btn" href="' + tel(hm.phone) + '">' + icon("phone") + 'Call now</a>' +
      '<a class="btn wa" href="' + wa(hm.phone) + '" target="_blank" rel="noopener">' + icon("wa") + "WhatsApp</a>" +
      '<button class="btn line" type="button" data-copy>' + icon("copy") + "Copy number</button></div></div>" +
      '<div class="c-steps">' + list(ct.steps).map(function (st, i) {
        return '<div class="c-step reveal d' + (i % 3) + '"><span class="n">' + (i + 1) + "</span><div><h3>" + esc(st.title) + "</h3><p>" + esc(st.text) + "</p></div></div>";
      }).join("") + "</div></div></div></section>";

    document.getElementById("main").innerHTML = html;

    // Footer
    document.getElementById("footer").innerHTML =
      '<div class="wrap"><div class="top"><div class="fbrand"><span class="crest-sm">' + logo(c) + "</span><div><h4>" + esc(s.name) + '</h4><div class="motto">' + esc(c.footer.motto) + "</div></div></div>" +
      '<nav aria-label="Footer"><a href="#announcements">Announcements</a><a href="#about">About</a><a href="#message">Message</a><a href="#teachers">Teachers</a><a href="#classes">Classes</a><a href="#online">Online classes</a><a href="#admissions">Admissions</a><a href="#profile">Profile</a><a href="#contact">Contact</a></nav></div>' +
      '<div class="bottom"><span>© ' + new Date().getFullYear() + " " + esc(s.short_name) + "</span><span>Head Master: " + esc(hm.name) + ' · <a href="' + tel(hm.phone) + '">' + phoneTxt + "</a></span></div></div>";

    // Header, top bar, simple text bindings
    document.querySelectorAll("[data-logo]").forEach(function (el) { el.innerHTML = logo(c); });
    document.querySelectorAll("[data-text]").forEach(function (el) { el.textContent = get(c, el.getAttribute("data-text")) || ""; });
    var ring = document.getElementById("crest-ring-text"); if (ring && s.crest_ring) ring.textContent = s.crest_ring;
    var rib = document.getElementById("crest-rib-text"); if (rib && s.crest_ribbon) rib.textContent = s.crest_ribbon;
    document.getElementById("ticker").innerHTML = c.announcement.show
      ? '<span class="pulse"></span><b>' + esc(c.announcement.text_en) + '</b><span class="urdu" lang="ur" dir="rtl">' + esc(c.announcement.text_ur) + "</span>"
      : "<b>" + esc(s.name) + "</b>";
    var tp = document.getElementById("top-phone");
    tp.href = tel(hm.phone); tp.textContent = "Head Master: " + hm.name + " · " + hm.phone;
    document.title = s.name + " · " + (s.location || s.short_name);
    if (m && !m.show) { var ml = document.querySelector('.nav a[href="#message"]'); if (ml) ml.remove(); }

    behaviours(c);
  }

  /* ---------- interactions & animations ---------- */
  function behaviours(c) {
    var hm = c.headmaster;

    // Smooth in-page scrolling with header offset
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href").slice(1);
        if (!id) return;
        var target = id === "top" ? document.body : document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false");
        var y = id === "top" ? 0 : target.getBoundingClientRect().top + window.pageYOffset - 76;
        window.scrollTo({ top: y, behavior: "smooth" });
      });
    });

    // Mobile menu
    var nav = document.getElementById("nav"), menuBtn = document.getElementById("menu-btn");
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Header shadow, back-to-top, active link
    var header = document.getElementById("header"), toTop = document.getElementById("to-top");
    var links = Array.prototype.slice.call(nav.querySelectorAll("a"));
    function onScroll() {
      var y = window.pageYOffset;
      header.classList.toggle("scrolled", y > 10);
      toTop.classList.toggle("show", y > 700);
      var current = "";
      links.forEach(function (l) {
        var sec = document.getElementById(l.getAttribute("href").slice(1));
        if (sec && sec.getBoundingClientRect().top < 140) current = l.getAttribute("href");
      });
      links.forEach(function (l) { l.classList.toggle("active", l.getAttribute("href") === current); });
    }
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

    // Reveal on scroll
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      reveals.forEach(function (el) { io.observe(el); });
    } else reveals.forEach(function (el) { el.classList.add("in"); });

    // Count-up numbers
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var nums = document.querySelectorAll("[data-count]");
    function countUp(el) {
      var raw = el.getAttribute("data-count"), mt = raw.match(/[\d,]*\.?\d+/);
      if (!mt || reduce) return;
      var str = mt[0], target = parseFloat(str.replace(/,/g, "")), dec = (str.split(".")[1] || "").length;
      var pre = raw.slice(0, mt.index), post = raw.slice(mt.index + str.length), t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / 1600, 1), e = 1 - Math.pow(1 - p, 3);
        el.textContent = pre + (target * e).toFixed(dec) + post;
        if (p < 1) requestAnimationFrame(step); else el.textContent = raw;
      }
      requestAnimationFrame(step);
    }
    if ("IntersectionObserver" in window) {
      var io2 = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { countUp(en.target); io2.unobserve(en.target); } });
      }, { threshold: 0.6 });
      nums.forEach(function (el) { io2.observe(el); });
    }

    // Minister message read more
    var msg = document.getElementById("msg"), more = document.getElementById("read-more");
    if (msg && more) {
      if (msg.scrollHeight <= 380) { msg.classList.remove("clamped"); more.hidden = true; }
      more.addEventListener("click", function () {
        var open = msg.classList.toggle("clamped");
        more.textContent = open ? "Read full message" : "Show less";
      });
    }

    // Announcements: read more / view all
    document.querySelectorAll(".ann").forEach(function (card) {
      var txt = card.querySelector(".ann-text"), btn = card.querySelector(".ann-toggle");
      txt.classList.add("clamp");
      function check() { if (!card.hidden && txt.scrollHeight > txt.clientHeight + 4) { btn.hidden = false; txt.classList.add("over"); } }
      check(); card._check = check;
      btn.addEventListener("click", function () {
        var open = txt.classList.toggle("clamp");
        btn.textContent = open ? "Read more" : "Show less";
      });
    });
    var allBtn = document.getElementById("ann-all");
    if (allBtn) allBtn.addEventListener("click", function () {
      document.querySelectorAll(".ann[data-more]").forEach(function (el) { el.hidden = false; if (el._check) el._check(); });
      allBtn.parentNode.remove();
    });

    // Teachers filter
    var fbtns = document.querySelectorAll(".filters button");
    fbtns.forEach(function (b) {
      b.addEventListener("click", function () {
        var f = b.getAttribute("data-filter");
        fbtns.forEach(function (x) { x.classList.toggle("on", x === b); });
        document.querySelectorAll(".teacher").forEach(function (card) {
          var show = !f || card.getAttribute("data-section") === f;
          card.hidden = !show;
          if (show) { card.classList.remove("pop"); void card.offsetWidth; card.classList.add("pop"); }
        });
      });
    });

    // Copy number
    document.querySelectorAll("[data-copy]").forEach(function (btn) {
      var label = btn.innerHTML;
      function flash(t) { btn.textContent = t; setTimeout(function () { btn.innerHTML = label; }, 1800); }
      btn.addEventListener("click", function () {
        try { navigator.clipboard.writeText(hm.phone).then(function () { flash("Copied"); }, function () { flash(hm.phone); }); }
        catch (e) { flash(hm.phone); }
      });
    });

    admissionForm(c);
  }

  /* ---------- admission form ---------- */
  function admissionForm(c) {
    var hm = c.headmaster;
    var modal = document.getElementById("apply"), form = document.getElementById("apply-form");
    var done = document.getElementById("apply-done"), sum = document.getElementById("apply-sum");
    var note = document.getElementById("sec-note"), lastFocus = null;
    var $ = function (id) { return document.getElementById(id); };
    $("apply-call").href = tel(hm.phone);

    function showForm() { form.hidden = false; done.hidden = true; }
    function openForm(mode) {
      lastFocus = document.activeElement;
      var want = mode || "In school";
      form.querySelectorAll('input[name="mode"]').forEach(function (r) { r.checked = r.value === want; });
      showForm(); modal.hidden = false; document.body.style.overflow = "hidden";
      setTimeout(function () { $("f-name").focus(); }, 30);
    }
    function closeForm() {
      modal.hidden = true; document.body.style.overflow = "";
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    document.querySelectorAll("[data-apply]").forEach(function (b) {
      b.addEventListener("click", function () { openForm(b.getAttribute("data-mode")); });
    });
    modal.addEventListener("click", function (e) { if (e.target === modal || e.target.hasAttribute("data-close")) closeForm(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !modal.hidden) closeForm(); });

    function gender() { var g = form.querySelector('input[name="gender"]:checked'); return g ? g.value : ""; }
    function sectionFor(g) { return g === "Female" ? "Girls Primary Section" : g === "Male" ? "Boys Secondary Section" : ""; }
    form.querySelectorAll('input[name="gender"]').forEach(function (r) {
      r.addEventListener("change", function () {
        var g = gender(); note.hidden = !g;
        note.textContent = g === "Female"
          ? "Girls are admitted in the Primary Section. The Head Master confirms the class."
          : "Boys are admitted in the Secondary Section. The Head Master confirms the class.";
        $("e-gender").hidden = true;
      });
    });
    function cleanPhone(v) {
      var d = String(v).replace(/\D/g, "");
      if (d.indexOf("92") === 0 && d.length === 12) d = "0" + d.slice(2);
      return d;
    }
    function fail(id, msg) { var e = $(id); e.textContent = msg; e.hidden = false; return false; }
    function ok(id) { $(id).hidden = true; return true; }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = $("f-name").value.trim(), phone = cleanPhone($("f-phone").value), g = gender();
      var cls = $("f-class").value, area = $("f-area").value.trim();
      var modeEl = form.querySelector('input[name="mode"]:checked'), mode = modeEl ? modeEl.value : "In school";
      var good = true;
      good = (name ? ok("e-name") : fail("e-name", "Please write the student's name.")) && good;
      good = (/^03\d{9}$/.test(phone) ? ok("e-phone") : fail("e-phone", "Enter an 11-digit mobile number starting with 03.")) && good;
      good = (g ? ok("e-gender") : fail("e-gender", "Please choose Male or Female.")) && good;
      good = (cls ? ok("e-class") : fail("e-class", "Please choose a class.")) && good;
      good = (area ? ok("e-area") : fail("e-area", "Please write where the student lives.")) && good;
      if (!good) { var first = form.querySelector(".err:not([hidden])"); if (first) first.scrollIntoView({ block: "center" }); return; }

      var guardian = $("f-guardian").value.trim();
      var lines = ["Admission request", c.school.name + (c.school.location ? ", " + c.school.location : ""), "", "Student name: " + name];
      if (guardian) lines.push("Father/guardian: " + guardian);
      lines.push("Phone number: " + phone, "Gender: " + g, "Class: " + cls, "Study mode: " + mode, "Section: " + sectionFor(g), "Lives in: " + area);
      sum.value = lines.join("\n");
      $("apply-wa").href = wa(hm.phone, sum.value);
      form.hidden = true; done.hidden = false;
      var h = done.querySelector("h4"); h.setAttribute("tabindex", "-1"); h.focus();
    });
    $("apply-edit").addEventListener("click", function () { showForm(); $("f-name").focus(); });
    var copyBtn = $("apply-copy");
    copyBtn.addEventListener("click", function () {
      function flash(t) { copyBtn.textContent = t; setTimeout(function () { copyBtn.textContent = "Copy details"; }, 1800); }
      function pick() { sum.focus(); sum.select(); flash("Text selected"); }
      try { navigator.clipboard.writeText(sum.value).then(function () { flash("Copied"); }, pick); } catch (err) { pick(); }
    });
  }

  /* ---------- load content ---------- */
  function fail(err) {
    document.getElementById("main").innerHTML =
      '<p style="padding:60px 16px;text-align:center;color:#56647f">The page content could not load. Please refresh the page.</p>';
    if (window.console) console.error(err);
  }
  if (window.SITE_CONTENT) render(window.SITE_CONTENT);
  else fetch("content/site.json", { cache: "no-cache" })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(render).catch(fail);
})();
