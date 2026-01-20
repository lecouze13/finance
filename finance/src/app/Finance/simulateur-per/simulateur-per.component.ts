import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { FaqItem } from '../../shared/faq-section/faq-section.component';

@Component({
  selector: 'app-simulateur-per',
  templateUrl: './simulateur-per.component.html',
  styleUrls: ['./simulateur-per.component.scss'],
  standalone: false
})
export class SimulateurPerComponent implements OnInit {
  // Entrées
  revenuAnnuel: number = 50000;
  versementMensuel: number = 300;
  versementExceptionnel: number = 0;
  dureeEpargne: number = 20;
  rendementAnnuel: number = 4;
  trancheMarginalImposition: number = 30;
  trancheRetraite: number = 11;

  // Résultats
  versementAnnuelTotal: number = 0;
  economieImpotAnnuelle: number = 0;
  capitalAccumule: number = 0;
  totalVerse: number = 0;
  interetsGeneres: number = 0;
  plafondDeductible: number = 0;
  impotSortieCapital: number = 0;
  impotSortieRente: number = 0;
  gainNetCapital: number = 0;
  gainNetRente: number = 0;
  tauxRendementNet: number = 0;

  tranchesOptions = [
    { label: '0% - Non imposable', value: 0 },
    { label: '11% - Jusqu\'à 28 797€', value: 11 },
    { label: '30% - De 28 798€ à 82 341€', value: 30 },
    { label: '41% - De 82 342€ à 177 106€', value: 41 },
    { label: '45% - Au-delà de 177 106€', value: 45 }
  ];

  faqItems: FaqItem[] = [
    {
      question: "Qu'est-ce que le PER et quels sont ses avantages ?",
      answer: "Le Plan d'Épargne Retraite (PER) est un produit d'épargne à long terme permettant de se constituer un complément de retraite. Son principal avantage est la déductibilité des versements du revenu imposable, offrant une économie d'impôt immédiate. Les fonds sont bloqués jusqu'à la retraite sauf cas de déblocage anticipé (achat résidence principale, accident de la vie)."
    },
    {
      question: "Comment fonctionne la déduction fiscale du PER ?",
      answer: "Les versements sur un PER sont déductibles de votre revenu imposable, dans la limite d'un plafond annuel. Ce plafond est de 10% des revenus professionnels de l'année N-1 (min 4 399€, max 35 194€ en 2024). L'économie d'impôt dépend de votre tranche marginale d'imposition : à 30%, 100€ versés = 30€ d'économie d'impôt."
    },
    {
      question: "Quelle est la fiscalité à la sortie du PER ?",
      answer: "À la retraite, vous pouvez sortir en capital ou en rente. En sortie capital : le capital est imposé au barème de l'IR, les plus-values au PFU (30%) ou barème. En sortie rente : imposition selon les règles des rentes viagères à titre onéreux (abattement selon l'âge). La fiscalité dépend aussi de si les versements ont été déduits ou non."
    },
    {
      question: "Peut-on débloquer son PER avant la retraite ?",
      answer: "Oui, dans certains cas : achat de la résidence principale (sortie en capital imposée), décès du conjoint, invalidité, surendettement, fin de droits chômage, cessation d'activité non salariée suite à liquidation judiciaire. Ces cas permettent une sortie anticipée avec une fiscalité spécifique, parfois avantageuse."
    },
    {
      question: "PER individuel, PER entreprise : quelles différences ?",
      answer: "Le PER individuel (PERIN) est souscrit à titre personnel. Le PER entreprise collectif (PERECO) est proposé par l'employeur à tous les salariés. Le PER entreprise obligatoire (PERO) concerne certaines catégories de salariés. Les trois compartiments sont transférables entre eux et portables d'un employeur à l'autre."
    },
    {
      question: "Le PER est-il intéressant si je suis peu ou pas imposable ?",
      answer: "Si vous n'êtes pas imposable, l'avantage fiscal à l'entrée est nul. Cependant, vous pouvez opter pour la non-déduction des versements : à la sortie, seules les plus-values seront imposées (pas le capital versé). Cela peut être intéressant si vous anticipez une hausse de vos revenus ou pour transmettre à vos héritiers."
    },
    {
      question: "Comment optimiser son PER avec le plafond reportable ?",
      answer: "Les plafonds non utilisés des 3 années précédentes sont reportables. Vous pouvez ainsi effectuer un versement exceptionnel important en utilisant ces plafonds cumulés. De plus, les époux/partenaires peuvent mutualiser leurs plafonds. Cela permet d'optimiser la déduction fiscale lors d'une année à hauts revenus."
    },
    {
      question: "Quelle différence entre PER et Assurance-vie pour la retraite ?",
      answer: "Le PER offre une déduction à l'entrée mais une imposition à la sortie. L'assurance-vie n'offre pas de déduction mais une fiscalité allégée après 8 ans (abattement 4 600€/9 200€). Le PER est plus avantageux pour les hauts revenus, l'assurance-vie pour ceux qui veulent garder leur épargne disponible."
    },
    {
      question: "Quel montant verser sur un PER chaque mois ?",
      answer: "Le montant optimal dépend de votre plafond de déduction (10% des revenus), de votre capacité d'épargne et de votre horizon de placement. Une règle simple : ne pas dépasser le plafond déductible car au-delà, il n'y a plus d'avantage fiscal à l'entrée. Visez un versement régulier pour lisser les marchés."
    },
    {
      question: "Le PER est-il transmissible en cas de décès ?",
      answer: "Oui, en cas de décès avant la retraite, le PER est transmis aux bénéficiaires désignés. La fiscalité dépend de l'âge au décès : avant 70 ans, abattement de 152 500€ par bénéficiaire puis 20%/31,25%. Après 70 ans, abattement global de 30 500€ puis droits de succession. C'est un outil de transmission efficace."
    }
  ];

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Simulateur PER 2026 | Plan Épargne Retraite - Calculez votre Économie d\'Impôt');
    this.meta.updateTag({
      name: 'description',
      content: 'Simulez votre Plan Épargne Retraite (PER). Calculez l\'économie d\'impôt, le capital accumulé et comparez sortie en capital ou rente. Optimisez votre épargne retraite.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'PER, plan épargne retraite, simulation PER, économie impôt PER, déduction fiscale retraite, sortie capital rente, plafond PER 2026'
    });
    this.calculer();
  }

  calculer(): void {
    // Versement annuel total
    this.versementAnnuelTotal = (this.versementMensuel * 12) + this.versementExceptionnel;

    // Plafond déductible (10% des revenus, min 4399€, max 35194€)
    this.plafondDeductible = Math.min(
      Math.max(this.revenuAnnuel * 0.10, 4399),
      35194
    );

    // Montant effectivement déduit (limité au plafond)
    const montantDeduit = Math.min(this.versementAnnuelTotal, this.plafondDeductible);

    // Économie d'impôt annuelle
    this.economieImpotAnnuelle = montantDeduit * (this.trancheMarginalImposition / 100);

    // Capital accumulé avec intérêts composés
    const tauxMensuel = this.rendementAnnuel / 100 / 12;
    const nombreMois = this.dureeEpargne * 12;

    // Formule des versements réguliers avec intérêts composés
    if (tauxMensuel > 0) {
      // Capital des versements mensuels
      const capitalMensuel = this.versementMensuel *
        ((Math.pow(1 + tauxMensuel, nombreMois) - 1) / tauxMensuel) *
        (1 + tauxMensuel);

      // Capital du versement exceptionnel annuel (simplifié)
      const capitalExceptionnel = this.versementExceptionnel *
        this.dureeEpargne *
        Math.pow(1 + this.rendementAnnuel / 100, this.dureeEpargne / 2);

      this.capitalAccumule = capitalMensuel + capitalExceptionnel;
    } else {
      this.capitalAccumule = this.versementAnnuelTotal * this.dureeEpargne;
    }

    // Total versé
    this.totalVerse = this.versementAnnuelTotal * this.dureeEpargne;

    // Intérêts générés
    this.interetsGeneres = this.capitalAccumule - this.totalVerse;

    // Économie totale d'impôt sur la période
    const economieImpotTotale = this.economieImpotAnnuelle * this.dureeEpargne;

    // Fiscalité sortie en capital (versements au barème IR, plus-values au PFU 30%)
    const impotCapitalVerse = this.totalVerse * (this.trancheRetraite / 100);
    const impotPlusValues = this.interetsGeneres * 0.30;
    this.impotSortieCapital = impotCapitalVerse + impotPlusValues;

    // Fiscalité sortie en rente (simplifiée - abattement selon âge, ici 60% imposable après 60 ans)
    const partImposableRente = 0.40; // 40% imposable si sortie après 60 ans
    this.impotSortieRente = this.capitalAccumule * partImposableRente * (this.trancheRetraite / 100);

    // Gain net après impôts
    this.gainNetCapital = this.capitalAccumule - this.impotSortieCapital + economieImpotTotale - this.totalVerse;
    this.gainNetRente = this.capitalAccumule - this.impotSortieRente + economieImpotTotale - this.totalVerse;

    // Taux de rendement net annualisé (approximation)
    if (this.totalVerse > 0 && this.dureeEpargne > 0) {
      const gainTotalNet = this.capitalAccumule + economieImpotTotale - this.impotSortieCapital;
      this.tauxRendementNet = ((Math.pow(gainTotalNet / this.totalVerse, 1 / this.dureeEpargne) - 1) * 100);
    }

    // Arrondir
    this.capitalAccumule = Math.round(this.capitalAccumule);
    this.totalVerse = Math.round(this.totalVerse);
    this.interetsGeneres = Math.round(this.interetsGeneres);
    this.economieImpotAnnuelle = Math.round(this.economieImpotAnnuelle);
    this.impotSortieCapital = Math.round(this.impotSortieCapital);
    this.impotSortieRente = Math.round(this.impotSortieRente);
    this.gainNetCapital = Math.round(this.gainNetCapital);
    this.gainNetRente = Math.round(this.gainNetRente);
    this.plafondDeductible = Math.round(this.plafondDeductible);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  }
}
