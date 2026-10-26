/* Service previews: shared player engine. Each scene page supplies groups, steps and markup. */
(function () {
  "use strict"
  var $ = function (s, r) { return (r || document).querySelector(s) }
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)) }
  var clamp = function (v, a, b) { return Math.min(b === undefined ? 1 : b, Math.max(a === undefined ? 0 : a, v)) }
  var sine = function (p) { return 0.5 - Math.cos(Math.PI * p) / 2 }
  var PRE = 700
  var ICON_PAUSE = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 2h4v12H3zM9 2h4v12H9z"/></svg>'
  var ICON_PLAY = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2l10 6-10 6z"/></svg>'

  window.Player = {
    start: function (cfg) {
      var stage = $("#stage")
      var groups = cfg.groups
      var steps = cfg.steps
      var cursorEl = $("#cursor")
      var urlEl = $("#url")
      var playBtn = $("#play")
      var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches

      steps.forEach(function (s) {
        s.lead = s.lead || 0
        s.scroll = s.scroll || 0
        s.hold = s.hold || 0
        s.total = s.lead + s.scroll + s.hold
        s.device = s.device || "desktop"
      })
      var gTotal = groups.map(function (_, k) {
        return steps.filter(function (s) { return s.g === k }).reduce(function (a, s) { return a + s.total }, 0)
      })
      var gFirst = groups.map(function (_, k) { return steps.findIndex(function (s) { return s.g === k }) })

      var idx = 0, t = 0, started = false, startY = 0, dev = "desktop", curGroup = -1
      var playing = !reduced, visible = true, cx = 0, cy = 0, cinit = false, scroller = null

      // progress segments
      var segBox = $("#segs"), segs = []
      groups.forEach(function (g, k) {
        var b = document.createElement("button")
        b.type = "button"; b.className = "seg"; b.style.flex = String(gTotal[k])
        b.setAttribute("aria-label", g.title)
        b.innerHTML = "<i><b></b></i>"
        b.addEventListener("click", function () { enter(gFirst[k]) })
        segBox.appendChild(b); segs.push(b)
      })

      function syncPlay() {
        playBtn.innerHTML = playing ? ICON_PAUSE : ICON_PLAY
        playBtn.setAttribute("aria-label", playing ? "Sustabdyti peržiūrą" : "Leisti peržiūrą")
      }
      function setDevice(d) { dev = d; stage.dataset.device = d }
      function setCaption(g) {
        if (g === curGroup) return
        curGroup = g
        $("#cno").textContent = "0" + (g + 1) + " / 0" + groups.length
        var tx = $("#ctx")
        tx.querySelector("b").textContent = groups[g].title
        tx.querySelector("span").textContent = groups[g].line
        tx.style.animation = "none"; void tx.offsetWidth; tx.style.animation = ""
      }
      function clearEffects() {
        $$(".pressed").forEach(function (e) { e.classList.remove("pressed") })
        cursorEl.classList.remove("down")
      }
      function setBar(text) { if (urlEl && urlEl.textContent !== text) urlEl.textContent = text }

      function enter(i) {
        idx = i; started = false
        var s = steps[i]
        clearEffects()
        var changed = s.device !== dev
        if (changed) { setDevice(s.device); t = -PRE } else { t = 0 }
        var pane = s.pane ? $(s.pane) : $(".pane")
        $$(".pane").forEach(function (p) { p.classList.toggle("on", p === pane) })
        scroller = pane
        if (s.top && scroller) scroller.scrollTop = 0
        if (s.url) setBar(s.url)
        if (cfg.onEnter) cfg.onEnter(s, i)
        setCaption(s.g)
      }

      function renderStep() {
        var s = steps[idx]
        if (scroller && s.to) {
          var max = Math.max(0, scroller.scrollHeight - scroller.clientHeight)
          if (t >= 0 && !started) { started = true; startY = scroller.scrollTop }
          if (t >= 0) {
            var navEl = s.sticky === undefined ? $("#nav", scroller) : (s.sticky ? $(s.sticky, scroller) : null)
            var el = $(s.to, scroller)
            var target = clamp(el.offsetTop - (navEl && s.to !== "#s-hero" ? navEl.offsetHeight : 0), 0, max)
            var p = s.scroll ? clamp((t - s.lead) / s.scroll) : 1
            // near-constant speed with gentle easing at both ends
            scroller.scrollTop = startY + (target - startY) * (0.6 * p + 0.4 * sine(p))
            if (!s.url && cfg.urlFor) setBar(cfg.urlFor(scroller))
          }
        }
        if (s.tick) s.tick(t, s)

        // fake cursor
        var active = null
        if (s.cursor && t >= 0) s.cursor.forEach(function (c) { if (t >= c.at) active = c })
        var sr = stage.getBoundingClientRect()
        if (!cinit) { cx = sr.width * 0.85; cy = sr.height + 20; cinit = true }
        if (active && active.sel) {
          var target2 = $(active.sel)
          if (target2) {
            var r = target2.getBoundingClientRect()
            var tx = r.left - sr.left + Math.min(r.width * 0.55, 90), ty = r.top - sr.top + r.height * 0.62
            cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12
          }
        }
        cursorEl.style.transform = "translate(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px)"
        cursorEl.classList.toggle("on", !!(active && active.sel))
        if (s.cursor) s.cursor.forEach(function (c) {
          if (!c.click || !c.sel) return
          var pr = t >= c.click && t < c.click + 260
          var el2 = $(c.sel)
          if (el2) el2.classList.toggle("pressed", pr)
          if (active === c) cursorEl.classList.toggle("down", pr)
        })
      }

      function renderUI() {
        var s = steps[idx], gBefore = 0
        for (var k = 0; k < idx; k++) if (steps[k].g === s.g) gBefore += steps[k].total
        var el = clamp(t, 0, s.total)
        segs.forEach(function (b, k2) {
          var p = k2 < s.g ? 1 : k2 === s.g ? (gBefore + el) / gTotal[k2] : 0
          b.firstChild.firstChild.style.width = p * 100 + "%"
        })
      }

      var last = performance.now()
      function frame(now) {
        var dt = Math.min(50, now - last); last = now
        if (playing && visible && !document.hidden) {
          t += dt
          if (t >= steps[idx].total) enter(idx === steps.length - 1 ? 0 : idx + 1)
        }
        renderStep(); renderUI()
        requestAnimationFrame(frame)
      }

      playBtn.addEventListener("click", function () { playing = !playing; syncPlay() })
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (e) { visible = e[0].isIntersecting }).observe(stage)
      }

      setDevice(steps[0].device); enter(0); syncPlay()
      var go = function () { requestAnimationFrame(function (t0) { last = t0; frame(t0) }) }
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(go, go); else go()
    },
  }
})()
