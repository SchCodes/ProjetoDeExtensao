import { writeFile } from 'fs/promises';
import { resolve } from 'node:path';

const baseUrl = process.env.SITE_URL ?? 'https://ong-caes.web.app';

const routes = [
  '/',
  '/adocao',
  '/doacoes',
  '/historias',
  '/parceiros',
  '/voluntario'
];

const buildSitemap = async () => {
  const updatedAt = new Date().toISOString();
  const body = routes
    .map((route) => {
      const priority = route === '/' ? '1.0' : '0.8';
      return `    <url>\n      <loc>${baseUrl}${route}</loc>\n      <lastmod>${updatedAt}</lastmod>\n      <changefreq>weekly</changefreq>\n      <priority>${priority}</priority>\n    </url>`;
    })
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`;

  const targetPath = resolve(process.cwd(), 'public', 'sitemap.xml');
  await writeFile(targetPath, sitemap, 'utf-8');
  console.log(`Sitemap gerado em ${targetPath}`);
};

buildSitemap();
