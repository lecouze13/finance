import 'zone.js/node';
import { createServer } from 'http';
import { readFileSync, existsSync, createReadStream } from 'fs';
import { join } from 'path';
import { renderModule } from '@angular/platform-server';
import { AppServerModule } from './src/app/app.server.module';

const distFolder = join(process.cwd(), 'dist/finance/browser');
const PORT = process.env['PORT'] || 4000;

const server = createServer((req, res) => {
  try {
    const url = req.url || '/';

    // Servir les fichiers statiques directement
    const filePath = join(distFolder, url);
    if (existsSync(filePath) && !url.endsWith('/')) {
      const fileStream = createReadStream(filePath);
      fileStream.pipe(res);
      return;
    }

    // Sinon, rendu Angular Universal
    const indexHtml = readFileSync(join(distFolder, 'index.html'), 'utf8');

    renderModule(AppServerModule, {
      document: indexHtml,
      url: url,
    }).then(html => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    }).catch(err => {
      console.error('Angular Universal render error:', err);
      res.writeHead(500);
      res.end('Erreur serveur');
    });

  } catch (e) {
    console.error('Server error:', e);
    res.writeHead(500);
    res.end('Erreur serveur');
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
