# Guia de estilo — Alan Wheeling Pneus & Rodas

Referência: o estilo de sites de marcas de carro premium catalogado no Refero Styles (Rivian e Tesla), adaptado para o escuro e para a identidade da loja (preto de oficina e o amarelo da fachada).

**Ideia central:** galeria escura. A roda e as fotos dos trabalhos são as estrelas; a interface fica quieta, em tons de grafite, e o amarelo aparece pouco e só onde importa.

Os valores abaixo estão no bloco `:root` e na seção "Guia de estilo" de `css/style.css`.

## Cores

| Nome | Hex | Uso |
|---|---|---|
| Asfalto | `#0b0b0b` | Fundo da página |
| Grafite | `#151515` | Cartões, formulário, rodapé |
| Grafite claro | `#1c1c1c` | Cartão com o mouse em cima, campos |
| Linha | `#262626` | Bordas finas de 1 px e divisórias |
| Linha forte | `#3a3a3a` | Borda de campos e botões secundários |
| Giz | `#f2f2f2` | Texto principal e títulos |
| Névoa | `#a6a6a6` | Texto de apoio |
| Amarelo fachada | `#f5b800` | Botão principal, faixa amarela, números dos passos |
| Tinta | `#151515` | Texto sobre o amarelo |

Regras:
- **Um botão amarelo por tela.** O segundo botão é sempre contornado.
- O amarelo não é usado em parágrafos. Em títulos, só no destaque das páginas de serviço ("Desempeno **de rodas**").
- Profundidade vem da troca de tom (asfalto → grafite → grafite claro) e de bordas de 1 px, não de sombras.

## Tipografia

- **Títulos:** Barlow Condensed, itálico, peso 900, caixa alta, espaçamento entre letras levemente negativo (-0,015em a -0,02em). É a voz da loja: rápida e de oficina.
- **Texto:** Barlow 400/500/600.

| Papel | Tamanho | Altura de linha |
|---|---|---|
| Título do topo (h1) | 48 px no celular até 104 px | 0,9 |
| Título de seção (h2) | 36 px até 64 px | 0,95 |
| Título de cartão (h3) | 24 px | 1,05 |
| Texto | 17 px | 1,55 |
| Texto de apoio | 15 px | 1,5 |
| Legenda | 13 px | 1,35 |

Nunca usar texto abaixo de 13 px.

## Espaçamento

Base de 8 px: 8, 16, 24, 32, 48, 80, 96.

- Entre seções: 96 px no computador, 64 px no celular.
- Dentro dos cartões: 24 px no celular, 32 px no computador.
- Entre itens de uma lista ou grade: 16 px.
- Largura máxima do conteúdo: 1240 px.

## Formas

| Elemento | Raio |
|---|---|
| Botões e chips | redondo (pílula) |
| Cartões, fotos, vídeo, formulário | 20 px |
| Miniaturas | 14 px |
| Campos de formulário | 12 px |

No celular, blocos de borda a borda ficam sem raio.

## Componentes

- **Botão principal:** pílula amarela, texto tinta, peso 600, altura mínima de 48 px.
- **Botão secundário:** pílula transparente com borda de 1 px linha forte; ao passar o mouse, a borda fica giz.
- **Cartão:** grafite, borda de 1 px linha, raio de 20 px; ao passar o mouse, fica grafite claro e a borda clareia.
- **Foto de trabalho:** raio de 20 px, legenda sobre degradê escuro no rodapé da foto.

## Movimento

- Entradas de 0,6 s a 0,9 s, curva suave (`cubic-bezier(0.2, 0.7, 0.2, 1)`).
- Efeitos inspirados no Spell UI, refeitos em CSS e JavaScript puros:
  - **Brilho metálico** passando pelo título do topo.
  - **Inclinação 3D** dos cartões de serviço e das fotos, seguindo o mouse (só no computador).
  - **Raios de luz** atrás da roda quando a diamantação termina.
- Com "reduzir movimento" ligado no sistema, nada disso roda.

## O que evitar

- Sombras grandes, brilhos e degradês em botões e cartões.
- Mais de uma cor de destaque além do amarelo (o verde fica só no botão do WhatsApp).
- Bordas grossas (2 px ou mais) em cartões.
- Texto disputando espaço com as fotos: título curto, foto grande.
