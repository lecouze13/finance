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
  selector: 'app-simulateur-credit-relais',
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
  templateUrl: './simulateur-credit-relais.component.html',
  styleUrls: ['./simulateur-credit-relais.component.scss']
})
export class SimulateurCreditRelaisComponent implements OnInit {
  // Bien à vendre
  valeurBienVendre: number = 350000;
  capitalRestantDu: number = 120000;
  estimationBasse: number = 320000;
  estimationHaute: number = 380000;

  // Nouveau bien
  prixNouveauBien: number = 450000;
  fraisNotaire: number = 8;
  apportPersonnel: number = 50000;

  // Crédit relais
  quotiteFinancement: number = 70;
  tauxRelais: number = 4.5;
  dureeRelais: number = 12;
  fraisDossier: number = 500;

  // Crédit complémentaire
  tauxComplementaire: number = 3.8;
  dureeComplementaire: number = 20;

  // Résultats
  montantRelais: number = 0;
  interetsRelais: number = 0;
  mensualiteRelais: number = 0;
  montantComplementaire: number = 0;
  mensualiteComplementaire: number = 0;
  coutTotalOperation: number = 0;
  tresorerieDisponible: number = 0;
  risqueNegatif: boolean = false;
  scenarioOptimiste: any = {};
  scenarioPessimiste: any = {};

  dureeRelaisOptions = [
    { label: '6 mois', value: 6 },
    { label: '12 mois', value: 12 },
    { label: '18 mois', value: 18 },
    { label: '24 mois', value: 24 }
  ];

  quotiteOptions = [
    { label: '60%', value: 60 },
    { label: '70%', value: 70 },
    { label: '80%', value: 80 }
  ];

  faqItems: FaqItem[] = [
    {
      question: "Qu'est-ce qu'un crédit relais et comment fonctionne-t-il ?",
      answer: "Le crédit relais (ou prêt relais) est un financement à court terme qui permet d'acheter un nouveau bien immobilier avant d'avoir vendu le précédent. La banque avance généralement 60 à 80% de la valeur estimée du bien à vendre. Ce montant sert d'apport pour le nouvel achat. Une fois l'ancien bien vendu, vous remboursez le crédit relais avec le produit de la vente."
    },
    {
      question: "Quelle est la quotité de financement d'un crédit relais ?",
      answer: "La quotité représente le pourcentage de la valeur du bien que la banque accepte de financer en relais. Elle varie généralement entre 60% et 80% de la valeur estimée. Les banques sont prudentes car le prix de vente final peut être inférieur à l'estimation. Une quotité de 70% est courante, permettant une marge de sécurité de 30%."
    },
    {
      question: "Quels sont les différents types de crédit relais ?",
      answer: "Il existe 3 types : le relais sec (uniquement le montant avancé sur le bien à vendre), le relais adossé (combiné avec un prêt amortissable pour la différence), et le relais avec franchise totale (vous ne payez les intérêts qu'à la vente). Le relais adossé est le plus courant car il permet de financer l'écart entre les deux biens."
    },
    {
      question: "Combien coûte un crédit relais ?",
      answer: "Le crédit relais a un coût composé de : intérêts (taux souvent 0.5 à 1% supérieur au taux immobilier classique), frais de dossier (500 à 1500€), frais de garantie, et assurance emprunteur. Les intérêts peuvent être payés mensuellement ou capitalisés (ajoutés au capital à rembourser). Le coût total dépend de la durée avant la vente."
    },
    {
      question: "Quelle est la durée maximale d'un crédit relais ?",
      answer: "La durée initiale est généralement de 12 à 24 mois. Certaines banques proposent une prolongation de 12 mois supplémentaires si le bien n'est pas vendu. Au-delà, la situation devient critique : vous devrez peut-être baisser le prix de vente ou transformer le relais en prêt classique avec deux mensualités à payer."
    },
    {
      question: "Que se passe-t-il si je ne vends pas dans les délais ?",
      answer: "Si le bien n'est pas vendu à l'échéance, plusieurs options : prolongation du relais (frais supplémentaires), transformation en prêt classique (double mensualité), ou vente au rabais pour solder rapidement. C'est le principal risque du crédit relais. Il est conseillé de commencer à vendre activement dès la signature du compromis d'achat."
    },
    {
      question: "Le crédit relais est-il adapté à ma situation ?",
      answer: "Le crédit relais convient si : votre bien est facilement vendable (bon emplacement, prix réaliste), vous avez une marge financière pour absorber d'éventuels retards, le marché immobilier local est dynamique. Il est déconseillé dans un marché baissier, pour des biens atypiques difficiles à vendre, ou si vos finances sont tendues."
    },
    {
      question: "Comment calculer la mensualité d'un crédit relais ?",
      answer: "En franchise partielle, vous payez uniquement les intérêts mensuels : Mensualité = (Montant relais × Taux annuel) / 12. Par exemple, pour 200 000€ à 4%, la mensualité est de 667€/mois. En franchise totale, les intérêts s'accumulent et sont réglés à la vente. Le capital est remboursé intégralement lors de la vente."
    },
    {
      question: "Puis-je cumuler crédit relais et prêt immobilier classique ?",
      answer: "Oui, c'est même la configuration la plus courante (relais adossé). Le crédit relais couvre une partie de l'apport, et un prêt amortissable classique finance le reste. Pendant la période relais, vous payez les intérêts du relais + la mensualité du prêt principal. Après la vente, seul le prêt classique reste."
    },
    {
      question: "Quelles garanties demande la banque pour un crédit relais ?",
      answer: "Les garanties incluent : hypothèque sur le bien à vendre (garantie principale), caution ou hypothèque sur le nouveau bien, assurance emprunteur, et parfois un mandat de vente exclusif. La banque vérifie aussi votre capacité à assumer les deux charges en cas de non-vente prolongée."
    }
  ];

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetaData({
      title: 'Simulateur Crédit Relais 2025 | Calculez votre Prêt Pont',
      description: 'Simulez gratuitement votre crédit relais immobilier. Calculez le montant, les intérêts et les mensualités pour acheter avant de vendre votre bien actuel.',
      url: 'https://calculateurfinance.fr/simulateur-credit-relais'
    });
    this.calculer();
  }

  calculer(): void {
    const fraisNotaireEuros = this.prixNouveauBien * (this.fraisNotaire / 100);
    const coutTotalNouveauBien = this.prixNouveauBien + fraisNotaireEuros;

    // Montant du crédit relais (basé sur la valeur du bien à vendre)
    this.montantRelais = (this.valeurBienVendre * this.quotiteFinancement / 100) - this.capitalRestantDu;
    if (this.montantRelais < 0) this.montantRelais = 0;

    // Intérêts du relais (franchise partielle - on paie les intérêts mensuellement)
    const tauxMensuelRelais = this.tauxRelais / 100 / 12;
    this.mensualiteRelais = this.montantRelais * tauxMensuelRelais;
    this.interetsRelais = this.mensualiteRelais * this.dureeRelais;

    // Montant du crédit complémentaire
    this.montantComplementaire = coutTotalNouveauBien - this.montantRelais - this.apportPersonnel;
    if (this.montantComplementaire < 0) this.montantComplementaire = 0;

    // Mensualité du crédit complémentaire
    const tauxMensuelComp = this.tauxComplementaire / 100 / 12;
    const nombreMensualitesComp = this.dureeComplementaire * 12;
    if (tauxMensuelComp > 0 && this.montantComplementaire > 0) {
      this.mensualiteComplementaire = this.montantComplementaire *
        (tauxMensuelComp * Math.pow(1 + tauxMensuelComp, nombreMensualitesComp)) /
        (Math.pow(1 + tauxMensuelComp, nombreMensualitesComp) - 1);
    } else {
      this.mensualiteComplementaire = this.montantComplementaire / nombreMensualitesComp;
    }

    // Trésorerie après vente (estimation moyenne)
    const prixVenteMoyen = (this.estimationBasse + this.estimationHaute) / 2;
    this.tresorerieDisponible = prixVenteMoyen - this.capitalRestantDu - this.montantRelais;

    // Coût total de l'opération
    this.coutTotalOperation = this.interetsRelais + this.fraisDossier + fraisNotaireEuros;

    // Scénario optimiste (vente au prix haut)
    this.scenarioOptimiste = {
      prixVente: this.estimationHaute,
      tresorerie: this.estimationHaute - this.capitalRestantDu - this.montantRelais,
      benefice: this.estimationHaute - this.capitalRestantDu - this.montantRelais - this.interetsRelais
    };

    // Scénario pessimiste (vente au prix bas)
    this.scenarioPessimiste = {
      prixVente: this.estimationBasse,
      tresorerie: this.estimationBasse - this.capitalRestantDu - this.montantRelais,
      risque: this.estimationBasse < (this.capitalRestantDu + this.montantRelais)
    };

    this.risqueNegatif = this.scenarioPessimiste.risque;

    // Arrondir
    this.montantRelais = Math.round(this.montantRelais);
    this.interetsRelais = Math.round(this.interetsRelais);
    this.mensualiteRelais = Math.round(this.mensualiteRelais);
    this.montantComplementaire = Math.round(this.montantComplementaire);
    this.mensualiteComplementaire = Math.round(this.mensualiteComplementaire);
    this.coutTotalOperation = Math.round(this.coutTotalOperation);
    this.tresorerieDisponible = Math.round(this.tresorerieDisponible);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  }
}
