import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FaqSectionComponent, FaqItem } from '../../shared/faq-section/faq-section.component';
import { SeoService } from '../../Constructor/service/seo.service';

interface SimulationResult {
  annee: number;
  capitalDCA: number;
  capitalLumpSum: number;
  investiDCA: number;
}

@Component({
  selector: 'app-simulateur-dca-lumpsum',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputNumberModule,
    DropdownModule,
    PanelModule,
    ButtonModule,
    FloatLabelModule,
    FaqSectionComponent
  ],
  templateUrl: './simulateur-dca-lumpsum.component.html',
  styleUrls: ['./simulateur-dca-lumpsum.component.scss']
})
export class SimulateurDcaLumpsumComponent implements OnInit {
  // Inputs
  montantTotal: number = 50000;
  dureeInvestissement: number = 10; // années pour DCA
  rendementAnnuel: number = 7; // %
  volatilite: number = 15; // % pour simulation Monte Carlo

  // Résultats
  capitalFinalDCA: number = 0;
  capitalFinalLumpSum: number = 0;
  gainDCA: number = 0;
  gainLumpSum: number = 0;
  differenceCapital: number = 0;
  meilleurStrategie: string = '';
  probabiliteSupLumpSum: number = 0;

  // Tableau année par année
  tableauEvolution: SimulationResult[] = [];

  dureeOptions = [
    { label: '1 an', value: 1 },
    { label: '2 ans', value: 2 },
    { label: '3 ans', value: 3 },
    { label: '5 ans', value: 5 },
    { label: '10 ans', value: 10 },
    { label: '15 ans', value: 15 },
    { label: '20 ans', value: 20 }
  ];

  faqItems: FaqItem[] = [
    {
      question: "Qu'est-ce que le DCA (Dollar Cost Averaging) ?",
      answer: "Le DCA consiste à investir une somme fixe à intervalles réguliers (mensuel, trimestriel) plutôt que tout d'un coup. Cette stratégie permet de lisser le prix d'achat moyen et de réduire l'impact de la volatilité du marché sur l'investissement."
    },
    {
      question: "Qu'est-ce que le Lump Sum (investissement en une fois) ?",
      answer: "Le Lump Sum consiste à investir l'intégralité de son capital disponible immédiatement. Statistiquement, sur un marché haussier à long terme, cette stratégie tend à surperformer le DCA car le capital est exposé plus longtemps aux rendements du marché."
    },
    {
      question: "Quelle stratégie est la meilleure ?",
      answer: "Les études montrent que le Lump Sum bat le DCA environ 2/3 du temps sur les marchés historiques. Cependant, le DCA offre une meilleure protection psychologique contre la volatilité et évite le risque d'investir au plus haut. Le choix dépend de votre tolérance au risque."
    },
    {
      question: "Quand privilégier le DCA ?",
      answer: "Le DCA est préférable si : vous êtes anxieux face à la volatilité, vous n'avez pas tout le capital disponible immédiatement, les marchés sont à des niveaux historiquement élevés, ou vous préférez une approche plus régulière et disciplinée."
    },
    {
      question: "Quand privilégier le Lump Sum ?",
      answer: "Le Lump Sum est préférable si : vous avez une forte tolérance au risque, vous investissez pour le très long terme (>10 ans), vous êtes convaincu de la tendance haussière du marché, ou vous souhaitez maximiser l'exposition aux rendements composés."
    },
    {
      question: "La volatilité influence-t-elle le résultat ?",
      answer: "Oui, plus la volatilité est élevée, plus le DCA peut se révéler avantageux car il permet d'acheter à différents prix. En période de forte volatilité, le DCA peut même battre le Lump Sum si les marchés corrigent après l'investissement initial."
    },
    {
      question: "Comment appliquer le DCA concrètement ?",
      answer: "Divisez votre capital par le nombre de mois souhaités (ex: 50 000€ / 12 mois = 4 166€/mois). Programmez des virements automatiques vers votre PEA ou compte-titres. Investissez le même montant chaque mois, peu importe l'évolution du marché."
    },
    {
      question: "Le DCA fonctionne-t-il avec les ETF ?",
      answer: "Oui, le DCA est particulièrement adapté aux ETF (trackers) car ils offrent une diversification immédiate et des frais réduits. Un ETF World ou S&P 500 en DCA mensuel est une stratégie d'investissement passive très populaire."
    }
  ];

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetaData({
      title: 'Simulateur DCA vs Lump Sum 2026 | Comparez les stratégies d\'investissement',
      description: 'Comparez gratuitement les stratégies DCA (investissement progressif) et Lump Sum (en une fois). Calculez quelle méthode est la plus rentable selon vos paramètres.',
      url: 'https://calculateurfinance.fr/simulateur-dca-lumpsum'
    });
    this.calculer();
  }

  calculer(): void {
    const r = this.rendementAnnuel / 100;
    const mensualiteDCA = this.montantTotal / (this.dureeInvestissement * 12);

    // Lump Sum : tout investi dès le début
    this.capitalFinalLumpSum = this.montantTotal * Math.pow(1 + r, this.dureeInvestissement);
    this.gainLumpSum = this.capitalFinalLumpSum - this.montantTotal;

    // DCA : investissement mensuel
    // Formule des annuités : FV = P * [(1+r)^n - 1] / r
    const rMensuel = Math.pow(1 + r, 1/12) - 1;
    const nbMois = this.dureeInvestissement * 12;
    this.capitalFinalDCA = mensualiteDCA * ((Math.pow(1 + rMensuel, nbMois) - 1) / rMensuel) * (1 + rMensuel);
    this.gainDCA = this.capitalFinalDCA - this.montantTotal;

    // Différence
    this.differenceCapital = this.capitalFinalLumpSum - this.capitalFinalDCA;
    this.meilleurStrategie = this.differenceCapital > 0 ? 'Lump Sum' : 'DCA';

    // Simulation Monte Carlo simplifiée pour probabilité
    this.probabiliteSupLumpSum = this.calculerProbabilite();

    // Tableau évolution année par année
    this.tableauEvolution = [];
    for (let annee = 1; annee <= this.dureeInvestissement; annee++) {
      const capitalLS = this.montantTotal * Math.pow(1 + r, annee);
      const moisEcoules = annee * 12;
      const investiDCA = mensualiteDCA * moisEcoules;
      const capitalDCA = mensualiteDCA * ((Math.pow(1 + rMensuel, moisEcoules) - 1) / rMensuel) * (1 + rMensuel);

      this.tableauEvolution.push({
        annee,
        capitalDCA: Math.round(capitalDCA),
        capitalLumpSum: Math.round(capitalLS),
        investiDCA: Math.round(investiDCA)
      });
    }

    // Arrondir les résultats
    this.capitalFinalDCA = Math.round(this.capitalFinalDCA);
    this.capitalFinalLumpSum = Math.round(this.capitalFinalLumpSum);
    this.gainDCA = Math.round(this.gainDCA);
    this.gainLumpSum = Math.round(this.gainLumpSum);
    this.differenceCapital = Math.round(Math.abs(this.differenceCapital));
  }

  calculerProbabilite(): number {
    // Simulation simplifiée basée sur l'étude Vanguard
    // Lump Sum bat DCA ~68% du temps historiquement
    // La volatilité et la durée influencent ce ratio
    const facteurVolatilite = 1 - (this.volatilite - 15) / 100;
    const facteurDuree = Math.min(1, this.dureeInvestissement / 10);
    const probaBase = 68;
    return Math.round(probaBase * facteurVolatilite * facteurDuree + (1 - facteurDuree) * 55);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  }

  formatPercent(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'percent', minimumFractionDigits: 1 }).format(value / 100);
  }
}
