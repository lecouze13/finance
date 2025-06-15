import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';

export function app(): express.Express {
  const server = express();

  // Chemin vers le dossier server (ce fichier)
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  // Chemin vers le dossier des fichiers statiques du client (build navigateur)
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  // Chemin vers le fichier HTML server-side
  const indexHtml = join(serverDistFolder, 'index.server.html');

  // Instance du moteur Angular Universal
  const commonEngine = new CommonEngine();

  // Config Express
  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Servir les fichiers statiques du build client (css, js, assets...)
  server.get(
    '*.*',
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: false, // Ne sert pas index.html ici pour éviter conflit avec SSR
    })
  );

  // Toutes les autres routes sont rendues via Angular Universal
  server.get('*', (req, res, next) => {
    // Construction de l'URL complète demandée
    const protocol = req.protocol;
    const host = req.get('host');
    const url = `${protocol}://${host}${req.originalUrl}`;

    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
      })
      .then((html) => {
        res.send(html);
      })
      .catch((err) => {
        console.error('SSR rendering error:', err);
        next(err);
      });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Démarre le serveur si ce fichier est exécuté directement
if (import.meta.url === process.argv[1] || import.meta.url.endsWith(process.argv[1])) {
  run();
}
