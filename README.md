# Site Alan Wheeling Pneus & Rodas

Proposta de landing page para a Alan Wheeling Pneus & Rodas (Aracaju, SE), com trabalhos e vídeos do Instagram @alanpneuserodas, simulador de rodas e roda 3D renderizada no Blender.

> Proposta para apresentação. Antes de publicar, a loja precisa aprovar o uso das fotos, dos vídeos e da marca, e confirmar telefone e horário. Fotos e vídeos vêm do Instagram @alanpneuserodas.

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
├─ 404.html                    página de endereço não encontrado
├─ sitemap.xml, robots.txt     para o Google achar as páginas
├─ site.webmanifest, favicon.ico  ícones do site
├─ css/style.css               cores, fontes, layout e animações
├─ js/dados.js                 CONTATOS, GALERIA DE TRABALHOS e VÍDEOS  ← comece por aqui
├─ js/comum.js                 partes de todas as páginas: menu, cabeçalho, botão do WhatsApp,
│                              formulário de orçamento, fotos ampliadas e animações
├─ js/motion.js        animações ligadas à rolagem (estilos em css/motion.css)
├─ js/main.js                  página inicial: galeria e roda do topo
├─ js/desempeno.js             animação do aro empenado
├─ js/simulador.js             simulador de rodas
└─ assets/
   ├─ img/
   │  ├─ icones/               favicon e ícones do celular
   │  ├─ og/                   imagens que aparecem ao compartilhar o link (1200×630)
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
- **Publicar com outro endereço:** o endereço provisório é `https://osmario2006.github.io/alanpneuserodas/`. Quando houver domínio próprio, troque esse texto em todos os arquivos `.html`, no `sitemap.xml` e no `robots.txt` (no VS Code: Ctrl+Shift+H). No `404.html`, ajuste também a linha `<base href="/alanpneuserodas/">` para `<base href="/">`.
- **Cabeçalho, rodapé, orçamento e contato** se repetem nas páginas. Ao mudar um link ou texto deles, mude em todos os `.html`.
- **Mudar cores:** as cores ficam no começo de `css/style.css`, no bloco `:root` (`--amber` é o amarelo da marca).

## Motion (animações)

Ficam em dois arquivos próprios, carregados em todas as páginas:

- `css/motion.css`: estilos das animações.
- `js/motion.js`: comportamento ligado à rolagem e ao mouse.

O que tem:

- **Seção "Do riscado ao espelhado"** (página inicial): a roda gira conforme a página rola e passa pelas quatro etapas: gasta, desempeno (para de balançar), pintura eletrostática (a tinta varre a roda) e diamantação CNC (o brilho aparece de fora para dentro, como o corte do torno). As imagens são três fotos da mesma roda, recortadas e alinhadas: `assets/img/roda-antes.webp` (gasta), `roda-pintada.webp` (pintada de preto, montada a partir da foto final) e `roda-depois.webp` (diamantada). Para trocar por uma roda da loja, use fotos de frente com a roda centralizada e do mesmo tamanho nas três. Os trechos da rolagem de cada etapa estão na lista `ETAPAS` em `js/motion.js`.
- Títulos que sobem palavra por palavra, números que contam até o valor, barra de progresso no topo.
- Cabeçalho que some ao descer e volta ao subir.
- Faixa amarela que acelera, inclina e inverte o sentido com a rolagem.
- Roda do topo que inclina seguindo o mouse; botões com atração magnética e brilho; cartões de serviço com luz seguindo o cursor e ícones que se desenham.
- Troca suave entre páginas (Chrome, Edge e Safari recentes).

Se o visitante ativou "reduzir movimento" no sistema, nada disso roda e a seção mostra as quatro etapas paradas, com a roda pronta. Sem JavaScript, o site também aparece completo.

## Celular

A maioria das visitas vem do Instagram, pelo celular. Os ajustes ficam no fim de `css/style.css` (bloco "celular") e em `js/comum.js` (barra de ações):

- Barra fixa no rodapé com **Pedir orçamento** e **WhatsApp**. Aparece depois do topo da página e some quando o formulário ou o contato já estão na tela.
- Nenhuma página rola para o lado (o mapa empurrava a tela para 735 px).
- Botões e links com área de toque de pelo menos 44 px; efeitos de passar o mouse desligados no toque.
- Topo mais compacto: botões lado a lado, números numa linha e a roda já aparece na primeira tela.
- Galerias das páginas de serviço em duas colunas; vídeo centralizado.
- Seção "Do riscado ao espelhado" mais curta no celular.

Para testar: no navegador do computador, aperte F12 e ative o modo celular (ícone de celular e tablet), ou abra pelo celular na mesma rede usando o endereço que o Live Server mostra.

## Origem do material

- Fotos e vídeos: Instagram @alanpneuserodas (os links de cada post estão em `js/dados.js`).
- Roda do topo: modelo 3D próprio, renderizado no Blender a partir de imagens de referência.
- Carro do simulador: foto de divulgação do Volvo S60, usada só como exemplo no protótipo.
