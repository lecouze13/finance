import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-comparateur-sci-ir-is',
  templateUrl: './comparateur-sci-ir-is.component.html',
  styleUrls: ['./comparateur-sci-ir-is.component.scss']
})
export class ComparateurSciIrIsComponent implements OnInit {
  revenus = 0;
  charges = 0;
  duree = 10;
  tauxImpotIR = 30;
  tauxCsg = 17.2;
  amortissement = 0;
  resultat: boolean = false;

  totalIR = 0;
  totalIS = 0;
  gainISvsIR = 0;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Quelle est la différence entre SCI à l’IR et SCI à l’IS ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "La SCI à l’IR est fiscalement transparente : les revenus sont imposés entre les mains des associés. La SCI à l’IS est une société imposée : l’impôt est payé sur les bénéfices au niveau de la société."
          }
        },
        {
          "@type": "Question",
          "name": "Quels sont les avantages de la SCI à l’IS ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "La SCI à l’IS permet d’amortir le bien, ce qui réduit fortement le bénéfice imposable. Elle est souvent plus avantageuse à court terme."
          }
        },
        {
          "@type": "Question",
          "name": "Quels sont les inconvénients de la SCI à l’IS ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "À la revente, la plus-value est calculée différemment, souvent plus fortement imposée. De plus, les dividendes sont à nouveau imposés."
          }
        },
        {
          "@type": "Question",
          "name": "Quels sont les taux d’imposition en SCI à l’IR ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ils dépendent du taux marginal d’imposition des associés (ex. 30%) + 17,2% de prélèvements sociaux."
          }
        },
        {
          "@type": "Question",
          "name": "Quels sont les taux en SCI à l’IS ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "L’impôt sur les sociétés est de 15% jusqu’à 42 500 €, puis 25%. Les dividendes sont soumis à la flat tax de 30%."
          }
        },
        {
          "@type": "Question",
          "name": "Peut-on amortir un bien en SCI à l’IR ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Non, seul le régime de l’IS permet d’amortir comptablement le bien immobilier."
          }
        },
        {
          "@type": "Question",
          "name": "Comment est calculée la plus-value en SCI à l’IR ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Elle bénéficie d’abattements pour durée de détention (exonération totale après 22 ans en IR, 30 ans en PS)."
          }
        },
        {
          "@type": "Question",
          "name": "Peut-on changer de régime fiscal après création ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, mais attention : le passage de l’IR à l’IS est irréversible."
          }
        },
        {
          "@type": "Question",
          "name": "Lequel est mieux pour louer en meublé ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "La SCI à l’IR ne permet pas de louer en meublé sans passer en activité commerciale. L’IS est plus adaptée dans ce cas."
          }
        },
        {
          "@type": "Question",
          "name": "Lequel est mieux pour un investissement long terme ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "La SCI à l’IR est souvent plus intéressante sur le long terme grâce à l’exonération progressive de la plus-value."
          }
        }
      ]
    });
    this.renderer.appendChild(document.head, script);
  }

  calculer() {
    const revenuNet = this.revenus - this.charges;
    const irTotal = revenuNet * this.duree * (this.tauxImpotIR + this.tauxCsg) / 100;

    const revenuIS = (revenuNet - this.amortissement) * this.duree;
    const isTotal = revenuIS * 0.25;

    this.totalIR = Math.round(irTotal);
    this.totalIS = Math.round(isTotal);
    this.gainISvsIR = Math.round(this.totalIR - this.totalIS);
    this.resultat = true;
  }
}
