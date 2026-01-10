import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { FaqItem } from '../../shared/faq-section/faq-section.component';

@Component({
  selector: 'app-simulateur-epargne-objectif',
  templateUrl: './simulateur-epargne-objectif.component.html',
  styleUrls: ['./simulateur-epargne-objectif.component.scss'],
  standalone: false
})
export class SimulateurEpargneObjectifComponent implements OnInit {
  // Entrées
  objectifMontant: number = 50000;
  delaiAnnees: number = 10;
  capitalInitial: number = 5000;
  tauxRendement: number = 3;
  modeCalcul: string = 'mensualite'; // 'mensualite' ou 'duree'
  epargneDisponible: number = 300;

  // Résultats
  epargneMensuelleNecessaire: number = 0;
  totalVerse: number = 0;
  interetsGeneres: number = 0;
  effortEpargne: number = 0;
  dureeNecessaire: number = 0;
  capitalFinal: number = 0;

  // Projection année par année
  projectionAnnuelle: any[] = [];

  modeOptions = [
    { label: 'Calculer l\'épargne mensuelle nécessaire', value: 'mensualite' },
    { label: 'Calculer la durée nécessaire', value: 'duree' }
  ];

  faqItems: FaqItem[] = [
    {
      question: "Comment calculer l'épargne mensuelle pour atteindre un objectif ?",
      answer: "Pour calculer l'épargne mensuelle nécessaire, on utilise la formule de l'annuité : M = (Objectif - Capital × (1+r)^n) × r / ((1+r)^n - 1), où r est le taux mensuel et n le nombre de mois. Cette formule tient compte des intérêts composés sur votre épargne."
    },
    {
      question: "Quel taux de rendement utiliser pour ma simulation ?",
      answer: "Le taux dépend du support d'épargne : Livret A (3% en 2025), LDDS (3%), fonds euros (2-3%), PEA actions (6-8% historique long terme), assurance-vie UC (4-6%). Soyez prudent : utilisez un taux réaliste, net de frais et d'inflation pour un objectif à long terme."
    },
    {
      question: "Vaut-il mieux épargner plus ou plus longtemps ?",
      answer: "Grâce aux intérêts composés, épargner tôt est plus efficace. 200€/mois pendant 20 ans à 4% donne ~73 000€. Pour atteindre la même somme en 10 ans, il faut ~500€/mois. Le temps joue en votre faveur : chaque année de retard coûte cher."
    },
    {
      question: "Quel capital initial pour démarrer mon épargne ?",
      answer: "Tout capital initial accélère l'atteinte de votre objectif. Même 1 000€ de départ font une différence significative sur 10-20 ans grâce aux intérêts composés. Si vous avez une épargne de précaution constituée (3-6 mois de dépenses), le surplus peut servir de capital initial."
    },
    {
      question: "Comment intégrer l'inflation dans mon objectif ?",
      answer: "L'inflation érode le pouvoir d'achat. Pour un objectif dans 10 ans, avec 2% d'inflation, 50 000€ aujourd'hui équivalent à ~61 000€ en valeur future. Conseil : soit augmentez votre objectif de (1+inflation)^années, soit utilisez un taux de rendement réel (taux nominal - inflation)."
    },
    {
      question: "Dois-je épargner tous les mois ou ponctuellement ?",
      answer: "L'épargne régulière (mensuelle) est recommandée : elle lisse le risque d'investissement (DCA - Dollar Cost Averaging), crée une discipline d'épargne, et s'adapte à un salaire mensuel. Les versements ponctuels (prime, héritage) sont un excellent complément mais ne doivent pas être la stratégie principale."
    },
    {
      question: "Quels supports choisir pour mon épargne objectif ?",
      answer: "Court terme (<3 ans) : livrets réglementés. Moyen terme (3-8 ans) : fonds euros, obligations. Long terme (>8 ans) : PEA, assurance-vie UC, actions. Diversifiez selon votre horizon et tolérance au risque. Plus l'objectif est lointain, plus vous pouvez prendre de risque."
    },
    {
      question: "Comment ajuster mon plan si les rendements baissent ?",
      answer: "Si les rendements sont inférieurs aux prévisions, vous avez 3 options : augmenter l'épargne mensuelle, repousser l'échéance, ou réduire l'objectif. Faites un point annuel pour ajuster. Un écart de 1% de rendement sur 15 ans peut représenter 10-15% de capital final en moins."
    },
    {
      question: "L'épargne automatique est-elle efficace ?",
      answer: "Oui, le virement automatique dès réception du salaire est la méthode la plus efficace. Vous ne voyez pas l'argent, donc vous ne le dépensez pas. C'est le concept du 'payez-vous en premier'. Commencez même petit (50€) et augmentez progressivement."
    },
    {
      question: "Comment calculer mon taux d'effort d'épargne ?",
      answer: "Le taux d'effort = épargne mensuelle / revenus nets × 100. Un taux de 10-15% est un bon objectif, 20%+ est excellent. Attention, ce taux doit rester supportable sur la durée. Il vaut mieux épargner 150€/mois pendant 10 ans que 300€ pendant 6 mois puis abandonner."
    }
  ];

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Simulateur Épargne Objectif 2025 | Calculez votre Épargne Mensuelle');
    this.meta.updateTag({
      name: 'description',
      content: 'Calculez l\'épargne mensuelle nécessaire pour atteindre votre objectif financier. Simulez avec les intérêts composés et visualisez votre progression année par année.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'simulateur épargne, objectif épargne, épargne mensuelle, calcul épargne, intérêts composés, plan épargne, atteindre objectif financier'
    });
    this.calculer();
  }

  calculer(): void {
    const tauxMensuel = this.tauxRendement / 100 / 12;
    const nombreMois = this.delaiAnnees * 12;

    if (this.modeCalcul === 'mensualite') {
      // Calcul de l'épargne mensuelle nécessaire
      const capitalFuturInitial = this.capitalInitial * Math.pow(1 + this.tauxRendement / 100, this.delaiAnnees);
      const montantAConstituer = this.objectifMontant - capitalFuturInitial;

      if (tauxMensuel > 0 && montantAConstituer > 0) {
        this.epargneMensuelleNecessaire = montantAConstituer * tauxMensuel /
          ((Math.pow(1 + tauxMensuel, nombreMois) - 1) * (1 + tauxMensuel));
      } else if (montantAConstituer > 0) {
        this.epargneMensuelleNecessaire = montantAConstituer / nombreMois;
      } else {
        this.epargneMensuelleNecessaire = 0;
      }

      this.capitalFinal = this.objectifMontant;
      this.dureeNecessaire = this.delaiAnnees;

    } else {
      // Calcul de la durée nécessaire avec l'épargne disponible
      if (tauxMensuel > 0) {
        // Formule itérative pour trouver n
        let capital = this.capitalInitial;
        let mois = 0;
        while (capital < this.objectifMontant && mois < 600) { // max 50 ans
          capital = capital * (1 + tauxMensuel) + this.epargneDisponible;
          mois++;
        }
        this.dureeNecessaire = Math.ceil(mois / 12 * 10) / 10;
        this.capitalFinal = capital;
      } else {
        this.dureeNecessaire = Math.ceil((this.objectifMontant - this.capitalInitial) / this.epargneDisponible / 12 * 10) / 10;
        this.capitalFinal = this.objectifMontant;
      }
      this.epargneMensuelleNecessaire = this.epargneDisponible;
    }

    // Calculs communs
    this.totalVerse = this.capitalInitial + (this.epargneMensuelleNecessaire * this.dureeNecessaire * 12);
    this.interetsGeneres = this.capitalFinal - this.totalVerse;

    // Générer la projection annuelle
    this.genererProjection();

    // Arrondir
    this.epargneMensuelleNecessaire = Math.round(this.epargneMensuelleNecessaire * 100) / 100;
    this.totalVerse = Math.round(this.totalVerse);
    this.interetsGeneres = Math.round(this.interetsGeneres);
    this.capitalFinal = Math.round(this.capitalFinal);
  }

  genererProjection(): void {
    this.projectionAnnuelle = [];
    let capital = this.capitalInitial;
    const tauxAnnuel = this.tauxRendement / 100;
    const versementAnnuel = this.epargneMensuelleNecessaire * 12;

    for (let annee = 0; annee <= Math.ceil(this.dureeNecessaire); annee++) {
      const interetsAnnee = annee === 0 ? 0 : capital * tauxAnnuel;
      capital = annee === 0 ? this.capitalInitial : capital + interetsAnnee + versementAnnuel;

      this.projectionAnnuelle.push({
        annee: annee,
        versementsCumules: this.capitalInitial + (versementAnnuel * annee),
        interetsCumules: capital - (this.capitalInitial + versementAnnuel * annee),
        capitalTotal: Math.round(capital),
        progression: Math.min(100, Math.round((capital / this.objectifMontant) * 100))
      });
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  }
}
