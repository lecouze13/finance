import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { FaqItem } from '../../shared/faq-section/faq-section.component';

@Component({
  selector: 'app-simulateur-pea-assurance-vie',
  templateUrl: './simulateur-pea-assurance-vie.component.html',
  styleUrls: ['./simulateur-pea-assurance-vie.component.scss'],
  standalone: false
})
export class SimulateurPeaAssuranceVieComponent implements OnInit {
  Math = Math;

  // Entrées
  montantInitial: number = 10000;
  versementMensuel: number = 200;
  dureeInvestissement: number = 15;
  rendementAnnuel: number = 6;
  trancheMarginalImposition: number = 30;
  objectif: string = 'capitalisation';

  // Résultats PEA
  peaCapitalFinal: number = 0;
  peaTotalVerse: number = 0;
  peaPlusValues: number = 0;
  peaFiscaliteRetrait: number = 0;
  peaNetApresImpots: number = 0;
  peaRendementNet: number = 0;

  // Résultats Assurance-vie
  avCapitalFinal: number = 0;
  avTotalVerse: number = 0;
  avPlusValues: number = 0;
  avFiscaliteRetrait: number = 0;
  avNetApresImpots: number = 0;
  avRendementNet: number = 0;

  // Comparaison
  difference: number = 0;
  meilleurProduit: string = '';

  objectifOptions = [
    { label: 'Capitalisation long terme', value: 'capitalisation' },
    { label: 'Revenus complémentaires', value: 'revenus' },
    { label: 'Transmission', value: 'transmission' }
  ];

  tranchesOptions = [
    { label: '0% - Non imposable', value: 0 },
    { label: '11%', value: 11 },
    { label: '30%', value: 30 },
    { label: '41%', value: 41 },
    { label: '45%', value: 45 }
  ];

  faqItems: FaqItem[] = [
    {
      question: "Quelle est la différence principale entre PEA et Assurance-vie ?",
      answer: "Le PEA est une enveloppe dédiée aux actions européennes avec exonération d'IR après 5 ans (PS de 17.2% uniquement). L'assurance-vie est plus polyvalente (fonds euros, UC diverses) avec une fiscalité allégée après 8 ans (abattement 4 600€/9 200€). Le PEA est optimal pour les actions, l'AV pour la diversification et la transmission."
    },
    {
      question: "Quelle est la fiscalité du PEA après 5 ans ?",
      answer: "Après 5 ans de détention, les plus-values du PEA sont exonérées d'impôt sur le revenu. Seuls les prélèvements sociaux de 17.2% s'appliquent sur les gains. Avant 5 ans, c'est le PFU de 30% (12.8% IR + 17.2% PS) ou le barème progressif sur option. C'est l'une des fiscalités les plus avantageuses."
    },
    {
      question: "Quelle est la fiscalité de l'Assurance-vie après 8 ans ?",
      answer: "Après 8 ans, les rachats bénéficient d'un abattement annuel de 4 600€ (célibataire) ou 9 200€ (couple) sur les plus-values. Au-delà, le taux est de 7.5% + 17.2% de PS pour les versements < 150 000€. Pour les versements > 150 000€, le PFU de 30% s'applique. C'est avantageux pour les retraits progressifs."
    },
    {
      question: "Quel plafond de versement pour le PEA ?",
      answer: "Le PEA est plafonné à 150 000€ de versements (225 000€ avec le PEA-PME). Ce plafond concerne les versements, pas la valorisation : votre PEA peut dépasser 150 000€ grâce aux plus-values. L'assurance-vie n'a pas de plafond de versement, ce qui en fait un complément utile."
    },
    {
      question: "Lequel choisir pour la transmission ?",
      answer: "L'assurance-vie est nettement supérieure pour la transmission : abattement de 152 500€ par bénéficiaire pour les versements avant 70 ans, puis taxation à 20%/31.25%. Le PEA entre dans la succession classique (droits selon le lien de parenté). Pour transmettre, privilégiez l'assurance-vie."
    },
    {
      question: "Peut-on avoir les deux : PEA et Assurance-vie ?",
      answer: "Oui, et c'est même recommandé ! Le PEA pour la poche actions européennes (meilleure fiscalité sur les gains), l'assurance-vie pour la diversification (fonds euros, immobilier, international) et la transmission. Les deux enveloppes sont complémentaires et cumulables sans limite."
    },
    {
      question: "Que se passe-t-il en cas de retrait avant l'échéance fiscale ?",
      answer: "PEA avant 5 ans : clôture du plan et taxation au PFU (30%) ou barème. Assurance-vie avant 8 ans : pas de clôture, mais taxation au PFU (30%) sur les gains. L'AV est plus souple car un retrait n'entraîne pas la fermeture du contrat, contrairement au PEA (sauf exceptions depuis 2019)."
    },
    {
      question: "Quels frais comparer entre PEA et Assurance-vie ?",
      answer: "PEA : frais de courtage (0 à 0.5% par ordre), frais de gestion (0 à 0.4%/an selon le type). Assurance-vie : frais sur versement (0 à 3%), frais de gestion annuels (0.5 à 1%/an), frais d'arbitrage. Les PEA en ligne et les AV en ligne offrent les frais les plus bas."
    },
    {
      question: "Le PEA est-il risqué ?",
      answer: "Le PEA impose d'investir en actions européennes, donc oui il y a un risque de perte en capital. Sur le long terme (10+ ans), le risque est atténué statistiquement. L'assurance-vie permet de mixer fonds euros (capital garanti) et unités de compte (risquées). Pour un profil prudent, l'AV offre plus de flexibilité."
    },
    {
      question: "Comment optimiser sa stratégie PEA + Assurance-vie ?",
      answer: "Stratégie optimale : 1) Ouvrir les deux le plus tôt possible pour prendre date fiscalement, 2) Maximiser le PEA pour les actions européennes (jusqu'à 150k€), 3) Utiliser l'AV pour le fonds euros, l'immobilier (SCPI) et les actions hors Europe, 4) Désigner les bénéficiaires de l'AV pour la transmission."
    }
  ];

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Comparateur PEA vs Assurance-vie 2025 | Simulateur Fiscalité');
    this.meta.updateTag({
      name: 'description',
      content: 'Comparez PEA et Assurance-vie : fiscalité, rendement net, plafonds. Simulez vos gains après impôts et choisissez le meilleur placement pour votre épargne.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'PEA vs assurance vie, comparateur placement, fiscalité PEA, fiscalité assurance vie, meilleur placement 2025, épargne actions, simulation placement'
    });
    this.calculer();
  }

  calculer(): void {
    // Capital final avec intérêts composés (identique pour les deux)
    const tauxMensuel = this.rendementAnnuel / 100 / 12;
    const nombreMois = this.dureeInvestissement * 12;

    // Calcul du capital final
    let capitalFinal = this.montantInitial * Math.pow(1 + this.rendementAnnuel / 100, this.dureeInvestissement);

    if (tauxMensuel > 0) {
      capitalFinal += this.versementMensuel *
        ((Math.pow(1 + tauxMensuel, nombreMois) - 1) / tauxMensuel) *
        (1 + tauxMensuel);
    } else {
      capitalFinal += this.versementMensuel * nombreMois;
    }

    const totalVerse = this.montantInitial + (this.versementMensuel * nombreMois);
    const plusValues = capitalFinal - totalVerse;

    // ===== PEA =====
    this.peaCapitalFinal = capitalFinal;
    this.peaTotalVerse = totalVerse;
    this.peaPlusValues = plusValues;

    if (this.dureeInvestissement >= 5) {
      // Après 5 ans : exonération IR, seulement PS 17.2%
      this.peaFiscaliteRetrait = plusValues * 0.172;
    } else {
      // Avant 5 ans : PFU 30%
      this.peaFiscaliteRetrait = plusValues * 0.30;
    }

    this.peaNetApresImpots = capitalFinal - this.peaFiscaliteRetrait;

    // Rendement net annualisé PEA
    if (totalVerse > 0) {
      this.peaRendementNet = (Math.pow(this.peaNetApresImpots / totalVerse, 1 / this.dureeInvestissement) - 1) * 100;
    }

    // ===== Assurance-vie =====
    this.avCapitalFinal = capitalFinal;
    this.avTotalVerse = totalVerse;
    this.avPlusValues = plusValues;

    if (this.dureeInvestissement >= 8) {
      // Après 8 ans : abattement puis taux réduit
      const abattement = 4600; // Célibataire (9200 pour couple)
      const pvImposables = Math.max(0, plusValues - abattement);

      // Taux 7.5% + PS 17.2% = 24.7% sur la part imposable
      // (simplifié - en réalité dépend du montant des versements > ou < 150k€)
      if (totalVerse <= 150000) {
        this.avFiscaliteRetrait = pvImposables * 0.247;
      } else {
        // Au-delà de 150k€ : PFU 30%
        this.avFiscaliteRetrait = pvImposables * 0.30;
      }
    } else {
      // Avant 8 ans : PFU 30%
      this.avFiscaliteRetrait = plusValues * 0.30;
    }

    this.avNetApresImpots = capitalFinal - this.avFiscaliteRetrait;

    // Rendement net annualisé AV
    if (totalVerse > 0) {
      this.avRendementNet = (Math.pow(this.avNetApresImpots / totalVerse, 1 / this.dureeInvestissement) - 1) * 100;
    }

    // Comparaison
    this.difference = this.peaNetApresImpots - this.avNetApresImpots;

    // Déterminer le meilleur produit selon l'objectif
    if (this.objectif === 'transmission') {
      this.meilleurProduit = 'Assurance-vie';
    } else if (this.difference > 0) {
      this.meilleurProduit = 'PEA';
    } else {
      this.meilleurProduit = 'Assurance-vie';
    }

    // Arrondir
    this.peaCapitalFinal = Math.round(this.peaCapitalFinal);
    this.peaTotalVerse = Math.round(this.peaTotalVerse);
    this.peaPlusValues = Math.round(this.peaPlusValues);
    this.peaFiscaliteRetrait = Math.round(this.peaFiscaliteRetrait);
    this.peaNetApresImpots = Math.round(this.peaNetApresImpots);
    this.avCapitalFinal = Math.round(this.avCapitalFinal);
    this.avTotalVerse = Math.round(this.avTotalVerse);
    this.avPlusValues = Math.round(this.avPlusValues);
    this.avFiscaliteRetrait = Math.round(this.avFiscaliteRetrait);
    this.avNetApresImpots = Math.round(this.avNetApresImpots);
    this.difference = Math.round(this.difference);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  }
}
