const { join } = require('path');
const { readFileSync } = require('fs');
const { renderModule } = require('@angular/platform-server');
const { AppServerModule } = require('./dist/finance-server/main'); // chemin relatif à adapter

const distFolder = join(__dirname, '../dist/finance/browser');
const indexHtml = readFileSync(join(distFolder, 'index.html'), 'utf8');

exports.handler = async function(event, context) {
  try {
    const url = event.rawUrl || event.path || '/';
    const html = await renderModule(AppServerModule, {
      document: indexHtml,
      url,
    });
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: html,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: 'Erreur serveur',
    };
  }
};
