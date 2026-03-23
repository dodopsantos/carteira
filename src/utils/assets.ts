// URL base do Vercel Blob Storage
// Em desenvolvimento, fallback para /public local
const BLOB_BASE = process.env.NEXT_PUBLIC_BLOB_URL?.replace(/\/$/, '')
  ?? '';

/**
 * Retorna a URL completa de um item pelo nome do arquivo.
 * Ex: assetItem('106.png') → 'https://...vercel-storage.com/items/106.png'
 */
export function assetItem(filename: string): string {
  if (!filename || filename === 'None') return '';
  return BLOB_BASE ? `${BLOB_BASE}/items/${filename}` : `/items/${filename}`;
}

/**
 * Retorna a URL completa de um sprite de NPC/personagem.
 * Ex: assetNpc('urahara.png') → 'https://...vercel-storage.com/npcs/urahara.png'
 */
export function assetNpc(filename: string): string {
  if (!filename || filename === 'None') return '';
  return BLOB_BASE ? `${BLOB_BASE}/npcs/${filename}` : `/npcs/${filename}`;
}
