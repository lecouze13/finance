import { Component, OnInit, Renderer2 } from '@angular/core';
import { SeoService } from '../../Constructor/service/seo.service'; import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-simulateur-independace-financiere',

  templateUrl: './simulateur-independace-financiere.component.html',
  styleUrl: './simulateur-independace-financiere.component.scss'
})
export class SimulateurIndependaceFinanciereComponent implements OnInit {


  constructor(  @Inject(PLATFORM_ID) private platformId: any, 
private renderer: Renderer2, private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Simulateur FIRE : Atteindre l’indépendance financière',
      description: 'Calculez combien de capital il vous faut pour être libre financièrement avec notre simulateur FIRE. Évaluez vos dépenses, votre taux de retrait et votre épargne.',
      keywords: 'simulateur indépendance financière, liberté financière, revenus passifs, épargne, investissement, calcul indépendance financière, FIRE, finances personnelles',

      url: 'https://calculateurfinance.fr/simulateur-independance-financiere/',
  });
  if (isPlatformBrowser(this.platformId)) {

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Qu'est-ce que le mouvement FIRE ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "FIRE signifie Financial Independence, Retire Early. Il s'agit d'accumuler suffisamment de capital pour vivre de ses revenus passifs et prendre une retraite anticipée."
          }
        },
        {
          "@type": "Question",
          "name": "Comment calculer le capital nécessaire pour être FIRE ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Multipliez vos dépenses annuelles par 25 (si vous utilisez un taux de retrait de 4 %)."
          }
        },
        {
          "@type": "Question",
          "name": "Quel est le meilleur taux de retrait à utiliser ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Un taux de 4 % est souvent utilisé, mais certains préfèrent 3 ou 3,5 % pour plus de sécurité face à l'inflation et aux crises."
          }
        },
        {
          "@type": "Question",
          "name": "Est-il possible d'atteindre FIRE sans investir en bourse ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, via l'immobilier locatif ou la création d'entreprise, mais cela demande souvent plus d'efforts de gestion."
          }
        },
        {
          "@type": "Question",
          "name": "Quelle épargne annuelle faut-il viser pour être FIRE ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cela dépend de votre objectif de capital. Plus vous épargnez, plus vite vous y arriverez. Une épargne de 30 à 70 % des revenus est courante dans le mouvement FIRE."
          }
        },
        {
          "@type": "Question",
          "name": "Le mouvement FIRE est-il adapté à tout le monde ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Non, il demande de fortes capacités d’épargne, une bonne discipline financière et un mode de vie frugal pour certains."
          }
        },
        {
          "@type": "Question",
          "name": "Faut-il viser FIRE ou Coast FIRE ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le Coast FIRE consiste à atteindre un capital suffisant jeune, qui grossira seul sans nouveaux apports jusqu’à la retraite. Cela permet de ralentir sans être totalement indépendant."
          }
        },
        {
          "@type": "Question",
          "name": "Comment accélérer son chemin vers FIRE ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Augmenter ses revenus, réduire ses dépenses, investir intelligemment et automatiser son épargne sont les clés principales."
          }
        },
        {
          "@type": "Question",
          "name": "Dois-je quitter mon travail si je suis FIRE ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pas nécessairement. Beaucoup de personnes FIRE continuent à travailler sur des projets passionnants ou à temps partiel."
          }
        },
        {
          "@type": "Question",
          "name": "Le FIRE fonctionne-t-il en France ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, même si le système social, les impôts et les règles de retraite diffèrent des États-Unis. Il faut adapter la stratégie à son contexte fiscal."
          }
        }
      ]
    };

    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    this.renderer.appendChild(document.head, script);
  }
  }
ageActuel: number = 30;
  ageObjectif: number | null = null;
  depensesAnnuelles: number = 20000;
  tauxRetrait: number = 4;
  tauxRendement: number = 5;
  capitalActuel: number = 0;
  epargneAnnuelle: number = 10000;

  modeCalcul: any = { label: 'Âge cible de retraite', value: 'age' };
  modesCalcul = [
    { label: 'Âge cible de retraite', value: 'age' },
    { label: 'Atteindre l’indépendance le plus tôt possible', value: 'independance' }
  ];

  resultats: {
    capitalNecessaire: number | null;
    capitalAtteint: number | null;
    anneesRestantes: number | null;
    ageAtteint: number | null;
  } | null = null;

  calculer() {
    if (!this.depensesAnnuelles || !this.tauxRetrait) return;

    const tauxRetraitDecimal = this.tauxRetrait / 100;
    const tauxRendementDecimal = this.tauxRendement / 100;

    const capitalNecessaire = this.depensesAnnuelles / tauxRetraitDecimal;

    if (this.modeCalcul?.value === 'age' && this.ageObjectif !== null) {
      const duree = this.ageObjectif - this.ageActuel;
      const capitalAtteint = this.calculCapitalFutur(duree, tauxRendementDecimal);
      this.resultats = {
        capitalNecessaire: Math.round(capitalNecessaire),
        capitalAtteint: Math.round(capitalAtteint),
        anneesRestantes: duree,
        ageAtteint: null
      };
    }

    if (this.modeCalcul?.value === 'independance') {
      let capital = this.capitalActuel;
      let annees = 0;

      while (capital < capitalNecessaire && annees < 100) {
        capital = capital * (1 + tauxRendementDecimal) + this.epargneAnnuelle;
        annees++;
      }

      const ageAtteint = this.ageActuel + annees;

      this.resultats = {
        capitalNecessaire: Math.round(capitalNecessaire),
        capitalAtteint: null,
        anneesRestantes: annees,
        ageAtteint: ageAtteint
      };
    }
  }

  private calculCapitalFutur(duree: number, taux: number): number {
    let capital = this.capitalActuel;
    for (let i = 0; i < duree; i++) {
      capital = capital * (1 + taux) + this.epargneAnnuelle;
    }
    return capital;
  }

}
