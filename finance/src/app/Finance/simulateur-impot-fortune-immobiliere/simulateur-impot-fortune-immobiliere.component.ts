import { Component, OnInit, Renderer2 } from '@angular/core';
import { SeoService } from '../../Constructor/service/seo.service'; import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
interface TrancheIFI {
  plafondInf: number;
  plafondSup: number;
  taux: number;
  impot: number;
  affichagePlafondSup?: string;
}

@Component({
  selector: 'app-simulateur-impot-fortune-immobiliere',
  templateUrl: './simulateur-impot-fortune-immobiliere.component.html',
  styleUrls: ['./simulateur-impot-fortune-immobiliere.component.scss']
})
export class SimulateurImpotFortuneImmobiliereComponent implements OnInit {
  valeurNetteTaxable: number | null = null;
  totalIFI: number | null = null;
  tranches: TrancheIFI[] = [];

  barèmeIFI: TrancheIFI[] = [
    { plafondInf: 0, plafondSup: 800000, taux: 0, impot: 0 },
    { plafondInf: 800000, plafondSup: 1300000, taux: 0.005, impot: 0 },
    { plafondInf: 1300000, plafondSup: 2570000, taux: 0.007, impot: 0 },
    { plafondInf: 2570000, plafondSup: 5000000, taux: 0.01, impot: 0 },
    { plafondInf: 5000000, plafondSup: 10000000, taux: 0.0125, impot: 0 },
    { plafondInf: 10000000, plafondSup: Number.POSITIVE_INFINITY, taux: 0.015, impot: 0 }
  ];

  constructor(  @Inject(PLATFORM_ID) private platformId: any, 
private renderer: Renderer2, private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Simulateur IFI 2025 : Impôt sur la Fortune Immobilière',
      description: 'Calculez votre IFI selon le barème progressif 2025 avec ventilation par tranche. Simulateur précis et rapide.',
      url: 'https://calculateurfinance.fr/simulateur-impot-fortune-immobiliere'
    });
  if (isPlatformBrowser(this.platformId)) {

    const faqJsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Qui doit payer l’IFI ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Toute personne dont le patrimoine immobilier net taxable dépasse 1,3 million d’euros au 1er janvier est redevable de l’IFI."
          }
        },
        {
          "@type": "Question",
          "name": "Quels biens sont soumis à l’IFI ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tous les biens immobiliers non affectés à une activité professionnelle : résidences, logements locatifs, terrains, etc."
          }
        },
        {
          "@type": "Question",
          "name": "Quel est le barème de l’IFI en 2025 ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "L’IFI est calculé selon un barème progressif de 0,5 % à 1,5 % selon la tranche de patrimoine immobilier net taxable."
          }
        },
        {
          "@type": "Question",
          "name": "Peut-on déduire des dettes ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, les dettes liées à l’acquisition, la réparation ou la conservation des biens imposables peuvent être déduites du patrimoine brut."
          }
        },
        {
          "@type": "Question",
          "name": "Comment déclarer l’IFI ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "L’IFI se déclare via la déclaration de revenus annuelle, dans l’annexe 2042-IFI."
          }
        }
      ]
    };

    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqJsonLd);
    this.renderer.appendChild(document.head, script);
  }
  }

  calculerIFI(): void {
    if (!this.valeurNetteTaxable || this.valeurNetteTaxable <= 1300000) {
      this.totalIFI = 0;
      this.tranches = [];
      return;
    }

    let total = 0;
    this.tranches = [];

    for (let tranche of this.barèmeIFI) {
      const base = Math.max(0, Math.min(this.valeurNetteTaxable, tranche.plafondSup) - tranche.plafondInf);
      const impot = base * tranche.taux;
      total += impot;

      this.tranches.push({
        ...tranche,
        impot: impot,
        affichagePlafondSup: tranche.plafondSup === Number.POSITIVE_INFINITY ? '∞' : tranche.plafondSup.toLocaleString()
      });
    }

    this.totalIFI = Math.round(total);
  }

  reset(): void {
    this.valeurNetteTaxable = null;
    this.totalIFI = null;
    this.tranches = [];
  }
}
