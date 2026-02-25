/**
 * ============================================================
 *  BUSCADOR DE SERIES - buscador.js
 * ============================================================
 *  Filtros soportados:
 *   - Nombre (texto libre)
 *   - Tipo: anime / manga / manhwa / donghua / pelicula
 *   - Géneros (múltiples)
 *   - Temporadas (rango mín–máx)
 *
 *  El catálogo se carga desde Google Sheets via catalogo.js.
 * ============================================================
 */

// ─────────────────────────────────────────────
//  1.  CATÁLOGO (cargado async desde Sheets)
// ─────────────────────────────────────────────
import { loadCatalog } from "./catalogo.js";

let CATALOG = []; // se llena en init()

// ─────────────────────────────────────────────
//  2.  ESTADO DE FILTROS
// ─────────────────────────────────────────────
const filters = {
  query        : "",
  tipo         : "",
  genero       : "",
  temporadasMin: 1,
  temporadasMax: 10,
};

// ─────────────────────────────────────────────
//  3.  REFERENCIAS DOM
// ─────────────────────────────────────────────
const searchInput    = document.getElementById("searchInput");
const clearBtn       = document.getElementById("clearBtn");
const resultsGrid    = document.getElementById("resultsGrid");
const emptyState     = document.getElementById("emptyState");
const resultCount    = document.getElementById("resultCount");
const temporadasMin  = document.getElementById("temporadasMin");
const temporadasMax  = document.getElementById("temporadasMax");
const temporadasMinV = document.getElementById("temporadasMinVal");
const temporadasMaxV = document.getElementById("temporadasMaxVal");
const resetBtn       = document.getElementById("resetFilters");
const genresToggle   = document.getElementById("genresToggle");
const generoFilter   = document.getElementById("generoFilter");

// Modal
const modal         = document.getElementById("modal");
const modalClose    = document.getElementById("modalClose");
const modalCover    = document.getElementById("modalCover");
const modalBadge    = document.getElementById("modalBadge");
const modalTitle    = document.getElementById("modalTitle");
const modalTags     = document.getElementById("modalTags");
const modalSinopsis = document.getElementById("modalSinopsis");
const modalSeasons  = document.getElementById("modalSeasons");
const modalBtns     = document.getElementById("modalBtns");

// ─────────────────────────────────────────────
//  4.  MOTOR DE BÚSQUEDA
// ─────────────────────────────────────────────
function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function search() {
  const q = normalize(filters.query.trim());

  return CATALOG.filter(item => {
    // 1. Por nombre
    if (q && !normalize(item.titulo).includes(q)) return false;

    // 2. Por tipo — soporta string o array
    if (filters.tipo) {
      const tipos = Array.isArray(item.tipo) ? item.tipo : [item.tipo];
      if (!tipos.map(t => normalize(t)).includes(normalize(filters.tipo))) return false;
    }

    // 3. Por género — comparación normalizada
    if (filters.genero) {
      const genNorm = normalize(filters.genero);
      const match   = item.generos.some(g => normalize(g) === genNorm);
      if (!match) return false;
    }

    // 4. Por rango de temporadas
    const maxVal = filters.temporadasMax >= 10 ? Infinity : filters.temporadasMax;
    if (item.temporadas < filters.temporadasMin) return false;
    if (item.temporadas > maxVal) return false;

    return true;
  });
}

// ─────────────────────────────────────────────
//  5.  RENDERIZADO
// ─────────────────────────────────────────────
function isImage(cover) {
  if (!cover) return false;
  return /\.(jpe?g|png|webp|gif|avif|svg)(\?.*)?$/i.test(cover)
      || cover.startsWith("http")
      || cover.startsWith("/")
      || cover.startsWith("./");
}

/** Devuelve el primer tipo del item como texto para el badge */
function getTipoPrincipal(item) {
  if (Array.isArray(item.tipo)) return item.tipo[0] ?? "";
  return item.tipo ?? "";
}

function buildCard(item, index) {
  const card = document.createElement("div");
  card.className = "card";
  card.style.animationDelay = `${index * 40}ms`;

  const coverHtml = isImage(item.cover)
    ? `<img class="card-cover-img" src="${item.cover}" alt="${item.titulo}" loading="lazy" />`
    : `<span>${item.cover || " "}</span>`;

  const genresHtml = item.generos
    .slice(0, 3)
    .map(g => `<span class="card-genre">${g}</span>`)
    .join("");

  const tipoBadge = getTipoPrincipal(item);

  card.innerHTML = `
    <div class="card-cover">
      ${coverHtml}
      <span class="card-type-badge"></span>
    </div>
    <div class="card-body">
      <div class="card-title">${item.titulo}</div>
      <div class="card-meta">${genresHtml}</div>
      <div class="card-seasons"> ${item.temporadas} temp.</div>
    </div>
  `;

  card.addEventListener("click", () => openModal(item));
  return card;
}

function showLoading() {
  resultsGrid.classList.add("hidden");
  emptyState.classList.add("hidden");
  resultCount.textContent = "Cargando catálogo...";
}

function render() {
  const results = search();

  resultCount.textContent = `${results.length} resultado${results.length !== 1 ? "s" : ""}`;
  resultsGrid.innerHTML   = "";

  if (results.length === 0) {
    emptyState.classList.remove("hidden");
    resultsGrid.classList.add("hidden");
  } else {
    emptyState.classList.add("hidden");
    resultsGrid.classList.remove("hidden");
    const fragment = document.createDocumentFragment();
    results.forEach((item, i) => fragment.appendChild(buildCard(item, i)));
    resultsGrid.appendChild(fragment);
  }
}

// ─────────────────────────────────────────────
//  6.  MODAL
// ─────────────────────────────────────────────

// Todos los formatos disponibles — agrega aquí si añades más
const FORMATOS = [
  { key: "urlAnime",    label: "Ver Anime",    clase: "modal-btn--anime",    icon: " "  },
  { key: "urlManga",    label: "Ver Manga",    clase: "modal-btn--manga",    icon: " " },
  { key: "urlManhwa",   label: "Ver Manhwa",   clase: "modal-btn--manhwa",   icon: " " },
  { key: "urlDonghua",  label: "Ver Donghua",  clase: "modal-btn--donghua",  icon: " " },
  { key: "urlPelicula", label: "Ver Película", clase: "modal-btn--pelicula", icon: " " },
  { key: "url",         label: "Ver",          clase: "modal-btn--ver",      icon: " "  },
];

function openModal(item) {
  // Portada
  modalCover.innerHTML = isImage(item.cover)
    ? `<img src="${item.cover}" alt="${item.titulo}" />`
    : item.cover || " ";

  // Badge — muestra todos los tipos si hay varios
  const tipos = Array.isArray(item.tipo) ? item.tipo : [item.tipo];
  modalBadge.textContent = tipos.join(" · ");

  // Título
  modalTitle.textContent = item.titulo;

  // Géneros
  modalTags.innerHTML = item.generos
    .map(g => `<span class="modal-tag">${g}</span>`)
    .join("");

  // Sinopsis
  modalSinopsis.textContent = item.sinopsis || "Sin sinopsis disponible.";

  // Temporadas
  const t = item.temporadas;
  modalSeasons.textContent = t > -1
    ? `  ${t} temporada${t !== 1 ? "s" : ""}`
    : "";

  // Botones dinámicos
  modalBtns.innerHTML = "";
  const tieneEspecificos = FORMATOS.slice(0, 5).some(f => item[f.key]);

  FORMATOS.forEach(({ key, label, clase, icon }) => {
    if (key === "url" && tieneEspecificos) return; // omitir fallback si hay específicos
    if (!item[key]) return;

    const a = document.createElement("a");
    a.className = `modal-btn ${clase}`;
    a.href      = item[key];
    a.target    = "_blank";
    a.rel       = "noopener";
    a.innerHTML = `${icon} ${label}`;
    modalBtns.appendChild(a);
  });

  // Sin URLs → "Próximamente"
  if (modalBtns.children.length === 0) {
    const span = document.createElement("span");
    span.className    = "modal-btn modal-btn--ver";
    span.style.opacity = "0.4";
    span.style.cursor  = "default";
    span.textContent   = "Próximamente";
    modalBtns.appendChild(span);
  }

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

// ─────────────────────────────────────────────
//  7.  EVENT LISTENERS — FILTROS
// ─────────────────────────────────────────────

// Búsqueda por texto (debounce 200ms)
let debounceTimer;
searchInput.addEventListener("input", () => {
  filters.query = searchInput.value;
  clearBtn.classList.toggle("visible", filters.query.length > 0);
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(render, 200);
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  filters.query     = "";
  clearBtn.classList.remove("visible");
  searchInput.focus();
  render();
});

// Filtro tipo
document.getElementById("tipoFilter").addEventListener("click", e => {
  const tag = e.target.closest(".tag");
  if (!tag) return;
  document.querySelectorAll("#tipoFilter .tag").forEach(t => t.classList.remove("active"));
  tag.classList.add("active");
  filters.tipo = tag.dataset.value;
  render();
});

// Filtro género
generoFilter.addEventListener("click", e => {
  const tag = e.target.closest(".tag");
  if (!tag) return;
  document.querySelectorAll("#generoFilter .tag").forEach(t => t.classList.remove("active"));
  tag.classList.add("active");
  filters.genero = tag.dataset.value;
  render();
});

// Sliders temporadas
temporadasMin.addEventListener("input", () => {
  let val = parseInt(temporadasMin.value);
  if (val > parseInt(temporadasMax.value)) {
    temporadasMax.value    = val;
    filters.temporadasMax  = val;
  }
  filters.temporadasMin    = val;
  temporadasMinV.textContent = val;
  updateMaxLabel();
  render();
});

temporadasMax.addEventListener("input", () => {
  let val = parseInt(temporadasMax.value);
  if (val < parseInt(temporadasMin.value)) {
    temporadasMin.value      = val;
    filters.temporadasMin    = val;
    temporadasMinV.textContent = val;
  }
  filters.temporadasMax = val;
  updateMaxLabel();
  render();
});

function updateMaxLabel() {
  const val = parseInt(temporadasMax.value);
  temporadasMaxV.textContent = val >= 10 ? "10+" : val;
}

// Reset
resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  filters.query     = "";
  clearBtn.classList.remove("visible");

  filters.tipo   = "";
  filters.genero = "";
  document.querySelectorAll("#tipoFilter .tag").forEach((t, i) =>
    t.classList.toggle("active", i === 0));
  document.querySelectorAll("#generoFilter .tag").forEach((t, i) =>
    t.classList.toggle("active", i === 0));

  generoFilter.classList.remove("genres-expanded");
  generoFilter.classList.add("genres-collapsed");
  genresToggle.textContent = "Ver todos ▾";

  temporadasMin.value      = 1;
  temporadasMax.value      = 10;
  filters.temporadasMin    = 1;
  filters.temporadasMax    = 10;
  temporadasMinV.textContent = "1";
  temporadasMaxV.textContent = "10+";

  render();
});

// ─────────────────────────────────────────────
//  8.  TOGGLE GÉNEROS
// ─────────────────────────────────────────────
genresToggle.addEventListener("click", () => {
  const expanded = generoFilter.classList.toggle("genres-expanded");
  generoFilter.classList.toggle("genres-collapsed", !expanded);
  genresToggle.textContent = expanded ? "Ver menos ▴" : "Ver todos ▾";
});

// ─────────────────────────────────────────────
//  9.  INICIALIZACIÓN (async — carga Sheets)
// ─────────────────────────────────────────────
async function init() {
  showLoading();
  CATALOG = await loadCatalog(); // carga desde Sheets o fallback local
  render();
}

init();

// ─────────────────────────────────────────────
//  10. API PÚBLICA
// ─────────────────────────────────────────────
window.SearchEngine = {
  /** Recarga el catálogo desde Sheets manualmente */
  async reload() {
    showLoading();
    CATALOG = await loadCatalog();
    render();
  },
  /** Reemplaza el catálogo en memoria */
  loadCatalog(data) {
    CATALOG = data;
    render();
  },
  /** Agrega entradas sin borrar las existentes */
  appendCatalog(data) {
    CATALOG = [...CATALOG, ...data];
    render();
  },
  /** Devuelve los resultados actuales */
  getResults() {
    return search();
  },
};
