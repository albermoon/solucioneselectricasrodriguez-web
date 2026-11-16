import cfg from '../site.config.mjs';

const _d = new Date();
export const BUILD_DATE = `${_d.getFullYear()}-${String(_d.getMonth() + 1).padStart(2, '0')}-${String(_d.getDate()).padStart(2, '0')}`;
export const fecha = (iso) => new Date(iso + 'T12:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Sustituye tokens de contenido por datos de configuración.
export const T = (s = '') => String(s)
  .replaceAll('{ciudad}', cfg.ciudad)
  .replaceAll('{distribuidora}', cfg.distribuidora)
  .replaceAll('{nombre}', cfg.nombre)
  .replaceAll('{organismo}', cfg.organismoIndustria)
  .replaceAll('{comunidad}', cfg.direccion.comunidad);

export const abs = (p = '/') => cfg.url + p;
export const stripTags = (h = '') => T(h).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

export const waLink = (texto = `Hola, quería pedir presupuesto a ${cfg.nombre}.`) =>
  `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(texto)}`;
export const telLink = () => `tel:${cfg.telefono}`;

export const ID = {
  negocio: abs('/#negocio'),
  web: abs('/#web'),
  logo: abs('/#logo'),
};

// ── Iconos SVG inline (sin peticiones extra) ────────────────────────────────
const P = {
  rayo: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  acometida: '<path d="M3 21V9l6-4 6 4v12M3 21h18M15 13h6v8M6 13h3v3H6zM9 5V2M17 3l3 3-3 3"/>',
  linea: '<path d="M5 22 8 2h8l3 20M6.5 12h11M8 2l8 10M16 2 8 12M7 17h10"/>',
  documento: '<path d="M6 2h9l5 5v15H6zM14 2v6h6M9 13h7M9 17h7M9 9h2"/>',
  potencia: '<path d="M4 18a8 8 0 1 1 16 0M12 18l4-6M2 18h20"/>',
  enchufe: '<path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0zM12 18v4"/>',
  contadores: '<path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18"/>',
  casa: '<path d="M3 11 12 3l9 8M5 9.5V21h14V9.5M13 12l-2 4h3l-2 4"/>',
  cuadro: '<path d="M4 3h16v18H4zM8 7v4M12 7v4M16 7v4M8 15h8"/>',
  coche: '<path d="M5 17H3v-5l2-5h10l3 5h3v5h-2M7 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0M15 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0M5 12h13"/>',
  pin: '<path d="M12 22s7-7.5 7-13a7 7 0 0 0-14 0c0 5.5 7 13 7 13zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>',
  check: '<path d="m4 12 5 5L20 6"/>',
  tel: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
  reloj: '<path d="M12 7v5l3 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"/>',
  escudo: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4"/>',
  libro: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
};
export const icon = (n, cls = 'ico') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${P[n] || P.rayo}</svg>`;
export const waIcon = (cls = 'ico') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z"/></svg>`;

export const LOGO_SVG = `<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false"><rect width="48" height="48" rx="12" fill="#0d1b2e"/><path d="M27 6 13 27h10l-3 15 15-22H25z" fill="#ffc400"/></svg>`;
