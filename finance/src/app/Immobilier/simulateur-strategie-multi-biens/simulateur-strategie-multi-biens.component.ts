import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule, DecimalPipe } from '@angular/common';
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

interface BienImmobilier {
  annee: number;
  numero: number;
  prixAchat: number;
  loyer: number;
  cashflowMensuel: number;
  cashflowAnnuel: number;
  capitalRestant: number;
  valeurBien: number;
}

interface SimulationAnnee {
  annee: number;
  nombreBiens: number;
  revenus: number;
  charges: number;
  cashflowTotal: number;
  cashflowCumule: number;
  patrimoineNet: number;
  detteTotale: number;
  valeurBrute: number;
  capaciteEmprunt: number;
  nouveauBienPossible: boolean;
}

@Component({
  selector: 'app-simulateur-strategie-multi-biens',
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
  templateUrl: './simulateur-strategie-multi-biens.component.html',
  styleUrls: ['./simulateur-strategie-multi-biens.component.scss']
})
export class SimulateurStrategieMultiBiensComponent implements OnInit {
  // Paramètres de départ
  revenusMensuels: number = 4000;
  apportInitial: number = 30000;
  epargnesMensuelles: number = 500;
  tauxEndettementMax: number = 35;

  // Paramètres d'achat type
  prixBienMoyen: number = 150000;
  apportParBien: number = 15000;
  loyerMensuel: number = 700;
  chargesMensuelles: number = 150;
  tauxCredit: number = 3.5;
  dureeCredit: number = 20;
  plusValueAnnuelle: number = 2;

  // Objectifs
  objectifBiens: number = 10;
  horizonSimulation: number = 25;

  // Résultats
  simulation: SimulationAnnee[] = [];
  biens: BienImmobilier[] = [];
  anneesObjectif: number = 0;
  cashflowFinal: number = 0;
  patrimoineNetFinal: number = 0;
  revenusPassifsFinal: number = 0;

  objectifOptions = [
    { label: '3 biens', value: 3 },
    { label: '5 biens', value: 5 },
    { label: '10 biens', value: 10 },
    { label: '15 biens', value: 15 },
    { label: '20 biens', value: 20 }
  ];

  dureeOptions = [
    { label: '15 ans', value: 15 },
    { label: '20 ans', value: 20 },
    { label: '25 ans', value: 25 }
  ];

  horizonOptions = [
    { label: '15 ans', value: 15 },
    { label: '20 ans', value: 20 },
    { label: '25 ans', value: 25 },
    { label: '30 ans', value: 30 }
  ];

  faqItems: FaqItem[] = [
    {
      question: "Qu'est-ce que la stratégie multi-biens en immobilier ?",
      answer: "La stratégie multi-biens consiste à constituer progressivement un patrimoine immobilier en réinvestissant les cash-flows générés par les premiers biens pour en acquérir de nouveaux. L'effet boule de neige permet d'accélérer l'acquisition : chaque bien finance en partie le suivant grâce aux loyers et à la reconstitution de capacité d'emprunt."
    },
    {
      question: "Comment fonctionne l'effet de levier bancaire ?",
      answer: "L'effet de levier permet d'investir avec l'argent de la banque. Si vous achetez un bien à 150 000€ avec 15 000€ d'apport et que le bien génère un rendement de 6%, le rendement sur votre apport est bien supérieur. Les loyers remboursent une partie du crédit, créant un effet d'enrichissement accéléré."
    },
    {
      question: "Comment la banque calcule ma capacité d'emprunt pour le 2e bien ?",
      answer: "Les banques intègrent 70% des revenus locatifs dans vos revenus, mais 100% des charges de crédit. Votre capacité dépend donc du cash-flow de vos biens existants. Un bien avec cash-flow positif améliore votre capacité, un bien en cash-flow négatif la réduit. Le taux d'endettement reste limité à 35%."
    },
    {
      question: "Quelle est la différence entre patrimoine brut et net ?",
      answer: "Le patrimoine brut représente la valeur totale de vos biens immobiliers. Le patrimoine net = patrimoine brut - capital restant dû sur les crédits. C'est votre richesse réelle si vous vendiez tout. Au fil du temps, le capital se rembourse et la plus-value augmente, votre patrimoine net croît."
    },
    {
      question: "Comment atteindre 10 biens immobiliers ?",
      answer: "Atteindre 10 biens nécessite patience et stratégie : 1) Commencez par des biens à fort cash-flow pour reconstituer rapidement votre capacité d'emprunt, 2) Épargnez rigoureusement entre chaque achat pour l'apport, 3) Optimisez la fiscalité (LMNP, déficit foncier), 4) Considérez l'achat via SCI ou holding pour dépasser les limites individuelles."
    },
    {
      question: "Quel est le cash-flow minimum pour acheter un nouveau bien ?",
      answer: "Un cash-flow positif facilite l'acquisition du bien suivant. Idéalement, visez 100-200€ de cash-flow mensuel par bien. Cela permet de couvrir les imprévus (vacance, travaux) et d'améliorer votre dossier bancaire. Un cash-flow négatif n'empêche pas un nouvel achat mais complique le financement."
    },
    {
      question: "Quels sont les risques de la stratégie multi-biens ?",
      answer: "Les principaux risques sont : vacance locative simultanée sur plusieurs biens, hausse des taux d'intérêt si taux variable, dégradation de la valeur des biens, impayés de loyers, travaux imprévus importants. Une bonne gestion passe par des réserves de trésorerie (6 mois de charges minimum) et une diversification géographique."
    },
    {
      question: "Faut-il privilégier le cash-flow ou la plus-value ?",
      answer: "Cela dépend de votre stratégie : le cash-flow permet d'acheter plus vite mais génère moins de patrimoine à terme. La plus-value crée de la richesse mais nécessite plus de temps et d'apport. L'idéal est un équilibre : des biens en province à fort cash-flow pour financer des biens en zones tendues à forte plus-value."
    },
    {
      question: "Combien de temps pour devenir rentier immobilier ?",
      answer: "Devenir rentier (vivre de ses loyers) nécessite généralement 8-15 ans d'investissement actif selon votre point de départ. Pour 3000€/mois de revenus passifs nets, comptez environ 8-10 biens bien négociés. Le simulateur vous permet d'estimer précisément votre trajectoire selon vos paramètres personnels."
    },
    {
      question: "Comment optimiser sa fiscalité avec plusieurs biens ?",
      answer: "Plusieurs leviers existent : le LMNP au réel permet d'amortir les biens et de réduire fortement l'imposition, le déficit foncier permet de déduire les travaux de vos revenus, la SCI à l'IS permet de capitaliser sans imposition immédiate. Un expert-comptable spécialisé est recommandé au-delà de 3 biens."
    }
  ];

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Simulateur Stratégie Multi-Biens Immobilier | De 1 à 10 biens');
    this.meta.updateTag({
      name: 'description',
      content: 'Simulez votre stratégie d\'investissement immobilier multi-biens. Calculez le temps nécessaire pour atteindre 5, 10 ou 15 biens grâce à l\'effet boule de neige des cash-flows.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'stratégie multi-biens, investissement immobilier, effet boule de neige, cash-flow immobilier, rentier immobilier, patrimoine locatif, 10 biens immobiliers'
    });
    this.calculer();
  }

  calculer(): void {
    this.simulation = [];
    this.biens = [];

    let apportDisponible = this.apportInitial;
    let nombreBiens = 0;
    let cashflowCumule = 0;
    let anneesAtteintes = 0;

    // Calcul de la mensualité pour un bien type
    const mensualiteCredit = this.calculerMensualite(this.prixBienMoyen - this.apportParBien, this.tauxCredit, this.dureeCredit);
    const cashflowMensuelType = this.loyerMensuel - this.chargesMensuelles - mensualiteCredit;

    for (let annee = 1; annee <= this.horizonSimulation; annee++) {
      // Ajouter épargne annuelle
      apportDisponible += this.epargnesMensuelles * 12;

      // Ajouter cash-flow des biens existants
      const cashflowAnnuelExistants = nombreBiens * cashflowMensuelType * 12;
      apportDisponible += Math.max(0, cashflowAnnuelExistants);
      cashflowCumule += cashflowAnnuelExistants;

      // Calculer capacité d'emprunt
      const revenusLocatifs = nombreBiens * this.loyerMensuel * 0.7; // 70% pris en compte
      const chargesCredits = nombreBiens * mensualiteCredit;
      const revenusTotaux = this.revenusMensuels + revenusLocatifs;
      const mensualiteMax = (revenusTotaux * this.tauxEndettementMax / 100) - chargesCredits;
      const capaciteEmprunt = this.calculerCapacite(mensualiteMax, this.tauxCredit, this.dureeCredit);

      // Peut-on acheter un nouveau bien ?
      const peutAcheter = apportDisponible >= this.apportParBien &&
                         capaciteEmprunt >= (this.prixBienMoyen - this.apportParBien) &&
                         nombreBiens < this.objectifBiens;

      if (peutAcheter) {
        nombreBiens++;
        apportDisponible -= this.apportParBien;

        this.biens.push({
          annee: annee,
          numero: nombreBiens,
          prixAchat: this.prixBienMoyen,
          loyer: this.loyerMensuel,
          cashflowMensuel: cashflowMensuelType,
          cashflowAnnuel: cashflowMensuelType * 12,
          capitalRestant: this.prixBienMoyen - this.apportParBien,
          valeurBien: this.prixBienMoyen
        });
      }

      // Mettre à jour les valeurs des biens (plus-value)
      this.biens.forEach(bien => {
        bien.valeurBien *= (1 + this.plusValueAnnuelle / 100);
        // Amortissement du capital
        const interet = bien.capitalRestant * (this.tauxCredit / 100 / 12);
        const capitalRembourse = mensualiteCredit - interet;
        bien.capitalRestant = Math.max(0, bien.capitalRestant - capitalRembourse * 12);
      });

      // Calcul patrimoine
      const valeurBrute = this.biens.reduce((sum, b) => sum + b.valeurBien, 0);
      const detteTotale = this.biens.reduce((sum, b) => sum + b.capitalRestant, 0);
      const patrimoineNet = valeurBrute - detteTotale + apportDisponible;

      this.simulation.push({
        annee,
        nombreBiens,
        revenus: nombreBiens * this.loyerMensuel * 12,
        charges: nombreBiens * (this.chargesMensuelles + mensualiteCredit) * 12,
        cashflowTotal: cashflowAnnuelExistants,
        cashflowCumule,
        patrimoineNet,
        detteTotale,
        valeurBrute,
        capaciteEmprunt,
        nouveauBienPossible: peutAcheter
      });

      // Vérifier si objectif atteint
      if (nombreBiens >= this.objectifBiens && anneesAtteintes === 0) {
        anneesAtteintes = annee;
      }
    }

    // Résultats finaux
    const derniere = this.simulation[this.simulation.length - 1];
    this.anneesObjectif = anneesAtteintes || 0;
    this.cashflowFinal = derniere?.cashflowTotal || 0;
    this.patrimoineNetFinal = derniere?.patrimoineNet || 0;
    this.revenusPassifsFinal = derniere?.revenus || 0;
  }

  calculerMensualite(capital: number, taux: number, duree: number): number {
    const tauxMensuel = taux / 100 / 12;
    const nbMensualites = duree * 12;
    if (tauxMensuel === 0) return capital / nbMensualites;
    return capital * (tauxMensuel * Math.pow(1 + tauxMensuel, nbMensualites)) /
           (Math.pow(1 + tauxMensuel, nbMensualites) - 1);
  }

  calculerCapacite(mensualite: number, taux: number, duree: number): number {
    if (mensualite <= 0) return 0;
    const tauxMensuel = taux / 100 / 12;
    const nbMensualites = duree * 12;
    if (tauxMensuel === 0) return mensualite * nbMensualites;
    return mensualite * ((1 - Math.pow(1 + tauxMensuel, -nbMensualites)) / tauxMensuel);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  }
}
