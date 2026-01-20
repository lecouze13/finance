import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../Constructor/service/seo.service';
import { FaqItem } from '../../shared/faq-section/faq-section.component';
import { ExportData } from '../../shared/services/export.service';

@Component({
  selector: 'app-calcul-notaire',
  templateUrl: './calcul-notaire.component.html',
  standalone: false
})
export class CalculNotaireComponent implements OnInit {
  // Paramètres d'entrée
  prixBien: number = 250000;
  typeBien: string = 'ancien';
  departement: string = 'standard';

  // Résultats détaillés
  droitsMutation: number = 0;
  emolumentsNotaire: number = 0;
  debours: number = 0;
  contributionSecurite: number = 0;
  fraisHypotheque: number = 0;
  totalFrais: number = 0;
  prixTotal: number = 0;
  pourcentageFrais: number = 0;

  typesBien = [
    { label: 'Bien ancien', value: 'ancien' },
    { label: 'Bien neuf (VEFA)', value: 'neuf' },
    { label: 'Terrain à bâtir', value: 'terrain' }
  ];

  departements = [
    { label: 'Taux standard (5,81%)', value: 'standard' },
    { label: 'Indre, Isère, Morbihan, Mayotte (5,11%)', value: 'reduit' }
  ];

  faqItems: FaqItem[] = [
    {
      question: "Quels sont les frais de notaire pour un achat immobilier neuf ?",
      answer: "Les frais de notaire pour un bien neuf (VEFA) sont réduits, entre 2% et 3% du prix d'achat. Vous payez la TVA sur le prix du bien mais les droits de mutation sont plus faibles (0,715% au lieu de 5,81%)."
    },
    {
      question: "Comment sont calculés les frais de notaire dans l'ancien ?",
      answer: "Les frais dans l'ancien représentent 7-8% du prix. Ils comprennent : les droits de mutation (5,81%), les émoluments du notaire (barème dégressif), les débours (environ 1 000-1 500€), et la contribution de sécurité immobilière (0,10%)."
    },
    {
      question: "Peut-on négocier les frais de notaire ?",
      answer: "Les droits de mutation et taxes sont fixes. Seuls les émoluments du notaire sont négociables (remise max de 20% sur la part au-delà de 100 000€). La marge de négociation reste limitée car 80% des frais sont des taxes."
    },
    {
      question: "Les frais de notaire sont-ils les mêmes dans tous les départements ?",
      answer: "Non, les droits de mutation varient légèrement. La plupart des départements appliquent le taux de 5,81%, mais l'Indre, l'Isère, le Morbihan et Mayotte appliquent un taux réduit de 5,11%."
    },
    {
      question: "Comment sont répartis les frais de notaire ?",
      answer: "Sur 100€ de frais : environ 80€ vont à l'État et aux collectivités (droits de mutation), 10€ aux émoluments du notaire, 10€ aux débours et formalités. Le notaire ne garde donc qu'une petite partie."
    },
    {
      question: "Les frais de notaire sont-ils déductibles des impôts ?",
      answer: "Pour un investissement locatif, les frais de notaire peuvent être intégrés au prix d'acquisition pour le calcul de la plus-value. En LMNP, ils peuvent être amortis. Pour une résidence principale, ils ne sont pas déductibles."
    },
    {
      question: "Quand faut-il payer les frais de notaire ?",
      answer: "Les frais sont payés le jour de la signature de l'acte authentique de vente. Ils sont versés au notaire qui se charge de les reverser aux différentes administrations."
    },
    {
      question: "Le montant des frais de notaire inclut-il les frais d'agence ?",
      answer: "Non, les frais d'agence immobilière sont distincts. Si le prix est \"frais d'agence inclus\", les frais de notaire sont calculés sur ce prix global. Sinon, ils sont calculés sur le prix net vendeur."
    },
    {
      question: "Comment réduire les frais de notaire ?",
      answer: "Achetez dans le neuf (2-3% au lieu de 7-8%), déduisez la valeur du mobilier du prix (si justifié), ou achetez les parts d'une SCI plutôt que le bien directement (droits réduits à 5% + négociables)."
    },
    {
      question: "Les frais de notaire sont-ils remboursables en cas d'annulation ?",
      answer: "Si la vente n'aboutit pas, les émoluments ne sont pas dus (acte non rédigé). Les débours engagés (état hypothécaire, diagnostics) peuvent rester à votre charge. Les arrhes du compromis suivent leurs propres règles."
    }
  ];

  constructor(
    private seo: SeoService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Simulateur Frais de Notaire 2026 | Calcul Précis Neuf et Ancien',
      description: 'Calculez précisément vos frais de notaire pour un achat immobilier. Détail des droits de mutation, émoluments, débours. Ancien, neuf ou terrain.',
      keywords: 'frais de notaire, simulateur notaire, calcul frais acquisition, droits de mutation, émoluments notaire, achat immobilier, VEFA, terrain',
      url: 'https://calculateurfinance.fr/calcul-frais-de-notaire/',
    });

   this.seo.addSoftwareApplicationSchema({
      name: 'Simulateur Frais de Notaire',
      description: 'Calculez les frais de notaire pour votre achat immobilier (ancien, neuf, VEFA, terrain).',
      url: 'https://calculateurfinance.fr/calcul-frais-de-notaire/',
      applicationCategory: 'FinanceApplication',
      featureList: ['Frais notaire ancien', 'Frais notaire neuf', 'VEFA', 'Droits de mutation'],
    });
    this.calculer();
  }

  calculer(): void {
    // Taux de droits de mutation selon le type de bien et le département
    let tauxDroitsMutation: number;

    if (this.typeBien === 'neuf') {
      tauxDroitsMutation = 0.00715; // 0,715% pour le neuf
    } else {
      // Ancien ou terrain
      tauxDroitsMutation = this.departement === 'reduit' ? 0.0511 : 0.0581;
    }

    // Calcul des droits de mutation
    this.droitsMutation = Math.round(this.prixBien * tauxDroitsMutation);

    // Calcul des émoluments du notaire (barème 2026)
    this.emolumentsNotaire = this.calculerEmoluments(this.prixBien);

    // Contribution de sécurité immobilière (0,10%)
    this.contributionSecurite = Math.round(this.prixBien * 0.001);

    // Débours (frais avancés par le notaire)
    // Environ 1 000 à 1 500€ selon la complexité
    this.debours = Math.round(800 + this.prixBien * 0.002);
    if (this.debours > 2000) this.debours = 2000;
    if (this.debours < 800) this.debours = 800;

    // Total des frais
    this.totalFrais = this.droitsMutation + this.emolumentsNotaire + this.contributionSecurite + this.debours;

    // Prix total acquisition
    this.prixTotal = this.prixBien + this.totalFrais;

    // Pourcentage des frais
    this.pourcentageFrais = (this.totalFrais / this.prixBien) * 100;
  }

  calculerEmoluments(prix: number): number {
    // Barème des émoluments 2026 (TTC avec TVA à 20%)
    let emoluments = 0;

    if (prix <= 6500) {
      emoluments = prix * 0.03945;
    } else if (prix <= 17000) {
      emoluments = 6500 * 0.03945 + (prix - 6500) * 0.01627;
    } else if (prix <= 60000) {
      emoluments = 6500 * 0.03945 + (17000 - 6500) * 0.01627 + (prix - 17000) * 0.01085;
    } else {
      emoluments = 6500 * 0.03945 + (17000 - 6500) * 0.01627 + (60000 - 17000) * 0.01085 + (prix - 60000) * 0.00814;
    }

    return Math.round(emoluments);
  }

  getTypeBienLabel(): string {
    const type = this.typesBien.find(t => t.value === this.typeBien);
    return type ? type.label : '';
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  }

  getExportData(): ExportData {
    return {
      title: 'Simulation Frais de Notaire',
      subtitle: `Achat ${this.getTypeBienLabel()} à ${this.formatCurrency(this.prixBien)}`,
      date: new Date(),
      sections: [
        {
          title: 'Informations du bien',
          rows: [
            { label: 'Prix du bien', value: this.prixBien, type: 'currency' },
            { label: 'Type de bien', value: this.getTypeBienLabel(), type: 'text' },
            { label: 'Département', value: this.departement === 'reduit' ? 'Taux réduit (5,11%)' : 'Taux standard (5,81%)', type: 'text' }
          ]
        },
        {
          title: 'Détail des frais',
          rows: [
            { label: 'Droits de mutation', value: this.droitsMutation, type: 'currency' },
            { label: 'Émoluments du notaire', value: this.emolumentsNotaire, type: 'currency' },
            { label: 'Contribution sécurité immobilière', value: this.contributionSecurite, type: 'currency' },
            { label: 'Débours et formalités', value: this.debours, type: 'currency' }
          ]
        },
        {
          title: 'Récapitulatif',
          rows: [
            { label: 'Total frais de notaire', value: this.totalFrais, type: 'currency', highlight: true },
            { label: 'Pourcentage du prix', value: this.pourcentageFrais, type: 'percent' },
            { label: 'Prix total acquisition', value: this.prixTotal, type: 'currency', highlight: true }
          ]
        }
      ]
    };
  }
}
