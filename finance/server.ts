import 'zone.js/node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';

const app = express();

const distFolder = join(process.cwd(), 'dist/finance/browser');
const indexHtml = 'index.html';

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModule,
}));

app.set('view engine', 'html');
app.set('views', distFolder);

// Server static files from /browser
app.get('*.*', express.static(distFolder, {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render(indexHtml, { req });
});

export { app };
