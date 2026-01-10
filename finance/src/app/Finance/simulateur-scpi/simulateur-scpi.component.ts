import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { FaqItem } from '../../shared/faq-section/faq-section.component';
import { ExportData } from '../../shared/services/export.service';
import { ScenarioComparisonService, ScenarioResult, ComparisonMetric } from '../../shared/services/scenario-comparison.service';

@Component({
  selector: 'app-simulateur-scpi',
  templateUrl: './simulateur-scpi.component.html',
  styleUrls: ['./simulateur-scpi.component.scss'],
  standalone: false
})
export class SimulateurScpiComponent implements OnInit {
  // Entrées investissement
  montantInvesti: number = 50000;
  prixPart: number = 200;
  tauxDistribution: number = 4.5;
  tauxRevalorisation: number = 1;
  fraisEntree: number = 10;
  fraisGestion: number = 0; // Inclus dans le taux de distribution
  dureeDetention: number = 10;

  // Mode de financement
  modeFinancement: string = 'comptant'; // 'comptant' ou 'credit'
  montantCredit: number = 50000;
  tauxCredit: number = 3.5;
  dureeCredit: number = 15;
  apportPersonnel: number = 0;

  // Fiscalité
  trancheMarginaleTMI: number = 30;
  regimeFiscal: string = 'reel'; // 'reel' ou 'microfoncier'

  // Résultats
  nombreParts: number = 0;
  valeurAcquisition: number = 0;
  fraisEntreeTotal: number = 0;
  revenuAnnuelBrut: number = 0;
  revenuMensuelBrut: number = 0;
  impotAnnuel: number = 0;
  prelevementsSociaux: number = 0;
  revenuAnnuelNet: number = 0;
  rendementNetApresImpot: number = 0;

  // Crédit
  mensualiteCredit: number = 0;
  coutTotalCredit: number = 0;
  effortEpargne: number = 0;

  // Projection
  projection: any[] = [];
  valeurFinale: number = 0;
  plusValue: number = 0;
  totalRevenusPercus: number = 0;
  rendementGlobal: number = 0;

  tmiOptions = [
    { label: '0%', value: 0 },
    { label: '11%', value: 11 },
    { label: '30%', value: 30 },
    { label: '41%', value: 41 },
    { label: '45%', value: 45 }
  ];

  regimeOptions = [
    { label: 'Régime réel', value: 'reel' },
    { label: 'Micro-foncier', value: 'microfoncier' }
  ];

  financementOptions = [
    { label: 'Comptant', value: 'comptant' },
    { label: 'À crédit', value: 'credit' }
  ];

  faqItems: FaqItem[] = [
    {
      question: "Qu'est-ce qu'une SCPI ?",
      answer: "Une SCPI (Société Civile de Placement Immobilier) est un placement collectif qui permet d'investir dans l'immobilier professionnel (bureaux, commerces, entrepôts) sans gérer directement les biens. Vous achetez des parts et percevez des revenus locatifs proportionnels, généralement trimestriels."
    },
    {
      question: "Quel est le rendement moyen d'une SCPI ?",
      answer: "Le taux de distribution moyen des SCPI oscille entre 4% et 6% brut par an. Les SCPI de bureaux offrent généralement 4-5%, les SCPI diversifiées 4,5-5,5%, et certaines SCPI spécialisées (logistique, santé) peuvent atteindre 5-6%. Ces rendements sont bruts avant fiscalité."
    },
    {
      question: "Quels sont les frais d'une SCPI ?",
      answer: "Les frais d'entrée (souscription) représentent 8-12% du montant investi. Les frais de gestion (1-1,5%/an) sont déjà déduits du taux de distribution affiché. Certaines SCPI prélèvent aussi des frais de cession (5% environ) en cas de revente sur le marché secondaire."
    },
    {
      question: "Comment sont imposés les revenus de SCPI ?",
      answer: "Les revenus de SCPI sont imposés comme des revenus fonciers : TMI + prélèvements sociaux (17,2%). En micro-foncier (revenus < 15 000€/an), abattement de 30%. Au régime réel, déduction des intérêts d'emprunt si achat à crédit. La fiscalité peut atteindre 47,2% à 62,2% selon votre TMI."
    },
    {
      question: "Quelle durée de détention recommandée ?",
      answer: "La durée minimale recommandée est de 8 à 10 ans pour amortir les frais d'entrée et bénéficier de la revalorisation des parts. L'investissement en SCPI n'est pas liquide : la revente peut prendre plusieurs semaines à plusieurs mois selon la SCPI."
    },
    {
      question: "Peut-on acheter des SCPI à crédit ?",
      answer: "Oui, c'est même une stratégie répandue pour créer un effet de levier. Les intérêts d'emprunt sont déductibles des revenus fonciers (régime réel). L'effort d'épargne mensuel correspond à la différence entre la mensualité du crédit et les revenus perçus."
    },
    {
      question: "Quels sont les risques des SCPI ?",
      answer: "Les principaux risques sont : baisse du rendement (vacance locative, loyers impayés), baisse du prix des parts (marché immobilier), risque de liquidité (délai de revente), risque de taux si achat à crédit. Le capital n'est pas garanti mais les SCPI sont historiquement stables."
    },
    {
      question: "SCPI en direct ou via assurance-vie ?",
      answer: "En assurance-vie : fiscalité avantageuse après 8 ans, liquidité garantie par l'assureur, mais frais supplémentaires et moins de choix de SCPI. En direct : plus de choix, possibilité d'acheter à crédit (intérêts déductibles), mais fiscalité plus lourde et liquidité moindre."
    },
    {
      question: "Qu'est-ce que le délai de jouissance ?",
      answer: "Le délai de jouissance est la période entre l'achat des parts et le premier versement de revenus (3 à 6 mois généralement). Pendant cette période, votre argent est investi mais ne produit pas encore de revenus. Ce délai est compensé par un prix de souscription parfois réduit."
    },
    {
      question: "Comment choisir sa SCPI ?",
      answer: "Critères clés : taux de distribution (rendement), taux d'occupation financier (>90% idéal), capitalisation (>500M€ pour la liquidité), diversification géographique et sectorielle, historique de performance, qualité de la société de gestion. Diversifiez sur plusieurs SCPI."
    }
  ];

  // Comparaison de scénarios
  readonly simulatorType = 'scpi';
  comparisonMetrics: ComparisonMetric[] = [
    { key: 'Revenus nets/an', label: 'Revenus nets/an', type: 'currency', higherIsBetter: true },
    { key: 'Rendement net', label: 'Rendement net', type: 'percent', higherIsBetter: true },
    { key: 'Valeur finale', label: 'Valeur finale', type: 'currency', higherIsBetter: true },
    { key: 'Rendement global', label: 'Rendement global', type: 'percent', higherIsBetter: true }
  ];

  constructor(
    private meta: Meta,
    private title: Title,
    private comparisonService: ScenarioComparisonService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Simulateur SCPI 2025 | Calculez votre Rentabilité Nette');
    this.meta.updateTag({
      name: 'description',
      content: 'Simulez votre investissement SCPI : rendement net après impôts, projection sur 10-20 ans, comparaison comptant vs crédit. Calculez vos revenus locatifs.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'SCPI, simulateur SCPI, rendement SCPI, investissement SCPI, revenus fonciers, pierre papier, placement immobilier'
    });
    this.calculer();
  }

  calculer(): void {
    // Calculs de base
    this.nombreParts = Math.floor(this.montantInvesti / this.prixPart);
    this.valeurAcquisition = this.nombreParts * this.prixPart;
    this.fraisEntreeTotal = this.valeurAcquisition * this.fraisEntree / 100;

    // Revenus bruts annuels
    this.revenuAnnuelBrut = this.valeurAcquisition * this.tauxDistribution / 100;
    this.revenuMensuelBrut = this.revenuAnnuelBrut / 12;

    // Calcul fiscalité
    this.calculerFiscalite();

    // Calcul crédit si applicable
    if (this.modeFinancement === 'credit') {
      this.calculerCredit();
    } else {
      this.mensualiteCredit = 0;
      this.coutTotalCredit = 0;
      this.effortEpargne = 0;
    }

    // Rendement net après impôt
    const investissementReel = this.modeFinancement === 'credit'
      ? this.apportPersonnel + this.fraisEntreeTotal
      : this.valeurAcquisition + this.fraisEntreeTotal;

    this.rendementNetApresImpot = investissementReel > 0
      ? (this.revenuAnnuelNet / investissementReel) * 100
      : 0;

    // Générer projection
    this.genererProjection();
  }

  calculerFiscalite(): void {
    let revenuImposable = this.revenuAnnuelBrut;

    // Déduction des intérêts si crédit et régime réel
    if (this.modeFinancement === 'credit' && this.regimeFiscal === 'reel') {
      const interetsAnnuels = this.calculerInteretsAnnuels();
      revenuImposable = Math.max(0, revenuImposable - interetsAnnuels);
    }

    // Micro-foncier : abattement 30%
    if (this.regimeFiscal === 'microfoncier') {
      revenuImposable = revenuImposable * 0.7;
    }

    // Impôt sur le revenu
    this.impotAnnuel = revenuImposable * this.trancheMarginaleTMI / 100;

    // Prélèvements sociaux (17.2%)
    this.prelevementsSociaux = revenuImposable * 0.172;

    // Revenu net
    this.revenuAnnuelNet = this.revenuAnnuelBrut - this.impotAnnuel - this.prelevementsSociaux;
  }

  calculerInteretsAnnuels(): number {
    if (this.montantCredit <= 0 || this.tauxCredit <= 0) return 0;

    const tauxMensuel = this.tauxCredit / 100 / 12;
    const nbMensualites = this.dureeCredit * 12;

    // Mensualité
    const mensualite = this.montantCredit * tauxMensuel * Math.pow(1 + tauxMensuel, nbMensualites)
      / (Math.pow(1 + tauxMensuel, nbMensualites) - 1);

    // Intérêts de la première année (approximation)
    let capitalRestant = this.montantCredit;
    let interetsTotaux = 0;

    for (let m = 1; m <= 12; m++) {
      const interetsMois = capitalRestant * tauxMensuel;
      interetsTotaux += interetsMois;
      capitalRestant -= (mensualite - interetsMois);
    }

    return interetsTotaux;
  }

  calculerCredit(): void {
    const tauxMensuel = this.tauxCredit / 100 / 12;
    const nbMensualites = this.dureeCredit * 12;

    if (tauxMensuel > 0) {
      this.mensualiteCredit = this.montantCredit * tauxMensuel *
        Math.pow(1 + tauxMensuel, nbMensualites) /
        (Math.pow(1 + tauxMensuel, nbMensualites) - 1);
    } else {
      this.mensualiteCredit = this.montantCredit / nbMensualites;
    }

    this.coutTotalCredit = (this.mensualiteCredit * nbMensualites) - this.montantCredit;
    this.effortEpargne = this.mensualiteCredit - this.revenuMensuelBrut;
    this.apportPersonnel = this.valeurAcquisition - this.montantCredit;
  }

  genererProjection(): void {
    this.projection = [];
    let valeurParts = this.valeurAcquisition;
    let totalRevenus = 0;
    let capitalRestantCredit = this.modeFinancement === 'credit' ? this.montantCredit : 0;

    for (let annee = 1; annee <= this.dureeDetention; annee++) {
      // Revalorisation des parts
      valeurParts *= (1 + this.tauxRevalorisation / 100);

      // Revenus de l'année
      const revenusBruts = valeurParts * this.tauxDistribution / 100;
      const revenus = revenusBruts * (1 - (this.trancheMarginaleTMI + 17.2) / 100);
      totalRevenus += revenus;

      // Remboursement crédit
      let remboursementAnnuel = 0;
      if (this.modeFinancement === 'credit' && annee <= this.dureeCredit) {
        remboursementAnnuel = this.mensualiteCredit * 12;
        capitalRestantCredit = Math.max(0, capitalRestantCredit - (remboursementAnnuel - this.calculerInteretsAnnuels()));
      }

      this.projection.push({
        annee: annee,
        valeurParts: Math.round(valeurParts),
        revenusBruts: Math.round(revenusBruts),
        revenus: Math.round(revenus),
        totalRevenus: Math.round(totalRevenus),
        capitalRestant: Math.round(capitalRestantCredit)
      });
    }

    // Calculs finaux
    this.valeurFinale = Math.round(valeurParts);
    this.totalRevenusPercus = Math.round(totalRevenus);

    const investissementNet = this.valeurAcquisition + this.fraisEntreeTotal +
      (this.modeFinancement === 'credit' ? this.coutTotalCredit : 0);

    this.plusValue = this.valeurFinale - this.valeurAcquisition;

    const gainTotal = this.valeurFinale + this.totalRevenusPercus - investissementNet;
    this.rendementGlobal = (gainTotal / investissementNet) * 100;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  }

  addToComparison(): void {
    const scenarioName = `${this.formatCurrency(this.valeurAcquisition)} - ${this.tauxDistribution}%`;
    const results: ScenarioResult[] = [
      { label: 'Revenus nets/an', value: this.revenuAnnuelNet, type: 'currency' },
      { label: 'Rendement net', value: this.rendementNetApresImpot, type: 'percent' },
      { label: 'Valeur finale', value: this.valeurFinale, type: 'currency' },
      { label: 'Rendement global', value: this.rendementGlobal, type: 'percent' }
    ];

    const data = {
      montant: this.montantInvesti,
      tauxDistribution: this.tauxDistribution,
      fraisEntree: this.fraisEntree,
      duree: this.dureeDetention,
      tmi: this.trancheMarginaleTMI
    };

    this.comparisonService.addScenario(this.simulatorType, scenarioName, data, results);
  }

  getExportData(): ExportData {
    return {
      title: 'Simulation Investissement SCPI',
      subtitle: `${this.nombreParts} parts - ${this.formatCurrency(this.valeurAcquisition)} - ${this.dureeDetention} ans`,
      date: new Date(),
      sections: [
        {
          title: 'Paramètres d\'investissement',
          rows: [
            { label: 'Montant investi', value: this.montantInvesti, type: 'currency' },
            { label: 'Prix par part', value: this.prixPart, type: 'currency' },
            { label: 'Nombre de parts', value: this.nombreParts, type: 'number' },
            { label: 'Taux de distribution', value: this.tauxDistribution, type: 'percent' },
            { label: 'Frais d\'entrée', value: this.fraisEntree, type: 'percent' },
            { label: 'Durée de détention', value: `${this.dureeDetention} ans`, type: 'text' }
          ]
        },
        {
          title: 'Revenus annuels',
          rows: [
            { label: 'Revenus bruts / an', value: this.revenuAnnuelBrut, type: 'currency' },
            { label: 'Revenus bruts / mois', value: this.revenuMensuelBrut, type: 'currency' },
            { label: 'Impôt sur le revenu', value: this.impotAnnuel, type: 'currency' },
            { label: 'Prélèvements sociaux', value: this.prelevementsSociaux, type: 'currency' },
            { label: 'Revenus nets / an', value: this.revenuAnnuelNet, type: 'currency', highlight: true }
          ]
        },
        {
          title: 'Bilan après ' + this.dureeDetention + ' ans',
          rows: [
            { label: 'Valeur finale des parts', value: this.valeurFinale, type: 'currency' },
            { label: 'Plus-value', value: this.plusValue, type: 'currency' },
            { label: 'Total revenus nets perçus', value: this.totalRevenusPercus, type: 'currency' },
            { label: 'Rendement net après impôt', value: this.rendementNetApresImpot, type: 'percent', highlight: true },
            { label: 'Rendement global', value: this.rendementGlobal, type: 'percent', highlight: true }
          ]
        }
      ]
    };
  }
}
