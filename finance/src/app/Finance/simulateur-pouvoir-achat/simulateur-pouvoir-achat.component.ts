import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { FaqItem } from '../../shared/faq-section/faq-section.component';

@Component({
  selector: 'app-simulateur-pouvoir-achat',
  templateUrl: './simulateur-pouvoir-achat.component.html',
  styleUrls: ['./simulateur-pouvoir-achat.component.scss'],
  standalone: false
})
export class SimulateurPouvoirAchatComponent implements OnInit {
  Math = Math; // Exposer Math pour le template

  // Entrées
  montantInitial: number = 1000;
  anneeDebut: number = 2015;
  anneeFin: number = 2026;
  tauxInflationCustom: number = 2;
  modeCalcul: string = 'historique'; // 'historique' ou 'custom'
  salaireMensuel: number = 2500;
  augmentationAnnuelle: number = 1.5;

  // Résultats
  valeurActuelle: number = 0;
  perteValeur: number = 0;
  pertePourcentage: number = 0;
  inflationCumulee: number = 0;
  equivalentAujourdhui: number = 0;
  salaireReel: number = 0;
  evolutionSalaireReel: number = 0;

  // Projection
  projectionAnnuelle: any[] = [];

  // Inflation historique France (INSEE approximatif)
  inflationHistorique: { [key: number]: number } = {
    2010: 1.5, 2011: 2.1, 2012: 2.0, 2013: 0.9, 2014: 0.5,
    2015: 0.0, 2016: 0.2, 2017: 1.0, 2018: 1.8, 2019: 1.1,
    2020: 0.5, 2021: 1.6, 2022: 5.2, 2023: 4.9, 2024: 2.3, 2026: 1.8
  };

  modeOptions = [
    { label: 'Inflation historique (France)', value: 'historique' },
    { label: 'Taux d\'inflation personnalisé', value: 'custom' }
  ];

  faqItems: FaqItem[] = [
    {
      question: "Qu'est-ce que le pouvoir d'achat ?",
      answer: "Le pouvoir d'achat représente la quantité de biens et services qu'on peut acheter avec une somme d'argent donnée. Quand les prix augmentent (inflation), le pouvoir d'achat diminue : 100€ aujourd'hui achètent moins qu'il y a 10 ans."
    },
    {
      question: "Comment l'inflation affecte-t-elle mon épargne ?",
      answer: "L'inflation érode la valeur réelle de votre épargne. Si vous avez 10 000€ et que l'inflation est de 3%/an, après 10 ans, votre épargne n'achètera plus que l'équivalent de ~7 440€ d'aujourd'hui. C'est pourquoi il faut investir pour battre l'inflation."
    },
    {
      question: "Quel est le taux d'inflation moyen en France ?",
      answer: "L'inflation moyenne en France sur les 20 dernières années est d'environ 1,5%/an. Cependant, elle a fortement augmenté en 2022 (5,2%) et 2023 (4,9%) suite aux crises énergétiques. L'objectif de la BCE est de 2%/an."
    },
    {
      question: "Comment protéger mon épargne de l'inflation ?",
      answer: "Pour préserver votre pouvoir d'achat, investissez dans des actifs qui génèrent un rendement supérieur à l'inflation : actions (6-8% historique), immobilier (3-5%), obligations indexées sur l'inflation (OATi). Les livrets réglementés (Livret A) sont souvent insuffisants."
    },
    {
      question: "Mon salaire suit-il l'inflation ?",
      answer: "En moyenne, les salaires augmentent moins vite que l'inflation en période de forte hausse des prix. Le SMIC est revalorisé automatiquement quand l'inflation dépasse 2%. Pour les autres salariés, cela dépend des négociations individuelles ou collectives."
    },
    {
      question: "Qu'est-ce que l'inflation sous-jacente ?",
      answer: "L'inflation sous-jacente exclut les prix volatils (énergie, alimentation) pour mieux refléter la tendance de fond. Elle est généralement plus stable que l'inflation globale et sert de référence pour les décisions de politique monétaire."
    },
    {
      question: "Les 100€ de 2015 valent-ils autant que les 100€ de 2026 ?",
      answer: "Non. Avec l'inflation cumulée entre 2015 et 2026, 100€ de 2015 équivalent à environ 85€ de pouvoir d'achat en 2026. Autrement dit, il faut environ 118€ en 2026 pour acheter ce qu'on achetait avec 100€ en 2015."
    },
    {
      question: "Comment calculer le taux d'inflation réel de mon panier ?",
      answer: "L'INSEE calcule l'inflation sur un panier moyen, mais votre inflation personnelle peut différer. Si vous dépensez plus en énergie ou logement, votre inflation ressentie est plus élevée. Tracez vos dépenses sur plusieurs années pour calculer votre inflation réelle."
    },
    {
      question: "Pourquoi les prix de l'immobilier ne sont-ils pas dans l'inflation ?",
      answer: "L'indice des prix à la consommation (IPC) mesure les biens et services consommés, pas les actifs. L'immobilier est considéré comme un investissement. Seuls les loyers (partie consommation) sont inclus dans l'IPC, pas les prix d'achat."
    },
    {
      question: "Qu'est-ce que la déflation et est-ce mieux ?",
      answer: "La déflation est une baisse générale des prix. Paradoxalement, elle est dangereuse : les consommateurs reportent leurs achats, les entreprises baissent les salaires, l'économie entre en récession. Une inflation modérée (2%) est préférable pour la santé économique."
    }
  ];

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Simulateur Pouvoir d\'Achat et Inflation 2026 | Impact sur votre Épargne');
    this.meta.updateTag({
      name: 'description',
      content: 'Calculez l\'impact de l\'inflation sur votre pouvoir d\'achat. Comparez la valeur de l\'argent entre deux dates et visualisez l\'érosion de votre épargne.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'pouvoir achat, inflation France, calculateur inflation, érosion épargne, valeur argent, inflation 2026, perte pouvoir achat'
    });
    this.calculer();
  }

  calculer(): void {
    const nombreAnnees = this.anneeFin - this.anneeDebut;

    if (this.modeCalcul === 'historique') {
      // Calcul avec l'inflation historique
      let facteurInflation = 1;
      this.projectionAnnuelle = [];

      for (let annee = this.anneeDebut; annee <= this.anneeFin; annee++) {
        const taux = this.inflationHistorique[annee] || 2;
        facteurInflation *= (1 + taux / 100);

        const valeurReelle = this.montantInitial / facteurInflation;
        const salaireCumule = this.salaireMensuel * Math.pow(1 + this.augmentationAnnuelle / 100, annee - this.anneeDebut);
        const salaireReelCumule = salaireCumule / facteurInflation;

        this.projectionAnnuelle.push({
          annee: annee,
          inflation: taux,
          inflationCumulee: (facteurInflation - 1) * 100,
          valeurInitiale: this.montantInitial,
          valeurReelle: Math.round(valeurReelle),
          perte: Math.round(this.montantInitial - valeurReelle),
          salaireNominal: Math.round(salaireCumule),
          salaireReel: Math.round(salaireReelCumule)
        });
      }

      this.inflationCumulee = (facteurInflation - 1) * 100;
      this.valeurActuelle = this.montantInitial / facteurInflation;
      this.equivalentAujourdhui = this.montantInitial * facteurInflation;

    } else {
      // Calcul avec taux personnalisé
      const facteurInflation = Math.pow(1 + this.tauxInflationCustom / 100, nombreAnnees);
      this.inflationCumulee = (facteurInflation - 1) * 100;
      this.valeurActuelle = this.montantInitial / facteurInflation;
      this.equivalentAujourdhui = this.montantInitial * facteurInflation;

      this.projectionAnnuelle = [];
      for (let i = 0; i <= nombreAnnees; i++) {
        const annee = this.anneeDebut + i;
        const facteur = Math.pow(1 + this.tauxInflationCustom / 100, i);
        const salaireCumule = this.salaireMensuel * Math.pow(1 + this.augmentationAnnuelle / 100, i);

        this.projectionAnnuelle.push({
          annee: annee,
          inflation: this.tauxInflationCustom,
          inflationCumulee: (facteur - 1) * 100,
          valeurInitiale: this.montantInitial,
          valeurReelle: Math.round(this.montantInitial / facteur),
          perte: Math.round(this.montantInitial - this.montantInitial / facteur),
          salaireNominal: Math.round(salaireCumule),
          salaireReel: Math.round(salaireCumule / facteur)
        });
      }
    }

    // Calcul perte et évolution salaire
    this.perteValeur = this.montantInitial - this.valeurActuelle;
    this.pertePourcentage = (this.perteValeur / this.montantInitial) * 100;

    // Salaire réel
    const facteurSalaire = Math.pow(1 + this.augmentationAnnuelle / 100, nombreAnnees);
    const facteurInflationTotal = 1 + this.inflationCumulee / 100;
    this.salaireReel = (this.salaireMensuel * facteurSalaire) / facteurInflationTotal;
    this.evolutionSalaireReel = ((this.salaireReel / this.salaireMensuel) - 1) * 100;

    // Arrondir
    this.valeurActuelle = Math.round(this.valeurActuelle);
    this.perteValeur = Math.round(this.perteValeur);
    this.equivalentAujourdhui = Math.round(this.equivalentAujourdhui);
    this.salaireReel = Math.round(this.salaireReel);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  }
}
