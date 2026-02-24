/**
 * ============================================================
 *  catalogo.js — Base de datos de títulos
 * ============================================================
 *  Los datos se cargan automáticamente desde Google Sheets.
 *  Para agregar títulos, edita directamente tu hoja de cálculo.
 *
 *  Columnas esperadas en el Sheet (fila 1 = encabezados):
 *  id | titulo | tipo | generos | temporadas | cover |
 *  sinopsis | urlManga | urlAnime | urlManhwa | urlDonghua | urlPelicula
 *
 *  - "tipo" y "generos" van separados por coma: anime,manga
 *  - "cover" puede ser nombre de archivo (001.jpeg) o URL completa
 * ============================================================
 */

// ── URL de tu Google Sheet publicado ──────────────────────────
// Tu link original termina en /pubhtml — lo convertimos a CSV
const SHEET_PUBHTML = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR5dM8y0r6LSGZpI3E1wKgl3GFD0c_14lzeAuMEgNZgNdAMZjXcTeyvcDvjHFMx-MsggDUVEi9Vv4yr/pubhtml";

const SHEET_ID  = SHEET_PUBHTML.match(/\/d\/e\/([^/]+)/)?.[1] ?? "";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/e/${SHEET_ID}/pub?output=csv`;

// ── Fallback local (se usa si Sheets falla o estás offline) ───
const CATALOG_LOCAL = [
  {
    id: 1, titulo: "Boku no Kokoro no Yabai Yatsu", tipo: ["manga", "anime"],
    generos: ["romance", "comedia", "escolar"], temporadas: 2, cover: "001.jpeg",
    sinopsis: "Kyotaro Ichikawa es un chico solitario que fantasea con asesinar a la chica popular de la clase, pero pronto descubre que sus sentimientos son muy diferentes.",
    urlManga: "https://www.leercapitulo.co/leer/5ungi75ry5/boku-no-kokoro-no-yabai-yatsu/1/",
    urlAnime: "https://latino.solo-latino.com/es/detail/drama/8qev2R638st7yupzrp3dC-The-Dangers-in-My-Heart/1"
  },
 {
    id: 2, titulo: "Suki na Ko ga Megane wo Wasureta", tipo: ["manga", "anime"],
    generos: ["romance", "comedia", "escolar"], temporadas: 1, cover: "002.jpeg",
    sinopsis: "Komura siempre intenta ayudar a su compañera de asiento, Mie, quien constantemente olvida sus gafas y termina acercándose demasiado para poder ver.",
    urlManga: "https://www.leercapitulo.co/leer/tku8jvz85g/sukinako-ga-megane-wo-wasureta/1/",
    urlAnime: "https://flixlat.com/es/detail/drama/ajXNJssIk4VZCNX5R4FFG-The-Girl-I-Like-Forgot-Her-Glasses"
  },
{
  id: 3, 
  titulo: "Kyokai no Kanata (Beyond the Boundary)", 
  tipo: ["anime", "manga", "pelicula"],
  generos: ["fantasia", "romance", "sobrenatural", "accion"], 
  temporadas: 1, 
  cover: "003.jpeg",
  sinopsis: "Akihito Kanbara es un chico inmortal mitad humano y mitad guerrero espiritual. Su vida cambia cuando conoce a Mirai Kuriyama, una chica que tiene la habilidad de manipular su propia sangre para crear armas.",
  urlManga: "#", 
  urlAnime: "#"
},

  {
    id: 4, titulo: "Meng Qi Shi Shen (Cinderella Chef)", tipo: ["donghua"],
    generos: ["romance", "comedia", "historico"], temporadas: 3, cover: "004.jpeg",
    sinopsis: "Una joven chef viaja en el tiempo a la antigua China. Es secuestrada por bandidos y debe usar su ingenio y cocina para conquistar el corazón de su captor.",
    urlDonghua: "https://tu-sitio.com/cinderella-chef"
  },
  {
    id: 5, titulo: "Sono Bisque Doll wa Koi wo Suru", tipo: ["manga", "anime"],
    generos: ["romance", "comedia", "slice-of-life"], temporadas: 1, cover: "005.jpeg",
    sinopsis: "Wakana Gojo, un chico tímido que hace muñecas Hina, termina ayudando a la hermosa Marin Kitagawa a cumplir su sueño de hacer cosplay.",
    urlManga: "https://www.leercapitulo.co/leer/txy8952tuk/sono-bisque-doll-wa-koi-wo-suru/1/",
    urlAnime: "https://tu-sitio.com/bisque-doll-anime"
  },
  {
    id: 6, titulo: "Giji Harem", tipo: ["manga", "anime"],
    generos: ["romance", "comedia", "escolar"], temporadas: 1, cover: "006.jpeg",
    sinopsis: "Nijakura es una chica del club de teatro que usa sus dotes de actuación para interpretar diferentes personalidades y darle a su senpai un 'harem'.",
    urlManga: "https://www.leercapitulo.co/leer/saxtbe43y1/pseudo-harem/1/",
    urlAnime: "https://tu-sitio.com/pseudo-harem-anime"
  },
  {
    id: 7, titulo: "Aura: Maryuuin Kouga Saigo no Tatakai", tipo: ["pelicula", "manga"],
    generos: ["drama", "romance", "escolar"], temporadas: 0, cover: "007.jpeg",
    sinopsis: "Ichiro Sato intenta dejar atrás sus delirios de fantasía, pero su vida cambia al conocer a una chica que cree ser una investigadora de otro mundo.",
    urlManga: "#", urlAnime: "#"
  },
   {
    id: 8, titulo: "Kimi ni Todoke", tipo: ["manga", "anime"],
    generos: ["romance", "drama", "escolar"], temporadas: 3, cover: "008.jpeg",
    sinopsis: "Sawako, apodada 'Sadako' por su parecido con la niña de El Aro, intenta hacer amigos y encuentra el amor en el chico más popular de la escuela.",
    urlManga: "https://tu-sitio.com/kimi-ni-todoke-manga",
    urlAnime: "https://tu-sitio.com/kimi-ni-todoke-anime"
  },
    {
    id: 9, titulo: "Make Heroine ga Oosugiru!", tipo: ["manga", "anime"],
    generos: ["romance", "comedia", "escolar"], temporadas: 1, cover: "009.jpeg",
    sinopsis: "Nukumizu es un chico común que termina presenciando cómo varias chicas populares de su escuela son rechazadas por sus respectivos intereses amorosos.",
    urlManga: "https://tu-sitio.com/makeine-manga",
    urlAnime: "https://tu-sitio.com/makeine-anime"
  },
  {
    id: 10, titulo: "Ao no Hako", tipo: ["manga", "anime"],
    generos: ["romance", "deportes", "escolar"], temporadas: 1, cover: "010.jpeg",
    sinopsis: "Taiki admira a Chinatsu desde lejos. Tras un giro del destino, ella termina viviendo en su casa, iniciando una convivencia llena de sentimientos y deportes.",
    urlManga: "https://tu-sitio.com/blue-box-manga",
    urlAnime: "https://tu-sitio.com/blue-box-anime"
  },
  {
    id: 11, titulo: "Fuufu Ijou, Koibito Miman.", tipo: ["manga", "anime"],
    generos: ["romance", "comedia", "escolar"], temporadas: 1, cover: "011.jpeg",
    sinopsis: "En una práctica escolar de 'entrenamiento matrimonial', Jirou es emparejado con la popular Akari, mientras sus respectivos intereses amorosos están juntos.",
    urlManga: "https://www.leercapitulo.co/leer/toc6p5bxsw/fuufu-ijou-koibito-miman/1/",
    urlAnime: "https://tu-sitio.com/fuufu-ijou-anime"
  },
  {
    id: 12, titulo: "Tenki no Ko (El tiempo contigo)", tipo: ["pelicula", "manga"],
    generos: ["drama", "romance", "fantasia"], temporadas: 1, cover: "012.jpeg",
    sinopsis: "Un estudiante de secundaria que huyó a Tokio se hace amigo de una chica que parece poder manipular el clima a su voluntad.",
    urlManga: "#", urlAnime: "#"
  },
];

// ─────────────────────────────────────────────
//  Parser CSV (respeta comas dentro de "...")
// ─────────────────────────────────────────────
function parseCSVLine(line) {
  const result = [];
  let current  = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

// ─────────────────────────────────────────────
//  Convierte fila CSV → objeto del catálogo
// ─────────────────────────────────────────────
function parseRow(headers, values) {
  const row = {};
  // Normaliza headers a minúsculas para evitar errores de mayúsculas
  headers.forEach((h, i) => { row[h.trim().toLowerCase()] = (values[i] ?? "").trim(); });

  const splitList = val => val
    ? val.split(",").map(s => s.trim()).filter(Boolean)
    : [];

  return {
    id          : Number(row.id) || 0,
    titulo      : row.titulo      || "",
    tipo        : splitList(row.tipo),
    generos     : splitList(row.generos),
    temporadas  : Number(row.temporadas) || 0,
    cover       : row.cover       || "",
    sinopsis    : row.sinopsis    || "Sin sinopsis disponible.",
    urlManga    : row.urlmanga    || null,
    urlAnime    : row.urlanime    || null,
    urlManhwa   : row.urlmanhwa   || null,
    urlDonghua  : row.urldonghua  || null,
    urlPelicula : row.urlpelicula || null,
    url         : row.url         || null,
  };
}

// ─────────────────────────────────────────────
//  Carga el catálogo: Sheets primero, local si falla
// ─────────────────────────────────────────────
export async function loadCatalog() {
  try {
    const res = await fetch(SHEET_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const text  = await res.text();
    const lines = text.trim().split("\n").filter(l => l.trim());
    if (lines.length < 2) throw new Error("Sheet vacío");

    const headers = parseCSVLine(lines[0]);
    const catalog = lines.slice(1).map(line => parseRow(headers, parseCSVLine(line)));

    console.log(`Sheets: ${catalog.length} títulos cargados`);
    return catalog;

  } catch (err) {
    console.warn(`Sheets no disponible (${err.message}). Usando catálogo local.`);
    return CATALOG_LOCAL;
  }
}