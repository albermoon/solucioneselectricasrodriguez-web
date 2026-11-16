# Web · Soluciones Eléctricas Rodríguez (Valencia)

Web estática pensada para **posicionar en Google (SEO local)** y **aparecer en respuestas de IA (GEO: ChatGPT, Perplexity, Google AI Overviews, Copilot)**.
Sin dependencias, sin cookies y con un solo fichero de datos: [`site.config.mjs`](site.config.mjs).

```bash
npm run build      # genera ./dist (40 páginas + sitemap, robots, llms.txt…)
npm run dev        # build + servidor local en http://localhost:4321
npm run check      # auditoría SEO: títulos, descripciones, H1, JSON-LD, enlaces rotos
npm run images     # regenera og.png e iconos (Chrome headless)
npm run indexnow   # tras publicar: avisa a Bing/Copilot de todas las URLs
```

## Publicación (gratis)

- **Hosting:** GitHub Pages, gratis y con HTTPS. Cada `git push` a `main` ejecuta `.github/workflows/deploy.yml`, que genera la web, pasa `scripts/check.mjs` (si hay errores SEO no publica) y la sube.
- **Dominio:** `solucioneselectricasrodriguez.es` (Hostinger). DNS en Hostinger: `@` → A/AAAA de GitHub Pages (185.199.108-111.153); `www` → CNAME `albermoon.github.io`. La versión canónica es `https://www.solucioneselectricasrodriguez.es`.
- **Cambiar algo:** edita `site.config.mjs` o `src/data/*.mjs` (también desde la web de GitHub) → commit → publicado en ~1 minuto.
- Si algún día se pasa a hosting de Hostinger, sube `dist/`: ya incluye `.htaccess`.

## Contacto: todo va a WhatsApp

Los botones, la barra fija del móvil, el botón flotante y el formulario abren WhatsApp con el **+34 647 41 95 23** y el mensaje ya escrito (nombre, municipio, servicio y texto). La web no guarda datos, así que no necesita banner de cookies.

## Qué incluye la web (on-page)

| Área | Qué se ha hecho |
|---|---|
| Arquitectura | Home · 10 servicios · 12 zonas (`/electricista/<municipio>/`) · 6 guías · glosario · FAQ · contacto · sobre nosotros |
| SEO local | El nombre, el teléfono y la zona salen de un único sitio y son idénticos en todas las páginas y en el schema. Páginas de municipio con contenido propio (DANA en l’Horta Sud, polígonos de Paterna, urbanizaciones de Torrent…) |
| Schema.org | `@graph` enlazado: `Electrician` (areaServed, horario, catálogo de servicios, knowsAbout, credenciales), `WebSite`, `Service`, `HowTo`, `FAQPage`, `Article`, `BreadcrumbList`, `DefinedTermSet`, `Speakable` |
| GEO (IA) | Bloque de respuesta directa al principio de cada página, datos clave en lista, tablas comparativas, normativa enlazada al BOE (enlaces verificados), fechas de actualización, `llms.txt` + `llms-full.txt`, robots.txt que permite explícitamente GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot y Bingbot |
| Rendimiento | HTML estático con el CSS dentro de la página, sin fuentes web, iconos SVG en línea y ~1 KB de JS → Core Web Vitals en verde |
| Técnico | canonical, Open Graph con imagen 1200×630, sitemap.xml con lastmod, 404, HTTPS y dominio canónico por `.htaccess`, IndexNow, manifest |

## ⚠️ Antes de publicar: completar en `site.config.mjs`

1. **`url`**: el dominio definitivo. Recomendación: `solucioneselectricasrodriguez.es` (marca exacta) o `electricistarodriguez.es`.
2. **`horario`**: tiene que coincidir con el de Google Business Profile.
3. **`titular`, `cif`, `registroIndustrial`**: aviso legal (obligatorio por LSSI) y autoría de las guías, lo que refuerza la confianza (E-E-A-T).
4. **`perfiles.googleBusiness`** y redes sociales: el `sameAs` permite que Google y las IA relacionen la web con la ficha.
5. **`categorias`**: añade IBTE o LAT si la empresa tiene esas habilitaciones (para líneas de media tensión es clave).
6. Revisa las **zonas** (añade o quita municipios) y que los servicios se ajusten a lo que hacéis de verdad.

## Plan SEO/GEO fuera de la web (lo que más influye en el SEO local)

### Semana 1: lo imprescindible
La ficha ya existe: https://maps.google.com/?cid=4392986678764536654 (5,0 ★, 4 reseñas, categoría *Electricista*, **sin web**). La web ya enlaza a ella y usa su mismo horario.
- [ ] Con la cuenta de Gmail que gestiona la ficha: **Editar perfil → Contacto → Sitio web** → pega el dominio cuando la web esté publicada.
- [ ] Rellena lo que falta en la ficha: descripción, servicios, zona de servicio (los 12 municipios), fotos de obras, el enlace de WhatsApp en *Perfiles en redes sociales* y el año de apertura.
- [ ] **Google Business Profile**, resto de ajustes: Categoría principal *Electricista*; secundarias *Contratista eléctrico* y *Servicio de reparación eléctrica*. Zona de servicio: los 12 municipios. Nombre **exacto**: `Soluciones Eléctricas Rodríguez`, sin añadir palabras clave, porque Google lo penaliza. Da de alta cada servicio con su descripción y activa el botón de WhatsApp/chat.
- [ ] **Google Search Console**: verifica el dominio y envía `sitemap.xml`.
- [ ] **Bing Webmaster Tools**: importa desde Search Console y ejecuta `npm run indexnow`. Bing alimenta Copilot y la búsqueda de ChatGPT.
- [ ] **Apple Business Connect** (Siri y Mapas de Apple) y **Bing Places**.

### Mes 1: citas NAP (mismos datos en todas partes)
Páginas Amarillas, Habitissimo, Cronoshare, Starofservice, Yelp, QDQ, Infoisinfo, Cylex, Hotfrog, Facebook e Instagram (perfil de empresa). Usa siempre el mismo nombre, el teléfono `647 41 95 23` y la zona `Valencia`.

### Continuo: reseñas y autoridad
- [ ] Pide reseña en Google a **cada cliente** al terminar (manda el enlace corto de la ficha por WhatsApp). Para el SEO local y las IA ayuda mucho que el cliente nombre el trabajo y el municipio, p. ej. «acometida en Paterna».
- [ ] Responde a todas las reseñas.
- [ ] Publica en la ficha de Google 1-2 veces al mes con fotos reales de obras (acometidas, centralizaciones, cuadros).
- [ ] Busca enlaces locales: administradores de fincas, constructoras y arquitectos con los que trabajáis, asociaciones (p. ej. la asociación provincial de instaladores) y prensa local.
- [ ] Añade una guía nueva al mes en `src/data/guias.mjs`. Ideas: «Qué hacer con la instalación eléctrica tras una inundación», «Cómo pedir luz para una parcela en la huerta», «Plazos de i-DE para una acometida».
- [ ] Haz fotos reales del equipo y de las obras y añádelas a la web: es la mejora de E-E-A-T que más se nota.

### Medir
- Search Console: impresiones por municipio («electricista paterna», «acometida valencia»…).
- Ficha de Google: clics en llamar y en WhatsApp.
- GEO: pregunta cada mes a ChatGPT, Perplexity y Gemini «¿Qué electricista en Valencia hace acometidas?» y apunta si os citan.
