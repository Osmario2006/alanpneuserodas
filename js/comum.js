/* Partes iguais em todas as páginas: contato, menu, cabeçalho, botão do WhatsApp,
   formulário de orçamento, fotos ampliadas e animações de entrada.
   Os dados (contatos, trabalhos, vídeos) ficam em js/dados.js. */

const $ = (q) => document.querySelector(q),
  reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
function wa(t) {
  return LOJA.whats ? `https://wa.me/${LOJA.whats}?text=${encodeURIComponent(t)}` : "#contato";
}

/* conteúdo da loja: o HTML já vem preenchido, aqui só vale o que estiver em dados.js */
document.querySelectorAll("[data-loja]").forEach((el) => {
  if (LOJA[el.dataset.loja]) el.textContent = LOJA[el.dataset.loja];
});
document.querySelectorAll("[data-ano]").forEach((el) => (el.textContent = new Date().getFullYear()));
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
  if (!a.dataset.wa) return;
  a.href = wa(a.dataset.wa);
  a.target = "_blank";
  a.rel = "noopener";
});

/* menu (no celular; no computador os links ficam sempre à mostra) */
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

/* cabeçalho fica mais baixo depois que a página rola */
{
  const top = $(".top");
  const ver = () => top.classList.toggle("rolou", scrollY > 24);
  addEventListener("scroll", ver, { passive: true });
  ver();
}

/* botão flutuante do WhatsApp (some quando o orçamento ou o contato estão na tela) */
{
  const b = document.createElement("a");
  b.className = "wa-float";
  b.href = wa(document.body.dataset.wa || "Olá! Vim pelo site e queria um orçamento.");
  b.target = "_blank";
  b.rel = "noopener";
  b.setAttribute("aria-label", "Conversar com a loja no WhatsApp");
  b.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.2A8.5 8.5 0 1 1 20 11.5z"/><path d="M8.5 9.2c.3 2.6 2.7 5 5.3 5.3l1.3-1.3 2 1-.4 1.6c-4.3.6-9.1-4.2-8.5-8.5l1.6-.4 1 2z" fill="currentColor" stroke-width="1"/></svg><span>WhatsApp</span>`;
  document.body.appendChild(b);
  const perto = new Set();
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => (e.isIntersecting ? perto.add(e.target) : perto.delete(e.target)));
    b.classList.toggle("longe", perto.size > 0);
  });
  document.querySelectorAll("#orcamento, #contato").forEach((el) => io.observe(el));
}

/* formulário de orçamento: monta a mensagem e abre o WhatsApp */
{
  const f = $("#form-orc");
  if (f)
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(f));
      const linhas = [
        `Olá! Vim pelo site e queria um orçamento.`,
        ``,
        `Nome: ${d.nome.trim()}`,
        `Carro: ${d.carro.trim()}`,
        `Serviço: ${d.servico}`,
        `Aro: ${d.aro || "não sei"}`,
      ];
      if (d.obs.trim()) linhas.push(`Detalhes: ${d.obs.trim()}`);
      open(wa(linhas.join("\n")), "_blank", "noopener");
    });
}

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

/* fotos das páginas de serviço abrem ampliadas no próprio site */
{
  const fotos = [...document.querySelectorAll(".gal a")];
  if (fotos.length) {
    const d = document.createElement("dialog");
    d.className = "lb";
    d.setAttribute("aria-label", "Foto ampliada");
    d.innerHTML = `<figure><img alt=""><figcaption><b></b>
 <div class="lbbar"><button type="button" class="btn ghost" data-p="-1">Anterior</button><button type="button" class="btn ghost" data-p="1">Próximo</button>
 <a class="btn" target="_blank" rel="noopener">Ver no Instagram</a><button type="button" class="btn ghost" data-x>Fechar</button></div></figcaption></figure>`;
    document.body.appendChild(d);
    const img = d.querySelector("img"),
      tit = d.querySelector("b"),
      ig = d.querySelector("a");
    let atual = 0;
    const mostrar = (i) => {
      atual = (i + fotos.length) % fotos.length;
      const a = fotos[atual];
      img.src = a.querySelector("img").src;
      img.alt = tit.textContent = a.querySelector("span").textContent;
      ig.href = a.href;
    };
    fotos.forEach((a, i) =>
      a.addEventListener("click", (e) => {
        e.preventDefault();
        mostrar(i);
        d.showModal();
      }),
    );
    d.addEventListener("click", (e) => {
      if (e.target === d || e.target.closest("[data-x]")) d.close();
      const p = e.target.closest("[data-p]");
      if (p) mostrar(atual + Number(p.dataset.p));
    });
    d.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") mostrar(atual + 1);
      if (e.key === "ArrowLeft") mostrar(atual - 1);
    });
  }
}

/* entrada suave das seções ao rolar (roda depois dos outros scripts da página) */
addEventListener("DOMContentLoaded", () => {
  if (reduce || !("IntersectionObserver" in window)) return;
  const sel = [
    "main section > .head",
    ".ig-head",
    ".svc > *",
    ".steps li",
    ".checks li",
    ".gal a",
    ".strip a",
    ".faq details",
    ".story .pics",
    ".story > .head",
    ".fix > *",
    ".sim",
    ".orc > *",
    ".contact > *",
    ".cta",
    ".igband",
  ].join(",");
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        io.unobserve(e.target);
      }),
    { rootMargin: "0px 0px -8% 0px" },
  );
  document.querySelectorAll(sel).forEach((el) => {
    const irmaos = [...el.parentElement.children].filter((c) => c.matches(sel));
    el.style.setProperty("--d", `${Math.min(irmaos.indexOf(el), 5) * 70}ms`);
    el.classList.add("rv");
    io.observe(el);
  });
});
