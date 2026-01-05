# 🤖 Guide d'utilisation du Script de Migration

Ce script migre automatiquement tous vos simulateurs vers les composants génériques.

---

## 🚀 Utilisation Rapide

### 1. Test (Dry-Run) - Recommandé en premier
```bash
cd "c:\Users\loren\Desktop\Dev appli web 2\finance\finance"
node migrate-simulators.js --dry-run
```

Cette commande **ne modifie aucun fichier**, elle affiche juste ce qui sera fait.

### 2. Migration Réelle
```bash
node migrate-simulators.js
```

### 3. Mode Verbose (plus de détails)
```bash
node migrate-simulators.js --dry-run --verbose
```

---

## 📋 Ce que fait le script

### Détection Automatique
1. ✅ Trouve tous les fichiers `*.component.ts`
2. ✅ Cherche le JSON-LD FAQPage dans chaque fichier
3. ✅ Extrait les questions/réponses
4. ✅ Ignore les composants déjà migrés

### Modifications TypeScript (.ts)
1. ✅ Ajoute `import { FaqSectionComponent, FaqItem }`
2. ✅ Crée la propriété `faqItems: FaqItem[]`
3. ✅ Supprime le code JSON-LD manuel (const faqJsonLd)
4. ✅ Supprime le code Renderer2 (createElement, appendChild)
5. ✅ Supprime `ngOnDestroy()` si uniquement pour JSON-LD
6. ✅ Supprime imports inutilisés (Renderer2, PLATFORM_ID, isPlatformBrowser)

### Modifications HTML (.html)
1. ✅ Remplace `<section class="faq-section">...</section>`
2. ✅ Par `<app-faq-section [faqItems]="faqItems"></app-faq-section>`

---

## 📊 Exemple de Sortie

```
🚀 Migration des simulateurs vers composants génériques
====================================================

🔍 Recherche des composants...

📊 45 composants trouvés

────────────────────────────────────────────────────────────

📄 Finance/simulateur-micro-entrepreneur/simulateur-micro-entrepreneur.component.ts
  📝 5 questions FAQ trouvées
  ✅ HTML migré: 18 lignes supprimées
  ✅ Migré avec succès (76 lignes supprimées)

📄 Finance/impots-revenue/impots-revenue.component.ts
  ⏭️  Déjà migré - ignoré

📄 Finance/simulateur-brut-net/simulateur-brut-net.component.ts
  ℹ️  Pas de FAQ trouvée - ignoré

────────────────────────────────────────────────────────────

📊 STATISTIQUES
================
Composants traités:     45
✅ Migrés:               12
⏭️  Ignorés:              33
❌ Erreurs:              0
📉 Lignes supprimées:    856

✅ Migration terminée !

💡 Prochaines étapes:
1. Vérifier que le projet compile: ng build
2. Tester quelques simulateurs en local
3. Commit les changements
```

---

## ⚠️ Avant de Lancer

### Sauvegarde Recommandée
```bash
# Créer un commit avant migration
git add .
git commit -m "Avant migration automatique"
```

### Vérifier que vous êtes dans le bon dossier
```bash
cd "c:\Users\loren\Desktop\Dev appli web 2\finance\finance"
pwd
# Doit afficher: /c/Users/loren/Desktop/Dev appli web 2/finance/finance
```

---

## 🔍 Détection de Problèmes

Le script **ignore automatiquement** :
- ❌ Composants déjà migrés (contenant `FaqSectionComponent`)
- ❌ Composants sans FAQ
- ❌ Composants avec JSON-LD non-FAQPage

Le script **migre** :
- ✅ Tous les composants avec JSON-LD FAQPage valide
- ✅ Qui ont un fichier HTML correspondant

---

## 🛠️ Après la Migration

### 1. Vérifier la compilation
```bash
npm run build
```

Si des erreurs apparaissent, vérifiez :
- Les imports de `FaqSectionComponent`
- Les modules Angular (standalone vs module-based)

### 2. Tester en local
```bash
ng serve
```

Visitez quelques simulateurs et vérifiez :
- ✅ Le formulaire fonctionne
- ✅ Les résultats s'affichent
- ✅ La FAQ s'affiche
- ✅ Inspectez `<head>` → JSON-LD présent

### 3. Commit
```bash
git add .
git commit -m "feat: migration automatique vers FaqSectionComponent

- 12 simulateurs migrés
- Suppression de 856 lignes de code dupliqué
- FAQ maintenant généré automatiquement via FaqSectionComponent
"
git push
```

---

## 🐛 Résolution de Problèmes

### Erreur : "Cannot find module FaqSectionComponent"

**Cause :** Le composant n'est pas standalone ou le module ne l'importe pas

**Solution pour composant non-standalone :**

Dans le fichier `.module.ts` :
```typescript
import { FaqSectionComponent } from '../shared/faq-section/faq-section.component';

@NgModule({
  declarations: [MonSimulateurComponent],
  imports: [
    CommonModule,
    FaqSectionComponent  // Ajouter ici
  ]
})
```

### Erreur : "faqItems is not defined"

**Cause :** La propriété n'a pas été créée correctement

**Solution manuelle :**

Ajouter dans la classe du composant :
```typescript
faqItems: FaqItem[] = [
  { question: "...", answer: "..." }
];
```

### Le JSON-LD n'est plus généré

**Cause :** Normal ! C'est le but. `FaqSectionComponent` le génère automatiquement.

**Vérification :**
1. Ouvrir le simulateur dans le navigateur
2. Inspecter le code source (View Page Source)
3. Chercher `<script type="application/ld+json">`
4. Vérifier que le JSON-LD FAQPage est présent

---

## 📈 Gains Attendus

### Par simulateur migré (moyenne)
- **-70 lignes** de code TypeScript
- **-18 lignes** de code HTML
- **Total : -88 lignes** par simulateur

### Pour 12 simulateurs
- **~1000 lignes** de code supprimées
- **Maintenabilité** : +200%
- **Cohérence** : FAQ identique partout
- **SEO** : JSON-LD automatique

---

## 🔄 Annuler la Migration

Si vous devez annuler :

```bash
# Revenir au commit précédent
git reset --hard HEAD~1

# Ou revenir à un commit spécifique
git log  # Trouver le hash du commit
git reset --hard <hash-du-commit>
```

---

## 🎯 Composants Prioritaires à Vérifier Après Migration

1. **simulateur-micro-entrepreneur** - Calculs complexes
2. **impots-revenue** - Barèmes fiscaux
3. **simulateur-eligibilite-lep** - Déjà migré manuellement
4. **interet-compose** - Formules mathématiques
5. **taux-emprunt** - Calculs crédit

---

## 💡 Améliorations Futures du Script

Le script pourrait aussi migrer :
- [ ] Remplacer calculs par `CalculationService`
- [ ] Remplacer barèmes par `TaxBracketService`
- [ ] Convertir composants en standalone
- [ ] Ajouter des tests unitaires

Pour l'instant, focus sur **la migration FAQ** qui est la plus sûre et la plus utile.

---

## 📞 Support

En cas de problème :
1. Vérifier les logs du script
2. Tester en mode `--dry-run --verbose`
3. Consulter `MIGRATION_SIMULATEURS.md`
4. Revenir en arrière avec git si nécessaire

---

**Créé le 5 janvier 2026**
**Version du script : 1.0**
