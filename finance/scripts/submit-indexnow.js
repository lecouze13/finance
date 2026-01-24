/**
 * Script pour soumettre les URLs à IndexNow
 * Usage: node scripts/submit-indexnow.js
 */

const https = require('https');

const config = {
  host: 'calculateurfinance.fr',
  key: '5eff9d59fe364d1f8cbed1faa0f26fe2',
  keyLocation: 'https://calculateurfinance.fr/5eff9d59fe364d1f8cbed1faa0f26fe2.txt'
};

// Liste de toutes les pages principales
const allPages = [
  '/',
  '/catalogue',
  '/simulateur-capacite-emprunt',
  '/simulateur-pret-immobilier',
  '/simulateur-frais-notaire',
  '/simulateur-rendement-locatif',
  '/simulateur-cashflow-immobilier',
  '/simulateur-per',
  '/simulateur-impot-revenu',
  '/simulateur-brut-net',
  '/simulateur-interet-compose',
  '/simulateur-retraite',
  '/comparateur-lmnp-lmp',
  '/comparateur-sci-ir-is',
  '/comparateur-pea-assurance-vie',
  '/simulateur-ptz',
  '/simulateur-viager',
  '/simulateur-succession',
  '/simulateur-rachat-credit',
  '/simulateur-frais-garde',
  '/simulateur-sasu-eurl',
  '/simulateur-epargne-objectif',
  '/simulateur-remboursement-anticipe',
  '/simulateur-pouvoir-achat',
  '/simulateur-credit-conso',
  '/simulateur-scpi',
  '/simulateur-sortie-pinel',
  '/simulateur-rachat-soulte',
  '/simulateur-passoire-thermique',
  '/simulateur-holding-vs-direct',
  '/simulateur-credit-relais',
  '/simulateur-donation',
  '/simulateur-charges-locatives',
  '/simulateur-freelance',
  '/simulateur-electricite-hphc',
  '/simulateur-dca-lumpsum',
  '/simulateur-crypto-fiscalite',
  '/simulateur-crowdfunding-immo',
  '/simulateur-leasing-voiture',
  '/simulateur-rachat-trimestres',
  '/simulateur-ppv',
  '/simulateur-interessement',
  '/simulateur-colocation',
  '/simulateur-renovation-energetique',
  '/simulateur-dividendes-salaire',
  '/simulateur-strategie-multi-biens',
  '/simulateur-arbitrage-immobilier',
  '/simulateur-stress-test-immo',
  '/simulateur-fire-immobilier',
  '/simulateur-allocations-familiales',
  '/a-propos',
  '/contact',
  '/methodologie',
  '/mentions-legales',
  '/politique-confidentialite',
  '/cookies'
];

// Convertir en URLs complètes
const urlList = allPages.map(page => `https://${config.host}${page}`);

const body = JSON.stringify({
  host: config.host,
  key: config.key,
  keyLocation: config.keyLocation,
  urlList: urlList
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body)
  }
};

console.log(`\n📤 Soumission de ${urlList.length} URLs à IndexNow...\n`);

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log('✅ Soumission réussie!');
      console.log(`   Status: ${res.statusCode}`);
      console.log(`   URLs soumises: ${urlList.length}`);
      console.log('\n📋 Pages soumises:');
      urlList.forEach(url => console.log(`   - ${url}`));
    } else {
      console.log(`❌ Erreur: Status ${res.statusCode}`);
      console.log(`   Response: ${data}`);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Erreur de requête:', error.message);
});

req.write(body);
req.end();
