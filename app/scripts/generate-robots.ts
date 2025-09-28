import { writeFile } from 'fs/promises';
import { resolve } from 'node:path';

const baseUrl = process.env.SITE_URL ?? 'https://ong-caes.web.app';

const robots = `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml\n`;

const targetPath = resolve(process.cwd(), 'public', 'robots.txt');

await writeFile(targetPath, robots, 'utf-8');
console.log(`robots.txt atualizado em ${targetPath}`);
