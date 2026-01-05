#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const SRC_PATH = path.join(__dirname, 'src', 'app');
const DRY_RUN = process.argv.includes('--dry-run');
const VERBOSE = process.argv.includes('--verbose');

console.log('🚀 Migration des simulateurs vers composants génériques');
console.log('====================================================\n');

if (DRY_RUN) {
  console.log('⚠️  MODE DRY-RUN : Aucun fichier ne sera modifié\n');
}

// Statistiques
let stats = {
  processed: 0,
  migrated: 0,
  skipped: 0,
  errors: 0,
  linesRemoved: 0
};

/**
 * Trouve tous les fichiers .component.ts récursivement
 */
function findComponentFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Ignorer node_modules et dist
      if (!file.includes('node_modules') && !file.includes('dist')) {
        findComponentFiles(filePath, fileList);
      }
    } else if (file.endsWith('.component.ts')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Extrait les questions/réponses du JSON-LD FAQPage
 */
function extractFaqFromJsonLd(content) {
  const faqItems = [];

  // Chercher le JSON-LD FAQPage
  const jsonLdMatch = content.match(/const\s+\w+\s*=\s*\{[^}]*['"]@type['"]\s*:\s*['"]FAQPage['"]\s*,[\s\S]*?mainEntity\s*:\s*\[([\s\S]*?)\]\s*\}/);

  if (!jsonLdMatch) return null;

  const mainEntityContent = jsonLdMatch[1];

  // Extraire chaque question/réponse
  const questionMatches = mainEntityContent.matchAll(/\{[\s\S]*?name\s*:\s*['"]([^'"]*?)['"][\s\S]*?text\s*:\s*['"]([^'"]*?)['"][\s\S]*?\}/g);

  for (const match of questionMatches) {
    faqItems.push({
      question: match[1].replace(/\\'/g, "'"),
      answer: match[2].replace(/\\'/g, "'")
    });
  }

  return faqItems.length > 0 ? faqItems : null;
}

/**
 * Vérifie si le composant utilise déjà FaqSectionComponent
 */
function alreadyMigrated(content) {
  return content.includes('FaqSectionComponent') || content.includes('faqItems:');
}

/**
 * Ajoute les imports nécessaires
 */
function addImports(content) {
  let modified = content;

  // Vérifier si les imports existent déjà
  if (!content.includes('FaqSectionComponent')) {
    // Trouver la dernière ligne d'import
    const lastImportMatch = content.match(/import\s+{[^}]+}\s+from\s+['""][^'"]+['""];?\s*$/m);

    if (lastImportMatch) {
      const insertPos = content.lastIndexOf(lastImportMatch[0]) + lastImportMatch[0].length;
      const newImport = "\nimport { FaqSectionComponent, FaqItem } from '../../shared/faq-section/faq-section.component';";
      modified = content.slice(0, insertPos) + newImport + content.slice(insertPos);
    }
  }

  return modified;
}

/**
 * Ajoute la propriété faqItems
 */
function addFaqItemsProperty(content, faqItems) {
  // Trouver où insérer (après les autres propriétés, avant constructor)
  const constructorMatch = content.match(/constructor\s*\(/);

  if (!constructorMatch) return content;

  const insertPos = content.lastIndexOf('\n', content.indexOf(constructorMatch[0]));

  const faqItemsCode = `
  faqItems: FaqItem[] = [
${faqItems.map(item => `    {
      question: '${item.question.replace(/'/g, "\\'")}',
      answer: '${item.answer.replace(/'/g, "\\'")}'
    }`).join(',\n')}
  ];
`;

  return content.slice(0, insertPos) + faqItemsCode + content.slice(insertPos);
}

/**
 * Supprime le code JSON-LD manuel
 */
function removeJsonLdCode(content) {
  let modified = content;
  let linesRemoved = 0;

  // Supprimer la déclaration de variable JSON-LD
  const jsonLdVarRegex = /const\s+\w+JsonLd\s*=\s*\{[\s\S]*?@type['"]\s*:\s*['"]FAQPage['"][\s\S]*?\};\s*/;
  if (jsonLdVarRegex.test(modified)) {
    const match = modified.match(jsonLdVarRegex);
    linesRemoved += (match[0].match(/\n/g) || []).length;
    modified = modified.replace(jsonLdVarRegex, '');
  }

  // Supprimer le code Renderer2 pour JSON-LD
  const rendererRegex = /this\.jsonLdScript\s*=\s*this\.renderer\.createElement[\s\S]*?appendChild\(document\.head,\s*this\.jsonLdScript\);\s*\}/;
  if (rendererRegex.test(modified)) {
    const match = modified.match(rendererRegex);
    linesRemoved += (match[0].match(/\n/g) || []).length;
    modified = modified.replace(rendererRegex, '');
  }

  // Supprimer ngOnDestroy si vide après suppression JSON-LD
  const ngOnDestroyRegex = /ngOnDestroy\(\):\s*void\s*\{\s*if\s*\(this\.jsonLdScript\)[\s\S]*?\}\s*\}/;
  if (ngOnDestroyRegex.test(modified)) {
    const match = modified.match(ngOnDestroyRegex);
    linesRemoved += (match[0].match(/\n/g) || []).length;
    modified = modified.replace(ngOnDestroyRegex, '');
  }

  // Supprimer import Renderer2 et PLATFORM_ID si plus utilisés
  if (!modified.includes('this.renderer.') && !modified.includes('isPlatformBrowser')) {
    modified = modified.replace(/import\s*\{[^}]*Renderer2[^}]*\}\s*from\s*['"][^'"]+['"];?\s*\n?/g, '');
    modified = modified.replace(/import\s*\{[^}]*PLATFORM_ID[^}]*\}\s*from\s*['"][^'"]+['"];?\s*\n?/g, '');
    modified = modified.replace(/import\s*\{[^}]*isPlatformBrowser[^}]*\}\s*from\s*['"][^'"]+['"];?\s*\n?/g, '');

    // Supprimer de constructor
    modified = modified.replace(/@Inject\(PLATFORM_ID\)\s*private\s+platformId:\s*\w+,?\s*/g, '');
    modified = modified.replace(/private\s+renderer:\s*Renderer2,?\s*/g, '');
  }

  // Supprimer propriété jsonLdScript
  modified = modified.replace(/private\s+jsonLdScript\?:\s*HTMLScriptElement;\s*/g, '');

  // Supprimer OnDestroy de implements si présent
  modified = modified.replace(/,?\s*OnDestroy/g, '');
  modified = modified.replace(/implements\s+OnInit,\s*\{/, 'implements OnInit {');

  return { content: modified, linesRemoved };
}

/**
 * Migre le fichier HTML
 */
function migrateHtmlFile(tsFilePath, componentName) {
  const htmlFilePath = tsFilePath.replace('.component.ts', '.component.html');

  if (!fs.existsSync(htmlFilePath)) {
    if (VERBOSE) console.log(`  ⚠️  Fichier HTML non trouvé: ${htmlFilePath}`);
    return 0;
  }

  let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
  let linesRemoved = 0;

  // Chercher la section FAQ
  const faqSectionRegex = /<section\s+class="faq-section"[\s\S]*?<\/section>/;

  if (faqSectionRegex.test(htmlContent)) {
    const match = htmlContent.match(faqSectionRegex);
    linesRemoved = (match[0].match(/\n/g) || []).length;

    // Extraire le titre si possible
    const titleMatch = match[0].match(/<h2[^>]*>(.*?)<\/h2>/);
    const title = titleMatch ? titleMatch[1] : 'FAQ';

    const replacement = `<app-faq-section
    [title]="'${title}'"
    [faqItems]="faqItems"
    [ariaLabel]="'Foire aux questions'">
  </app-faq-section>`;

    htmlContent = htmlContent.replace(faqSectionRegex, replacement);

    if (!DRY_RUN) {
      fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');
    }

    if (VERBOSE) console.log(`  ✅ HTML migré: ${linesRemoved} lignes supprimées`);
  }

  return linesRemoved;
}

/**
 * Migre un composant
 */
function migrateComponent(filePath) {
  stats.processed++;

  const relativePath = path.relative(SRC_PATH, filePath);
  console.log(`\n📄 ${relativePath}`);

  let content = fs.readFileSync(filePath, 'utf8');

  // Vérifier si déjà migré
  if (alreadyMigrated(content)) {
    console.log('  ⏭️  Déjà migré - ignoré');
    stats.skipped++;
    return;
  }

  // Extraire FAQ du JSON-LD
  const faqItems = extractFaqFromJsonLd(content);

  if (!faqItems || faqItems.length === 0) {
    if (VERBOSE) console.log('  ℹ️  Pas de FAQ trouvée - ignoré');
    stats.skipped++;
    return;
  }

  console.log(`  📝 ${faqItems.length} questions FAQ trouvées`);

  try {
    // Ajouter imports
    content = addImports(content);

    // Ajouter faqItems
    content = addFaqItemsProperty(content, faqItems);

    // Supprimer code JSON-LD
    const { content: newContent, linesRemoved: tsLines } = removeJsonLdCode(content);
    content = newContent;

    // Migrer HTML
    const componentName = path.basename(filePath, '.component.ts');
    const htmlLines = migrateHtmlFile(filePath, componentName);

    const totalLines = tsLines + htmlLines;
    stats.linesRemoved += totalLines;

    // Sauvegarder
    if (!DRY_RUN) {
      fs.writeFileSync(filePath, content, 'utf8');
    }

    console.log(`  ✅ Migré avec succès (${totalLines} lignes supprimées)`);
    stats.migrated++;

  } catch (error) {
    console.error(`  ❌ Erreur: ${error.message}`);
    stats.errors++;
  }
}

/**
 * Main
 */
function main() {
  console.log('🔍 Recherche des composants...\n');

  const componentFiles = findComponentFiles(SRC_PATH);

  console.log(`📊 ${componentFiles.length} composants trouvés\n`);
  console.log('─'.repeat(60));

  // Migrer chaque composant
  componentFiles.forEach(migrateComponent);

  // Afficher statistiques
  console.log('\n' + '─'.repeat(60));
  console.log('\n📊 STATISTIQUES');
  console.log('================');
  console.log(`Composants traités:     ${stats.processed}`);
  console.log(`✅ Migrés:               ${stats.migrated}`);
  console.log(`⏭️  Ignorés:              ${stats.skipped}`);
  console.log(`❌ Erreurs:              ${stats.errors}`);
  console.log(`📉 Lignes supprimées:    ${stats.linesRemoved}`);

  if (DRY_RUN) {
    console.log('\n⚠️  MODE DRY-RUN : Aucun fichier n\'a été modifié');
    console.log('Relancez sans --dry-run pour appliquer les changements');
  } else {
    console.log('\n✅ Migration terminée !');
  }

  console.log('\n💡 Prochaines étapes:');
  console.log('1. Vérifier que le projet compile: ng build');
  console.log('2. Tester quelques simulateurs en local');
  console.log('3. Commit les changements');
}

// Exécuter
try {
  main();
} catch (error) {
  console.error('\n❌ ERREUR FATALE:', error.message);
  console.error(error.stack);
  process.exit(1);
}
