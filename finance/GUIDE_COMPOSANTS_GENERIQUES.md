# 📚 Guide d'utilisation - Composants Génériques

Ce guide explique comment utiliser les nouveaux composants et services génériques pour créer rapidement de nouveaux simulateurs.

---

## 📋 Table des matières

1. [FaqSectionComponent](#1-faqsectioncomponent)
2. [CalculationService](#2-calculationservice)
3. [TaxBracketService](#3-taxbracketservice)
4. [Créer un nouveau simulateur](#4-créer-un-nouveau-simulateur-en-15-minutes)

---

## 1. FaqSectionComponent

### 🎯 Objectif
Composant réutilisable pour afficher une FAQ avec génération automatique du JSON-LD pour le SEO.

### 📦 Import

```typescript
import { FaqSectionComponent, FaqItem } from '../../shared/faq-section/faq-section.component';

@Component({
  imports: [
    CommonModule,
    FaqSectionComponent  // Ajouter ici
  ],
  // ...
})
```

### 💻 Utilisation dans le composant TypeScript

```typescript
export class MonSimulateurComponent {
  faqItems: FaqItem[] = [
    {
      question: "Qu'est-ce que [votre concept] ?",
      answer: "Réponse détaillée avec toutes les informations importantes."
    },
    {
      question: "Comment ça fonctionne ?",
      answer: "Explication du fonctionnement."
    },
    {
      question: "Qui peut en bénéficier ?",
      answer: "Critères d'éligibilité."
    }
  ];
}
```

### 🎨 Utilisation dans le template HTML

```html
<app-faq-section
  [title]="'FAQ - Mon Simulateur'"
  [faqItems]="faqItems"
  [ariaLabel]="'Foire aux questions sur mon simulateur'">
</app-faq-section>
```

### ✨ Ce que ça fait automatiquement

1. ✅ Affiche la FAQ avec le style du site
2. ✅ Génère le JSON-LD Schema.org FAQPage
3. ✅ Injecte le script dans le `<head>` pour le SEO
4. ✅ Accessible (attribut aria-label)

### ❌ Avant (50+ lignes)

```html
<section class="faq-section">
  <h2>FAQ</h2>
  <dl>
    <dt>Question 1</dt>
    <dd>Réponse 1</dd>
    <!-- ... répété 10 fois -->
  </dl>
</section>
```

```typescript
// Dans ngOnInit
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [...]
};
const script = this.renderer.createElement('script');
// ... 20 lignes de plus
```

### ✅ Après (3 lignes)

```html
<app-faq-section [title]="'FAQ'" [faqItems]="faqItems"></app-faq-section>
```

---

## 2. CalculationService

### 🎯 Objectif
Service centralisé pour tous les calculs financiers courants.

### 📦 Injection

```typescript
import { CalculationService } from '../../shared/services/calculation.service';

constructor(private calcul: CalculationService) {}
```

### 💰 Méthodes disponibles

#### 2.1 Intérêts composés

```typescript
const resultat = this.calcul.calculerInteretsComposes(
  10000,    // Capital initial
  200,      // Versement mensuel
  4.5,      // Taux annuel (%)
  10        // Durée (années)
);

console.log(resultat.capitalFinal);      // 42 345.67
console.log(resultat.interetsGeneres);   // 8 345.67
console.log(resultat.versementsTotaux); // 34 000.00
```

#### 2.2 Mensualité de crédit

```typescript
const mensualite = this.calcul.calculerMensualiteCredit(
  200000,  // Montant emprunté
  1.5,     // Taux annuel (%)
  20       // Durée (années)
);

console.log(mensualite); // 965.02
```

#### 2.3 Coût total d'un crédit

```typescript
const cout = this.calcul.calculerCoutCredit(
  200000,  // Montant
  1.5,     // Taux
  20       // Durée
);

console.log(cout.mensualite);      // 965.02
console.log(cout.coutTotal);       // 231 605.60
console.log(cout.interetsTotaux);  // 31 605.60
```

#### 2.4 Rendement locatif

```typescript
// Rendement brut
const rendementBrut = this.calcul.calculerRendementBrut(
  12000,   // Loyer annuel
  200000   // Prix d'achat
);
console.log(rendementBrut); // 6.00 %

// Rendement net
const rendementNet = this.calcul.calculerRendementNet(
  12000,   // Loyer annuel
  3000,    // Charges annuelles
  200000   // Prix d'achat
);
console.log(rendementNet); // 4.50 %
```

#### 2.5 Formatage

```typescript
// Devise
const montant = this.calcul.formaterDevise(1234.56);
console.log(montant); // "1 234,56 €"

// Pourcentage
const taux = this.calcul.formaterPourcentage(4.567, 2);
console.log(taux); // "4.57 %"

// Arrondi
const valeur = this.calcul.arrondir(123.456789);
console.log(valeur); // 123.46
```

### 🎁 Avantages

- ✅ Formules validées et testées
- ✅ Cohérence des calculs sur tout le site
- ✅ Facile à mettre à jour (1 seul fichier)
- ✅ Évite les erreurs de copier-coller

---

## 3. TaxBracketService

### 🎯 Objectif
Service centralisé pour tous les barèmes fiscaux français (IR, IFI, LEP, cotisations sociales).

### 📦 Injection

```typescript
import { TaxBracketService } from '../../shared/services/tax-bracket.service';

constructor(private bareme: TaxBracketService) {}
```

### 🇫🇷 Méthodes disponibles

#### 3.1 Impôt sur le revenu

```typescript
const impot = this.bareme.calculerImpotRevenu(
  50000,  // Revenu imposable
  2       // Parts fiscales
);

console.log(impot.impotTotal);      // 3 456.78
console.log(impot.detailTranches);  // Tableau détaillé
// [
//   { tranche: "0 - 11 294 €", taux: 0, montantImposable: 11294, impot: 0 },
//   { tranche: "11 294 - 28 797 €", taux: 11, montantImposable: 13503, impot: 1485.33 },
//   ...
// ]
```

#### 3.2 IFI (Impôt Fortune Immobilière)

```typescript
const ifi = this.bareme.calculerIFI(1500000);

console.log(ifi.ifi);             // 3 900.00
console.log(ifi.detailTranches);  // Détail par tranche
```

#### 3.3 Éligibilité LEP

```typescript
const eligibilite = this.bareme.verifierEligibiliteLEP(
  20000,  // RFR
  2       // Parts
);

console.log(eligibilite.eligible);  // true
console.log(eligibilite.plafond);   // 33 839
console.log(eligibilite.marge);     // 13 839
```

#### 3.4 Cotisations salarié

```typescript
const cotisations = this.bareme.calculerCotisationsSalarie(35000);

console.log(cotisations.cotisationsSalariales);  // 7 752.50
console.log(cotisations.salaireNet);             // 27 247.50
```

#### 3.5 Cotisations micro-entrepreneur

```typescript
const cotisations = this.bareme.calculerCotisationsMicroEntrepreneur(
  50000,                    // CA
  'prestationServiceBIC'    // Activité
);

console.log(cotisations.cotisations);  // 10 600.00
console.log(cotisations.revenuNet);    // 39 400.00
```

#### 3.6 Accéder aux barèmes bruts

```typescript
const baremeIR = this.bareme.getBaremeIR();
// [
//   { min: 0, max: 11294, taux: 0 },
//   { min: 11294, max: 28797, taux: 11 },
//   ...
// ]

const baremeIFI = this.bareme.getBaremeIFI();
const plafondsLEP = this.bareme.getPlafondsLEP();
```

### 🎁 Avantages

- ✅ Barèmes 2026 à jour
- ✅ Mise à jour annuelle centralisée
- ✅ Calculs complexes déjà codés
- ✅ Détails par tranche pour affichage

---

## 4. Créer un nouveau simulateur en 15 minutes

### 📝 Exemple : Simulateur Allocations Familiales

#### Étape 1 : Générer le composant (1 min)

```bash
ng generate component Finance/simulateur-allocations-familiales --standalone
```

#### Étape 2 : Créer le TypeScript (5 min)

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { SeoService } from '../../Constructor/service/seo.service';
import { FaqSectionComponent, FaqItem } from '../../shared/faq-section/faq-section.component';
import { CalculationService } from '../../shared/services/calculation.service';

@Component({
  selector: 'app-simulateur-allocations-familiales',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputNumberModule,
    FloatLabelModule,
    ButtonModule,
    PanelModule,
    FaqSectionComponent
  ],
  templateUrl: './simulateur-allocations-familiales.component.html'
})
export class SimulateurAllocationsFamilialesComponent implements OnInit {
  form: FormGroup;
  resultat: any = null;

  faqItems: FaqItem[] = [
    {
      question: "À partir de combien d'enfants les allocations familiales sont-elles versées ?",
      answer: "Les allocations familiales sont versées à partir de 2 enfants à charge."
    },
    {
      question: "Quel est le montant des allocations familiales en 2026 ?",
      answer: "Le montant de base est de 148,52 € pour 2 enfants, avec majoration selon les ressources et l'âge."
    }
  ];

  constructor(
    private fb: FormBuilder,
    private seo: SeoService,
    private calcul: CalculationService
  ) {
    this.form = this.fb.group({
      nombreEnfants: [2, [Validators.required, Validators.min(0)]],
      ressourcesMensuelles: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Simulateur Allocations Familiales 2026 | CalculateurFinance.fr',
      description: 'Calculez le montant de vos allocations familiales selon vos ressources et le nombre d\'enfants. Simulateur gratuit CAF 2026.',
      url: 'https://calculateurfinance.fr/simulateur-allocations-familiales/',
      keywords: 'allocations familiales, CAF, aide enfants, simulateur CAF'
    });
  }

  calculer(): void {
    if (this.form.invalid) return;

    const { nombreEnfants, ressourcesMensuelles } = this.form.value;

    // Logique de calcul simplifiée
    let montant = 0;
    if (nombreEnfants >= 2) {
      montant = 148.52; // Base 2 enfants
      if (nombreEnfants >= 3) {
        montant += (nombreEnfants - 2) * 190.45;
      }

      // Majoration selon ressources (exemple simplifié)
      const plafond = 6000;
      if (ressourcesMensuelles > plafond) {
        const reduction = this.calcul.calculerPourcentage(montant, 50);
        montant -= reduction;
      }
    }

    this.resultat = {
      montant: this.calcul.arrondir(montant),
      eligible: montant > 0
    };
  }
}
```

#### Étape 3 : Créer le HTML (5 min)

```html
<main>
  <h1>Simulateur Allocations Familiales</h1>
  <div class="separator"></div><br>

  <p-panel header="Informations">
    <form [formGroup]="form" (ngSubmit)="calculer()" class="p-fluid grid">
      <div class="flex-auto">
        <p-floatLabel>
          <p-inputNumber formControlName="nombreEnfants" [min]="0" [showButtons]="true"></p-inputNumber>
          <label>Nombre d'enfants à charge</label>
        </p-floatLabel>
      </div>

      <div class="flex-auto">
        <p-floatLabel>
          <p-inputNumber formControlName="ressourcesMensuelles" mode="currency" currency="EUR" [min]="0"></p-inputNumber>
          <label>Ressources mensuelles</label>
        </p-floatLabel>
      </div>

      <div class="flex align-items-center justify-content-start mt-3">
        <button pButton type="submit" label="Calculer" icon="pi pi-calculator" class="p-button-success"></button>
      </div>
    </form>
  </p-panel>

  <p-panel *ngIf="resultat" header="Résultat" class="mt-4">
    <div *ngIf="resultat.eligible" class="resultats">
      <h3>Montant mensuel</h3>
      <ul>
        <li><strong>Allocations familiales :</strong> {{ resultat.montant | currency:'EUR' }}</li>
      </ul>
    </div>
  </p-panel>

  <app-faq-section
    [title]="'FAQ - Allocations Familiales'"
    [faqItems]="faqItems">
  </app-faq-section>
</main>
```

#### Étape 4 : Ajouter la route (2 min)

**pathName.model.ts :**
```typescript
SIMULATEUR_ALLOCATIONS_FAMILIALES: 'simulateur-allocations-familiales',
```

**app.routes.ts :**
```typescript
import { SimulateurAllocationsFamilialesComponent } from './Finance/simulateur-allocations-familiales/simulateur-allocations-familiales.component';

{
  path: AppRoutes.SIMULATEUR_ALLOCATIONS_FAMILIALES,
  component: SimulateurAllocationsFamilialesComponent
},
```

#### Étape 5 : Ajouter au sitemap (2 min)

**sitemap.xml :**
```xml
<url>
  <loc>https://calculateurfinance.fr/simulateur-allocations-familiales/</loc>
  <lastmod>2026-01-05</lastmod>
  <changefreq>yearly</changefreq>
  <priority>0.9</priority>
</url>
```

### ✅ TERMINÉ !

Votre nouveau simulateur est prêt avec :
- ✅ SEO optimisé (meta, Open Graph, Twitter Card)
- ✅ FAQ avec JSON-LD automatique
- ✅ Calculs via services partagés
- ✅ Design cohérent PrimeNG
- ✅ Responsive mobile
- ✅ Route configurée

---

## 🎯 Checklist pour nouveau simulateur

- [ ] Générer le composant standalone
- [ ] Importer FaqSectionComponent
- [ ] Injecter CalculationService et/ou TaxBracketService
- [ ] Définir les faqItems
- [ ] Configurer SEO dans ngOnInit
- [ ] Créer le formulaire avec FormBuilder
- [ ] Implémenter la méthode calculer()
- [ ] Créer le template HTML avec p-panel
- [ ] Ajouter la route dans pathName.model.ts
- [ ] Ajouter la route dans app.routes.ts
- [ ] Ajouter l'URL au sitemap.xml
- [ ] Tester le simulateur
- [ ] Vérifier le responsive mobile

---

## 📞 Support

Pour toute question sur l'utilisation de ces composants, consultez les exemples dans :
- `src/app/Finance/simulateur-apl/` - Exemple complet
- `src/app/Finance/simulateur-eligibilite-lep/` - Utilise TaxBracketService

---

**Créé le 5 janvier 2026**
