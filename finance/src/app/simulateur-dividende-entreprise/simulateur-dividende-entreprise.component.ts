import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SeoService } from '../Constructor/service/seo.service';

@Component({
  selector: 'app-simulateur-dividende-entreprise',
  templateUrl: './simulateur-dividende-entreprise.component.html',
  styleUrls: ['./simulateur-dividende-entreprise.component.scss'],
})
export class SimulateurDividendeEntrepriseComponent implements OnInit {
  form: FormGroup;
  result: any = null;
  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: any,
    private renderer: Renderer2,
    private seo: SeoService
  ) {
      this.form = this.fb.group({
  chiffreAffaires: [0, Validators.required],
  statut: ['sasu', Validators.required]
});
  }

  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Simulateur de dividendes d’entreprise | CalculateurFinance.fr',
      description:
        'Calculez les dividendes nets à percevoir à partir du résultat net de votre société. Estimation avec PFU, prélèvements sociaux et réserve légale.',
      url: 'https://calculateurfinance.fr/simulateur-dividendes-entreprise/',
    });

    if (isPlatformBrowser(this.platformId)) {
      const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu’est-ce que la réserve légale ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "C’est une part du bénéfice net qu'une entreprise doit conserver, jusqu’à atteindre 10 % du capital social. Elle est obligatoire pour certaines formes juridiques comme les SARL, SAS, SA, etc."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le taux de réserve légale à constituer ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le taux est de 5 % du bénéfice net annuel, jusqu’à atteindre 10 % du capital social."
      }
    },
    {
      "@type": "Question",
      "name": "Quelles entreprises sont concernées par la réserve légale ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Les sociétés de capitaux comme SAS, SASU, SARL, EURL et SA doivent constituer une réserve légale."
      }
    },
    {
      "@type": "Question",
      "name": "La réserve légale est-elle obligatoire en SASU ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, la SASU est tenue de constituer une réserve légale de 10 % du capital social via une affectation de 5 % des bénéfices chaque année."
      }
    },
    {
      "@type": "Question",
      "name": "Peut-on distribuer des dividendes sans réserve légale suffisante ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non, une entreprise doit d’abord constituer sa réserve légale avant de pouvoir distribuer l’intégralité de ses bénéfices sous forme de dividendes."
      }
    },
    {
      "@type": "Question",
      "name": "La réserve légale est-elle bloquée ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, la réserve légale est une réserve indisponible : elle ne peut pas être distribuée aux associés ou actionnaires."
      }
    },
    {
      "@type": "Question",
      "name": "Que se passe-t-il si la société a déjà atteint 10 % du capital en réserve légale ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dans ce cas, elle n’a plus besoin d’affecter 5 % de ses bénéfices à la réserve légale. Elle peut distribuer la totalité du résultat distribuable."
      }
    },
    {
      "@type": "Question",
      "name": "Comment calcule-t-on le montant disponible pour dividendes ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "On déduit d’abord la réserve légale à constituer (si nécessaire) du résultat net. Le solde est le montant maximum distribuable en dividendes."
      }
    },
    {
      "@type": "Question",
      "name": "Les entreprises individuelles sont-elles concernées par la réserve légale ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non, la réserve légale ne concerne pas les entreprises individuelles ou auto-entrepreneurs."
      }
    },
    {
      "@type": "Question",
      "name": "Peut-on utiliser la réserve légale pour combler des pertes ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, la réserve légale peut être utilisée pour absorber des pertes si toutes les autres réserves ont été épuisées."
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
statuts = [
  { label: 'SASU (IS)', value: 'sasu' },
  { label: 'EURL (IS)', value: 'eurl_is' },
  { label: 'EURL (IR)', value: 'eurl_ir' },
  { label: 'EI (IR)', value: 'ei' },
  { label: 'Micro-entreprise', value: 'micro' }
];



resultat: any;

calculer() {
  const { chiffreAffaires, statut } = this.form.value;
  const chiffre = Number(chiffreAffaires);
  if (!chiffre || chiffre <= 0) return;

  let chargesSociales = 0;
  let baseImposable = 0;
  let impotSociete = 0;
  let resultatNet = 0;
  let dividendesBruts = 0;
  let dividendesNets = 0;

  const capitalSocial = 10000;
  const reserveLegaleExistante = 0;
  const seuilReserveLegale = capitalSocial * 0.1;
  let reserveLegaleAffectee = 0;
  let resultatDistributable = 0;

  switch (statut) {
    case 'sasu':
    case 'eurl_is':
      chargesSociales = chiffre * 0.45;
      baseImposable = chiffre - chargesSociales;
      impotSociete = baseImposable * 0.25;
      resultatNet = baseImposable - impotSociete;

      const reservePotentielle = resultatNet * 0.05;
      reserveLegaleAffectee = Math.min(reservePotentielle, seuilReserveLegale - reserveLegaleExistante);
      resultatDistributable = resultatNet - reserveLegaleAffectee;

      dividendesBruts = resultatDistributable;
      dividendesNets = dividendesBruts * 0.7;
      break;

    case 'eurl_ir':
    case 'ei':
      chargesSociales = chiffre * 0.45;
      resultatNet = chiffre - chargesSociales;
      dividendesBruts = resultatNet;
      dividendesNets = dividendesBruts * 0.7;
      break;

    case 'micro':
      const abattement = 0.5;
      const revenuNetMicro = chiffre * (1 - abattement);
      chargesSociales = chiffre * 0.22;
      resultatNet = chiffre - chargesSociales;
      dividendesBruts = resultatNet;
      dividendesNets = dividendesBruts * 0.7;
      break;
  }

  this.resultat = {
    typeEntreprise: this.statuts.find((s) => s.value === statut)?.label,
    capitalSocial,
    seuilReserveLegale,
    reserveLegaleAffectee,
    chargesSociales,
    impotSociete,
    resultatNet,
    resultatDistributable,
    dividendesBruts,
    dividendesNets
  };
}


  getExplication(type: string): string {
    console.log(type)
  switch (type) {
    case 'SASU':
    case 'SAS':
    case 'SA':
      return `
        <p>Les SASU/SAS/SA sont soumises à la réserve légale de 10 % du capital social. Elle est obligatoire tant que ce seuil n’est pas atteint. Une fois la réserve constituée, le solde du résultat peut être distribué aux actionnaires sous forme de dividendes.</p>
      `;
    case 'SARL':
    case 'EURL':
      return `
        <p>Les SARL/EURL doivent aussi constituer une réserve légale à hauteur de 10 % du capital social. La répartition des dividendes est ensuite libre, selon les parts sociales et les statuts.</p>
      `;
    default:
      return `<p>Type d’entreprise non reconnu.</p>`;
  }
}

}
