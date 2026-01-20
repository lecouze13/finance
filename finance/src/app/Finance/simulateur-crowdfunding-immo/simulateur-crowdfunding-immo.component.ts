import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FaqSectionComponent, FaqItem } from '../../shared/faq-section/faq-section.component';
import { SeoService } from '../../Constructor/service/seo.service';

@Component({
  selector: 'app-simulateur-crowdfunding-immo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputNumberModule,
    DropdownModule,
    PanelModule,
    ButtonModule,
    FloatLabelModule,
    FaqSectionComponent
  ],
  templateUrl: './simulateur-crowdfunding-immo.component.html',
  styleUrls: ['./simulateur-crowdfunding-immo.component.scss']
})
export class SimulateurCrowdfundingImmoComponent implements OnInit {
  Math = Math;

  // Inputs
  montantInvesti: number = 5000;
  tauxRendement: number = 10; // %
  dureeMois: number = 24;
  tauxDefaut: number = 5; // % de probabilité de défaut
  nombreProjets: number = 10; // diversification

  // Résultats
  interetsBruts: number = 0;
  flatTax: number = 0;
  interetsNets: number = 0;
  capitalFinal: number = 0;
  rendementNet: number = 0;
  perteEstimee: number = 0;
  rendementAjusteRisque: number = 0;

  dureeOptions = [
    { label: '12 mois', value: 12 },
    { label: '18 mois', value: 18 },
    { label: '24 mois', value: 24 },
    { label: '36 mois', value: 36 },
    { label: '48 mois', value: 48 }
  ];

  faqItems: FaqItem[] = [
    {
      question: "Qu'est-ce que le crowdfunding immobilier ?",
      answer: "Le crowdfunding immobilier permet d'investir collectivement dans des projets immobiliers (promotion, rénovation, marchand de biens) via des plateformes en ligne. Vous prêtez de l'argent au promoteur et recevez des intérêts à l'échéance, généralement entre 8% et 12% par an."
    },
    {
      question: "Quels sont les risques du crowdfunding immobilier ?",
      answer: "Les principaux risques sont : défaut du promoteur (perte partielle ou totale), retards de remboursement (fréquents, +3 à 6 mois), illiquidité (vous ne pouvez pas revendre votre participation). Le taux de défaut moyen est de 3-5% selon les plateformes."
    },
    {
      question: "Comment diversifier ses investissements ?",
      answer: "Investissez dans au moins 10-20 projets différents pour réduire le risque. Variez les promoteurs, les types de projets (promotion, rénovation), les localisations géographiques et les plateformes. Ne mettez jamais plus de 10% de votre épargne en crowdfunding."
    },
    {
      question: "Comment sont imposés les intérêts ?",
      answer: "Les intérêts sont soumis à la flat tax de 30% (12,8% IR + 17,2% prélèvements sociaux). Vous pouvez opter pour le barème progressif si c'est plus avantageux. Les pertes en capital ne sont pas déductibles des gains sur d'autres projets."
    },
    {
      question: "Quelles plateformes sont fiables ?",
      answer: "Choisissez des plateformes agréées AMF ou ACPR : Homunity, Anaxago, Wiseed, ClubFunding, Raizers, La Première Brique. Vérifiez l'historique de la plateforme, le taux de défaut, et les garanties proposées (hypothèque, caution)."
    },
    {
      question: "Que se passe-t-il en cas de retard ?",
      answer: "Les retards sont fréquents (30-50% des projets). En cas de retard, les intérêts continuent généralement de courir au même taux ou à un taux majoré. La plateforme gère le recouvrement. Le retard n'implique pas nécessairement un défaut."
    },
    {
      question: "Quelle est la durée moyenne d'un projet ?",
      answer: "La durée moyenne est de 18 à 24 mois pour la promotion immobilière, 12 à 18 mois pour le marchand de biens. Ajoutez 3-6 mois de retard potentiel. Votre argent est bloqué pendant toute cette période."
    },
    {
      question: "Le crowdfunding est-il plus rentable que l'immobilier direct ?",
      answer: "Le rendement brut est souvent supérieur (8-12% vs 3-6% pour le locatif), mais le risque est plus élevé. L'immobilier direct offre des avantages fiscaux (LMNP, déficit foncier) et un patrimoine tangible. Les deux sont complémentaires."
    }
  ];

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetaData({
      title: 'Simulateur Crowdfunding Immobilier 2026 | Rentabilité et risques',
      description: 'Calculez gratuitement la rentabilité de vos investissements en crowdfunding immobilier. Intérêts, fiscalité, risque de défaut.',
      url: 'https://calculateurfinance.fr/simulateur-crowdfunding-immo'
    });
    this.calculer();
  }

  calculer(): void {
    // Intérêts bruts (intérêts simples, pas composés)
    this.interetsBruts = this.montantInvesti * (this.tauxRendement / 100) * (this.dureeMois / 12);

    // Flat tax 30%
    this.flatTax = this.interetsBruts * 0.30;

    // Intérêts nets
    this.interetsNets = this.interetsBruts - this.flatTax;

    // Capital final
    this.capitalFinal = this.montantInvesti + this.interetsNets;

    // Rendement net annualisé
    this.rendementNet = (this.interetsNets / this.montantInvesti) * (12 / this.dureeMois) * 100;

    // Perte estimée (risque de défaut avec diversification)
    // Plus on diversifie, plus le risque de perte totale diminue
    const risqueParProjet = this.tauxDefaut / 100;
    const tauxRecuperation = 0.3; // 30% récupéré en cas de défaut
    const perteParDefaut = this.montantInvesti / this.nombreProjets * (1 - tauxRecuperation);
    const nombreDefautsEstimes = this.nombreProjets * risqueParProjet;
    this.perteEstimee = perteParDefaut * nombreDefautsEstimes;

    // Rendement ajusté du risque
    const gainNetApresRisque = this.interetsNets - this.perteEstimee;
    this.rendementAjusteRisque = (gainNetApresRisque / this.montantInvesti) * (12 / this.dureeMois) * 100;

    // Arrondir
    this.interetsBruts = Math.round(this.interetsBruts);
    this.flatTax = Math.round(this.flatTax);
    this.interetsNets = Math.round(this.interetsNets);
    this.capitalFinal = Math.round(this.capitalFinal);
    this.rendementNet = Math.round(this.rendementNet * 100) / 100;
    this.perteEstimee = Math.round(this.perteEstimee);
    this.rendementAjusteRisque = Math.round(this.rendementAjusteRisque * 100) / 100;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  }

  formatPercent(value: number): string {
    return value.toFixed(2) + ' %';
  }

  getRisqueLabel(): string {
    if (this.nombreProjets >= 20) return 'Risque bien diversifié';
    if (this.nombreProjets >= 10) return 'Diversification correcte';
    if (this.nombreProjets >= 5) return 'Diversification insuffisante';
    return 'Risque très concentré';
  }

  getRisqueClass(): string {
    if (this.nombreProjets >= 20) return 'low';
    if (this.nombreProjets >= 10) return 'medium';
    return 'high';
  }
}
