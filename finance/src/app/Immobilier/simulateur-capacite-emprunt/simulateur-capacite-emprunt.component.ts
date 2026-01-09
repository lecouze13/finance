import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { FaqItem } from '../../shared/faq-section/faq-section.component';

@Component({
  selector: 'app-simulateur-capacite-emprunt',
  templateUrl: './simulateur-capacite-emprunt.component.html',
  styleUrls: ['./simulateur-capacite-emprunt.component.scss'],
  standalone: false
})
export class SimulateurCapaciteEmpruntComponent implements OnInit {
  // Entrées
  revenus: number = 3500;
  revenusConjoint: number = 0;
  autresRevenus: number = 0;
  chargesMensuelles: number = 500;
  creditEnCours: number = 0;
  apportPersonnel: number = 20000;
  dureeEmprunt: number = 20;
  tauxInteret: number = 3.5;
  tauxAssurance: number = 0.36;
  tauxEndettementMax: number = 35;

  // Résultats
  revenusTotaux: number = 0;
  mensualiteMax: number = 0;
  mensualiteDisponible: number = 0;
  capaciteEmprunt: number = 0;
  budgetTotal: number = 0;
  coutTotalCredit: number = 0;
  tauxEndettementActuel: number = 0;
  resteAVivre: number = 0;

  dureeOptions = [
    { label: '10 ans', value: 10 },
    { label: '15 ans', value: 15 },
    { label: '20 ans', value: 20 },
    { label: '25 ans', value: 25 }
  ];

  faqItems: FaqItem[] = [
    {
      question: "Comment est calculée la capacité d'emprunt immobilier ?",
      answer: "La capacité d'emprunt est calculée en fonction de vos revenus, de vos charges et du taux d'endettement maximum autorisé (généralement 35%). La mensualité maximale ne doit pas dépasser 35% de vos revenus nets. Cette mensualité est ensuite convertie en capital empruntable selon le taux d'intérêt et la durée du prêt."
    },
    {
      question: "Qu'est-ce que le taux d'endettement et pourquoi 35% ?",
      answer: "Le taux d'endettement représente la part de vos revenus consacrée au remboursement de vos crédits. Le HCSF (Haut Conseil de Stabilité Financière) a fixé la limite à 35% depuis 2022 pour éviter le surendettement. Certaines banques peuvent accorder des dérogations pour les meilleurs profils (hauts revenus, reste à vivre confortable)."
    },
    {
      question: "Quels revenus sont pris en compte par les banques ?",
      answer: "Les banques prennent en compte : les salaires nets (100%), les revenus fonciers (70% généralement), les pensions et retraites (100%), les allocations familiales (sous conditions), les primes régulières (moyenne sur 3 ans). Les revenus variables comme les bonus sont souvent minorés ou exclus."
    },
    {
      question: "Comment l'apport personnel influence la capacité d'achat ?",
      answer: "L'apport personnel s'ajoute directement à votre capacité d'emprunt pour former le budget total d'achat. Un apport de 10% minimum est généralement demandé pour couvrir les frais de notaire. Un apport plus important peut permettre d'obtenir un meilleur taux ou de négocier les conditions du prêt."
    },
    {
      question: "Quelle durée d'emprunt choisir ?",
      answer: "La durée impacte directement votre capacité d'emprunt : plus elle est longue, plus vous pouvez emprunter. Cependant, le coût total du crédit augmente. Sur 25 ans vs 20 ans, vous gagnez environ 15% de capacité mais le coût total peut augmenter de 30%. La durée maximale est limitée à 25 ans par le HCSF."
    },
    {
      question: "Qu'est-ce que le reste à vivre et pourquoi est-il important ?",
      answer: "Le reste à vivre est la somme qui vous reste après paiement de toutes vos charges et crédits. Les banques vérifient qu'il est suffisant pour vivre décemment (environ 700-1000€ par personne). Un reste à vivre élevé peut permettre de dépasser les 35% d'endettement."
    },
    {
      question: "Comment les crédits en cours affectent ma capacité ?",
      answer: "Les crédits en cours (auto, conso, revolving) réduisent directement votre capacité d'emprunt car ils sont comptés dans votre taux d'endettement. Rembourser ces crédits avant de demander un prêt immobilier peut significativement augmenter votre capacité d'emprunt."
    },
    {
      question: "L'assurance emprunteur est-elle incluse dans le calcul ?",
      answer: "Oui, l'assurance emprunteur est obligatoire et incluse dans le calcul du taux d'endettement. Son coût varie selon votre âge, santé et profession (0.10% à 0.50% du capital). Vous pouvez faire jouer la concurrence avec la délégation d'assurance pour réduire ce coût."
    },
    {
      question: "Puis-je emprunter plus avec un co-emprunteur ?",
      answer: "Oui, les revenus du co-emprunteur sont additionnés aux vôtres, ce qui augmente mécaniquement la capacité d'emprunt. Cependant, les charges du co-emprunteur sont également prises en compte. Les deux emprunteurs sont solidairement responsables du remboursement."
    },
    {
      question: "Comment optimiser ma capacité d'emprunt ?",
      answer: "Pour optimiser votre capacité : soldez vos crédits à la consommation, augmentez votre apport personnel, allongez la durée (jusqu'à 25 ans max), négociez le taux d'intérêt et l'assurance, déclarez tous vos revenus réguliers, et présentez un dossier solide avec une situation professionnelle stable."
    }
  ];

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Simulateur Capacité d\'Emprunt Immobilier 2025 | Calculez votre Budget');
    this.meta.updateTag({
      name: 'description',
      content: 'Calculez gratuitement votre capacité d\'emprunt immobilier. Estimez le montant maximum que vous pouvez emprunter selon vos revenus, charges et le taux d\'endettement de 35%.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'capacité emprunt, simulation prêt immobilier, combien emprunter, taux endettement 35%, calculateur crédit immobilier, budget achat immobilier'
    });
    this.calculer();
  }

  calculer(): void {
    // Revenus totaux
    this.revenusTotaux = this.revenus + this.revenusConjoint + this.autresRevenus;

    // Mensualité maximale selon taux d'endettement
    this.mensualiteMax = (this.revenusTotaux * this.tauxEndettementMax) / 100;

    // Mensualité disponible après charges et crédits en cours
    this.mensualiteDisponible = Math.max(0, this.mensualiteMax - this.creditEnCours);

    // Calcul du taux d'endettement actuel
    this.tauxEndettementActuel = this.revenusTotaux > 0
      ? (this.creditEnCours / this.revenusTotaux) * 100
      : 0;

    // Calcul capacité d'emprunt
    // Taux mensuel (intérêt + assurance)
    const tauxMensuel = (this.tauxInteret + this.tauxAssurance) / 100 / 12;
    const nombreMensualites = this.dureeEmprunt * 12;

    if (tauxMensuel > 0 && this.mensualiteDisponible > 0) {
      // Formule : Capital = Mensualité × [(1 - (1 + taux)^-n) / taux]
      this.capaciteEmprunt = this.mensualiteDisponible *
        ((1 - Math.pow(1 + tauxMensuel, -nombreMensualites)) / tauxMensuel);
    } else {
      this.capaciteEmprunt = this.mensualiteDisponible * nombreMensualites;
    }

    // Budget total avec apport
    this.budgetTotal = this.capaciteEmprunt + this.apportPersonnel;

    // Coût total du crédit
    this.coutTotalCredit = (this.mensualiteDisponible * nombreMensualites) - this.capaciteEmprunt;

    // Reste à vivre
    this.resteAVivre = this.revenusTotaux - this.mensualiteMax - this.chargesMensuelles;

    // Arrondir les résultats
    this.capaciteEmprunt = Math.round(this.capaciteEmprunt);
    this.budgetTotal = Math.round(this.budgetTotal);
    this.coutTotalCredit = Math.round(this.coutTotalCredit);
    this.mensualiteMax = Math.round(this.mensualiteMax);
    this.mensualiteDisponible = Math.round(this.mensualiteDisponible);
    this.resteAVivre = Math.round(this.resteAVivre);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  }
}
