// Avisa a Bing/Yandex/Seznam (IndexNow) de todas las URLs del sitemap tras publicar.
// Bing alimenta Copilot y la búsqueda de ChatGPT → indexación rápida = más GEO.
// Uso (con la web YA publicada en el dominio): npm run indexnow
import fs from 'node:fs';
import cfg from '../site.config.mjs';
const urls = [...fs.readFileSync('dist/sitemap.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const host = new URL(cfg.url).host;
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key: cfg.indexNowKey, keyLocation: `${cfg.url}/${cfg.indexNowKey}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} (${urls.length} URLs)`);
