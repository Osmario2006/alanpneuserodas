/* Comportamento da página inicial: galeria de trabalhos, faixa do processo e roda do topo.
   As partes comuns a todas as páginas ficam em js/comum.js. */

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

/* rolagem da galeria: arrasto com o mouse, dedo/trackpad e deslize automático.
   Para quando o usuário interage e volta 0,5 s depois. A lista está duplicada,
   então a posição é mantida na faixa central para dar a volta nos dois sentidos. */
{
  const VEL = 45; // px por segundo
  const ESPERA = 500; // ms depois da última interação
  let pos = 0,
    ult = 0,
    t0 = performance.now(),
    ate = 0,
    parado = false,
    arrastando = false,
    moveu = false,
    visivel = true;
  const segurar = () => (ate = performance.now() + ESPERA);
  const meio = () => grid.children[TRABALHOS.length].offsetLeft - grid.children[0].offsetLeft;
  const norm = (v) => {
    const m = meio();
    if (m <= 0) return v;
    if (v < m * 0.5) return v + m;
    if (v >= m * 1.5) return v - m;
    return v;
  };
  const ir = (v) => {
    grid.scrollLeft = v;
    ult = grid.scrollLeft;
    pos = v;
  };
  /* posição inicial na faixa central (feita quando o layout já tem largura) */
  let pronto = false;
  const iniciar = () => {
    if (pronto || meio() <= 0) return;
    pronto = true;
    ir(norm(grid.scrollLeft));
  };
  iniciar();

  /* mouse: arrastar para qualquer lado */
  let x0 = 0,
    s0 = 0,
    id = null;
  grid.addEventListener("pointerdown", (e) => {
    iniciar();
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    id = e.pointerId;
    x0 = e.clientX;
    s0 = grid.scrollLeft;
    moveu = false;
  });
  grid.addEventListener("pointermove", (e) => {
    if (e.pointerId !== id) return;
    const dx = e.clientX - x0;
    if (!arrastando) {
      if (Math.abs(dx) < 6) return;
      arrastando = moveu = true;
      grid.setPointerCapture(id);
      grid.classList.add("arrastando");
    }
    let v = s0 - dx;
    const m = meio();
    while (v < m * 0.5) (v += m), (s0 += m);
    while (v >= m * 1.5) (v -= m), (s0 -= m);
    ir(v);
  });
  const soltar = (e) => {
    if (e.pointerId !== id) return;
    id = null;
    if (arrastando) {
      arrastando = false;
      grid.classList.remove("arrastando");
      segurar();
    }
  };
  grid.addEventListener("pointerup", soltar);
  grid.addEventListener("pointercancel", soltar);
  grid.addEventListener(
    "click",
    (e) => {
      if (moveu) {
        e.stopPropagation();
        e.preventDefault();
        moveu = false;
      }
    },
    true,
  );
  grid.addEventListener("dragstart", (e) => e.preventDefault());

  /* pausas */
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
    if (arrastando || Math.abs(grid.scrollLeft - ult) <= 1.5) return;
    segurar();
    ir(norm(grid.scrollLeft));
  };
  grid.addEventListener("scroll", sincronizar);

  if (!reduce) {
    new IntersectionObserver(([e]) => (visivel = e.isIntersecting)).observe(grid);
    const passo = (t) => {
      const dt = Math.min((t - t0) / 1000, 0.1);
      t0 = t;
      iniciar();
      sincronizar();
      if (visivel && !parado && !arrastando && !lb.open && t >= ate) ir(norm(pos + VEL * dt));
      requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  }
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
