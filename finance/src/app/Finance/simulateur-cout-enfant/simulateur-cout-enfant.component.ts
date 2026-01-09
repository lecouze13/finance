import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../Constructor/service/seo.service';
import { FaqItem } from '../../shared/faq-section/faq-section.component';

interface CoutCategorie {
  nom: string;
  mensuel: number;
  annuel: number;
}

@Component({
  selector: 'app-simulateur-cout-enfant',
  templateUrl: './simulateur-cout-enfant.component.html',
  styleUrls: ['./simulateur-cout-enfant.component.scss']
})
export class SimulateurCoutEnfantComponent implements OnInit {

  faqItems: FaqItem[] = [
    {
      question: "Combien coute un enfant par mois en France ?",
      answer: "En moyenne, un enfant coute entre 500 et 900 euros par mois selon l'age et le niveau de vie de la famille. Ce cout inclut l'alimentation, les vetements, la garde, les loisirs et l'education."
    },
    {
      question: "Quel est le cout total d'un enfant jusqu'a 18 ans ?",
      answer: "Selon l'INSEE, elever un enfant de la naissance a 18 ans coute en moyenne entre 180 000 et 250 000 euros, soit environ 10 000 a 14 000 euros par an."
    },
    {
      question: "Quels sont les principaux postes de depenses pour un enfant ?",
      answer: "Les postes principaux sont : la garde/creche (0-3 ans), l'alimentation, les vetements, la sante, les loisirs/activites, les fournitures scolaires, et le logement supplementaire."
    },
    {
      question: "Quelles aides financieres pour les familles avec enfants ?",
      answer: "Les principales aides sont : les allocations familiales (des 2 enfants), la PAJE (prime a la naissance et allocation de base), le complement de libre choix du mode de garde, et les aides au logement majorees."
    },
    {
      question: "Le cout d'un enfant augmente-t-il avec l'age ?",
      answer: "Oui, le cout augmente generalement avec l'age : les frais de garde diminuent mais l'alimentation, les vetements et les activites augmentent. L'adolescence et les etudes superieures sont les periodes les plus couteuses."
    },
    {
      question: "Comment reduire le cout d'un enfant ?",
      answer: "Plusieurs strategies : beneficier des aides CAF, acheter d'occasion (vetements, jouets), privilegier les activites gratuites, utiliser les bourses scolaires, et optimiser la fiscalite (part fiscale, credit d'impot garde)."
    },
    {
      question: "Quel impact fiscal d'avoir un enfant ?",
      answer: "Chaque enfant donne droit a une demi-part fiscale (part entiere a partir du 3eme), ce qui reduit l'impot sur le revenu. Il existe aussi des credits d'impot pour la garde d'enfants de moins de 6 ans."
    },
    {
      question: "Combien coute la garde d'un enfant en creche ?",
      answer: "Le cout d'une creche varie de 200 a 600 euros par mois apres aides CAF (PAJE et CMG). Le cout reel avant aides peut atteindre 1 500 a 2 000 euros mensuels."
    },
    {
      question: "Quel budget prevoir pour les etudes superieures ?",
      answer: "Les etudes superieures coutent en moyenne 8 000 a 15 000 euros par an (logement, transport, frais de scolarite). Les ecoles de commerce ou d'ingenieur peuvent depasser 15 000 euros de frais annuels."
    },
    {
      question: "Le deuxieme enfant coute-t-il moins cher ?",
      answer: "En general oui, grace a la reutilisation des equipements et vetements, aux economies d'echelle sur l'alimentation, et aux allocations familiales qui commencent au 2eme enfant."
    }
  ];

  tranches = [
    { label: '0-3 ans (Petite enfance)', value: '0-3' },
    { label: '3-6 ans (Maternelle)', value: '3-6' },
    { label: '6-11 ans (Primaire)', value: '6-11' },
    { label: '11-15 ans (College)', value: '11-15' },
    { label: '15-18 ans (Lycee)', value: '15-18' },
    { label: '18+ ans (Etudes superieures)', value: '18+' }
  ];

  niveauxVie = [
    { label: 'Modeste', value: 'modeste' },
    { label: 'Moyen', value: 'moyen' },
    { label: 'Aise', value: 'aise' }
  ];

  modesGarde = [
    { label: 'Creche collective', value: 'creche' },
    { label: 'Assistante maternelle', value: 'assmat' },
    { label: 'Garde a domicile', value: 'domicile' },
    { label: 'Parents / Famille', value: 'famille' },
    { label: 'Ecole (3+ ans)', value: 'ecole' }
  ];

  trancheAge: string = '0-3';
  niveauVie: string = 'moyen';
  modeGarde: string = 'creche';
  nbEnfants: number = 1;

  resultat: {
    coutMensuelTotal: number;
    coutAnnuelTotal: number;
    coutJusqua18ans: number;
    categories: CoutCategorie[];
    aidesPotentielles: number;
    coutNetAides: number;
  } | null = null;

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.updateMetaData({
      title: "Simulateur Cout d'un Enfant 2026 | Budget Famille | CalculateurFinance.fr",
      description: "Calculez le cout mensuel et annuel d'un enfant selon son age et votre niveau de vie. Estimez votre budget famille avec les aides CAF incluses.",
      url: 'https://calculateurfinance.fr/simulateur-cout-enfant/',
      keywords: "cout enfant par mois, budget bebe, cout elever enfant, depenses enfant France, budget famille, allocations familiales, aide CAF enfant, cout creche, cout etudes"
    });
  }

  calculer(): void {
    const coeffNiveau: { [key: string]: number } = {
      modeste: 0.7,
      moyen: 1.0,
      aise: 1.5
    };

    const coeff = coeffNiveau[this.niveauVie];
    const categories = this.getCategoriesParAge(this.trancheAge, coeff);

    const coutMensuelTotal = categories.reduce((sum, cat) => sum + cat.mensuel, 0);
    const coutAnnuelTotal = coutMensuelTotal * 12;

    // Estimation cout total jusqu'a 18 ans (moyenne simplifiee)
    const coutJusqua18ans = Math.round(coutAnnuelTotal * 18 * 0.85); // Coefficient de lissage

    // Estimation des aides (allocations familiales, CMG, etc.)
    const aidesPotentielles = this.estimerAides();

    this.resultat = {
      coutMensuelTotal: Math.round(coutMensuelTotal),
      coutAnnuelTotal: Math.round(coutAnnuelTotal),
      coutJusqua18ans,
      categories,
      aidesPotentielles: Math.round(aidesPotentielles),
      coutNetAides: Math.round(coutMensuelTotal - aidesPotentielles)
    };
  }

  private getCategoriesParAge(tranche: string, coeff: number): CoutCategorie[] {
    // Couts de base mensuels par categorie selon l'age
    const coutsBase: { [tranche: string]: { [cat: string]: number } } = {
      '0-3': {
        'Garde / Creche': 400,
        'Alimentation': 150,
        'Vetements': 80,
        'Sante': 50,
        'Couches / Hygiene': 70,
        'Equipement': 60,
        'Loisirs': 30
      },
      '3-6': {
        'Cantine / Periscolaire': 150,
        'Alimentation': 180,
        'Vetements': 70,
        'Sante': 40,
        'Fournitures': 20,
        'Activites / Loisirs': 80,
        'Equipement': 30
      },
      '6-11': {
        'Cantine / Etude': 120,
        'Alimentation': 200,
        'Vetements': 80,
        'Sante': 40,
        'Fournitures scolaires': 30,
        'Activites sportives': 60,
        'Loisirs / Sorties': 50
      },
      '11-15': {
        'Cantine': 130,
        'Alimentation': 250,
        'Vetements': 100,
        'Sante': 50,
        'Fournitures scolaires': 50,
        'Activites': 80,
        'Telephone / Tech': 40,
        'Argent de poche': 30
      },
      '15-18': {
        'Cantine': 140,
        'Alimentation': 280,
        'Vetements': 120,
        'Sante': 50,
        'Fournitures scolaires': 60,
        'Activites / Sport': 80,
        'Telephone / Tech': 50,
        'Argent de poche': 50,
        'Transport': 40
      },
      '18+': {
        'Logement etudiant': 500,
        'Alimentation': 300,
        'Frais scolarite': 200,
        'Transport': 80,
        'Vetements': 80,
        'Sante / Mutuelle': 40,
        'Loisirs': 60,
        'Telephone / Internet': 40
      }
    };

    const couts = coutsBase[tranche] || coutsBase['6-11'];

    return Object.entries(couts).map(([nom, montant]) => ({
      nom,
      mensuel: Math.round(montant * coeff),
      annuel: Math.round(montant * coeff * 12)
    }));
  }

  private estimerAides(): number {
    // Estimation simplifiee des aides mensuelles
    let aides = 0;

    // Allocations familiales (a partir de 2 enfants)
    if (this.nbEnfants >= 2) {
      aides += 140; // Montant de base pour 2 enfants
      if (this.nbEnfants >= 3) {
        aides += 180; // Supplement 3eme enfant
      }
    }

    // PAJE / CMG pour les moins de 6 ans
    if (['0-3', '3-6'].includes(this.trancheAge) && this.modeGarde !== 'famille' && this.modeGarde !== 'ecole') {
      if (this.niveauVie === 'modeste') {
        aides += 250;
      } else if (this.niveauVie === 'moyen') {
        aides += 180;
      } else {
        aides += 100;
      }
    }

    return aides;
  }
}
