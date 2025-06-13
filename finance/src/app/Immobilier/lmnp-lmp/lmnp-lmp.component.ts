import { Component, OnInit, Renderer2 } from '@angular/core';
import { SeoService } from '../../Constructor/service/seo.service'; import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
@Component({
  selector: 'app-lmnp-lmp',
  templateUrl: './lmnp-lmp.component.html',
  styleUrls: ['./lmnp-lmp.component.scss']

})
export class LmnpLmpComponent implements OnInit {
  constructor(  @Inject(PLATFORM_ID) private platformId: any, 
private renderer: Renderer2, private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Simulateur LMNP / LMP 2025 | Comparateur Micro-BIC vs Régime Réel',
      description: 'Comparez la rentabilité de votre location meublée en LMNP ou LMP selon le régime Micro-BIC ou le régime réel grâce à notre simulateur gratuit.',
      url: 'https://www.calculateurfinance.fr/simulateur-lmnp-lmp',
      // image: 'https://www.calculateurfinance.fr/assets/simulateur-lmnp-lmp-preview.png'
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
          "name": "Qu’est-ce que le statut LMNP ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le Loueur en Meublé Non Professionnel (LMNP) concerne les particuliers qui louent un bien meublé sans en faire leur activité principale."
          }
        },
        {
          "@type": "Question",
          "name": "Qu’est-ce que le statut LMP ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le Loueur en Meublé Professionnel (LMP) concerne les loueurs dont les revenus locatifs meublés dépassent certains seuils et qui sont inscrits au registre du commerce."
          }
        },
        {
          "@type": "Question",
          "name": "Qu’est-ce que le régime Micro-BIC ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Un régime simplifié où un abattement forfaitaire de 50% s’applique sur les revenus locatifs, sans possibilité de déduire les charges réelles."
          }
        },
        {
          "@type": "Question",
          "name": "Qu’est-ce que le régime réel ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le régime réel permet de déduire l’ensemble des charges réelles liées à la location, y compris amortissements, intérêts d’emprunt et frais divers."
          }
        },
        {
          "@type": "Question",
          "name": "Quels sont les avantages du régime Micro-BIC ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Simplicité de déclaration et abattement automatique qui peut être intéressant pour les faibles charges."
          }
        },
        {
          "@type": "Question",
          "name": "Quels sont les avantages du régime réel ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Optimisation fiscale possible grâce à la déduction précise des charges et amortissements, souvent avantageux pour les locations avec beaucoup de frais."
          }
        },
        {
          "@type": "Question",
          "name": "Comment savoir quel régime choisir ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Selon le montant des charges, la complexité comptable souhaitée et les revenus locatifs, notre simulateur aide à choisir le meilleur régime."
          }
        },
        {
          "@type": "Question",
          "name": "Le statut LMP offre-t-il des avantages spécifiques ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, notamment la possibilité d’imputer les déficits sur le revenu global et une exonération possible de plus-value après 5 ans d’activité."
          }
        },
        {
          "@type": "Question",
          "name": "Comment déclarer ses revenus en LMNP / LMP ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Les revenus doivent être déclarés dans la catégorie des BIC, soit via le régime Micro-BIC, soit au régime réel avec bilan comptable."
          }
        },
        {
          "@type": "Question",
          "name": "Où puis-je simuler la rentabilité de ma location meublée ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Utilisez notre simulateur LMNP / LMP sur CalculateurFinance.fr pour comparer facilement les régimes et estimer votre rentabilité."
          }
        }
      ]
    });
    this.renderer.appendChild(document.head, script);
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


