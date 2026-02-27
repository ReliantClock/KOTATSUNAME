/**
 * ============================================================
 *  escritos_data.js — Base de datos pública de escritos
 * ============================================================
 *  Columnas del Sheet (fila 1 = encabezados):
 *
 *  id | id_autor | titulo | autor | estado | generos |
 *  capitulos | cover | sinopsis | aprobacion |
 *  cap1 | cap2 | ... | cap50
 *
 *  Cada celda capN: "nombre del capítulo|link del doc"
 * ============================================================
 */

const SHEET_PUBHTML = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQD34_S_uH0KrS_VR1QvtBCfK-zxnTDQjsjyOTFLP9gVS7HHBkmXw7nF1U5dIRKLKHPTWA-ZwC6dXZ4/pubhtml";
const SHEET_ID = SHEET_PUBHTML.match(/\/d\/e\/([^/]+)/)?.[1] ?? "";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/e/${SHEET_ID}/pub?output=csv`;

export const MAX_CAPS = 50;

// ─────────────────────────────────────────────
//  Normaliza un header del Sheet a clave limpia
//  "Id Autor" → "id_autor"
//  "id_autor" → "id_autor"
//  "ID AUTOR" → "id_autor"
// ─────────────────────────────────────────────
function normalizeHeader(h) {
  return h
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_") // espacios → guión bajo
    .replace(/[^a-z0-9_]/g, ""); // quitar cualquier otro caracter raro
}

// ─────────────────────────────────────────────
//  Drive → URL de imagen visible
// ─────────────────────────────────────────────
export function fixCoverUrl(cover) {
  if (!cover) return "";
  // Si es solo un ID (sin http)
  if (!cover.startsWith("http")) {
    const direct = `https://drive.google.com/uc?export=view&id=${cover}`;
    return `https://wsrv.nl/?url=${encodeURIComponent(direct)}&w=400&output=webp`;
  }
  // Si es link completo de Drive
  const m = cover.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (m) {
    const direct = `https://drive.google.com/uc?export=view&id=${m[1]}`;
    return `https://wsrv.nl/?url=${encodeURIComponent(direct)}&w=400&output=webp`;
  }
  return cover;
}

// ─────────────────────────────────────────────
//  Google Doc link → URL de texto exportable
// ─────────────────────────────────────────────
export function docLinkToTextUrl(link) {
  if (!link || !link.trim()) return null;
  link = link.trim();
  const m = link.match(/\/document\/d\/([a-zA-Z0-9_-]+)/);
  const id = m ? m[1] : link;
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
  // Construir mapa con headers normalizados
  const row = {};
  headers.forEach((h, i) => {
    const key = normalizeHeader(h);
    row[key] = (values[i] ?? "").trim();
  });
  
  const splitList = val =>
    val ? val.split(",").map(s => s.trim()).filter(Boolean) : [];
  
  // ── Capítulos cap1..cap50 ──
  const capitulos = [];
  for (let i = 1; i <= MAX_CAPS; i++) {
    const raw = row[`cap${i}`] || "";
    if (!raw) continue;
    
    const pipeIdx = raw.indexOf("|");
    const nombre = pipeIdx >= 0 ? raw.slice(0, pipeIdx).trim() : `Capítulo ${i}`;
    const link = pipeIdx >= 0 ? raw.slice(pipeIdx + 1).trim() : raw.trim();
    
    capitulos.push({
      numero: i,
      nombre,
      urlTexto: docLinkToTextUrl(link),
      rawLink: link,
    });
  }
  
  const capCount = Number(row.capitulos) || capitulos.length || 0;
  
  // id_autor: el header normalizado siempre será "id_autor"
  // lo guardamos como string para comparaciones seguras en el panel
  const idAutorRaw = row["id_autor"] || "";
  
  return {
    id: Number(row.id) || 0,
    id_autor: String(idAutorRaw), // siempre string — clave para filtrar en panel_autor
    titulo: row.titulo || "Sin título",
    autor: row.autor || "Anónimo",
    estado: row.estado || "en emisión",
    generos: splitList(row.generos),
    capitulos: capCount,
    cover: fixCoverUrl(row.cover || ""),
    raw_cover: row.cover || "",
    sinopsis: row.sinopsis || "Sin sinopsis.",
    aprobacion: row.aprobacion || "pendiente",
    caps: capitulos,
  };
}

// ─────────────────────────────────────────────
//  Carga desde Google Sheets
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