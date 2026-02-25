/**
 * ============================================================
 *  escritos_buscador.js — Lógica de la Biblioteca
 * ============================================================
 */
import { loadEscritos } from "./escritos_data.js";

let ESCRITOS = [];
const filters = { query: "", genero: "", capsMin: 1, capsMax: 50 };

const grid  = document.getElementById("resultsGrid");
const count = document.getElementById("resultCount");
const modal = document.getElementById("modal");

// ─────────────────────────────────────────────
//  INICIALIZACIÓN
// ─────────────────────────────────────────────
async function init() {
  count.textContent = "Cargando biblioteca...";
  ESCRITOS = await loadEscritos();
  setupEventListeners();
  render();
}

// ─────────────────────────────────────────────
//  RENDER — cards de la biblioteca
// ─────────────────────────────────────────────
function render() {
  const filtered = ESCRITOS.filter(item => {
    const q = filters.query.toLowerCase();
    if (q && !item.titulo.toLowerCase().includes(q) && !item.autor.toLowerCase().includes(q)) return false;
    if (filters.genero && !item.generos.map(g => g.toLowerCase()).includes(filters.genero.toLowerCase())) return false;
    if (item.capitulos < filters.capsMin) return false;
    const maxLimit = filters.capsMax >= 50 ? Infinity : filters.capsMax;
    if (item.capitulos > maxLimit) return false;
    return true;
  });

  grid.innerHTML = "";
  count.textContent = `${filtered.length} historia${filtered.length !== 1 ? "s" : ""} encontrada${filtered.length !== 1 ? "s" : ""}`;
  document.getElementById("emptyState").classList.toggle("hidden", filtered.length > 0);

  filtered.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.animationDelay = `${i * 40}ms`;

    const genresHtml = item.generos.slice(0, 3)
      .map(g => `<span class="card-genre">${g}</span>`).join("");

    card.innerHTML = `
      <div class="card-cover">
        ${item.cover
          ? `<img class="card-cover-img" src="${item.cover}" alt="${item.titulo}" loading="lazy" />`
          : `<span></span>`}
        <span class="card-type-badge"></span>
      </div>
      <div class="card-body">
        <div class="card-title">${item.titulo}</div>
        <div class="card-meta">${genresHtml}</div>
        <div class="card-seasons"> ${item.capitulos} cap${item.capitulos !== 1 ? "s" : ""}.</div>
      </div>
    `;
    card.addEventListener("click", () => openModal(item));
    grid.appendChild(card);
  });
}

// ─────────────────────────────────────────────
//  MODAL — ficha del escrito
// ─────────────────────────────────────────────
function openModal(item) {
  document.getElementById("modalTitle").textContent   = item.titulo;
  document.getElementById("modalBadge").textContent   = `Autor: ${item.autor}`;
  document.getElementById("modalSinopsis").textContent = item.sinopsis;
  document.getElementById("modalCover").innerHTML     = item.cover
    ? `<img src="${item.cover}" alt="${item.titulo}" />`
    : "";

  // Tags de géneros
  document.getElementById("modalTags").innerHTML = item.generos
    .map(g => `<span class="modal-tag">${g}</span>`).join("");

  // Info de capítulos y estado
  document.getElementById("modalSeasons").textContent =
    ` ${item.capitulos} capítulos`;

  // Botón — siempre lleva a escritos_capitulos.html
  const btns = document.getElementById("modalBtns");
  btns.innerHTML = `<a href="escritos_capitulos.html?id=${item.id}" class="modal-btn modal-btn--manga">Ver Capítulos</a>`;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

// ─────────────────────────────────────────────
//  EVENT LISTENERS
// ─────────────────────────────────────────────
function setupEventListeners() {
  // Búsqueda
  document.getElementById("searchInput").addEventListener("input", e => {
    filters.query = e.target.value;
    render();
  });

  // Clear
  document.getElementById("clearBtn").addEventListener("click", () => {
    document.getElementById("searchInput").value = "";
    filters.query = "";
    render();
  });

  // Géneros
  document.getElementById("generoFilter").addEventListener("click", e => {
    const tag = e.target.closest(".tag");
    if (!tag) return;
    document.querySelectorAll("#generoFilter .tag").forEach(t => t.classList.remove("active"));
    tag.classList.add("active");
    filters.genero = tag.dataset.value;
    render();
  });

  // Sliders capítulos
  const cMin = document.getElementById("capsMin");
  const cMax = document.getElementById("capsMax");

  cMin.addEventListener("input", () => {
    filters.capsMin = parseInt(cMin.value);
    document.getElementById("capsMinVal").textContent = cMin.value;
    render();
  });
  cMax.addEventListener("input", () => {
    filters.capsMax = parseInt(cMax.value);
    document.getElementById("capsMaxVal").textContent = parseInt(cMax.value) >= 50 ? "50+" : cMax.value;
    render();
  });

  // Cerrar modal
  document.getElementById("modalClose").addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  // Reset
  document.getElementById("resetFilters").addEventListener("click", () => {
    document.getElementById("searchInput").value = "";
    filters.query  = "";
    filters.genero = "";
    filters.capsMin = 1;
    filters.capsMax = 50;
    cMin.value = 1;
    cMax.value = 50;
    document.getElementById("capsMinVal").textContent = "1";
    document.getElementById("capsMaxVal").textContent = "50+";
    document.querySelectorAll("#generoFilter .tag").forEach((t, i) =>
      t.classList.toggle("active", i === 0));
    render();
  });
}

init();
