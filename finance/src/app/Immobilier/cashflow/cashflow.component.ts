import { Component, OnInit, Renderer2 } from '@angular/core';
import { SeoService } from '../../Constructor/service/seo.service'; import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
@Component({
  selector: 'app-cashflow',
  templateUrl: './cashflow.component.html',
  styleUrl: './cashflow.component.scss'
})
export class CashflowComponent implements OnInit {
  constructor(  @Inject(PLATFORM_ID) private platformId: any, 
private renderer: Renderer2, private seo: SeoService) { }
  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Simulateur cashflow immobilier 2025 | CalculateurFinance.fr',
      description: 'Estimez votre cashflow immobilier en prenant en compte vos loyers, charges et crédits. Outil simple et gratuit.',
      url: 'https://www.calculateurfinance.fr/simulateur-cashflow-immobilier',
      // image: 'https://www.calculateurfinance.fr/assets/simulateur-cashflow-preview.png'
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
          "name": "Qu’est-ce que le cashflow immobilier ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le cashflow immobilier est la différence entre les revenus locatifs perçus et les charges liées au bien (crédit, taxes, entretien, etc.)."
          }
        },
        {
          "@type": "Question",
          "name": "Comment calculer le cashflow ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Il faut soustraire toutes les dépenses (mensualités, charges, taxes) des loyers perçus."
          }
        },
        {
          "@type": "Question",
          "name": "Pourquoi le cashflow est-il important ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Il permet de vérifier si l’investissement génère un revenu positif ou négatif chaque mois."
          }
        },
        {
          "@type": "Question",
          "name": "Quels sont les principaux postes de charges à prendre en compte ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le remboursement du crédit, les charges de copropriété, la taxe foncière, l’assurance et les frais d’entretien."
          }
        },
        {
          "@type": "Question",
          "name": "Le cashflow peut-il être négatif ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, surtout au début d’un investissement, si les charges dépassent les loyers perçus."
          }
        },
        {
          "@type": "Question",
          "name": "Comment améliorer son cashflow immobilier ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "En optimisant le financement, en réduisant les charges ou en augmentant les loyers."
          }
        },
        {
          "@type": "Question",
          "name": "Le cashflow tient-il compte de la valorisation du bien ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Non, il ne considère que les flux financiers mensuels."
          }
        },
        {
          "@type": "Question",
          "name": "Quels risques sont liés à un cashflow négatif ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Il faut pouvoir couvrir les dépenses avec d’autres ressources pour éviter les difficultés financières."
          }
        },
        {
          "@type": "Question",
          "name": "Comment utiliser un simulateur de cashflow ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "En renseignant vos loyers, vos charges, vos mensualités de crédit et autres dépenses pour estimer votre flux net."
          }
        },
        {
          "@type": "Question",
          "name": "Où trouver un simulateur fiable de cashflow immobilier ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vous pouvez utiliser notre outil en ligne gratuit sur CalculateurFinance.fr."
          }
        }
      ]
    });
    this.renderer.appendChild(document.head, script);
  }
  }

  Element: string[] = ['Loyer', 'Crédit', 'Charges', 'Impôts'];
  values: { [key: string]: number } = {};
  cashflow = 0;
  calculCashflow() {
    this.cashflow = this.values['Loyer'] - this.values['Crédit'] - this.values['Charges'] - this.values['Impôts'];

  }
}
