import { Component, OnInit, Renderer2 } from '@angular/core';
import { SeoService } from '../../Constructor/service/seo.service'; import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { FaqSectionComponent, FaqItem } from '../../shared/faq-section/faq-section.component';

@Component({
  selector: 'app-calcul-notaire',
  templateUrl: './calcul-notaire.component.html',
})
export class CalculNotaireComponent implements OnInit {
  faqItems: FaqItem[] = [
    {
      question: 'Quels sont les frais de notaire pour un achat immobilier neuf ?',
      answer: 'Les frais de notaire pour un bien neuf sont généralement réduits, autour de 2% à 3% du prix d\'achat.'
    },
    {
      question: 'Comment calculer les frais de notaire pour un logement ancien ?',
      answer: 'Les frais de notaire pour un bien ancien sont généralement compris entre 7% et 8% du prix d\'achat, incluant divers impôts et taxes.'
    },
    {
      question: 'Quelle est la différence entre frais de notaire et frais d’agence ?',
      answer: 'Les frais de notaire correspondent aux taxes et honoraires liés à l’acte authentique, tandis que les frais d’agence sont la commission versée à l’agence immobilière.'
    },
    {
      question: 'Les frais de notaire sont-ils négociables ?',
      answer: 'Les frais de notaire sont réglementés et peu négociables, bien que certains honoraires puissent être discutés dans certains cas.'
    },
    {
      question: 'Pourquoi les frais de notaire sont-ils plus élevés pour un bien ancien ?',
      answer: 'Les frais plus élevés dans l’ancien sont dus aux droits de mutation plus importants et à certaines taxes spécifiques.'
    },
    {
      question: 'Comment est réparti le montant des frais de notaire ?',
      answer: 'Les frais comprennent principalement les taxes pour l’État, les frais d’enregistrement, et les honoraires du notaire.'
    },
    {
      question: 'Quels documents faut-il pour calculer les frais de notaire ?',
      answer: 'Il faut principalement connaître le prix d’achat, le type de bien (neuf ou ancien) et la localisation.'
    },
    {
      question: 'Peut-on estimer les frais de notaire avant la signature du compromis ?',
      answer: 'Oui, un simulateur comme celui-ci permet d’obtenir une estimation rapide avant toute signature.'
    },
    {
      question: 'Comment réduire ses frais de notaire lors d’un achat immobilier ?',
      answer: 'L’achat dans le neuf, l’exonération partielle de certaines taxes ou la négociation des honoraires peuvent permettre de réduire les frais.'
    },
    {
      question: 'Les frais de notaire incluent-ils la taxe de publicité foncière ?',
      answer: 'Oui, la taxe de publicité foncière fait partie intégrante des frais de notaire.'
    },
    {
      question: 'Quels sont les frais de notaire pour l\'achat d\'un terrain ?',
      answer: 'Les frais de notaire pour un terrain sont similaires à ceux d\'un bien ancien, soit environ 7% à 8% du prix d\'achat, incluant droits d’enregistrement et taxes spécifiques.'
    }
  ];

 constructor(
    private seo: SeoService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }
  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Simulateur frais de notaire 2025 | CalculateurFinance.fr',
      description: 'Estimez facilement vos frais de notaire pour un achat immobilier neuf ou ancien. Outil gratuit, simple et précis.',
      keywords: 'simulateur frais de notaire, calcul frais notaire, estimation frais achat immobilier, frais d\'acquisition, coûts notariaux, achat immobilier, frais notaire pourcentage',

      url: 'https://calculateurfinance.fr/calcul-frais-de-notaire/',
    });
  if (isPlatformBrowser(this.platformId)) {

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