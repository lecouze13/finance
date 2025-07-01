import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SeoService } from '../../Constructor/service/seo.service';

interface Ticker {
  label: string;
  value: string;
  rendementDividende: number; // % dividende initial (ex: 1.95)
  cours: number; // cours de l’action en €
}

@Component({
  selector: 'app-simulateur-dividend-fire',
  templateUrl: './simulateur-dividend-fire.component.html',
  styleUrls: ['./simulateur-dividend-fire.component.scss'],
})
export class SimulateurDividendFireComponent implements OnInit {
  tickers: Ticker[] = [
    {
      label: 'Accor (AC.PA)',
      value: 'AC.PA',
      cours: 44.5,
      rendementDividende: 3.2,
    },
    {
      label: 'Air Liquide (AI.PA)',
      value: 'AI.PA',
      cours: 168.3,
      rendementDividende: 2.8,
    },
    {
      label: 'Airbus (AIR.PA)',
      value: 'AIR.PA',
      cours: 147.9,
      rendementDividende: 1.5,
    },
    {
      label: 'ArcelorMittal (MT.AS)',
      value: 'MT.AS',
      cours: 19.75,
      rendementDividende: 0.0,
    },
    {
      label: 'Axa (CS.PA)',
      value: 'CS.PA',
      cours: 25.1,
      rendementDividende: 6.0,
    },
    {
      label: 'BNP Paribas (BNP)',
      value: 'BNP.PA',
      rendementDividende: 0,
      cours: 0,
    },
    { label: 'Bouygues (EN)', value: 'EN.PA', rendementDividende: 0, cours: 0 },
    {
      label: 'Bureau Veritas (BVI)',
      value: 'BVI.PA',
      rendementDividende: 0,
      cours: 0,
    },
    {
      label: 'Capgemini (CAP)',
      value: 'CAP.PA',
      rendementDividende: 0,
      cours: 0,
    },
    {
      label: 'Carrefour (CA)',
      value: 'CA.PA',
      rendementDividende: 0,
      cours: 0,
    },
    {
      label: 'Crédit Agricole (ACA)',
      value: 'ACA.PA',
      rendementDividende: 0,
      cours: 0,
    },
    { label: 'Danone (BN)', value: 'BN.PA', rendementDividende: 0, cours: 0 },
    {
      label: 'Dassault Systèmes (DSY)',
      value: 'DSY.PA',
      rendementDividende: 0,
      cours: 0,
    },
    {
      label: 'Edenred (EDEN)',
      value: 'EDEN.PA',
      rendementDividende: 0,
      cours: 0,
    },
    {
      label: 'Engie (ENGI)',
      value: 'ENGI.PA',
      rendementDividende: 0,
      cours: 0,
    },
    {
      label: 'EssilorLuxottica (EL)',
      value: 'EL.PA',
      rendementDividende: 0,
      cours: 0,
    },
    {
      label: 'Eurofins Scientific (ERF)',
      value: 'ERF.PA',
      rendementDividende: 0,
      cours: 0,
    },
    { label: 'Hermès (RMS)', value: 'RMS.PA', rendementDividende: 0, cours: 0 },
    { label: 'Kering (KER)', value: 'KER.PA', rendementDividende: 0, cours: 0 },
    { label: 'L’Oréal (OR)', value: 'OR.PA', rendementDividende: 0, cours: 0 },
    { label: 'Legrand (LR)', value: 'LR.PA', rendementDividende: 0, cours: 0 },
    { label: 'LVMH (MC)', value: 'MC.PA', rendementDividende: 0, cours: 0 },
    { label: 'Michelin (ML)', value: 'ML.PA', rendementDividende: 0, cours: 0 },
    { label: 'Orange (ORA)', value: 'ORA.PA', rendementDividende: 0, cours: 0 },
    {
      label: 'Pernod Ricard (RI)',
      value: 'RI.PA',
      rendementDividende: 0,
      cours: 0,
    },
    {
      label: 'Publicis Groupe (PUB)',
      value: 'PUB.PA',
      rendementDividende: 0,
      cours: 0,
    },
    {
      label: 'Renault (RNO)',
      value: 'RNO.PA',
      rendementDividende: 0,
      cours: 0,
    },
    { label: 'Safran (SAF)', value: 'SAF.PA', rendementDividende: 0, cours: 0 },
    {
      label: 'Saint-Gobain (SGO)',
      value: 'SGO.PA',
      rendementDividende: 0,
      cours: 0,
    },
    { label: 'Sanofi (SAN)', value: 'SAN.PA', rendementDividende: 0, cours: 0 },
    {
      label: 'Schneider Electric (SU)',
      value: 'SU.PA',
      rendementDividende: 0,
      cours: 0,
    },
    {
      label: 'Société Générale (GLE)',
      value: 'GLE.PA',
      rendementDividende: 0,
      cours: 0,
    },
    {
      label: 'Stellantis (STLA)',
      value: 'STLA.PA',
      rendementDividende: 0,
      cours: 0,
    },
    {
      label: 'STMicroelectronics (STM)',
      value: 'STM.PA',
      rendementDividende: 0,
      cours: 0,
    },
    {
      label: 'Teleperformance (TEP)',
      value: 'TEP.PA',
      rendementDividende: 0,
      cours: 0,
    },
    { label: 'Thales (HO)', value: 'HO.PA', rendementDividende: 0, cours: 0 },
    {
      label: 'TotalEnergies (TTE)',
      value: 'TTE.PA',
      rendementDividende: 0,
      cours: 0,
    },
    {
      label: 'Unibail‑Rodamco‑Westfield (URW)',
      value: 'URW.PA',
      rendementDividende: 0,
      cours: 0,
    },
    { label: 'Veolia (VIE)', value: 'VIE.PA', rendementDividende: 0, cours: 0 },
    { label: 'Vinci (DG)', value: 'DG.PA', rendementDividende: 0, cours: 0 },
    {
      label: 'Vivendi (VIV)',
      value: 'VIV.PA',
      rendementDividende: 0,
      cours: 0,
    },
    {
      label: 'ArcelorMittal (MT)',
      value: 'MT.PA',
      rendementDividende: 0,
      cours: 0,
    }, // Remarque : doublon MT déjà listé, retire selon besoin
  ];

  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: any,
    private renderer: Renderer2,
    private seo: SeoService
  ) {}

  selectedTicker?: Ticker;

  capitalInitial: number = 10000;
  nombreActions: number = 0;

  tauxCroissanceDividende: number = 0; // en %
  dureeAnnee: number = 20;
  reinvestirDividendes: boolean = true;

  rendementDividende: number = 0;

  results: Array<{
    annee: number;
    capital: number;
    dividende: number;
    revenu: number;
  }> = [];

  chartData: any;
  chartOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  ngOnInit() {
    this.seo.updateMetaData({
      title: 'Simulateur Dividende FIRE : Calculez vos revenus passifs',
      description:
        'Estimez le capital nécessaire pour vivre de vos dividendes selon votre objectif mensuel. Simulation FIRE avec dividendes.',
      url: 'https://calculateurfinance.fr/simulateur-dividend-fire/',
      keywords:
        'simulateur dividendes, FIRE, indépendance financière, revenus passifs, investissement boursier, calcul dividendes, revenu passif',
    });

    if (isPlatformBrowser(this.platformId)) {
      const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Qu’est-ce que la stratégie FIRE par dividendes ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Il s’agit d’atteindre l’indépendance financière en vivant des dividendes générés par un portefeuille d’actions, sans vendre le capital investi.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quel rendement annuel viser pour vivre de ses dividendes ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Un rendement entre 3 % et 6 % est généralement recherché pour concilier stabilité et performance.',
            },
          },
          {
            '@type': 'Question',
            name: 'Combien de capital faut-il pour générer 2 000 € de revenus mensuels ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Avec un rendement net de 4 %, il faut environ 600 000 € de capital (2 000 x 12 / 0,04).',
            },
          },
          {
            '@type': 'Question',
            name: 'Faut-il privilégier les actions françaises ou étrangères ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Un portefeuille diversifié, incluant des sociétés françaises et internationales, permet de lisser les risques et d’optimiser la fiscalité.',
            },
          },
          {
            '@type': 'Question',
            name: 'Les dividendes sont-ils fiscalisés ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Oui, en France ils sont soumis à la flat tax de 30 %, sauf cas d’exonérations partielles (PEA, etc.).',
            },
          },
          {
            '@type': 'Question',
            name: 'Quels types d’actions versent des dividendes réguliers ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les entreprises matures et rentables (ex. TotalEnergies, Sanofi, Air Liquide) sont connues pour leur politique stable de distribution.',
            },
          },
          {
            '@type': 'Question',
            name: 'Peut-on atteindre FIRE uniquement avec des dividendes ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Oui, si le portefeuille est suffisamment capitalisé et bien réparti. Mais cela demande rigueur et discipline d’investissement.',
            },
          },
          {
            '@type': 'Question',
            name: 'Le PEA est-il adapté à une stratégie dividendes ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Oui, le PEA permet de percevoir des dividendes exonérés d’impôt après 5 ans, sous conditions, mais il est limité aux actions européennes.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment optimiser la fiscalité des dividendes étrangers ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'En utilisant les conventions fiscales et crédits d’impôt, ou en investissant via des enveloppes fiscales adaptées (ex. assurance-vie).',
            },
          },
          {
            '@type': 'Question',
            name: 'La stratégie dividendes est-elle adaptée à tous les profils ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Elle convient aux investisseurs patients, recherchant des revenus passifs réguliers, avec une tolérance au risque modérée.',
            },
          },
        ],
      };

      const script = this.renderer.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(faqJsonLd);
      this.renderer.appendChild(document.head, script);
    }
    if (this.tickers.length > 0) {
      this.selectedTicker = this.tickers[0];
      this.loadDividendAndSimulate();
    }
  }

  loadDividendAndSimulate() {
    if (this.selectedTicker) {
      this.rendementDividende = this.selectedTicker.rendementDividende;
      this.updateNombreActionsFromCapital();
      this.simulate();
    }
  }

  onCapitalChange() {
    this.updateNombreActionsFromCapital();
    this.simulate();
  }

  onNombreActionsChange() {
    this.updateCapitalFromActions();
    this.simulate();
  }

  updateNombreActionsFromCapital() {
    if (this.selectedTicker) {
      this.nombreActions = Math.floor(
        this.capitalInitial / this.selectedTicker.cours
      );
    }
  }

  updateCapitalFromActions() {
    if (this.selectedTicker) {
      this.capitalInitial = this.nombreActions * this.selectedTicker.cours;
    }
  }

  simulate() {
    this.results = [];

    let rendement = this.rendementDividende / 100;
    let croissance = this.tauxCroissanceDividende / 100;

    let capital = this.capitalInitial;
    let dividende = capital * rendement;
    let revenu = dividende;

    for (let an = 1; an <= this.dureeAnnee; an++) {
      if (this.reinvestirDividendes) {
        capital += revenu;
      }

      dividende = capital * rendement * Math.pow(1 + croissance, an);
      revenu = capital * rendement * Math.pow(1 + croissance, an);

      this.results.push({
        annee: an,
        capital: Math.round(capital * 100) / 100,
        dividende: Math.round(dividende * 100) / 100,
        revenu: Math.round(revenu * 100) / 100,
      });
    }

    this.updateChart();
  }

  updateChart() {
    this.chartData = {
      labels: this.results.map((r) => r.annee.toString()),
      datasets: [
        {
          label: 'Capital (€)',
          data: this.results.map((r) => r.capital),
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.4,
        },
        {
          label: 'Revenu dividendes annuel (€)',
          data: this.results.map((r) => r.revenu),
          fill: false,
          borderColor: '#66BB6A',
          tension: 0.4,
        },
      ],
    };
  }
}
