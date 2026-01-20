import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../service/seo.service';
import { FaqItem, FaqSectionComponent } from '../../shared/faq-section/faq-section.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule, FaqSectionComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  faqItems: FaqItem[] = [
    {
      question: "Qu'est-ce que CalculateurFinance.fr ?",
      answer: "CalculateurFinance.fr est une plateforme gratuite proposant plus de 30 simulateurs et calculateurs financiers pour l'immobilier, la finance personnelle, l'épargne et la fiscalité. Nos outils vous aident à prendre des décisions éclairées sur vos investissements et votre patrimoine."
    },
    {
      question: "Les simulateurs sont-ils gratuits et sans inscription ?",
      answer: "Oui, tous nos simulateurs et calculateurs sont 100% gratuits et ne nécessitent aucune inscription. Vous pouvez les utiliser immédiatement et autant de fois que vous le souhaitez, en toute confidentialité."
    },
    {
      question: "Quels types de simulateurs proposez-vous ?",
      answer: "Nous proposons des simulateurs immobiliers (rendement locatif, frais de notaire, crédit, LMNP, SCI), des calculateurs financiers (impôt sur le revenu, brut-net, budget, retraite), des simulateurs d'épargne (LEP, livrets, intérêts composés) et des outils pour l'investissement (FIRE, dividendes, micro-entrepreneur)."
    },
    {
      question: "Les résultats des simulateurs sont-ils fiables ?",
      answer: "Nos simulateurs utilisent les barèmes officiels 2026-2026 et sont régulièrement mis à jour selon les dernières lois fiscales. Les résultats sont indicatifs et permettent d'obtenir une estimation réaliste, mais nous recommandons de consulter un professionnel pour des décisions importantes."
    },
    {
      question: "Comment calculer la rentabilité d'un investissement locatif ?",
      answer: "Utilisez notre simulateur de rendement locatif qui calcule le rendement brut, le rendement net et le cashflow. Il prend en compte le prix d'achat, les frais de notaire, les loyers, les charges, la fiscalité et le financement pour vous donner une vision complète de la rentabilité."
    },
    {
      question: "Puis-je simuler mon impôt sur le revenu 2026 ?",
      answer: "Oui, notre simulateur d'impôt sur le revenu intègre le barème 2026 actualisé. Indiquez vos revenus, votre nombre de parts fiscales et vos charges déductibles pour obtenir une estimation de votre impôt et votre taux marginal d'imposition."
    },
    {
      question: "Comment savoir si je suis éligible au LEP ?",
      answer: "Notre simulateur d'éligibilité LEP vérifie instantanément si votre Revenu Fiscal de Référence (RFR) respecte les plafonds 2026 selon votre nombre de parts fiscales. Le LEP offre un taux d'intérêt attractif pour les ménages modestes."
    },
    {
      question: "Quels sont les frais de notaire pour un achat immobilier ?",
      answer: "Notre calculateur de frais de notaire estime précisément les frais selon le type de bien (ancien ou neuf), le prix d'achat et la localisation. Les frais représentent généralement 7-8% dans l'ancien et 2-3% dans le neuf."
    },
    {
      question: "Comment choisir entre LMNP et LMP pour la location meublée ?",
      answer: "Notre comparateur LMNP/LMP analyse votre situation selon vos revenus locatifs. Le LMNP convient si les loyers sont inférieurs à 23 000€/an ou représentent moins de 50% de vos revenus totaux. Au-delà, le statut LMP peut être plus avantageux fiscalement."
    },
    {
      question: "Qu'est-ce que le FIRE (Financial Independence Retire Early) ?",
      answer: "Le FIRE est un mouvement visant l'indépendance financière pour prendre sa retraite anticipée. Notre simulateur FIRE calcule le capital nécessaire selon vos dépenses annuelles, le taux de retrait sécurisé (règle des 4%) et votre horizon de placement pour atteindre la liberté financière."
    },
    {
      question: "Comment optimiser ma fiscalité immobilière ?",
      answer: "Utilisez nos simulateurs de défiscalisation (Pinel, Denormandie, Malraux), notre comparateur SCI à l'IR vs IS, et notre calculateur de plus-value immobilière. Ces outils vous aident à choisir la meilleure stratégie selon votre situation et vos objectifs patrimoniaux."
    },
    {
      question: "Vos simulateurs sont-ils compatibles mobile ?",
      answer: "Oui, tous nos simulateurs sont entièrement responsive et optimisés pour smartphone, tablette et ordinateur. L'interface s'adapte automatiquement à votre écran pour une expérience utilisateur optimale sur tous les appareils."
    },
    {
      question: "Mes données personnelles sont-elles protégées ?",
      answer: "Absolument. Aucune donnée n'est collectée ni stockée sur nos serveurs. Tous les calculs sont effectués localement dans votre navigateur. Nous ne demandons aucune information personnelle et respectons votre vie privée."
    },
    {
      question: "Proposez-vous des articles et guides financiers ?",
      answer: "Oui, en plus des simulateurs, nous publions régulièrement des articles sur l'épargne (livrets, PEA, assurance-vie), l'investissement (immobilier, bourse, indices mondiaux) et la gestion patrimoniale pour vous aider à mieux comprendre vos choix financiers."
    },
    {
      question: "Comment sont mis à jour vos simulateurs ?",
      answer: "Nos simulateurs sont actualisés régulièrement pour intégrer les dernières lois de finances, les nouveaux barèmes fiscaux, les plafonds d'épargne réglementée et les taux d'intérêt en vigueur. Nous vérifions la conformité de nos calculs avec les textes officiels."
    }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    // SEO enrichi pour la page d'accueil
    this.seo.updateMetaData({
      title: "Calculateurs et Simulateurs Financiers Gratuits 2026 | Immobilier, Impôts, Épargne",
      description: "Plus de 30 simulateurs financiers gratuits : rendement locatif, impôt sur le revenu, frais de notaire, LEP, LMNP, crédit immobilier, budget, retraite, FIRE. Outils fiables et à jour pour optimiser vos investissements en 2026.",
      url: "https://calculateurfinance.fr/",
      keywords: "simulateur financier, calculateur immobilier, rendement locatif, impôt revenu 2026, frais notaire, LMNP, LEP, crédit immobilier, budget personnel, retraite, FIRE, SCI, plus-value immobilière, défiscalisation, micro-entrepreneur, dividendes, intérêts composés, brut net, cashflow, TRI, comparateur investissement",
      image: "https://calculateurfinance.fr/assets/logo.png"
    });

    if (isPlatformBrowser(this.platformId)) {
      const url = window.location.href;
    }
  }
}
