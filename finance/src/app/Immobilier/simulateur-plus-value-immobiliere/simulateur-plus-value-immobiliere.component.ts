import { Component, OnInit, Renderer2 } from '@angular/core';
import { SeoService } from '../../Constructor/service/seo.service'; import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { FaqSectionComponent, FaqItem } from '../../shared/faq-section/faq-section.component';
@Component({
  selector: 'app-simulateur-plus-value-immobiliere',
  templateUrl: './simulateur-plus-value-immobiliere.component.html',
  standalone: false
})
export class SimulateurPlusValueImmobiliereComponent implements OnInit {
  prixAchat: number = 0;
  fraisAchat: number = 0;
  travaux: number = 0;
  prixVente: number = 0;
  dureeDetention: number = 0;
  estResidencePrincipale: boolean = false;

  plusValue: number | null = null;
  impositionTotale: number | null = null;

  faqItems: FaqItem[] = [
    {
      question: 'Qu’est-ce que la plus-value immobilière ?',
      answer: 'La plus-value immobilière correspond à la différence entre le prix de vente et le prix d’acquisition d’un bien immobilier, après déduction de certains frais et travaux.'
    },
    {
      question: 'Quels sont les biens concernés par la plus-value ?',
      answer: 'Les biens immobiliers hors résidence principale, comme les résidences secondaires ou les biens locatifs, sont soumis à l’imposition sur la plus-value en cas de vente.'
    },
    {
      question: 'Comment est calculée la plus-value brute ?',
      answer: 'La plus-value brute se calcule en soustrayant du prix de vente le prix d\'achat majoré des frais d\'acquisition et des travaux.'
    },
    {
      question: 'Quels sont les abattements pour durée de détention ?',
      answer: 'L\'impôt sur la plus-value bénéficie d’un abattement progressif à partir de 6 ans de détention et d\'une exonération totale après 22 ans pour l’impôt et 30 ans pour les prélèvements sociaux.'
    },
    {
      question: 'Quels sont les taux d’imposition applicables ?',
      answer: 'La plus-value nette est soumise à un impôt de 19% et aux prélèvements sociaux de 17,2%, soit un taux global de 36,2% avant abattements.'
    },
    {
      question: 'La résidence principale est-elle imposée ?',
      answer: 'Non, la plus-value sur la vente d’une résidence principale est exonérée d’impôt dans la majorité des cas.'
    },
    {
      question: 'Peut-on déduire les travaux ?',
      answer: 'Oui, les travaux d’amélioration peuvent être déduits s’ils sont justifiés. Si le bien est détenu depuis plus de 5 ans, un forfait de 15% est possible.'
    },
    {
      question: 'Comment déclarer une plus-value immobilière ?',
      answer: 'La déclaration est généralement faite par le notaire lors de la vente, via un formulaire spécifique (2048-IMM).'
    },
    {
      question: 'Existe-t-il une surtaxe sur les grosses plus-values ?',
      answer: 'Oui, une surtaxe s’applique si la plus-value nette dépasse 50 000 €, selon un barème progressif de 2% à 6%.'
    },
    {
      question: 'Où simuler son impôt sur le revenu ?',
      answer: 'Vous pouvez utiliser notre simulateur dédié : https://calculateurfinance.fr/simulateur-impot-revenue'
    }
  ];

  constructor(  @Inject(PLATFORM_ID) private platformId: any, 
private renderer: Renderer2,private seo: SeoService) {}

  ngOnInit(): void {
      this.seo.updateMetaData({
      title: 'Simulateur plus-value immobilière 2026 | CalculateurFinance.fr',
      description: 'Calculez facilement votre plus-value immobilière en fonction du prix d’achat, du prix de vente, et des abattements légaux. Outil gratuit et simple.',
      keywords: 'simulateur plus-value immobilière, plus-value résidence principale, plus-value résidence secondaire, calcul plus-value, fiscalité immobilière, imposition plus-value, exonération plus-value, vente bien immobilier, calcul impôt plus-value, immobilier',

      url: 'https://calculateurfinance.fr/simulateur-plus-value-immobiliere/',
    });
  if (isPlatformBrowser(this.platformId)) {

    }
  }

  calculerPlusValue(): void {
    const prixTotalAchat = this.prixAchat + this.fraisAchat + this.travaux;
    const brute = this.prixVente - prixTotalAchat;

    if (this.estResidencePrincipale) {
      this.plusValue = 0;
      this.impositionTotale = 0;
      return;
    }

    const abattement = this.getAbattement(this.dureeDetention);
    const plusValueImposable = brute * (1 - abattement);
    const tauxImposition = 0.19 + 0.172;
    const imposition = Math.max(0, plusValueImposable * tauxImposition);

    this.plusValue = Math.max(0, brute);
    this.impositionTotale = Math.round(imposition);
  }

  getAbattement(duree: number): number {
    if (duree < 6) return 0;
    if (duree >= 22) return 1;
    return ((duree - 6) * (6 / 100)); // simplification
  }
}
