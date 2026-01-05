#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Liste des composants HTML à nettoyer
const htmlFilesToClean = [
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

let totalCleaned = 0;
let totalLinesRemoved = 0;

console.log('🧹 Nettoyage des sections FAQ HTML...\n');

htmlFilesToClean.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  ${filePath} - Fichier non trouvé`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  const originalLines = content.split('\n').length;

  // Extraire le titre de la section FAQ si disponible
  const titleMatch = content.match(/<section[^>]*class=["']faq-section[^"']*["'][^>]*>[\s\S]*?<h2[^>]*>(.*?)<\/h2>/i);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').replace(/&[^;]+;/g, '').trim() : 'FAQ';

  // Remplacer toute la section FAQ par le nouveau composant
  // Pattern qui match <section class="faq-section ...">...</section>
  const faqSectionRegex = /<section[^>]*class=["']faq-section[^"']*["'][^>]*>[\s\S]*?<\/section>/gi;

  // Utiliser des guillemets doubles pour éviter les problèmes avec les apostrophes
  const replacement = `<app-faq-section
    [title]="&quot;${title}&quot;"
    [faqItems]="faqItems"
    [ariaLabel]="&quot;Foire aux questions&quot;">
  </app-faq-section>`;

  content = content.replace(faqSectionRegex, replacement);

  const newLines = content.split('\n').length;
  const linesRemoved = originalLines - newLines;

  if (linesRemoved > 0) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ ${filePath} - ${linesRemoved} lignes supprimées`);
    totalCleaned++;
    totalLinesRemoved += linesRemoved;
  } else {
    console.log(`ℹ️  ${filePath} - Déjà nettoyé ou pas de section FAQ trouvée`);
  }
});

console.log('\n' + '─'.repeat(60));
console.log(`\n📊 RÉSUMÉ`);
console.log(`Fichiers nettoyés: ${totalCleaned}/${htmlFilesToClean.length}`);
console.log(`Lignes supprimées: ${totalLinesRemoved}`);
console.log('\n✅ Nettoyage HTML terminé !');
