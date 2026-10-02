/* Comportamento da página: galeria, vídeos, desempeno, simulador e animações.
   Os dados (contatos, trabalhos, vídeos) ficam em js/dados.js. */

const SRC = {
  base: "assets/img/simulador/volvo-s60.jpg",
  w1: "assets/img/simulador/roda-preta-diamantada.webp",
  w2: "assets/img/simulador/roda-grafite-polida.webp",
};
const $ = (q) => document.querySelector(q),
  reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
function wa(t) {
  return LOJA.whats ? `https://wa.me/${LOJA.whats}?text=${encodeURIComponent(t)}` : "#contato";
}

/* conteúdo da loja */
$("#m-nome").innerHTML = `${LOJA.nome} <span>${LOJA.destaque}</span>`;
$("#c-end").textContent = LOJA.endereco;
$("#c-wa").textContent = LOJA.whatsTexto;
$("#c-hor").textContent = LOJA.horario;
$("#mapa").href =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(LOJA.endereco);
const tk = [
  "Diamantação CNC",
  "Pintura eletrostática",
  "Desempeno",
  "Solda de alumínio",
  "Furação",
  "Alinhamento 3D",
  "Kits rodas e pneus",
];
$("#tk").innerHTML = [...tk, ...tk, ...tk, ...tk].map((s) => `<span>${s}</span>`).join("");
document.querySelectorAll("[data-wa]").forEach((a) => {
  if (a.dataset.wa) a.href = wa(a.dataset.wa);
});

/* menu */
const menuBtn = $("#menu-btn");
const menu = $("#menu");
function setMenu(open) {
  menu.hidden = !open;
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
}
menuBtn.addEventListener("click", () => setMenu(menu.hidden));
menu.addEventListener("click", (e) => {
  if (e.target.closest("a")) setMenu(false);
});
document.addEventListener("click", (e) => {
  if (!menu.hidden && !e.target.closest("header")) setMenu(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !menu.hidden) {
    setMenu(false);
    menuBtn.focus();
  }
});

/* galeria de trabalhos */
const grid = $("#grid");
/* a lista é repetida para a rolagem automática poder dar a volta sem corte */
[false, true].forEach((copia) =>
  TRABALHOS.forEach((g, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `${g.titulo}: ${g.detalhe}. Ampliar`);
    if (copia) {
      b.setAttribute("aria-hidden", "true");
      b.tabIndex = -1;
    }
    b.innerHTML = `<img alt="" loading="lazy" src="${g.img}"><span class="cap"><b>${g.titulo}</b><span>${g.detalhe}</span></span>`;
    b.onclick = () => openLb(i);
    grid.appendChild(b);
  }),
);
const lb = document.createElement("dialog");
lb.className = "lb";
lb.setAttribute("aria-label", "Trabalho ampliado");
lb.innerHTML = `<figure><img id="lb-img" alt=""><figcaption><b id="lb-t"></b><span id="lb-d"></span>
 <div class="lbbar"><button type="button" class="btn ghost" id="lb-prev">Anterior</button><button type="button" class="btn ghost" id="lb-next">Próximo</button>
 <a class="btn" id="lb-ig" target="_blank" rel="noopener">Ver no Instagram</a><button type="button" class="btn ghost" id="lb-x">Fechar</button></div></figcaption></figure>`;
document.body.appendChild(lb);
let cur = 0;
function showLb(i) {
  cur = (i + TRABALHOS.length) % TRABALHOS.length;
  const g = TRABALHOS[cur];
  $("#lb-img").src = g.img;
  $("#lb-img").alt = g.titulo;
  $("#lb-t").textContent = g.titulo;
  $("#lb-d").textContent = g.detalhe;
  $("#lb-ig").href = g.instagram;
}
function openLb(i) {
  showLb(i);
  lb.showModal();
}
$("#lb-prev").onclick = () => showLb(cur - 1);
$("#lb-next").onclick = () => showLb(cur + 1);
$("#lb-x").onclick = () => lb.close();
lb.addEventListener("click", (e) => {
  if (e.target === lb) lb.close();
});
lb.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") showLb(cur + 1);
  if (e.key === "ArrowLeft") showLb(cur - 1);
});

/* rolagem automática da galeria: para quando o usuário interage e volta após 1,5 s */
if (!reduce) {
  const VEL = 45; // px por segundo
  let pos = 0,
    ult = 0,
    t0 = performance.now(),
    ate = 0,
    parado = false,
    visivel = true;
  const segurar = () => (ate = performance.now() + 1500);
  const meio = () => grid.children[TRABALHOS.length].offsetLeft - grid.children[0].offsetLeft;
  grid.addEventListener("pointerenter", (e) => {
    if (e.pointerType === "mouse") parado = true;
  });
  grid.addEventListener("pointerleave", (e) => {
    if (e.pointerType === "mouse") {
      parado = false;
      segurar();
    }
  });
  grid.addEventListener("touchstart", () => (parado = true), { passive: true });
  ["touchend", "touchcancel"].forEach((ev) =>
    grid.addEventListener(ev, () => {
      parado = false;
      segurar();
    }),
  );
  grid.addEventListener("wheel", segurar, { passive: true });
  grid.addEventListener("focusin", segurar);
  /* rolagem feita pelo usuário (dedo, trackpad, teclado): acompanha e segura */
  const sincronizar = () => {
    if (Math.abs(grid.scrollLeft - ult) <= 1.5) return false;
    segurar();
    const m = meio();
    if (grid.scrollLeft >= m) grid.scrollLeft -= m;
    pos = ult = grid.scrollLeft;
    return true;
  };
  grid.addEventListener("scroll", sincronizar);
  new IntersectionObserver(([e]) => (visivel = e.isIntersecting)).observe(grid);
  const passo = (t) => {
    const dt = Math.min((t - t0) / 1000, 0.1);
    t0 = t;
    sincronizar();
    if (visivel && !parado && !lb.open && t >= ate) {
      pos += VEL * dt;
      const m = meio();
      if (m > 0 && pos >= m) pos -= m;
      grid.scrollLeft = pos;
      ult = grid.scrollLeft;
    }
    requestAnimationFrame(passo);
  };
  requestAnimationFrame(passo);
}

PROCESSO.forEach((p) => {
  const a = document.createElement("a");
  a.href = p.instagram;
  a.target = "_blank";
  a.rel = "noopener";
  a.innerHTML = `<img alt="" loading="lazy" src="${p.img}"><span>${p.titulo}</span>`;
  a.setAttribute("aria-label", p.titulo + ", ver no Instagram");
  $("#strip").appendChild(a);
});

/* roda do hero: depois de entrar, sobe de leve com a rolagem */
const hero = $("#hero-roda");
if (!reduce) {
  hero.addEventListener(
    "animationend",
    () => {
      hero.style.animation = "none";
      let tick = false;
      const move = () => {
        hero.style.transform = `translateY(${Math.min(scrollY, 700) * -0.06}px) rotate(${Math.min(scrollY, 700) * 0.004}deg)`;
        tick = false;
      };
      addEventListener(
        "scroll",
        () => {
          if (!tick) {
            tick = true;
            requestAnimationFrame(move);
          }
        },
        { passive: true },
      );
      move();
    },
    { once: true },
  );
}

/* desempeno: aro empenado -> reto */
const rim = $("#rim"),
  read = $("#fixread");
let amp = 15,
  tgt = 15,
  rot = 0;
function rimPath() {
  let d = "";
  for (let i = 0; i <= 120; i++) {
    const th = (i / 120) * Math.PI * 2,
      r = 118 + amp * Math.sin(2 * th + rot) + amp * 0.55 * Math.sin(3 * th + rot * 1.3);
    d +=
      (i ? "L" : "M") +
      (160 + r * Math.cos(th)).toFixed(1) +
      " " +
      (160 + r * Math.sin(th)).toFixed(1);
  }
  return d + "Z";
}
function fixLoop() {
  amp += (tgt - amp) * (reduce ? 1 : 0.06);
  rot += reduce ? 0 : 0.012;
  rim.setAttribute("d", rimPath());
  const mm = (amp * 1.35).toFixed(1);
  read.innerHTML =
    amp > 0.25
      ? `Desvio do aro: <b>${mm} mm</b> (exemplo)`
      : `Desvio do aro: <b>0 mm</b>, roda reta`;
  requestAnimationFrame(fixLoop);
}
function setFix(v) {
  tgt = v ? 0 : 15;
  $("#b-antes").setAttribute("aria-pressed", !v);
  $("#b-depois").setAttribute("aria-pressed", v);
}
$("#b-antes").onclick = () => setFix(false);
$("#b-depois").onclick = () => setFix(true);
fixLoop();
new IntersectionObserver(
  (e, o) => {
    if (e[0].isIntersecting) {
      setTimeout(() => setFix(true), 700);
      o.disconnect();
    }
  },
  { threshold: 0.6 },
).observe($(".fixbox"));

/* simulador */
const ESTILOS = [
  ["orig", "Original do carro"],
  ["w1", "Preta diamantada"],
  ["w2", "Grafite polida"],
];
const CEN = [
    [479.6, 670.5],
    [1468.6, 666],
  ],
  RT = 118,
  R19 = 89.7,
  LARG = 235,
  DBASE = 670.6;
const S = { e: "w1", a: 19 },
  IM = {};
const cv = $("#cv"),
  cx = cv.getContext("2d");
function asp(a) {
  return Math.max(30, Math.min(65, Math.round((((DBASE - a * 25.4) / 2 / LARG) * 100) / 5) * 5));
}
function draw(ang) {
  cx.drawImage(IM.base, 0, 0);
  if (S.e === "orig") return;
  const rr = (R19 * S.a) / 19;
  CEN.forEach(([x, y]) => {
    let g = cx.createRadialGradient(x, y, 0, x, y, RT);
    g.addColorStop(0, "#0e1012");
    g.addColorStop(0.6, "#101315");
    g.addColorStop(1, "#1b1f22");
    cx.fillStyle = g;
    cx.beginPath();
    cx.arc(x, y, RT - 2.5, 0, 7);
    cx.fill();
    const q = rr + 9;
    g = cx.createRadialGradient(x, y, 0, x, y, q);
    g.addColorStop(rr / q, "rgba(0,0,0,.7)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    cx.fillStyle = g;
    cx.beginPath();
    cx.arc(x, y, q, 0, 7);
    cx.fill();
    cx.save();
    cx.translate(x, y);
    cx.beginPath();
    cx.arc(0, 0, rr, 0, 7);
    cx.clip();
    cx.rotate(ang);
    cx.drawImage(IM[S.e], -rr, -rr, 2 * rr, 2 * rr);
    cx.rotate(-ang);
    g = cx.createLinearGradient(0, -rr, 0, rr);
    g.addColorStop(0, "rgba(255,255,255,.08)");
    g.addColorStop(1, "rgba(0,0,0,.28)");
    cx.fillStyle = g;
    cx.fillRect(-rr, -rr, 2 * rr, 2 * rr);
    g = cx.createRadialGradient(0, 0, rr * 0.8, 0, 0, rr);
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(1, "rgba(0,0,0,.35)");
    cx.fillStyle = g;
    cx.fillRect(-rr, -rr, 2 * rr, 2 * rr);
    cx.restore();
  });
}
let raf;
function spin() {
  cancelAnimationFrame(raf);
  if (reduce || S.e === "orig") {
    draw(0);
    return;
  }
  const t0 = performance.now();
  (function f(t) {
    const p = Math.min(1, (t - t0) / 900);
    draw(-4.6 * Math.pow(1 - p, 3));
    if (p < 1) raf = requestAnimationFrame(f);
  })(t0);
}
function simInfo() {
  const o = S.e === "orig",
    n = ESTILOS.find((e) => e[0] === S.e)[1];
  $("#s1").innerHTML = o ? "Roda <b>original</b>" : `Roda <b>aro ${S.a}</b>`;
  $("#s2").innerHTML = o ? "" : `Pneu <b>${LARG}/${asp(S.a)} R${S.a}</b>`;
  const txt = o
    ? "Olá! Vi o simulador e queria saber sobre rodas para o meu carro."
    : `Olá! Montei no simulador: Volvo S60, roda ${n} aro ${S.a}, pneu ${LARG}/${asp(S.a)} R${S.a}. Quero um orçamento.`;
  $("#wa-sim").href = wa(txt);
}
function chips(el, items, cur, fn, off) {
  el.innerHTML = "";
  items.forEach(([v, t]) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip";
    b.textContent = t;
    b.disabled = !!off;
    b.setAttribute("aria-pressed", v == cur);
    b.onclick = () => fn(v);
    el.appendChild(b);
  });
}
function ui() {
  chips($("#estilos"), ESTILOS, S.e, (v) => {
    S.e = v;
    ui();
    spin();
  });
  chips(
    $("#aros"),
    [17, 18, 19, 20].map((a) => [a, a + '"']),
    S.a,
    (v) => {
      S.a = v;
      ui();
      spin();
    },
    S.e === "orig",
  );
  simInfo();
}
let n = 0;
Object.entries(SRC).forEach(([k, s]) => {
  const i = new Image();
  i.onload = () => {
    if (++n === 3) {
      ui();
      spin();
    }
  };
  i.src = s;
  IM[k] = i;
});
