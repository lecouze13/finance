import { Component, OnInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { SeoService } from '../../Constructor/service/seo.service'; import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';@Component({
  selector: 'app-impots-revenue',
  templateUrl: './impots-revenue.component.html',
  styleUrls: ['./impots-revenue.component.scss']
})
export class ImpotsRevenueComponent implements OnInit {
  revenus: number | null = null;
  situation: string = ''; 
  nbEnfants: number = 0;
  credits: number = 0;

  impot: number | null = null;
  impotBrut: number = 0;
  decote: number = 0;
  constructor(  @Inject(PLATFORM_ID) private platformId: any, 
private renderer: Renderer2, private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Simulateur impôt sur le revenu 2025 | CalculateurFinance.fr',
      description: 'Estimez rapidement votre impôt sur le revenu 2025 selon vos revenus et votre situation familiale. Simulateur simple, rapide et gratuit.',
      url: 'https://www.calculateurfinance.fr/simulateur-impot-revenue/',
          keywords: 'simulateur impôt sur le revenu, calcul impôt 2025, tranche d’imposition, barème fiscal, déclaration de revenus, fiscalité en France, quotient familial, réduction d’impôt, décote, taux marginal d’imposition'

      // image: 'https://www.calculateurfinance.fr/assets/simulateur-impot-preview.png'
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
          "name": "Quel est le barème de l’impôt sur le revenu en 2025 ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le barème 2025 est progressif : 0% jusqu'à 11 497 €, 11% de 11 498 à 29 315 €, 30% jusqu'à 83 823 €, 41% jusqu'à 180 294 €, et 45% au-delà."
          }
        },
        {
          "@type": "Question",
          "name": "Qu’est-ce que la décote pour revenus modestes ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "La décote est une réduction automatique de l’impôt pour les foyers modestes. En 2025, elle s’applique si l’impôt brut est inférieur à 1 964 € (célibataire) ou 3 248 € (couple). La formule est : 889 € - 45,25% de l’impôt brut pour une personne seule, ou 1 470 € - 45,25% pour un couple."
          }
        },
        {
          "@type": "Question",
          "name": "Quelle est la différence entre impôt brut et impôt net ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "L’impôt brut est le montant calculé avant toute réduction. L’impôt net est le montant final à payer après application des décotes et crédits d’impôt éventuels."
          }
        },
        {
          "@type": "Question",
          "name": "La situation familiale influence-t-elle l’impôt ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui. Le quotient familial prend en compte la situation maritale (célibataire, marié, veuf...) et le nombre de parts fiscales (enfants à charge, etc.) pour ajuster l’imposition."
          }
        },
        {
          "@type": "Question",
          "name": "Comment sont pris en compte les enfants à charge ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Chaque enfant à charge donne droit à une demi-part ou une part entière selon leur rang. Cela augmente le nombre de parts fiscales et diminue l’impôt."
          }
        },
        {
          "@type": "Question",
          "name": "Qu’est-ce que le quotient familial ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le quotient familial est le revenu imposable divisé par le nombre de parts fiscales du foyer. Il permet de rendre l’impôt plus équitable selon la taille du ménage."
          }
        },
        {
          "@type": "Question",
          "name": "Quels crédits d’impôt peut-on déclarer ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vous pouvez déclarer des crédits pour emploi à domicile, frais de garde, dons aux associations, dépenses de transition énergétique, etc. Ils réduisent l’impôt à payer."
          }
        },
        {
          "@type": "Question",
          "name": "L’impôt peut-il être annulé totalement ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui. Si la décote et les crédits d’impôt dépassent l’impôt brut, l’impôt net à payer peut être nul. Cela concerne souvent les revenus modestes ou les foyers très défiscalisés."
          }
        },
        {
          "@type": "Question",
          "name": "Quels revenus doivent être déclarés ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tous les revenus doivent être déclarés : salaires, pensions, retraites, revenus fonciers, bénéfices industriels et commerciaux (BIC), etc."
          }
        },
        {
          "@type": "Question",
          "name": "Comment est calculé l’impôt sur le revenu ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "L’impôt est calculé selon un barème progressif. On divise le revenu imposable par le nombre de parts fiscales, on applique le barème par tranche, puis on multiplie par les parts. On déduit ensuite la décote et les crédits d’impôt éventuels."
          }
        }
      ]
    });
    this.renderer.appendChild(document.head, script);
  }
  }

  calculerParts(): number {
    let parts = 1;

    if (this.situation === 'marie') {
      parts = 2;
    } else if ((this.situation === 'veuf' || this.situation === 'divorce') && this.nbEnfants > 0) {
      parts = 1.5; // parent isolé
    }

    // Ajout des parts liées aux enfants
    if (this.nbEnfants === 1) {
      parts += 0.5;
    } else if (this.nbEnfants === 2) {
      parts += 1;
    } else if (this.nbEnfants >= 3) {
      parts += 1 + (this.nbEnfants - 2);
    }

    return parts;
  }

  calculerImpot() {
    const parts = this.calculerParts();
    if (this.revenus) {
      const revenuParPart = this.revenus / parts;
      let impotParPart = 0;

      const tranches = [
        { plafond: 11497, taux: 0 },
        { plafond: 29315, taux: 0.11 },
        { plafond: 83823, taux: 0.30 },
        { plafond: 180294, taux: 0.41 },
        { plafond: Infinity, taux: 0.45 }
      ];

      let revenuRestant = revenuParPart;
      let tranchePrecedente = 0;

      for (let tranche of tranches) {
        if (revenuRestant > tranche.plafond - tranchePrecedente) {
          impotParPart += (tranche.plafond - tranchePrecedente) * tranche.taux;
          revenuRestant -= (tranche.plafond - tranchePrecedente);
          tranchePrecedente = tranche.plafond;
        } else {
          impotParPart += revenuRestant * tranche.taux;
          break;
        }
      }

      this.impotBrut = Math.round(impotParPart * parts);
      this.decote = this.calculerDecote(this.impotBrut);
      const impotApresDecote = Math.max(this.impotBrut - this.decote, 0);
      this.impot = Math.max(impotApresDecote - this.credits, 0);
    }
  }

  calculerDecote(impotBrut: number): number {
    if (this.situation === 'marie') {
      if (impotBrut <= 3248) {
        return Math.max(1470 - 0.4525 * impotBrut, 0);
      }
    } else {
      if (impotBrut <= 1964) {
        return Math.max(889 - 0.4525 * impotBrut, 0);
      }
    }
    return 0;
  }
}


