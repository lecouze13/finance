#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Liste des composants à nettoyer (ceux qui ont été migrés)
const componentsToClean = [
  'src/app/Finance/budget/budget.component.ts',
  'src/app/Finance/impots-revenue/impots-revenue.component.ts',
  'src/app/Finance/interer-composer/interer-composer.component.ts',
  'src/app/Finance/simulateur-brut-net/simulateur-brut-net.component.ts',
  'src/app/Immobilier/calcul-notaire/calcul-notaire.component.ts',
  'src/app/Immobilier/comparateur-achat-location/comparateur-achat-location.component.ts',
  'src/app/Immobilier/comparateur-sci-ir-is/comparateur-sci-ir-is.component.ts',
  'src/app/Immobilier/lmnp-lmp/lmnp-lmp.component.ts',
  'src/app/Immobilier/rendement/rendement.component.ts',
  'src/app/Immobilier/simulateur-plus-value-immobiliere/simulateur-plus-value-immobiliere.component.ts',
  'src/app/Immobilier/taux-emprunt/taux-emprunt.component.ts',
  'src/app/Immobilier/tri-immo/tri-immo.component.ts',
  'src/app/simulateur-defiscalisation/simulateur-defiscalisation.component.ts',
  'src/app/simulateur-micro-entrepreneur/simulateur-micro-entrepreneur.component.ts'
];

let totalCleaned = 0;
let totalLinesRemoved = 0;

console.log('🧹 Nettoyage du code JSON-LD dupliqué...\n');

componentsToClean.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  ${filePath} - Fichier non trouvé`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  const originalLines = content.split('\n').length;

  // Supprimer le bloc complet JSON-LD avec JSON.stringify
  const jsonLdRegex = /const script = this\.renderer\.createElement\('script'\);[\s\S]*?this\.renderer\.appendChild\(document\.head, script\);?\s*\n*/g;
  content = content.replace(jsonLdRegex, '');

  // Supprimer les imports inutilisés
  if (!content.includes('this.renderer.') && !content.includes('Renderer2')) {
    // Supprimer Renderer2 de l'import @angular/core
    content = content.replace(/,\s*Renderer2/g, '');
    content = content.replace(/Renderer2\s*,\s*/g, '');

    // Supprimer du constructor
    content = content.replace(/,?\s*private renderer:\s*Renderer2/g, '');
    content = content.replace(/private\s+renderer:\s*Renderer2\s*,?\s*/g, '');
  }

  if (!content.includes('isPlatformBrowser')) {
    content = content.replace(/,\s*isPlatformBrowser/g, '');
    content = content.replace(/isPlatformBrowser\s*,\s*/g, '');
    content = content.replace(/import\s*\{\s*isPlatformBrowser\s*\}\s*from\s*['"][^'"]+['"];?\s*\n?/g, '');
  }

  if (!content.includes('PLATFORM_ID') && !content.includes('platformId')) {
    content = content.replace(/,\s*PLATFORM_ID/g, '');
    content = content.replace(/PLATFORM_ID\s*,\s*/g, '');
    content = content.replace(/import\s*\{\s*PLATFORM_ID\s*\}\s*from\s*['"][^'"]+['"];?\s*\n?/g, '');
    content = content.replace(/@Inject\(PLATFORM_ID\)\s*private\s+platformId:\s*\w+\s*,?\s*/g, '');
  }

  // Nettoyer les imports vides
  content = content.replace(/import\s*\{\s*\}\s*from\s*['"][^'"]+['"];?\s*\n?/g, '');

  // Nettoyer les lignes vides multiples
  content = content.replace(/\n{3,}/g, '\n\n');

  const newLines = content.split('\n').length;
  const linesRemoved = originalLines - newLines;

  if (linesRemoved > 0) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ ${filePath} - ${linesRemoved} lignes supprimées`);
    totalCleaned++;
    totalLinesRemoved += linesRemoved;
  } else {
    console.log(`ℹ️  ${filePath} - Déjà nettoyé`);
  }
});

console.log('\n' + '─'.repeat(60));
console.log(`\n📊 RÉSUMÉ`);
console.log(`Fichiers nettoyés: ${totalCleaned}/${componentsToClean.length}`);
console.log(`Lignes supprimées: ${totalLinesRemoved}`);
console.log('\n✅ Nettoyage terminé !');
