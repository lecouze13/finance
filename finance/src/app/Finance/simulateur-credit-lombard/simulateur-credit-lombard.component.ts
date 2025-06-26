import { Component, OnInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../Constructor/service/seo.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-simulateur-credit-lombard',
  templateUrl: './simulateur-credit-lombard.component.html',
  styleUrls: ['./simulateur-credit-lombard.component.scss']
})
export class SimulateurCreditLombardComponent implements OnInit {
  form: FormGroup;
  resultat: any = null;

  // Quotités par type d’actif
  quotites: { [key: string]: number } = {
    'liquiditesEuro': 1.0,
    'liquiditesAutre': 1.0,

    'obligations': 0.9,
    'obligations-entreprise': 0.75,
    'etf': 0.65,
    'actions': 0.6,
    'fonds-actions': 0.5,
    'assurance-vie-euros': 0.7,
    'assurance-vie-uc': 0.5,
    'scpi': 0.5,
    'private-equity': 0.2
  };

  // Options dropdown
  typesActifs = [
    { label: 'Liquidités (EUR)', value: 'liquiditesEuro' },
    { label: 'Liquidités (USD, YEN, etc)', value: 'liquiditesAutre' },
    { label: 'Obligations d’État AAA', value: 'obligations' },
    { label: 'Obligations d’entreprises', value: 'obligations-entreprise' },
    { label: 'ETF indiciels', value: 'etf' },
    { label: 'Actions cotées', value: 'actions' },
    { label: 'Fonds actions (OPCVM)', value: 'fonds-actions' },
    { label: 'Assurance-vie fonds €', value: 'assurance-vie-euros' },
    { label: 'Assurance-vie UC', value: 'assurance-vie-uc' },
    { label: 'SCPI, SCI', value: 'scpi' },
    { label: 'Private Equity', value: 'private-equity' }
  ];
  constructor(private fb: FormBuilder, @Inject(PLATFORM_ID) private platformId: any,
    private renderer: Renderer2,
    private seo: SeoService) {
    this.form = this.fb.group({
      taux: [3],
      duree: [12],
      actifs: this.fb.array([
        this.createActifFormGroup()
      ])
    });
  }




  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Simulateur Crédit Lombard : Calculez votre capacité d’emprunt',
      description: 'Estimez le montant que vous pouvez emprunter via un crédit lombard en fonction de vos actifs financiers.',
      url: 'https://calculateurfinance.fr/simulateur-credit-lombard/',
      keywords: 'simulateur crédit lombard, crédit sur portefeuille, levier financier, emprunt lombard, financement investissement, calcul capacité emprunt, prêt lombard, simulation prêt garanti titres, quotité maximale',
    });

    if (isPlatformBrowser(this.platformId)) {
      const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Qu’est-ce qu’un crédit lombard ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Le crédit lombard est un prêt adossé à un portefeuille de valeurs mobilières servant de garantie sans être vendu."
            }
          },
          {
            "@type": "Question",
            "name": "Quels types d’actifs peuvent être utilisés en garantie ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Actions cotées, obligations, OPCVM, assurance-vie en unités de compte, sous conditions de liquidité et de volatilité."
            }
          },
          {
            "@type": "Question",
            "name": "Quelle est la quotité maximale d’un crédit lombard ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Elle varie de 50 % à 90 % selon la nature et la qualité des actifs mis en garantie."
            }
          },
          {
            "@type": "Question",
            "name": "Combien puis-je emprunter avec un portefeuille de 100 000 € ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Avec une quotité de 70 %, vous pouvez emprunter jusqu’à 70 000 €."
            }
          },
          {
            "@type": "Question",
            "name": "Quel est le taux d’intérêt moyen d’un crédit lombard ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Il se situe généralement entre 2 % et 5 %, selon le profil, le montant et la durée."
            }
          },
          {
            "@type": "Question",
            "name": "Quelle est la durée typique d’un crédit lombard ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La durée est en général de 1 à 5 ans."
            }
          },
          {
            "@type": "Question",
            "name": "Quels sont les risques d’un crédit lombard ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Le principal risque est l’appel de marge en cas de baisse de valeur des actifs."
            }
          },
          {
            "@type": "Question",
            "name": "Peut-on rembourser un crédit lombard par anticipation ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Oui, le remboursement anticipé est possible dans la plupart des cas, sans frais."
            }
          },
          {
            "@type": "Question",
            "name": "Le crédit lombard impacte-t-il la fiscalité ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Non, puisqu’il n’y a pas de cession d’actifs, il n’y a pas d’imposition sur les plus-values."
            }
          },
          {
            "@type": "Question",
            "name": "Pourquoi utiliser un crédit lombard ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pour financer des projets tout en conservant ses placements et leur potentiel de valorisation."
            }
          }
        ]
      }


      const script = this.renderer.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(faqJsonLd);
      this.renderer.appendChild(document.head, script);
    }
  }

  get actifs(): FormArray {
    return this.form.get('actifs') as FormArray;
  }

  createActifFormGroup(): FormGroup {
    return this.fb.group({
      type: ['actions'],
      valeur: [0]
    });
  }

  addActif(): void {
    this.actifs.push(this.createActifFormGroup());
  }

  removeActif(index: number): void {
    this.actifs.removeAt(index);
  }

calculer(): void {
  const formValues = this.form.value;
  const tauxMensuel = formValues.taux / 12 / 100;
  const dureeMois = formValues.duree * 12;

  let nantis = 0;
  let montantGarantieTotal = 0;

  formValues.actifs.forEach((actif: any) => {
    const quotite = this.quotites[actif.type] || 0;
    nantis += actif.valeur;
    montantGarantieTotal += actif.valeur * quotite;
  });

  const capitalEmpruntable = montantGarantieTotal;

  // Formule d'amortissement classique (mensualité constante)
  const mensualite = capitalEmpruntable * tauxMensuel / (1 - Math.pow(1 + tauxMensuel, -dureeMois));

  // Coût total du crédit = mensualité * nombre de mois - capital emprunté
  const coutTotalCredit = mensualite * dureeMois - capitalEmpruntable;

  this.resultat = {
    montantGarantieTotal,
    capitalEmpruntable,
    mensualite,
    nantis,
    coutTotalCredit,
  };
}


}
