import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { PanelModule } from 'primeng/panel';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { FaqSectionComponent, FaqItem } from '../../shared/faq-section/faq-section.component';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-simulateur-rsa',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PanelModule,
    InputNumberModule,
    DropdownModule,
    CheckboxModule,
    TooltipModule,
    FaqSectionComponent,
    BreadcrumbComponent
  ],
  templateUrl: './simulateur-rsa.component.html',
  styleUrls: ['./simulateur-rsa.component.scss']
})
export class SimulateurRsaComponent implements OnInit {
  // Situation
  situationFamiliale: string = 'seul';
  nombreEnfants: number = 0;
  enceinte: boolean = false;
  parentIsole: boolean = false;

  // Ressources
  salaires: number = 0;
  autresRevenus: number = 0;
  allocationLogement: boolean = false;

  // Résultats
  rsaMensuel: number = 0;
  rsaAnnuel: number = 0;
  montantForfaitaire: number = 0;
  forfaitLogement: number = 0;
  bonusSortie: number = 0;
  eligible: boolean = true;
  messageEligibilite: string = '';

  situationOptions = [
    { label: 'Personne seule', value: 'seul' },
    { label: 'En couple', value: 'couple' }
  ];

  enfantsOptions = [
    { label: '0 enfant', value: 0 },
    { label: '1 enfant', value: 1 },
    { label: '2 enfants', value: 2 },
    { label: '3 enfants', value: 3 },
    { label: '4 enfants', value: 4 },
    { label: '5 enfants ou plus', value: 5 }
  ];

  // Barème RSA 2026 (montants forfaitaires)
  readonly MONTANT_BASE = 635.71; // Personne seule sans enfant
  readonly MAJORATION_COUPLE = 0.5; // +50% pour couple
  readonly MAJORATION_1ER_ENFANT = 0.3; // +30% premier enfant
  readonly MAJORATION_ENFANT_SUPP = 0.4; // +40% par enfant supplémentaire
  readonly MAJORATION_PARENT_ISOLE = 0.2857; // +28.57% parent isolé
  readonly MAJORATION_ENFANT_PARENT_ISOLE = 0.4286; // +42.86% par enfant parent isolé

  // Forfait logement
  readonly FORFAIT_LOGEMENT_1 = 76.28; // 1 personne
  readonly FORFAIT_LOGEMENT_2 = 152.57; // 2 personnes
  readonly FORFAIT_LOGEMENT_3 = 188.86; // 3+ personnes

  // Bonus activité (61% des revenus)
  readonly TAUX_BONUS = 0.61;

  faqItems: FaqItem[] = [
    {
      question: "Qui peut bénéficier du RSA ?",
      answer: "Le RSA est destiné aux personnes de plus de 25 ans (ou dès 18 ans avec enfant ou si vous avez travaillé 2 ans sur 3 ans). Il faut résider en France de façon stable, avoir des ressources inférieures au montant forfaitaire, et ne pas être étudiant (sauf si parent isolé ou activité)."
    },
    {
      question: "Quel est le montant du RSA en 2026 ?",
      answer: "Le montant forfaitaire du RSA pour une personne seule sans enfant est de 635,71€ par mois. Ce montant est majoré pour les couples (+50%) et selon le nombre d'enfants. Un parent isolé bénéficie d'une majoration spécifique."
    },
    {
      question: "Comment est calculé le RSA ?",
      answer: "RSA = Montant forfaitaire + 61% des revenus d'activité - Ressources du foyer - Forfait logement. Le forfait logement est déduit si vous percevez une aide au logement ou êtes propriétaire."
    },
    {
      question: "Qu'est-ce que le forfait logement ?",
      answer: "Le forfait logement est une somme déduite du RSA si vous bénéficiez d'une aide au logement (APL, ALF, ALS) ou si vous êtes logé gratuitement. Il varie de 76€ à 189€ selon la taille du foyer."
    },
    {
      question: "Qu'est-ce que la majoration parent isolé ?",
      answer: "Un parent isolé (célibataire, veuf, séparé) élevant seul ses enfants bénéficie d'une majoration du RSA. Cette majoration est accordée pendant 12 mois ou jusqu'aux 3 ans du dernier enfant."
    },
    {
      question: "Peut-on cumuler RSA et travail ?",
      answer: "Oui, le RSA activité permet de cumuler un emploi et le RSA. 61% de vos revenus d'activité sont ajoutés au montant forfaitaire (bonus activité), ce qui rend la reprise d'emploi financièrement intéressante."
    },
    {
      question: "Le RSA est-il imposable ?",
      answer: "Non, le RSA n'est pas imposable. Il ne doit pas être déclaré aux impôts et ne compte pas dans le revenu fiscal de référence."
    },
    {
      question: "Comment faire une demande de RSA ?",
      answer: "La demande se fait auprès de la CAF (ou MSA pour agriculteurs) via le site caf.fr, l'application mobile ou en agence. Il faut fournir justificatifs d'identité, de domicile et de ressources."
    },
    {
      question: "Quelles sont les obligations du bénéficiaire du RSA ?",
      answer: "Le bénéficiaire doit être inscrit à France Travail (ex-Pôle Emploi), accomplir des démarches de recherche d'emploi ou d'insertion, et déclarer ses ressources chaque trimestre."
    },
    {
      question: "Le RSA peut-il être suspendu ?",
      answer: "Oui, le RSA peut être suspendu en cas de non-respect des obligations (recherche d'emploi, déclarations), de ressources dépassant le plafond, ou de fraude. Une radiation temporaire de 1 à 4 mois est possible."
    }
  ];

  constructor(private meta: Meta, private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Simulateur RSA 2026 | Calculez votre Revenu de Solidarité Active');
    this.meta.updateTag({
      name: 'description',
      content: 'Calculez gratuitement votre RSA selon votre situation familiale et vos ressources. Simulateur CAF 2026 avec montants forfaitaires et majoration parent isolé.'
    });
    this.calculer();
  }

  calculer(): void {
    // Calcul du montant forfaitaire
    let nbPersonnes = this.situationFamiliale === 'couple' ? 2 : 1;
    nbPersonnes += this.nombreEnfants;

    let coefficient = 1;
    if (this.situationFamiliale === 'couple') {
      coefficient = 1 + this.MAJORATION_COUPLE;
    }

    // Majoration parent isolé
    if (this.parentIsole && this.situationFamiliale === 'seul') {
      coefficient = 1 + this.MAJORATION_PARENT_ISOLE;
      if (this.enceinte && this.nombreEnfants === 0) {
        coefficient = 1 + this.MAJORATION_PARENT_ISOLE;
      }
      for (let i = 0; i < this.nombreEnfants; i++) {
        coefficient += this.MAJORATION_ENFANT_PARENT_ISOLE;
      }
    } else {
      // Majoration standard pour enfants
      if (this.nombreEnfants >= 1) {
        coefficient += this.MAJORATION_1ER_ENFANT;
      }
      if (this.nombreEnfants >= 2) {
        coefficient += this.MAJORATION_ENFANT_SUPP;
      }
      for (let i = 2; i < this.nombreEnfants; i++) {
        coefficient += this.MAJORATION_ENFANT_SUPP;
      }
    }

    this.montantForfaitaire = this.MONTANT_BASE * coefficient;

    // Forfait logement
    if (this.allocationLogement) {
      if (nbPersonnes === 1) {
        this.forfaitLogement = this.FORFAIT_LOGEMENT_1;
      } else if (nbPersonnes === 2) {
        this.forfaitLogement = this.FORFAIT_LOGEMENT_2;
      } else {
        this.forfaitLogement = this.FORFAIT_LOGEMENT_3;
      }
    } else {
      this.forfaitLogement = 0;
    }

    // Bonus activité (61% des revenus d'activité)
    this.bonusSortie = this.salaires * this.TAUX_BONUS;

    // Calcul RSA
    const ressourcesTotales = this.salaires + this.autresRevenus;
    this.rsaMensuel = this.montantForfaitaire + this.bonusSortie - ressourcesTotales - this.forfaitLogement;

    // Vérifier éligibilité
    if (this.rsaMensuel <= 0) {
      this.rsaMensuel = 0;
      this.eligible = false;
      this.messageEligibilite = 'Vos ressources dépassent le plafond du RSA';
    } else {
      this.eligible = true;
      this.messageEligibilite = '';
    }

    this.rsaAnnuel = this.rsaMensuel * 12;

    // Arrondir
    this.montantForfaitaire = Math.round(this.montantForfaitaire * 100) / 100;
    this.forfaitLogement = Math.round(this.forfaitLogement * 100) / 100;
    this.bonusSortie = Math.round(this.bonusSortie * 100) / 100;
    this.rsaMensuel = Math.round(this.rsaMensuel * 100) / 100;
    this.rsaAnnuel = Math.round(this.rsaAnnuel * 100) / 100;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 2
    }).format(value);
  }
}
