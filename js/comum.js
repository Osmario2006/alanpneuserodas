/* Partes iguais em todas as páginas: marca, menu, contato, faixa amarela e links de WhatsApp.
   Os dados (contatos, trabalhos, vídeos) ficam em js/dados.js. */

const $ = (q) => document.querySelector(q),
  reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
function wa(t) {
  return LOJA.whats ? `https://wa.me/${LOJA.whats}?text=${encodeURIComponent(t)}` : "#contato";
}

/* conteúdo da loja */
$("#m-nome").innerHTML = `${LOJA.nome} <span>${LOJA.destaque}</span>`;
if ($("#c-end")) {
  $("#c-end").textContent = LOJA.endereco;
  $("#c-wa").textContent = LOJA.whatsTexto;
  $("#c-hor").textContent = LOJA.horario;
  $("#mapa").href =
    "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(LOJA.endereco);
}
const tk = [
  "Diamantação CNC",
  "Pintura eletrostática",
  "Desempeno",
  "Solda de alumínio",
  "Furação",
  "Alinhamento 3D",
  "Kits rodas e pneus",
];
if ($("#tk")) $("#tk").innerHTML = [...tk, ...tk, ...tk, ...tk].map((s) => `<span>${s}</span>`).join("");
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

/* vídeos das páginas de serviço: só rodam quando estão na tela */
document.querySelectorAll("video[data-auto]").forEach((v) => {
  if (reduce) {
    v.controls = true;
    return;
  }
  new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), {
    threshold: 0.3,
  }).observe(v);
});
