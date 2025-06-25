import { Component, OnInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../Constructor/service/seo.service';

@Component({
  selector: 'app-airbnb-vs-location',
 
  templateUrl: './airbnb-vs-location.component.html',
  styleUrl: './airbnb-vs-location.component.scss'
})
export class AirbnbVsLocationComponent {


  // Données d'entrée (exemple)
  prixAchat: number = 300000;
  fraisNotaire: number = 7; // en %
  loyerMensuelClassique: number = 1200;
  tauxOccupationAirbnb: number = 70; // en %
  loyerNuitAirbnb: number = 80;
  fraisGestionAirbnb: number = 15; // en % des revenus Airbnb
  chargesMensuelles: number = 200;
  taxeFonciereAnnuelle: number = 1500;
  dureeSimulation: number = 10; // en années
  tauxAppreciationBien: number = 2; // en % annuel

  // Résultats
  revenusLocClassiqueAnnuel: number = 0;
  revenusAirbnbAnnuel: number = 0;
  coutAnnuelClassique: number = 0;
  coutAnnuelAirbnb: number = 0;
  gainNetAirbnbVsClassique: number = 0;

  constructor(
    private seo: SeoService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Simulateur Airbnb vs Location Classique : Calculez la rentabilité',
      description: 'Comparez la rentabilité de votre investissement immobilier entre location classique et location Airbnb avec notre simulateur simple et rapide.',
      url: 'https://calculateurfinance.fr/calcul-rentabilite-airbnb-vs-location-classique/',
      keywords: 'simulateur airbnb, location classique, rentabilité location, investissement immobilier, comparaison location airbnb'
    });

    if (isPlatformBrowser(this.platformId)) {
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quelle est la différence entre location Airbnb et location classique ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La location Airbnb est une location courte durée, généralement plus rémunératrice mais avec plus de gestion, tandis que la location classique est une location longue durée avec moins de gestion."
      }
    },
    {
      "@type": "Question",
      "name": "Quels sont les frais spécifiques à la location Airbnb ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les frais de gestion Airbnb, la vacance locative, les coûts de nettoyage et les charges variables plus élevées."
      }
    },
    {
      "@type": "Question",
      "name": "Comment est calculée la rentabilité dans ce simulateur ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le simulateur calcule les revenus bruts annuels, les charges, les frais de gestion, et estime la plus-value potentielle du bien."
      }
    },
    {
      "@type": "Question",
      "name": "Peut-on inclure les frais de notaire et les taxes dans le calcul ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, les frais de notaire et la taxe foncière sont pris en compte dans les coûts annuels."
      }
    },
    {
      "@type": "Question",
      "name": "La simulation prend-elle en compte l'évolution du prix du bien ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, un taux d’appréciation annuel du bien immobilier est appliqué pour estimer sa valorisation future."
      }
    },
    {
      "@type": "Question",
      "name": "Quels sont les risques liés à la location Airbnb ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les risques incluent la vacance locative, les dégradations, la gestion plus lourde et les éventuelles restrictions légales locales."
      }
    },
    {
      "@type": "Question",
      "name": "Comment calculer le taux d’occupation réaliste pour Airbnb ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le taux d’occupation dépend de la localisation, la saisonnalité et la concurrence. Il est conseillé de se baser sur des données locales ou plateformes spécialisées."
      }
    },
    {
      "@type": "Question",
      "name": "Dois-je payer des impôts différents selon le type de location ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, la fiscalité diffère entre location longue durée et courte durée (Airbnb). Il est conseillé de consulter un expert fiscal pour optimiser votre situation."
      }
    },
    {
      "@type": "Question",
      "name": "Est-il possible d’alterner entre location Airbnb et location classique ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, mais cela peut nécessiter des adaptations contractuelles et réglementaires selon la commune."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la durée idéale de simulation ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La durée idéale dépend de votre horizon d’investissement, généralement entre 5 et 15 ans."
      }
    }
  ]
};


      const script = this.renderer.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(faqJsonLd);
      this.renderer.appendChild(document.head, script);
    }

    this.calculer();
  }

  calculer() {
    // Frais notaire en valeur absolue
    const fraisNotaireValeur = this.prixAchat * (this.fraisNotaire / 100);

    // Revenus annuels location classique
    this.revenusLocClassiqueAnnuel = this.loyerMensuelClassique * 12;

    // Revenus annuels Airbnb = nb nuits louées * prix nuit * taux occupation * 12 mois
    const nuitsParAn = 365;
    const nuitsLouees = nuitsParAn * (this.tauxOccupationAirbnb / 100);
    this.revenusAirbnbAnnuel = nuitsLouees * this.loyerNuitAirbnb;

    // Frais de gestion Airbnb
    const fraisGestionAirbnbValeur = this.revenusAirbnbAnnuel * (this.fraisGestionAirbnb / 100);

    // Charges annuelles (charges mensuelles * 12)
    const chargesAnnuelles = this.chargesMensuelles * 12;

    // Taxe foncière
    const taxeFonciere = this.taxeFonciereAnnuelle;

    // Coût total annuel location classique = charges + taxe
    this.coutAnnuelClassique = chargesAnnuelles + taxeFonciere;

    // Coût total annuel Airbnb = charges + taxe + frais gestion Airbnb
    this.coutAnnuelAirbnb = chargesAnnuelles + taxeFonciere + fraisGestionAirbnbValeur;

    // Plus-value sur le bien au bout de la durée (valeur finale - prix achat)
    const valeurFuture = this.prixAchat * Math.pow(1 + (this.tauxAppreciationBien / 100), this.dureeSimulation);
    const plusValue = valeurFuture - this.prixAchat;

    // Gain net annuel = (revenus - coûts) + (plus-value / durée)
    const gainNetAnnuelClassique = this.revenusLocClassiqueAnnuel - this.coutAnnuelClassique + (plusValue / this.dureeSimulation);
    const gainNetAnnuelAirbnb = this.revenusAirbnbAnnuel - this.coutAnnuelAirbnb + (plusValue / this.dureeSimulation);

    this.gainNetAirbnbVsClassique = gainNetAnnuelAirbnb - gainNetAnnuelClassique;
  }
}


