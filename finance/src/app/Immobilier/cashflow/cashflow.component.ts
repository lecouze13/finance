import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../Constructor/service/seo.service';
import { FaqItem } from '../../shared/faq-section/faq-section.component';
import { ExportData } from '../../shared/services/export.service';

@Component({
  selector: 'app-cashflow',
  templateUrl: './cashflow.component.html',
  standalone: false
})
export class CashflowComponent implements OnInit {
  // Paramètres d'entrée
  loyerMensuel: number = 900;
  mensualiteCredit: number = 650;
  chargesCopro: number = 80;
  taxeFonciere: number = 100;
  assurancePNO: number = 20;
  fraisGestion: number = 0;
  autresCharges: number = 0;
  provisionVacance: number = 5; // % pour vacance locative
  provisionTravaux: number = 3; // % pour travaux/entretien

  // Résultats
  cashflowBrut: number = 0;
  cashflowNet: number = 0;
  cashflowAnnuel: number = 0;
  totalCharges: number = 0;
  provisionVacanceMontant: number = 0;
  provisionTravauxMontant: number = 0;
  tauxEffort: number = 0;

  faqItems: FaqItem[] = [
    {
      question: "Qu'est-ce que le cashflow immobilier ?",
      answer: "Le cashflow est la différence entre vos revenus locatifs et toutes vos dépenses (crédit, charges, impôts). Un cashflow positif signifie que votre investissement s'autofinance et génère un surplus."
    },
    {
      question: "Quelle est la différence entre cashflow brut et net ?",
      answer: "Le cashflow brut = loyers - crédit. Le cashflow net inclut toutes les charges (copro, taxe foncière, assurance, gestion, provisions). C'est le cashflow net qui reflète votre gain réel."
    },
    {
      question: "Pourquoi prévoir une provision pour vacance locative ?",
      answer: "Même avec un bon bien, il y a des périodes sans locataire (déménagement, travaux entre deux locations). Prévoir 5-10% du loyer permet de lisser ces périodes et d'avoir une vision réaliste."
    },
    {
      question: "Un cashflow négatif est-il toujours mauvais ?",
      answer: "Pas forcément. Un léger cashflow négatif peut être compensé par la plus-value à terme, les avantages fiscaux (LMNP, Pinel), ou la constitution de patrimoine. L'important est de pouvoir assumer l'effort d'épargne."
    },
    {
      question: "Comment améliorer mon cashflow ?",
      answer: "Négociez le prix d'achat, allongez la durée du crédit, optimisez les charges (renégociez l'assurance, la copro), augmentez le loyer si le marché le permet, ou passez en meublé (loyers plus élevés)."
    },
    {
      question: "Faut-il inclure les impôts dans le cashflow ?",
      answer: "Oui, pour un cashflow réaliste. Les revenus fonciers sont imposés à votre TMI + 17,2% de prélèvements sociaux. En LMNP, l'amortissement peut réduire voire annuler l'imposition."
    },
    {
      question: "Qu'est-ce que l'effort d'épargne ?",
      answer: "C'est le montant que vous devez sortir de votre poche chaque mois pour combler un cashflow négatif. Il doit rester supportable par rapport à vos revenus (généralement < 10% de vos revenus)."
    },
    {
      question: "Comment calculer les charges de copropriété ?",
      answer: "Demandez les 3 derniers PV d'AG et le montant des charges. Attention aux charges récupérables (payées par le locataire) vs non récupérables (à votre charge). Seules les non récupérables impactent le cashflow."
    },
    {
      question: "Faut-il prévoir une provision pour travaux ?",
      answer: "Oui, 3-5% du loyer annuel est raisonnable pour l'entretien courant. Pour les gros travaux (ravalement, toiture), vérifiez le plan pluriannuel de la copropriété et les appels de fonds prévus."
    },
    {
      question: "Le cashflow est-il le seul critère important ?",
      answer: "Non, considérez aussi le rendement global (cashflow + plus-value + remboursement du capital), la qualité du bien et de l'emplacement, la liquidité, et votre stratégie patrimoniale globale."
    }
  ];

  constructor(
    private seo: SeoService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Simulateur Cashflow Immobilier 2025 | Calculez votre Flux de Trésorerie',
      description: 'Calculez le cashflow de votre investissement locatif. Loyers, crédit, charges, provisions : obtenez votre flux de trésorerie mensuel réel.',
      keywords: 'cashflow immobilier, simulateur cashflow, flux trésorerie locatif, rentabilité immobilière, autofinancement, effort épargne',
      url: 'https://calculateurfinance.fr/cashflow-immobilier/',
    });

    this.calculer();
  }

  calculer(): void {
    // Provisions
    this.provisionVacanceMontant = Math.round(this.loyerMensuel * this.provisionVacance / 100);
    this.provisionTravauxMontant = Math.round(this.loyerMensuel * this.provisionTravaux / 100);

    // Total des charges mensuelles
    this.totalCharges = this.chargesCopro + (this.taxeFonciere / 12) + this.assurancePNO +
                        this.fraisGestion + this.autresCharges + this.provisionVacanceMontant +
                        this.provisionTravauxMontant;

    // Cashflow brut (avant charges, juste loyer - crédit)
    this.cashflowBrut = this.loyerMensuel - this.mensualiteCredit;

    // Cashflow net (après toutes les charges)
    this.cashflowNet = this.loyerMensuel - this.mensualiteCredit - this.totalCharges;

    // Cashflow annuel
    this.cashflowAnnuel = this.cashflowNet * 12;

    // Taux d'effort (dépenses / loyer)
    this.tauxEffort = ((this.mensualiteCredit + this.totalCharges) / this.loyerMensuel) * 100;
  }

  getCashflowClass(): string {
    if (this.cashflowNet > 100) return 'positive';
    if (this.cashflowNet >= 0) return 'neutral';
    return 'negative';
  }

  getVerdict(): string {
    if (this.cashflowNet > 200) return 'Excellent cashflow';
    if (this.cashflowNet > 100) return 'Bon cashflow';
    if (this.cashflowNet >= 0) return 'Équilibre atteint';
    if (this.cashflowNet > -100) return 'Léger effort d\'épargne';
    return 'Effort d\'épargne important';
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  }

  getExportData(): ExportData {
    return {
      title: 'Simulation Cashflow Immobilier',
      subtitle: `Loyer ${this.formatCurrency(this.loyerMensuel)}/mois - Crédit ${this.formatCurrency(this.mensualiteCredit)}/mois`,
      date: new Date(),
      sections: [
        {
          title: 'Revenus',
          rows: [
            { label: 'Loyer mensuel', value: this.loyerMensuel, type: 'currency' },
            { label: 'Loyer annuel', value: this.loyerMensuel * 12, type: 'currency' }
          ]
        },
        {
          title: 'Charges mensuelles',
          rows: [
            { label: 'Mensualité crédit', value: this.mensualiteCredit, type: 'currency' },
            { label: 'Charges copropriété', value: this.chargesCopro, type: 'currency' },
            { label: 'Taxe foncière (mensuel)', value: Math.round(this.taxeFonciere / 12), type: 'currency' },
            { label: 'Assurance PNO', value: this.assurancePNO, type: 'currency' },
            { label: 'Frais de gestion', value: this.fraisGestion, type: 'currency' },
            { label: 'Provision vacance', value: this.provisionVacanceMontant, type: 'currency' },
            { label: 'Provision travaux', value: this.provisionTravauxMontant, type: 'currency' },
            { label: 'Total charges', value: this.totalCharges, type: 'currency', highlight: true }
          ]
        },
        {
          title: 'Résultats',
          rows: [
            { label: 'Cashflow brut', value: this.cashflowBrut, type: 'currency' },
            { label: 'Cashflow net mensuel', value: this.cashflowNet, type: 'currency', highlight: true },
            { label: 'Cashflow net annuel', value: this.cashflowAnnuel, type: 'currency' },
            { label: 'Taux d\'effort', value: this.tauxEffort, type: 'percent' },
            { label: 'Verdict', value: this.getVerdict(), type: 'text' }
          ]
        }
      ]
    };
  }
}
