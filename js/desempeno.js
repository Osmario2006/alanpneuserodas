/* Página de desempeno: aro empenado girando, antes e depois do serviço. */

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
