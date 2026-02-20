/**
 * ============================================================
 *  BUSCADOR DE SERIES - buscador.js
 * ============================================================
 *  Filtros soportados:
 *   - Nombre (texto libre)
 *   - Tipo: manga / manhwa / donghua
 *   - Géneros: accion, romance, fantasia, terror, comedia,
 *              sci-fi, drama, sobrenatural
 *   - Temporadas (rango mín–máx)
 *
 *  El catálogo vive en catalogo.js — edítalo sin tocar este archivo.
 * ============================================================
 */

// ─────────────────────────────────────────────
//  1.  CATÁLOGO  (importado desde catalogo.js)
// ─────────────────────────────────────────────
import { CATALOG } from "./catalogo.js";

// ─────────────────────────────────────────────
//  2.  ESTADO DE FILTROS
// ─────────────────────────────────────────────
const filters = {
  query: "",
  tipo: "",
  genero: "",
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

// Modal
const modal        = document.getElementById("modal");
const modalClose   = document.getElementById("modalClose");
const modalCover   = document.getElementById("modalCover");
const modalBadge   = document.getElementById("modalBadge");
const modalTitle   = document.getElementById("modalTitle");
const modalTags    = document.getElementById("modalTags");
const modalSinopsis= document.getElementById("modalSinopsis");
const modalSeasons = document.getElementById("modalSeasons");
const modalBtns    = document.getElementById("modalBtns");

// ─────────────────────────────────────────────
//  4.  MOTOR DE BÚSQUEDA
// ─────────────────────────────────────────────

/**
 * Normaliza texto: minúsculas + sin tildes.
 */
function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Aplica todos los filtros al catálogo y devuelve los resultados.
 */
function search() {
  const q = normalize(filters.query.trim());

  return CATALOG.filter(item => {
    // 1. Filtro por nombre
    if (q && !normalize(item.titulo).includes(q)) return false;

// DESPUÉS
if (filters.tipo) {
  const tipos = Array.isArray(item.tipo) ? item.tipo : [item.tipo];
  if (!tipos.includes(filters.tipo)) return false;
}

    // 3. Filtro por género (el ítem debe incluir ese género)
    if (filters.genero && !item.generos.includes(filters.genero)) return false;

    // 4. Filtro por rango de temporadas
    const maxVal = filters.temporadasMax === 10 ? Infinity : filters.temporadasMax;
    if (item.temporadas < filters.temporadasMin) return false;
    if (item.temporadas > maxVal) return false;

    return true;
  });
}

// ─────────────────────────────────────────────
//  5.  RENDERIZADO
// ─────────────────────────────────────────────

/**
 * Devuelve true si el valor de cover es una imagen
 * (URL externa o ruta local con extensión de imagen).
 */
function isImage(cover) {
  if (!cover) return false;
  return /\.(jpe?g|png|webp|gif|avif|svg)(\?.*)?$/i.test(cover)
      || cover.startsWith("http")
      || cover.startsWith("/")
      || cover.startsWith("./");
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

  card.innerHTML = `
    <div class="card-cover">
      ${coverHtml}
      <span class="card-type-badge">${item.tipo}</span>
    </div>
    <div class="card-body">
      <div class="card-title">${item.titulo}</div>
      <div class="card-meta">${genresHtml}</div>
      <div class="card-seasons">  ${item.temporadas} temp${item.temporadas !== 1 ? "." : "."}</div>
    </div>
  `;

  card.addEventListener("click", () => openModal(item));
  return card;
}

function render() {
  const results = search();

  // Actualizar contador
  resultCount.textContent = `${results.length} resultado${results.length !== 1 ? "s" : ""}`;

  // Limpiar grid
  resultsGrid.innerHTML = "";

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

function openModal(item) {
  // Portada
  modalCover.innerHTML = isImage(item.cover)
    ? `<img src="${item.cover}" alt="${item.titulo}" />`
    : item.cover || " ";

  // Badge tipo
  modalBadge.textContent = item.tipo;

  // Título
  modalTitle.textContent = item.titulo;

  // Tags géneros
  modalTags.innerHTML = item.generos
    .map(g => `<span class="modal-tag">${g}</span>`)
    .join("");

  // Sinopsis
  modalSinopsis.textContent = item.sinopsis || "Sin sinopsis disponible.";

  // Temporadas
  const t = item.temporadas;
  modalSeasons.textContent = `  ${t} temporada${t !== 1 ? "s" : ""}`;

  // ── Botones dinámicos por formato disponible ──────────────
  // Mapa: clave del objeto → etiqueta visible + clase CSS + emoji
  const FORMATOS = [
    { key: "urlAnime",   label: "Ver Anime",   clase: "modal-btn--anime",   icon: " " },
    { key: "urlManga",   label: "Ver Manga",   clase: "modal-btn--manga",   icon: " " },
    { key: "urlManhwa",  label: "Ver Manhwa",  clase: "modal-btn--manhwa",  icon: " " },
    { key: "urlDonghua", label: "Ver Donghua", clase: "modal-btn--donghua", icon: " " },
    // fallback: si el título solo tiene un "url" genérico
    { key: "url",        label: "Ver",         clase: "modal-btn--ver",     icon: " "  },
  ];

  modalBtns.innerHTML = "";

  // Comprueba si hay alguna URL específica de formato
  const tieneEspecificos = FORMATOS.slice(0, 4).some(f => item[f.key]);

  FORMATOS.forEach(({ key, label, clase, icon }) => {
    // Si hay URLs específicas, omite el fallback "url" genérico
    if (key === "url" && tieneEspecificos) return;
    if (!item[key]) return;

    const a = document.createElement("a");
    a.className = `modal-btn ${clase}`;
    a.href      = item[key];
    a.target    = "_blank";
    a.rel       = "noopener";
    a.innerHTML = `${icon} ${label}`;
    modalBtns.appendChild(a);
  });

  // Si no hay ninguna URL definida, muestra botón deshabilitado
  if (modalBtns.children.length === 0) {
    const span = document.createElement("span");
    span.className = "modal-btn modal-btn--ver";
    span.style.opacity = "0.4";
    span.style.cursor  = "default";
    span.textContent   = "Próximamente";
    modalBtns.appendChild(span);
  }

  // Abrir
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

// Cerrar con el botón ✕
modalClose.addEventListener("click", closeModal);

// Cerrar al tocar el backdrop (fuera de la caja)
modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

// Cerrar con Escape
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

// ─────────────────────────────────────────────
//  7.  EVENT LISTENERS
// ─────────────────────────────────────────────

// Búsqueda por texto (debounce 200ms)
let debounceTimer;
searchInput.addEventListener("input", () => {
  filters.query = searchInput.value;
  clearBtn.classList.toggle("visible", filters.query.length > 0);
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(render, 200);
});

// Limpiar input
clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  filters.query = "";
  clearBtn.classList.remove("visible");
  searchInput.focus();
  render();
});

// Tags de tipo
document.getElementById("tipoFilter").addEventListener("click", e => {
  const tag = e.target.closest(".tag");
  if (!tag) return;
  document.querySelectorAll("#tipoFilter .tag").forEach(t => t.classList.remove("active"));
  tag.classList.add("active");
  filters.tipo = tag.dataset.value;
  render();
});

// Tags de género
document.getElementById("generoFilter").addEventListener("click", e => {
  const tag = e.target.closest(".tag");
  if (!tag) return;
  document.querySelectorAll("#generoFilter .tag").forEach(t => t.classList.remove("active"));
  tag.classList.add("active");
  filters.genero = tag.dataset.value;
  render();
});

// Slider temporadas mínimo
temporadasMin.addEventListener("input", () => {
  let val = parseInt(temporadasMin.value);
  if (val > parseInt(temporadasMax.value)) {
    temporadasMax.value = val;
    filters.temporadasMax = val;
  }
  filters.temporadasMin = val;
  temporadasMinV.textContent = val;
  updateMaxLabel();
  render();
});

// Slider temporadas máximo
temporadasMax.addEventListener("input", () => {
  let val = parseInt(temporadasMax.value);
  if (val < parseInt(temporadasMin.value)) {
    temporadasMin.value = val;
    filters.temporadasMin = val;
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

// Reset de filtros
resetBtn.addEventListener("click", () => {
  // Texto
  searchInput.value = "";
  filters.query = "";
  clearBtn.classList.remove("visible");

  // Tags tipo
  filters.tipo = "";
  document.querySelectorAll("#tipoFilter .tag").forEach((t, i) => {
    t.classList.toggle("active", i === 0);
  });

  // Tags género
  filters.genero = "";
  document.querySelectorAll("#generoFilter .tag").forEach((t, i) => {
    t.classList.toggle("active", i === 0);
  });
  // Colapsar géneros al resetear
  generoFilter.classList.remove("genres-expanded");
  generoFilter.classList.add("genres-collapsed");
  genresToggle.textContent = "Ver todos ▾";

  // Sliders
  temporadasMin.value = 1;
  temporadasMax.value = 10;
  filters.temporadasMin = 1;
  filters.temporadasMax = 10;
  temporadasMinV.textContent = "1";
  temporadasMaxV.textContent = "10+";

  render();
});

// ─────────────────────────────────────────────
//  8.  TOGGLE DE GÉNEROS
// ─────────────────────────────────────────────
const genresToggle = document.getElementById("genresToggle");
const generoFilter = document.getElementById("generoFilter");

genresToggle.addEventListener("click", () => {
  const expanded = generoFilter.classList.toggle("genres-expanded");
  generoFilter.classList.toggle("genres-collapsed", !expanded);
  genresToggle.textContent = expanded ? "Ver menos ▴" : "Ver todos ▾";
});

// ─────────────────────────────────────────────
//  9.  INICIALIZACIÓN
// ─────────────────────────────────────────────
render();

// ─────────────────────────────────────────────
//  10. API PÚBLICA
//      Usa esto para integrar con tu back-end.
//      Ejemplo: SearchEngine.loadCatalog(misAnimes)
// ─────────────────────────────────────────────
window.SearchEngine = {
  /**
   * Reemplaza el catálogo en memoria y vuelve a renderizar.
   * @param {Array} data  Array de objetos con la misma forma que CATALOG
   */
  loadCatalog(data) {
    CATALOG.length = 0;
    CATALOG.push(...data);
    render();
  },

  /**
   * Agrega entradas al catálogo sin reemplazarlo.
   * @param {Array} data
   */
  appendCatalog(data) {
    CATALOG.push(...data);
    render();
  },

  /** Devuelve los resultados actuales (por si necesitas procesarlos fuera). */
  getResults() {
    return search();
  },
};
