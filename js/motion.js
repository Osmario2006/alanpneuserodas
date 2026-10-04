/* Motion do site: animações ligadas à rolagem e microinterações.
   Carregue depois de js/comum.js. Nada aqui é necessário para usar o site:
   se o visitante pediu "reduzir movimento" no sistema, o arquivo não faz nada
   e a página fica completa e parada. Os estilos estão em css/motion.css. */

(() => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const html = document.documentElement;
  html.classList.add("mo");

  const fino = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const lerp = (a, b, t) => a + (b - a) * t;
  const faixa = (v, a, b) => Math.min(Math.max((v - a) / (b - a), 0), 1);
  const suave = (t) => t * t * (3 - 2 * t);
  const todos = (q, el = document) => [...el.querySelectorAll(q)];

  /* ---------- quebra os títulos em palavras ---------- */
  function quebrar(el, atraso = 0) {
    let i = 0;
    const percorrer = (no) => {
      [...no.childNodes].forEach((filho) => {
        if (filho.nodeType === 1) return percorrer(filho);
        if (filho.nodeType !== 3 || !filho.textContent.trim()) return;
        const frag = document.createDocumentFragment();
        filho.textContent.split(/(\s+)/).forEach((parte) => {
          if (!parte) return;
          if (/^\s+$/.test(parte)) return frag.append(" ");
          const w = document.createElement("span");
          w.className = "pw";
          const s = document.createElement("span");
          s.textContent = parte;
          s.style.setProperty("--i", i++);
          w.append(s);
          frag.append(w);
        });
        filho.replaceWith(frag);
      });
    };
    percorrer(el);
    if (atraso) el.style.setProperty("--d0", `${atraso}ms`);
  }

  const vistos = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("vis");
        vistos.unobserve(e.target);
      }),
    { rootMargin: "0px 0px -10% 0px" },
  );

  const h1 = document.querySelector(".hero h1, .shero h1, .nf h1");
  if (h1) {
    quebrar(h1, 80);
    requestAnimationFrame(() => requestAnimationFrame(() => h1.classList.add("vis")));
  }
  todos("main .head h2, .igband h2, .sx h2").forEach((h) => {
    quebrar(h);
    vistos.observe(h);
  });

  /* ---------- números que contam até o valor ---------- */
  function contar(el) {
    const m = el.textContent.match(/^(\D*)(\d+)(\D*)$/);
    if (!m) return;
    const [, antes, num, depois] = m;
    const alvo = Number(num);
    const larg = el.getBoundingClientRect().width;
    if (larg) el.style.minWidth = `${larg}px`;
    el.textContent = antes + "0" + depois;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(),
        dur = 1600;
      const passo = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = antes + Math.round(alvo * (1 - Math.pow(1 - p, 4))) + depois;
        if (p < 1) requestAnimationFrame(passo);
      };
      requestAnimationFrame(passo);
    });
    io.observe(el);
  }
  todos(".proof b").forEach(contar);
  todos(".igband h2 .pw > span").forEach((s) => /^\d+$/.test(s.textContent) && contar(s));

  /* ---------- barra de progresso ---------- */
  const barra = document.createElement("div");
  barra.className = "mo-barra";
  barra.setAttribute("aria-hidden", "true");
  document.body.append(barra);

  /* ---------- serviços: luz seguindo o cursor ---------- */
  todos(".svc > a, .svc > article").forEach((c) => {
    todos("svg *", c).forEach((f) => f.setAttribute("pathLength", "1"));
    c.addEventListener("pointermove", (e) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty("--mx", `${e.clientX - r.left}px`);
      c.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });
  /* se o comum.js não marcar a entrada (sem IntersectionObserver), desenha mesmo assim */
  setTimeout(() => todos(".svc > *:not(.rv)").forEach((c) => c.classList.add("desenhado")), 1500);

  /* ---------- botões magnéticos (só com mouse) ---------- */
  if (fino) {
    todos(".btn").forEach((b) => {
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        b.classList.add("ima");
        b.style.translate = `${dx * 0.22}px ${dy * 0.35}px`;
      });
      b.addEventListener("pointerleave", () => {
        b.classList.remove("ima");
        b.style.translate = "";
      });
    });
  }

  /* ---------- fotos com profundidade ---------- */
  const fotos = todos(".story .pics img");
  if (fotos[0]) fotos[0].dataset.par = "-0.06";
  if (fotos[1]) fotos[1].dataset.par = "0.08";
  const parallax = todos("[data-par]");

  /* ---------- roda do topo segue o mouse ---------- */
  const caixa = document.querySelector(".wheelbox");
  const hero = document.querySelector(".hero");
  const mira = { x: 0, y: 0 },
    tilt = { x: 0, y: 0 };
  if (caixa && hero && fino) {
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      mira.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      mira.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      acordar();
    });
    hero.addEventListener("pointerleave", () => {
      mira.x = mira.y = 0;
      acordar();
    });
  }

  /* ---------- faixa amarela ---------- */
  const tk = document.getElementById("tk");
  const tkFaixa = tk && tk.closest(".ticker");
  let tkAnim = null;

  /* ---------- cabeçalho ---------- */
  const topo = document.querySelector(".top");
  const menu = document.getElementById("menu");

  /* ---------- seção "do riscado ao espelhado" ---------- */
  const sx = document.querySelector(".sx");
  let sxPassos = [],
    sxPontos = [],
    sxRoda = null,
    sxAtivo = -1;
  if (sx) {
    sx.classList.add("sx-on");
    sxRoda = sx.querySelector(".sx-roda");
    sxPassos = todos(".sx-passos li", sx);
    const pontos = sx.querySelector(".sx-pontos");
    sxPassos.forEach(() => pontos.append(document.createElement("span")));
    sxPontos = [...pontos.children];
  }
  /* trechos da rolagem (0 a 1) em que cada etapa acontece */
  const ETAPAS = [0, 0.22, 0.46, 0.66];

  function cenaSx(vh) {
    const r = sx.getBoundingClientRect();
    const p = faixa(-r.top, 0, r.height - vh);
    const st = sxRoda.style;
    /* giro contínuo */
    st.setProperty("--giro", `${(p * 720).toFixed(2)}deg`);
    /* pintura: varre a camada gasta */
    st.setProperty("--tinta", suave(faixa(p, 0.48, 0.62)).toFixed(3));
    /* diamantação: corte de fora para dentro */
    const c = faixa(p, 0.68, 0.92);
    st.setProperty("--corte", `${((1 - c) * 100).toFixed(2)}%`);
    st.setProperty("--ferr", c > 0 && c < 1 ? "1" : "0");
    st.setProperty("--brilho", (0.1 + 0.22 * c).toFixed(3));
    st.setProperty("--prog", p.toFixed(3));
    let a = 0;
    ETAPAS.forEach((ini, i) => p >= ini && (a = i));
    if (a !== sxAtivo) {
      sxAtivo = a;
      sxPassos.forEach((li, i) => li.classList.toggle("ativo", i === a));
      sxPontos.forEach((s, i) => s.classList.toggle("ativo", i <= a));
    }
  }

  /* ---------- um único laço de animação ---------- */
  let ultY = scrollY,
    vel = 0,
    rodando = false,
    tkTaxa = 1,
    descendo = 0;
  function quadro() {
    const y = scrollY,
      vh = innerHeight;
    const dy = y - ultY;
    ultY = y;
    vel = lerp(vel, dy, 0.18);

    const max = document.documentElement.scrollHeight - vh;
    barra.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

    /* cabeçalho some depois de descer um pouco e volta ao subir */
    if (topo) {
      descendo = dy > 0 ? descendo + dy : dy < 0 ? 0 : descendo;
      const menuAberto = menu && !menu.hidden;
      const foco = topo.contains(document.activeElement);
      if (y < 200 || dy < -4 || menuAberto || foco) topo.classList.remove("esconde");
      else if (descendo > 90) topo.classList.add("esconde");
    }

    /* faixa: acelera e inverte com a rolagem */
    if (tk) {
      if (!tkAnim) tkAnim = tk.getAnimations()[0] || null;
      const alvo = 1 + Math.max(Math.min(vel * 0.35, 9), -9);
      tkTaxa = lerp(tkTaxa, Math.abs(alvo) < 0.15 ? Math.sign(alvo || 1) * 0.15 : alvo, 0.12);
      if (tkAnim) tkAnim.playbackRate = tkTaxa;
      tkFaixa.style.setProperty("--sk", `${Math.max(Math.min(-vel * 0.25, 8), -8).toFixed(2)}deg`);
    }

    parallax.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const c = r.top + r.height / 2 - vh / 2;
      el.style.setProperty("--py", `${(c * Number(el.dataset.par)).toFixed(1)}px`);
    });

    if (caixa) {
      tilt.x = lerp(tilt.x, mira.x, 0.08);
      tilt.y = lerp(tilt.y, mira.y, 0.08);
      caixa.style.setProperty("--ry", `${(tilt.x * 9).toFixed(2)}deg`);
      caixa.style.setProperty("--rx", `${(-tilt.y * 7).toFixed(2)}deg`);
      caixa.style.setProperty("--gx", `${(tilt.x * -18).toFixed(1)}px`);
      caixa.style.setProperty("--gy", `${(tilt.y * -14).toFixed(1)}px`);
    }

    if (sx) cenaSx(vh);

    const quieto =
      Math.abs(vel) < 0.05 &&
      Math.abs(tkTaxa - 1) < 0.01 &&
      Math.abs(tilt.x - mira.x) < 0.002 &&
      Math.abs(tilt.y - mira.y) < 0.002;
    if (quieto) {
      rodando = false;
      if (tkAnim) tkAnim.playbackRate = 1;
      return;
    }
    requestAnimationFrame(quadro);
  }
  function acordar() {
    if (rodando) return;
    rodando = true;
    requestAnimationFrame(quadro);
  }
  addEventListener("scroll", acordar, { passive: true });
  addEventListener("resize", acordar);
  acordar();
})();
