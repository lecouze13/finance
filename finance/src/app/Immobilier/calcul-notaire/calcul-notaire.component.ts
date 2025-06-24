import { Component, OnInit, Renderer2 } from '@angular/core';
import { SeoService } from '../../Constructor/service/seo.service'; import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-calcul-notaire',
  templateUrl: './calcul-notaire.component.html',
  styleUrls: ['./calcul-notaire.component.scss']
})
export class CalculNotaireComponent implements OnInit {
  constructor(  @Inject(PLATFORM_ID) private platformId: any, 
private renderer: Renderer2, private seo: SeoService) { }
  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Simulateur frais de notaire 2025 | CalculateurFinance.fr',
      description: 'Estimez facilement vos frais de notaire pour un achat immobilier neuf ou ancien. Outil gratuit, simple et précis.',
      url: 'https://www.calculateurfinance.fr/calcul-frais-de-notaire/',
      // image: 'https://www.calculateurfinance.fr/assets/simulateur-frais-notaire-preview.png'
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
          "name": "Quels sont les frais de notaire pour un achat immobilier neuf ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Les frais de notaire pour un bien neuf sont généralement réduits, autour de 2% à 3% du prix d'achat."
          }
        },
        {
          "@type": "Question",
          "name": "Comment calculer les frais de notaire pour un logement ancien ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Les frais de notaire pour un bien ancien sont généralement compris entre 7% et 8% du prix d'achat, incluant divers impôts et taxes."
          }
        },
        {
          "@type": "Question",
          "name": "Quelle est la différence entre frais de notaire et frais d’agence ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Les frais de notaire correspondent aux taxes et honoraires liés à l’acte authentique, tandis que les frais d’agence sont la commission versée à l’agence immobilière."
          }
        },
        {
          "@type": "Question",
          "name": "Les frais de notaire sont-ils négociables ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Les frais de notaire sont réglementés et peu négociables, bien que certains honoraires puissent être discutés dans certains cas."
          }
        },
        {
          "@type": "Question",
          "name": "Pourquoi les frais de notaire sont-ils plus élevés pour un bien ancien ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Les frais plus élevés dans l’ancien sont dus aux droits de mutation plus importants et à certaines taxes spécifiques."
          }
        },
        {
          "@type": "Question",
          "name": "Comment est réparti le montant des frais de notaire ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Les frais comprennent principalement les taxes pour l’État, les frais d’enregistrement, et les honoraires du notaire."
          }
        },
        {
          "@type": "Question",
          "name": "Quels documents faut-il pour calculer les frais de notaire ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Il faut principalement connaître le prix d’achat, le type de bien (neuf ou ancien) et la localisation."
          }
        },
        {
          "@type": "Question",
          "name": "Peut-on estimer les frais de notaire avant la signature du compromis ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, un simulateur comme celui-ci permet d’obtenir une estimation rapide avant toute signature."
          }
        },
        {
          "@type": "Question",
          "name": "Comment réduire ses frais de notaire lors d’un achat immobilier ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "L’achat dans le neuf, l’exonération partielle de certaines taxes ou la négociation des honoraires peuvent permettre de réduire les frais."
          }
        },
        {
          "@type": "Question",
          "name": "Les frais de notaire incluent-ils la taxe de publicité foncière ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, la taxe de publicité foncière fait partie intégrante des frais de notaire."
          }
        },
        {
          "@type": "Question",
          "name": "Quels sont les frais de notaire pour l'achat d'un terrain ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Les frais de notaire pour un terrain sont similaires à ceux d'un bien ancien, soit environ 7% à 8% du prix d'achat, incluant droits d’enregistrement et taxes spécifiques."
          }
        }
      ]
    });
    this.renderer.appendChild(document.head, script);
  }
  }


  valeurs: { [key: string]: any } = {};
  resultat: number | null = null;

  typesBien = [
    { label: 'Ancien', value: 'ancien' },
    { label: 'Neuf', value: 'neuf' }
  ];

  calculerFrais() {
    const prix = this.valeurs['Prix du bien'];
    const type = this.valeurs['Type de bien'];
    const taux = type === 'ancien' ? 0.08 : 0.03;
    this.resultat = prix * taux;
  }

}