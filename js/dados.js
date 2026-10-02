/* =====================================================================
   DADOS DO SITE  —  edite aqui textos, contatos, trabalhos e vídeos.
   As imagens ficam em assets/img e os vídeos em assets/video.
   ===================================================================== */

/* Contato da loja (confirme telefone e horário com a loja) */
const LOJA = {
  nome: "Alan Wheeling",
  destaque: "Pneus & Rodas",
  endereco: "Rua Rio Grande do Sul, 1881, Aracaju (SE)",
  whats: "5579999132239", // só números, com 55 e DDD
  whatsTexto: "(79) 99913-2239",
  horario: "Confirme pelo WhatsApp",
};

/* Galeria "Carros que saíram da loja" (as 12 primeiras aparecem logo de cara) */
const TRABALHOS = [
  {
    img: "assets/img/trabalhos/01-rodas-aro-20.webp",
    titulo: "Rodas aro 20",
    detalhe: "Pneus 225/35 R20 e mudança de furação",
    instagram: "https://www.instagram.com/p/Dd4xSDOxZG9/",
  },
  {
    img: "assets/img/trabalhos/02-trailblazer-aro-22.webp",
    titulo: "Trailblazer aro 22",
    detalhe: "Projeto completo de rodas",
    instagram: "https://www.instagram.com/p/Dc4YLYFzhCE/",
  },
  {
    img: "assets/img/trabalhos/03-toyota-sw4.webp",
    titulo: "Toyota SW4",
    detalhe: "Rodas e pneus para o projeto",
    instagram: "https://www.instagram.com/p/DdFTohVx-rm/",
  },
  {
    img: "assets/img/trabalhos/04-byd-aro-20.webp",
    titulo: "BYD aro 20",
    detalhe: "Rodas novas no elétrico",
    instagram: "https://www.instagram.com/p/DbCBVh9xrCY/",
  },
  {
    img: "assets/img/trabalhos/05-fusca-com-bbs.webp",
    titulo: "Fusca com BBS",
    detalhe: "Rodas clássicas no carro antigo",
    instagram: "https://www.instagram.com/p/Db4BOseB0SS/",
  },
  {
    img: "assets/img/trabalhos/06-aro-20-com-pneu-at.webp",
    titulo: "Aro 20 com pneu AT",
    detalhe: "Pneus 285/55 R20 de letras brancas",
    instagram: "https://www.instagram.com/p/DcRw01eThkO/",
  },
  {
    img: "assets/img/trabalhos/07-kit-aro-15.webp",
    titulo: "Kit aro 15",
    detalhe: "Pneus 185/45 R15, molas e alinhamento 3D",
    instagram: "https://www.instagram.com/p/DdMt5AWztVx/",
  },
  {
    img: "assets/img/trabalhos/08-projeto-aro-22.webp",
    titulo: "Projeto aro 22",
    detalhe: "Rodas R22 instaladas",
    instagram: "https://www.instagram.com/p/Da8N1UURDG5/",
  },
  {
    img: "assets/img/trabalhos/09-omoda-aro-20.webp",
    titulo: "Omoda aro 20",
    detalhe: "Projeto diferenciado",
    instagram: "https://www.instagram.com/p/DdWnisyRefL/",
  },
  {
    img: "assets/img/trabalhos/10-off-road-aro-20.webp",
    titulo: "Off-road aro 20",
    detalhe: "Projeto para picape",
    instagram: "https://www.instagram.com/p/DaTuSf9hQfj/",
  },
  {
    img: "assets/img/trabalhos/11-kit-aro-17.webp",
    titulo: "Kit aro 17",
    detalhe: "Pneus 205/50 R17 zero",
    instagram: "https://www.instagram.com/p/DcPOUOlR5JF/",
  },
  {
    img: "assets/img/trabalhos/12-celta.webp",
    titulo: "Celta",
    detalhe: "Rodas novas no popular",
    instagram: "https://www.instagram.com/p/DbrPUQjREEB/",
  },
  {
    img: "assets/img/trabalhos/13-honda.webp",
    titulo: "Honda",
    detalhe: "Projeto de cliente antigo da loja",
    instagram: "https://www.instagram.com/p/DbmEL9Sh2KL/",
  },
  {
    img: "assets/img/trabalhos/14-rodas-aro-18.webp",
    titulo: "Rodas aro 18",
    detalhe: "Kit zero saindo da loja",
    instagram: "https://www.instagram.com/p/Dd2WcvjxFa6/",
  },
  {
    img: "assets/img/trabalhos/15-projeto-aro-20.webp",
    titulo: "Projeto aro 20",
    detalhe: "Rodas e pneus 20 polegadas",
    instagram: "https://www.instagram.com/p/Dcq9rJuxVOq/",
  },
  {
    img: "assets/img/trabalhos/16-picape-aro-20.webp",
    titulo: "Picape aro 20",
    detalhe: "Pneus 275/55 R20 AT de letras brancas",
    instagram: "https://www.instagram.com/p/DbHOK9yB37u/",
  },
  {
    img: "assets/img/trabalhos/17-saindo-aro-20.webp",
    titulo: "Saindo aro 20",
    detalhe: "Mais um carro pronto",
    instagram: "https://www.instagram.com/p/DcmVAAOTBjw/",
  },
  {
    img: "assets/img/trabalhos/18-kit-aro-17.webp",
    titulo: "Kit aro 17",
    detalhe: "Pneus 195/45 R17 zero",
    instagram: "https://www.instagram.com/p/DdwvT3PzRKo/",
  },
];

/* Faixa de fotos abaixo dos vídeos */
const PROCESSO = [
  {
    img: "assets/img/processo/01-diamantacao-cnc.webp",
    titulo: "Diamantação CNC",
    instagram: "https://www.instagram.com/p/DZVu4c3PyYO/",
  },
  {
    img: "assets/img/processo/02-pintura-eletrostatica-e-diamantacao.webp",
    titulo: "Pintura eletrostática e diamantação",
    instagram: "https://www.instagram.com/p/DdCrDpTRrTn/",
  },
  {
    img: "assets/img/processo/03-pintura-eletrostatica-colorida.webp",
    titulo: "Pintura eletrostática colorida",
    instagram: "https://www.instagram.com/p/DbySoRlxv5S/",
  },
  {
    img: "assets/img/processo/04-pintura-eletrostatica-a-po.webp",
    titulo: "Pintura eletrostática a pó",
    instagram: "https://www.instagram.com/p/DaHBT6IxqLI/",
  },
  {
    img: "assets/img/processo/05-acabamento-black-piano.webp",
    titulo: "Acabamento black piano",
    instagram: "https://www.instagram.com/p/Db6uQJbx0h_/",
  },
  {
    img: "assets/img/processo/06-maquina-de-furacao-de-rodas.webp",
    titulo: "Máquina de furação de rodas",
    instagram: "https://www.instagram.com/p/DbJrxqyRvMV/",
  },
];
