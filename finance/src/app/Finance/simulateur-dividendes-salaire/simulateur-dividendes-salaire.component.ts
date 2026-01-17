import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { SliderModule } from 'primeng/slider';
import { SeoService } from '../../Constructor/service/seo.service';
import { FaqSectionComponent, FaqItem } from '../../shared/faq-section/faq-section.component';

interface Scenario {
  nom: string;
  salaireBrut: number;
  chargesSociales: number;
  coutEmployeur: number;
  salaireNet: number;
  dividendesBruts: number;
  fiscaliteDividendes: number;
  dividendesNets: number;
  totalNet: number;
  irEstime: number;
  netApresIR: number;
  tauxChargesGlobal: number;
}

@Component({
  selector: 'app-simulateur-dividendes-salaire',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputNumberModule,
    DropdownModule,
    PanelModule,
    SliderModule,
    FaqSectionComponent
  ],
  templateUrl: './simulateur-dividendes-salaire.component.html',
  styleUrls: ['./simulateur-dividendes-salaire.component.scss']
})
export class SimulateurDividendesSalaireComponent implements OnInit {
  Math = Math;

  // Entrées
  resultatDistribuable: number = 80000;
  besoinNetAnnuel: number = 50000;
  capitalSocial: number = 1000;
  statut: string = 'sasu';
  situationFamiliale: string = 'celibataire';
  nombreParts: number = 1;

  // Part salaire vs dividendes (0-100%)
  partSalaire: number = 50;

  // Scénarios
  scenarios: Scenario[] = [];
  scenarioOptimal: Scenario | null = null;

  // Comparaison des stratégies
  strategie100Salaire: Scenario | null = null;
  strategie100Dividendes: Scenario | null = null;
  strategieMixte: Scenario | null = null;

  statutOptions = [
    { label: 'SASU (Président assimilé salarié)', value: 'sasu' },
    { label: 'EURL IS (Gérant TNS)', value: 'eurl' },
    { label: 'SAS (Président assimilé salarié)', value: 'sas' }
  ];

  situationsOptions = [
    { label: 'Célibataire', value: 'celibataire' },
    { label: 'Marié/Pacsé sans enfant', value: 'couple' },
    { label: 'Marié/Pacsé + 1 enfant', value: 'couple1' },
    { label: 'Marié/Pacsé + 2 enfants', value: 'couple2' },
    { label: 'Marié/Pacsé + 3 enfants', value: 'couple3' }
  ];

  faqItems: FaqItem[] = [
    {
      question: "Vaut-il mieux se verser un salaire ou des dividendes ?",
      answer: "Cela dépend de votre statut et de votre situation. En SASU, les dividendes (PFU 30%) sont souvent plus avantageux que le salaire (charges ~80%). En EURL, le salaire TNS (charges ~45%) est généralement préférable car les dividendes > 10% du capital sont soumis aux cotisations sociales. La stratégie optimale est souvent un mix des deux."
    },
    {
      question: "Comment fonctionne le PFU (Flat Tax) sur les dividendes ?",
      answer: "Le Prélèvement Forfaitaire Unique (PFU) est de 30% : 12,8% d'impôt sur le revenu + 17,2% de prélèvements sociaux. C'est un prélèvement libératoire : vous n'avez rien à ajouter dans votre déclaration IR. Vous pouvez opter pour le barème progressif si c'est plus avantageux (TMI < 12,8%)."
    },
    {
      question: "Quelle est la différence entre SASU et EURL pour les dividendes ?",
      answer: "En SASU, tous les dividendes sont soumis au PFU de 30%. En EURL, seuls les dividendes inférieurs à 10% du capital sont soumis au PFU. Au-delà, ils sont assujettis aux cotisations sociales TNS (~45%), ce qui les rend beaucoup moins intéressants. C'est pourquoi la SASU est souvent préférée pour distribuer des dividendes importants."
    },
    {
      question: "Quel salaire minimum se verser en SASU ?",
      answer: "Il n'y a pas d'obligation légale de salaire minimum pour un président de SASU. Cependant, sans salaire, vous n'avez aucune protection sociale (retraite, maladie, chômage). Il est recommandé de se verser au moins le PASS (Plafond Annuel Sécurité Sociale, ~46 000€) pour valider 4 trimestres de retraite et bénéficier d'une couverture sociale correcte."
    },
    {
      question: "Comment optimiser sa rémunération de dirigeant ?",
      answer: "La stratégie optimale dépend de plusieurs facteurs : statut juridique, niveau de résultat, besoins personnels, protection sociale souhaitée. En général : 1) Se verser un salaire couvrant les besoins courants et validant les droits sociaux, 2) Distribuer le surplus en dividendes si SASU, 3) Considérer les dispositifs d'épargne salariale (PEE, PERCO) pour l'optimisation fiscale."
    },
    {
      question: "Les dividendes comptent-ils pour la retraite ?",
      answer: "Non, en SASU les dividendes ne génèrent pas de droits à la retraite car ils ne sont pas soumis aux cotisations sociales. Seul le salaire permet de cotiser pour la retraite. En EURL, les dividendes > 10% du capital étant soumis aux cotisations TNS, ils ouvrent des droits (mais coûtent aussi plus cher)."
    },
    {
      question: "Peut-on opter pour le barème progressif plutôt que le PFU ?",
      answer: "Oui, vous pouvez opter pour l'imposition au barème progressif de l'IR plutôt que le PFU de 30%. C'est intéressant si votre TMI est inférieure à 12,8% (tranche à 11%). Dans ce cas, vous bénéficiez aussi d'un abattement de 40% sur les dividendes. L'option est globale : elle s'applique à tous vos revenus de capitaux mobiliers."
    },
    {
      question: "Comment réduire les charges sociales sur ma rémunération ?",
      answer: "Plusieurs leviers existent : 1) L'ACRE la première année (exonération partielle), 2) L'épargne salariale (PEE, PERCO) exonérée de charges, 3) Les chèques CESU préfinancés, 4) La mutuelle d'entreprise, 5) L'optimisation du mix salaire/dividendes. Un expert-comptable peut vous aider à trouver l'équilibre optimal."
    }
  ];

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetaData({
      title: 'Simulateur Dividendes vs Salaire 2025 | Optimiser sa rémunération de dirigeant',
      description: 'Calculez le mix optimal entre salaire et dividendes pour votre société (SASU, EURL, SAS). Comparez les charges, la fiscalité et maximisez votre revenu net.',
      url: '/simulateur-dividendes-salaire'
    });
    this.updateParts();
    this.calculer();
  }

  updateParts(): void {
    switch (this.situationFamiliale) {
      case 'celibataire': this.nombreParts = 1; break;
      case 'couple': this.nombreParts = 2; break;
      case 'couple1': this.nombreParts = 2.5; break;
      case 'couple2': this.nombreParts = 3; break;
      case 'couple3': this.nombreParts = 4; break;
    }
  }

  calculer(): void {
    this.updateParts();

    // Calculer les 3 stratégies principales
    this.strategie100Salaire = this.calculerScenario('100% Salaire', 100);
    this.strategie100Dividendes = this.calculerScenario('100% Dividendes', 0);
    this.strategieMixte = this.calculerScenario(`Mix ${this.partSalaire}/${100 - this.partSalaire}`, this.partSalaire);

    // Trouver le scénario optimal (celui qui maximise le net après IR)
    this.scenarios = [];
    for (let part = 0; part <= 100; part += 10) {
      const scenario = this.calculerScenario(`${part}% Salaire`, part);
      this.scenarios.push(scenario);
    }

    this.scenarioOptimal = this.scenarios.reduce((best, current) =>
      current.netApresIR > best.netApresIR ? current : best
    );
  }

  calculerScenario(nom: string, partSalairePercent: number): Scenario {
    const partSalaire = partSalairePercent / 100;
    const montantPourSalaire = this.resultatDistribuable * partSalaire;
    const montantPourDividendes = this.resultatDistribuable * (1 - partSalaire);

    let salaireBrut: number;
    let chargesSociales: number;
    let coutEmployeur: number;
    let salaireNet: number;

    // Calcul du salaire selon le statut
    if (this.statut === 'eurl') {
      // EURL TNS : charges ~45% du net
      // Si on a un budget X pour la rémunération, salaire net = X / 1.45
      salaireNet = montantPourSalaire / 1.45;
      chargesSociales = montantPourSalaire - salaireNet;
      salaireBrut = salaireNet; // En TNS, on raisonne en net
      coutEmployeur = montantPourSalaire;
    } else {
      // SASU/SAS : charges ~82% du net (patronales + salariales)
      // Budget = net + charges = net * 1.82
      salaireNet = montantPourSalaire / 1.82;
      chargesSociales = montantPourSalaire - salaireNet;
      salaireBrut = salaireNet * 1.25; // Brut = net / 0.8 environ
      coutEmployeur = montantPourSalaire;
    }

    // Calcul des dividendes
    // Il faut d'abord payer l'IS sur le résultat restant
    const resultatAvantIS = montantPourDividendes;
    const is = this.calculerIS(resultatAvantIS);
    const dividendesBruts = resultatAvantIS - is;

    let fiscaliteDividendes: number;
    let dividendesNets: number;

    if (this.statut === 'eurl') {
      // EURL : dividendes > 10% capital soumis aux cotisations TNS
      const seuilExonere = this.capitalSocial * 0.10;
      const partExoneree = Math.min(dividendesBruts, seuilExonere);
      const partSoumise = Math.max(0, dividendesBruts - seuilExonere);

      const pfuPartExoneree = partExoneree * 0.30;
      const cotisationsPartSoumise = partSoumise * 0.45;

      fiscaliteDividendes = pfuPartExoneree + cotisationsPartSoumise;
      dividendesNets = dividendesBruts - fiscaliteDividendes;
    } else {
      // SASU/SAS : PFU 30% sur tous les dividendes
      fiscaliteDividendes = dividendesBruts * 0.30;
      dividendesNets = dividendesBruts - fiscaliteDividendes;
    }

    // Total net avant IR
    const totalNet = salaireNet + dividendesNets;

    // IR sur le salaire (après abattement 10%)
    const salaireFiscal = salaireNet * 0.90;
    const irEstime = this.calculerIR(salaireFiscal, this.nombreParts);

    // Net après IR
    const netApresIR = totalNet - irEstime;

    // Taux de charges global
    const totalPrelevements = chargesSociales + is + fiscaliteDividendes + irEstime;
    const tauxChargesGlobal = (totalPrelevements / this.resultatDistribuable) * 100;

    return {
      nom,
      salaireBrut: Math.round(salaireBrut),
      chargesSociales: Math.round(chargesSociales),
      coutEmployeur: Math.round(coutEmployeur),
      salaireNet: Math.round(salaireNet),
      dividendesBruts: Math.round(dividendesBruts),
      fiscaliteDividendes: Math.round(fiscaliteDividendes),
      dividendesNets: Math.round(dividendesNets),
      totalNet: Math.round(totalNet),
      irEstime: Math.round(irEstime),
      netApresIR: Math.round(netApresIR),
      tauxChargesGlobal: Math.round(tauxChargesGlobal * 10) / 10
    };
  }

  calculerIS(resultat: number): number {
    if (resultat <= 0) return 0;
    const tauxReduit = 0.15;
    const tauxNormal = 0.25;
    const plafondReduit = 42500;

    if (resultat <= plafondReduit) {
      return resultat * tauxReduit;
    }
    return plafondReduit * tauxReduit + (resultat - plafondReduit) * tauxNormal;
  }

  calculerIR(revenuImposable: number, parts: number): number {
    if (revenuImposable <= 0) return 0;
    const quotient = revenuImposable / parts;

    // Barème 2025
    let impot = 0;
    if (quotient <= 11294) {
      impot = 0;
    } else if (quotient <= 28797) {
      impot = (quotient - 11294) * 0.11;
    } else if (quotient <= 82341) {
      impot = (28797 - 11294) * 0.11 + (quotient - 28797) * 0.30;
    } else if (quotient <= 177106) {
      impot = (28797 - 11294) * 0.11 + (82341 - 28797) * 0.30 + (quotient - 82341) * 0.41;
    } else {
      impot = (28797 - 11294) * 0.11 + (82341 - 28797) * 0.30 + (177106 - 82341) * 0.41 + (quotient - 177106) * 0.45;
    }

    return impot * parts;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  }

  formatPercent(value: number): string {
    return value.toFixed(1) + ' %';
  }

  getGainVsAutre(scenario: Scenario | null, autre: Scenario | null): number {
    if (!scenario || !autre) return 0;
    return scenario.netApresIR - autre.netApresIR;
  }
}
