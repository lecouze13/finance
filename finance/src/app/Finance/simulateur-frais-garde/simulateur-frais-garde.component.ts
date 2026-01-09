import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { FaqItem } from '../../shared/faq-section/faq-section.component';

@Component({
  selector: 'app-simulateur-frais-garde',
  templateUrl: './simulateur-frais-garde.component.html',
  styleUrls: ['./simulateur-frais-garde.component.scss'],
  standalone: false
})
export class SimulateurFraisGardeComponent implements OnInit {
  // Entrées
  modeGarde: string = 'creche';
  nombreEnfants: number = 1;
  revenuAnnuel: number = 45000;
  coutMensuel: number = 600;
  heuresParSemaine: number = 40;
  tauxHoraire: number = 12;
  nombreSemainesAn: number = 47;
  cmgDejaDeduit: boolean = false;

  // Résultats
  coutAnnuelBrut: number = 0;
  cmgEstime: number = 0;
  coutAnnuelNet: number = 0;
  creditImpot: number = 0;
  coutFinal: number = 0;
  coutMensuelFinal: number = 0;
  economieAnnuelle: number = 0;
  tauxPriseEnCharge: number = 0;

  modesGardeOptions = [
    { label: 'Crèche collective', value: 'creche' },
    { label: 'Assistante maternelle', value: 'assmat' },
    { label: 'Garde à domicile', value: 'domicile' },
    { label: 'Micro-crèche PAJE', value: 'microcreche' }
  ];

  faqItems: FaqItem[] = [
    {
      question: "Comment fonctionne le crédit d'impôt pour frais de garde ?",
      answer: "Le crédit d'impôt pour frais de garde d'enfant de moins de 6 ans correspond à 50% des dépenses engagées, plafonnées à 3 500€ par enfant (soit un crédit max de 1 750€). Ce crédit est remboursable : même si vous n'êtes pas imposable, vous recevez la somme. Il concerne la garde hors du domicile (crèche, assistante maternelle, etc.)."
    },
    {
      question: "Qu'est-ce que le CMG et comment est-il calculé ?",
      answer: "Le Complément de libre choix du Mode de Garde (CMG) est une aide de la CAF pour les enfants de moins de 6 ans gardés par une assistante maternelle ou une garde à domicile. Son montant dépend de vos revenus, du nombre d'enfants et de l'âge de l'enfant. Le CMG prend en charge jusqu'à 85% du coût pour les revenus modestes."
    },
    {
      question: "Peut-on cumuler CMG et crédit d'impôt ?",
      answer: "Oui, les deux aides sont cumulables mais le crédit d'impôt se calcule sur les dépenses restant à votre charge après déduction du CMG. Concrètement : vous payez 500€/mois, recevez 300€ de CMG, votre crédit d'impôt porte sur 200€×12 = 2 400€, soit 1 200€ de crédit d'impôt."
    },
    {
      question: "Quel est le plafond du crédit d'impôt garde d'enfant ?",
      answer: "Le plafond des dépenses est de 3 500€ par enfant et par an pour la garde hors domicile (crédit max 1 750€). Pour la garde à domicile, le plafond est de 12 000€ majoré de 1 500€ par enfant (max 15 000€), donnant un crédit max de 6 000€ à 7 500€ selon la composition familiale."
    },
    {
      question: "Quelles dépenses sont éligibles au crédit d'impôt ?",
      answer: "Pour la garde hors domicile : frais de crèche, assistante maternelle, halte-garderie, jardin d'enfants. Pour la garde à domicile : salaire net et cotisations sociales de la garde d'enfant. Les frais de repas et d'entretien chez l'assistante maternelle ne sont pas éligibles."
    },
    {
      question: "Comment déclarer les frais de garde aux impôts ?",
      answer: "Les frais doivent être déclarés dans la case 7GA à 7GG (selon le nombre d'enfants) du formulaire 2042 RICI. Déclarez le montant net après déduction des aides (CMG, aide employeur). Conservez les justificatifs (attestations fiscales) pendant 3 ans en cas de contrôle."
    },
    {
      question: "L'aide de l'employeur pour la garde est-elle imposable ?",
      answer: "Les aides de l'employeur (CESU préfinancé, participation aux frais de crèche) sont exonérées d'impôt jusqu'à 2 421€ par an et par salarié. Au-delà, l'excédent est ajouté à votre revenu imposable. Ces aides réduisent la base du crédit d'impôt."
    },
    {
      question: "Jusqu'à quel âge peut-on bénéficier de ces aides ?",
      answer: "Le crédit d'impôt garde hors domicile concerne les enfants de moins de 6 ans au 1er janvier de l'année d'imposition. Le CMG est versé jusqu'aux 6 ans de l'enfant. Pour la garde à domicile, il n'y a pas de limite d'âge pour le crédit d'impôt (mais le CMG s'arrête à 6 ans)."
    },
    {
      question: "Comment choisir entre crèche et assistante maternelle ?",
      answer: "La crèche municipale est souvent moins chère (tarif selon revenus) mais les places sont rares. L'assistante maternelle offre plus de flexibilité horaire et un suivi personnalisé. La garde à domicile est la plus coûteuse mais pratique pour les horaires atypiques ou plusieurs enfants. Comparez le coût net après aides."
    },
    {
      question: "Comment optimiser le coût de la garde d'enfant ?",
      answer: "Pour optimiser : 1) Choisissez le mode de garde le plus avantageux après aides, 2) Demandez le CMG dès le premier mois de garde, 3) Déclarez tous les frais éligibles au crédit d'impôt, 4) Vérifiez les aides de votre employeur/CE, 5) Renseignez-vous sur les aides locales (mairie, département)."
    }
  ];

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Simulateur Frais de Garde 2025 | Crédit d\'Impôt et CMG');
    this.meta.updateTag({
      name: 'description',
      content: 'Calculez le coût réel de la garde de vos enfants après crédit d\'impôt et CMG. Comparez crèche, assistante maternelle et garde à domicile. Simulation gratuite.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'frais garde enfant, crédit impôt garde, CMG, assistante maternelle coût, crèche tarif, simulation garde enfant, aide CAF garde'
    });
    this.calculer();
  }

  calculer(): void {
    // Calcul du coût annuel brut selon le mode de garde
    if (this.modeGarde === 'creche' || this.modeGarde === 'microcreche') {
      this.coutAnnuelBrut = this.coutMensuel * 12;
    } else {
      // Assistante maternelle ou garde à domicile
      this.coutAnnuelBrut = this.tauxHoraire * this.heuresParSemaine * this.nombreSemainesAn;
    }

    // Estimation du CMG selon les revenus et le mode de garde
    this.cmgEstime = this.calculerCMG();

    // Coût net après CMG
    if (this.cmgDejaDeduit) {
      this.coutAnnuelNet = this.coutAnnuelBrut;
    } else {
      this.coutAnnuelNet = Math.max(0, this.coutAnnuelBrut - this.cmgEstime);
    }

    // Crédit d'impôt (50% des frais, plafond 3500€ par enfant)
    const plafondParEnfant = this.modeGarde === 'domicile' ? 12000 + (this.nombreEnfants - 1) * 1500 : 3500;
    const plafondTotal = this.modeGarde === 'domicile'
      ? Math.min(plafondParEnfant, 15000)
      : plafondParEnfant * this.nombreEnfants;

    const baseCredit = Math.min(this.coutAnnuelNet, plafondTotal);
    this.creditImpot = baseCredit * 0.50;

    // Coût final après toutes les aides
    this.coutFinal = this.coutAnnuelNet - this.creditImpot;
    this.coutMensuelFinal = this.coutFinal / 12;

    // Économie totale
    this.economieAnnuelle = this.coutAnnuelBrut - this.coutFinal;

    // Taux de prise en charge
    this.tauxPriseEnCharge = this.coutAnnuelBrut > 0
      ? (this.economieAnnuelle / this.coutAnnuelBrut) * 100
      : 0;

    // Arrondir
    this.coutAnnuelBrut = Math.round(this.coutAnnuelBrut);
    this.cmgEstime = Math.round(this.cmgEstime);
    this.coutAnnuelNet = Math.round(this.coutAnnuelNet);
    this.creditImpot = Math.round(this.creditImpot);
    this.coutFinal = Math.round(this.coutFinal);
    this.coutMensuelFinal = Math.round(this.coutMensuelFinal);
    this.economieAnnuelle = Math.round(this.economieAnnuelle);
  }

  calculerCMG(): number {
    // Pas de CMG pour crèche collective (tarification déjà selon revenus)
    if (this.modeGarde === 'creche') {
      return 0;
    }

    // Barème CMG 2024 simplifié (enfant < 3 ans)
    // Tranche 1 : revenus < 22 191€ pour 1 enfant
    // Tranche 2 : revenus entre 22 191€ et 49 313€
    // Tranche 3 : revenus > 49 313€

    const plafond1 = 22191 + (this.nombreEnfants - 1) * 5500;
    const plafond2 = 49313 + (this.nombreEnfants - 1) * 6000;

    let cmgMensuel = 0;

    if (this.modeGarde === 'assmat' || this.modeGarde === 'microcreche') {
      // CMG assistante maternelle
      if (this.revenuAnnuel <= plafond1) {
        cmgMensuel = 532.76;
      } else if (this.revenuAnnuel <= plafond2) {
        cmgMensuel = 421.30;
      } else {
        cmgMensuel = 309.85;
      }
    } else if (this.modeGarde === 'domicile') {
      // CMG garde à domicile (montants plus élevés)
      if (this.revenuAnnuel <= plafond1) {
        cmgMensuel = 921.18;
      } else if (this.revenuAnnuel <= plafond2) {
        cmgMensuel = 764.68;
      } else {
        cmgMensuel = 608.18;
      }
    }

    return cmgMensuel * 12;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  }
}
