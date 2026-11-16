import fs from 'node:fs';
import cfg from '../site.config.mjs';
import { SERVICIOS } from './data/servicios.mjs';
import { esc, T, abs, ID, icon, waIcon, waLink, telLink, LOGO_SVG, BUILD_DATE, stripTags, imgSrcset } from './lib.mjs';

const CSS = fs.readFileSync(new URL('./styles.css', import.meta.url), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*\n\s*/g, '').replace(/\s*([{};:,>])\s*/g, '$1');

// ── Schema.org (un único @graph conectado por @id) ──────────────────────────
export const areaServed = () => [
  ...cfg.zonas.map((z) => ({ '@type': 'City', name: z.nombre, ...(z.val !== z.nombre ? { alternateName: z.val } : {}), containedInPlace: { '@type': 'AdministrativeArea', name: `Provincia de ${cfg.direccion.provincia}` } })),
  { '@type': 'GeoCircle', geoMidpoint: { '@type': 'GeoCoordinates', latitude: cfg.geo.lat, longitude: cfg.geo.lng }, geoRadius: cfg.radioServicioKm * 1000 },
];

export function negocioNode() {
  const sameAs = Object.values(cfg.perfiles).filter(Boolean);
  const d = cfg.direccion;
  return {
    '@type': 'Electrician',
    '@id': ID.negocio,
    name: cfg.nombre,
    alternateName: cfg.alternateName,
    description: `${cfg.nombre} es una empresa instaladora eléctrica de ${cfg.ciudad} especializada en acometidas eléctricas, aprobación y legalización de líneas, boletines eléctricos (CIE), aumentos de potencia e instalaciones de enlace, con servicio en ${cfg.ciudad} y su área metropolitana.`,
    slogan: cfg.eslogan,
    url: abs('/'),
    telephone: cfg.telefono,
    ...(cfg.email ? { email: cfg.email } : {}),
    logo: { '@type': 'ImageObject', '@id': ID.logo, url: abs('/logo.png'), width: 512, height: 512, caption: cfg.nombre },
    image: [abs('/og.png'), abs('/logo.png')],
    address: { '@type': 'PostalAddress', ...(d.calle ? { streetAddress: d.calle } : {}), addressLocality: d.localidad, postalCode: d.cp, addressRegion: d.provincia, addressCountry: d.pais },
    geo: { '@type': 'GeoCoordinates', latitude: cfg.geo.lat, longitude: cfg.geo.lng },
    areaServed: areaServed(),
    openingHoursSpecification: cfg.horario.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.dias.map((x) => `https://schema.org/${x}`), opens: h.abre, closes: h.cierra })),
    contactPoint: { '@type': 'ContactPoint', telephone: cfg.telefono, contactType: 'customer service', areaServed: 'ES', availableLanguage: ['Spanish', 'Catalan'] },
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Efectivo, transferencia, Bizum, tarjeta',
    knowsLanguage: ['es', 'ca'],
    knowsAbout: ['Acometidas eléctricas', 'ITC-BT-11', 'Instalaciones de enlace', 'Línea general de alimentación', 'Centralización de contadores', 'Derivación individual', 'Certificado de Instalación Eléctrica (CIE)', 'Boletín eléctrico', 'Aumento de potencia', 'Solicitud de acceso y conexión', 'Cesión de instalaciones a distribuidora', 'Reglamento Electrotécnico para Baja Tensión', 'Líneas eléctricas de media tensión', 'Puntos de recarga ITC-BT-52', cfg.distribuidora],
    hasOfferCatalog: {
      '@type': 'OfferCatalog', name: `Servicios eléctricos en ${cfg.ciudad}`,
      itemListElement: SERVICIOS.map((s) => ({ '@type': 'Offer', itemOffered: { '@id': abs(`/servicios/${s.slug}/#servicio`) } })),
    },
    hasCredential: cfg.categorias.map((c) => ({ '@type': 'EducationalOccupationalCredential', credentialCategory: 'Habilitación profesional', name: c, ...(cfg.registroIndustrial ? { identifier: cfg.registroIndustrial } : {}), recognizedBy: { '@type': 'GovernmentOrganization', name: 'Generalitat Valenciana' } })),
    ...(cfg.anioFundacion ? { foundingDate: String(cfg.anioFundacion) } : {}),
    ...(cfg.titular ? { founder: { '@type': 'Person', name: cfg.titular.nombre, jobTitle: cfg.titular.cargo } } : {}),
    ...(cfg.cif ? { vatID: cfg.cif, taxID: cfg.cif } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    ...(cfg.perfiles.googleBusiness ? { hasMap: cfg.perfiles.googleBusiness } : {}),
  };
}

export function websiteNode() {
  return { '@type': 'WebSite', '@id': ID.web, url: abs('/'), name: cfg.nombre, alternateName: cfg.alternateName, inLanguage: 'es-ES', publisher: { '@id': ID.negocio }, about: { '@id': ID.negocio } };
}

export function breadcrumbNode(path, crumbs) {
  return { '@type': 'BreadcrumbList', '@id': abs(path + '#breadcrumb'), itemListElement: [['Inicio', '/'], ...crumbs].map(([name, p], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(p) })) };
}

export function faqNode(path, faqs) {
  return { '@type': 'FAQPage', '@id': abs(path + '#faq'), isPartOf: { '@id': abs(path + '#webpage') }, mainEntity: faqs.map((f) => ({ '@type': 'Question', name: T(f.q), acceptedAnswer: { '@type': 'Answer', text: stripTags(f.a) } })) };
}

export function howToNode(path, name, pasos) {
  return { '@type': 'HowTo', '@id': abs(path + '#proceso'), name, step: pasos.map((p, i) => ({ '@type': 'HowToStep', position: i + 1, name: T(p.nombre), text: stripTags(p.texto), url: abs(path + '#proceso') })) };
}

// ── Componentes ─────────────────────────────────────────────────────────────
const NAV = [['Servicios', '/servicios/'], ['Zonas', '/electricista/'], ['Guías', '/guias/'], ['Preguntas', '/preguntas-frecuentes/'], ['Nosotros', '/sobre-nosotros/'], ['Contacto', '/contacto/']];

export const faqHtml = (faqs, h = 'Preguntas frecuentes') => !faqs?.length ? '' : `
<section class="faq" id="preguntas" aria-labelledby="faq-h"><h2 id="faq-h">${h}</h2>
${faqs.map((f) => `<details><summary>${T(f.q)}</summary><div class="a"><p>${T(f.a)}</p></div></details>`).join('\n')}
</section>`;

export const ctaBox = (texto, titulo = '¿Te damos presupuesto?') => `
<div class="box cta"><h2>${titulo}</h2><p>Escríbenos por WhatsApp con la dirección y unas fotos y te respondemos con presupuesto sin compromiso.</p>
<a class="btn btn-wa" href="${waLink(texto)}" rel="nofollow noopener" target="_blank" data-ev="wa">${waIcon()} WhatsApp ${cfg.telefonoVisible}</a>
<a class="btn btn-volt" href="${telLink()}" data-ev="tel">${icon('tel')} Llamar</a></div>`;

export const formHtml = (servicioPre = '', zonaPre = '') => `
<form class="form" action="https://wa.me/${cfg.whatsapp}" method="get" target="_blank" data-wa>
  <div class="row">
    <div><label for="f-nombre">Nombre</label><input id="f-nombre" name="nombre" autocomplete="name" required></div>
    <div><label for="f-mun">Municipio</label><select id="f-mun" name="municipio">${cfg.zonas.map((z) => `<option${z.nombre === zonaPre ? ' selected' : ''}>${z.nombre}</option>`).join('')}<option>Otro municipio</option></select></div>
  </div>
  <div><label for="f-serv">¿Qué necesitas?</label><select id="f-serv" name="servicio">${SERVICIOS.map((s) => `<option${s.nombre === servicioPre ? ' selected' : ''}>${s.nombre}</option>`).join('')}<option>Otro</option></select></div>
  <div><label for="f-msg">Cuéntanos (potencia, dirección, plazos…)</label><textarea id="f-msg" name="text" required></textarea></div>
  <button class="btn btn-wa" type="submit">${waIcon()} Enviar por WhatsApp</button>
  <p class="hint">Se abrirá WhatsApp con tu mensaje listo para enviar al ${cfg.telefonoVisible}. No guardamos nada en esta web.</p>
</form>`;

export const crumbsHtml = (crumbs) => `<nav class="crumbs" aria-label="Migas de pan"><ol><li><a href="/">Inicio</a></li>${crumbs.map(([n, p], i) => i === crumbs.length - 1 ? `<li aria-current="page">${n}</li>` : `<li><a href="${p}">${n}</a></li>`).join('')}</ol></nav>`;

export const fuentesHtml = (lista) => !lista?.length ? '' : `<h2>Normativa y fuentes oficiales</h2><ul class="fuentes">${lista.map((n) => `<li><a href="${n.url}" rel="noopener" target="_blank">${n.nombre}</a> — BOE</li>`).join('')}</ul>`;

// ── Layout ──────────────────────────────────────────────────────────────────
export function page({ path, title, description, body, schema = [], crumbs = [], pageType = 'WebPage', ogType = 'website', noindex = false, published, modified = BUILD_DATE, waText, lcp, lcpSizes = '100vw', ctaBand = true }) {
  const url = abs(path);
  const fullTitle = title.includes(cfg.nombre) || title.includes(cfg.nombreCorto) ? title : (title.length + cfg.nombreCorto.length + 3 <= 66 ? `${title} | ${cfg.nombreCorto}` : title);
  const desc = T(description);
  const webpage = {
    '@type': pageType, '@id': url + '#webpage', url, name: fullTitle, description: desc, inLanguage: 'es-ES',
    isPartOf: { '@id': ID.web }, about: { '@id': ID.negocio }, publisher: { '@id': ID.negocio },
    primaryImageOfPage: { '@type': 'ImageObject', url: abs('/og.png') },
    ...(published ? { datePublished: published } : {}), dateModified: modified,
    ...(crumbs.length ? { breadcrumb: { '@id': url + '#breadcrumb' } } : {}),
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.answer'] },
  };
  const graph = [negocioNode(), websiteNode(), webpage, ...(crumbs.length ? [breadcrumbNode(path, crumbs)] : []), ...schema];
  const robots = (!cfg.indexable || noindex) ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const current = (p) => (path === p || (p !== '/' && path.startsWith(p))) ? ' aria-current="page"' : '';
  const wa = waLink(waText);

  return `<!doctype html>
<html lang="es-ES">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="${robots}">
<link rel="alternate" hreflang="es-ES" href="${url}">
<link rel="alternate" hreflang="x-default" href="${url}">
<meta name="theme-color" content="#0d1b2e">
<meta name="format-detection" content="telephone=yes">
<meta name="geo.region" content="ES-V">
<meta name="geo.placename" content="${esc(cfg.ciudad)}">
<meta name="geo.position" content="${cfg.geo.lat};${cfg.geo.lng}">
<meta name="ICBM" content="${cfg.geo.lat}, ${cfg.geo.lng}">
<meta property="og:type" content="${ogType}">
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="${esc(cfg.nombre)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${abs('/og.png')}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(cfg.nombre + ' – ' + cfg.descriptor)}">
<meta name="twitter:card" content="summary_large_image">
${published ? `<meta property="article:published_time" content="${published}">\n<meta property="article:modified_time" content="${modified}">\n` : ''}<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="alternate" type="text/plain" title="Resumen para IA (llms.txt)" href="/llms.txt">
<link rel="preload" href="/fonts/barlow-sc-800.woff2" as="font" type="font/woff2" crossorigin>
${lcp ? `<link rel="preload" as="image" imagesrcset="${imgSrcset(lcp)}" imagesizes="${lcpSizes}" fetchpriority="high">\n` : ''}
<style>${CSS}</style>
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}</script>
${cfg.analyticsGA4 ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${cfg.analyticsGA4}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${cfg.analyticsGA4}');</script>` : ''}
</head>
<body>
<a class="skip" href="#main">Saltar al contenido</a>
<div class="topbar"><div class="wrap"><span class="hz">${icon('reloj')} ${cfg.horario.map((h) => `${h.texto} ${h.abre}–${h.cierra}`).join(' · ')}</span><span class="zn">${icon('pin')} ${cfg.ciudad} y área metropolitana</span><a href="${telLink()}" data-ev="tel">${icon('tel')} ${cfg.telefonoVisible}</a></div></div>
<header class="top"><div class="wrap">
  <a class="brand" href="/" aria-label="${esc(cfg.nombre)} – inicio">${LOGO_SVG}<span><b>${cfg.nombre}</b><small>${cfg.descriptor}</small></span></a>
  <nav class="nav" aria-label="Principal">${NAV.map(([n, p]) => `<a href="${p}"${current(p)}>${n}</a>`).join('')}<a class="btn btn-wa" href="${wa}" rel="nofollow noopener" target="_blank" data-ev="wa">${waIcon()} WhatsApp</a></nav>
  <details class="menu"><summary aria-label="Abrir menú">Menú</summary><nav class="nav" aria-label="Principal móvil">${NAV.map(([n, p]) => `<a href="${p}"${current(p)}>${n}</a>`).join('')}</nav></details>
</div></header>
<main id="main">
${body}
</main>
${ctaBand ? `<section class="ctaband" aria-labelledby="cta-h"><div class="wrap"><div class="txt"><h2 id="cta-h">¿Tienes una acometida, una línea o un boletín pendiente?</h2><p>Mándanos la dirección y unas fotos por WhatsApp: te decimos qué trámites necesitas y cuánto cuesta.</p></div><div class="bts"><a class="btn btn-ink" href="${wa}" rel="nofollow noopener" target="_blank" data-ev="wa">${waIcon()} Escribir por WhatsApp</a><a class="btn btn-line" href="${telLink()}" data-ev="tel">${icon('tel')} ${cfg.telefonoVisible}</a></div></div></section>` : ''}
<footer class="foot"><div class="wrap">
  <div class="cols">
    <div>
      <a class="brand" href="/" aria-label="${esc(cfg.nombre)} – inicio">${LOGO_SVG}<span><b>${cfg.nombre}</b><small>${cfg.descriptor}</small></span></a>
      <p>${cfg.eslogan}.</p>
      <p><a href="${telLink()}">${icon('tel')} ${cfg.telefonoVisible}</a><br><a href="${wa}" rel="nofollow noopener" target="_blank">${waIcon()} WhatsApp</a>${cfg.email ? `<br><a href="mailto:${cfg.email}">${cfg.email}</a>` : ''}</p>
      <p>${icon('pin')} ${cfg.direccion.calle ? cfg.direccion.calle + ', ' : ''}${cfg.direccion.cp} ${cfg.direccion.localidad} (${cfg.direccion.provincia})<br>${icon('reloj')} ${cfg.horario.map((h) => `${h.texto}: ${h.abre}–${h.cierra}`).join(' · ')}</p>${cfg.perfiles.googleBusiness ? `<p><a href="${cfg.perfiles.googleBusiness}" rel="noopener" target="_blank">★ ${cfg.resenasGoogle ? `${cfg.resenasGoogle.nota} · ` : ''}Ficha en Google Maps</a></p>` : ''}
    </div>
    <div><h2>Servicios</h2><ul>${SERVICIOS.map((s) => `<li><a href="/servicios/${s.slug}/">${s.nombre}</a></li>`).join('')}</ul></div>
    <div><h2>Zonas</h2><ul>${cfg.zonas.map((z) => `<li><a href="/electricista/${z.slug}/">Electricista en ${z.nombre}</a></li>`).join('')}</ul></div>
    <div><h2>Información</h2><ul><li><a href="/guias/">Guías</a></li><li><a href="/glosario-electrico/">Glosario eléctrico</a></li><li><a href="/preguntas-frecuentes/">Preguntas frecuentes</a></li><li><a href="/sobre-nosotros/">Sobre nosotros</a></li><li><a href="/contacto/">Contacto</a></li></ul></div>
  </div>
  <div class="legal"><span>© ${new Date().getFullYear()} ${cfg.nombre}</span><a href="/aviso-legal/">Aviso legal</a><a href="/privacidad/">Privacidad</a><a href="/cookies/">Cookies</a><a href="/sitemap.xml">Mapa del sitio</a><span>Actualizado: ${modified}</span></div>
</div></footer>
<div class="mbar"><a class="btn btn-line" href="${telLink()}" data-ev="tel">${icon('tel')} Llamar</a><a class="btn btn-wa" href="${wa}" rel="nofollow noopener" target="_blank" data-ev="wa">${waIcon()} WhatsApp</a></div>
<a class="fab" href="${wa}" rel="nofollow noopener" target="_blank" aria-label="Escríbenos por WhatsApp" data-ev="wa">${waIcon()}</a>
<script>
document.querySelectorAll('form[data-wa]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var g=function(n){var el=f.elements[n];return el?String(el.value).trim():''};var t=['Hola, os escribo desde la web.',g('nombre')&&'Nombre: '+g('nombre'),g('municipio')&&'Municipio: '+g('municipio'),g('servicio')&&'Servicio: '+g('servicio'),g('text')&&'Mensaje: '+g('text')].filter(Boolean).join('\\n');var u='https://wa.me/${cfg.whatsapp}?text='+encodeURIComponent(t);var w=window.open(u,'_blank','noopener');if(!w)location.href=u;if(window.gtag)gtag('event','generate_lead',{method:'whatsapp_form'})})});
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('[data-ev]');if(a&&window.gtag)gtag('event',a.dataset.ev==='tel'?'click_to_call':'click_whatsapp',{page:location.pathname})});
</script>
</body>
</html>`;
}
