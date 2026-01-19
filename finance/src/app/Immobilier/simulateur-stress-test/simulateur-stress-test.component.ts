import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { PanelModule } from 'primeng/panel';
import { InputNumberModule } from 'primeng/inputnumber';
import { SliderModule } from 'primeng/slider';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressBarModule } from 'primeng/progressbar';
import { FaqSectionComponent, FaqItem } from '../../shared/faq-section/faq-section.component';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';

interface ScenarioStress {
  nom: string;
  description: string;
  impact: number;
  cashflowMensuel: number;
  tresorerieRestante: number;
  moisTenable: number;
  niveau: 'faible' | 'modere' | 'eleve' | 'critique';
}

@Component({
  selector: 'app-simulateur-stress-test',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PanelModule,
    InputNumberModule,
    SliderModule,
    TooltipModule,
    ProgressBarModule,
    DecimalPipe,
    FaqSectionComponent,
    BreadcrumbComponent
  ],
  templateUrl: './simulateur-stress-test.component.html',
  styleUrls: ['./simulateur-stress-test.component.scss']
})
export class SimulateurStressTestComponent implements OnInit {
  // Situation actuelle
  nombreBiens: number = 3;
  loyerTotal: number = 2500;
  chargesTotal: number = 600;
  mensualitesCredits: number = 1800;
  tresorerieDisponible: number = 15000;
  revenusSalaires: number = 3500;
  chargesPersonnelles: number = 2000;

  // Paramètres de stress
  vacanceLocative: number = 20; // % du temps
  baisseLoyers: number = 15; // %
  hausseTaux: number = 2; // points
  travauxUrgents: number = 10000;
  impayes: number = 3; // mois d'impayés

  // Résultats
  cashflowNormal: number = 0;
  cashflowStresse: number = 0;
  moisDeReserve: number = 0;
  scoreResilience: number = 0;
  scenarios: ScenarioStress[] = [];
  recommandations: string[] = [];

  faqItems: FaqItem[] = [
    {
      question: "Qu'est-ce qu'un stress test immobilier ?",
      answer: "Un stress test immobilier simule des scénarios défavorables (vacance locative, impayés, hausse des taux, travaux urgents) pour évaluer la résistance de votre patrimoine. Il permet d'identifier vos points de vulnérabilité et de constituer des réserves adaptées avant que les problèmes ne surviennent."
    },
    {
      question: "Combien de mois de réserve de trésorerie faut-il avoir ?",
      answer: "La recommandation standard est de 6 mois de charges totales (crédits + charges) par bien immobilier. Pour un investisseur prudent, 12 mois est préférable. Cette réserve permet d'absorber vacance locative, impayés et travaux imprévus sans mettre en péril votre situation financière."
    },
    {
      question: "Quel est l'impact d'une vacance locative prolongée ?",
      answer: "Une vacance locative de 2 mois par an représente 17% de perte de revenus. Pour un bien à 1000€/mois de loyer avec 700€ de charges+crédit, 2 mois de vacance = -2000€ de revenus mais les charges continuent, soit un impact de -3400€ sur l'année. D'où l'importance de provisionner."
    },
    {
      question: "Comment se prémunir contre les impayés de loyers ?",
      answer: "Plusieurs solutions : souscrire une GLI (Garantie Loyers Impayés) coûtant 2-3% du loyer, demander un garant solide (Visale pour les jeunes), exiger un dossier locataire solide (revenus 3x le loyer), et constituer une réserve de trésorerie de 3-6 mois de loyer par bien."
    },
    {
      question: "Quel impact d'une hausse des taux sur mes crédits ?",
      answer: "Si vous avez un crédit à taux variable, une hausse de 2 points peut augmenter significativement vos mensualités. Exemple : sur 150 000€ restants à 2% sur 15 ans, la mensualité passe de 965€ à 1 075€ (+110€/mois). Les crédits à taux fixe sont protégés de ce risque."
    },
    {
      question: "Comment évaluer ma capacité à absorber des travaux urgents ?",
      answer: "Provisionnez 1-2% de la valeur du bien par an pour les travaux (soit 2000€/an pour un bien de 150 000€). Pour les urgences (fuite, chaudière), gardez une réserve immédiate de 5000-10000€. Un ravalement ou une toiture peut coûter 10 000-30 000€ : anticipez les gros travaux."
    },
    {
      question: "Qu'est-ce qu'un score de résilience patrimoniale ?",
      answer: "Le score de résilience mesure votre capacité à résister aux chocs financiers. Il prend en compte : le ratio trésorerie/charges annuelles, la diversification des biens et locataires, le niveau d'endettement, la qualité des locataires, et la capacité d'épargne mensuelle. Un score supérieur à 70/100 est considéré comme bon."
    },
    {
      question: "Faut-il vendre un bien si le stress test est mauvais ?",
      answer: "Pas nécessairement. D'abord, cherchez à améliorer la situation : renégociez les crédits, optimisez la fiscalité, augmentez les loyers si le marché le permet, réduisez les charges. La vente n'est pertinente que si le bien est structurellement déficitaire ou si vous avez besoin de liquidités urgentes."
    },
    {
      question: "Comment améliorer sa résilience financière immobilière ?",
      answer: "Les leviers sont : constituer une épargne de précaution (6-12 mois), diversifier les types de biens et localisations, privilégier les bons DPE, souscrire des assurances adaptées (GLI, PNO), maintenir un taux d'endettement raisonnable (<30%), et éviter la suroptimisation fiscale qui fragilise la trésorerie."
    },
    {
      question: "Quel est le pire scénario à anticiper ?",
      answer: "Le pire scénario cumule : vacance prolongée (3+ mois), impayé d'un locataire entrant en procédure judiciaire (12-24 mois), travaux urgents obligatoires, et hausse des taux si crédit variable. Ce scénario extrême peut nécessiter 18-24 mois de réserve. Heureusement, il reste rare si vous sélectionnez bien vos locataires."
    }
  ];

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Simulateur Stress Test Immobilier | Testez la Résistance de votre Patrimoine');
    this.meta.updateTag({
      name: 'description',
      content: 'Testez la résistance de votre patrimoine immobilier face aux imprévus : vacance locative, impayés, hausse des taux, travaux urgents. Identifiez vos vulnérabilités.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'stress test immobilier, risque locatif, vacance locative, impayés loyers, résilience patrimoine, trésorerie immobilier'
    });
    this.calculer();
  }

  calculer(): void {
    // Cash-flow normal
    this.cashflowNormal = this.loyerTotal - this.chargesTotal - this.mensualitesCredits;

    // Calcul des différents scénarios de stress
    this.scenarios = [];

    // Scénario 1: Vacance locative
    const perteVacance = this.loyerTotal * (this.vacanceLocative / 100);
    const cashflowVacance = this.cashflowNormal - perteVacance;
    this.scenarios.push(this.creerScenario(
      'Vacance locative',
      `${this.vacanceLocative}% du temps sans locataire`,
      perteVacance * 12,
      cashflowVacance
    ));

    // Scénario 2: Baisse des loyers
    const perteBaisseLoyers = this.loyerTotal * (this.baisseLoyers / 100);
    const cashflowBaisse = this.cashflowNormal - perteBaisseLoyers;
    this.scenarios.push(this.creerScenario(
      'Baisse des loyers',
      `Loyers en baisse de ${this.baisseLoyers}%`,
      perteBaisseLoyers * 12,
      cashflowBaisse
    ));

    // Scénario 3: Hausse des taux (si applicable)
    const augmentationMensualite = this.mensualitesCredits * (this.hausseTaux / 100) * 3;
    const cashflowTaux = this.cashflowNormal - augmentationMensualite;
    this.scenarios.push(this.creerScenario(
      'Hausse des taux',
      `+${this.hausseTaux} points sur les crédits variables`,
      augmentationMensualite * 12,
      cashflowTaux
    ));

    // Scénario 4: Impayés
    const perteImpayes = (this.loyerTotal / this.nombreBiens) * this.impayes;
    const cashflowImpayes = this.cashflowNormal - (perteImpayes / 12);
    this.scenarios.push(this.creerScenario(
      'Impayés locataires',
      `${this.impayes} mois d'impayés sur un bien`,
      perteImpayes,
      cashflowImpayes
    ));

    // Scénario 5: Travaux urgents
    const impactTravauxMensuel = this.travauxUrgents / 12;
    const cashflowTravaux = this.cashflowNormal - impactTravauxMensuel;
    this.scenarios.push(this.creerScenario(
      'Travaux urgents',
      `${this.formatCurrency(this.travauxUrgents)} de travaux imprévus`,
      this.travauxUrgents,
      cashflowTravaux
    ));

    // Scénario 6: Cumul stress modéré
    const stressModere = perteVacance * 0.5 + perteBaisseLoyers * 0.5;
    const cashflowModere = this.cashflowNormal - stressModere;
    this.scenarios.push(this.creerScenario(
      'Stress modéré combiné',
      'Vacance partielle + légère baisse loyers',
      stressModere * 12,
      cashflowModere
    ));

    // Scénario 7: Stress sévère
    const stressSevere = perteVacance + perteBaisseLoyers + augmentationMensualite;
    const cashflowSevere = this.cashflowNormal - stressSevere;
    this.scenarios.push(this.creerScenario(
      'Stress sévère',
      'Vacance + baisse loyers + hausse taux',
      stressSevere * 12,
      cashflowSevere
    ));

    // Cash-flow le plus stressé (scénario sévère)
    this.cashflowStresse = cashflowSevere;

    // Mois de réserve
    const chargesMensuelles = this.chargesTotal + this.mensualitesCredits;
    this.moisDeReserve = chargesMensuelles > 0 ? this.tresorerieDisponible / chargesMensuelles : 0;

    // Score de résilience (sur 100)
    this.calculerScoreResilience();

    // Générer les recommandations
    this.genererRecommandations();
  }

  creerScenario(nom: string, description: string, impactAnnuel: number, cashflowMensuel: number): ScenarioStress {
    const chargesMensuelles = this.chargesTotal + this.mensualitesCredits;
    const deficitMensuel = cashflowMensuel < 0 ? Math.abs(cashflowMensuel) : 0;
    const moisTenable = deficitMensuel > 0 ? this.tresorerieDisponible / deficitMensuel : 999;

    let niveau: 'faible' | 'modere' | 'eleve' | 'critique';
    if (cashflowMensuel >= 0) {
      niveau = 'faible';
    } else if (moisTenable >= 12) {
      niveau = 'modere';
    } else if (moisTenable >= 6) {
      niveau = 'eleve';
    } else {
      niveau = 'critique';
    }

    return {
      nom,
      description,
      impact: impactAnnuel,
      cashflowMensuel,
      tresorerieRestante: this.tresorerieDisponible - Math.max(0, -cashflowMensuel * 12),
      moisTenable: Math.min(moisTenable, 99),
      niveau
    };
  }

  calculerScoreResilience(): void {
    let score = 100;

    // Critère 1: Mois de réserve (max 30 points)
    if (this.moisDeReserve < 3) score -= 30;
    else if (this.moisDeReserve < 6) score -= 20;
    else if (this.moisDeReserve < 12) score -= 10;

    // Critère 2: Cash-flow normal (max 25 points)
    if (this.cashflowNormal < 0) score -= 25;
    else if (this.cashflowNormal < 200) score -= 15;
    else if (this.cashflowNormal < 500) score -= 5;

    // Critère 3: Cash-flow stressé (max 25 points)
    if (this.cashflowStresse < -500) score -= 25;
    else if (this.cashflowStresse < -200) score -= 15;
    else if (this.cashflowStresse < 0) score -= 10;

    // Critère 4: Revenus de secours (max 20 points)
    const capaciteAbsorption = this.revenusSalaires - this.chargesPersonnelles;
    if (capaciteAbsorption < 0) score -= 20;
    else if (capaciteAbsorption < 500) score -= 10;
    else if (capaciteAbsorption < 1000) score -= 5;

    this.scoreResilience = Math.max(0, score);
  }

  genererRecommandations(): void {
    this.recommandations = [];

    if (this.moisDeReserve < 6) {
      this.recommandations.push(`Constituez une réserve de ${this.formatCurrency((6 - this.moisDeReserve) * (this.chargesTotal + this.mensualitesCredits))} pour atteindre 6 mois de charges.`);
    }

    if (this.cashflowNormal < 0) {
      this.recommandations.push('Votre cash-flow est négatif. Envisagez de renégocier vos crédits ou d\'augmenter les loyers.');
    }

    if (this.nombreBiens <= 2) {
      this.recommandations.push('Avec peu de biens, le risque de concentration est élevé. Un impayé impacte fortement votre trésorerie.');
    }

    if (this.vacanceLocative > 15) {
      this.recommandations.push('Un taux de vacance élevé fragilise votre rentabilité. Vérifiez la demande locative de vos zones.');
    }

    const ratioEndettementImmo = this.mensualitesCredits / (this.loyerTotal || 1);
    if (ratioEndettementImmo > 0.7) {
      this.recommandations.push('Vos mensualités représentent plus de 70% des loyers. Une marge trop faible augmente le risque.');
    }

    if (this.revenusSalaires - this.chargesPersonnelles < this.mensualitesCredits) {
      this.recommandations.push('Vos revenus hors immobilier ne suffiraient pas à couvrir les crédits en cas de vacance totale.');
    }

    if (this.recommandations.length === 0) {
      this.recommandations.push('Votre situation semble solide. Continuez à constituer des réserves pour plus de sérénité.');
    }
  }

  getNiveauClass(niveau: string): string {
    return niveau;
  }

  getNiveauLabel(niveau: string): string {
    switch (niveau) {
      case 'faible': return 'Risque faible';
      case 'modere': return 'Risque modéré';
      case 'eleve': return 'Risque élevé';
      case 'critique': return 'Risque critique';
      default: return niveau;
    }
  }

  getScoreClass(): string {
    if (this.scoreResilience >= 70) return 'excellent';
    if (this.scoreResilience >= 50) return 'bon';
    if (this.scoreResilience >= 30) return 'moyen';
    return 'faible';
  }

  getScoreLabel(): string {
    if (this.scoreResilience >= 70) return 'Excellent';
    if (this.scoreResilience >= 50) return 'Bon';
    if (this.scoreResilience >= 30) return 'À améliorer';
    return 'Critique';
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  }
}
