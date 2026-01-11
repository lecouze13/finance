import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../Constructor/service/seo.service';
import { FaqItem } from '../../shared/faq-section/faq-section.component';
import { ExportData } from '../../shared/services/export.service';

@Component({
  selector: 'app-tri-immo',
  templateUrl: './tri-immo.component.html',
  standalone: false
})
export class TriImmoComponent implements OnInit {
  // Paramètres d'entrée
  investissementInitial: number = 200000;
  fraisNotaire: number = 16000;
  travaux: number = 10000;
  revenusLocatifsAnnuels: number = 12000;
  chargesAnnuelles: number = 2000;
  taxeFonciere: number = 1200;
  dureeDetention: number = 10;
  plusValueRevente: number = 15; // en %

  // Résultats
  tri: number | null = null;
  triNet: number | null = null;
  investissementTotal: number = 0;
  revenusNetsAnnuels: number = 0;
  prixRevente: number = 0;
  cashFlowsAnnuels: number[] = [];
  van: number = 0;
  multipleInvestissement: number = 0;

  // État de l'interface
  showDetails: boolean = false;

  faqItems: FaqItem[] = [
    {
      question: "Qu'est-ce que le Taux de Rentabilité Interne (TRI) ?",
      answer: "Le TRI est le taux d'actualisation qui rend la valeur actuelle nette (VAN) d'un investissement égale à zéro. Il représente le rendement annualisé de l'investissement en tenant compte de tous les flux de trésorerie."
    },
    {
      question: "Comment interpréter le TRI immobilier ?",
      answer: "Un TRI de 8% signifie que votre investissement rapporte l'équivalent de 8% par an en moyenne. Comparez-le au taux de votre crédit : si le TRI est supérieur, l'effet de levier joue en votre faveur."
    },
    {
      question: "Quelle est la différence entre TRI et rendement locatif ?",
      answer: "Le rendement locatif mesure le rapport loyers/prix d'achat à un instant T. Le TRI intègre la durée de détention, les charges, la fiscalité et la plus-value à la revente pour une vision complète."
    },
    {
      question: "Quel TRI viser pour un investissement immobilier ?",
      answer: "Un TRI de 6-8% est considéré comme correct, 8-12% comme bon, et au-delà de 12% comme excellent. Attention, un TRI élevé peut aussi signifier un risque plus important."
    },
    {
      question: "Pourquoi le TRI est-il plus pertinent que le rendement brut ?",
      answer: "Le TRI prend en compte le facteur temps et tous les flux (achat, loyers, charges, revente). Il permet de comparer des investissements avec des durées et des structures de flux différentes."
    },
    {
      question: "Comment la durée de détention affecte-t-elle le TRI ?",
      answer: "Une durée plus longue lisse les frais d'acquisition (notaire, travaux) et permet de bénéficier pleinement de la plus-value. Généralement, le TRI s'améliore après 7-10 ans de détention."
    },
    {
      question: "Le TRI tient-il compte de la fiscalité ?",
      answer: "Le TRI brut ne tient pas compte des impôts. Pour un calcul plus réaliste, utilisez le TRI net qui intègre l'imposition des revenus fonciers et la plus-value à la revente."
    },
    {
      question: "Qu'est-ce que la VAN (Valeur Actuelle Nette) ?",
      answer: "La VAN est la somme des flux futurs actualisés moins l'investissement initial. Une VAN positive signifie que le projet crée de la valeur au taux d'actualisation choisi."
    },
    {
      question: "Comment améliorer le TRI d'un investissement ?",
      answer: "Négociez le prix d'achat, optimisez les loyers, réduisez les charges, choisissez un régime fiscal adapté (LMNP, déficit foncier), et ciblez des zones à fort potentiel de plus-value."
    },
    {
      question: "Quelles sont les limites du TRI ?",
      answer: "Le TRI suppose le réinvestissement des flux au même taux, ce qui est théorique. Il ne reflète pas le risque ni la liquidité. Utilisez-le avec d'autres indicateurs (rendement, cashflow, VAN)."
    }
  ];

  constructor(
    private seo: SeoService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Simulateur TRI Immobilier 2025 | Calculez votre Rentabilité Interne',
      description: 'Calculez le TRI (Taux de Rentabilité Interne) de votre investissement immobilier. Intégrez loyers, charges, plus-value et obtenez le rendement réel de votre projet.',
      keywords: 'TRI immobilier, taux rentabilité interne, simulateur TRI, rendement investissement locatif, calcul rentabilité immobilier, VAN, plus-value immobilière',
      url: 'https://calculateurfinance.fr/tri-immobilier/',
    });

    this.calculer();
  }

  calculer(): void {
    // Calcul de l'investissement total
    this.investissementTotal = this.investissementInitial + this.fraisNotaire + this.travaux;

    // Calcul des revenus nets annuels
    this.revenusNetsAnnuels = this.revenusLocatifsAnnuels - this.chargesAnnuelles - this.taxeFonciere;

    // Calcul du prix de revente
    this.prixRevente = this.investissementInitial * (1 + this.plusValueRevente / 100);

    // Construction des flux de trésorerie
    const cashFlows: number[] = [-this.investissementTotal];
    this.cashFlowsAnnuels = [];

    for (let i = 1; i <= this.dureeDetention; i++) {
      if (i < this.dureeDetention) {
        cashFlows.push(this.revenusNetsAnnuels);
        this.cashFlowsAnnuels.push(this.revenusNetsAnnuels);
      } else {
        // Dernière année : revenus + revente
        const dernierFlux = this.revenusNetsAnnuels + this.prixRevente;
        cashFlows.push(dernierFlux);
        this.cashFlowsAnnuels.push(dernierFlux);
      }
    }

    // Calcul du TRI
    this.tri = this.calculateIRR(cashFlows);

    // Calcul du TRI net (approximation avec 30% d'imposition sur les revenus)
    const cashFlowsNet: number[] = [-this.investissementTotal];
    for (let i = 1; i <= this.dureeDetention; i++) {
      const revenuNet = this.revenusNetsAnnuels * 0.70; // Après impôts
      if (i < this.dureeDetention) {
        cashFlowsNet.push(revenuNet);
      } else {
        // Plus-value avec abattement progressif (simplifié)
        const plusValue = this.prixRevente - this.investissementInitial;
        const abattement = Math.min(this.dureeDetention * 6, 100) / 100; // 6% par an après 5 ans
        const plusValueNette = plusValue * (1 - abattement * 0.36);
        cashFlowsNet.push(revenuNet + this.investissementInitial + plusValueNette);
      }
    }
    this.triNet = this.calculateIRR(cashFlowsNet);

    // Calcul de la VAN (avec taux d'actualisation de 5%)
    this.van = this.calculateNPV(cashFlows, 0.05);

    // Multiple d'investissement
    const totalRevenus = this.revenusNetsAnnuels * this.dureeDetention + this.prixRevente;
    this.multipleInvestissement = totalRevenus / this.investissementTotal;
  }

  calculateIRR(cashFlows: number[]): number {
    let guess = 0.1;
    const tolerance = 0.0001;
    let iteration = 0;

    while (iteration < 1000) {
      iteration++;
      let npv = 0;
      let derivative = 0;

      for (let t = 0; t < cashFlows.length; t++) {
        npv += cashFlows[t] / Math.pow(1 + guess, t);
        derivative -= t * cashFlows[t] / Math.pow(1 + guess, t + 1);
      }

      if (Math.abs(npv) < tolerance) {
        return guess * 100; // Retourne en pourcentage
      }

      if (derivative === 0) break;
      guess = guess - npv / derivative;
    }
    return guess * 100;
  }

  calculateNPV(cashFlows: number[], rate: number): number {
    let npv = 0;
    for (let t = 0; t < cashFlows.length; t++) {
      npv += cashFlows[t] / Math.pow(1 + rate, t);
    }
    return npv;
  }

  getTriClass(): string {
    if (this.tri === null) return '';
    if (this.tri >= 10) return 'excellent';
    if (this.tri >= 6) return 'good';
    if (this.tri >= 3) return 'average';
    return 'poor';
  }

  getTriVerdict(): string {
    if (this.tri === null) return '';
    if (this.tri >= 12) return 'Excellent investissement';
    if (this.tri >= 8) return 'Très bon investissement';
    if (this.tri >= 6) return 'Bon investissement';
    if (this.tri >= 4) return 'Investissement correct';
    if (this.tri >= 0) return 'Investissement faible';
    return 'Investissement non rentable';
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  }

  getExportData(): ExportData {
    return {
      title: 'Simulation TRI Immobilier',
      subtitle: `Investissement de ${this.formatCurrency(this.investissementTotal)} sur ${this.dureeDetention} ans`,
      date: new Date(),
      sections: [
        {
          title: "Paramètres de l'investissement",
          rows: [
            { label: "Prix d'acquisition", value: this.investissementInitial, type: 'currency' },
            { label: 'Frais de notaire', value: this.fraisNotaire, type: 'currency' },
            { label: 'Travaux', value: this.travaux, type: 'currency' },
            { label: 'Investissement total', value: this.investissementTotal, type: 'currency', highlight: true }
          ]
        },
        {
          title: 'Revenus et charges',
          rows: [
            { label: 'Loyers annuels', value: this.revenusLocatifsAnnuels, type: 'currency' },
            { label: 'Charges annuelles', value: this.chargesAnnuelles, type: 'currency' },
            { label: 'Taxe foncière', value: this.taxeFonciere, type: 'currency' },
            { label: 'Revenus nets annuels', value: this.revenusNetsAnnuels, type: 'currency', highlight: true }
          ]
        },
        {
          title: 'Hypothèses de revente',
          rows: [
            { label: 'Durée de détention', value: `${this.dureeDetention} ans`, type: 'text' },
            { label: 'Plus-value estimée', value: this.plusValueRevente, type: 'percent' },
            { label: 'Prix de revente', value: this.prixRevente, type: 'currency' }
          ]
        },
        {
          title: 'Résultats',
          rows: [
            { label: 'TRI brut', value: this.tri ?? 0, type: 'percent', highlight: true },
            { label: 'TRI net (après impôts)', value: this.triNet ?? 0, type: 'percent' },
            { label: 'VAN (taux 5%)', value: this.van, type: 'currency' },
            { label: "Multiple d'investissement", value: `${this.multipleInvestissement.toFixed(2)}x`, type: 'text' },
            { label: 'Verdict', value: this.getTriVerdict(), type: 'text' }
          ]
        }
      ]
    };
  }
}
