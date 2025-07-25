import { Component, OnInit, Renderer2 } from '@angular/core';
import { SeoService } from '../../Constructor/service/seo.service'; import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';;
@Component({
  selector: 'app-tri-immo',
  templateUrl: './tri-immo.component.html',
})
export class TriImmoComponent implements OnInit {

 constructor(
    private seo: SeoService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }


  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Calcul du TRI (Taux de Rentabilité Interne) 2025 | CalculateurFinance.fr',
      description: 'Calculez facilement le Taux de Rentabilité Interne (TRI) de votre investissement immobilier grâce à notre simulateur gratuit et précis.',
      keywords: 'simulateur TRI immobilier, taux rendement interne, investissement locatif, calcul rentabilité immobilière, cash flow, flux de trésorerie, rentabilité nette, investissement immobilier, analyse financière, TRI',

      url: 'https://calculateurfinance.fr/tri-immobilier/',
    });
    if (isPlatformBrowser(this.platformId)) {

      const script = this.renderer.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Qu’est-ce que le Taux de Rentabilité Interne (TRI) ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Le TRI est le taux d’actualisation qui rend la valeur actuelle nette (VAN) d’un investissement égale à zéro. Il permet d’évaluer la rentabilité globale d’un projet."
            }
          },
          {
            "@type": "Question",
            "name": "Comment interpréter le TRI ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Un TRI élevé signifie un bon rendement. Si le TRI est supérieur au taux d’intérêt du marché ou au coût du capital, l’investissement est considéré rentable."
            }
          },
          {
            "@type": "Question",
            "name": "Quelle est la formule du calcul du TRI ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Le TRI est la solution de l’équation somme des flux actualisés égale zéro, où les flux sont actualisés au taux TRI."
            }
          },
          {
            "@type": "Question",
            "name": "Comment calculer le TRI ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Le calcul du TRI est itératif et généralement réalisé avec un logiciel financier ou un simulateur qui teste plusieurs taux d’actualisation."
            }
          },
          {
            "@type": "Question",
            "name": "Quelle est la différence entre TRI brut et TRI net ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Le TRI brut ne prend pas en compte les charges fiscales et les frais, tandis que le TRI net intègre ces éléments pour refléter la rentabilité réelle."
            }
          },
          {
            "@type": "Question",
            "name": "Qu’est-ce que le cashflow net ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Le cashflow net est la différence entre les revenus locatifs et les dépenses (charges, impôts, remboursements) liées à l’investissement."
            }
          },
          {
            "@type": "Question",
            "name": "Quels sont les facteurs influençant le TRI ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Le prix d’achat, les loyers perçus, les charges, les frais de notaire, la fiscalité, et la valorisation du bien."
            }
          },
          {
            "@type": "Question",
            "name": "Comment prendre en compte la fiscalité dans le TRI ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "En intégrant les impôts, abattements, et crédits d’impôts dans les flux de trésorerie nets."
            }
          },
          {
            "@type": "Question",
            "name": "Quelle durée est optimale pour un bon TRI ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Le TRI dépend de la durée du projet, souvent entre 8 et 15 ans pour un investissement immobilier."
            }
          },
          {
            "@type": "Question",
            "name": "Quels outils utiliser pour calculer le TRI ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Des simulateurs en ligne, des logiciels Excel avec fonction financière, ou des applications dédiées."
            }
          },
          {
            "@type": "Question",
            "name": "Formule du calcul et méthode :",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Le TRI est le taux d’actualisation qui annule la valeur actuelle nette (VAN) des flux de trésorerie d’un investissement. Il se calcule en résolvant l’équation somme des flux actualisés égale zéro, généralement via un logiciel."
            }
          },
          {
            "@type": "Question",
            "name": "Comment calculer le TRI ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Le calcul du TRI est itératif et s’appuie sur la recherche du taux d’actualisation pour lequel la somme des flux actualisés est nulle, ce qui correspond à la rentabilité réelle de l’investissement."
            }
          }
        ]
      });
      this.renderer.appendChild(document.head, script);
    }
  }
  Element: string[] = ['Investissement initial', 'Revenus locatifs par an net', 'Revente du bien', 'Nombre d’années'];
  values: { [key: string]: number } = {};
  tri: number | null = null;

  // Fonction de calcul du TRI
  calculTRI() {
    const investment = this.values['Investissement initial']; 
    const revenues = this.values['Revenus locatifs par an net']; 
    const resale = this.values['Revente du bien']; 
    const years = this.values['Nombre d’années']; 

    const cashFlows = [-investment]; 

    for (let i = 1; i <= years; i++) {
      cashFlows.push(revenues); 
    }

    cashFlows.push(resale);
    this.tri = this.calculateIRR(cashFlows);
  }

  calculateIRR(cashFlows: number[]): number {
    let guess = 0.1; 
    const tolerance = 0.0001; 
    let iteration = 0;

    while (iteration < 1000) {
      iteration++;
      let npv = 0;
      let derivative = 0;

      for (let t = 0; t < cashFlows.length; t++) {
        npv += cashFlows[t] / Math.pow(1 + guess, t); 
        derivative -= t * cashFlows[t] / Math.pow(1 + guess, t + 1); // Dérivée de la VAN par rapport au taux
      }

      if (Math.abs(npv) < tolerance) {
        return guess;
      }
      
      guess = guess - npv / derivative;
    }
    return guess;
  }
}
