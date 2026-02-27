/**
 * ============================================================
 *  escritos_data.js — Base de datos pública de escritos
 * ============================================================
 *  Columnas del Sheet (fila 1 = encabezados):
 *
 *  id | id_autor | titulo | autor | estado | generos |
 *  capitulos | cover | sinopsis | aprobacion |
 *  cap1 | cap2 | cap3 | ... | cap50
 *
 *  Cada celda capN tiene el formato:  nombre del capítulo|link del doc
 *  Ejemplo:  El inicio|https://docs.google.com/document/d/ABC123/edit
 *
 *  La columna "capitulos" puede ser una fórmula que cuente
 *  cuántas celdas capN están llenas — no la tocamos.
 * ============================================================
 */

const SHEET_PUBHTML = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQD34_S_uH0KrS_VR1QvtBCfK-zxnTDQjsjyOTFLP9gVS7HHBkmXw7nF1U5dIRKLKHPTWA-ZwC6dXZ4/pubhtml";
const SHEET_ID = SHEET_PUBHTML.match(/\/d\/e\/([^/]+)/)?.[1] ?? "";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/e/${SHEET_ID}/pub?output=csv`;

export const MAX_CAPS = 50;

// ─────────────────────────────────────────────
//  Convierte link de Drive → URL de imagen visible
// ─────────────────────────────────────────────
export function fixCoverUrl(cover) {
  if (!cover) return "";
  const m = cover.match(/[-\w]{25,}/);
  if (!m) return cover;
  // Si parece un ID de Drive (sin http)
  if (!cover.startsWith("http")) {
    const direct = `https://drive.google.com/uc?export=view&id=${m[0]}`;
    return `https://wsrv.nl/?url=${encodeURIComponent(direct)}&w=400&output=webp`;
  }
  // Si es un link completo de Drive
  const driveMatch = cover.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch) {
    const direct = `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;
    return `https://wsrv.nl/?url=${encodeURIComponent(direct)}&w=400&output=webp`;
  }
  return cover;
}

// ─────────────────────────────────────────────
//  Convierte link de Google Doc → URL de texto plano exportable
// ─────────────────────────────────────────────
export function docLinkToTextUrl(link) {
  if (!link || !link.trim()) return null;
  link = link.trim();
  const match = link.match(/\/document\/d\/([a-zA-Z0-9_-]+)/);
  const id = match ? match[1] : link;
  if (!id) return null;
  return `https://docs.google.com/document/d/${id}/export?format=txt`;
}

// ─────────────────────────────────────────────
//  Parser CSV — respeta comas dentro de "..."
// ─────────────────────────────────────────────
function parseCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"';
        i++; }
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
//  Convierte fila CSV → objeto de escrito
// ─────────────────────────────────────────────
function parseRow(headers, values) {
  const row = {};
  headers.forEach((h, i) => {
    row[h.trim().toLowerCase().replace(/\s+/g, "")] = (values[i] ?? "").trim();
  });
  
  const splitList = val =>
    val ? val.split(",").map(s => s.trim()).filter(Boolean) : [];
  
  // ── Procesar capítulos cap1..cap50 ──────────
  // Cada celda: "Nombre del capítulo|https://link-del-doc"
  // Si no hay pipe, se trata todo como link sin nombre
  const capitulos = [];
  for (let i = 1; i <= MAX_CAPS; i++) {
    const raw = row[`cap${i}`] || "";
    if (!raw) continue;
    
    const pipeIdx = raw.indexOf("|");
    const nombre = pipeIdx >= 0 ? raw.slice(0, pipeIdx).trim() : `Capítulo ${i}`;
    const link = pipeIdx >= 0 ? raw.slice(pipeIdx + 1).trim() : raw.trim();
    
    capitulos.push({
      numero: i, // número real de la columna (cap1=1, cap5=5, etc.)
      nombre,
      urlTexto: docLinkToTextUrl(link),
      rawLink: link, // guardamos el link original para el panel de autor
    });
  }
  
  const capCount = Number(row.capitulos) || capitulos.length || 0;
  
  return {
    id: Number(row.id) || 0,
    id_autor: row.idautor || row.id_autor || "",
    titulo: row.titulo || "Sin título",
    autor: row.autor || "Anónimo",
    estado: row.estado || "en emisión",
    generos: splitList(row.generos),
    capitulos: capCount,
    cover: fixCoverUrl(row.cover || ""),
    raw_cover: row.cover || "", // para el editor
    sinopsis: row.sinopsis || "Sin sinopsis.",
    aprobacion: row.aprobacion || "pendiente",
    caps: capitulos, // array de capítulos [{numero, nombre, urlTexto, rawLink}]
  };
}

// ─────────────────────────────────────────────
//  Carga pública desde Google Sheets
// ─────────────────────────────────────────────
export async function loadEscritos() {
  try {
    const url = `${SHEET_URL}&_t=${Date.now()}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    
    const text = await res.text();
    const lines = text.trim().split("\n").filter(l => l.trim());
    if (lines.length < 2) throw new Error("Sheet vacío");
    
    const headers = parseCSVLine(lines[0]);
    return lines
      .slice(1)
      .map(line => parseRow(headers, parseCSVLine(line)))
      .filter(item => item.id > 0);
    
  } catch (err) {
    console.error("Error cargando escritos:", err.message);
    return [];
  }
}