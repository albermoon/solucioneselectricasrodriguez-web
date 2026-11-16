// Generador estático sin dependencias: `node build.mjs` → ./dist
import fs from 'node:fs';
import path from 'node:path';
import cfg from './site.config.mjs';
import { SERVICIOS } from './src/data/servicios.mjs';
import { GUIAS, GLOSARIO } from './src/data/guias.mjs';
import { NORMATIVA } from './src/data/normativa.mjs';
import { T, abs, ID, icon, waIcon, waLink, telLink, BUILD_DATE, fecha, stripTags, esc, img } from './src/lib.mjs';
import { FOTOS, FOTO_SERVICIO } from './src/data/fotos.mjs';
import { page, faqHtml, ctaBox, formHtml, crumbsHtml, fuentesHtml, faqNode, howToNode, areaServed } from './src/layout.mjs';

const DIST = path.resolve('dist');
fs.rmSync(DIST, { recursive: true, force: true });
const pages = []; // para sitemap y llms-full
const write = (rel, html) => { const f = path.join(DIST, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); };
const emit = (p, html, meta = {}) => { write(p === '/' ? 'index.html' : p.replace(/^\//, '') + 'index.html', html); pages.push({ path: p, ...meta }); };

const svc = (slug) => SERVICIOS.find((s) => s.slug === slug);
const guia = (slug) => GUIAS.find((g) => g.slug === slug);
const svcCards = (list = SERVICIOS, zona, destacar = false) => `<div class="grid grid-svc${destacar ? ' feat' : ''}">${list.map((s) => `<a class="card card-img" href="/servicios/${s.slug}/"><div class="ph">${img(FOTO_SERVICIO[s.slug], { sizes: '(max-width: 600px) 100vw, 380px', alt: '' })}${icon(s.icono)}</div><div class="bd"><h3>${s.nombre}${zona ? ` en ${zona}` : ''}</h3><p>${T(s.resumen)}</p><span class="more">Ver servicio ${icon('flecha')}</span></div></a>`).join('')}</div>`;
const zonasList = (excl) => `<ul class="zonas">${cfg.zonas.filter((z) => z.slug !== excl).map((z) => `<li><a href="/electricista/${z.slug}/">${icon('pin')}${z.nombre}</a></li>`).join('')}</ul>`;
const hero = (crumbs, h1, lead, extra = '', foto) => `<section class="hero hero-sm${foto ? ' has-ph' : ''}">${foto ? img(foto, { cls: 'hero-bg', sizes: '100vw', alt: '', eager: true }) : ''}<div class="wrap">${crumbsHtml(crumbs)}<h1>${h1}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}${extra}</div></section>`;
const heroCtas = (wa) => `<div class="ctas"><a class="btn btn-wa" href="${waLink(wa)}" rel="nofollow noopener" target="_blank" data-ev="wa">${waIcon()} Presupuesto por WhatsApp</a><a class="btn btn-line" href="${telLink()}" data-ev="tel">${icon('tel')} ${cfg.telefonoVisible}</a></div>`;
const SELLOS = ['Empresa instaladora habilitada', `Tramitación con ${cfg.distribuidora}`, 'Presupuesto sin compromiso', `${cfg.ciudad} y área metropolitana`];
const resenas = () => cfg.resenasGoogle && cfg.perfiles.googleBusiness ? `<a class="stars" href="${cfg.perfiles.googleBusiness}" rel="noopener" target="_blank"><span aria-hidden="true">★★★★★</span> ${cfg.resenasGoogle.nota} en Google · ${cfg.resenasGoogle.total} reseñas</a>` : '';
const chips = () => `<ul class="chips">${SELLOS.map((s) => `<li>${icon('check')}${s}</li>`).join('')}</ul>${resenas()}`;

// ═══ HOME ═══════════════════════════════════════════════════════════════════
const FAQ_HOME = [
  { q: '¿Qué hace un electricista especializado en acometidas?', a: `Tramita con la distribuidora (en ${cfg.ciudad}, ${cfg.distribuidora}) la solicitud de acceso y conexión, ejecuta la obra que corresponde al cliente (zanja, CGP, canalizaciones), emite los certificados y coordina la conexión del suministro.` },
  { q: `¿En qué zonas de ${cfg.ciudad} trabajáis?`, a: `En ${cfg.ciudad} capital y su área metropolitana: ${cfg.zonas.filter((z) => z.slug !== 'valencia').map((z) => z.nombre).join(', ')} y otros municipios en un radio de unos ${cfg.radioServicioKm} km.` },
  { q: '¿Cómo pido presupuesto?', a: `Por WhatsApp al ${cfg.telefonoVisible}: envía la dirección, qué necesitas (acometida, boletín, potencia…) y unas fotos del cuadro o la fachada. Te respondemos con presupuesto sin compromiso.` },
  { q: '¿Gestionáis también el papeleo con la distribuidora e Industria?', a: 'Sí. Es nuestra especialidad: solicitudes de acceso y conexión, condiciones técnico-económicas, certificados (CIE), memorias técnicas, cesiones de líneas y registro ante Industria.' },
  { q: '¿Trabajáis para particulares, comunidades y empresas?', a: 'Sí: viviendas, comunidades de propietarios y administradores de fincas, comercios, naves industriales, promotoras y constructoras.' },
];
emit('/', page({
  path: '/',
  title: `Electricista en ${cfg.ciudad}: acometidas y boletines | ${cfg.nombreCorto}`,
  description: `Electricista en ${cfg.ciudad} y alrededores: acometidas, aprobación y legalización de líneas, boletines (CIE) y aumentos de potencia. Presupuesto por WhatsApp.`,
  schema: [faqNode('/', FAQ_HOME)],
  lcp: 'hero', lcpSizes: '(max-width: 960px) 100vw, 540px',
  body: `
<section class="hero hero-home"><div class="wrap hero-grid">
  <div>
    <p class="eyebrow">${cfg.descriptor} · ${cfg.ciudadVal}</p>
    <h1>Electricista en ${cfg.ciudad}: <em>acometidas, aprobación de líneas</em> y boletines eléctricos</h1>
    <p class="lead">Somos <strong>${cfg.nombre}</strong>, empresa instaladora eléctrica de ${cfg.ciudad}. Nos encargamos de todo lo que hay entre la red de la distribuidora y tu cuadro: acometidas nuevas, líneas aprobadas por ${cfg.distribuidora}, boletines, aumentos de potencia e instalaciones completas.</p>
    ${heroCtas()}
  </div>
  <div class="hero-media">
    ${img('hero', { sizes: '(max-width: 960px) 100vw, 540px', eager: true })}
    ${cfg.resenasGoogle && cfg.perfiles.googleBusiness ? `<a class="badge b1" href="${cfg.perfiles.googleBusiness}" rel="noopener" target="_blank">${icon('estrella')}<span><strong>${cfg.resenasGoogle.nota} en Google</strong><span class="st" aria-hidden="true">★★★★★</span> ${cfg.resenasGoogle.total} reseñas</span></a>` : ''}
    <div class="badge b2">${icon('linea')}<span><strong>Tramitamos con</strong>${cfg.distribuidora}</span></div>
  </div>
</div></section>

<section class="trust" aria-label="Por qué elegirnos"><div class="wrap"><ul>
  <li>${icon('escudo')}<span><strong>Empresa instaladora habilitada</strong>Trabajos según el REBT y las normas de ${cfg.distribuidora.split(' ')[0]}</span></li>
  <li>${icon('documento')}<span><strong>Boletín (CIE) oficial</strong>Lo emitimos y lo registramos en Industria</span></li>
  <li>${icon('linea')}<span><strong>Expedientes con la distribuidora</strong>Acometidas, potencia y aprobación de líneas</span></li>
  <li>${icon('reloj')}<span><strong>Presupuesto sin compromiso</strong>Por WhatsApp, con fotos y desglosado</span></li>
</ul></div></section>

<section class="sec"><div class="wrap split">
  <div class="prose">
    <span class="eyebrow">Quiénes somos</span>
    <h2>Especialistas en lo que otros electricistas no quieren tramitar</h2>
    <div class="answer"><p><strong>En resumen:</strong> ${cfg.nombre} es una empresa instaladora eléctrica con sede en ${cfg.ciudad} especializada en <a href="/servicios/acometidas-electricas/">acometidas eléctricas</a>, <a href="/servicios/aprobacion-legalizacion-lineas/">aprobación y legalización de líneas</a>, <a href="/servicios/boletin-electrico/">boletines eléctricos (CIE)</a> y <a href="/servicios/aumento-de-potencia/">aumentos de potencia</a>. Trabaja en ${cfg.ciudad} y su área metropolitana (${cfg.zonas.slice(1, 7).map((z) => z.nombre).join(', ')}…) y gestiona los trámites con ${cfg.distribuidora} e Industria. Presupuestos por WhatsApp en el ${cfg.telefonoVisible}.</p></div>
    <p>Cambiar un enchufe lo hace cualquiera. Conseguir que la distribuidora apruebe una línea, dar luz a una parcela en la huerta, renovar la LGA de una comunidad o sacar un boletín para un piso que lleva años de baja requiere conocer el reglamento, las normas particulares de la distribuidora y cómo se mueve cada expediente. Eso es lo que hacemos todos los días.</p>
    <ul class="ticks">
      <li>${icon('check')}<span><strong>Un solo interlocutor</strong>: obra, documentación y trámites con la distribuidora, el ayuntamiento e Industria.</span></li>
      <li>${icon('check')}<span><strong>Expedientes completos a la primera</strong>, para evitar requerimientos y reinspecciones.</span></li>
      <li>${icon('check')}<span><strong>Presupuesto por partidas</strong>: sabes qué pagas a la distribuidora y qué pagas de obra.</span></li>
      <li>${icon('check')}<span><strong>Atención directa por WhatsApp</strong>: mándanos fotos y te orientamos el mismo día.</span></li>
    </ul>
  </div>
  <figure class="photo">
    ${img('averias', { sizes: '(max-width: 960px) 100vw, 480px' })}
    <figcaption class="tag"><span><b>${SERVICIOS.length}</b><span>servicios eléctricos</span></span><span><b>${cfg.zonas.length}</b><span>municipios atendidos</span></span><span><b>${cfg.resenasGoogle ? cfg.resenasGoogle.nota : cfg.radioServicioKm + ' km'}</b><span>${cfg.resenasGoogle ? 'valoración en Google' : 'de radio'}</span></span></figcaption>
  </figure>
</div></section>

<section class="sec soft" id="servicios"><div class="wrap">
  <div class="sec-h"><span class="eyebrow">Servicios</span><h2>Servicios eléctricos en ${cfg.ciudad}</h2><p>Del punto de conexión a tu cuadro: todo lo necesario para tener suministro legal, seguro y con la potencia que necesitas.</p></div>
  ${svcCards(SERVICIOS, undefined, true)}
</div></section>

<section class="sec"><div class="wrap">
  <div class="sec-h c"><span class="eyebrow">Cómo trabajamos</span><h2>De la primera foto al enganche, en 5 pasos</h2></div>
  <ol class="steps row">
    <li><strong>Nos escribes por WhatsApp</strong>Dirección, qué necesitas y fotos del cuadro, la fachada o la parcela.</li>
    <li><strong>Diagnóstico y presupuesto</strong>Te decimos qué trámites hacen falta y te damos precio desglosado.</li>
    <li><strong>Tramitación</strong>Presentamos solicitudes a ${cfg.distribuidora}, ayuntamiento e Industria.</li>
    <li><strong>Ejecución</strong>Hacemos la obra según el reglamento y las normas de la distribuidora.</li>
    <li><strong>Certificado y conexión</strong>Emitimos el CIE, la distribuidora verifica y conecta.</li>
  </ol>
</div></section>

<section class="band" id="zonas">${img('valencia', { sizes: '100vw', alt: '' })}<div class="wrap">
  <div class="sec-h"><span class="eyebrow">Zonas</span><h2>Electricista en ${cfg.ciudad} y alrededores</h2><p>Trabajamos en ${cfg.ciudad} capital y en los municipios de l’Horta, el Camp de Túria y el Camp de Morvedre, en un radio aproximado de ${cfg.radioServicioKm} km.</p></div>
  ${zonasList()}
</div></section>

<section class="sec"><div class="wrap">
  <div class="sec-h"><span class="eyebrow">Guías</span><h2>Resolvemos tus dudas antes de llamar</h2></div>
  <div class="grid grid-3">${GUIAS.map((g) => `<a class="card" href="/guias/${g.slug}/">${icon('libro')}<h3>${g.h1}</h3><p>${T(g.description)}</p><span class="more">Leer guía ${icon('flecha')}</span></a>`).join('')}</div>
</div></section>
${cfg.resenasGoogle && cfg.perfiles.googleBusiness ? `
<section class="sec warm"><div class="wrap">
  <div class="rating"><div><div class="n">${cfg.resenasGoogle.nota}</div></div><div><div class="st" aria-hidden="true">★★★★★</div><div class="g">${cfg.resenasGoogle.total} reseñas en Google</div></div><p>Nuestros clientes nos valoran con un <strong>${cfg.resenasGoogle.nota} sobre 5</strong> en Google. Lee sus opiniones o, si ya has trabajado con nosotros, cuéntanos qué tal: nos ayuda mucho.</p><a class="btn btn-ink" href="${cfg.perfiles.googleBusiness}" rel="noopener" target="_blank">Ver reseñas en Google ${icon('flecha')}</a></div>
</div></section>` : ''}
<section class="sec soft"><div class="wrap layout">
  <div class="prose">${faqHtml(FAQ_HOME)}</div>
  <aside class="aside"><div class="box"><h2>Pide presupuesto</h2>${formHtml()}</div></aside>
</div></section>`,
}), { title: 'Inicio', summary: `${cfg.nombre}: electricista en ${cfg.ciudad}.` });

// ═══ SERVICIOS ══════════════════════════════════════════════════════════════
emit('/servicios/', page({
  path: '/servicios/', pageType: 'CollectionPage', crumbs: [['Servicios', '/servicios/']],
  title: `Servicios de electricista en ${cfg.ciudad}`,
  description: `Acometidas, aprobación de líneas, boletines, aumentos de potencia, LGA, instalaciones, cuadros, recarga y averías en ${cfg.ciudad} y alrededores.`,
  schema: [{ '@type': 'ItemList', '@id': abs('/servicios/#lista'), itemListElement: SERVICIOS.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/servicios/${s.slug}/`), name: s.nombre })) }],
  body: `${hero([['Servicios', '/servicios/']], `Servicios eléctricos en ${cfg.ciudad}`, `Especialistas en conexión a red y legalización: acometidas, líneas, boletines y potencia, además de instalaciones completas.`, heroCtas(), 'cuadro')}
<section class="sec"><div class="wrap">${svcCards()}</div></section>`,
}), { title: 'Servicios' });

for (const s of SERVICIOS) {
  const p = `/servicios/${s.slug}/`;
  const crumbs = [['Servicios', '/servicios/'], [s.nombre, p]];
  const wa = `Hola, necesito presupuesto de ${s.nombre.toLowerCase()} en `;
  const serviceNode = {
    '@type': 'Service', '@id': abs(p + '#servicio'), name: s.nombre, serviceType: s.nombre, description: stripTags(s.respuesta),
    provider: { '@id': ID.negocio }, areaServed: areaServed(), url: abs(p), audience: { '@type': 'Audience', audienceType: 'Particulares, comunidades de propietarios y empresas' },
    availableChannel: { '@type': 'ServiceChannel', servicePhone: { '@type': 'ContactPoint', telephone: cfg.telefono }, serviceUrl: abs('/contacto/') },
    hasOfferCatalog: { '@type': 'OfferCatalog', name: `Qué incluye: ${s.nombre}`, itemListElement: s.incluye.map((x) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: T(x) } })) },
  };
  const rel = s.relacionados.map(svc).filter(Boolean);
  const gs = s.guias.map(guia).filter(Boolean);
  emit(p, page({
    path: p, crumbs, title: T(s.title), description: s.description, waText: wa,
    schema: [serviceNode, howToNode(p, `Proceso: ${s.nombre}`, s.pasos), faqNode(p, s.faqs)],
    body: `${hero(crumbs, T(s.h1), T(s.resumen), heroCtas(wa), FOTO_SERVICIO[s.slug])}
<section class="sec"><div class="wrap layout">
  <article class="prose">
    <p class="meta">Actualizado el <time datetime="${BUILD_DATE}">${fecha(BUILD_DATE)}</time> · Por el equipo técnico de ${cfg.nombre}</p>
    <div class="answer"><p>${T(s.respuesta)}</p></div>
    <div class="keyfacts"><h2>Datos clave</h2><ul>${s.puntosClave.map((x) => `<li>${T(x)}</li>`).join('')}</ul></div>
    ${s.secciones.map((x) => `<h2>${T(x.h2)}</h2>${T(x.html)}`).join('\n')}
    <h2>Qué incluye nuestro servicio</h2><ul class="ticks">${s.incluye.map((x) => `<li>${icon('check')}<span>${T(x)}</span></li>`).join('')}</ul>
    <h2 id="proceso">Cómo lo hacemos, paso a paso</h2>
    <ol class="steps">${s.pasos.map((x) => `<li><strong>${T(x.nombre)}</strong>${T(x.texto)}</li>`).join('')}</ol>
    <h2>Plazos</h2><p>${T(s.plazo)}</p>
    ${faqHtml(s.faqs, `Preguntas frecuentes sobre ${s.nombre.toLowerCase()}`)}
    <h2>Dónde ofrecemos este servicio</h2><p>${s.nombre} en ${cfg.ciudad} y en estos municipios:</p>${zonasList()}
    ${fuentesHtml(s.normativa.map((k) => NORMATIVA[k]))}
  </article>
  <aside class="aside">
    ${ctaBox(wa)}
    ${rel.length ? `<div class="box"><h2>Servicios relacionados</h2><ul>${rel.map((r) => `<li><a href="/servicios/${r.slug}/">${r.nombre}</a></li>`).join('')}</ul></div>` : ''}
    ${gs.length ? `<div class="box"><h2>Guías útiles</h2><ul>${gs.map((g) => `<li><a href="/guias/${g.slug}/">${g.h1}</a></li>`).join('')}</ul></div>` : ''}
  </aside>
</div></section>`,
  }), { title: s.nombre, summary: stripTags(s.respuesta), svc: s });
}

// ═══ ZONAS ══════════════════════════════════════════════════════════════════
emit('/electricista/', page({
  path: '/electricista/', pageType: 'CollectionPage', crumbs: [['Zonas', '/electricista/']],
  title: `Electricista en ${cfg.ciudad} y área metropolitana`,
  description: `Electricista en ${cfg.zonas.slice(0, 5).map((z) => z.nombre).join(', ')} y toda el área metropolitana: acometidas, aprobación de líneas y boletines eléctricos.`,
  body: `${hero([['Zonas', '/electricista/']], `Electricista en ${cfg.ciudad} y alrededores`, `Damos servicio en ${cfg.ciudad} capital y en su área metropolitana, en un radio de unos ${cfg.radioServicioKm} km.`, heroCtas(), 'valencia')}
<section class="sec"><div class="wrap"><div class="grid">${cfg.zonas.map((z) => `<a class="card" href="/electricista/${z.slug}/">${icon('pin')}<h3>Electricista en ${z.nombre}</h3><p>${z.tipico.slice(0, 2).join(' · ')}</p><span class="more">Ver zona →</span></a>`).join('')}</div></div></section>`,
}), { title: 'Zonas' });

const FOTOS_ZONA = ['huerta', 'apoyo', 'alta', 'lineas', 'acometida', 'obra'];
for (const z of cfg.zonas) {
  const p = `/electricista/${z.slug}/`;
  const crumbs = [['Zonas', '/electricista/'], [z.nombre, p]];
  const nombreDoble = z.val && z.val !== z.nombre ? `${z.nombre} (${z.val})` : z.nombre;
  const wa = `Hola, necesito un electricista en ${z.nombre} para `;
  const faqs = [
    { q: `¿Qué distribuidora eléctrica hay en ${z.nombre}?`, a: `En ${z.nombre} la red de distribución la gestiona mayoritariamente ${cfg.distribuidora}. Es con quien tramitamos acometidas, aumentos de potencia y aprobaciones de líneas.` },
    { q: `¿Hacéis boletines eléctricos en ${z.nombre}?`, a: `Sí. Revisamos la instalación en ${z.nombre}, la adecuamos si hace falta y emitimos el Certificado de Instalación Eléctrica (CIE) para alta, reenganche o aumento de potencia.` },
    { q: `¿Cuánto tardáis en llegar a ${z.nombre}?`, a: z.minutos ? `${z.nombre} está a unos ${z.minutos} minutos de ${cfg.ciudad}. Organizamos las visitas por zonas para darte cita lo antes posible.` : `Trabajamos a diario en todos los barrios de ${cfg.ciudad}. Escríbenos por WhatsApp y te damos cita.` },
    { q: `¿Tramitáis acometidas nuevas en ${z.nombre}?`, a: `Sí: solicitud de acceso y conexión, obra (zanja, CGP), licencia municipal en ${z.nombre} si hace falta y coordinación del enganche con la distribuidora.` },
  ];
  const cercanas = cfg.zonas.filter((x) => x.slug !== z.slug).slice(0, 12);
  emit(p, page({
    path: p, crumbs, waText: wa,
    title: `Electricista en ${z.nombre}: acometidas y boletines`,
    description: `Electricista en ${nombreDoble}: acometidas, aprobación de líneas, boletines (CIE) y aumentos de potencia. Presupuesto por WhatsApp al ${cfg.telefonoVisible}.`,
    schema: [faqNode(p, faqs), { '@type': 'Place', '@id': abs(p + '#zona'), name: nombreDoble, address: { '@type': 'PostalAddress', addressLocality: z.nombre, postalCode: z.cps.split(' ')[0], addressRegion: cfg.direccion.provincia, addressCountry: 'ES' } }],
    body: `${hero(crumbs, `Electricista en ${nombreDoble}`, `Acometidas, aprobación de líneas, boletines y aumentos de potencia en ${z.nombre}${z.minutos ? `, a unos ${z.minutos} minutos de ${cfg.ciudad}` : ''}.`, heroCtas(wa), z.slug === 'valencia' ? 'valencia' : FOTOS_ZONA[cfg.zonas.indexOf(z) % FOTOS_ZONA.length])}
<section class="sec"><div class="wrap layout">
  <article class="prose">
    <div class="answer"><p><strong>${cfg.nombre}</strong> presta servicio de electricista en <strong>${nombreDoble}</strong> (${cfg.direccion.provincia}, CP ${z.cps}): acometidas eléctricas, aprobación y legalización de líneas con ${cfg.distribuidora}, boletines eléctricos (CIE), aumentos de potencia, renovación de LGA en comunidades e instalaciones completas. Presupuesto por WhatsApp en el ${cfg.telefonoVisible}.</p></div>
    <h2>Trabajos eléctricos en ${z.nombre}</h2>
    <p>${z.notas}</p>
    <h3>Lo que más nos piden en ${z.nombre}</h3>
    <ul class="ticks">${z.tipico.map((x) => `<li>${icon('check')}<span>${x}</span></li>`).join('')}</ul>
    ${z.barrios?.length ? `<h3>Zonas y barrios donde trabajamos</h3><p>${z.barrios.join(', ')}.</p>` : ''}
    <div class="keyfacts"><h2>${z.nombre} en datos</h2><ul><li>Población: ${z.poblacion}</li><li>Códigos postales: ${z.cps}</li><li>Distribuidora principal: ${cfg.distribuidora}</li><li>Tiempo desde ${cfg.ciudad}: ${z.minutos ? `≈ ${z.minutos} min` : 'servicio en toda la ciudad'}</li></ul></div>
    <h2>Servicios en ${z.nombre}</h2>
    ${svcCards(SERVICIOS, z.nombre)}
    ${faqHtml(faqs, `Preguntas frecuentes: electricista en ${z.nombre}`)}
    <h2>También trabajamos cerca de ${z.nombre}</h2>${zonasList(z.slug)}
  </article>
  <aside class="aside">${ctaBox(wa, `Electricista en ${z.nombre}`)}<div class="box"><h2>Pide presupuesto</h2>${formHtml('', z.nombre)}</div></aside>
</div></section>`,
  }), { title: `Electricista en ${z.nombre}`, summary: z.notas, zona: z });
}

// ═══ GUÍAS ══════════════════════════════════════════════════════════════════
emit('/guias/', page({
  path: '/guias/', pageType: 'CollectionPage', crumbs: [['Guías', '/guias/']],
  title: 'Guías sobre acometidas, boletines y potencia',
  description: 'Guías claras sobre acometidas, boletín eléctrico (CIE), aumento de potencia y legalización de líneas, escritas por electricistas de Valencia.',
  body: `${hero([['Guías', '/guias/']], 'Guías eléctricas', 'Lo que necesitas saber antes de pedir una acometida, un boletín o más potencia, explicado por profesionales.', '', 'boletin')}
<section class="sec"><div class="wrap"><div class="grid">${GUIAS.map((g) => `<a class="card" href="/guias/${g.slug}/">${icon('libro')}<h3>${g.h1}</h3><p>${T(g.description)}</p><span class="more">Leer →</span></a>`).join('')}<a class="card" href="/glosario-electrico/">${icon('libro')}<h3>Glosario eléctrico</h3><p>Acometida, CGP, LGA, CIE, CUPS… definidos en una frase.</p><span class="more">Ver glosario →</span></a></div></div></section>`,
}), { title: 'Guías' });

for (const g of GUIAS) {
  const p = `/guias/${g.slug}/`;
  const crumbs = [['Guías', '/guias/'], [g.h1, p]];
  const s = svc(g.servicio);
  const article = {
    '@type': 'Article', '@id': abs(p + '#articulo'), headline: g.h1, description: T(g.description), mainEntityOfPage: { '@id': abs(p + '#webpage') },
    author: cfg.titular ? { '@type': 'Person', name: cfg.titular.nombre, jobTitle: cfg.titular.cargo, worksFor: { '@id': ID.negocio } } : { '@id': ID.negocio },
    publisher: { '@id': ID.negocio }, datePublished: g.publicado, dateModified: g.actualizado, inLanguage: 'es-ES', image: abs('/og.png'),
    about: s ? { '@id': abs(`/servicios/${s.slug}/#servicio`) } : undefined,
  };
  emit(p, page({
    path: p, crumbs, title: T(g.title), description: g.description, ogType: 'article', published: g.publicado, modified: g.actualizado,
    schema: [article, faqNode(p, g.faqs)],
    body: `${hero(crumbs, g.h1, '', '', FOTO_SERVICIO[g.servicio] || 'boletin')}
<section class="sec"><div class="wrap layout">
  <article class="prose">
    <p class="meta">Publicado el <time datetime="${g.publicado}">${fecha(g.publicado)}</time> · Actualizado el <time datetime="${g.actualizado}">${fecha(g.actualizado)}</time> · Por ${cfg.titular ? `${cfg.titular.nombre}, ${cfg.titular.cargo}` : `el equipo técnico de ${cfg.nombre}`}</p>
    <div class="answer"><p>${T(g.respuesta)}</p></div>
    <div class="keyfacts"><h2>Lo esencial</h2><ul>${g.tldr.map((x) => `<li>${T(x)}</li>`).join('')}</ul></div>
    ${g.secciones.map((x) => `<h2>${T(x.h2)}</h2>${T(x.html)}`).join('\n')}
    ${faqHtml(g.faqs)}
    ${s ? `<h2>¿Necesitas ayuda en ${cfg.ciudad}?</h2><p>En ${cfg.nombre} nos encargamos de todo el proceso: <a href="/servicios/${s.slug}/">${s.nombre.toLowerCase()} en ${cfg.ciudad}</a>.</p>` : ''}
    ${fuentesHtml([NORMATIVA.rebt, ...(s ? s.normativa.filter((k) => k !== 'rebt').map((k) => NORMATIVA[k]) : [])])}
  </article>
  <aside class="aside">${ctaBox(s ? `Hola, he leído vuestra guía y necesito ${s.nombre.toLowerCase()} en ` : undefined)}</aside>
</div></section>`,
  }), { title: g.h1, summary: g.respuesta, guia: g });
}

// Glosario
emit('/glosario-electrico/', page({
  path: '/glosario-electrico/', crumbs: [['Guías', '/guias/'], ['Glosario eléctrico', '/glosario-electrico/']],
  title: 'Glosario eléctrico: acometida, CGP, LGA, CIE y CUPS',
  description: 'Definiciones claras de los términos de los trámites eléctricos: acometida, CGP, LGA, derivación individual, CIE, CUPS y extensión de red.',
  schema: [{ '@type': 'DefinedTermSet', '@id': abs('/glosario-electrico/#glosario'), name: 'Glosario eléctrico', hasDefinedTerm: GLOSARIO.map(([t, d]) => ({ '@type': 'DefinedTerm', name: t, description: d, inDefinedTermSet: abs('/glosario-electrico/#glosario') })) }],
  body: `${hero([['Guías', '/guias/'], ['Glosario eléctrico', '/glosario-electrico/']], 'Glosario eléctrico', 'Los términos que te encontrarás al tramitar una acometida, un boletín o un aumento de potencia.', '', 'potencia')}
<section class="sec"><div class="wrap prose"><dl>${GLOSARIO.map(([t, d]) => `<dt id="${t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}"><strong>${t}</strong></dt><dd><p>${d}</p></dd>`).join('')}</dl></div></section>`,
}), { title: 'Glosario eléctrico', glosario: true });

// ═══ FAQ global ═════════════════════════════════════════════════════════════
const allFaqs = [...FAQ_HOME, ...SERVICIOS.flatMap((s) => s.faqs)];
emit('/preguntas-frecuentes/', page({
  path: '/preguntas-frecuentes/', crumbs: [['Preguntas frecuentes', '/preguntas-frecuentes/']],
  title: `Preguntas frecuentes de electricidad en ${cfg.ciudad}`,
  description: `Respuestas a las dudas más habituales sobre acometidas, aprobación de líneas, boletín eléctrico, potencia, LGA y recarga en ${cfg.ciudad}.`,
  schema: [faqNode('/preguntas-frecuentes/', allFaqs)],
  body: `${hero([['Preguntas frecuentes', '/preguntas-frecuentes/']], 'Preguntas frecuentes', 'Respuestas directas a lo que más nos preguntan.', '', 'boletin')}
<section class="sec"><div class="wrap layout"><div class="prose">
${faqHtml(FAQ_HOME, 'Sobre nosotros y cómo trabajamos')}
${SERVICIOS.map((s) => faqHtml(s.faqs, `<a href="/servicios/${s.slug}/">${s.nombre}</a>`)).join('\n')}
</div><aside class="aside">${ctaBox()}</aside></div></section>`,
}), { title: 'Preguntas frecuentes', faqs: allFaqs });

// ═══ SOBRE NOSOTROS ═════════════════════════════════════════════════════════
const datosNegocio = [
  ['Nombre', cfg.nombre], ['Actividad', 'Empresa instaladora eléctrica'], ['Especialidad', 'Acometidas, aprobación de líneas, boletines y potencia'],
  ['Zona', `${cfg.ciudad} y área metropolitana (≈ ${cfg.radioServicioKm} km)`], ['Teléfono y WhatsApp', cfg.telefonoVisible],
  ['Distribuidora con la que trabajamos', cfg.distribuidora], ['Habilitación', cfg.categorias.join(', ') + (cfg.registroIndustrial ? ` · Registro ${cfg.registroIndustrial}` : '')],
  ...(cfg.anioFundacion ? [['En activo desde', String(cfg.anioFundacion)]] : []), ...(cfg.cif ? [['CIF/NIF', cfg.cif]] : []),
  ['Seguro de responsabilidad civil', cfg.seguroRC ? 'Sí' : '—'], ['Idiomas', 'Castellano y valenciano'],
];
emit('/sobre-nosotros/', page({
  path: '/sobre-nosotros/', pageType: 'AboutPage', crumbs: [['Sobre nosotros', '/sobre-nosotros/']],
  title: `Sobre nosotros: electricistas en ${cfg.ciudad}`,
  description: `Quiénes somos: empresa instaladora eléctrica en ${cfg.ciudad} especializada en acometidas, líneas y boletines. Habilitación, zona y forma de trabajo.`,
  body: `${hero([['Sobre nosotros', '/sobre-nosotros/']], `Sobre ${cfg.nombre}`, `Electricistas de ${cfg.ciudad} especializados en conectar, legalizar y dar potencia.`, '', 'obra')}
<section class="sec"><div class="wrap layout"><article class="prose">
  <div class="answer"><p>${cfg.nombre} es una empresa instaladora eléctrica de ${cfg.ciudad}${cfg.anioFundacion ? `, en activo desde ${cfg.anioFundacion},` : ''} centrada en la parte más técnica y burocrática del oficio: acometidas, aprobación y legalización de líneas ante ${cfg.distribuidora}, boletines eléctricos, aumentos de potencia e instalaciones de enlace en comunidades.</p></div>
  ${cfg.titular ? `<h2>${cfg.titular.nombre}</h2><p>${cfg.titular.cargo}${cfg.titular.anios ? ` con más de ${cfg.titular.anios} años de experiencia` : ''}.</p>` : ''}
  <h2>Cómo trabajamos</h2>
  <ul class="ticks"><li>${icon('check')}<span>Te explicamos qué trámites necesitas antes de presupuestar.</span></li><li>${icon('check')}<span>Presupuestos por partidas: derechos de la distribuidora, obra y documentación por separado.</span></li><li>${icon('check')}<span>Cumplimos el Reglamento Electrotécnico para Baja Tensión y las normas particulares de la distribuidora.</span></li><li>${icon('check')}<span>Te informamos por WhatsApp de cada paso del expediente.</span></li></ul>
  <h2>Datos del negocio</h2>
  <table><tbody>${datosNegocio.map(([k, v]) => `<tr><th scope="row">${k}</th><td>${v}</td></tr>`).join('')}</tbody></table>
  <h2>Zonas</h2>${zonasList()}
</article><aside class="aside">${ctaBox()}</aside></div></section>`,
}), { title: 'Sobre nosotros', datos: datosNegocio });

// ═══ CONTACTO ═══════════════════════════════════════════════════════════════
emit('/contacto/', page({
  path: '/contacto/', pageType: 'ContactPage', crumbs: [['Contacto', '/contacto/']],
  title: `Contacto: presupuesto por WhatsApp en ${cfg.ciudad}`,
  description: `Pide presupuesto a ${cfg.nombre} por WhatsApp o teléfono: ${cfg.telefonoVisible}. Acometidas, líneas, boletines y potencia en ${cfg.ciudad} y alrededores.`,
  body: `${hero([['Contacto', '/contacto/']], 'Pide presupuesto por WhatsApp', `Escríbenos al <a href="${waLink()}" style="color:var(--volt)" rel="nofollow noopener" target="_blank">${cfg.telefonoVisible}</a> o rellena el formulario: se abrirá WhatsApp con tu mensaje listo.`, heroCtas(), 'hero')}
<section class="sec"><div class="wrap layout">
  <div class="box"><h2>Cuéntanos qué necesitas</h2>${formHtml()}</div>
  <aside class="aside">
    <div class="box"><h2>Datos de contacto</h2><p>${icon('tel')} <a href="${telLink()}">${cfg.telefonoVisible}</a><br>${waIcon()} <a href="${waLink()}" rel="nofollow noopener" target="_blank">WhatsApp</a>${cfg.email ? `<br><a href="mailto:${cfg.email}">${cfg.email}</a>` : ''}</p>
    <p>${icon('reloj')} ${cfg.horario.map((h) => `${h.texto}: ${h.abre}–${h.cierra}`).join('<br>')}${cfg.urgencias ? '<br>Urgencias: escríbenos por WhatsApp.' : ''}</p>
    <p>${icon('pin')} ${cfg.ciudad} y área metropolitana (${cfg.radioServicioKm} km)</p>${cfg.perfiles.googleBusiness ? `<p><a href="${cfg.perfiles.googleBusiness}" rel="noopener" target="_blank">Ver nuestra ficha y reseñas en Google Maps →</a></p>` : ''}</div>
    <div class="box"><h2>Para un presupuesto rápido, envía:</h2><ul><li>Dirección o municipio</li><li>Qué necesitas y potencia deseada</li><li>Fotos del cuadro, contador o fachada</li><li>Tu última factura (si ya tienes luz)</li></ul></div>
  </aside>
</div></section>`,
}), { title: 'Contacto' });

// ═══ LEGALES ════════════════════════════════════════════════════════════════
const pend = (v, t) => v || `<mark>[${t} – pendiente de completar]</mark>`;
const legal = (p, title, html) => emit(p, page({ path: p, title, description: `${title} de ${cfg.nombre}.`, noindex: true, crumbs: [[title, p]], body: `${hero([[title, p]], title, '')}<section class="sec"><div class="wrap prose">${html}</div></section>` }), { title, legal: true });
legal('/aviso-legal/', 'Aviso legal', `<p>En cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información (LSSI-CE):</p><ul><li>Titular: ${pend(cfg.titular?.nombre, 'nombre del titular o razón social')} (${cfg.nombre})</li><li>NIF/CIF: ${pend(cfg.cif, 'NIF/CIF')}</li><li>Domicilio: ${pend(cfg.direccion.calle, 'domicilio fiscal')}, ${cfg.direccion.cp} ${cfg.direccion.localidad}</li><li>Teléfono: ${cfg.telefonoVisible}</li>${cfg.email ? `<li>Email: ${cfg.email}</li>` : ''}<li>Registro de empresa instaladora: ${pend(cfg.registroIndustrial, 'nº de registro')}</li></ul><p>Los contenidos de esta web son informativos y no sustituyen el estudio técnico de cada instalación. La normativa citada enlaza a su fuente oficial en el BOE.</p>
<h2>Créditos de las fotografías</h2><p>Algunas fotos son ilustrativas y proceden de bancos de imágenes libres (<a href="https://unsplash.com/license" rel="noopener" target="_blank">licencia Unsplash</a>). Las siguientes proceden de Wikimedia Commons; se han recortado y redimensionado, y se distribuyen bajo la misma licencia:</p>
<ul>${Object.values(FOTOS).filter((f) => f.credito).map((f) => `<li>${esc(f.alt)}: <a href="${esc(f.credito.fuente)}" rel="noopener" target="_blank">${esc(f.credito.autor)}</a>, <a href="${f.credito.licenciaUrl}" rel="noopener license" target="_blank">${f.credito.licencia}</a>.</li>`).join('')}</ul>`);
legal('/privacidad/', 'Política de privacidad', `<p>Esta web no tiene formularios que almacenen datos: el formulario de contacto solo abre WhatsApp con tu mensaje. Si nos escribes por WhatsApp o nos llamas, ${cfg.nombre} tratará tus datos para responder a tu solicitud y elaborar presupuestos (base legal: medidas precontractuales a petición del interesado). Los mensajes de WhatsApp los gestiona WhatsApp Ireland Ltd. conforme a su propia política. Conservamos los datos mientras dure la relación y los plazos legales. Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo al ${cfg.telefonoVisible}${cfg.email ? ` o a ${cfg.email}` : ''}, y reclamar ante la Agencia Española de Protección de Datos (aepd.es).</p>`);
legal('/cookies/', 'Política de cookies', cfg.analyticsGA4 ? `<p>Usamos cookies analíticas de Google Analytics para medir visitas. Puedes rechazarlas en la configuración de tu navegador.</p>` : `<p>Esta web <strong>no utiliza cookies</strong> propias ni de terceros, ni herramientas de seguimiento. Por eso no te mostramos ningún banner de cookies.</p>`);

// 404
write('404.html', page({ path: '/404.html', title: 'Página no encontrada', description: 'La página que buscas no existe.', noindex: true, body: `${hero([['404', '/404.html']], 'Página no encontrada', 'Puede que el enlace haya cambiado. Estos son nuestros servicios:', heroCtas())}<section class="sec"><div class="wrap">${svcCards()}</div></section>` }));

// ═══ ARCHIVOS TÉCNICOS: sitemap, robots, llms.txt, manifest, headers ═══════
const indexables = pages.filter((p) => !p.legal);
const prio = (p) => p === '/' ? '1.0' : p.startsWith('/servicios/') ? '0.9' : p.startsWith('/electricista/') ? '0.8' : '0.6';
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexables.map((p) => `  <url><loc>${abs(p.path)}</loc><lastmod>${p.guia?.actualizado || BUILD_DATE}</lastmod><priority>${prio(p.path)}</priority></url>`).join('\n')}
</urlset>
`);

const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot', 'Applebot-Extended', 'Bingbot', 'DuckAssistBot', 'meta-externalagent', 'Amazonbot', 'MistralAI-User', 'CCBot'];
write('robots.txt', cfg.indexable ? `# ${cfg.nombre} – queremos aparecer en buscadores y en respuestas de IA.
User-agent: *
Allow: /
Disallow: /404.html

# Buscadores y asistentes de IA: acceso explícitamente permitido (GEO)
${AI_BOTS.map((b) => `User-agent: ${b}\nAllow: /`).join('\n\n')}

Sitemap: ${abs('/sitemap.xml')}
` : `User-agent: *\nDisallow: /\n`);

const zonasTxt = cfg.zonas.map((z) => z.val !== z.nombre ? `${z.nombre} (${z.val})` : z.nombre).join(', ');
const llms = `# ${cfg.nombre}

> ${cfg.nombre} es una empresa instaladora eléctrica de ${cfg.ciudad} (${cfg.direccion.comunidad}, España) especializada en acometidas eléctricas, aprobación y legalización de líneas, boletines eléctricos (Certificado de Instalación Eléctrica, CIE), aumentos de potencia, renovación de instalaciones de enlace (CGP, LGA, centralización de contadores) e instalaciones eléctricas completas. Trabaja en ${cfg.ciudad} y su área metropolitana y tramita los expedientes con la distribuidora ${cfg.distribuidora} e Industria.

## Datos del negocio
- Nombre: ${cfg.nombre} (también: ${cfg.alternateName.join(', ')})
- Actividad: electricista / empresa instaladora eléctrica en baja tensión
- Teléfono y WhatsApp: ${cfg.telefono} (${cfg.telefonoVisible}); el contacto preferente es WhatsApp: https://wa.me/${cfg.whatsapp}
${cfg.email ? `- Email: ${cfg.email}\n` : ''}- Zona de servicio: ${zonasTxt}; radio aproximado de ${cfg.radioServicioKm} km desde ${cfg.ciudad}
- Horario: ${cfg.horario.map((h) => `${h.texto} ${h.abre}-${h.cierra}`).join('; ')}
- Idiomas: castellano y valenciano
- Web: ${abs('/')}
- Clientes: particulares, comunidades de propietarios, administradores de fincas, comercios, naves industriales, promotoras y constructoras

## Servicios
${SERVICIOS.map((s) => `- [${s.nombre}](${abs(`/servicios/${s.slug}/`)}): ${T(s.resumen)}`).join('\n')}

## Zonas
${cfg.zonas.map((z) => `- [Electricista en ${z.nombre}](${abs(`/electricista/${z.slug}/`)}): ${z.tipico.join('; ')}`).join('\n')}

## Guías
${GUIAS.map((g) => `- [${g.h1}](${abs(`/guias/${g.slug}/`)}): ${T(g.description)}`).join('\n')}
- [Glosario eléctrico](${abs('/glosario-electrico/')}): definiciones de acometida, CGP, LGA, CIE, CUPS, etc.

## Optional
- [Preguntas frecuentes](${abs('/preguntas-frecuentes/')})
- [Sobre nosotros](${abs('/sobre-nosotros/')})
- [Contacto](${abs('/contacto/')})
- [Versión completa para IA](${abs('/llms-full.txt')})
`;
write('llms.txt', llms);

const md = (h) => T(h).replace(/<li>/g, '\n- ').replace(/<\/(p|h\d|ul|ol|table|tr)>/g, '\n').replace(/<(td|th)[^>]*>/g, ' | ').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
const full = [llms, '\n---\n',
  ...SERVICIOS.map((s) => `\n# ${T(s.h1)}\nURL: ${abs(`/servicios/${s.slug}/`)}\n\n${md(s.respuesta)}\n\n## Datos clave\n${s.puntosClave.map((x) => `- ${md(x)}`).join('\n')}\n\n${s.secciones.map((x) => `## ${T(x.h2)}\n${md(x.html)}`).join('\n\n')}\n\n## Qué incluye\n${s.incluye.map((x) => `- ${T(x)}`).join('\n')}\n\n## Proceso\n${s.pasos.map((x, i) => `${i + 1}. ${T(x.nombre)}: ${T(x.texto)}`).join('\n')}\n\n## Plazos\n${T(s.plazo)}\n\n## Preguntas frecuentes\n${s.faqs.map((f) => `**${T(f.q)}**\n${md(f.a)}`).join('\n\n')}\n`),
  ...GUIAS.map((g) => `\n# ${g.h1}\nURL: ${abs(`/guias/${g.slug}/`)} · Actualizado: ${g.actualizado}\n\n${md(g.respuesta)}\n\n${g.tldr.map((x) => `- ${T(x)}`).join('\n')}\n\n${g.secciones.map((x) => `## ${T(x.h2)}\n${md(x.html)}`).join('\n\n')}\n\n${g.faqs.map((f) => `**${T(f.q)}**\n${md(f.a)}`).join('\n\n')}\n`),
  ...cfg.zonas.map((z) => `\n# Electricista en ${z.nombre}\nURL: ${abs(`/electricista/${z.slug}/`)}\n\n${z.notas}\n\nTrabajos habituales: ${z.tipico.join('; ')}.\n`),
  `\n# Glosario eléctrico\n${GLOSARIO.map(([t, d]) => `- **${t}**: ${d}`).join('\n')}\n`,
].join('');
write('llms-full.txt', full);

write('site.webmanifest', JSON.stringify({ name: cfg.nombre, short_name: cfg.nombreCorto, start_url: '/', display: 'standalone', background_color: '#ffffff', theme_color: '#0d1b2e', lang: 'es-ES', icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }, { src: '/logo.png', sizes: '512x512', type: 'image/png' }] }, null, 2));
write(`${cfg.indexNowKey}.txt`, cfg.indexNowKey);

// Hosting: Apache/Hostinger (.htaccess) + Netlify/Cloudflare (_headers)
const host = new URL(cfg.url).host;
write('.htaccess', `# Generado por build.mjs
ErrorDocument 404 /404.html
Options -Indexes
RewriteEngine On
# HTTPS + dominio canónico (${host})
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} !^${host.replace(/\./g, '\\.')}$ [NC]
RewriteRule ^(.*)$ https://${host}/$1 [L,R=301]
<IfModule mod_deflate.c>
AddOutputFilterByType DEFLATE text/html text/css text/plain text/xml application/xml application/javascript application/json image/svg+xml application/manifest+json
</IfModule>
<IfModule mod_expires.c>
ExpiresActive On
ExpiresByType text/html "access plus 1 hour"
ExpiresByType image/png "access plus 1 year"
ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
<IfModule mod_headers.c>
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
<FilesMatch "\\.(txt)$">
Header set Content-Type "text/plain; charset=utf-8"
</FilesMatch>
</IfModule>
`);
write('_headers', `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Strict-Transport-Security: max-age=31536000; includeSubDomains\n/*.png\n  Cache-Control: public, max-age=31536000, immutable\n/img/*\n  Cache-Control: public, max-age=2592000\n/fonts/*\n  Cache-Control: public, max-age=31536000, immutable\n/*.txt\n  Content-Type: text/plain; charset=utf-8\n`);

// Estáticos
fs.cpSync('public', DIST, { recursive: true });

// ═══ Avisos de datos pendientes ═════════════════════════════════════════════
const faltan = [
  !cfg.perfiles.googleBusiness && 'perfiles.googleBusiness (URL de la ficha de Google)',
  !cfg.cif && 'cif (aviso legal)',
  !cfg.registroIndustrial && 'registroIndustrial (nº empresa instaladora)',
  !cfg.titular && 'titular (nombre del responsable → autoría E-E-A-T)',
  !cfg.email && 'email',
].filter(Boolean);
console.log(`✔ ${pages.length + 1} páginas generadas en ./dist (${cfg.indexable ? 'INDEXABLE' : 'NOINDEX'}) → ${cfg.url}`);
if (faltan.length) console.log(`ℹ Datos pendientes en site.config.mjs:\n  - ${faltan.join('\n  - ')}`);
