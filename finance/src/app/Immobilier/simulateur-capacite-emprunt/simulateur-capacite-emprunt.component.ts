import { Component, OnInit, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

// PrimeNG modules
import { PanelModule } from 'primeng/panel';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';

// Shared components
import { FaqItem, FaqSectionComponent } from '../../shared/faq-section/faq-section.component';
import { SimilarArticle, SimilarArticlesComponent } from '../../shared/components/similar-articles/similar-articles.component';
import { SommaireItem, SommaireComponent } from '../../shared/sommaire/sommaire.component';
import { ShareButtonComponent } from '../../shared/components/share-button/share-button.component';
import { UpdateBlockComponent } from '../../shared/components/update-block/update-block.component';
import { AuthorBioComponent } from '../../shared/components/author-bio/author-bio.component';

// Services
import { ExportService, ExportData } from '../../shared/services/export.service';
import { UrlStateService, UrlStateConfig } from '../../shared/services/url-state.service';

@Component({
  selector: 'app-simulateur-capacite-emprunt',
  templateUrl: './simulateur-capacite-emprunt.component.html',
  styleUrls: ['./simulateur-capacite-emprunt.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PanelModule,
    InputNumberModule,
    DropdownModule,
    FaqSectionComponent,
    SimilarArticlesComponent,
    SommaireComponent,
    ShareButtonComponent,
    UpdateBlockComponent,
    AuthorBioComponent
  ]
})
export class SimulateurCapaciteEmpruntComponent implements OnInit {
  @ViewChild('shareButton') shareButton!: ShareButtonComponent;

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

  // Config URL state
  private urlStateConfig: UrlStateConfig = {
    revenus: { type: 'number', default: 3500 },
    revenusConjoint: { type: 'number', default: 0 },
    autresRevenus: { type: 'number', default: 0 },
    chargesMensuelles: { type: 'number', default: 500 },
    creditEnCours: { type: 'number', default: 0 },
    apportPersonnel: { type: 'number', default: 20000 },
    dureeEmprunt: { type: 'number', default: 20 },
    tauxInteret: { type: 'number', default: 3.5 },
    tauxAssurance: { type: 'number', default: 0.36 },
    tauxEndettementMax: { type: 'number', default: 35 }
  };

  dureeOptions = [
    { label: '10 ans', value: 10 },
    { label: '15 ans', value: 15 },
    { label: '20 ans', value: 20 },
    { label: '25 ans', value: 25 }
  ];

  // Sommaire items
  sommaireItems: SommaireItem[] = [
    { id: 'simulateur', label: 'Simulateur', icon: 'pi pi-calculator' },
    { id: 'resultats', label: 'Résultats', icon: 'pi pi-chart-bar' },
    { id: 'faq', label: 'FAQ', icon: 'pi pi-question-circle' },
    { id: 'articles', label: 'Articles similaires', icon: 'pi pi-book' }
  ];

  // Articles similaires
  similarArticles: SimilarArticle[] = [
    {
      title: 'Simulateur de Prêt Immobilier',
      description: 'Calculez vos mensualités et le coût total de votre crédit immobilier avec notre simulateur détaillé.',
      url: '/simulateur-pret-immobilier',
      icon: 'pi pi-home',
      category: 'Immobilier'
    },
    {
      title: 'Calculateur de Frais de Notaire',
      description: 'Estimez précisément les frais de notaire pour votre achat immobilier : droits de mutation, émoluments et débours.',
      url: '/simulateur-frais-notaire',
      icon: 'pi pi-file',
      category: 'Immobilier'
    }
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
    private route: ActivatedRoute,
    private exportService: ExportService,
    private urlStateService: UrlStateService,
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

    // Charger les paramètres depuis l'URL
    this.loadStateFromUrl();

    this.calculer();
  }

  private loadStateFromUrl(): void {
    const urlState = this.urlStateService.getStateFromUrl<any>(this.route, this.urlStateConfig);

    if (urlState['revenus'] !== undefined) this.revenus = urlState['revenus'];
    if (urlState['revenusConjoint'] !== undefined) this.revenusConjoint = urlState['revenusConjoint'];
    if (urlState['autresRevenus'] !== undefined) this.autresRevenus = urlState['autresRevenus'];
    if (urlState['chargesMensuelles'] !== undefined) this.chargesMensuelles = urlState['chargesMensuelles'];
    if (urlState['creditEnCours'] !== undefined) this.creditEnCours = urlState['creditEnCours'];
    if (urlState['apportPersonnel'] !== undefined) this.apportPersonnel = urlState['apportPersonnel'];
    if (urlState['dureeEmprunt'] !== undefined) this.dureeEmprunt = urlState['dureeEmprunt'];
    if (urlState['tauxInteret'] !== undefined) this.tauxInteret = urlState['tauxInteret'];
    if (urlState['tauxAssurance'] !== undefined) this.tauxAssurance = urlState['tauxAssurance'];
    if (urlState['tauxEndettementMax'] !== undefined) this.tauxEndettementMax = urlState['tauxEndettementMax'];
  }

  private getCurrentState(): Record<string, any> {
    return {
      revenus: this.revenus,
      revenusConjoint: this.revenusConjoint,
      autresRevenus: this.autresRevenus,
      chargesMensuelles: this.chargesMensuelles,
      creditEnCours: this.creditEnCours,
      apportPersonnel: this.apportPersonnel,
      dureeEmprunt: this.dureeEmprunt,
      tauxInteret: this.tauxInteret,
      tauxAssurance: this.tauxAssurance,
      tauxEndettementMax: this.tauxEndettementMax
    };
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

  async partager(): Promise<void> {
    const success = await this.urlStateService.copyShareUrl(
      this.getCurrentState(),
      this.urlStateConfig
    );

    if (success && this.shareButton) {
      this.shareButton.showCopiedFeedback();
    }
  }

  exporterPDF(): void {
    const exportData: ExportData = {
      title: 'Simulation Capacité d\'Emprunt Immobilier',
      subtitle: 'Estimation personnalisée de votre capacité d\'emprunt',
      date: new Date(),
      sections: [
        {
          title: 'Vos revenus',
          rows: [
            { label: 'Revenus nets mensuels', value: this.revenus, type: 'currency' },
            { label: 'Revenus co-emprunteur', value: this.revenusConjoint, type: 'currency' },
            { label: 'Autres revenus', value: this.autresRevenus, type: 'currency' },
            { label: 'Total revenus', value: this.revenusTotaux, type: 'currency', highlight: true }
          ]
        },
        {
          title: 'Vos charges',
          rows: [
            { label: 'Charges mensuelles', value: this.chargesMensuelles, type: 'currency' },
            { label: 'Crédits en cours', value: this.creditEnCours, type: 'currency' }
          ]
        },
        {
          title: 'Paramètres du prêt',
          rows: [
            { label: 'Apport personnel', value: this.apportPersonnel, type: 'currency' },
            { label: 'Durée du prêt', value: `${this.dureeEmprunt} ans`, type: 'text' },
            { label: 'Taux d\'intérêt', value: this.tauxInteret, type: 'percent' },
            { label: 'Taux d\'assurance', value: this.tauxAssurance, type: 'percent' },
            { label: 'Taux d\'endettement max', value: this.tauxEndettementMax, type: 'percent' }
          ]
        },
        {
          title: 'Résultats',
          rows: [
            { label: 'Capacité d\'emprunt', value: this.capaciteEmprunt, type: 'currency', highlight: true },
            { label: 'Budget total (avec apport)', value: this.budgetTotal, type: 'currency', highlight: true },
            { label: 'Mensualité maximale', value: this.mensualiteMax, type: 'currency' },
            { label: 'Mensualité disponible', value: this.mensualiteDisponible, type: 'currency' },
            { label: 'Coût total du crédit', value: this.coutTotalCredit, type: 'currency' },
            { label: 'Taux d\'endettement actuel', value: this.tauxEndettementActuel, type: 'percent' },
            { label: 'Reste à vivre estimé', value: this.resteAVivre, type: 'currency' }
          ]
        }
      ]
    };

    this.exportService.exportToPDF(exportData, 'capacite-emprunt');
  }

  exporterCSV(): void {
    const exportData: ExportData = {
      title: 'Simulation Capacité d\'Emprunt Immobilier',
      subtitle: 'Estimation personnalisée',
      date: new Date(),
      sections: [
        {
          title: 'Revenus',
          rows: [
            { label: 'Revenus nets mensuels', value: this.revenus, type: 'currency' },
            { label: 'Revenus co-emprunteur', value: this.revenusConjoint, type: 'currency' },
            { label: 'Autres revenus', value: this.autresRevenus, type: 'currency' },
            { label: 'Total revenus', value: this.revenusTotaux, type: 'currency' }
          ]
        },
        {
          title: 'Charges',
          rows: [
            { label: 'Charges mensuelles', value: this.chargesMensuelles, type: 'currency' },
            { label: 'Crédits en cours', value: this.creditEnCours, type: 'currency' }
          ]
        },
        {
          title: 'Paramètres',
          rows: [
            { label: 'Apport personnel', value: this.apportPersonnel, type: 'currency' },
            { label: 'Durée (années)', value: this.dureeEmprunt, type: 'number' },
            { label: 'Taux intérêt (%)', value: this.tauxInteret, type: 'number' },
            { label: 'Taux assurance (%)', value: this.tauxAssurance, type: 'number' },
            { label: 'Taux endettement max (%)', value: this.tauxEndettementMax, type: 'number' }
          ]
        },
        {
          title: 'Résultats',
          rows: [
            { label: 'Capacité d\'emprunt', value: this.capaciteEmprunt, type: 'currency' },
            { label: 'Budget total', value: this.budgetTotal, type: 'currency' },
            { label: 'Mensualité max', value: this.mensualiteMax, type: 'currency' },
            { label: 'Mensualité disponible', value: this.mensualiteDisponible, type: 'currency' },
            { label: 'Coût total crédit', value: this.coutTotalCredit, type: 'currency' },
            { label: 'Endettement actuel (%)', value: this.tauxEndettementActuel, type: 'number' },
            { label: 'Reste à vivre', value: this.resteAVivre, type: 'currency' }
          ]
        }
      ]
    };

    this.exportService.exportToCSV(exportData, 'capacite-emprunt');
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  }
}
