# Site Alan Wheeling Pneus & Rodas

Proposta de landing page para a Alan Wheeling Pneus & Rodas (Aracaju, SE), com trabalhos e vídeos do Instagram @alanpneuserodas, simulador de rodas e roda 3D renderizada no Blender.

> Proposta para apresentação. Antes de publicar, a loja precisa aprovar o uso das fotos, dos vídeos e da marca, e confirmar telefone e horário.

## Como abrir no VS Code

1. No VS Code: **File > Open Folder** e escolha a pasta `alan-wheeling-site`.
2. Instale a extensão **Live Server** (aba Extensões, à esquerda; procure por "Live Server", de Ritwick Dey).
3. Clique com o botão direito em `index.html` > **Open with Live Server**.
   O site abre no navegador e atualiza sozinho cada vez que um arquivo é salvo.

Também funciona dando dois cliques em `index.html`, mas sem a atualização automática.

## Estrutura

```
alan-wheeling-site/
├─ index.html                  página inicial (trabalhos, processo, serviços, história, contato)
├─ diamantacao.html            página do serviço de diamantação CNC
├─ pintura-eletrostatica.html  página do serviço de pintura eletrostática
├─ desempeno.html              página do desempeno (com a animação antes/depois)
├─ kits-rodas-e-pneus.html     página de kits e troca (com o simulador de rodas)
├─ css/style.css               cores, fontes, layout e animações
├─ js/dados.js                 CONTATOS, GALERIA DE TRABALHOS e VÍDEOS  ← comece por aqui
├─ js/comum.js                 partes de todas as páginas: menu, contato, WhatsApp, vídeos
├─ js/main.js                  página inicial: galeria e roda do topo
├─ js/desempeno.js             animação do aro empenado
├─ js/simulador.js             simulador de rodas
└─ assets/
   ├─ img/
   │  ├─ roda-hero.webp        roda 3D do topo
   │  ├─ historia-loja.webp    publicação fixada do Instagram
   │  ├─ fachada.webp
   │  ├─ trabalhos/            fotos da galeria (4:5)
   │  ├─ processo/             fotos da faixa abaixo dos vídeos
   │  └─ simulador/            carro e rodas do simulador
   └─ video/                   trechos de 8 s dos reels (sem som) e capas
```

## Tarefas comuns

- **Trocar telefone, endereço ou horário:** edite o objeto `LOJA` em `js/dados.js`.
- **Adicionar um trabalho na galeria:** coloque a foto em `assets/img/trabalhos/` (formato 4:5, cerca de 540×675 px, WebP ou JPG) e acrescente um item na lista `TRABALHOS` em `js/dados.js`.
- **Trocar um vídeo:** coloque `nome.mp4` e `nome-capa.jpg` em `assets/video/` e ajuste a lista `VIDEOS`. Vídeos em MP4 (H.264), verticais, curtos e sem som carregam mais rápido.
- **Editar uma página de serviço:** os textos (quando fazer, etapas, fotos, dúvidas) estão direto no HTML de cada página. O menu e o bloco "Outros serviços" se repetem nas cinco páginas; se criar um serviço novo, acrescente o link em todas.
- **Mudar cores:** as cores ficam no começo de `css/style.css`, no bloco `:root` (`--amber` é o amarelo da marca).

## Origem do material

- Fotos e vídeos: Instagram @alanpneuserodas (os links de cada post estão em `js/dados.js`).
- Roda do topo: modelo 3D próprio, renderizado no Blender a partir de imagens de referência.
- Carro do simulador: foto de divulgação do Volvo S60, usada só como exemplo no protótipo.
