import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { PanelModule } from 'primeng/panel';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { FaqSectionComponent, FaqItem } from '../../shared/faq-section/faq-section.component';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';

interface ProjectionAnnee {
  annee: number;
  age: number;
  nombreBiens: number;
  revenusBruts: number;
  chargesTotal: number;
  cashflowNet: number;
  patrimoineNet: number;
  capitalRestant: number;
  tauxCouverture: number;
  fireAtteint: boolean;
}

@Component({
  selector: 'app-simulateur-fire-immobilier',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PanelModule,
    InputNumberModule,
    DropdownModule,
    SliderModule,
    TableModule,
    TooltipModule,
    DecimalPipe,
    FaqSectionComponent,
    BreadcrumbComponent
  ],
  templateUrl: './simulateur-fire-immobilier.component.html',
  styleUrls: ['./simulateur-fire-immobilier.component.scss']
})
export class SimulateurFireImmobilierComponent implements OnInit {
  Math = Math; // Pour utiliser Math dans le template

  // Situation personnelle
  ageActuel: number = 35;
  depensesMensuelles: number = 2500;
  margeSecurite: number = 20; // % de marge sur les dépenses

  // Patrimoine immobilier actuel
  nombreBiensActuel: number = 2;
  loyerMoyenParBien: number = 800;
  chargesMoyennesParBien: number = 200;
  mensualiteMoyenneParBien: number = 500;
  valeurMoyenneParBien: number = 150000;
  capitalRestantMoyenParBien: number = 100000;
  dureeRestanteMoyenne: number = 15;

  // Stratégie d'acquisition
  achatParAn: number = 1;
  apportParBien: number = 15000;
  tauxCredit: number = 3.5;
  dureeCredit: number = 20;

  // Hypothèses de projection
  augmentationLoyers: number = 1.5;
  plusValueAnnuelle: number = 2;
  inflationCharges: number = 2;
  horizonProjection: number = 25;

  // Résultats
  projections: ProjectionAnnee[] = [];
  anneeFire: number = 0;
  ageFire: number = 0;
  nombreBiensFire: number = 0;
  cashflowMensuelFire: number = 0;
  patrimoineNetFire: number = 0;
  objectifRevenusAnnuels: number = 0;

  horizonOptions = [
    { label: '15 ans', value: 15 },
    { label: '20 ans', value: 20 },
    { label: '25 ans', value: 25 },
    { label: '30 ans', value: 30 }
  ];

  faqItems: FaqItem[] = [
    {
      question: "Qu'est-ce que le FIRE immobilier ?",
      answer: "FIRE (Financial Independence, Retire Early) immobilier désigne l'atteinte de l'indépendance financière grâce aux revenus locatifs. L'objectif est que vos cash-flows immobiliers couvrent l'intégralité de vos dépenses, vous permettant de vivre sans dépendre d'un salaire. C'est une approche alternative au FIRE boursier classique."
    },
    {
      question: "Combien de biens faut-il pour être FIRE ?",
      answer: "Le nombre dépend de votre train de vie et du cash-flow par bien. Pour 2 500€/mois de besoins avec 250€/mois de cash-flow par bien, il faut 10 biens. Avec des biens mieux optimisés (400€/mois), 6-7 biens suffisent. L'important est le cash-flow total, pas le nombre de biens."
    },
    {
      question: "Quelle différence entre FIRE immobilier et FIRE boursier ?",
      answer: "Le FIRE boursier repose sur la règle des 4% (retirer 4% de son capital par an), nécessitant un capital de 25x ses dépenses. Le FIRE immobilier génère des revenus actifs (loyers) sans consommer le capital. L'immobilier offre aussi l'effet de levier (crédit) et la protection contre l'inflation (loyers indexés)."
    },
    {
      question: "Faut-il attendre d'avoir remboursé tous ses crédits ?",
      answer: "Non, le FIRE immobilier peut être atteint avec des crédits en cours si le cash-flow net (loyers - charges - crédits) couvre vos dépenses. Rembourser les crédits augmente ensuite le cash-flow progressivement. Certains atteignent le FIRE avec des crédits puis voient leur situation s'améliorer chaque année."
    },
    {
      question: "Comment calculer le taux de couverture FIRE ?",
      answer: "Taux de couverture = (Cash-flow net mensuel / Dépenses mensuelles) x 100. À 100%, vous êtes FIRE. À 50%, vos loyers couvrent la moitié de vos dépenses. Ce simulateur calcule ce ratio année par année pour visualiser votre progression vers l'indépendance financière."
    },
    {
      question: "Quelle marge de sécurité prévoir ?",
      answer: "Une marge de 20-30% est recommandée pour couvrir les imprévus (vacance, travaux, impayés). Si vos dépenses sont de 2 500€, visez un cash-flow de 3 000-3 250€. Cette marge permet aussi de constituer une épargne de précaution et d'absorber l'inflation future des dépenses."
    },
    {
      question: "Le FIRE immobilier est-il plus rapide que le FIRE boursier ?",
      answer: "Souvent oui, grâce à l'effet de levier. Avec 50 000€ d'apport, vous pouvez acquérir 3-4 biens générant 1000€/mois de cash-flow. En bourse, 50 000€ à 7%/an mettrait 20+ ans pour atteindre le même capital productif. L'immobilier accélère la phase d'accumulation."
    },
    {
      question: "Quels sont les risques du FIRE immobilier ?",
      answer: "Les risques incluent : dépendance à un seul type d'actif, illiquidité du patrimoine, gestion locative chronophage, risques réglementaires (encadrement loyers, interdiction location DPE F-G), et concentration géographique. Diversifier avec d'autres actifs (actions, SCPI) réduit ces risques."
    },
    {
      question: "Comment optimiser sa fiscalité pour le FIRE immobilier ?",
      answer: "Le LMNP au réel permet d'amortir les biens et de réduire fortement l'imposition sur les loyers. Le déficit foncier en location nue réduit l'IR. Une SCI à l'IS peut être pertinente pour capitaliser. L'optimisation fiscale augmente le cash-flow net et accélère l'atteinte du FIRE."
    },
    {
      question: "Peut-on atteindre le FIRE à 40 ans avec l'immobilier ?",
      answer: "C'est possible mais ambitieux. En commençant à 30 ans avec une stratégie agressive (1-2 biens/an), un bon cash-flow par bien (300€+), et une optimisation fiscale, le FIRE à 40 ans est atteignable. La clé est de commencer tôt, maximiser l'effet de levier, et réinvestir tous les cash-flows."
    }
  ];

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Simulateur FIRE Immobilier | Indépendance Financière par les Loyers');
    this.meta.updateTag({
      name: 'description',
      content: 'Calculez votre chemin vers l\'indépendance financière grâce à l\'immobilier locatif. Simulez le nombre de biens et années nécessaires pour vivre de vos loyers.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'FIRE immobilier, indépendance financière, vivre de ses loyers, rentier immobilier, liberté financière, revenus passifs immobilier'
    });
    this.calculer();
  }

  calculer(): void {
    this.projections = [];

    // Objectif de revenus avec marge de sécurité
    this.objectifRevenusAnnuels = this.depensesMensuelles * 12 * (1 + this.margeSecurite / 100);

    let nombreBiens = this.nombreBiensActuel;
    let loyerMoyen = this.loyerMoyenParBien;
    let chargesMoyennes = this.chargesMoyennesParBien;

    // Calcul des biens actuels
    interface BienInfo {
      mensualite: number;
      capitalRestant: number;
      dureeRestante: number;
      valeur: number;
    }

    let biens: BienInfo[] = [];

    // Initialiser les biens existants
    for (let i = 0; i < this.nombreBiensActuel; i++) {
      biens.push({
        mensualite: this.mensualiteMoyenneParBien,
        capitalRestant: this.capitalRestantMoyenParBien,
        dureeRestante: this.dureeRestanteMoyenne,
        valeur: this.valeurMoyenneParBien
      });
    }

    this.anneeFire = 0;

    for (let annee = 1; annee <= this.horizonProjection; annee++) {
      // Ajouter nouveaux biens
      const nouveauxBiens = annee === 1 ? 0 : this.achatParAn;
      for (let i = 0; i < nouveauxBiens; i++) {
        const montantEmprunte = this.valeurMoyenneParBien - this.apportParBien;
        const mensualite = this.calculerMensualite(montantEmprunte, this.tauxCredit, this.dureeCredit);
        biens.push({
          mensualite: mensualite,
          capitalRestant: montantEmprunte,
          dureeRestante: this.dureeCredit,
          valeur: this.valeurMoyenneParBien
        });
      }

      nombreBiens = biens.length;

      // Mise à jour des biens existants
      let totalMensualites = 0;
      let totalCapitalRestant = 0;
      let totalValeur = 0;

      biens.forEach(bien => {
        // Amortissement
        if (bien.dureeRestante > 0 && bien.capitalRestant > 0) {
          const tauxMensuel = this.tauxCredit / 100 / 12;
          for (let m = 0; m < 12; m++) {
            if (bien.capitalRestant > 0) {
              const interet = bien.capitalRestant * tauxMensuel;
              const capital = bien.mensualite - interet;
              bien.capitalRestant = Math.max(0, bien.capitalRestant - capital);
            }
          }
          bien.dureeRestante--;
          totalMensualites += bien.mensualite;
        }

        // Plus-value
        bien.valeur *= (1 + this.plusValueAnnuelle / 100);

        totalCapitalRestant += bien.capitalRestant;
        totalValeur += bien.valeur;
      });

      // Calcul des revenus
      loyerMoyen *= (1 + this.augmentationLoyers / 100);
      chargesMoyennes *= (1 + this.inflationCharges / 100);

      const revenusBruts = nombreBiens * loyerMoyen * 12;
      const chargesTotal = nombreBiens * chargesMoyennes * 12;
      const mensualitesTotal = totalMensualites * 12;
      const cashflowNet = revenusBruts - chargesTotal - mensualitesTotal;
      const patrimoineNet = totalValeur - totalCapitalRestant;
      const tauxCouverture = (cashflowNet / this.objectifRevenusAnnuels) * 100;

      const fireAtteint = cashflowNet >= this.objectifRevenusAnnuels;

      if (fireAtteint && this.anneeFire === 0) {
        this.anneeFire = annee;
        this.ageFire = this.ageActuel + annee;
        this.nombreBiensFire = nombreBiens;
        this.cashflowMensuelFire = cashflowNet / 12;
        this.patrimoineNetFire = patrimoineNet;
      }

      this.projections.push({
        annee,
        age: this.ageActuel + annee,
        nombreBiens,
        revenusBruts,
        chargesTotal: chargesTotal + mensualitesTotal,
        cashflowNet,
        patrimoineNet,
        capitalRestant: totalCapitalRestant,
        tauxCouverture: Math.min(tauxCouverture, 200),
        fireAtteint
      });
    }
  }

  calculerMensualite(capital: number, taux: number, duree: number): number {
    const tauxMensuel = taux / 100 / 12;
    const nbMensualites = duree * 12;
    if (tauxMensuel === 0) return capital / nbMensualites;
    return capital * (tauxMensuel * Math.pow(1 + tauxMensuel, nbMensualites)) /
           (Math.pow(1 + tauxMensuel, nbMensualites) - 1);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  }

  getCouvertureClass(taux: number): string {
    if (taux >= 100) return 'fire';
    if (taux >= 75) return 'proche';
    if (taux >= 50) return 'moyen';
    return 'debut';
  }
}
