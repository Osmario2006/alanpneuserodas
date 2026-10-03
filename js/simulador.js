/* Página de kits: simulador da roda no carro, com a medida de pneu indicada. */

const SRC = {
  base: "assets/img/simulador/volvo-s60.jpg",
  w1: "assets/img/simulador/roda-preta-diamantada.webp",
  w2: "assets/img/simulador/roda-grafite-polida.webp",
};
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
