import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { FaqItem } from '../../shared/faq-section/faq-section.component';

@Component({
  selector: 'app-simulateur-remboursement-anticipe',
  templateUrl: './simulateur-remboursement-anticipe.component.html',
  styleUrls: ['./simulateur-remboursement-anticipe.component.scss'],
  standalone: false
})
export class SimulateurRemboursementAnticipeComponent implements OnInit {
  // Entrées
  capitalRestant: number = 150000;
  tauxInteret: number = 3.5;
  dureeRestante: number = 15; // en années
  mensualiteActuelle: number = 0;
  montantRemboursement: number = 20000;
  typeRemboursement: string = 'duree'; // 'duree' ou 'mensualite'
  fraisRemboursement: number = 0; // en % du capital remboursé

  // Résultats
  nouvelleDuree: number = 0;
  nouvelleMensualite: number = 0;
  economieInterets: number = 0;
  coutTotalAvant: number = 0;
  coutTotalApres: number = 0;
  interetsTotauxAvant: number = 0;
  interetsTotauxApres: number = 0;
  fraisIRA: number = 0;
  economieNette: number = 0;
  moisGagnes: number = 0;
  rentabiliteRemboursement: number = 0;

  // Tableau d'amortissement comparatif
  amortissementAvant: any[] = [];
  amortissementApres: any[] = [];

  typeOptions = [
    { label: 'Réduire la durée (mensualité identique)', value: 'duree' },
    { label: 'Réduire la mensualité (durée identique)', value: 'mensualite' }
  ];

  faqItems: FaqItem[] = [
    {
      question: "Qu'est-ce que le remboursement anticipé d'un crédit ?",
      answer: "Le remboursement anticipé consiste à rembourser tout ou partie du capital restant dû avant l'échéance prévue. Cela permet de réduire soit la durée du prêt (mensualité maintenue), soit la mensualité (durée maintenue). Les économies d'intérêts peuvent être substantielles."
    },
    {
      question: "Quels sont les frais de remboursement anticipé (IRA) ?",
      answer: "Les Indemnités de Remboursement Anticipé sont plafonnées par la loi : maximum 6 mois d'intérêts sur le capital remboursé OU 3% du capital restant dû (le plus faible des deux). Certains prêts (taux zéro, prêts renégociés, etc.) en sont exonérés. Vérifiez votre contrat."
    },
    {
      question: "Vaut-il mieux réduire la durée ou la mensualité ?",
      answer: "Réduire la durée génère plus d'économies d'intérêts car vous payez moins longtemps. Réduire la mensualité améliore votre cash-flow mensuel mais coûte plus cher au total. Choix selon votre priorité : maximiser l'économie ou améliorer le budget mensuel."
    },
    {
      question: "Quand est-ce rentable de rembourser par anticipation ?",
      answer: "C'est rentable quand : 1) Le taux du prêt est supérieur au rendement de votre épargne, 2) Les frais d'IRA sont faibles ou nuls, 3) Vous êtes en début de prêt (plus d'intérêts à économiser). Moins intéressant en fin de prêt car vous payez surtout du capital."
    },
    {
      question: "Puis-je faire un remboursement anticipé partiel ?",
      answer: "Oui, la plupart des contrats autorisent les remboursements partiels. Certains imposent un montant minimum (souvent 10% du capital initial). Vérifiez les conditions de votre offre de prêt. Chaque remboursement partiel réduit le capital restant dû."
    },
    {
      question: "Comment calculer l'économie réalisée ?",
      answer: "Économie = Intérêts totaux SANS remboursement - Intérêts totaux AVEC remboursement - Frais IRA. Notre simulateur calcule précisément cette économie en comparant les deux scénarios d'amortissement complets."
    },
    {
      question: "Le remboursement anticipé affecte-t-il mon assurance emprunteur ?",
      answer: "Si vous réduisez la durée : vous payez l'assurance moins longtemps = économie supplémentaire. Si vous réduisez la mensualité : la durée reste identique, pas d'économie sur l'assurance. Pensez à intégrer ce paramètre dans votre calcul."
    },
    {
      question: "Faut-il garder une épargne de précaution avant de rembourser ?",
      answer: "Oui, absolument. Conservez 3 à 6 mois de dépenses en épargne disponible avant tout remboursement anticipé. Un crédit remboursé ne peut pas être 'réemprunté'. Ne sacrifiez pas votre sécurité financière pour économiser quelques intérêts."
    },
    {
      question: "Remboursement anticipé ou investissement : que choisir ?",
      answer: "Comparez le taux du crédit (votre coût garanti) au rendement espéré de l'investissement (non garanti). À 3% de crédit, si vous pouvez investir à 5-6% net, l'investissement peut être préférable. Mais le remboursement est un gain certain, sans risque."
    },
    {
      question: "Puis-je négocier les frais de remboursement anticipé ?",
      answer: "Oui, surtout lors d'une renégociation ou d'un rachat de crédit. Certaines banques renoncent aux IRA pour fidéliser le client ou dans le cadre d'une opération globale. N'hésitez pas à demander, le pire qu'il puisse arriver est un refus."
    }
  ];

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Simulateur Remboursement Anticipé 2026 | Calculez vos Économies');
    this.meta.updateTag({
      name: 'description',
      content: 'Calculez l\'économie réalisée en remboursant votre crédit par anticipation. Comparez réduction de durée ou de mensualité. Simulation avec frais IRA inclus.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'remboursement anticipé, économie crédit, IRA, frais remboursement, réduire durée prêt, réduire mensualité, simulation remboursement'
    });
    this.calculerMensualiteActuelle();
  }

  calculerMensualiteActuelle(): void {
    const tauxMensuel = this.tauxInteret / 100 / 12;
    const nombreMois = this.dureeRestante * 12;

    if (tauxMensuel > 0) {
      this.mensualiteActuelle = this.capitalRestant * tauxMensuel * Math.pow(1 + tauxMensuel, nombreMois) /
        (Math.pow(1 + tauxMensuel, nombreMois) - 1);
    } else {
      this.mensualiteActuelle = this.capitalRestant / nombreMois;
    }

    this.calculer();
  }

  calculer(): void {
    const tauxMensuel = this.tauxInteret / 100 / 12;
    const nombreMoisAvant = this.dureeRestante * 12;
    const nouveauCapital = this.capitalRestant - this.montantRemboursement;

    // Calcul des frais IRA
    const interets6Mois = this.montantRemboursement * (this.tauxInteret / 100) * 0.5;
    const plafond3Pourcent = this.capitalRestant * 0.03;
    this.fraisIRA = this.montantRemboursement * (this.fraisRemboursement / 100);
    // En pratique, limiter aux plafonds légaux
    this.fraisIRA = Math.min(this.fraisIRA, Math.min(interets6Mois, plafond3Pourcent));

    // Coût total AVANT remboursement anticipé
    this.coutTotalAvant = this.mensualiteActuelle * nombreMoisAvant;
    this.interetsTotauxAvant = this.coutTotalAvant - this.capitalRestant;

    if (this.typeRemboursement === 'duree') {
      // Réduction de la durée, mensualité identique
      this.nouvelleMensualite = this.mensualiteActuelle;

      if (tauxMensuel > 0 && nouveauCapital > 0) {
        // Calcul du nombre de mois nécessaires
        const nombreMoisApres = Math.log(this.nouvelleMensualite / (this.nouvelleMensualite - nouveauCapital * tauxMensuel)) /
          Math.log(1 + tauxMensuel);
        this.nouvelleDuree = Math.ceil(nombreMoisApres) / 12;
        this.moisGagnes = nombreMoisAvant - Math.ceil(nombreMoisApres);
      } else {
        this.nouvelleDuree = nouveauCapital / this.nouvelleMensualite / 12;
        this.moisGagnes = nombreMoisAvant - Math.ceil(this.nouvelleDuree * 12);
      }

      this.coutTotalApres = this.nouvelleMensualite * Math.ceil(this.nouvelleDuree * 12) + this.montantRemboursement;

    } else {
      // Réduction de la mensualité, durée identique
      this.nouvelleDuree = this.dureeRestante;
      this.moisGagnes = 0;

      if (tauxMensuel > 0 && nouveauCapital > 0) {
        this.nouvelleMensualite = nouveauCapital * tauxMensuel * Math.pow(1 + tauxMensuel, nombreMoisAvant) /
          (Math.pow(1 + tauxMensuel, nombreMoisAvant) - 1);
      } else {
        this.nouvelleMensualite = nouveauCapital / nombreMoisAvant;
      }

      this.coutTotalApres = this.nouvelleMensualite * nombreMoisAvant + this.montantRemboursement;
    }

    // Calcul des économies
    this.interetsTotauxApres = this.coutTotalApres - this.capitalRestant;
    this.economieInterets = this.interetsTotauxAvant - this.interetsTotauxApres;
    this.economieNette = this.economieInterets - this.fraisIRA;

    // Rentabilité du remboursement (rendement annualisé équivalent)
    if (this.montantRemboursement > 0 && this.nouvelleDuree > 0) {
      this.rentabiliteRemboursement = (this.economieNette / this.montantRemboursement) / this.nouvelleDuree * 100;
    }

    // Arrondir
    this.mensualiteActuelle = Math.round(this.mensualiteActuelle * 100) / 100;
    this.nouvelleMensualite = Math.round(this.nouvelleMensualite * 100) / 100;
    this.coutTotalAvant = Math.round(this.coutTotalAvant);
    this.coutTotalApres = Math.round(this.coutTotalApres);
    this.interetsTotauxAvant = Math.round(this.interetsTotauxAvant);
    this.interetsTotauxApres = Math.round(this.interetsTotauxApres);
    this.economieInterets = Math.round(this.economieInterets);
    this.economieNette = Math.round(this.economieNette);
    this.fraisIRA = Math.round(this.fraisIRA);
    this.nouvelleDuree = Math.round(this.nouvelleDuree * 10) / 10;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  }
}
