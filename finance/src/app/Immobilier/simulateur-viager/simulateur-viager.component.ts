import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../Constructor/service/seo.service';
import { FaqItem } from '../../shared/faq-section/faq-section.component';

@Component({
  selector: 'app-simulateur-viager',
  templateUrl: './simulateur-viager.component.html',
  styleUrls: ['./simulateur-viager.component.scss']
})
export class SimulateurViagerComponent implements OnInit {

  faqItems: FaqItem[] = [
    {
      question: "Qu'est-ce qu'un viager immobilier ?",
      answer: "Le viager est une vente immobiliere ou l'acheteur (debirentier) verse un capital initial (bouquet) puis une rente mensuelle au vendeur (credirentier) jusqu'a son deces. Le vendeur peut conserver l'usage du bien (viager occupe) ou non (viager libre)."
    },
    {
      question: "Comment est calcule le prix d'un viager ?",
      answer: "Le prix du viager depend de la valeur du bien, de l'age du vendeur (esperance de vie), du type de viager (occupe ou libre), et de la repartition entre bouquet et rente. Des tables de mortalite officielles sont utilisees pour le calcul."
    },
    {
      question: "Quelle est la difference entre viager occupe et viager libre ?",
      answer: "En viager occupe, le vendeur conserve le droit d'habiter le bien jusqu'a son deces (DUH). En viager libre, l'acheteur peut disposer immediatement du bien. Le viager libre est plus cher car il n'y a pas de decote d'occupation."
    },
    {
      question: "Qu'est-ce que le bouquet dans un viager ?",
      answer: "Le bouquet est la somme versee comptant lors de la signature de l'acte. Il represente generalement 20% a 30% de la valeur du bien. Plus le bouquet est eleve, plus la rente mensuelle sera faible."
    },
    {
      question: "Comment est calculee la rente viagere ?",
      answer: "La rente est calculee sur le capital restant (valeur du bien moins le bouquet et la decote d'occupation eventuelle), divise par l'esperance de vie du vendeur selon les tables INSEE, avec application d'un taux de rendement."
    },
    {
      question: "Le viager est-il un bon investissement ?",
      answer: "Le viager peut etre interessant si le vendeur decede rapidement, mais comporte un risque d'alea (Jeanne Calment a survecu 32 ans a son acheteur). C'est un investissement a long terme avec une rentabilite incertaine."
    },
    {
      question: "Quels sont les frais de notaire pour un viager ?",
      answer: "Les frais de notaire sont calcules sur la valeur totale du bien (pas seulement le bouquet), comme pour une vente classique : environ 7-8% dans l'ancien."
    },
    {
      question: "Le vendeur peut-il revaloriser la rente ?",
      answer: "Oui, la rente peut etre indexee sur l'indice des prix a la consommation (IPC) ou un autre indice prevu au contrat. La revalorisation protege le vendeur contre l'inflation."
    },
    {
      question: "Que se passe-t-il si l'acheteur decede avant le vendeur ?",
      answer: "Les heritiers de l'acheteur doivent continuer a payer la rente. S'ils ne peuvent pas, le vendeur peut recuperer son bien et conserver les sommes versees."
    },
    {
      question: "Comment est imposee la rente viagere ?",
      answer: "La rente est partiellement imposable selon l'age du vendeur au premier versement : 70% imposable avant 50 ans, 50% entre 50 et 59 ans, 40% entre 60 et 69 ans, 30% au-dela de 70 ans."
    }
  ];

  typesViager = [
    { label: 'Viager occupe (DUH)', value: 'occupe' },
    { label: 'Viager libre', value: 'libre' }
  ];

  sexes = [
    { label: 'Homme', value: 'homme' },
    { label: 'Femme', value: 'femme' }
  ];

  valeurBien: number | null = null;
  typeViager: string = 'occupe';
  ageVendeur: number = 75;
  sexeVendeur: string = 'femme';
  bouquetSouhaite: number | null = null;
  tauxRendement: number = 4;

  resultat: {
    valeurOccupation: number;
    capitalRente: number;
    esperanceVie: number;
    renteMensuelle: number;
    renteAnnuelle: number;
    coutTotal: number;
    coutEstimeReel: number;
    fraisNotaire: number;
  } | null = null;

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Simulateur Viager 2026 | Calcul Rente et Bouquet | CalculateurFinance.fr',
      description: 'Calculez le bouquet et la rente d\'un viager occupe ou libre. Simulateur gratuit avec esperance de vie, decote d\'occupation et estimation du cout total.',
      url: 'https://calculateurfinance.fr/simulateur-viager/',
      keywords: 'simulateur viager, calcul viager, rente viagere, bouquet viager, viager occupe, viager libre, investissement viager, achat viager, vente viager, esperance vie viager'
    });
  }

  calculer(): void {
    if (!this.valeurBien || !this.bouquetSouhaite || this.ageVendeur < 60) {
      return;
    }

    // Esperance de vie selon age et sexe (tables simplifiees INSEE)
    const esperanceVie = this.getEsperanceVie();

    // Decote d'occupation selon age (viager occupe uniquement)
    let valeurOccupation = 0;
    if (this.typeViager === 'occupe') {
      const tauxOccupation = this.getTauxOccupation();
      valeurOccupation = Math.round(this.valeurBien * tauxOccupation);
    }

    // Capital servant au calcul de la rente
    const capitalRente = this.valeurBien - this.bouquetSouhaite - valeurOccupation;

    // Calcul de la rente mensuelle
    const renteMensuelle = this.calculerRente(capitalRente, esperanceVie);
    const renteAnnuelle = renteMensuelle * 12;

    // Cout total estime (bouquet + rentes sur esperance de vie)
    const coutEstimeReel = this.bouquetSouhaite + (renteMensuelle * 12 * esperanceVie);

    // Frais de notaire (sur valeur totale du bien)
    const fraisNotaire = Math.round(this.valeurBien * 0.08);

    this.resultat = {
      valeurOccupation,
      capitalRente: Math.round(capitalRente),
      esperanceVie,
      renteMensuelle: Math.round(renteMensuelle),
      renteAnnuelle: Math.round(renteAnnuelle),
      coutTotal: Math.round(this.bouquetSouhaite + fraisNotaire),
      coutEstimeReel: Math.round(coutEstimeReel),
      fraisNotaire
    };
  }

  private getEsperanceVie(): number {
    // Tables simplifiees d'esperance de vie INSEE 2024
    const tablesHomme: { [age: number]: number } = {
      60: 23.0, 65: 19.2, 70: 15.6, 75: 12.3, 80: 9.3, 85: 6.7, 90: 4.6, 95: 3.0
    };
    const tablesFemme: { [age: number]: number } = {
      60: 27.2, 65: 22.9, 70: 18.7, 75: 14.8, 80: 11.2, 85: 8.0, 90: 5.4, 95: 3.5
    };

    const tables = this.sexeVendeur === 'homme' ? tablesHomme : tablesFemme;

    // Trouver l'age le plus proche
    const ages = Object.keys(tables).map(Number).sort((a, b) => a - b);
    let ageCle = ages[0];
    for (const age of ages) {
      if (age <= this.ageVendeur) {
        ageCle = age;
      }
    }

    // Interpolation lineaire si necessaire
    const esperanceBase = tables[ageCle];
    const ageProchain = ages.find(a => a > ageCle);
    if (ageProchain && this.ageVendeur > ageCle) {
      const esperanceProchain = tables[ageProchain];
      const ratio = (this.ageVendeur - ageCle) / (ageProchain - ageCle);
      return Math.round((esperanceBase - ratio * (esperanceBase - esperanceProchain)) * 10) / 10;
    }

    return esperanceBase;
  }

  private getTauxOccupation(): number {
    // Decote d'occupation selon l'age (taux usuels)
    if (this.ageVendeur < 65) return 0.50;
    if (this.ageVendeur < 70) return 0.45;
    if (this.ageVendeur < 75) return 0.40;
    if (this.ageVendeur < 80) return 0.35;
    if (this.ageVendeur < 85) return 0.30;
    if (this.ageVendeur < 90) return 0.20;
    return 0.10;
  }

  private calculerRente(capital: number, esperanceVie: number): number {
    if (capital <= 0 || esperanceVie <= 0) return 0;

    // Formule simplifiee : capital / (esperance en mois) avec taux de rendement
    const moisEsperance = esperanceVie * 12;
    const tauxMensuel = this.tauxRendement / 100 / 12;

    // Annuite constante avec taux
    const rente = capital * (tauxMensuel * Math.pow(1 + tauxMensuel, moisEsperance)) /
                  (Math.pow(1 + tauxMensuel, moisEsperance) - 1);

    return Math.max(0, rente);
  }
}
