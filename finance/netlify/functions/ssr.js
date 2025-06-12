const { builder } = require('@netlify/functions');
const { AppServerModule } = require('../dist/finance-server/main.js');
const { ngExpressEngine } = require('@nguniversal/express-engine');
const express = require('express');
const path = require('path');

const app = express();

app.engine('html', ngExpressEngine({ bootstrap: AppServerModule }));
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '../dist/finance/browser'));

app.get('*.*', express.static(path.join(__dirname, '../dist/finance/browser')));

app.get('*', (req, res) => {
  res.render('index', { req });
});

exports.handler = builder(app);
