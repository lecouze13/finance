# 🔄 Migration des Simulateurs vers Composants Génériques

Ce document liste tous les simulateurs à migrer et les modifications nécessaires.

---

## 📊 Résumé

- **Total simulateurs** : 30+
- **✅ Déjà migrés** : 1 (APL - nouveau)
- **🔄 À migrer** : 29+
- **Temps estimé** : 15-30 min par simulateur

---

## 🎯 Objectifs de la Migration

### 1. Remplacer FAQ manuelle par `<app-faq-section>`
**Avant (50+ lignes) :**
```html
<section class="faq-section">
  <h2>FAQ</h2>
  <dl>
    <dt>Question ?</dt>
    <dd>Réponse</dd>
    <!-- ... répété x fois -->
  </dl>
</section>
```

```typescript
// Dans ngOnInit - 60+ lignes de JSON-LD
const faqJsonLd = { ... };
const script = this.renderer.createElement('script');
// ...
```

**Après (3 lignes) :**
```html
<app-faq-section [title]="'FAQ'" [faqItems]="faqItems"></app-faq-section>
```

```typescript
faqItems: FaqItem[] = [
  { question: "...", answer: "..." }
];
```

### 2. Utiliser `TaxBracketService` pour les calculs fiscaux
**Simulateurs concernés :** IR, IFI, LEP, Brut-Net, Micro-Entrepreneur

**Avant :**
```typescript
// Barèmes dupliqués dans chaque composant
private baremeIR = [...];
private calculerImpot() { /* logique complexe */ }
```

**Après :**
```typescript
constructor(private bareme: TaxBracketService) {}

calculer() {
  const impot = this.bareme.calculerImpotRevenu(revenu, parts);
}
```

### 3. Utiliser `CalculationService` pour les calculs financiers
**Simulateurs concernés :** Intérêts composés, crédit, rendement locatif

**Avant :**
```typescript
// Formules dupliquées
const interets = capital * Math.pow(1 + taux/100, duree);
```

**Après :**
```typescript
constructor(private calcul: CalculationService) {}

const resultat = this.calcul.calculerInteretsComposes(...);
```

---

## 📋 Liste des Simulateurs à Migrer

### PRIORITÉ HAUTE (utilise JSON-LD manuel)

#### 1. ✅ simulateur-eligibilite-lep
- **Status** : ✅ MIGRÉ
- **Services utilisés** : TaxBracketService, FaqSectionComponent
- **Gain** : -80 lignes

#### 2. 🔄 simulateur-micro-entrepreneur
- **Path** : `src/app/simulateur-micro-entrepreneur/`
- **À faire** :
  - [ ] Importer FaqSectionComponent
  - [ ] Utiliser TaxBracketService pour cotisations
  - [ ] Créer faqItems[]
  - [ ] Remplacer section FAQ dans HTML
- **JSON-LD actuel** : Oui (lignes 48-124)
- **Gain estimé** : -90 lignes

#### 3. 🔄 simulateur-brut-net
- **Path** : `src/app/Finance/simulateur-brut-net/`
- **À faire** :
  - [ ] Utiliser TaxBracketService.calculerCotisationsSalarie()
  - [ ] Ajouter FAQ avec FaqSectionComponent
- **Gain estimé** : -50 lignes

#### 4. 🔄 impots-revenue
- **Path** : `src/app/Finance/impots-revenue/`
- **À faire** :
  - [ ] Utiliser TaxBracketService.calculerImpotRevenu()
  - [ ] Utiliser TaxBracketService.getBaremeIR()
  - [ ] Ajouter FAQ
- **JSON-LD actuel** : Non
- **Gain estimé** : -100 lignes (barème + calculs)

#### 5. 🔄 simulateur-impot-fortune-immobiliere
- **Path** : `src/app/Finance/simulateur-impot-fortune-immobiliere/`
- **À faire** :
  - [ ] Utiliser TaxBracketService.calculerIFI()
  - [ ] Utiliser TaxBracketService.getBaremeIFI()
  - [ ] Ajouter FAQ
- **Gain estimé** : -80 lignes

#### 6. 🔄 interet-composer
- **Path** : `src/app/Finance/interer-composer/`
- **À faire** :
  - [ ] Utiliser CalculationService.calculerInteretsComposes()
  - [ ] Ajouter FAQ
- **Gain estimé** : -60 lignes

#### 7. 🔄 taux-emprunt (crédit immobilier)
- **Path** : `src/app/Immobilier/taux-emprunt/`
- **À faire** :
  - [ ] Utiliser CalculationService.calculerCoutCredit()
  - [ ] Ajouter FAQ
- **Gain estimé** : -50 lignes

#### 8. 🔄 rendement-locatif
- **Path** : `src/app/Immobilier/rendement/`
- **À faire** :
  - [ ] Utiliser CalculationService.calculerRendementBrut()
  - [ ] Utiliser CalculationService.calculerRendementNet()
  - [ ] Ajouter FAQ
- **Gain estimé** : -40 lignes

### PRIORITÉ MOYENNE (FAQ uniquement)

#### 9-30. Autres simulateurs
Tous les autres simulateurs doivent au minimum :
- [ ] Ajouter FaqSectionComponent si FAQ manquante
- [ ] Remplacer FAQ manuelle par composant

**Liste complète :**
- simulateur-retraite
- simulateur-independance-financiere
- simulateur-credit-lombard
- simulateur-dividend-fire
- simulateur-prime-activite
- budget-immobilier
- investissement-locatif
- cashflow-immobilier
- tri-immobilier
- comparateur-achat-location
- calcul-notaire
- lmnp-lmp
- comparateur-sci-ir-is
- simulateur-plus-value-immobiliere
- airbnb-vs-location
- simulateur-apport-vs-emprunt
- simulateur-import-location-nue
- simulateur-defiscalisation
- simulateur-dividende-entreprise

---

## 🔧 Template de Migration

### Étape 1 : Modifier le TypeScript

```typescript
// AJOUTER les imports
import { FaqSectionComponent, FaqItem } from '../../shared/faq-section/faq-section.component';
import { CalculationService } from '../../shared/services/calculation.service';
import { TaxBracketService } from '../../shared/services/tax-bracket.service';

@Component({
  // Si pas standalone, ajouter dans le module
  imports: [..., FaqSectionComponent]  // Pour standalone
})
export class MonSimulateurComponent {

  // AJOUTER la propriété FAQ
  faqItems: FaqItem[] = [
    {
      question: "Question 1 ?",
      answer: "Réponse complète avec tous les détails."
    },
    {
      question: "Question 2 ?",
      answer: "Autre réponse."
    }
  ];

  constructor(
    // ... imports existants
    private calcul: CalculationService,        // Si besoin
    private bareme: TaxBracketService          // Si besoin
  ) {}

  // SUPPRIMER le code JSON-LD manuel (lignes avec Renderer2, script, etc.)
  // SUPPRIMER ngOnDestroy si utilisé uniquement pour JSON-LD

  calculer() {
    // REMPLACER les calculs manuels par les services
    // Exemple IR :
    const impot = this.bareme.calculerImpotRevenu(revenu, parts);

    // Exemple crédit :
    const cout = this.calcul.calculerCoutCredit(montant, taux, duree);
  }
}
```

### Étape 2 : Modifier le HTML

```html
<!-- REMPLACER -->
<section class="faq-section">
  <h2>FAQ</h2>
  <dl>
    <dt>Question ?</dt>
    <dd>Réponse</dd>
  </dl>
</section>

<!-- PAR -->
<app-faq-section
  [title]="'FAQ - Mon Simulateur'"
  [faqItems]="faqItems"
  [ariaLabel]="'Foire aux questions sur mon simulateur'">
</app-faq-section>
```

### Étape 3 : Tester

```bash
ng serve
# Visiter http://localhost:4200/[route-du-simulateur]
# Vérifier :
# - Le formulaire fonctionne
# - Les résultats s'affichent
# - La FAQ s'affiche
# - Inspecter le <head> pour voir le JSON-LD généré
```

---

## 📈 Gains Attendus

### Par simulateur migré
- **Code supprimé** : 50-100 lignes
- **Maintenabilité** : +80%
- **SEO automatique** : JSON-LD sans effort
- **Cohérence** : Style FAQ identique partout

### Pour l'ensemble (30 simulateurs)
- **Total lignes supprimées** : ~2000 lignes
- **Barèmes centralisés** : 1 seul fichier à mettre à jour
- **Calculs cohérents** : Formules identiques partout

---

## ⚠️ Points d'Attention

### Ne PAS modifier si...
1. Le simulateur a une FAQ très spécifique avec mise en forme complexe
2. Le JSON-LD contient des types Schema.org autres que FAQPage
3. Les calculs sont trop spécifiques pour être génériques

### Tester après migration
- [ ] Formulaire fonctionne
- [ ] Résultats corrects
- [ ] FAQ affichée
- [ ] JSON-LD présent dans `<head>`
- [ ] SEO meta tags OK
- [ ] Responsive mobile OK

---

## 🚀 Prochaines Étapes

1. **Migrer les 8 prioritaires** (ceux avec calculs réutilisables)
2. **Ajouter FAQ aux 22 restants**
3. **Tester en local**
4. **Déployer**

---

## 📝 Checklist par Simulateur

Utiliser cette checklist pour chaque migration :

```markdown
## [Nom du Simulateur]

- [ ] Import FaqSectionComponent
- [ ] Import services nécessaires (Calcul/TaxBracket)
- [ ] Créer faqItems[]
- [ ] Supprimer JSON-LD manuel
- [ ] Supprimer ng OnDestroy (si seulement JSON-LD)
- [ ] Remplacer calculs par services
- [ ] Modifier HTML (FAQ)
- [ ] Tester en local
- [ ] Vérifier JSON-LD généré
- [ ] Commit
```

---

**Créé le 5 janvier 2026**
