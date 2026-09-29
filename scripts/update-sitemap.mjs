/**
 * update-sitemap.mjs
 * Run before deploying to keep sitemap.xml lastmod dates current.
 * Usage: node scripts/update-sitemap.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sitemapPath = join(__dirname, '../public/sitemap.xml');

const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

let sitemap = readFileSync(sitemapPath, 'utf-8');

// Replace all <lastmod>...</lastmod> dates with today's date
sitemap = sitemap.replace(/<lastmod>[\d-]+<\/lastmod>/g, `<lastmod>${today}</lastmod>`);

writeFileSync(sitemapPath, sitemap, 'utf-8');
console.log(`✅ sitemap.xml updated — all lastmod set to ${today}`);
