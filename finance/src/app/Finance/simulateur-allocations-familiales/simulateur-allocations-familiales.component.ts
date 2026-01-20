import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { PanelModule } from 'primeng/panel';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { FaqSectionComponent, FaqItem } from '../../shared/faq-section/faq-section.component';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-simulateur-allocations-familiales',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PanelModule,
    InputNumberModule,
    DropdownModule,
    TooltipModule,
    FaqSectionComponent,
    BreadcrumbComponent
  ],
  templateUrl: './simulateur-allocations-familiales.component.html',
  styleUrls: ['./simulateur-allocations-familiales.component.scss']
})
export class SimulateurAllocationsFamilialesComponent implements OnInit {
  nombreEnfants: number = 2;
  revenuAnnuel: number = 45000;
  enCouple: boolean = true;

  enfant1Age: number = 8;
  enfant2Age: number = 12;
  enfant3Age: number = 0;
  enfant4Age: number = 0;
  enfant5Age: number = 0;
  enfant6Age: number = 0;

  allocationBase: number = 0;
  majorationAge: number = 0;
  allocationTotale: number = 0;
  allocationAnnuelle: number = 0;
  plafondApplique: string = '';
  tauxApplique: string = '';

  situationOptions = [
    { label: 'En couple', value: true },
    { label: 'Parent isolé', value: false }
  ];

  enfantsOptions = [
    { label: '2 enfants', value: 2 },
    { label: '3 enfants', value: 3 },
    { label: '4 enfants', value: 4 },
    { label: '5 enfants', value: 5 },
    { label: '6 enfants ou plus', value: 6 }
  ];

  readonly MONTANT_2_ENFANTS = 148.52;
  readonly MONTANT_PAR_ENFANT_SUPP = 190.29;
  readonly MAJORATION_14_ANS = 74.26;

  readonly PLAFONDS: { [key: string]: { [key: number]: { taux_plein: number; taux_moyen: number } } } = {
    couple: {
      2: { taux_plein: 74966, taux_moyen: 99922 },
      3: { taux_plein: 80902, taux_moyen: 105858 },
      4: { taux_plein: 86838, taux_moyen: 111794 },
      5: { taux_plein: 92774, taux_moyen: 117730 },
      6: { taux_plein: 98710, taux_moyen: 123666 }
    },
    seul: {
      2: { taux_plein: 74966, taux_moyen: 99922 },
      3: { taux_plein: 80902, taux_moyen: 105858 },
      4: { taux_plein: 86838, taux_moyen: 111794 },
      5: { taux_plein: 92774, taux_moyen: 117730 },
      6: { taux_plein: 98710, taux_moyen: 123666 }
    }
  };

  faqItems: FaqItem[] = [
    {
      question: "À partir de combien d'enfants peut-on toucher les allocations familiales ?",
      answer: "Les allocations familiales sont versées à partir de 2 enfants à charge de moins de 20 ans. Un seul enfant ne donne pas droit aux allocations familiales."
    },
    {
      question: "Comment sont calculées les allocations familiales ?",
      answer: "Le montant dépend du nombre d'enfants et des ressources du foyer. Pour 2 enfants à taux plein : 148,52€/mois. Pour chaque enfant supplémentaire : +190,29€/mois."
    },
    {
      question: "Quels sont les plafonds de ressources ?",
      answer: "Pour 2 enfants en couple : taux plein jusqu'à 74 966€/an, taux moyen (50%) entre 74 966€ et 99 922€, taux réduit (25%) au-delà."
    },
    {
      question: "Jusqu'à quel âge les enfants sont-ils comptés ?",
      answer: "Les enfants sont pris en compte jusqu'à leurs 20 ans, à condition qu'ils ne perçoivent pas plus de 1 082,87€ de revenus mensuels."
    },
    {
      question: "Qu'est-ce que la majoration pour âge ?",
      answer: "Une majoration de 74,26€/mois est versée pour chaque enfant de 14 ans et plus. L'aîné d'une famille de 2 enfants n'y a pas droit."
    },
    {
      question: "Les allocations familiales sont-elles imposables ?",
      answer: "Non, les allocations familiales ne sont pas imposables sur le revenu et ne comptent pas dans le revenu fiscal de référence."
    },
    {
      question: "Comment sont versées les allocations ?",
      answer: "Les allocations sont versées mensuellement par la CAF, généralement autour du 5 du mois."
    },
    {
      question: "Que se passe-t-il en cas de garde alternée ?",
      answer: "En garde alternée, les allocations peuvent être partagées entre les deux parents (50% chacun) ou attribuées à un seul parent."
    },
    {
      question: "Comment déclarer un changement de situation ?",
      answer: "Tout changement doit être déclaré à la CAF via caf.fr ou l'application mobile, dans le mois suivant le changement."
    },
    {
      question: "Peut-on cumuler avec d'autres aides CAF ?",
      answer: "Oui, les allocations familiales sont cumulables avec l'APL, l'ARS, le complément familial et d'autres prestations."
    }
  ];

  constructor(private meta: Meta, private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Simulateur Allocations Familiales 2026 | Calculez vos Droits CAF');
    this.meta.updateTag({
      name: 'description',
      content: 'Calculez gratuitement vos allocations familiales selon vos revenus et nombre d\'enfants. Simulateur CAF 2026 avec plafonds et majorations.'
    });
    this.calculer();
  }

  calculer(): void {
    if (this.nombreEnfants < 2) {
      this.resetResults('Minimum 2 enfants requis');
      return;
    }

    const situationType = this.enCouple ? 'couple' : 'seul';
    const nbEnfantsPlafond = Math.min(this.nombreEnfants, 6);
    const plafonds = this.PLAFONDS[situationType][nbEnfantsPlafond];

    let tauxMultiplicateur = 1;
    if (this.revenuAnnuel <= plafonds.taux_plein) {
      tauxMultiplicateur = 1;
      this.tauxApplique = 'Taux plein (100%)';
      this.plafondApplique = `Ressources ≤ ${this.formatCurrency(plafonds.taux_plein)}`;
    } else if (this.revenuAnnuel <= plafonds.taux_moyen) {
      tauxMultiplicateur = 0.5;
      this.tauxApplique = 'Taux moyen (50%)';
      this.plafondApplique = `${this.formatCurrency(plafonds.taux_plein)} < Ressources ≤ ${this.formatCurrency(plafonds.taux_moyen)}`;
    } else {
      tauxMultiplicateur = 0.25;
      this.tauxApplique = 'Taux réduit (25%)';
      this.plafondApplique = `Ressources > ${this.formatCurrency(plafonds.taux_moyen)}`;
    }

    const montantBase2Enfants = this.MONTANT_2_ENFANTS * tauxMultiplicateur;
    const montantParEnfantSupp = this.MONTANT_PAR_ENFANT_SUPP * tauxMultiplicateur;
    const enfantsSupp = Math.max(0, this.nombreEnfants - 2);

    this.allocationBase = montantBase2Enfants + (enfantsSupp * montantParEnfantSupp);

    const ages = [this.enfant1Age, this.enfant2Age, this.enfant3Age, this.enfant4Age, this.enfant5Age, this.enfant6Age]
      .slice(0, this.nombreEnfants);

    let enfantsAvecMajoration = ages.filter(age => age >= 14).length;

    if (this.nombreEnfants === 2 && enfantsAvecMajoration > 0) {
      const agesTriés = [...ages].sort((a, b) => b - a);
      if (agesTriés[0] >= 14) {
        enfantsAvecMajoration = Math.max(0, enfantsAvecMajoration - 1);
      }
    }

    this.majorationAge = enfantsAvecMajoration * this.MAJORATION_14_ANS;
    this.allocationTotale = this.allocationBase + this.majorationAge;
    this.allocationAnnuelle = this.allocationTotale * 12;

    this.allocationBase = Math.round(this.allocationBase * 100) / 100;
    this.majorationAge = Math.round(this.majorationAge * 100) / 100;
    this.allocationTotale = Math.round(this.allocationTotale * 100) / 100;
    this.allocationAnnuelle = Math.round(this.allocationAnnuelle * 100) / 100;
  }

  resetResults(message: string): void {
    this.allocationBase = 0;
    this.majorationAge = 0;
    this.allocationTotale = 0;
    this.allocationAnnuelle = 0;
    this.plafondApplique = message;
    this.tauxApplique = '-';
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  }

  getAgesArray(): number[] {
    return Array.from({ length: this.nombreEnfants }, (_, i) => i + 1);
  }

  getEnfantAge(index: number): number {
    const ages = [this.enfant1Age, this.enfant2Age, this.enfant3Age, this.enfant4Age, this.enfant5Age, this.enfant6Age];
    return ages[index] || 0;
  }

  setEnfantAge(index: number, age: number): void {
    switch(index) {
      case 0: this.enfant1Age = age; break;
      case 1: this.enfant2Age = age; break;
      case 2: this.enfant3Age = age; break;
      case 3: this.enfant4Age = age; break;
      case 4: this.enfant5Age = age; break;
      case 5: this.enfant6Age = age; break;
    }
    this.calculer();
  }
}
