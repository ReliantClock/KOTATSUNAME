/**
 * ============================================================
 *  escritos_data.js — Conexión con el Sheet de Historias
 * ============================================================
 *  Columnas esperadas en el Sheet:
 *  id | titulo | autor | estado | generos | capitulos | cover | sinopsis
 *  | volumen-1 | volumen-2 | volumen-3 | volumen-4 | volumen-5
 *
 *  Cada celda de volumen contiene links separados por coma:
 *  https://link-cap1.com, https://link-cap2.com, ...
 *
 *  Cambia SHEET_PUBHTML por la URL de tu Sheet de escritos.
 * ============================================================
 */

const SHEET_PUBHTML = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR5dM8y0r6LSGZpI3E1wKgl3GFD0c_14lzeAuMEgNZgNdAMZjXcTeyvcDvjHFMx-MsggDUVEi9Vv4yr/pubhtml";
const SHEET_ID = SHEET_PUBHTML.match(/\/d\/e\/([^/]+)/)?.[1] ?? "";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/e/${SHEET_ID}/pub?output=csv`;

// ─────────────────────────────────────────────
//  Convierte link de Drive a URL de imagen directa
// ─────────────────────────────────────────────
function fixCoverUrl(cover) {
  if (!cover) return "";
  const driveMatch = cover.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch) {
    const id = driveMatch[1];
    const direct = `https://drive.google.com/uc?export=view&id=${id}`;
    return `https://wsrv.nl/?url=${encodeURIComponent(direct)}&w=400&output=webp`;
  }
  return cover;
}

// ─────────────────────────────────────────────
//  Convierte link de Google Doc a URL de texto plano
//  Acepta: link completo del Doc, o solo el ID
// ─────────────────────────────────────────────
export function docLinkToTextUrl(link) {
  if (!link || !link.trim()) return null;
  link = link.trim();
  
  // Extraer ID si es un link completo
  const match = link.match(/\/document\/d\/([a-zA-Z0-9_-]+)/);
  const id = match ? match[1] : link; // si no hay match, asumimos que ya es el ID
  
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
    row[h.trim().toLowerCase().replace(/\s+/g, "-")] = (values[i] ?? "").trim();
  });
  
  const splitList = val =>
    val ? val.split(",").map(s => s.trim()).filter(Boolean) : [];
  
  // ── Procesar volúmenes ──────────────────────
  // Cada volumen es una celda con links separados por coma.
  // Los links se convierten a URLs de exportación de texto.
  const volumenes = [];
  for (let v = 1; v <= 5; v++) {
    const key = `volumen-${v}`;
    const raw = row[key] || "";
    const links = splitList(raw);
    
    if (links.length > 0) {
      volumenes.push({
        numero: v,
        capitulos: links.map((link, idx) => ({
          numero: idx + 1, // número local dentro del volumen
          urlTexto: docLinkToTextUrl(link) // URL exportada de Google Docs
        }))
      });
    }
  }
  
  // ── Número total de capítulos ───────────────
  // Usa el valor del Sheet si existe, sino cuenta los links
  const totalLinks = volumenes.reduce((acc, vol) => acc + vol.capitulos.length, 0);
  const capCount = Number(row.capitulos) || totalLinks || 0;
  
  return {
    id: Number(row.id) || 0,
    titulo: row.titulo || "Sin título",
    autor: row.autor || "Anónimo",
    estado: row.estado || "en emisión",
    generos: splitList(row.generos),
    capitulos: capCount,
    cover: fixCoverUrl(row.cover || ""),
    sinopsis: row.sinopsis || "Sin sinopsis.",
    volumenes, // array de volúmenes con sus capítulos
  };
}

// ─────────────────────────────────────────────
//  Carga el catálogo desde Google Sheets
// ─────────────────────────────────────────────
export async function loadEscritos() {
  try {
    const res = await fetch(SHEET_URL);
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