import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { FaqItem } from '../../shared/faq-section/faq-section.component';

@Component({
  selector: 'app-simulateur-credit-conso',
  templateUrl: './simulateur-credit-conso.component.html',
  styleUrls: ['./simulateur-credit-conso.component.scss'],
  standalone: false
})
export class SimulateurCreditConsoComponent implements OnInit {
  // Entrées
  montantEmprunte: number = 15000;
  tauxAnnuel: number = 5.5;
  dureeMois: number = 48;
  fraisDossier: number = 150;
  assuranceMensuelle: number = 15;
  modeCalcul: string = 'mensualite'; // 'mensualite' ou 'capacite'
  mensualiteMax: number = 300;

  // Résultats
  mensualiteHorsAssurance: number = 0;
  mensualiteAvecAssurance: number = 0;
  coutTotalCredit: number = 0;
  coutInterets: number = 0;
  coutAssurance: number = 0;
  taeg: number = 0;
  capaciteEmprunt: number = 0;

  // Tableau d'amortissement
  amortissement: any[] = [];
  showAmortissement: boolean = false;

  modeOptions = [
    { label: 'Calculer la mensualité', value: 'mensualite' },
    { label: 'Calculer la capacité d\'emprunt', value: 'capacite' }
  ];

  // Exemples de taux par type de crédit
  exempleTaux = [
    { type: 'Auto neuf', taux: '3.5% - 5%' },
    { type: 'Auto occasion', taux: '4% - 7%' },
    { type: 'Travaux', taux: '3% - 6%' },
    { type: 'Personnel', taux: '4% - 8%' },
    { type: 'Renouvelable', taux: '15% - 21%' }
  ];

  faqItems: FaqItem[] = [
    {
      question: "Qu'est-ce qu'un crédit à la consommation ?",
      answer: "Le crédit à la consommation permet de financer des biens ou services (auto, travaux, voyages...) sans justificatif d'utilisation pour certains. Il est plafonné à 75 000€ et sa durée peut aller de 3 mois à 7 ans. Les taux sont généralement plus élevés qu'un crédit immobilier."
    },
    {
      question: "Quelle est la différence entre taux nominal et TAEG ?",
      answer: "Le taux nominal (ou débiteur) est le taux d'intérêt pur. Le TAEG (Taux Annuel Effectif Global) inclut tous les frais obligatoires : intérêts, frais de dossier, assurance obligatoire. Le TAEG est l'indicateur à comparer entre les offres, il reflète le coût réel du crédit."
    },
    {
      question: "L'assurance emprunteur est-elle obligatoire ?",
      answer: "Non, l'assurance n'est pas légalement obligatoire pour un crédit conso, mais certains prêteurs l'exigent. Elle couvre le décès et parfois l'invalidité. Son coût varie de 0,2% à 0,5% du capital emprunté par an. Comparez les offres et négociez."
    },
    {
      question: "Combien puis-je emprunter avec ma mensualité ?",
      answer: "La capacité d'emprunt dépend de la mensualité que vous pouvez supporter (max 33% de vos revenus tous crédits confondus), du taux d'intérêt et de la durée. Notre simulateur calcule précisément le montant empruntable selon ces paramètres."
    },
    {
      question: "Crédit affecté ou crédit personnel : lequel choisir ?",
      answer: "Le crédit affecté finance un bien précis (auto, travaux) et offre une protection : si le bien n'est pas livré, le crédit est annulé. Le crédit personnel est libre d'utilisation mais sans cette protection. Les taux sont souvent similaires, parfois meilleurs sur l'affecté."
    },
    {
      question: "Peut-on rembourser un crédit conso par anticipation ?",
      answer: "Oui, c'est un droit légal. Pour les crédits > 10 000€, des indemnités peuvent s'appliquer : max 1% du capital si plus d'un an restant, 0,5% sinon. Pour les crédits < 10 000€ ou durée restante < 1 an, aucune indemnité ne peut être exigée."
    },
    {
      question: "Qu'est-ce que le délai de rétractation ?",
      answer: "Après signature, vous disposez de 14 jours calendaires pour vous rétracter sans justification ni pénalité. Ce délai court à partir de l'acceptation de l'offre. Les fonds ne sont généralement pas débloqués avant la fin de ce délai (sauf demande express pour certains crédits)."
    },
    {
      question: "Quelle durée choisir pour mon crédit conso ?",
      answer: "Plus la durée est longue, plus la mensualité est basse mais plus le coût total est élevé. Règle générale : choisissez la durée la plus courte que votre budget permet. Pour un crédit auto, évitez de dépasser la durée de détention prévue du véhicule."
    },
    {
      question: "Le crédit renouvelable est-il une bonne option ?",
      answer: "Le crédit renouvelable (revolving) est pratique mais très coûteux (15-21% de taux). Il est à éviter pour les achats importants. Si vous l'utilisez, remboursez le plus vite possible. Privilégiez un crédit classique amortissable pour tout achat planifié."
    },
    {
      question: "Comment comparer les offres de crédit conso ?",
      answer: "Comparez toujours le TAEG (pas le taux nominal). Vérifiez les frais de dossier, le coût de l'assurance, les conditions de remboursement anticipé. Utilisez des comparateurs et n'hésitez pas à négocier, surtout si vous êtes un bon profil (revenus stables, pas d'incidents)."
    }
  ];

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Simulateur Crédit Consommation 2025 | Calculez votre Mensualité');
    this.meta.updateTag({
      name: 'description',
      content: 'Simulez votre crédit à la consommation : mensualité, coût total, TAEG. Comparez crédit auto, travaux, personnel. Tableau d\'amortissement inclus.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'crédit consommation, simulateur crédit, crédit auto, crédit travaux, prêt personnel, TAEG, mensualité crédit, tableau amortissement'
    });
    this.calculer();
  }

  calculer(): void {
    const tauxMensuel = this.tauxAnnuel / 100 / 12;

    if (this.modeCalcul === 'mensualite') {
      // Calcul de la mensualité
      if (tauxMensuel > 0) {
        this.mensualiteHorsAssurance = this.montantEmprunte * tauxMensuel *
          Math.pow(1 + tauxMensuel, this.dureeMois) /
          (Math.pow(1 + tauxMensuel, this.dureeMois) - 1);
      } else {
        this.mensualiteHorsAssurance = this.montantEmprunte / this.dureeMois;
      }
    } else {
      // Calcul de la capacité d'emprunt
      const mensualiteNette = this.mensualiteMax - this.assuranceMensuelle;
      if (tauxMensuel > 0 && mensualiteNette > 0) {
        this.capaciteEmprunt = mensualiteNette *
          (Math.pow(1 + tauxMensuel, this.dureeMois) - 1) /
          (tauxMensuel * Math.pow(1 + tauxMensuel, this.dureeMois));
        this.montantEmprunte = this.capaciteEmprunt;
        this.mensualiteHorsAssurance = mensualiteNette;
      } else {
        this.capaciteEmprunt = mensualiteNette * this.dureeMois;
        this.montantEmprunte = this.capaciteEmprunt;
        this.mensualiteHorsAssurance = mensualiteNette;
      }
    }

    // Mensualité avec assurance
    this.mensualiteAvecAssurance = this.mensualiteHorsAssurance + this.assuranceMensuelle;

    // Coûts
    this.coutInterets = (this.mensualiteHorsAssurance * this.dureeMois) - this.montantEmprunte;
    this.coutAssurance = this.assuranceMensuelle * this.dureeMois;
    this.coutTotalCredit = this.montantEmprunte + this.coutInterets + this.coutAssurance + this.fraisDossier;

    // Calcul du TAEG (approximation)
    const coutsTotaux = this.coutInterets + this.coutAssurance + this.fraisDossier;
    this.taeg = this.calculerTAEG();

    // Générer le tableau d'amortissement
    this.genererAmortissement();

    // Arrondir
    this.mensualiteHorsAssurance = Math.round(this.mensualiteHorsAssurance * 100) / 100;
    this.mensualiteAvecAssurance = Math.round(this.mensualiteAvecAssurance * 100) / 100;
    this.coutInterets = Math.round(this.coutInterets);
    this.coutAssurance = Math.round(this.coutAssurance);
    this.coutTotalCredit = Math.round(this.coutTotalCredit);
    this.capaciteEmprunt = Math.round(this.capaciteEmprunt);
  }

  calculerTAEG(): number {
    // Approximation du TAEG par méthode itérative
    const totalRembourse = this.mensualiteAvecAssurance * this.dureeMois + this.fraisDossier;
    const capitalNet = this.montantEmprunte - this.fraisDossier;

    let taeg = this.tauxAnnuel / 100;
    for (let i = 0; i < 100; i++) {
      const tauxMensuelTest = taeg / 12;
      let vp = 0;
      for (let m = 1; m <= this.dureeMois; m++) {
        vp += this.mensualiteAvecAssurance / Math.pow(1 + tauxMensuelTest, m);
      }
      const diff = vp - this.montantEmprunte + this.fraisDossier;
      if (Math.abs(diff) < 0.01) break;
      taeg += diff > 0 ? 0.001 : -0.001;
    }

    return Math.round(taeg * 10000) / 100;
  }

  genererAmortissement(): void {
    this.amortissement = [];
    let capitalRestant = this.montantEmprunte;
    const tauxMensuel = this.tauxAnnuel / 100 / 12;

    for (let mois = 1; mois <= this.dureeMois; mois++) {
      const interetsMois = capitalRestant * tauxMensuel;
      const capitalMois = this.mensualiteHorsAssurance - interetsMois;
      capitalRestant = Math.max(0, capitalRestant - capitalMois);

      this.amortissement.push({
        mois: mois,
        mensualite: this.mensualiteHorsAssurance,
        capital: Math.round(capitalMois * 100) / 100,
        interets: Math.round(interetsMois * 100) / 100,
        assurance: this.assuranceMensuelle,
        capitalRestant: Math.round(capitalRestant * 100) / 100
      });
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }).format(value);
  }
}
