import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SeoService } from '../../Constructor/service/seo.service';
import { FaqSectionComponent, FaqItem } from '../../shared/faq-section/faq-section.component';

interface DropdownOption {
  label: string;
  value: string;
  taux?: number;
}

interface ResultatsComparaison {
  // Nom propre
  nomPropre: {
    revenusBruts: number;
    chargesDeductibles: number;
    revenuNet: number;
    impotRevenu: number;
    prelevementsSociaux: number;
    revenuNetApresImpot: number;
    tauxImpositionEffectif: number;
  };
  // Holding (SCI IS + Holding)
  holding: {
    revenusBruts: number;
    chargesDeductibles: number;
    amortissement: number;
    resultatFiscal: number;
    impotSocietes: number;
    resultatNet: number;
    dividendesBruts: number;
    flatTax: number;
    dividendesNets: number;
    tauxImpositionEffectif: number;
    tresorerieHolding: number;
  };
  // Comparaison
  gainAnnuel: number;
  meilleureOption: 'nom_propre' | 'holding';
  avantagesHolding: string[];
  avantagesNomPropre: string[];
  // Sur 10 ans
  cumulNomPropre10ans: number;
  cumulHolding10ans: number;
  gainCumule10ans: number;
}

@Component({
  selector: 'app-simulateur-holding-vs-direct',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputNumberModule,
    DropdownModule,
    ButtonModule,
    TooltipModule,
    CheckboxModule,
    FloatLabelModule,
    FaqSectionComponent
  ],
  templateUrl: './simulateur-holding-vs-direct.component.html',
  styleUrls: ['./simulateur-holding-vs-direct.component.scss']
})
export class SimulateurHoldingVsDirectComponent implements OnInit {

  // Inputs bien immobilier
  valeurBien: number = 300000;
  loyerAnnuel: number = 15000;
  chargesAnnuelles: number = 3000;
  interetsEmprunt: number = 4000;
  travauxAnnuels: number = 1000;

  // Profil fiscal
  selectedTMI: DropdownOption | null = null;
  tranhesTMI: DropdownOption[] = [
    { label: '0% (revenus < 11 294€)', value: '0', taux: 0 },
    { label: '11% (11 294€ - 28 797€)', value: '11', taux: 0.11 },
    { label: '30% (28 797€ - 82 341€)', value: '30', taux: 0.30 },
    { label: '41% (82 341€ - 177 106€)', value: '41', taux: 0.41 },
    { label: '45% (> 177 106€)', value: '45', taux: 0.45 }
  ];

  // Options holding
  distribuerDividendes: boolean = true;
  tauxDistribution: number = 50;
  dureeAmortissement: number = 30;

  // Résultats
  resultats: ResultatsComparaison | null = null;

  // FAQ
  faqItems = [
    {
      question: "Qu'est-ce qu'une holding immobilière ?",
      answer: "Une holding immobilière est une société (souvent une SAS) qui détient des parts de SCI à l'IS. Cette structure permet d'optimiser la fiscalité en capitalisant les revenus dans la holding, de faciliter la transmission du patrimoine, et de réinvestir les bénéfices avec une fiscalité réduite. C'est particulièrement intéressant pour les investisseurs ayant plusieurs biens."
    },
    {
      question: "Quelle est la différence entre SCI IS et location en nom propre ?",
      answer: "En nom propre, les revenus fonciers sont imposés au barème progressif (TMI + 17,2% de prélèvements sociaux). En SCI à l'IS, les bénéfices sont imposés à l'IS (15% jusqu'à 42 500€, puis 25%), et seuls les dividendes distribués sont taxés (30% flat tax). L'avantage majeur de la SCI IS est la possibilité d'amortir le bien, réduisant significativement le résultat imposable."
    },
    {
      question: "Quand la holding devient-elle intéressante ?",
      answer: "La holding devient intéressante quand : 1) Votre TMI est supérieur à 30%, 2) Vous souhaitez réinvestir les bénéfices plutôt que les consommer, 3) Vous avez plusieurs biens immobiliers, 4) Vous préparez la transmission de votre patrimoine. En dessous de 30% de TMI, le nom propre reste souvent plus simple et avantageux."
    },
    {
      question: "Quels sont les inconvénients de la holding ?",
      answer: "Les principaux inconvénients sont : 1) Coûts de création et de gestion (comptabilité obligatoire, frais juridiques), 2) Complexité administrative, 3) Double imposition si vous sortez les dividendes (IS + flat tax), 4) Moins de flexibilité pour récupérer les fonds, 5) Plus-value professionnelle à la revente (pas d'abattement pour durée de détention)."
    },
    {
      question: "Puis-je passer d'un régime à l'autre ?",
      answer: "Le passage du nom propre à une structure sociétaire nécessite une vente (avec droits de mutation). L'option à l'IS pour une SCI est irrévocable. Il est donc crucial de bien réfléchir avant de choisir sa structure. Un apport à une SCI existante peut être envisagé, mais génère des droits d'enregistrement."
    },
    {
      question: "Comment fonctionne l'amortissement en SCI IS ?",
      answer: "En SCI IS, vous pouvez amortir le bien sur sa durée d'utilisation (généralement 25-40 ans pour le bâti, le terrain n'est pas amortissable). Cet amortissement réduit le résultat fiscal sans sortie de trésorerie. Attention : à la revente, la plus-value est calculée sur la valeur nette comptable (après amortissements), ce qui peut générer une fiscalité importante."
    }
  ];

  constructor(
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.seoService.updateMetaData({
      title: 'Simulateur Holding vs Nom Propre - Comparer la fiscalité immobilière',
      description: 'Comparez la fiscalité entre détention immobilière en nom propre et via une holding (SCI IS). Calculez IS, flat tax, amortissement et optimisez votre structure.',
      url: 'https://calculateurfinance.fr/simulateur-holding-vs-direct',
      keywords: 'holding immobilière, SCI IS, nom propre, fiscalité immobilière, amortissement, flat tax, IS société, comparateur fiscal'
    });

    this.selectedTMI = this.tranhesTMI[2]; // 30% par défaut
  }

  calculer(): void {
    if (!this.selectedTMI) return;

    const tmi = this.selectedTMI.taux || 0;
    const prelevementsSociaux = 0.172;

    // ============ CALCUL NOM PROPRE ============
    const revenusBruts = this.loyerAnnuel;
    const chargesDeductiblesNP = this.chargesAnnuelles + this.interetsEmprunt + this.travauxAnnuels;
    const revenuNetNP = Math.max(0, revenusBruts - chargesDeductiblesNP);

    const impotRevenuNP = revenuNetNP * tmi;
    const psNP = revenuNetNP * prelevementsSociaux;
    const revenuNetApresImpotNP = revenuNetNP - impotRevenuNP - psNP;
    const tauxEffectifNP = revenuNetNP > 0 ? ((impotRevenuNP + psNP) / revenuNetNP) * 100 : 0;

    // ============ CALCUL HOLDING (SCI IS + Holding) ============
    // Valeur amortissable (80% du bien, hors terrain)
    const valeurAmortissable = this.valeurBien * 0.80;
    const amortissementAnnuel = valeurAmortissable / this.dureeAmortissement;

    const chargesDeductiblesIS = this.chargesAnnuelles + this.interetsEmprunt + this.travauxAnnuels + amortissementAnnuel;
    const resultatFiscalIS = Math.max(0, revenusBruts - chargesDeductiblesIS);

    // IS : 15% jusqu'à 42 500€, puis 25%
    let impotSocietes = 0;
    if (resultatFiscalIS <= 42500) {
      impotSocietes = resultatFiscalIS * 0.15;
    } else {
      impotSocietes = 42500 * 0.15 + (resultatFiscalIS - 42500) * 0.25;
    }

    const resultatNetIS = resultatFiscalIS - impotSocietes;

    // Distribution de dividendes
    const dividendesBruts = this.distribuerDividendes ? resultatNetIS * (this.tauxDistribution / 100) : 0;
    const flatTax = dividendesBruts * 0.30;
    const dividendesNets = dividendesBruts - flatTax;

    // Trésorerie restant dans la holding
    const tresorerieHolding = resultatNetIS - dividendesBruts;

    // Taux effectif holding (sur le résultat distribué)
    const totalPreleve = impotSocietes + flatTax;
    const tauxEffectifHolding = resultatFiscalIS > 0 ? (totalPreleve / resultatFiscalIS) * 100 : 0;

    // ============ COMPARAISON ============
    // Revenu disponible : en nom propre c'est le net, en holding c'est les dividendes nets + capitalisation
    const revenuDispoNP = revenuNetApresImpotNP;
    const revenuDispoHolding = dividendesNets; // On compare les liquidités disponibles

    const gainAnnuel = revenuDispoHolding - revenuDispoNP;
    const meilleureOption: 'nom_propre' | 'holding' = gainAnnuel > 0 ? 'holding' : 'nom_propre';

    // Projection sur 10 ans
    const cumulNomPropre10ans = revenuDispoNP * 10;
    const cumulHolding10ans = dividendesNets * 10;
    const capitalise10ans = tresorerieHolding * 10; // Simplifié, sans réinvestissement
    const gainCumule10ans = (cumulHolding10ans + capitalise10ans) - cumulNomPropre10ans;

    // Avantages
    const avantagesHolding: string[] = [];
    const avantagesNomPropre: string[] = [];

    if (amortissementAnnuel > 0) {
      avantagesHolding.push(`Amortissement de ${Math.round(amortissementAnnuel).toLocaleString('fr-FR')} €/an réduit la base imposable`);
    }
    if (tresorerieHolding > 0) {
      avantagesHolding.push(`${Math.round(tresorerieHolding).toLocaleString('fr-FR')} €/an capitalisés pour réinvestir`);
    }
    if (tmi > 0.30) {
      avantagesHolding.push(`TMI élevé (${tmi * 100}%) : la holding limite l'impact fiscal`);
    }
    avantagesHolding.push('Facilite la transmission du patrimoine');
    avantagesHolding.push('Possibilité de réinvestir avec une fiscalité réduite');

    avantagesNomPropre.push('Simplicité de gestion, pas de comptabilité obligatoire');
    avantagesNomPropre.push('Accès direct aux revenus sans double imposition');
    if (tmi <= 0.11) {
      avantagesNomPropre.push('TMI faible : fiscalité avantageuse en nom propre');
    }
    avantagesNomPropre.push('Abattement pour durée de détention sur plus-value');
    avantagesNomPropre.push('Pas de frais de structure (expert-comptable, juridique)');

    this.resultats = {
      nomPropre: {
        revenusBruts,
        chargesDeductibles: chargesDeductiblesNP,
        revenuNet: revenuNetNP,
        impotRevenu: impotRevenuNP,
        prelevementsSociaux: psNP,
        revenuNetApresImpot: revenuNetApresImpotNP,
        tauxImpositionEffectif: tauxEffectifNP
      },
      holding: {
        revenusBruts,
        chargesDeductibles: chargesDeductiblesIS,
        amortissement: amortissementAnnuel,
        resultatFiscal: resultatFiscalIS,
        impotSocietes,
        resultatNet: resultatNetIS,
        dividendesBruts,
        flatTax,
        dividendesNets,
        tauxImpositionEffectif: tauxEffectifHolding,
        tresorerieHolding
      },
      gainAnnuel,
      meilleureOption,
      avantagesHolding,
      avantagesNomPropre,
      cumulNomPropre10ans,
      cumulHolding10ans: cumulHolding10ans + capitalise10ans,
      gainCumule10ans
    };
  }
}
