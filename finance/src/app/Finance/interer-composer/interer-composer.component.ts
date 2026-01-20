import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../Constructor/service/seo.service';
import { FaqItem } from '../../shared/faq-section/faq-section.component';
import { ExportData, ExportSection, ExportRow } from '../../shared/services/export.service';

interface Actif {
  nom: string;
  capitalInitial: number;
  versementPeriodique: number;
  tauxAnnuel: number;
  dureeAnnees: number;
  valeurFinale?: number;
  totalVerse?: number;
  gainsInterets?: number;
}

@Component({
  selector: 'app-interer-composer',
  templateUrl: './interer-composer.component.html',
  styleUrls: ['./interer-composer.component.scss'],
  standalone: false
})
export class IntererComposerComponent implements OnInit {
  // Mode de calcul
  modeSimple: boolean = true;

  // Paramètres mode simple
  capitalInitial: number = 10000;
  versementMensuel: number = 200;
  tauxAnnuel: number = 7;
  dureeAnnees: number = 20;

  // Résultats mode simple
  valeurFinale: number = 0;
  totalVerse: number = 0;
  gainsInterets: number = 0;
  evolutionAnnuelle: { annee: number; capital: number; verse: number; interets: number }[] = [];

  // Mode multi-actifs
  actifs: Actif[] = [];
  totalGeneral: number = 0;
  totalVerseGeneral: number = 0;
  totalGainsGeneral: number = 0;

  // Chart
  afficherGraph: boolean = false;
  lineChartLabels: string[] = [];
  lineChartData: any[] = [];

  chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.parsed.y.toLocaleString('fr-FR')} €`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => value.toLocaleString('fr-FR') + ' €'
        }
      }
    }
  };

  faqItems: FaqItem[] = [
    {
      question: "Qu'est-ce que l'intérêt composé ?",
      answer: "L'intérêt composé, c'est quand les intérêts générés sont réinvestis et produisent eux-mêmes des intérêts. C'est l'effet \"boule de neige\" : votre capital croît de façon exponentielle au fil du temps."
    },
    {
      question: "Pourquoi l'intérêt composé est-il si puissant ?",
      answer: "Einstein aurait dit que c'est la 8ème merveille du monde. Un capital de 10 000€ à 7%/an devient 76 000€ après 30 ans sans rien ajouter. Avec 200€/mois en plus, vous atteignez 300 000€ !"
    },
    {
      question: "Quelle est la différence avec l'intérêt simple ?",
      answer: "L'intérêt simple calcule les gains uniquement sur le capital initial. L'intérêt composé calcule les gains sur le capital + les intérêts accumulés. Sur 20 ans, la différence peut doubler votre capital final."
    },
    {
      question: "Quel taux de rendement utiliser ?",
      answer: "Pour des actions (ETF monde) : 7-8% historique. Livret A : 3%. Assurance-vie fonds euros : 2-3%. Immobilier locatif : 3-5% net. N'oubliez pas de déduire l'inflation (2%) pour un rendement réel."
    },
    {
      question: "Vaut-il mieux investir tôt ou beaucoup ?",
      answer: "Investir tôt ! Commencer à 25 ans avec 200€/mois à 7% donne 525 000€ à 65 ans. Commencer à 35 ans avec 400€/mois (le double !) donne seulement 489 000€. Le temps est votre meilleur allié."
    },
    {
      question: "Comment fonctionne la capitalisation mensuelle ?",
      answer: "Au lieu de calculer les intérêts une fois par an, on les calcule chaque mois (taux annuel / 12). Cela accélère légèrement la croissance car les intérêts commencent à produire plus tôt."
    },
    {
      question: "Ce simulateur tient-il compte de l'inflation ?",
      answer: "Non, les montants sont en euros courants. Pour une vision réaliste, utilisez un taux net d'inflation. Si vous espérez 7% et l'inflation est à 2%, utilisez 5% dans le simulateur."
    },
    {
      question: "Comment atteindre l'indépendance financière ?",
      answer: "La règle des 4% suggère qu'un capital de 25x vos dépenses annuelles permet de vivre des intérêts. Pour 2 000€/mois, visez 600 000€. Ce simulateur vous aide à planifier ce parcours."
    },
    {
      question: "Puis-je simuler plusieurs placements ?",
      answer: "Oui ! Passez en mode multi-actifs pour comparer différents placements (PEA, assurance-vie, SCPI...) avec des taux et durées différents, et voir l'évolution de chacun."
    },
    {
      question: "Les frais sont-ils pris en compte ?",
      answer: "Non, utilisez le taux net de frais. Pour un ETF à 7% brut avec 0,3% de frais annuels, entrez 6,7%. Les frais réduisent significativement le rendement sur le long terme."
    }
  ];

  constructor(
    private seo: SeoService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Simulateur Intérêts Composés 2026 | Calculez votre Capital Futur',
      description: "Simulez la puissance des intérêts composés. Calculez la croissance de votre épargne avec versements réguliers. Visualisez l'effet boule de neige sur votre capital.",
      keywords: 'intérêt composé, simulateur épargne, calculateur investissement, effet boule de neige, capital futur, versements réguliers, rendement composé',
      url: 'https://calculateurfinance.fr/interet-compose/',
    });

    this.calculer();
  }

  calculer(): void {
    if (this.modeSimple) {
      this.calculerSimple();
    } else {
      this.calculerMultiActifs();
    }
    this.genererGraphique();
  }

  calculerSimple(): void {
    const r = this.tauxAnnuel / 100 / 12;
    const n = this.dureeAnnees * 12;

    let capital = this.capitalInitial;
    let verse = this.capitalInitial;
    this.evolutionAnnuelle = [];

    for (let mois = 1; mois <= n; mois++) {
      capital = capital * (1 + r) + this.versementMensuel;
      verse += this.versementMensuel;

      if (mois % 12 === 0) {
        this.evolutionAnnuelle.push({
          annee: mois / 12,
          capital: Math.round(capital),
          verse: verse,
          interets: Math.round(capital - verse)
        });
      }
    }

    this.valeurFinale = Math.round(capital);
    this.totalVerse = verse;
    this.gainsInterets = Math.round(capital - verse);
  }

  calculerMultiActifs(): void {
    this.totalGeneral = 0;
    this.totalVerseGeneral = 0;
    this.totalGainsGeneral = 0;

    this.actifs.forEach(actif => {
      const r = actif.tauxAnnuel / 100 / 12;
      const n = actif.dureeAnnees * 12;

      let capital = actif.capitalInitial;
      let verse = actif.capitalInitial;

      for (let mois = 1; mois <= n; mois++) {
        capital = capital * (1 + r) + actif.versementPeriodique;
        verse += actif.versementPeriodique;
      }

      actif.valeurFinale = Math.round(capital);
      actif.totalVerse = verse;
      actif.gainsInterets = Math.round(capital - verse);

      this.totalGeneral += actif.valeurFinale;
      this.totalVerseGeneral += actif.totalVerse;
      this.totalGainsGeneral += actif.gainsInterets;
    });
  }

  genererGraphique(): void {
    if (this.modeSimple) {
      this.lineChartLabels = this.evolutionAnnuelle.map(e => `Année ${e.annee}`);
      this.lineChartData = [
        {
          data: this.evolutionAnnuelle.map(e => e.capital),
          label: 'Capital total',
          borderColor: '#1976d2',
          backgroundColor: 'rgba(25, 118, 210, 0.1)',
          fill: true
        },
        {
          data: this.evolutionAnnuelle.map(e => e.verse),
          label: 'Montant versé',
          borderColor: '#666',
          borderDash: [5, 5],
          fill: false
        }
      ];
    } else {
      const dureeMax = Math.max(...this.actifs.map(a => a.dureeAnnees));
      this.lineChartLabels = Array.from({ length: dureeMax }, (_, i) => `Année ${i + 1}`);

      const datasets: any[] = [];
      const couleurs = ['#1976d2', '#2e7d32', '#d32f2f', '#f57c00', '#7b1fa2'];

      this.actifs.forEach((actif, idx) => {
        const r = actif.tauxAnnuel / 100 / 12;
        const values: number[] = [];
        let capital = actif.capitalInitial;

        for (let annee = 1; annee <= dureeMax; annee++) {
          if (annee <= actif.dureeAnnees) {
            for (let mois = 0; mois < 12; mois++) {
              capital = capital * (1 + r) + actif.versementPeriodique;
            }
          }
          values.push(Math.round(capital));
        }

        datasets.push({
          data: values,
          label: actif.nom || `Actif ${idx + 1}`,
          borderColor: couleurs[idx % couleurs.length],
          fill: false
        });
      });

      this.lineChartData = datasets;
    }

    this.afficherGraph = true;
  }

  ajouterActif(): void {
    this.actifs.push({
      nom: `Actif ${this.actifs.length + 1}`,
      capitalInitial: 5000,
      versementPeriodique: 100,
      tauxAnnuel: 5,
      dureeAnnees: 10
    });
    this.calculer();
  }

  supprimerActif(index: number): void {
    this.actifs.splice(index, 1);
    if (this.actifs.length > 0) {
      this.calculer();
    }
  }

  toggleMode(): void {
    this.modeSimple = !this.modeSimple;
    if (!this.modeSimple && this.actifs.length === 0) {
      this.ajouterActif();
    }
    this.calculer();
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  }

  getExportData(): ExportData {
    if (this.modeSimple) {
      return {
        title: 'Simulation Intérêts Composés',
        subtitle: `${this.formatCurrency(this.capitalInitial)} initial + ${this.formatCurrency(this.versementMensuel)}/mois à ${this.tauxAnnuel}% sur ${this.dureeAnnees} ans`,
        date: new Date(),
        sections: [
          {
            title: 'Paramètres',
            rows: [
              { label: 'Capital initial', value: this.capitalInitial, type: 'currency' },
              { label: 'Versement mensuel', value: this.versementMensuel, type: 'currency' },
              { label: 'Taux annuel', value: this.tauxAnnuel, type: 'percent' },
              { label: 'Durée', value: `${this.dureeAnnees} ans`, type: 'text' }
            ]
          },
          {
            title: 'Résultats',
            rows: [
              { label: 'Capital final', value: this.valeurFinale, type: 'currency', highlight: true },
              { label: 'Total versé', value: this.totalVerse, type: 'currency' },
              { label: 'Gains (intérêts)', value: this.gainsInterets, type: 'currency', highlight: true },
              { label: 'Multiplicateur', value: `${(this.valeurFinale / this.totalVerse).toFixed(2)}x`, type: 'text' }
            ]
          },
          {
            title: 'Évolution par année',
            rows: this.evolutionAnnuelle.slice(-5).map(e => ({
              label: `Année ${e.annee}`,
              value: e.capital,
              type: 'currency' as const
            }))
          }
        ]
      };
    } else {
      const sections: ExportSection[] = [
        {
          title: 'Récapitulatif',
          rows: [
            { label: 'Total capital final', value: this.totalGeneral, type: 'currency', highlight: true },
            { label: 'Total versé', value: this.totalVerseGeneral, type: 'currency' },
            { label: 'Total gains', value: this.totalGainsGeneral, type: 'currency', highlight: true }
          ]
        }
      ];

      this.actifs.forEach(actif => {
        const actifRows: ExportRow[] = [
          { label: 'Capital initial', value: actif.capitalInitial, type: 'currency' },
          { label: 'Versement mensuel', value: actif.versementPeriodique, type: 'currency' },
          { label: 'Taux annuel', value: actif.tauxAnnuel, type: 'percent' },
          { label: 'Durée (années)', value: actif.dureeAnnees, type: 'number' },
          { label: 'Capital final', value: actif.valeurFinale ?? 0, type: 'currency', highlight: true }
        ];
        sections.push({ title: actif.nom, rows: actifRows });
      });

      return {
        title: 'Simulation Multi-Actifs',
        subtitle: `Comparaison de ${this.actifs.length} actifs`,
        date: new Date(),
        sections
      };
    }
  }
}
