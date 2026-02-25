/**
 * ============================================================
 * escritos_data.js — Conexión con el Sheet de Historias
 * ============================================================
 */

const SHEET_PUBHTML = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR5dM8y0r6LSGZpI3E1wKgl3GFD0c_14lzeAuMEgNZgNdAMZjXcTeyvcDvjHFMx-MsggDUVEi9Vv4yr/pubhtml";
const SHEET_ID = SHEET_PUBHTML.match(/\/d\/e\/([^/]+)/)?.[1] ?? "";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/e/${SHEET_ID}/pub?output=csv`;

function fixCoverUrl(cover) {
  if (!cover) return "";
  const driveMatch = cover.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch) {
    const id = driveMatch[1];
    const driveDirectUrl = `https://drive.google.com/uc?export=view&id=${id}`;
    return `https://wsrv.nl/?url=${encodeURIComponent(driveDirectUrl)}&w=400&output=webp`;
  }
  return cover;
}



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
    } else { current += char; }
  }
  result.push(current.trim());
  return result;
}

function parseRow(headers, values) {
  const row = {};
  headers.forEach((h, i) => {
    row[h.trim().toLowerCase()] = (values[i] ?? "").trim();
  });
  
  const splitList = val => val ? val.split(",").map(s => s.trim()).filter(Boolean) : [];
  
  return {
    id: Number(row.id) || 0,
    titulo: row.titulo || "Sin título",
    autor: row.autor || "Anónimo",
    generos: splitList(row.generos),
    capitulos: Number(row.capitulos) || 1,
    cover: fixCoverUrl(row.cover || ""),
    sinopsis: row.sinopsis || "Sin sinopsis.",
    // Link mágico para exportar el Google Doc a texto plano
    urlTexto: row.id_historia ? `https://docs.google.com/document/d/${row.id_historia}/export?format=txt` : null
  };
}

export async function loadEscritos() {
  try {
    const res = await fetch(SHEET_URL);
    if (!res.ok) throw new Error("Error cargando Sheet");
    const text = await res.text();
    const lines = text.trim().split("\n").filter(l => l.trim());
    const headers = parseCSVLine(lines[0]);
    return lines.slice(1).map(line => parseRow(headers, parseCSVLine(line)));
  } catch (err) {
    console.error(err);
    return [];
  }
}