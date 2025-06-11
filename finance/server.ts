import 'zone.js/node';
import { createServer } from 'http';
import { readFileSync } from 'fs';
import { join } from 'path';
import { renderModule } from '@angular/platform-server';
import { AppServerModule } from './src/app/app.server.module';
console.log('Starting server...');

const distFolder = join(process.cwd(), 'dist/finance/browser');
const indexHtml = readFileSync(join(distFolder, 'index.html'), 'utf8');
const PORT = process.env['PORT'] || 4000;

const server = createServer(async (req, res) => {
  try {
    const html = await renderModule(AppServerModule, {
      document: indexHtml,
      url: req.url,
    });
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } catch (e) {
    console.error(e);
    res.writeHead(500);
    res.end('Erreur serveur');
  }
});


server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
