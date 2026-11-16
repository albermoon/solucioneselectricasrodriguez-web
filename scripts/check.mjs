// Auditoría SEO técnica de ./dist: npm run check
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve('dist');
const files = [];
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith('.html') && files.push(path.join(d, e.name)));
walk(root);
const seen = { title: new Map(), desc: new Map() };
let errors = 0, warns = 0;
const err = (f, m) => { errors++; console.log(`✖ ${f}: ${m}`); };
const warn = (f, m) => { warns++; console.log(`⚠ ${f}: ${m}`); };
for (const file of files) {
  const rel = '/' + path.relative(root, file).replace(/index\.html$/, '');
  const h = fs.readFileSync(file, 'utf8');
  const title = h.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  const desc = h.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  const noindex = /content="noindex/.test(h);
  const h1s = (h.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) err(rel, `${h1s} H1`);
  if (!title) err(rel, 'sin <title>');
  if (!desc) err(rel, 'sin meta description');
  if (!noindex) {
    if (title.length > 70) warn(rel, `title ${title.length} car. (Google corta ~60): "${title}"`);
    if (desc.length < 110 || desc.length > 165) warn(rel, `description ${desc.length} car.`);
    for (const [k, v] of [['title', title], ['desc', desc]]) { if (seen[k].has(v)) err(rel, `${k} duplicado con ${seen[k].get(v)}`); seen[k].set(v, rel); }
  }
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { JSON.parse(m[1]); } catch (e) { err(rel, 'JSON-LD inválido: ' + e.message); } }
  for (const m of h.matchAll(/(?:href|src)="(\/[^"#]*)/g)) {
    const t = m[1]; const f = path.join(root, t.endsWith('/') ? t + 'index.html' : t);
    if (!fs.existsSync(f)) err(rel, `enlace roto ${t}`);
  }
  for (const m of h.matchAll(/<img (?![^>]*alt=)/g)) err(rel, 'img sin alt');
}
console.log(`\n${files.length} páginas · ${errors} errores · ${warns} avisos`);
process.exit(errors ? 1 : 0);
