import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../Constructor/service/seo.service';
import { FaqItem } from '../../shared/faq-section/faq-section.component';

@Component({
  selector: 'app-simulateur-succession',
  templateUrl: './simulateur-succession.component.html',
  styleUrls: ['./simulateur-succession.component.scss']
})
export class SimulateurSuccessionComponent implements OnInit {

  faqItems: FaqItem[] = [
    {
      question: "Comment sont calculés les droits de succession en France ?",
      answer: "Les droits de succession sont calculés sur la part nette revenant à chaque héritier, après déduction d'un abattement selon le lien de parenté. Un barème progressif s'applique ensuite, allant de 5% à 45% en ligne directe."
    },
    {
      question: "Quel est l'abattement pour les enfants en 2026 ?",
      answer: "Chaque enfant bénéficie d'un abattement de 100 000 euros sur la part héritée de chaque parent. Cet abattement se reconstitue tous les 15 ans pour les donations."
    },
    {
      question: "Les conjoints payent-ils des droits de succession ?",
      answer: "Non, depuis 2007, le conjoint survivant (marié ou pacsé) est totalement exonéré de droits de succession, quelle que soit la valeur du patrimoine transmis."
    },
    {
      question: "Quels sont les abattements pour les frères et soeurs ?",
      answer: "Les frères et soeurs bénéficient d'un abattement de 15 932 euros. Sous certaines conditions (célibataire, veuf, âgé de plus de 50 ans ou infirme, ayant vécu avec le défunt), ils peuvent être totalement exonérés."
    },
    {
      question: "Comment réduire les droits de succession ?",
      answer: "Plusieurs stratégies existent : donations anticipées (abattement renouvelable tous les 15 ans), assurance-vie (abattement de 152 500 euros), démembrement de propriété, ou pacte Dutreil pour les entreprises."
    },
    {
      question: "Qu'est-ce que le barème des droits de succession en ligne directe ?",
      answer: "Le barème 2026 en ligne directe (parents-enfants) : 5% jusqu'à 8 072 euros, 10% de 8 072 à 12 109 euros, 15% jusqu'à 15 932 euros, 20% jusqu'à 552 324 euros, 30% jusqu'à 902 838 euros, 40% jusqu'à 1 805 677 euros, et 45% au-delà."
    },
    {
      question: "Les petits-enfants ont-ils un abattement spécifique ?",
      answer: "Oui, les petits-enfants bénéficient d'un abattement de 1 594 euros en cas de succession (représentation d'un parent prédécédé) ou de 31 865 euros en cas de donation directe."
    },
    {
      question: "Comment est calculée la valeur du patrimoine pour la succession ?",
      answer: "Le patrimoine est évalué à sa valeur vénale au jour du décès. Les dettes du défunt (emprunts, impôts dus, frais funéraires) sont déduites pour obtenir l'actif net successoral."
    },
    {
      question: "Peut-on payer les droits de succession en plusieurs fois ?",
      answer: "Oui, un paiement fractionné est possible sur 1 an (ou 3 ans si plus de 50% de l'actif est composé de biens non liquides). Un paiement différé est aussi possible pour la nue-propriété."
    },
    {
      question: "Quel est le délai pour déposer la déclaration de succession ?",
      answer: "La déclaration doit être déposée dans les 6 mois suivant le décès (12 mois si le décès a eu lieu hors de France métropolitaine). Un retard entraîne des pénalités de 0,40% par mois."
    }
  ];

  liensParente = [
    { label: 'Enfant / Parent', value: 'enfant' },
    { label: 'Petit-enfant', value: 'petitEnfant' },
    { label: 'Frère / Soeur', value: 'frere' },
    { label: 'Neveu / Nièce', value: 'neveu' },
    { label: 'Autre (non parent)', value: 'autre' }
  ];

  montantSuccession: number | null = null;
  lienParente: string = 'enfant';
  nbHeritiers: number = 1;
  dettes: number = 0;

  resultat: {
    partBrute: number;
    abattement: number;
    partTaxable: number;
    droitsSuccession: number;
    partNette: number;
    tauxEffectif: number;
  } | null = null;

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Simulateur Droits de Succession 2026 | Calcul Gratuit | CalculateurFinance.fr',
      description: 'Calculez les droits de succession selon le lien de parenté avec le défunt. Simulateur gratuit avec abattements, barèmes 2026 et optimisation fiscale.',
      url: 'https://calculateurfinance.fr/simulateur-droits-succession/',
      keywords: 'droits de succession 2026, calcul succession, abattement succession, barème succession, héritage impôts, transmission patrimoine, donation succession, frais succession France'
    });
  }

  calculer(): void {
    if (!this.montantSuccession || this.nbHeritiers < 1) {
      return;
    }

    const actifNet = Math.max(0, this.montantSuccession - this.dettes);
    const partBrute = actifNet / this.nbHeritiers;

    const abattement = this.getAbattement();
    const partTaxable = Math.max(0, partBrute - abattement);
    const droitsSuccession = this.calculerDroits(partTaxable);

    const partNette = partBrute - droitsSuccession;
    const tauxEffectif = partBrute > 0 ? (droitsSuccession / partBrute) * 100 : 0;

    this.resultat = {
      partBrute: Math.round(partBrute),
      abattement,
      partTaxable: Math.round(partTaxable),
      droitsSuccession: Math.round(droitsSuccession),
      partNette: Math.round(partNette),
      tauxEffectif: Math.round(tauxEffectif * 100) / 100
    };
  }

  private getAbattement(): number {
    const abattements: { [key: string]: number } = {
      enfant: 100000,
      petitEnfant: 1594,
      frere: 15932,
      neveu: 7967,
      autre: 1594
    };
    return abattements[this.lienParente] || 0;
  }

  private calculerDroits(montantTaxable: number): number {
    if (this.lienParente === 'enfant') {
      // Barème ligne directe
      const tranches = [
        { plafond: 8072, taux: 0.05 },
        { plafond: 12109, taux: 0.10 },
        { plafond: 15932, taux: 0.15 },
        { plafond: 552324, taux: 0.20 },
        { plafond: 902838, taux: 0.30 },
        { plafond: 1805677, taux: 0.40 },
        { plafond: Infinity, taux: 0.45 }
      ];

      let droits = 0;
      let precedent = 0;
      for (const tranche of tranches) {
        if (montantTaxable > tranche.plafond) {
          droits += (tranche.plafond - precedent) * tranche.taux;
          precedent = tranche.plafond;
        } else {
          droits += (montantTaxable - precedent) * tranche.taux;
          break;
        }
      }
      return droits;
    } else if (this.lienParente === 'petitEnfant') {
      // Même barème que ligne directe
      return this.calculerDroitsLigneDirecte(montantTaxable);
    } else if (this.lienParente === 'frere') {
      // Barème frères/soeurs
      if (montantTaxable <= 24430) {
        return montantTaxable * 0.35;
      }
      return 24430 * 0.35 + (montantTaxable - 24430) * 0.45;
    } else if (this.lienParente === 'neveu') {
      return montantTaxable * 0.55;
    } else {
      return montantTaxable * 0.60;
    }
  }

  private calculerDroitsLigneDirecte(montantTaxable: number): number {
    const tranches = [
      { plafond: 8072, taux: 0.05 },
      { plafond: 12109, taux: 0.10 },
      { plafond: 15932, taux: 0.15 },
      { plafond: 552324, taux: 0.20 },
      { plafond: 902838, taux: 0.30 },
      { plafond: 1805677, taux: 0.40 },
      { plafond: Infinity, taux: 0.45 }
    ];

    let droits = 0;
    let precedent = 0;
    for (const tranche of tranches) {
      if (montantTaxable > tranche.plafond) {
        droits += (tranche.plafond - precedent) * tranche.taux;
        precedent = tranche.plafond;
      } else {
        droits += (montantTaxable - precedent) * tranche.taux;
        break;
      }
    }
    return droits;
  }
}
