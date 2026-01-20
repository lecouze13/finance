import { Component, OnInit, Renderer2 } from '@angular/core';
import { SeoService } from '../../Constructor/service/seo.service'; import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { FaqSectionComponent, FaqItem } from '../../shared/faq-section/faq-section.component';
@Component({
  selector: 'app-comparateur-sci-ir-is',
  templateUrl: './comparateur-sci-ir-is.component.html',

})
export class ComparateurSciIrIsComponent implements OnInit {
  faqItems: FaqItem[] = [
    {
      question: 'Qu’est-ce qu’une SCI à l’IR ?',
      answer: 'La SCI est imposée directement au niveau des associés, selon leur tranche d’imposition sur le revenu.'
    },
    {
      question: 'Qu’est-ce qu’une SCI à l’IS ?',
      answer: 'La SCI est imposée sur ses bénéfices au taux de l’impôt sur les sociétés, puis les associés sont imposés sur les dividendes.'
    },
    {
      question: 'Quels sont les avantages de la SCI à l’IR ?',
      answer: 'Transparence fiscale, imposition au niveau des associés, et possibilité de bénéficier de certains abattements.'
    },
    {
      question: 'Quels sont les avantages de la SCI à l’IS ?',
      answer: 'Possibilité d’amortir le bien, taux d’imposition plus faible sur les bénéfices, mais fiscalité plus complexe.'
    },
    {
      question: 'Comment choisir entre SCI à l’IR et SCI à l’IS ?',
      answer: 'Selon la durée de détention, le type d’investissement, et la stratégie patrimoniale des associés.'
    },
    {
      question: 'Quels impacts fiscaux sur la revente ?',
      answer: 'À l’IR, imposition sur la plus-value personnelle ; à l’IS, imposition sur la plus-value au niveau de la société.'
    },
    {
      question: 'La SCI à l’IS permet-elle de déduire les charges ?',
      answer: 'Oui, les charges et amortissements peuvent être déduits des bénéfices imposables.'
    },
    {
      question: 'Quels sont les inconvénients de la SCI à l’IS ?',
      answer: 'Fiscalité des dividendes à la sortie et complexité comptable plus importante.'
    },
    {
      question: 'Est-ce que les associés peuvent changer de régime fiscal ?',
      answer: 'Oui, sous conditions, la SCI peut opter ou renoncer à l’IS dans certains délais.'
    },
    {
      question: 'Où puis-je simuler ma fiscalité SCI ?',
      answer: 'Utilisez notre comparateur SCI à l’IR vs SCI à l’IS sur CalculateurFinance.fr.'
    }
  ];

  constructor(
    private seo: SeoService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }
  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Comparateur SCI à l’IR vs SCI à l’IS 2026 | CalculateurFinance.fr',
      description: 'Comparez facilement la fiscalité et la rentabilité entre SCI à l’Impôt sur le Revenu et SCI à l’Impôt sur les Sociétés avec notre simulateur gratuit.',
      keywords: 'comparateur SCI, SCI à l’IR, SCI à l’IS, fiscalité SCI, simulation SCI, impôt SCI, optimisation fiscale SCI, régime fiscal SCI',

      url: 'https://calculateurfinance.fr/comparateur-sci-impot/',
    });
    if (isPlatformBrowser(this.platformId)) {

      }
  }
  
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
