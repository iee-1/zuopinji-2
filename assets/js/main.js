/* ==========================================================================
   包兴洁 · 作品集 2026 — 交互与动效
   无依赖（不引 GSAP / Three.js），全部原生 JS + CSS
   ========================================================================== */
(function () {
  "use strict";

  var html = document.documentElement;
  var body = document.body;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var lerp = function (a, b, n) { return a + (b - a) * n; };

  /* ======================================================== 1. 加载动画 */
  var loader = $("#loader");
  var loaderBar = $("#loaderBar");
  var loaderNum = $("#loaderNum");

  function finishLoad() {
    if (!loader || loader.classList.contains("is-done")) return;
    loader.classList.add("is-done");
    html.classList.add("is-ready");
    body.classList.remove("is-locked");
    if (loaderBar) loaderBar.style.width = "100%";
    setTimeout(function () { if (loader.parentNode) loader.parentNode.removeChild(loader); }, 1200);
  }

  function runLoader() {
    if (!loader || reduce) { finishLoad(); return; }
    var start = performance.now();
    var duration = 1250;
    function tick(now) {
      var t = clamp((now - start) / duration, 0, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      var pct = Math.round(eased * 100);
      if (loaderNum) loaderNum.textContent = String(pct).padStart(3, "0");
      if (loaderBar) loaderBar.style.width = pct + "%";
      if (t < 1) requestAnimationFrame(tick);
      else setTimeout(finishLoad, 220);
    }
    requestAnimationFrame(tick);
  }

  if (document.readyState === "complete") runLoader();
  else window.addEventListener("load", runLoader);
  // 兜底：图片再慢也不能一直锁着页面
  setTimeout(finishLoad, 6000);

  /* ======================================================== 2. 自定义光标 */
  (function cursor() {
    if (!fine || reduce) return;
    var el = $("#cursor");
    if (!el) return;
    var ring = $(".cursor-ring", el);
    var tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    var rx = tx, ry = ty, dx = tx, dy = ty;

    window.addEventListener("mousemove", function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!el.classList.contains("is-on")) el.classList.add("is-on");
    }, { passive: true });

    document.addEventListener("mouseleave", function () { el.classList.remove("is-on"); });

    function loop() {
      rx = lerp(rx, tx, 0.16);
      ry = lerp(ry, ty, 0.16);
      dx = lerp(dx, tx, 0.42);
      dy = lerp(dy, ty, 0.42);
      ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0)";
      var dot = el.querySelector(".cursor-dot");
      var label = el.querySelector(".cursor-label");
      if (dot) dot.style.transform = "translate3d(" + dx + "px," + dy + "px,0)";
      if (label) label.style.transform = "translate3d(" + rx + "px," + ry + "px,0) translate(-50%,-50%)";
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    var hoverables = "a, button, [data-magnetic], .filter, .work";
    document.addEventListener("mouseover", function (e) {
      var t = e.target.closest ? e.target.closest(hoverables) : null;
      if (!t) return;
      el.classList.add(t.classList.contains("work") ? "is-work" : "is-link");
      var lab = $(".cursor-label", el);
      if (lab) lab.textContent = t.classList.contains("work") ? "VIEW" : "CLICK";
    });
    document.addEventListener("mouseout", function (e) {
      var t = e.target.closest ? e.target.closest(hoverables) : null;
      if (!t) return;
      el.classList.remove("is-work", "is-link");
    });
  })();

  /* ======================================================== 3. 磁吸按钮 */
  (function magnetic() {
    if (!fine || reduce) return;
    $$("[data-magnetic]").forEach(function (el) {
      var strength = el.classList.contains("contact-mail") ? 14 : 7;
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        var y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        el.style.transform = "translate(" + (x * strength).toFixed(2) + "px," + (y * strength * 0.6).toFixed(2) + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  })();

  /* ======================================================== 4. 滚动进度 */
  var progressBar = $("#progressBar");
  function updateProgress() {
    if (!progressBar) return;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var p = h > 0 ? (window.scrollY / h) * 100 : 0;
    progressBar.style.width = p.toFixed(2) + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();

  /* ======================================================== 5. 顶部栏 */
  var head = $("#siteHead");
  var lastY = window.scrollY;
  function onHeadScroll() {
    if (!head) return;
    var y = window.scrollY;
    head.classList.toggle("is-solid", y > 40);
    if (y > 460 && y > lastY && !$("#menu").classList.contains("is-open")) head.classList.add("is-hidden");
    else head.classList.remove("is-hidden");
    lastY = y;
  }
  window.addEventListener("scroll", onHeadScroll, { passive: true });
  onHeadScroll();

  /* ======================================================== 6. 分词动效 */
  function splitInto(el) {
    var text = el.textContent.trim();
    el.textContent = "";
    var words = text.split(/(\s+)/);
    var wi = 0;
    words.forEach(function (w) {
      if (!w.trim()) { el.appendChild(document.createTextNode(w)); return; }
      // 中文按字拆，英文按词拆
      var isCN = /[\u4e00-\u9fa5]/.test(w);
      var units = isCN ? Array.from(w) : [w];
      units.forEach(function (u) {
        var outer = document.createElement("span");
        outer.className = "split-word";
        var inner = document.createElement("span");
        inner.textContent = u;
        inner.style.transitionDelay = (wi * 0.035).toFixed(3) + "s";
        outer.appendChild(inner);
        el.appendChild(outer);
        wi++;
      });
    });
  }

  function splitWords(el) {
    if (!el || el.dataset.splitDone) return;
    el.dataset.splitDone = "1";
    var lines = el.querySelectorAll("[data-line]");
    if (lines.length) lines.forEach(splitInto);
    else splitInto(el);
  }
  $$("[data-split-words]").forEach(splitWords);

  /* ======================================================== 7. 进入视口揭示 */
  var revealTargets = $$("[data-reveal], [data-split-words], .about-img, .process-item");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-in");
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ======================================================== 8. 数字滚动 */
  (function counters() {
    var nums = $$("[data-count]");
    if (!nums.length) return;
    var seen = new WeakSet();
    function run(el) {
      if (seen.has(el)) return;
      seen.add(el);
      var target = parseInt(el.dataset.count, 10) || 0;
      if (reduce) { el.textContent = target; return; }
      var t0 = performance.now(), dur = 1100;
      function step(now) {
        var t = clamp((now - t0) / dur, 0, 1);
        var e = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(e * target);
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
    }
    if ("IntersectionObserver" in window) {
      var o = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { run(en.target); o.unobserve(en.target); } });
      }, { threshold: 0.6 });
      nums.forEach(function (n) { o.observe(n); });
    } else nums.forEach(run);
  })();

  /* ======================================================== 9. 滚动视差 */
  var parallaxEls = $$("[data-parallax]");
  var ticking = false;
  function parallax() {
    ticking = false;
    if (reduce) return;
    var vh = window.innerHeight;
    parallaxEls.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var speed = parseFloat(el.dataset.parallax) || 0.05;
      var offset = (r.top + r.height / 2 - vh / 2) * speed;
      var img = el.querySelector("img");
      var shift = clamp(offset, -42, 42).toFixed(2);
      if (img) img.style.transform = "translate3d(0," + shift + "px,0) scale(1.1)";
      else el.style.transform = "translate3d(0," + shift + "px,0)";
    });
  }
  function onScrollParallax() {
    if (!ticking) { ticking = true; requestAnimationFrame(parallax); }
  }
  if (!reduce) {
    window.addEventListener("scroll", onScrollParallax, { passive: true });
    window.addEventListener("resize", onScrollParallax);
    parallax();
  }

  /* ======================================================== 10. 跑马灯补齐 */
  (function ticker() {
    var track = $("#tickerTrack");
    if (!track) return;
    track.innerHTML += track.innerHTML;
  })();

  /* ======================================================== 11. 作品数据 */
  var WORKS = window.WORKS || [];
  var CATS = window.CATS || [];
  var catLabel = {};
  CATS.forEach(function (c) { catLabel[c.key] = c.label; });

  var grid = $("#workGrid");
  var filterBox = $("#filters");
  var empty = $("#worksEmpty");
  var countEl = $("#worksCount");
  var currentFilter = "all";
  var visible = [];

  function cardHTML(w) {
    return '' +
      '<span class="work-media">' +
        '<img class="work-img" src="' + w.cover + '" alt="' + w.title + ' 封面" width="1600" height="1100" loading="eager" decoding="async">' +
        '<span class="work-arrow" aria-hidden="true">↗</span>' +
      "</span>" +
      '<span class="work-body">' +
        '<span class="work-no">' + w.no + "</span>" +
        "<span>" +
          '<span class="work-title">' + w.title + "</span>" +
          '<span class="work-sub">' + w.sub + "</span>" +
        "</span>" +
        '<span class="work-meta"><em>' + (catLabel[w.cat] || "") + "</em><i>" + w.year + "</i></span>" +
      "</span>";
  }

  function renderWorks(filter, animate) {
    if (!grid) return;
    currentFilter = filter || "all";
    visible = WORKS.filter(function (w) {
      return currentFilter === "all" || w.cat === currentFilter;
    });

    grid.innerHTML = "";
    visible.forEach(function (w, i) {
      var el = document.createElement("button");
      el.type = "button";
      el.className = "work";
      if (i % 2 === 1) el.classList.add("work--shift");
      if (/03-detail/.test(w.cover)) el.classList.add("is-detail");
      if (/04-poster|05-material/.test(w.cover)) el.classList.add("is-wall");
      if (/07-countdown/.test(w.cover)) el.classList.add("is-diag");
      if (/09-render/.test(w.cover)) el.classList.add("is-fade");
      if (/08-illust/.test(w.cover)) el.classList.add("is-illust");
      el.setAttribute("aria-label", "查看案例：" + w.title);
      el.dataset.index = String(i);
      el.style.transitionDelay = Math.min(i % 2 ? 1 : 0, 1) * 0.06 + "s";
      el.innerHTML = cardHTML(w);
      el.addEventListener("click", function () { openCase(i); });
      grid.appendChild(el);
    });

    if (empty) empty.hidden = visible.length > 0;
    if (countEl) countEl.textContent = "（" + visible.length + "）";

    observeCards();
  }

  function observeCards() {
    var cards = $$(".work", grid);
    if (!("IntersectionObserver" in window)) { cards.forEach(function (c) { c.classList.add("is-in"); }); return; }
    var o = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); o.unobserve(en.target); }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -4% 0px" });
    cards.forEach(function (c) { o.observe(c); });
  }

  function buildFilters() {
    if (!filterBox) return;
    filterBox.innerHTML = "";
    CATS.forEach(function (c) {
      var n = c.key === "all" ? WORKS.length : WORKS.filter(function (w) { return w.cat === c.key; }).length;
      var b = document.createElement("button");
      b.type = "button";
      b.className = "filter" + (c.key === "all" ? " is-active" : "");
      b.dataset.cat = c.key;
      b.innerHTML = c.label + " <small>" + String(n).padStart(2, "0") + "</small>";
      b.addEventListener("click", function () {
        if (b.classList.contains("is-active")) return;
        $$(".filter", filterBox).forEach(function (f) { f.classList.remove("is-active"); });
        b.classList.add("is-active");
        renderWorks(c.key, true);
      });
      filterBox.appendChild(b);
    });
  }

  /* ======================================================== 12. 案例弹层 */
  var caseEl = $("#case");
  var caseScroll = $("#caseScroll");
  var caseIndex = 0;
  var lastFocus = null;

  function openCase(i) {
    if (!caseEl || !visible.length) return;
    caseIndex = clamp(i, 0, visible.length - 1);
    fillCase();
    lastFocus = document.activeElement;
    caseEl.classList.add("is-open");
    caseEl.setAttribute("aria-hidden", "false");
    body.classList.add("is-locked");
    if (caseScroll) caseScroll.scrollTop = 0;
    setTimeout(function () { var b = $("#caseClose"); if (b) b.focus(); }, 60);
  }

  function fillCase() {
    var w = visible[caseIndex];
    if (!w) return;
    $("#caseNo").textContent = w.no;
    $("#caseCat").textContent = catLabel[w.cat] || w.cat;
    $("#caseImg").src = w.cover;
    $("#caseImg").alt = w.title + " 作品图";
    $("#caseTitle").textContent = w.title;
    $("#caseSub").textContent = w.en + " — " + w.sub;
    $("#caseDesc").textContent = w.desc;

    // 详情图分开滚动：每张长图独立滚动、方向交错（03 电商详情）
    var media = $(".case-media", caseEl);
    if (media) {
      // 切案例时清掉上一件作品的滚动层（03 竖滚 / 04·05 横滚 / 06 圆柱转盘 / 07 斜滚 / 08 画卡 / 09 幻灯 / 10 视频）
      $$(".detail-scroll, .hscroll, .cyl-scene, .dscroll, .fscroll, .iboard, .vplayer, .edit-room", media).forEach(function (n) { n.remove(); });
      media.classList.remove("has-detail", "has-hscroll", "has-cyl", "has-dscroll", "has-fade", "has-illust", "has-video", "has-edit", "is-wall");
    }
    if (media && w.detail && w.detail.length) {
      if (w.detailMode === "h") {
        // 横向滚动海报条（04 电商活动海报系列）
        media.classList.add("has-hscroll");
        var hs = document.createElement("div");
        hs.className = "hscroll";
        w.detail.forEach(function (src, i) {
          var it = document.createElement("div");
          it.className = "hscroll-item";
          var img = document.createElement("img");
          img.src = src;
          img.alt = w.title + " 海报 " + (i + 1);
          img.addEventListener("load", function () { hsMeasure(); });
          it.appendChild(img);
          hs.appendChild(it);
        });
        media.appendChild(hs);
        function hsMeasure() {
          var vw = hs.clientWidth || 640;
          var sw = hs.scrollWidth;
          if (sw > vw) hs.style.setProperty("--shift", (sw - vw + 20) + "px");
        }
        setTimeout(hsMeasure, 100);
        setTimeout(hsMeasure, 700);
        setTimeout(hsMeasure, 1600);
      } else if (w.detailMode === "diag") {
        // 斜向循环海报墙（07 倒计时海报系列）：两组相同内容并排，整体倾斜，
        // 单方向左上 → 右下无缝循环滚动
        media.classList.add("has-dscroll");
        var dg = document.createElement("div");
        dg.className = "dscroll";
        for (var gIdx = 0; gIdx < 2; gIdx++) {
          var grp = document.createElement("div");
          grp.className = "dscroll-group";
          w.detail.forEach(function (src, i) {
            var it = document.createElement("div");
            it.className = "dscroll-item";
            var img = document.createElement("img");
            img.src = src;
            img.alt = w.title + " 海报 " + (i + 1);
            it.appendChild(img);
            grp.appendChild(it);
          });
          dg.appendChild(grp);
        }
        media.appendChild(dg);
      } else if (w.detailMode === "fade") {
        // 交叉淡入幻灯（09 三维渲染）：大图逐张轮换 + 缓慢推近，左下角图注
        media.classList.add("has-fade");
        var fs = document.createElement("div");
        fs.className = "fscroll";
        var n = w.detail.length, per = 3.4, total = n * per;
        w.detail.forEach(function (src, i) {
          var it = document.createElement("div");
          it.className = "fscroll-item";
          var img = document.createElement("img");
          img.src = src;
          img.alt = w.title + " " + (i + 1);
          it.appendChild(img);
          if (w.detailCap && w.detailCap[i]) {
            var cp = document.createElement("span");
            cp.className = "fscroll-cap";
            cp.textContent = w.detailCap[i];
            it.appendChild(cp);
          }
          fs.appendChild(it);
          var fi = 0.9 / total, stay = per / total; // 淡入淡出占比 / 停留占比
          it.animate(
            [
              { opacity: 0, transform: "scale(1)", offset: 0 },
              { opacity: 1, transform: "scale(1)", offset: fi },
              { opacity: 1, transform: "scale(1.05)", offset: stay },
              { opacity: 0, transform: "scale(1.05)", offset: stay + fi },
              { opacity: 0, transform: "scale(1)", offset: 1 }
            ],
            { duration: total * 1000, delay: i * per * 1000, iterations: Infinity }
          );
        });
        media.appendChild(fs);
      } else if (w.detailMode === "illust") {
        // 散落画卡（08 插画设计）：画作以拍立得卡片散落桌面，各自轻轻浮动，悬停拾起
        media.classList.add("has-illust");
        var board = document.createElement("div");
        board.className = "iboard";
        var POS = [ // [left%, top%, width%, 倾斜deg]
          [4, 12, 22, -4], [24, 50, 21, 3], [40, 6, 36, -2], [62, 46, 22, 5], [80, 8, 19, -5]
        ];
        w.detail.forEach(function (src, i) {
          var p = POS[i % POS.length];
          var it = document.createElement("figure");
          it.className = "icard";
          it.style.left = p[0] + "%";
          it.style.top = p[1] + "%";
          it.style.width = p[2] + "%";
          it.style.setProperty("--r", p[3] + "deg");
          it.style.animationDelay = (i * -1.3) + "s";
          var img = document.createElement("img");
          img.src = src;
          img.alt = w.title + " " + (i + 1);
          it.appendChild(img);
          if (w.detailCap && w.detailCap[i]) {
            var fc = document.createElement("figcaption");
            fc.textContent = w.detailCap[i];
            it.appendChild(fc);
          }
          board.appendChild(it);
        });
        media.appendChild(board);
      } else if (w.detailMode === "video") {
        // 视频播放器（10 MG 动效短片）：上一部 / 下一部 切换
        media.classList.add("has-video");
        var vp = document.createElement("div");
        vp.className = "vplayer";
        var vid = document.createElement("video");
        vid.controls = true;
        vid.playsInline = true;
        vid.preload = "metadata";
        var cur = 0;
        var vcap = document.createElement("span");
        vcap.className = "vplayer-title";
        var vidx = document.createElement("span");
        vidx.className = "vplayer-idx";
        function loadV(i) {
          cur = (i + w.detail.length) % w.detail.length;
          vid.src = w.detail[cur];
          vcap.textContent = (w.detailCap && w.detailCap[cur]) || "";
          vidx.textContent = (cur + 1) + " / " + w.detail.length;
        }
        var vprev = document.createElement("button");
        vprev.type = "button"; vprev.className = "vbtn"; vprev.textContent = "◀ 上一部";
        vprev.addEventListener("click", function () { loadV(cur - 1); });
        var vnext = document.createElement("button");
        vnext.type = "button"; vnext.className = "vbtn"; vnext.textContent = "下一部 ▶";
        vnext.addEventListener("click", function () { loadV(cur + 1); });
        var vinfo = document.createElement("span");
        vinfo.className = "vplayer-info";
        vinfo.appendChild(vcap); vinfo.appendChild(vidx);
        var vbar = document.createElement("div");
        vbar.className = "vplayer-bar";
        vbar.appendChild(vprev); vbar.appendChild(vinfo); vbar.appendChild(vnext);
        vp.appendChild(vid); vp.appendChild(vbar);
        media.appendChild(vp);
        loadV(0);
      } else if (w.detailMode === "cyl") {
        // 3D 圆柱转盘（06 品牌宣传图）：海报围成一圈缓慢自转，
        // 拖拽 / ◀ ▶ / 点击任意一张都能挑选，选中项转到正面
        media.classList.add("has-cyl");
        var scene = document.createElement("div");
        scene.className = "cyl-scene";
        var ring = document.createElement("div");
        ring.className = "cyl-ring";
        var n = w.detail.length, step = 360 / n;
        var cards = [];
        var CW = 240, CH = 380, R = 520;
        var rot = 0, targetRot = null, autoSpeed = -4.4;
        var paused = false, dragging = false, lastT = 0, idx = 0;

        var hint = document.createElement("span");
        hint.className = "cyl-hint";
        hint.textContent = "拖拽旋转 / 点击挑选";

        var capT = document.createElement("span");
        capT.className = "cyl-title";
        var capI = document.createElement("span");
        capI.className = "cyl-idx";
        var info = document.createElement("span");
        info.className = "cyl-info";
        info.appendChild(capT); info.appendChild(capI);

        var bPrev = document.createElement("button");
        bPrev.type = "button"; bPrev.className = "vbtn"; bPrev.textContent = "◀";
        bPrev.setAttribute("aria-label", "上一张");
        var bNext = document.createElement("button");
        bNext.type = "button"; bNext.className = "vbtn"; bNext.textContent = "▶";
        bNext.setAttribute("aria-label", "下一张");

        var bar = document.createElement("div");
        bar.className = "cyl-bar";
        bar.appendChild(bPrev); bar.appendChild(info); bar.appendChild(bNext);

        w.detail.forEach(function (src, i) {
          var it = document.createElement("figure");
          it.className = "cyl-item";
          var img = document.createElement("img");
          img.src = src;
          img.alt = w.title + " " + (i + 1);
          img.draggable = false;
          it.appendChild(img);
          it.addEventListener("click", function () { goTo(i); });
          ring.appendChild(it);
          cards.push(it);
        });

        scene.appendChild(ring);
        scene.appendChild(hint);
        scene.appendChild(bar);
        media.appendChild(scene);

        function layout() {
          var W = scene.clientWidth || 800, H = scene.clientHeight || 550;
          CW = Math.round(Math.min(W * 0.25, H * 0.4));
          CH = Math.round(CW * 1.6);
          R = Math.round((CW / 2) / Math.tan(Math.PI / n));
          ring.style.setProperty("--cw", CW + "px");
          ring.style.setProperty("--ch", CH + "px");
          cards.forEach(function (el, i) {
            el.style.transform = "rotateY(" + (i * step) + "deg) translateZ(" + R + "px)";
          });
        }

        function goTo(i) {
          var d = (-i * step) - rot;
          d = ((d % 360) + 540) % 360 - 180; // 取最短路径
          targetRot = rot + d;
        }

        function sync() {
          var i = ((Math.round(-rot / step) % n) + n) % n;
          if (i !== idx) {
            idx = i;
            capT.textContent = (w.detailCap && w.detailCap[i]) || "";
            capI.textContent = (i + 1) + " / " + n;
          }
        }

        function frame(t) {
          if (!ring.isConnected) return; // 层被清掉就停
          if (!lastT) lastT = t;
          var dt = Math.min(64, t - lastT) / 1000;
          lastT = t;
          if (targetRot !== null) {
            var d = targetRot - rot;
            rot += d * Math.min(1, dt * 6);
            if (Math.abs(d) < 0.15) { rot = targetRot; targetRot = null; }
          } else if (!paused && !dragging) {
            rot += autoSpeed * dt;
          }
          ring.style.transform = "rotateY(" + rot + "deg)";
          for (var k = 0; k < n; k++) {
            var a = ((rot + k * step) % 360 + 360) % 360;
            if (a > 180) a -= 360;
            var c = Math.cos(a * Math.PI / 180); // 1 正对，-1 背对
            cards[k].style.setProperty("--dim", (0.58 - 0.58 * c).toFixed(3));
          }
          sync();
          requestAnimationFrame(frame);
        }

        bPrev.addEventListener("click", function () { goTo(idx - 1); });
        bNext.addEventListener("click", function () { goTo(idx + 1); });
        scene.addEventListener("pointerenter", function () { paused = true; });
        scene.addEventListener("pointerleave", function () { paused = false; dragging = false; scene.classList.remove("is-drag"); });

        var startX = 0, startRot = 0;
        scene.addEventListener("pointerdown", function (e) {
          if (e.target.closest(".cyl-bar")) return;
          dragging = true;
          startX = e.clientX; startRot = rot;
          scene.classList.add("is-drag");
          scene.setPointerCapture && scene.setPointerCapture(e.pointerId);
        });
        scene.addEventListener("pointermove", function (e) {
          if (!dragging) return;
          var dx = e.clientX - startX;
          rot = startRot + (dx / CW) * step;
        });
        scene.addEventListener("pointerup", function (e) {
          if (!dragging) return;
          dragging = false;
          scene.classList.remove("is-drag");
          scene.releasePointerCapture && scene.releasePointerCapture(e.pointerId);
          targetRot = Math.round(rot / step) * step; // 吸附到最近一张
        });

        layout();
        capT.textContent = (w.detailCap && w.detailCap[0]) || "";
        capI.textContent = "1 / " + n;
        requestAnimationFrame(frame);
        window.addEventListener("resize", function () {
          if (!scene.isConnected) { window.removeEventListener("resize", this); return; }
          layout();
        });
      } else if (w.detailMode === "edit") {
        // 剪辑室（11 视频剪辑）：播放器 + 可点选的胶片条 + 上一部/下一部
        media.classList.add("has-edit");
        var room = document.createElement("div");
        room.className = "edit-room";
        var stage = document.createElement("div");
        stage.className = "edit-stage";
        var vid = document.createElement("video");
        vid.controls = true;
        vid.playsInline = true;
        vid.preload = "metadata";
        var wipe = document.createElement("span");
        wipe.className = "edit-wipe";
        stage.appendChild(vid);
        stage.appendChild(wipe);

        var eCap = document.createElement("span");
        eCap.className = "edit-cap";
        var eIdx = document.createElement("span");
        eIdx.className = "edit-idx";
        var eInfo = document.createElement("span");
        eInfo.className = "edit-info";
        eInfo.appendChild(eCap); eInfo.appendChild(eIdx);

        var ePrev = document.createElement("button");
        ePrev.type = "button"; ePrev.className = "vbtn"; ePrev.textContent = "◀ 上一部";
        var eNext = document.createElement("button");
        eNext.type = "button"; eNext.className = "vbtn"; eNext.textContent = "下一部 ▶";

        var eBar = document.createElement("div");
        eBar.className = "edit-bar";
        eBar.appendChild(ePrev); eBar.appendChild(eInfo); eBar.appendChild(eNext);
        stage.appendChild(eBar);

        var strip = document.createElement("div");
        strip.className = "edit-strip";
        var thumbs = [];
        w.detail.forEach(function (src, i) {
          var th = document.createElement("button");
          th.type = "button";
          th.className = "edit-thumb";
          th.setAttribute("aria-label", "第 " + (i + 1) + " 部");
          var im = document.createElement("img");
          im.src = (w.thumbs && w.thumbs[i]) || src;
          im.alt = "";
          im.draggable = false;
          var num = document.createElement("span");
          num.textContent = (i < 9 ? "0" : "") + (i + 1);
          th.appendChild(im);
          th.appendChild(num);
          th.addEventListener("click", function () { loadE(i); });
          strip.appendChild(th);
          thumbs.push(th);
        });

        room.appendChild(stage);
        room.appendChild(strip);
        media.appendChild(room);

        var curE = 0;
        function loadE(i) {
          curE = (i + w.detail.length) % w.detail.length;
          vid.pause();
          vid.src = w.detail[curE];
          eCap.textContent = (w.detailCap && w.detailCap[curE]) || "";
          eIdx.textContent = (curE + 1) + " / " + w.detail.length;
          thumbs.forEach(function (t, k) { t.classList.toggle("is-on", k === curE); });
          // 让选中缩略图滚进可视区（只滚胶片条，不动页面）
          var on = thumbs[curE];
          if (on) {
            var l = on.offsetLeft, r = l + on.offsetWidth;
            if (l < strip.scrollLeft) strip.scrollTo({ left: l - 8, behavior: "smooth" });
            else if (r > strip.scrollLeft + strip.clientWidth) strip.scrollTo({ left: r - strip.clientWidth + 8, behavior: "smooth" });
          }
          wipe.classList.remove("is-run");
          void wipe.offsetWidth; // 重启动画
          wipe.classList.add("is-run");
        }

        ePrev.addEventListener("click", function () { loadE(curE - 1); });
        eNext.addEventListener("click", function () { loadE(curE + 1); });
        loadE(0);
      } else {
        media.classList.add("has-detail");
        var ds = document.createElement("div");
        ds.className = "detail-scroll";
        w.detail.forEach(function (src, i) {
          var win = document.createElement("div");
          win.className = "ds-window " + (i % 2 === 0 ? "is-up" : "is-down");
          var img = document.createElement("img");
          img.src = src;
          img.alt = w.title + " 详情图 " + (i + 1);
          img.loading = "lazy";
          img.addEventListener("load", function () {
            measure();
            setTimeout(measure, 200);
          });
          function measure() {
            var vh = win.clientHeight || 480;
            var iw = win.clientWidth || 300;
            var ih = img.naturalHeight * (iw / img.naturalWidth);
            win.style.setProperty("--shift", Math.max(0, ih - vh) + "px");
          }
          win.appendChild(img);
          ds.appendChild(win);
        });
        media.appendChild(ds);
      }
    }
    if (media && /04-poster|05-material/.test(w.cover)) media.classList.add("is-wall");

    var meta = $("#caseMeta");
    meta.innerHTML = [
      ["我负责", w.role],
      ["软件", w.tools],
      ["产出", w.output],
      ["年份", w.year]
    ].map(function (m) { return "<div><dt>" + m[0] + "</dt><dd>" + m[1] + "</dd></div>"; }).join("");

    $("#caseTags").innerHTML = w.tags.map(function (t) { return "<li>" + t + "</li>"; }).join("");
    $("#caseCount").textContent = String(caseIndex + 1).padStart(2, "0") + " / " + String(visible.length).padStart(2, "0");
    $("#casePrev").disabled = caseIndex === 0;
    $("#caseNext").disabled = caseIndex === visible.length - 1;
  }

  function closeCase() {
    if (!caseEl || !caseEl.classList.contains("is-open")) return;
    // 关闭弹层时停掉并移除视频播放器，避免后台继续播放
    $$(".vplayer, .edit-room", caseEl).forEach(function (el) {
      var v = $("video", el);
      if (v) { v.pause(); v.removeAttribute("src"); }
      el.remove();
    });
    caseEl.classList.remove("is-open");
    caseEl.setAttribute("aria-hidden", "true");
    body.classList.remove("is-locked");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  if (caseEl) {
    $("#caseClose").addEventListener("click", closeCase);
    $$("[data-case-close]", caseEl).forEach(function (el) { el.addEventListener("click", closeCase); });
    $("#casePrev").addEventListener("click", function () { if (caseIndex > 0) { caseIndex--; fillCase(); caseScroll.scrollTop = 0; } });
    $("#caseNext").addEventListener("click", function () { if (caseIndex < visible.length - 1) { caseIndex++; fillCase(); caseScroll.scrollTop = 0; } });
    caseEl.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft" && caseIndex > 0) { caseIndex--; fillCase(); }
      if (e.key === "ArrowRight" && caseIndex < visible.length - 1) { caseIndex++; fillCase(); }
      if (e.key === "Tab") {
        var f = $$('button, [href], [tabindex]:not([tabindex="-1"])', caseEl).filter(function (n) { return !n.disabled && n.offsetParent !== null; });
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      }
    });
  }

  /* ======================================================== 13. 全屏菜单 */
  var menu = $("#menu");
  var menuBtn = $("#menuBtn");

  function setMenu(open) {
    if (!menu || !menuBtn) return;
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", open ? "false" : "true");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.querySelector(".menu-btn-label").textContent = open ? "CLOSE" : "MENU";
    body.classList.toggle("is-locked", open || (caseEl && caseEl.classList.contains("is-open")));
    if (head) {
      head.classList.toggle("is-menu", open);
      if (open) head.classList.remove("is-hidden");
    }
  }
  if (menuBtn) menuBtn.addEventListener("click", function () { setMenu(!menu.classList.contains("is-open")); });
  $$("[data-menu-link]").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  $$(".menu-bg, .brand").forEach(function (el) {
    el.addEventListener("click", function () { if (menu && menu.classList.contains("is-open")) setMenu(false); });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (menu && menu.classList.contains("is-open")) setMenu(false);
      else closeCase();
    }
  });

  /* ======================================================== 14. 能力悬停预览 */
  (function skillPreview() {
    var wrap = $("#skillPreview");
    var list = $("#skillList");
    if (!wrap || !list || !fine || reduce) return;
    var img = $("img", wrap);
    var tx = 0, ty = 0, cx = 0, cy = 0, ts = 0.8, cs = 0.8, on = false;

    list.addEventListener("mousemove", function (e) {
      tx = e.clientX; ty = e.clientY;
      if (cx === 0 && cy === 0) { cx = tx; cy = ty; }
      if (!on) { on = true; wrap.classList.add("is-on"); ts = 1; }
    });
    list.addEventListener("mouseleave", function () {
      on = false; wrap.classList.remove("is-on"); ts = 0.8;
    });
    $$(".skill-row", list).forEach(function (row) {
      row.addEventListener("mouseenter", function () {
        var src = row.dataset.preview;
        if (src && img.getAttribute("src") !== src) img.src = src;
      });
    });

    function loop() {
      cx = lerp(cx, tx, 0.12);
      cy = lerp(cy, ty, 0.12);
      cs = lerp(cs, ts, 0.14);
      wrap.style.setProperty("--px", cx.toFixed(1) + "px");
      wrap.style.setProperty("--py", cy.toFixed(1) + "px");
      wrap.style.setProperty("--ps", cs.toFixed(3));
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  })();

  /* ======================================================== 15. 时钟 */
  (function clock() {
    var el = $("#clock");
    if (!el) return;
    function tick() {
      try {
        el.textContent = new Date().toLocaleTimeString("zh-CN", {
          timeZone: "Asia/Shanghai", hour12: false,
          hour: "2-digit", minute: "2-digit", second: "2-digit"
        });
      } catch (err) { el.textContent = new Date().toLocaleTimeString(); }
    }
    tick();
    setInterval(tick, 1000);
  })();

  /* ======================================================== 16. 复制邮箱 */
  (function copyMail() {
    var btn = $("#copyMail");
    var toast = $("#toast");
    if (!btn) return;
    var timer;
    function show(msg) {
      if (!toast) return;
      toast.textContent = msg;
      toast.classList.add("is-on");
      clearTimeout(timer);
      timer = setTimeout(function () { toast.classList.remove("is-on"); }, 2200);
    }
    btn.addEventListener("click", function () {
      var mail = "2286653711@qq.com";
      var done = function () { show("邮箱已复制 · " + mail); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(mail).then(done, function () { show("请手动复制：" + mail); });
      } else {
        var ta = document.createElement("textarea");
        ta.value = mail;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (e) { show("请手动复制：" + mail); }
        document.body.removeChild(ta);
      }
    });
  })();

  /* ======================================================== 17. 年份 */
  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ======================================================== 18. 首屏光流画布 */
  (function heroCanvas() {
    var cv = $("#heroCanvas");
    if (!cv) return;
    var ctx = cv.getContext("2d");
    if (!ctx) return;

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0;
    var mx = 0, my = 0, tmx = 0, tmy = 0;
    var blobs = [
      { x: .18, y: .30, r: .34, c: "255,74,28",  a: .30, sx: .00013, sy: .00009, p: 0 },
      { x: .76, y: .22, r: .30, c: "255,110,50", a: .20, sx: -.00011, sy: .00014, p: 1.8 },
      { x: .62, y: .80, r: .38, c: "150,32,12",  a: .26, sx: .00009, sy: -.00012, p: 3.4 },
      { x: .10, y: .88, r: .26, c: "88,24,60",   a: .16, sx: .00016, sy: .00007, p: 5.1 }
    ];

    function resize() {
      var r = cv.getBoundingClientRect();
      W = Math.max(1, r.width);
      H = Math.max(1, r.height);
      cv.width = Math.floor(W * dpr);
      cv.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      for (var i = 0; i < blobs.length; i++) {
        var b = blobs[i];
        var x = (b.x + Math.sin(t * b.sx + b.p) * .08) * W + mx * (18 + i * 8);
        var y = (b.y + Math.cos(t * b.sy + b.p) * .08) * H + my * (14 + i * 6);
        var rad = Math.min(W, H) * b.r * (1 + Math.sin(t * 0.00018 + b.p) * .06);
        var g = ctx.createRadialGradient(x, y, 0, x, y, rad);
        g.addColorStop(0, "rgba(" + b.c + "," + b.a + ")");
        g.addColorStop(0.55, "rgba(" + b.c + "," + (b.a * 0.32).toFixed(3) + ")");
        g.addColorStop(1, "rgba(" + b.c + ",0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    }

    var running = true;
    function frame(t) {
      if (!running) return;
      mx = lerp(mx, tmx, 0.04);
      my = lerp(my, tmy, 0.04);
      draw(t);
      requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", function (e) {
      tmx = (e.clientX / window.innerWidth - .5) * 2;
      tmy = (e.clientY / window.innerHeight - .5) * 2;
    }, { passive: true });

    if (reduce) { draw(0); return; }

    document.addEventListener("visibilitychange", function () {
      var shouldRun = !document.hidden;
      if (shouldRun && !running) { running = true; requestAnimationFrame(frame); }
      else if (!shouldRun) running = false;
    });

    requestAnimationFrame(frame);
  })();

  /* ======================================================== 19. 页内锚点 */
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", id);
    });
  });

  /* ======================================================== 20. 启动 */
  buildFilters();
  renderWorks("all");
  updateProgress();
  // 标记首屏缩略中的详情图，启用长图滚动动效
  $$(".strip-media").forEach(function (m) {
    var si = $("img", m);
    if (si && /03-detail/.test(si.getAttribute("src") || "")) m.classList.add("is-detail");
  });
})();
