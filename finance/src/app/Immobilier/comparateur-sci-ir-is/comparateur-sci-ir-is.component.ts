import { Component, OnInit, Renderer2 } from '@angular/core';
import { SeoService } from '../../Constructor/service/seo.service'; import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
@Component({
  selector: 'app-comparateur-sci-ir-is',
  templateUrl: './comparateur-sci-ir-is.component.html',
 
})
export class ComparateurSciIrIsComponent implements OnInit {
  revenus = 0;
  charges = 0;
  duree = 10;
  tauxImpotIR = 30;
  tauxCsg = 17.2;
  amortissement = 0;
  resultat: boolean = false;

  totalIR = 0;
  totalIS = 0;
  gainISvsIR = 0;

 constructor(
    private seo: SeoService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }
  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Comparateur SCI à l’IR vs SCI à l’IS 2025 | CalculateurFinance.fr',
      description: 'Comparez facilement la fiscalité et la rentabilité entre SCI à l’Impôt sur le Revenu et SCI à l’Impôt sur les Sociétés avec notre simulateur gratuit.',
      keywords: 'comparateur SCI, SCI à l’IR, SCI à l’IS, fiscalité SCI, simulation SCI, impôt SCI, optimisation fiscale SCI, régime fiscal SCI',

      url: 'https://calculateurfinance.fr/comparateur-sci-impot/',
    });
  if (isPlatformBrowser(this.platformId)) {

    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Qu’est-ce qu’une SCI à l’IR ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "La SCI est imposée directement au niveau des associés, selon leur tranche d’imposition sur le revenu."
          }
        },
        {
          "@type": "Question",
          "name": "Qu’est-ce qu’une SCI à l’IS ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "La SCI est imposée sur ses bénéfices au taux de l’impôt sur les sociétés, puis les associés sont imposés sur les dividendes."
          }
        },
        {
          "@type": "Question",
          "name": "Quels sont les avantages de la SCI à l’IR ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Transparence fiscale, imposition au niveau des associés, et possibilité de bénéficier de certains abattements."
          }
        },
        {
          "@type": "Question",
          "name": "Quels sont les avantages de la SCI à l’IS ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Possibilité d’amortir le bien, taux d’imposition plus faible sur les bénéfices, mais fiscalité plus complexe."
          }
        },
        {
          "@type": "Question",
          "name": "Comment choisir entre SCI à l’IR et SCI à l’IS ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Selon la durée de détention, le type d’investissement, et la stratégie patrimoniale des associés."
          }
        },
        {
          "@type": "Question",
          "name": "Quels impacts fiscaux sur la revente ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "À l’IR, imposition sur la plus-value personnelle ; à l’IS, imposition sur la plus-value au niveau de la société."
          }
        },
        {
          "@type": "Question",
          "name": "La SCI à l’IS permet-elle de déduire les charges ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, les charges et amortissements peuvent être déduits des bénéfices imposables."
          }
        },
        {
          "@type": "Question",
          "name": "Quels sont les inconvénients de la SCI à l’IS ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Fiscalité des dividendes à la sortie et complexité comptable plus importante."
          }
        },
        {
          "@type": "Question",
          "name": "Est-ce que les associés peuvent changer de régime fiscal ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, sous conditions, la SCI peut opter ou renoncer à l’IS dans certains délais."
          }
        },
        {
          "@type": "Question",
          "name": "Où puis-je simuler ma fiscalité SCI ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Utilisez notre comparateur SCI à l’IR vs SCI à l’IS sur CalculateurFinance.fr."
          }
        }
      ]
    });
    this.renderer.appendChild(document.head, script);
  }
}

  calculer() {
    const revenuNet = this.revenus - this.charges;
    const irTotal = revenuNet * this.duree * (this.tauxImpotIR + this.tauxCsg) / 100;

    const revenuIS = (revenuNet - this.amortissement) * this.duree;
    const isTotal = revenuIS * 0.25;

    this.totalIR = Math.round(irTotal);
    this.totalIS = Math.round(isTotal);
    this.gainISvsIR = Math.round(this.totalIR - this.totalIS);
    this.resultat = true;
  }
}
