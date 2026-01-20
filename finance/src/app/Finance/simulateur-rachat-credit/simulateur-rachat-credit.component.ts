import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { FaqItem } from '../../shared/faq-section/faq-section.component';

interface Credit {
  nom: string;
  capitalRestant: number;
  mensualite: number;
  tauxActuel: number;
  dureeMoisRestante: number;
}

@Component({
  selector: 'app-simulateur-rachat-credit',
  templateUrl: './simulateur-rachat-credit.component.html',
  styleUrls: ['./simulateur-rachat-credit.component.scss'],
  standalone: false
})
export class SimulateurRachatCreditComponent implements OnInit {
  // Crédits actuels
  credits: Credit[] = [
    { nom: 'Crédit immobilier', capitalRestant: 150000, mensualite: 850, tauxActuel: 4.2, dureeMoisRestante: 180 },
    { nom: 'Crédit auto', capitalRestant: 8000, mensualite: 250, tauxActuel: 6.5, dureeMoisRestante: 36 }
  ];

  // Paramètres rachat
  nouveauTaux: number = 3.2;
  nouvelleDuree: number = 20;
  fraisRachat: number = 1;
  fraisDossier: number = 500;
  indemniteRemboursement: number = 3;

  // Résultats
  totalCapitalActuel: number = 0;
  totalMensualiteActuelle: number = 0;
  coutTotalActuel: number = 0;
  nouvelleMensualite: number = 0;
  coutTotalRachat: number = 0;
  economie: number = 0;
  fraisTotaux: number = 0;
  economieNette: number = 0;
  seuilRentabilite: number = 0;
  isRentable: boolean = false;

  dureeOptions = [
    { label: '10 ans', value: 10 },
    { label: '15 ans', value: 15 },
    { label: '20 ans', value: 20 },
    { label: '25 ans', value: 25 }
  ];

  faqItems: FaqItem[] = [
    {
      question: "Qu'est-ce que le rachat de crédit et comment ça fonctionne ?",
      answer: "Le rachat de crédit (ou regroupement de crédits) consiste à faire racheter un ou plusieurs crédits existants par un nouvel établissement financier. Vous obtenez un nouveau prêt unique, souvent à un taux plus avantageux ou sur une durée différente. L'objectif est de réduire vos mensualités et/ou le coût total de vos crédits."
    },
    {
      question: "Quand est-il intéressant de faire un rachat de crédit ?",
      answer: "Un rachat est intéressant quand : les taux actuels sont inférieurs d'au moins 0.7-1% à votre taux actuel, il vous reste plus de la moitié de la durée à rembourser, vous avez plusieurs crédits à regrouper, ou vous avez besoin de réduire vos mensualités. Le gain doit couvrir les frais de rachat."
    },
    {
      question: "Quels sont les frais liés au rachat de crédit ?",
      answer: "Les frais comprennent : les indemnités de remboursement anticipé (IRA, max 3% du capital ou 6 mois d'intérêts), les frais de dossier de la nouvelle banque (500-1500€), les frais de garantie (hypothèque ou caution), et éventuellement les frais de courtage. Ces frais doivent être inférieurs aux économies réalisées."
    },
    {
      question: "Comment calculer les indemnités de remboursement anticipé (IRA) ?",
      answer: "Les IRA sont plafonnées par la loi : maximum 3% du capital restant dû OU 6 mois d'intérêts au taux du prêt. C'est le montant le plus faible qui s'applique. Pour un prêt immobilier de 100 000€ à 4%, les IRA seraient max 2 000€ (6 mois d'intérêts) ou 3 000€ (3% du capital)."
    },
    {
      question: "Peut-on racheter tous types de crédits ?",
      answer: "Oui, le rachat peut inclure : crédit immobilier, crédit auto, crédit à la consommation, crédit revolving, prêt personnel. On peut aussi inclure des dettes diverses (découvert, retard d'impôts). Le regroupement permet d'avoir une seule mensualité pour tous ces engagements."
    },
    {
      question: "Quelle est la différence entre rachat et renégociation de crédit ?",
      answer: "La renégociation se fait avec votre banque actuelle qui accepte de modifier les conditions de votre prêt. Le rachat implique un nouvel établissement qui rembourse vos anciens prêts. La renégociation a moins de frais mais la banque peut refuser. Le rachat donne plus de marge de négociation."
    },
    {
      question: "Le rachat de crédit allonge-t-il la durée de remboursement ?",
      answer: "Pas nécessairement. Vous pouvez choisir de garder la même durée avec une mensualité réduite, ou de réduire la durée avec la même mensualité. Allonger la durée réduit les mensualités mais augmente le coût total. C'est un arbitrage entre confort mensuel et coût global."
    },
    {
      question: "Quel impact sur mon taux d'endettement ?",
      answer: "Le rachat peut significativement réduire votre taux d'endettement en diminuant vos mensualités. C'est particulièrement utile si vous approchez les 35% d'endettement et souhaitez réaliser un nouveau projet. Une mensualité unique facilite aussi la gestion du budget."
    },
    {
      question: "Puis-je inclure une trésorerie dans mon rachat de crédit ?",
      answer: "Oui, le rachat de crédit peut inclure une trésorerie supplémentaire pour financer un projet (travaux, achat véhicule, etc.). Cette somme s'ajoute au capital racheté. Attention, cela augmente le montant total emprunté et donc le coût du crédit."
    },
    {
      question: "Combien de temps faut-il pour amortir les frais de rachat ?",
      answer: "Le seuil de rentabilité est le nombre de mois nécessaire pour que les économies de mensualités couvrent les frais de rachat. Généralement, un rachat est considéré rentable si ce seuil est atteint dans les 2-3 premières années. Au-delà, c'est du gain net."
    }
  ];

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Simulateur Rachat de Crédit 2026 | Calculez vos Économies');
    this.meta.updateTag({
      name: 'description',
      content: 'Simulez gratuitement votre rachat de crédit. Calculez les économies potentielles en regroupant vos crédits immobilier, auto et consommation à un meilleur taux.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'rachat crédit, regroupement crédits, simulation rachat, renégociation prêt, économies crédit, taux rachat 2026'
    });
    this.calculer();
  }

  ajouterCredit(): void {
    this.credits.push({
      nom: `Crédit ${this.credits.length + 1}`,
      capitalRestant: 10000,
      mensualite: 200,
      tauxActuel: 5,
      dureeMoisRestante: 48
    });
    this.calculer();
  }

  supprimerCredit(index: number): void {
    if (this.credits.length > 1) {
      this.credits.splice(index, 1);
      this.calculer();
    }
  }

  calculer(): void {
    // Calcul situation actuelle
    this.totalCapitalActuel = this.credits.reduce((sum, c) => sum + c.capitalRestant, 0);
    this.totalMensualiteActuelle = this.credits.reduce((sum, c) => sum + c.mensualite, 0);

    // Coût total restant sur les crédits actuels
    this.coutTotalActuel = this.credits.reduce((sum, c) => sum + (c.mensualite * c.dureeMoisRestante), 0);

    // Calcul des frais
    const ira = (this.totalCapitalActuel * this.indemniteRemboursement) / 100;
    const fraisGarantie = (this.totalCapitalActuel * this.fraisRachat) / 100;
    this.fraisTotaux = ira + fraisGarantie + this.fraisDossier;

    // Capital à refinancer (capital restant + frais)
    const capitalRefinance = this.totalCapitalActuel + this.fraisTotaux;

    // Nouvelle mensualité
    const tauxMensuel = this.nouveauTaux / 100 / 12;
    const nombreMensualites = this.nouvelleDuree * 12;

    if (tauxMensuel > 0) {
      this.nouvelleMensualite = capitalRefinance *
        (tauxMensuel * Math.pow(1 + tauxMensuel, nombreMensualites)) /
        (Math.pow(1 + tauxMensuel, nombreMensualites) - 1);
    } else {
      this.nouvelleMensualite = capitalRefinance / nombreMensualites;
    }

    // Coût total du nouveau crédit
    this.coutTotalRachat = this.nouvelleMensualite * nombreMensualites;

    // Économie brute (différence des coûts totaux)
    this.economie = this.coutTotalActuel - this.coutTotalRachat;

    // Économie nette (après frais)
    this.economieNette = this.economie;

    // Seuil de rentabilité (en mois)
    const economieMensuelle = this.totalMensualiteActuelle - this.nouvelleMensualite;
    if (economieMensuelle > 0) {
      this.seuilRentabilite = Math.ceil(this.fraisTotaux / economieMensuelle);
    } else {
      this.seuilRentabilite = 999;
    }

    this.isRentable = this.economieNette > 0 && this.seuilRentabilite < 36;

    // Arrondir
    this.nouvelleMensualite = Math.round(this.nouvelleMensualite);
    this.coutTotalRachat = Math.round(this.coutTotalRachat);
    this.economie = Math.round(this.economie);
    this.fraisTotaux = Math.round(this.fraisTotaux);
    this.economieNette = Math.round(this.economieNette);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  }
}
