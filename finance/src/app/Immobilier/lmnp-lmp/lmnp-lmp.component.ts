import { Component, OnInit, Renderer2 } from '@angular/core';
import { SeoService } from '../../Constructor/service/seo.service'; import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { FaqSectionComponent, FaqItem } from '../../shared/faq-section/faq-section.component';
@Component({
  selector: 'app-lmnp-lmp',
  templateUrl: './lmnp-lmp.component.html',
  styleUrls: ['./lmnp-lmp.component.scss']

})
export class LmnpLmpComponent implements OnInit {
  faqItems: FaqItem[] = [
    {
      question: 'Qu’est-ce que le statut LMNP ?',
      answer: 'Le Loueur en Meublé Non Professionnel (LMNP) concerne les particuliers qui louent un bien meublé sans en faire leur activité principale.'
    },
    {
      question: 'Qu’est-ce que le statut LMP ?',
      answer: 'Le Loueur en Meublé Professionnel (LMP) concerne les loueurs dont les revenus locatifs meublés dépassent certains seuils et qui sont inscrits au registre du commerce.'
    },
    {
      question: 'Qu’est-ce que le régime Micro-BIC ?',
      answer: 'Un régime simplifié où un abattement forfaitaire de 50% s’applique sur les revenus locatifs, sans possibilité de déduire les charges réelles.'
    },
    {
      question: 'Qu’est-ce que le régime réel ?',
      answer: 'Le régime réel permet de déduire l’ensemble des charges réelles liées à la location, y compris amortissements, intérêts d’emprunt et frais divers.'
    },
    {
      question: 'Quels sont les avantages du régime Micro-BIC ?',
      answer: 'Simplicité de déclaration et abattement automatique qui peut être intéressant pour les faibles charges.'
    },
    {
      question: 'Quels sont les avantages du régime réel ?',
      answer: 'Optimisation fiscale possible grâce à la déduction précise des charges et amortissements, souvent avantageux pour les locations avec beaucoup de frais.'
    },
    {
      question: 'Comment savoir quel régime choisir ?',
      answer: 'Selon le montant des charges, la complexité comptable souhaitée et les revenus locatifs, notre simulateur aide à choisir le meilleur régime.'
    },
    {
      question: 'Le statut LMP offre-t-il des avantages spécifiques ?',
      answer: 'Oui, notamment la possibilité d’imputer les déficits sur le revenu global et une exonération possible de plus-value après 5 ans d’activité.'
    },
    {
      question: 'Comment déclarer ses revenus en LMNP / LMP ?',
      answer: 'Les revenus doivent être déclarés dans la catégorie des BIC, soit via le régime Micro-BIC, soit au régime réel avec bilan comptable.'
    },
    {
      question: 'Où puis-je simuler la rentabilité de ma location meublée ?',
      answer: 'Utilisez notre simulateur LMNP / LMP sur CalculateurFinance.fr pour comparer facilement les régimes et estimer votre rentabilité.'
    }
  ];

  constructor(  @Inject(PLATFORM_ID) private platformId: any, 
private renderer: Renderer2, private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Simulateur LMNP / LMP 2026 | Comparateur Micro-BIC vs Régime Réel',
      description: 'Comparez la rentabilité de votre location meublée en LMNP ou LMP selon le régime Micro-BIC ou le régime réel grâce à notre simulateur gratuit.',
      url: 'https://calculateurfinance.fr/lmnp-lmp-regime-fiscal/',
      keywords: 'simulateur LMNP, simulateur LMP, location meublée non professionnelle, location meublée professionnelle, régime fiscal LMNP, régime fiscal LMP, amortissement LMNP, impôt location meublée, calcul LMNP, calcul LMP',

    });
  if (isPlatformBrowser(this.platformId)) {

    }
}

  // Options du dropdown régime fiscal
  regimes = [
    { label: 'Micro-BIC', value: 'micro-bic' },
    { label: 'Régime réel', value: 'reel' }
  ];

  selectedRegime?: string;

  // Inputs utilisateurs
  revenus: number | null = null;         // Revenus locatifs annuels
  charges: number | null = null;         // Charges annuelles (réel)
  interets: number | null = null;        // Intérêts d'emprunt (réel)
  amortissements: number | null = null;  // Amortissements annuels (réel)

  // Résultats calculés
  resultatMicroBic?: number;
  resultatReel?: number;

  get isMicroBic(): boolean {
    return this.selectedRegime === 'micro-bic';
  }

  get isReel(): boolean {
    return this.selectedRegime === 'reel';
  }

  // Méthode appelée au changement de régime
  onRegimeChange() {
    this.resultatMicroBic = undefined;
    this.resultatReel = undefined;
    this.charges = null;
    this.interets = null;
    this.amortissements = null;
  }

  // Calcul fiscalité selon le régime sélectionné
  calculerFiscalite(): void {
    if (!this.revenus || this.revenus <= 0) {
      alert("Veuillez saisir des revenus locatifs valides.");
      return;
    }

    if (this.isMicroBic) {
      // Micro-BIC = abattement forfaitaire 50%
      this.resultatMicroBic = Math.max(0, this.revenus * 0.5);
      this.resultatReel = undefined;

    } else if (this.isReel) {
      // Validation des champs régime réel
      const chargesVal = this.charges ?? 0;
      const interetsVal = this.interets ?? 0;
      const amortissementsVal = this.amortissements ?? 0;

      // Résultat fiscal = Revenus - Charges - Intérêts - Amortissements
      let resultat = this.revenus - chargesVal - interetsVal - amortissementsVal;

      // Le résultat ne peut pas être négatif en fiscalité LMNP
      this.resultatReel = Math.max(0, resultat);
      this.resultatMicroBic = undefined;

    } else {
      alert("Veuillez sélectionner un régime fiscal.");
      this.resultatMicroBic = undefined;
      this.resultatReel = undefined;
    }
  }
}


