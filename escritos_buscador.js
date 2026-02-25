/**
 * ============================================================
 * escritos_buscador.js — Lógica de Biblioteca y Lector Pro
 * ============================================================
 */
import { loadEscritos } from "./escritos_data.js";

let ESCRITOS = [];
const filters = { query: "", genero: "", autor: "", capsMin: 1, capsMax: 50 };
let fontSize = 1.2; // Tamaño de fuente inicial

// --- REFERENCIAS DOM ---
const grid = document.getElementById("resultsGrid");
const count = document.getElementById("resultCount");
const modal = document.getElementById("modal");
const readerView = document.getElementById("readerView");
const textViewer = document.getElementById("textViewer");
const viewerBody = document.getElementById("viewerBody");

async function init() {
    ESCRITOS = await loadEscritos();
    setupEventListeners();
    render();
}

// --- RENDERIZADO DE LA BIBLIOTECA ---
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
    count.textContent = `${filtered.length} historias encontradas`;
    
    filtered.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div class="card-cover"><img src="${item.cover}" loading="lazy"></div>
            <div class="card-body">
                <div class="card-title">${item.titulo}</div>
                <div class="card-meta">Por: ${item.autor}</div>
                <div class="card-seasons">${item.capitulos} Caps.</div>
            </div>
        `;
        card.onclick = () => openModal(item);
        grid.appendChild(card);
    });
}

// --- MODAL DE INFORMACIÓN (FICHA TÉCNICA) ---
function openModal(item) {
    document.getElementById("modalTitle").textContent = item.titulo;
    document.getElementById("modalCover").innerHTML = `<img src="${item.cover}">`;
    document.getElementById("modalSinopsis").textContent = item.sinopsis;
    document.getElementById("modalBadge").textContent = `Autor: ${item.autor}`;
    document.getElementById("modalSeasons").textContent = `${item.capitulos} Capítulos`;
    
    const btns = document.getElementById("modalBtns");
    btns.innerHTML = item.urlTexto ?
        `<button class="modal-btn modal-btn--ver" id="btnIrALector">Ver Capítulos</button>` :
        `<span class="modal-btn" style="opacity:0.5">Sin contenido</span>`;
    
    const btnReader = document.getElementById("btnIrALector");
    if(btnReader) {
        btnReader.onclick = () => abrirMenuCapitulos(item);
    }
    
    modal.classList.add("open");
}

// --- VISTA DE CAPÍTULOS (ESTILO MENÚ) ---
function abrirMenuCapitulos(item) {
    modal.classList.remove("open");
    readerView.classList.remove("hidden");

    document.getElementById("readerTitle").textContent = item.titulo;
    document.getElementById("readerAuthor").textContent = `Escrito por: ${item.autor}`;
    document.getElementById("readerCover").innerHTML = `<img src="${item.cover}">`;
    document.getElementById("readerSinopsis").textContent = item.sinopsis;

    const list = document.getElementById("chapterList");
    list.innerHTML = "";
    
    for(let i = 1; i <= item.capitulos; i++) {
        const div = document.createElement("div");
        div.className = "chapter-item";
        div.innerHTML = `<span>Capítulo ${i}</span> <small>Leer ahora ➜</small>`;
        div.onclick = () => cargarVisorDeLectura(item.urlTexto, i);
        list.appendChild(div);
    }
}

// --- VISOR DE LECTURA (EXTRACCIÓN DE GOOGLE DOCS) ---
async function cargarVisorDeLectura(url, numCap) {
    try {
        // Mostrar estado de carga y resetear vista
        viewerBody.innerHTML = "<p style='text-align:center; color:var(--accent); opacity:0.5; margin-top:50px;'>Desenrollando el pergamino...</p>";
        textViewer.classList.remove("hidden");
        document.getElementById("viewerTitle").textContent = `Capítulo ${numCap}`;

        // Obtener texto del Google Doc
        const response = await fetch(url);
        if (!response.ok) throw new Error();
        const texto = await response.text();
        
        // Insertar texto
        viewerBody.textContent = texto; 
        
        // RESET DE SCROLL: Asegura que el lector empiece desde arriba (oculta el botón de índice abajo)
        textViewer.scrollTo({ top: 0, behavior: 'instant' });

    } catch (e) {
        alert("Error al conectar con el servidor de lectura. Verifica los permisos del documento.");
        textViewer.classList.add("hidden");
    }
}

// --- CONFIGURACIÓN DE EVENTOS ---
function setupEventListeners() {
    // Buscador
    document.getElementById("searchInput").oninput = (e) => { 
        filters.query = e.target.value;
        render(); 
    };
    
    // Filtros de Género
    document.getElementById("generoFilter").onclick = (e) => {
        if (e.target.classList.contains("tag")) {
            document.querySelectorAll("#generoFilter .tag").forEach(t => t.classList.remove("active"));
            e.target.classList.add("active");
            filters.genero = e.target.dataset.value;
            render();
        }
    };
    
    // Sliders de Capítulos
    const cMin = document.getElementById("capsMin");
    const cMax = document.getElementById("capsMax");
    
    cMin.oninput = () => {
        filters.capsMin = parseInt(cMin.value);
        document.getElementById("capsMinVal").textContent = cMin.value;
        render();
    };
    cMax.oninput = () => {
        filters.capsMax = parseInt(cMax.value);
        document.getElementById("capsMaxVal").textContent = cMax.value >= 50 ? "50+" : cMax.value;
        render();
    };
    
    // Zoom de lectura
    document.getElementById("increaseFont").onclick = () => {
        fontSize += 0.1;
        viewerBody.style.fontSize = `${fontSize}rem`;
    };
    document.getElementById("decreaseFont").onclick = () => {
        if(fontSize > 0.8) {
            fontSize -= 0.1;
            viewerBody.style.fontSize = `${fontSize}rem`;
        }
    };

    // Cerrar componentes
    document.getElementById("modalClose").onclick = () => modal.classList.remove("open");
    document.getElementById("closeReader").onclick = () => readerView.classList.add("hidden");
    document.getElementById("closeViewer").onclick = () => textViewer.classList.add("hidden");
    document.getElementById("backToChapters").onclick = () => textViewer.classList.add("hidden");
    
    // Reset general
    document.getElementById("resetFilters").onclick = () => location.reload();
}

init();