#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const htmlFiles = [
  'src/app/Finance/budget/budget.component.html',
  'src/app/Finance/impots-revenue/impots-revenue.component.html',
  'src/app/Finance/interer-composer/interer-composer.component.html',
  'src/app/Finance/simulateur-brut-net/simulateur-brut-net.component.html',
  'src/app/Immobilier/calcul-notaire/calcul-notaire.component.html',
  'src/app/Immobilier/comparateur-achat-location/comparateur-achat-location.component.html',
  'src/app/Immobilier/comparateur-sci-ir-is/comparateur-sci-ir-is.component.html',
  'src/app/Immobilier/lmnp-lmp/lmnp-lmp.component.html',
  'src/app/Immobilier/rendement/rendement.component.html',
  'src/app/Immobilier/simulateur-plus-value-immobiliere/simulateur-plus-value-immobiliere.component.html',
  'src/app/Immobilier/taux-emprunt/taux-emprunt.component.html',
  'src/app/Immobilier/tri-immo/tri-immo.component.html',
  'src/app/simulateur-defiscalisation/simulateur-defiscalisation.component.html',
  'src/app/simulateur-micro-entrepreneur/simulateur-micro-entrepreneur.component.html'
];

console.log('🔧 Correction des guillemets dans les templates HTML...\n');

let fixed = 0;

htmlFiles.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  ${filePath} - Fichier non trouvé`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let modified = false;

  // Remplacer [title]="'...'"] par [title]="&quot;...&quot;"]
  if (content.includes(`[title]="'`)) {
    content = content.replace(/\[title\]="'([^"]*?)"/g, (match, p1) => {
      return `[title]="&quot;${p1}&quot;"`;
    });
    modified = true;
  }

  // Remplacer [ariaLabel]="'...'" par [ariaLabel]="&quot;...&quot;"
  if (content.includes(`[ariaLabel]="'`)) {
    content = content.replace(/\[ariaLabel\]="'([^"]*?)"/g, (match, p1) => {
      return `[ariaLabel]="&quot;${p1}&quot;"`;
    });
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ ${filePath}`);
    fixed++;
  }
});

console.log(`\n✅ ${fixed} fichiers corrigés !`);
