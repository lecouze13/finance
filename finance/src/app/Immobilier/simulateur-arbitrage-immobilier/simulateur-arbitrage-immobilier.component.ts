import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { PanelModule } from 'primeng/panel';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { FaqSectionComponent, FaqItem } from '../../shared/faq-section/faq-section.component';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';

interface ScenarioResultat {
  nom: string;
  patrimoineAn5: number;
  patrimoineAn10: number;
  cashflowCumule5: number;
  cashflowCumule10: number;
  rendementAnnuel: number;
  avantages: string[];
  inconvenients: string[];
}

@Component({
  selector: 'app-simulateur-arbitrage-immobilier',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PanelModule,
    InputNumberModule,
    DropdownModule,
    TabViewModule,
    TooltipModule,
    DecimalPipe,
    FaqSectionComponent,
    BreadcrumbComponent
  ],
  templateUrl: './simulateur-arbitrage-immobilier.component.html',
  styleUrls: ['./simulateur-arbitrage-immobilier.component.scss']
})
export class SimulateurArbitrageImmobilierComponent implements OnInit {
  // Bien actuel
  valeurActuelle: number = 200000;
  prixAchat: number = 150000;
  capitalRestant: number = 80000;
  loyerMensuel: number = 900;
  chargesMensuelles: number = 250;
  mensualiteCredit: number = 650;
  tauxCreditActuel: number = 2.5;
  dureeRestante: number = 10;
  anneeDetention: number = 5;
  tmi: number = 30;

  // Scénario vente
  fraisVente: number = 5;
  reinvestissementTaux: number = 5;

  // Scénario refinancement
  nouveauTaux: number = 3.5;
  nouvelleDuree: number = 20;
  montantRefinance: number = 50000;
  fraisRefinancement: number = 2000;

  // Scénario conservation
  plusValueAnnuelle: number = 2;
  augmentationLoyer: number = 1.5;

  // Résultats
  scenarioVente: ScenarioResultat | null = null;
  scenarioConservation: ScenarioResultat | null = null;
  scenarioRefinancement: ScenarioResultat | null = null;
  meilleurScenario: string = '';

  faqItems: FaqItem[] = [
    {
      question: "Quand faut-il envisager de vendre un bien immobilier ?",
      answer: "Vendre est pertinent si : le rendement est devenu insuffisant, le bien nécessite des travaux importants, vous souhaitez réallouer le capital vers un investissement plus rentable, la plus-value latente est significative et l'exonération proche (22 ans d'impôt, 30 ans de prélèvements sociaux), ou votre situation personnelle change (déménagement, retraite)."
    },
    {
      question: "Qu'est-ce que le refinancement immobilier ?",
      answer: "Le refinancement consiste à renégocier votre crédit existant ou à contracter un nouveau prêt sur un bien dont le crédit est partiellement ou totalement remboursé. Cela permet de récupérer du capital (equity release) pour réinvestir, tout en conservant le bien et ses revenus locatifs. Les taux actuels rendent parfois cette option moins attractive."
    },
    {
      question: "Comment calcule-t-on la plus-value immobilière à la vente ?",
      answer: "La plus-value = Prix de vente - Prix d'achat (majoré des frais d'acquisition et travaux). L'impôt est de 19% + 17.2% de prélèvements sociaux. Des abattements s'appliquent selon la durée de détention : exonération totale d'IR après 22 ans, et de prélèvements sociaux après 30 ans. Les travaux réalisés peuvent être ajoutés au prix d'achat."
    },
    {
      question: "Quels frais prévoir lors d'une vente immobilière ?",
      answer: "Les frais de vente comprennent : les frais d'agence (3-7% selon négociation), les diagnostics obligatoires (300-800€), les éventuelles indemnités de remboursement anticipé du crédit (IRA, max 6 mois d'intérêts ou 3% du capital), et l'impôt sur la plus-value si applicable."
    },
    {
      question: "Quand le refinancement est-il plus avantageux que la vente ?",
      answer: "Le refinancement est préférable si : le bien génère un bon cash-flow, la plus-value est importante (donc fortement taxée), vous êtes proche de l'exonération fiscale, le marché locatif local reste dynamique, ou vous souhaitez conserver le bien pour transmission. Il préserve aussi l'avantage de l'amortissement en LMNP."
    },
    {
      question: "Comment évaluer le coût d'opportunité de conserver un bien ?",
      answer: "Le coût d'opportunité = ce que rapporterait votre équité investie ailleurs. Si votre équité de 100 000€ dans un bien rapporte 3% net, mais pourrait rapporter 6% ailleurs, le coût d'opportunité est de 3 000€/an. Ce calcul aide à décider entre conserver ou réallouer le capital."
    },
    {
      question: "Quels sont les pièges à éviter dans l'arbitrage immobilier ?",
      answer: "Évitez : de vendre juste avant l'exonération de plus-value, de refinancer à un taux supérieur sans gain réel, d'oublier les frais (agence, IRA, notaire), de surestimer le rendement des placements alternatifs, ou de négliger l'impact fiscal de chaque option. Une analyse chiffrée précise est indispensable."
    },
    {
      question: "Le refinancement impacte-t-il ma capacité d'emprunt ?",
      answer: "Oui, le refinancement augmente votre endettement total, ce qui réduit votre capacité d'emprunt pour de futurs projets. Cependant, si les fonds extraits génèrent des revenus (nouveau bien), ceux-ci peuvent partiellement compenser. Calculez l'impact sur votre taux d'endettement avant de décider."
    },
    {
      question: "Quelle stratégie adopter en période de hausse des taux ?",
      answer: "En période de hausse des taux : le refinancement devient moins attractif, conserver un crédit à taux bas est un avantage, vendre peut permettre de se désendetter et attendre de meilleures conditions. L'arbitrage dépend de votre taux actuel par rapport au marché et de vos objectifs patrimoniaux."
    },
    {
      question: "Comment optimiser fiscalement un arbitrage immobilier ?",
      answer: "Pour optimiser : attendez les seuils d'abattement de plus-value (6, 22, 30 ans), compensez la plus-value par des travaux déductibles, utilisez le déficit foncier avant de vendre, envisagez la donation avant vente pour purger la plus-value, ou passez en société pour réinvestir sans fiscalité immédiate."
    }
  ];

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Simulateur Arbitrage Immobilier | Vendre, Conserver ou Refinancer');
    this.meta.updateTag({
      name: 'description',
      content: 'Comparez les scénarios de vente, conservation ou refinancement de votre bien immobilier. Optimisez votre patrimoine en faisant le meilleur choix financier.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'arbitrage immobilier, vendre ou garder, refinancement immobilier, plus-value immobilière, optimisation patrimoine, equity release'
    });
    this.calculer();
  }

  calculer(): void {
    this.calculerScenarioVente();
    this.calculerScenarioConservation();
    this.calculerScenarioRefinancement();
    this.determinerMeilleurScenario();
  }

  calculerScenarioVente(): void {
    // Calcul de la plus-value imposable
    const fraisAcquisition = this.prixAchat * 0.075; // ~7.5% frais notaire
    const prixAchatCorrige = this.prixAchat + fraisAcquisition;
    const plusValueBrute = this.valeurActuelle - prixAchatCorrige;

    // Abattement selon durée de détention
    let abattementIR = 0;
    let abattementPS = 0;
    if (this.anneeDetention >= 6) {
      abattementIR = Math.min(100, (this.anneeDetention - 5) * 6);
      abattementPS = Math.min(100, this.anneeDetention >= 22 ?
        ((this.anneeDetention - 5) * 1.65) + ((Math.min(this.anneeDetention, 22) - 5) * 1.6) :
        (this.anneeDetention - 5) * 1.65);
    }

    const plusValueImposableIR = plusValueBrute * (1 - abattementIR / 100);
    const plusValueImposablePS = plusValueBrute * (1 - abattementPS / 100);
    const impotPV = (plusValueImposableIR * 0.19) + (plusValueImposablePS * 0.172);

    // Net après vente
    const fraisVenteEuros = this.valeurActuelle * this.fraisVente / 100;
    const netApresVente = this.valeurActuelle - this.capitalRestant - fraisVenteEuros - Math.max(0, impotPV);

    // Simulation placement du capital
    let capital5 = netApresVente;
    let capital10 = netApresVente;
    for (let i = 0; i < 5; i++) {
      capital5 *= (1 + this.reinvestissementTaux / 100);
    }
    for (let i = 0; i < 10; i++) {
      capital10 *= (1 + this.reinvestissementTaux / 100);
    }

    // Cash-flow = intérêts générés (simplification)
    const interetAnnuel = netApresVente * this.reinvestissementTaux / 100;
    const cashflow5 = interetAnnuel * 5;
    const cashflow10 = interetAnnuel * 10;

    this.scenarioVente = {
      nom: 'Vendre',
      patrimoineAn5: capital5,
      patrimoineAn10: capital10,
      cashflowCumule5: cashflow5,
      cashflowCumule10: cashflow10,
      rendementAnnuel: this.reinvestissementTaux,
      avantages: [
        'Récupération immédiate du capital',
        'Diversification possible des placements',
        'Fin des contraintes de gestion locative',
        'Cristallisation de la plus-value'
      ],
      inconvenients: [
        `Impôt sur plus-value : ${this.formatCurrency(Math.max(0, impotPV))}`,
        `Frais de vente : ${this.formatCurrency(fraisVenteEuros)}`,
        'Perte des revenus locatifs',
        'Recherche d\'un nouveau placement rentable'
      ]
    };
  }

  calculerScenarioConservation(): void {
    let cashflowCumule5 = 0;
    let cashflowCumule10 = 0;
    let valeurBien5 = this.valeurActuelle;
    let valeurBien10 = this.valeurActuelle;
    let capitalRestant5 = this.capitalRestant;
    let capitalRestant10 = this.capitalRestant;
    let loyerActuel = this.loyerMensuel;

    // Calcul amortissement
    const tauxMensuel = this.tauxCreditActuel / 100 / 12;

    for (let annee = 1; annee <= 10; annee++) {
      // Cash-flow annuel
      const cashflowAnnuel = (loyerActuel - this.chargesMensuelles - this.mensualiteCredit) * 12;

      if (annee <= 5) {
        cashflowCumule5 += cashflowAnnuel;
        valeurBien5 *= (1 + this.plusValueAnnuelle / 100);

        // Amortissement du capital
        if (annee <= this.dureeRestante) {
          for (let m = 0; m < 12; m++) {
            const interet = capitalRestant5 * tauxMensuel;
            const capitalRembourse = this.mensualiteCredit - interet;
            capitalRestant5 = Math.max(0, capitalRestant5 - capitalRembourse);
          }
        }
      }

      cashflowCumule10 += cashflowAnnuel;
      valeurBien10 *= (1 + this.plusValueAnnuelle / 100);

      if (annee <= this.dureeRestante) {
        for (let m = 0; m < 12; m++) {
          const interet = capitalRestant10 * tauxMensuel;
          const capitalRembourse = this.mensualiteCredit - interet;
          capitalRestant10 = Math.max(0, capitalRestant10 - capitalRembourse);
        }
      }

      // Augmentation du loyer
      loyerActuel *= (1 + this.augmentationLoyer / 100);
    }

    const patrimoineNet5 = valeurBien5 - capitalRestant5;
    const patrimoineNet10 = valeurBien10 - capitalRestant10;
    const rendement = ((patrimoineNet10 / (this.valeurActuelle - this.capitalRestant)) ** (1/10) - 1) * 100;

    this.scenarioConservation = {
      nom: 'Conserver',
      patrimoineAn5: patrimoineNet5,
      patrimoineAn10: patrimoineNet10,
      cashflowCumule5: cashflowCumule5,
      cashflowCumule10: cashflowCumule10,
      rendementAnnuel: rendement,
      avantages: [
        'Revenus locatifs réguliers',
        'Plus-value différée (non imposée)',
        'Remboursement progressif du crédit',
        'Effet de levier maintenu'
      ],
      inconvenients: [
        'Capital immobilisé',
        'Risques locatifs (vacance, impayés)',
        'Travaux et entretien à prévoir',
        'Gestion locative à assurer'
      ]
    };
  }

  calculerScenarioRefinancement(): void {
    // Nouveau crédit
    const nouveauCapital = this.capitalRestant + this.montantRefinance;
    const nouvelleMensualite = this.calculerMensualite(nouveauCapital, this.nouveauTaux, this.nouvelleDuree);
    const capitalExtrait = this.montantRefinance - this.fraisRefinancement;

    let cashflowCumule5 = 0;
    let cashflowCumule10 = 0;
    let valeurBien5 = this.valeurActuelle;
    let valeurBien10 = this.valeurActuelle;
    let capitalRestant5 = nouveauCapital;
    let capitalRestant10 = nouveauCapital;
    let capitalExtrait5 = capitalExtrait;
    let capitalExtrait10 = capitalExtrait;
    let loyerActuel = this.loyerMensuel;

    const tauxMensuel = this.nouveauTaux / 100 / 12;

    for (let annee = 1; annee <= 10; annee++) {
      // Cash-flow immobilier
      const cashflowImmo = (loyerActuel - this.chargesMensuelles - nouvelleMensualite) * 12;

      // Rendement du capital extrait
      const rendementCapital = capitalExtrait5 * this.reinvestissementTaux / 100;

      if (annee <= 5) {
        cashflowCumule5 += cashflowImmo + rendementCapital;
        valeurBien5 *= (1 + this.plusValueAnnuelle / 100);
        capitalExtrait5 *= (1 + this.reinvestissementTaux / 100);

        for (let m = 0; m < 12; m++) {
          const interet = capitalRestant5 * tauxMensuel;
          const capitalRembourse = nouvelleMensualite - interet;
          capitalRestant5 = Math.max(0, capitalRestant5 - capitalRembourse);
        }
      }

      const rendementCapital10 = capitalExtrait10 * this.reinvestissementTaux / 100;
      cashflowCumule10 += cashflowImmo + rendementCapital10;
      valeurBien10 *= (1 + this.plusValueAnnuelle / 100);
      capitalExtrait10 *= (1 + this.reinvestissementTaux / 100);

      for (let m = 0; m < 12; m++) {
        const interet = capitalRestant10 * tauxMensuel;
        const capitalRembourse = nouvelleMensualite - interet;
        capitalRestant10 = Math.max(0, capitalRestant10 - capitalRembourse);
      }

      loyerActuel *= (1 + this.augmentationLoyer / 100);
    }

    const patrimoineNet5 = valeurBien5 - capitalRestant5 + capitalExtrait5;
    const patrimoineNet10 = valeurBien10 - capitalRestant10 + capitalExtrait10;
    const equiteInitiale = this.valeurActuelle - this.capitalRestant;
    const rendement = ((patrimoineNet10 / equiteInitiale) ** (1/10) - 1) * 100;

    this.scenarioRefinancement = {
      nom: 'Refinancer',
      patrimoineAn5: patrimoineNet5,
      patrimoineAn10: patrimoineNet10,
      cashflowCumule5: cashflowCumule5,
      cashflowCumule10: cashflowCumule10,
      rendementAnnuel: rendement,
      avantages: [
        `Capital extrait : ${this.formatCurrency(capitalExtrait)}`,
        'Conservation du bien et des loyers',
        'Pas d\'impôt sur plus-value',
        'Possibilité de réinvestir'
      ],
      inconvenients: [
        `Nouvelle mensualité : ${this.formatCurrency(nouvelleMensualite)}`,
        `Frais de refinancement : ${this.formatCurrency(this.fraisRefinancement)}`,
        'Augmentation de l\'endettement',
        'Taux potentiellement plus élevé'
      ]
    };
  }

  determinerMeilleurScenario(): void {
    if (!this.scenarioVente || !this.scenarioConservation || !this.scenarioRefinancement) return;

    const scenarios = [
      { nom: 'vente', patrimoine: this.scenarioVente.patrimoineAn10 },
      { nom: 'conservation', patrimoine: this.scenarioConservation.patrimoineAn10 },
      { nom: 'refinancement', patrimoine: this.scenarioRefinancement.patrimoineAn10 }
    ];

    const meilleur = scenarios.reduce((prev, current) =>
      current.patrimoine > prev.patrimoine ? current : prev
    );

    this.meilleurScenario = meilleur.nom;
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
}
