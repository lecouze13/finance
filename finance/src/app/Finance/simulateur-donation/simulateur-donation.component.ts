import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CheckboxModule } from 'primeng/checkbox';
import { FaqSectionComponent, FaqItem } from '../../shared/faq-section/faq-section.component';
import { SeoService } from '../../Constructor/service/seo.service';

@Component({
  selector: 'app-simulateur-donation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputNumberModule,
    DropdownModule,
    PanelModule,
    ButtonModule,
    FloatLabelModule,
    CheckboxModule,
    FaqSectionComponent
  ],
  templateUrl: './simulateur-donation.component.html',
  styleUrls: ['./simulateur-donation.component.scss']
})
export class SimulateurDonationComponent implements OnInit {
  // Paramètres de la donation
  montantDonation: number = 150000;
  lienParente: string = 'enfant';
  ageDonateur: number = 60;
  donationsAnterieures: number = 0;
  typeDonation: string = 'manuelle';
  handicapDonataire: boolean = false;

  // Résultats
  abattement: number = 0;
  montantTaxable: number = 0;
  droitsDonation: number = 0;
  tauxEffectif: number = 0;
  abattementUtilise: number = 0;
  abattementRestant: number = 0;
  reductionAge: number = 0;
  droitsApresReduction: number = 0;

  // Expose Math for template
  Math = Math;

  lienParenteOptions = [
    { label: 'Enfant', value: 'enfant' },
    { label: 'Petit-enfant', value: 'petit-enfant' },
    { label: 'Arrière-petit-enfant', value: 'arriere-petit-enfant' },
    { label: 'Époux / Partenaire PACS', value: 'conjoint' },
    { label: 'Frère / Sœur', value: 'frere-soeur' },
    { label: 'Neveu / Nièce', value: 'neveu-niece' },
    { label: 'Autre parent jusqu\'au 4e degré', value: 'autre-parent' },
    { label: 'Non parent', value: 'tiers' }
  ];

  typeDonationOptions = [
    { label: 'Don manuel (argent, titres)', value: 'manuelle' },
    { label: 'Donation notariée (immobilier)', value: 'notariee' },
    { label: 'Don familial (somme d\'argent)', value: 'familial' }
  ];

  // Barèmes des abattements (2025)
  abattements: { [key: string]: number } = {
    'enfant': 100000,
    'petit-enfant': 31865,
    'arriere-petit-enfant': 5310,
    'conjoint': 80724,
    'frere-soeur': 15932,
    'neveu-niece': 7967,
    'autre-parent': 0,
    'tiers': 0
  };

  // Barème des droits de donation en ligne directe
  baremeLigneDirecte = [
    { limite: 8072, taux: 5 },
    { limite: 12109, taux: 10 },
    { limite: 15932, taux: 15 },
    { limite: 552324, taux: 20 },
    { limite: 902838, taux: 30 },
    { limite: 1805677, taux: 40 },
    { limite: Infinity, taux: 45 }
  ];

  // Barème frère/sœur
  baremeFrere = [
    { limite: 24430, taux: 35 },
    { limite: Infinity, taux: 45 }
  ];

  faqItems: FaqItem[] = [
    {
      question: "Qu'est-ce qu'une donation et pourquoi en faire ?",
      answer: "Une donation est un acte par lequel vous transmettez de votre vivant une partie de votre patrimoine à une autre personne. Elle permet d'aider vos proches, de réduire les droits de succession futurs grâce aux abattements renouvelables tous les 15 ans, et d'optimiser la transmission de votre patrimoine."
    },
    {
      question: "Quels sont les abattements en vigueur pour les donations ?",
      answer: "Les abattements sont de 100 000€ par enfant, 31 865€ par petit-enfant, 5 310€ par arrière-petit-enfant, 80 724€ entre époux/partenaires PACS, 15 932€ entre frères/sœurs, 7 967€ entre neveux/nièces. Un abattement supplémentaire de 159 325€ existe pour les personnes handicapées."
    },
    {
      question: "Les abattements sont-ils cumulables ?",
      answer: "Oui, certains abattements sont cumulables. L'abattement général selon le lien de parenté est cumulable avec l'abattement handicap (159 325€) et avec l'exonération des dons familiaux de sommes d'argent (31 865€ jusqu'aux 80 ans du donateur). Ainsi, un parent peut donner jusqu'à 131 865€ à un enfant sans droits."
    },
    {
      question: "Comment fonctionne le rappel fiscal des donations ?",
      answer: "Les donations consenties à une même personne sont additionnées sur une période de 15 ans. Si vous avez déjà donné, les abattements sont réduits d'autant. Après 15 ans, les compteurs sont remis à zéro et les abattements sont de nouveau disponibles intégralement."
    },
    {
      question: "Quelle est la différence entre don manuel et donation notariée ?",
      answer: "Le don manuel (argent, titres, bijoux) peut se faire sans notaire mais doit être déclaré aux impôts. La donation notariée est obligatoire pour les biens immobiliers et recommandée pour les montants importants. Elle offre une sécurité juridique et une date certaine, mais engendre des frais de notaire."
    },
    {
      question: "Existe-t-il une réduction pour les donations précoces ?",
      answer: "Oui, une réduction de 50% sur les droits de donation s'appliquait historiquement pour les donations en pleine propriété avant 70 ans. Cette réduction a été supprimée pour les transmissions d'entreprises mais reste applicable dans certains cas. Consultez un notaire pour votre situation spécifique."
    },
    {
      question: "Qu'est-ce que le don familial de sommes d'argent ?",
      answer: "Le don familial permet de donner jusqu'à 31 865€ en numéraire, exonéré de droits, à un enfant, petit-enfant, arrière-petit-enfant, ou à défaut neveu/nièce. Le donateur doit avoir moins de 80 ans et le bénéficiaire être majeur. Cet avantage est cumulable avec les abattements classiques."
    },
    {
      question: "Comment déclarer une donation aux impôts ?",
      answer: "Le don manuel se déclare via le formulaire 2735 dans le mois suivant la révélation du don à l'administration. La donation notariée est automatiquement transmise par le notaire. Déclarer permet de faire partir le délai de 15 ans et de prouver l'antériorité de la donation."
    },
    {
      question: "Peut-on donner un bien immobilier en conservant l'usufruit ?",
      answer: "Oui, la donation avec réserve d'usufruit permet de donner la nue-propriété tout en conservant l'usage du bien (habitation, revenus locatifs). La valeur de la nue-propriété dépend de l'âge de l'usufruitier. Au décès, le donataire récupère la pleine propriété sans droits supplémentaires."
    },
    {
      question: "Quels sont les droits de donation entre frères et sœurs ?",
      answer: "L'abattement est de 15 932€ entre frères/sœurs. Au-delà, le taux est de 35% jusqu'à 24 430€ puis 45%. Une exonération totale existe si le bénéficiaire est célibataire/veuf/divorcé, a plus de 50 ans ou est handicapé, et a vécu avec le défunt les 5 dernières années."
    }
  ];

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetaData({
      title: 'Simulateur Donation 2025 | Calculez les Droits de Donation',
      description: 'Simulez gratuitement vos droits de donation. Calculez les abattements, le montant taxable et les droits à payer selon le lien de parenté.',
      url: 'https://calculateurfinance.fr/simulateur-donation'
    });
    this.calculer();
  }

  calculer(): void {
    // Abattement de base selon le lien de parenté
    let abattementBase = this.abattements[this.lienParente] || 0;

    // Abattement supplémentaire handicap
    const abattementHandicap = this.handicapDonataire ? 159325 : 0;

    // Abattement total disponible
    this.abattement = abattementBase + abattementHandicap;

    // Abattement déjà utilisé (donations antérieures des 15 dernières années)
    this.abattementUtilise = Math.min(this.donationsAnterieures, this.abattement);
    this.abattementRestant = Math.max(0, this.abattement - this.donationsAnterieures);

    // Montant taxable
    const abattementApplicable = Math.min(this.montantDonation, this.abattementRestant);
    this.montantTaxable = Math.max(0, this.montantDonation - abattementApplicable);

    // Calcul des droits selon le barème
    this.droitsDonation = this.calculerDroits(this.montantTaxable);

    // Réduction pour donation précoce (si applicable)
    this.reductionAge = 0;
    this.droitsApresReduction = this.droitsDonation;

    // Taux effectif
    if (this.montantDonation > 0) {
      this.tauxEffectif = (this.droitsApresReduction / this.montantDonation) * 100;
    } else {
      this.tauxEffectif = 0;
    }

    // Arrondir
    this.montantTaxable = Math.round(this.montantTaxable);
    this.droitsDonation = Math.round(this.droitsDonation);
    this.droitsApresReduction = Math.round(this.droitsApresReduction);
    this.tauxEffectif = Math.round(this.tauxEffectif * 100) / 100;
  }

  calculerDroits(montantTaxable: number): number {
    if (montantTaxable <= 0) return 0;

    let bareme: { limite: number; taux: number }[];

    // Sélection du barème selon le lien de parenté
    switch (this.lienParente) {
      case 'enfant':
      case 'petit-enfant':
      case 'arriere-petit-enfant':
      case 'conjoint':
        bareme = this.baremeLigneDirecte;
        break;
      case 'frere-soeur':
        bareme = this.baremeFrere;
        break;
      case 'neveu-niece':
        return montantTaxable * 0.55; // 55% pour neveux/nièces
      case 'autre-parent':
        return montantTaxable * 0.55; // 55% pour parents jusqu'au 4e degré
      case 'tiers':
        return montantTaxable * 0.60; // 60% pour non-parents
      default:
        bareme = this.baremeLigneDirecte;
    }

    // Calcul par tranches
    let droits = 0;
    let resteATaxer = montantTaxable;
    let borneInferieure = 0;

    for (const tranche of bareme) {
      const trancheTaxable = Math.min(resteATaxer, tranche.limite - borneInferieure);
      if (trancheTaxable > 0) {
        droits += trancheTaxable * (tranche.taux / 100);
        resteATaxer -= trancheTaxable;
      }
      borneInferieure = tranche.limite;
      if (resteATaxer <= 0) break;
    }

    return droits;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  }

  getLienLabel(): string {
    const option = this.lienParenteOptions.find(o => o.value === this.lienParente);
    return option ? option.label : '';
  }
}
