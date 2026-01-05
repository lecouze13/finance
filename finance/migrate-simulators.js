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
 * Extrait les questions/réponses du JSON-LD FAQPage (format JSON.stringify)
 */
function extractFaqFromJsonLd(content) {
  const faqItems = [];

  // Pattern 1: JSON.stringify avec FAQPage
  const jsonStringifyMatch = content.match(/JSON\.stringify\(\s*\{[\s\S]*?"@type":\s*"FAQPage"[\s\S]*?"mainEntity":\s*\[([\s\S]*?)\]\s*\}\s*\)/);

  if (jsonStringifyMatch) {
    const mainEntityContent = jsonStringifyMatch[1];

    // Extraire chaque question/réponse - format avec "name" et "text"
    const questionRegex = /\{\s*"@type":\s*"Question"[\s\S]*?"name":\s*"([^"]+)"[\s\S]*?"text":\s*"([^"]+)"[\s\S]*?\}/g;

    let match;
    while ((match = questionRegex.exec(mainEntityContent)) !== null) {
      faqItems.push({
        question: match[1].replace(/\\"/g, '"').replace(/\\'/g, "'"),
        answer: match[2].replace(/\\"/g, '"').replace(/\\'/g, "'")
      });
    }
  }

  // Pattern 2: Variable const avec FAQPage (ancien format)
  if (faqItems.length === 0) {
    const constMatch = content.match(/const\s+\w+\s*=\s*\{[\s\S]*?['"]@type['"]\s*:\s*['"]FAQPage['"][\s\S]*?mainEntity\s*:\s*\[([\s\S]*?)\]\s*\}/);
    if (constMatch) {
      const mainEntityContent = constMatch[1];
      const questionMatches = mainEntityContent.matchAll(/\{[\s\S]*?name\s*:\s*['"]([^'"]*?)['"][\s\S]*?text\s*:\s*['"]([^'"]*?)['"][\s\S]*?\}/g);

      for (const match of questionMatches) {
        faqItems.push({
          question: match[1].replace(/\\'/g, "'"),
          answer: match[2].replace(/\\'/g, "'")
        });
      }
    }
  }

  return faqItems.length > 0 ? faqItems : null;
}

/**
 * Vérifie si le composant utilise déjà FaqSectionComponent
 */
function alreadyMigrated(content) {
  return content.includes('FaqSectionComponent') ||
         (content.includes('faqItems:') && content.includes('FaqItem[]'));
}

/**
 * Vérifie si le composant a du JSON-LD FAQ à migrer
 */
function hasFaqJsonLd(content) {
  return content.includes('"FAQPage"') || content.includes("'FAQPage'");
}

/**
 * Calcule le chemin relatif pour l'import selon la profondeur
 */
function getImportPath(filePath) {
  const relativePath = path.relative(SRC_PATH, filePath);
  const depth = relativePath.split(path.sep).length - 1;

  if (depth === 0) return './shared/faq-section/faq-section.component';
  if (depth === 1) return '../shared/faq-section/faq-section.component';
  return '../../shared/faq-section/faq-section.component';
}

/**
 * Ajoute les imports nécessaires
 */
function addImports(content, filePath) {
  let modified = content;

  if (!content.includes('FaqSectionComponent')) {
    const importPath = getImportPath(filePath);

    // Trouver la dernière ligne d'import
    const importMatches = content.match(/^import\s+.*?;$/gm);
    if (importMatches && importMatches.length > 0) {
      const lastImport = importMatches[importMatches.length - 1];
      const insertPos = content.lastIndexOf(lastImport) + lastImport.length;
      const newImport = `\nimport { FaqSectionComponent, FaqItem } from '${importPath}';`;
      modified = content.slice(0, insertPos) + newImport + content.slice(insertPos);
    }
  }

  return modified;
}

/**
 * Ajoute la propriété faqItems avant le constructor
 */
function addFaqItemsProperty(content, faqItems) {
  // Trouver la position du constructor
  const constructorMatch = content.match(/\bconstructor\s*\(/);
  if (!constructorMatch) return content;

  const constructorIndex = content.indexOf(constructorMatch[0]);

  // Trouver la fin de la dernière propriété avant constructor (chercher le dernier ;)
  let insertPos = constructorIndex;
  // Chercher la ligne précédente
  const beforeConstructor = content.slice(0, constructorIndex);
  const lastNewLine = beforeConstructor.lastIndexOf('\n');
  insertPos = lastNewLine;

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
  const originalLineCount = content.split('\n').length;

  // Supprimer le bloc JSON.stringify complet avec FAQPage
  // Pattern: this.jsonLdScript.text = JSON.stringify({...FAQPage...});
  const jsonStringifyRegex = /this\.jsonLdScript\.text\s*=\s*JSON\.stringify\(\s*\{[\s\S]*?"@type":\s*"FAQPage"[\s\S]*?\}\s*\);?\s*/g;
  modified = modified.replace(jsonStringifyRegex, '');

  // Supprimer le bloc if (isPlatformBrowser) complet si il ne contient que du JSON-LD
  const platformBrowserRegex = /if\s*\(isPlatformBrowser\(this\.platformId\)\)\s*\{\s*(?:if\s*\(!document\.getElementById\([^)]+\)\)\s*\{)?\s*this\.jsonLdScript\s*=\s*this\.renderer\.createElement\([^)]+\);[\s\S]*?this\.renderer\.appendChild\(document\.head,\s*this\.jsonLdScript\);?\s*\}?\s*\}/g;
  modified = modified.replace(platformBrowserRegex, '');

  // Supprimer les lignes individuelles liées au JSON-LD
  modified = modified.replace(/this\.jsonLdScript\.type\s*=\s*['"][^'"]+['"];?\s*\n?/g, '');
  modified = modified.replace(/this\.jsonLdScript\.id\s*=\s*['"][^'"]+['"];?\s*\n?/g, '');
  modified = modified.replace(/this\.renderer\.appendChild\(document\.head,\s*this\.jsonLdScript\);?\s*\n?/g, '');

  // Supprimer la déclaration de propriété jsonLdScript
  modified = modified.replace(/\s*private\s+jsonLdScript\??\s*:\s*HTMLScriptElement;?\s*\n?/g, '\n');

  // Supprimer ngOnDestroy si seulement pour JSON-LD
  const ngOnDestroyRegex = /ngOnDestroy\(\)\s*(?::\s*void)?\s*\{\s*(?:if\s*\(this\.jsonLdScript\)\s*\{)?\s*this\.renderer\.removeChild\(document\.head,\s*this\.jsonLdScript\);?\s*\}?\s*\}/g;
  modified = modified.replace(ngOnDestroyRegex, '');

  // Nettoyer les imports inutilisés
  if (!modified.includes('this.renderer.') && !modified.includes('Renderer2')) {
    // Supprimer Renderer2 de l'import
    modified = modified.replace(/,\s*Renderer2/g, '');
    modified = modified.replace(/Renderer2\s*,\s*/g, '');
    modified = modified.replace(/import\s*\{\s*Renderer2\s*\}\s*from\s*['"][^'"]+['"];?\s*\n?/g, '');

    // Supprimer du constructor
    modified = modified.replace(/,?\s*private\s+renderer:\s*Renderer2/g, '');
    modified = modified.replace(/private\s+renderer:\s*Renderer2\s*,?\s*/g, '');
  }

  if (!modified.includes('isPlatformBrowser')) {
    modified = modified.replace(/,\s*isPlatformBrowser/g, '');
    modified = modified.replace(/isPlatformBrowser\s*,\s*/g, '');
    modified = modified.replace(/import\s*\{\s*isPlatformBrowser\s*\}\s*from\s*['"][^'"]+['"];?\s*\n?/g, '');
  }

  if (!modified.includes('PLATFORM_ID') && !modified.includes('platformId')) {
    modified = modified.replace(/,\s*PLATFORM_ID/g, '');
    modified = modified.replace(/PLATFORM_ID\s*,\s*/g, '');
    modified = modified.replace(/import\s*\{\s*PLATFORM_ID\s*\}\s*from\s*['"][^'"]+['"];?\s*\n?/g, '');
    modified = modified.replace(/@Inject\(PLATFORM_ID\)\s*private\s+platformId:\s*\w+\s*,?\s*/g, '');
  }

  // Supprimer OnDestroy si plus utilisé
  if (!modified.includes('ngOnDestroy')) {
    modified = modified.replace(/,\s*OnDestroy/g, '');
    modified = modified.replace(/OnDestroy\s*,\s*/g, '');
    modified = modified.replace(/implements\s+OnInit\s*,\s*OnDestroy/g, 'implements OnInit');
  }

  // Nettoyer les imports vides
  modified = modified.replace(/import\s*\{\s*\}\s*from\s*['"][^'"]+['"];?\s*\n?/g, '');

  // Nettoyer les lignes vides multiples
  modified = modified.replace(/\n{3,}/g, '\n\n');

  const newLineCount = modified.split('\n').length;
  linesRemoved = originalLineCount - newLineCount;

  return { content: modified, linesRemoved };
}

/**
 * Migre le fichier HTML
 */
function migrateHtmlFile(tsFilePath) {
  const htmlFilePath = tsFilePath.replace('.component.ts', '.component.html');

  if (!fs.existsSync(htmlFilePath)) {
    if (VERBOSE) console.log(`  ⚠️  Fichier HTML non trouvé`);
    return 0;
  }

  let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
  let linesRemoved = 0;

  // Chercher la section FAQ avec différents patterns
  const faqPatterns = [
    /<section\s+class="faq-section"[^>]*>[\s\S]*?<\/section>/g,
    /<section[^>]*class="faq-section"[^>]*>[\s\S]*?<\/section>/g,
    /<div\s+class="faq-section"[^>]*>[\s\S]*?<\/div>/g
  ];

  for (const pattern of faqPatterns) {
    if (pattern.test(htmlContent)) {
      const matches = htmlContent.match(pattern);
      if (matches) {
        for (const match of matches) {
          linesRemoved += (match.match(/\n/g) || []).length;

          // Extraire le titre si possible
          const titleMatch = match.match(/<h2[^>]*>(.*?)<\/h2>/);
          const title = titleMatch ? titleMatch[1].trim() : 'FAQ';

          const replacement = `<app-faq-section
    [title]="'${title}'"
    [faqItems]="faqItems"
    [ariaLabel]="'Foire aux questions'">
  </app-faq-section>`;

          htmlContent = htmlContent.replace(match, replacement);
        }
      }
    }
  }

  if (linesRemoved > 0 && !DRY_RUN) {
    fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');
    if (VERBOSE) console.log(`  ✅ HTML migré: ${linesRemoved} lignes`);
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

  // Vérifier si contient du JSON-LD FAQ
  if (!hasFaqJsonLd(content)) {
    if (VERBOSE) console.log('  ℹ️  Pas de FAQ JSON-LD');
    stats.skipped++;
    return;
  }

  // Extraire FAQ du JSON-LD
  const faqItems = extractFaqFromJsonLd(content);

  if (!faqItems || faqItems.length === 0) {
    if (VERBOSE) console.log('  ⚠️  FAQ trouvée mais extraction échouée');
    stats.skipped++;
    return;
  }

  console.log(`  📝 ${faqItems.length} questions FAQ extraites`);

  try {
    // Ajouter imports
    content = addImports(content, filePath);

    // Ajouter faqItems
    content = addFaqItemsProperty(content, faqItems);

    // Supprimer code JSON-LD
    const { content: newContent, linesRemoved: tsLines } = removeJsonLdCode(content);
    content = newContent;

    // Migrer HTML
    const htmlLines = migrateHtmlFile(filePath);

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
    if (VERBOSE) console.error(error.stack);
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
  } else if (stats.migrated > 0) {
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
