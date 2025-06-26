import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { SeoService } from '../../Constructor/service/seo.service'; import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-simulateur-retraite',
  templateUrl: './simulateur-retraite.component.html',
  styleUrls: ['./simulateur-retraite.component.scss'],

})
export class SimulateurRetraiteComponent implements OnInit {
  form: FormGroup;
  result: any = null;

  typesMetier = [
    { label: 'Salarié du privé', value: 'prive', taux: 50 },
    { label: 'Cadre du privé', value: 'cadre', taux: 50 },
    { label: 'Fonctionnaire', value: 'fonctionnaire', taux: 72 },
    { label: 'Indépendant', value: 'independant', taux: 30 },
    { label: 'Agriculteur', value: 'agriculteur', taux: 50 }
  ];

  constructor(private fb: FormBuilder, @Inject(PLATFORM_ID) private platformId: any,
    private renderer: Renderer2, private seo: SeoService) {
 // Ajout d'un champ dans le formulaire  
this.form = this.fb.group({
  ageActuel: [30, Validators.required],
  ageDepart: [65, Validators.required],
  ageDebutTravail: [22, Validators.required],  // Nouveau champ
  salaireBrutAnnuel: [40000, Validators.required],
  typeMetier: ['prive', Validators.required],
  tauxRevalorisation: [1.5],
  dureeRetraite: [25]
});



  }

  ngOnInit(): void {

    this.seo.updateMetaData({
      title: 'Simulateur Retraite 2025 : âge, pension et projections',
      description: 'Estimez votre âge de départ à la retraite et le montant de votre pension avec notre simulateur complet. Intègre carrière, statut et revenus.',
      keywords: 'simulateur retraite, calcul retraite, âge de départ à la retraite, pension, épargne retraite, planning retraite, revenus retraite, projection retraite',

      url: 'https://calculateurfinance.fr/simulateur-retraite/'
    });

    if (isPlatformBrowser(this.platformId)) {
      const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Quel est l’âge légal de départ à la retraite en France ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Depuis la réforme de 2023, l’âge légal est progressivement relevé à 64 ans pour les personnes nées à partir de 1968."
            }
          },
          {
            "@type": "Question",
            "name": "Comment est calculée ma pension de retraite ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Elle dépend de vos revenus annuels moyens, de la durée de cotisation, du nombre de trimestres validés, et du régime de retraite auquel vous êtes affilié."
            }
          },
          {
            "@type": "Question",
            "name": "Puis-je partir plus tôt avec une carrière longue ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Oui, sous certaines conditions, il est possible de partir avant l’âge légal si vous avez commencé à travailler jeune et cumulé suffisamment de trimestres."
            }
          },
          {
            "@type": "Question",
            "name": "Quel est le montant minimum de pension retraite ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Le minimum contributif est d’environ 750 € par mois pour les assurés ayant une carrière complète à faible revenu."
            }
          },
          {
            "@type": "Question",
            "name": "Comment valider un trimestre de retraite ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "En 2025, il faut percevoir au moins 1 690 € brut sur l’année pour valider un trimestre dans le régime général."
            }
          },
          {
            "@type": "Question",
            "name": "Les indépendants ont-ils droit à une retraite ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Oui, les indépendants cotisent à un régime spécifique (SSI ou CARMF, CIPAV…) et perçoivent une pension selon leurs cotisations."
            }
          },
          {
            "@type": "Question",
            "name": "Puis-je cumuler emploi et retraite ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Oui, le cumul emploi-retraite est possible, partiel ou total, selon votre situation et votre régime."
            }
          },
          {
            "@type": "Question",
            "name": "Comment racheter des trimestres ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Vous pouvez racheter jusqu’à 12 trimestres pour années incomplètes ou études supérieures, sous conditions et avec un coût variable."
            }
          },
          {
            "@type": "Question",
            "name": "Dois-je déclarer ma retraite aux impôts ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Oui, les pensions de retraite sont imposables et doivent être déclarées comme des revenus."
            }
          },
          {
            "@type": "Question",
            "name": "Existe-t-il un simulateur officiel de retraite ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Oui, le site Info-Retraite.fr propose un simulateur officiel inter-régimes pour estimer votre retraite."
            }
          }
        ]
      };

      const script = this.renderer.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(faqJsonLd);
      this.renderer.appendChild(document.head, script);
    }
  }
calculer(): void {
  const { ageActuel, ageDebutTravail, ageDepart, salaireBrutAnnuel, typeMetier, tauxRevalorisation, dureeRetraite } = this.form.value;

  const metier = this.typesMetier.find(m => m.value === typeMetier);
  const tauxRemplacement = metier ? metier.taux : 50;

  const anneesRestantes = ageDepart - ageActuel;
  const dureeCarriere = ageDepart - ageDebutTravail;

  // Projeter le salaire final à l'âge de départ en retraite à partir du salaire actuel
  const salaireFinCarriere = salaireBrutAnnuel * Math.pow(1 + tauxRevalorisation / 100, anneesRestantes);

  // Calcul du salaire moyen revalorisé sur la durée de carrière (en actualisant salaire fin carrière)
  let salaireMoyen = 0;
  for (let i = 0; i < dureeCarriere; i++) {
    salaireMoyen += salaireFinCarriere / Math.pow(1 + tauxRevalorisation / 100, i);
  }
  salaireMoyen = salaireMoyen / dureeCarriere;

  // Durée normale de carrière pour pension pleine (en années)
  const dureeCarriereNormale = 42;

  // Ajustement du taux de remplacement selon années cotisées
  const tauxAjuste = (dureeCarriere >= dureeCarriereNormale)
    ? tauxRemplacement
    : tauxRemplacement * (dureeCarriere / dureeCarriereNormale);

  // Pension annuelle basée sur salaire moyen et taux ajusté
  const pensionAnnuelle = salaireMoyen * (tauxAjuste / 100);

  // Calcul du capital retraite (valeur actuelle de la rente sur la durée de retraite)
  const capitalRetraite = this.calculerCapital(pensionAnnuelle, tauxRevalorisation / 100, dureeRetraite);

  this.result = {
    pensionMensuelle: pensionAnnuelle / 12,
    pensionAnnuelle,
    capitalRetraite,
    anneesCotisees: dureeCarriere,
    tauxRemplacement: tauxAjuste,
    salaireMoyen,
    salaireFinCarriere
  };
}

calculerCapital(rente: number, taux: number, duree: number): number {
  if (taux === 0) return rente * duree;
  return rente * (1 - Math.pow(1 + taux, -duree)) / taux;
}

}

