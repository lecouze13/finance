import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
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
  selector: 'app-simulateur-frais-reels',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PanelModule,
    InputNumberModule,
    DropdownModule,
    CheckboxModule,
    TooltipModule,
    DecimalPipe,
    FaqSectionComponent,
    BreadcrumbComponent
  ],
  templateUrl: './simulateur-frais-reels.component.html',
  styleUrls: ['./simulateur-frais-reels.component.scss']
})
export class SimulateurFraisReelsComponent implements OnInit {
  // Barème kilométrique 2026 (voitures)
  BAREME_KM = {
    '3cv': { jusqu5000: 0.529, de5001a20000: 0.316, plus20000: 0.370 },
    '4cv': { jusqu5000: 0.606, de5001a20000: 0.340, plus20000: 0.407 },
    '5cv': { jusqu5000: 0.636, de5001a20000: 0.357, plus20000: 0.427 },
    '6cv': { jusqu5000: 0.665, de5001a20000: 0.374, plus20000: 0.447 },
    '7cv': { jusqu5000: 0.697, de5001a20000: 0.394, plus20000: 0.470 }
  };

  // Plafond abattement 10%
  PLAFOND_ABATTEMENT = 14171;
  PLANCHER_ABATTEMENT = 495;
  TAUX_ABATTEMENT = 0.10;

  // Inputs
  salaireAnnuelBrut: number = 35000;
  salaireAnnuelNet: number = 27300;

  // Frais kilométriques
  distanceDomicileTravail: number = 25;
  joursTravailles: number = 220;
  puissanceFiscale: string = '5cv';

  // Autres frais
  fraisRepas: number = 0;
  fraisFormation: number = 0;
  fraisTeletravail: number = 0;
  autresFrais: number = 0;

  // Résultats
  abattement10: number = 0;
  totalFraisReels: number = 0;
  fraisKm: number = 0;
  economieImpot: number = 0;
  optionRecommandee: string = '';
  differenceAnnuelle: number = 0;

  puissanceOptions = [
    { label: '3 CV et moins', value: '3cv' },
    { label: '4 CV', value: '4cv' },
    { label: '5 CV', value: '5cv' },
    { label: '6 CV', value: '6cv' },
    { label: '7 CV et plus', value: '7cv' }
  ];

  faqItems: FaqItem[] = [
    {
      question: "Qu'est-ce que l'abattement de 10% pour frais professionnels ?",
      answer: "L'abattement de 10% est une déduction forfaitaire appliquée automatiquement sur les salaires pour couvrir les frais professionnels (transport, repas, etc.). En 2026, il est plafonné à 14 171€ et ne peut être inférieur à 495€. C'est l'option par défaut si vous ne déclarez pas vos frais réels."
    },
    {
      question: "Quand est-il intéressant d'opter pour les frais réels ?",
      answer: "Les frais réels sont intéressants quand leur montant dépasse l'abattement de 10%. C'est souvent le cas si vous habitez loin de votre travail (plus de 20-25 km), si vous avez des frais de double résidence, ou si vous engagez des frais de formation importants. Ce simulateur vous aide à comparer."
    },
    {
      question: "Comment calculer mes frais kilométriques ?",
      answer: "Les frais kilométriques se calculent avec le barème fiscal officiel qui dépend de la puissance fiscale de votre véhicule et de la distance parcourue. La formule varie selon les tranches : jusqu'à 5000 km, de 5001 à 20000 km, et au-delà. Le trajet domicile-travail est limité à 80 km aller-retour (40 km simple)."
    },
    {
      question: "Quels frais puis-je déduire en frais réels ?",
      answer: "Vous pouvez déduire : les frais de transport (voiture, moto, transports en commun), les frais de repas (différence entre le coût et 5,35€), les frais de double résidence, les frais de formation, les frais de télétravail (2,70€/jour), les cotisations syndicales, et les frais de documentation professionnelle."
    },
    {
      question: "Dois-je conserver mes justificatifs ?",
      answer: "Oui, vous devez conserver tous les justificatifs pendant 3 ans (factures, tickets, relevés kilométriques). L'administration peut vous les demander en cas de contrôle. Pour les frais kilométriques, tenez un carnet de bord détaillant vos trajets professionnels."
    },
    {
      question: "Comment déclarer les frais réels ?",
      answer: "Sur votre déclaration de revenus (formulaire 2042), décochez la case 'abattement forfaitaire' et indiquez le montant total de vos frais réels dans la case 1AK (déclarant 1) ou 1BK (déclarant 2). Joignez le détail de vos frais sur papier libre ou conservez-le en cas de contrôle."
    },
    {
      question: "La distance domicile-travail est-elle limitée ?",
      answer: "Oui, la distance déductible est limitée à 40 km simple (80 km aller-retour) sauf si vous justifiez de circonstances particulières : emploi précaire, mutation professionnelle, situation familiale (garde d'enfants, emploi du conjoint). Au-delà, seuls 40 km sont retenus par trajet."
    },
    {
      question: "Puis-je déduire les frais de télétravail ?",
      answer: "Oui, si vous êtes en télétravail, vous pouvez déduire 2,70€ par jour de télétravail (plafonné à 59,40€/mois). Cela couvre l'électricité, le chauffage, l'internet. Si vos frais réels sont supérieurs (bureau dédié), vous pouvez les justifier précisément."
    },
    {
      question: "Comment sont calculés les frais de repas déductibles ?",
      answer: "Seule la différence entre le coût de votre repas et la valeur d'un repas pris à domicile (5,35€ en 2026) est déductible. Si vous payez 12€ de repas, vous déduisez 12€ - 5,35€ = 6,65€. Le plafond est de 20,70€ par repas (déduction max : 15,35€)."
    },
    {
      question: "Quelle est l'économie d'impôt avec les frais réels ?",
      answer: "L'économie dépend de votre tranche marginale d'imposition (TMI). Si vous êtes à 30% de TMI et que vos frais réels dépassent l'abattement de 2000€, vous économisez 2000€ x 30% = 600€ d'impôt. Plus votre TMI est élevée, plus l'avantage des frais réels est important."
    }
  ];

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Frais Réels ou Abattement 10% ? | Simulateur Fiscal 2026');
    this.meta.updateTag({
      name: 'description',
      content: 'Comparez l\'abattement forfaitaire de 10% et les frais réels pour optimiser votre déclaration de revenus. Calculez vos frais kilométriques avec le barème 2026.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'frais réels, abattement 10%, frais kilométriques, barème kilométrique 2026, déduction fiscale, impôt sur le revenu'
    });
    this.calculer();
  }

  calculer(): void {
    // Calcul de l'abattement 10%
    this.abattement10 = Math.min(
      Math.max(this.salaireAnnuelNet * this.TAUX_ABATTEMENT, this.PLANCHER_ABATTEMENT),
      this.PLAFOND_ABATTEMENT
    );

    // Calcul des frais kilométriques
    this.fraisKm = this.calculerFraisKm();

    // Total frais réels
    this.totalFraisReels = this.fraisKm + this.fraisRepas + this.fraisFormation +
                          this.fraisTeletravail + this.autresFrais;

    // Comparaison
    this.differenceAnnuelle = this.totalFraisReels - this.abattement10;

    if (this.totalFraisReels > this.abattement10) {
      this.optionRecommandee = 'frais_reels';
      // Estimation économie (TMI 30% par défaut)
      this.economieImpot = this.differenceAnnuelle * 0.30;
    } else {
      this.optionRecommandee = 'abattement';
      this.economieImpot = 0;
    }
  }

  calculerFraisKm(): number {
    // Distance limitée à 40 km simple (80 km A/R)
    const distanceRetenue = Math.min(this.distanceDomicileTravail, 40);
    const kmAnnuels = distanceRetenue * 2 * this.joursTravailles;

    const bareme = this.BAREME_KM[this.puissanceFiscale as keyof typeof this.BAREME_KM];

    if (kmAnnuels <= 5000) {
      return kmAnnuels * bareme.jusqu5000;
    } else if (kmAnnuels <= 20000) {
      // Formule : (d × tarif) + 1065 pour 4CV par exemple
      // Simplifié : on utilise le tarif intermédiaire
      return (kmAnnuels * bareme.de5001a20000) + (5000 * (bareme.jusqu5000 - bareme.de5001a20000));
    } else {
      return kmAnnuels * bareme.plus20000;
    }
  }

  getRecommandationClass(): string {
    return this.optionRecommandee === 'frais_reels' ? 'frais-reels' : 'abattement';
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  }
}
