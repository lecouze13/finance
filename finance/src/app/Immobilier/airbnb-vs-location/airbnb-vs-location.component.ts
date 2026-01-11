import {
  Component,
  OnInit,
  Renderer2,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../Constructor/service/seo.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-airbnb-vs-location',
  templateUrl: './airbnb-vs-location.component.html',
  standalone: false
})
export class AirbnbVsLocationComponent {
  // Données d'entrée (exemple)
  loyerMensuelClassique: number = 1200;
  tauxOccupationAirbnb: number = 70; // en %
  loyerNuitAirbnb: number = 80;
  fraisGestionAirbnb: number = 15; // en % des revenus Airbnb
  dureeSimulation: number = 10; // en années

  resultat: {
    revenuLocationClassiqueTotal: number;
    revenuAirbnbTotal: number;
    ecart: number;
    avantage: string;
  } = {
    revenuLocationClassiqueTotal: 0,
    revenuAirbnbTotal: 0,
    ecart: 0,
    avantage: '',
  };

  simulationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private seo: SeoService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.simulationForm = this.fb.group({
      loyerMensuelClassique: [null],
      tauxOccupationAirbnb: [null],
      loyerNuitAirbnb: [null],
      fraisGestionAirbnb: [null],
      dureeSimulation: [10],
    });
  }

  ngOnInit(): void {
    this.seo.updateMetaData({
      title:
        'Simulateur Airbnb vs Location Classique : Calculez la rentabilité',
      description:
        'Comparez la rentabilité de votre investissement immobilier entre location classique et location Airbnb avec notre simulateur simple et rapide.',
      url: 'https://calculateurfinance.fr/airbnb-vs-location/',
      keywords:
        'simulateur airbnb, location classique, rentabilité location, investissement immobilier, comparaison location airbnb',
    });

    if (isPlatformBrowser(this.platformId)) {
      const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Quelle est la différence entre location Airbnb et location classique ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'La location Airbnb correspond à une location courte durée souvent plus flexible et rémunératrice, tandis que la location classique est une location longue durée avec une gestion plus stable et régulière.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quels sont les frais spécifiques à la location Airbnb ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les frais de gestion Airbnb, les coûts de nettoyage, ainsi que les charges variables plus élevées liées à la rotation fréquente des locataires.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment est calculée la rentabilité dans ce simulateur ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le simulateur calcule les revenus bruts annuels, les charges et les frais de gestion pour estimer la rentabilité nette de chaque type de location.',
            },
          },
          {
            '@type': 'Question',
            name: 'La fiscalité est-elle différente entre Airbnb et location classique ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Non, dans les deux cas, les revenus locatifs sont imposés au titre des Bénéfices Industriels et Commerciaux (BIC), avec les mêmes options de régime micro-BIC ou réel.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quelle est la vacance locative moyenne en Airbnb comparée à la location classique ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'La vacance locative en Airbnb est souvent plus élevée à cause de la rotation rapide des locataires, tandis que la location classique offre généralement une occupation plus stable.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quels sont les risques liés à la location Airbnb ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les risques incluent une gestion plus chronophage, une réglementation locale parfois stricte, ainsi que la variabilité des revenus liée à la saisonnalité.',
            },
          },
          {
            '@type': 'Question',
            name: 'Peut-on simuler un scénario mixte entre location Airbnb et location classique ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le simulateur compare les deux modèles séparément, mais vous pouvez ajuster les paramètres pour estimer une utilisation mixte.',
            },
          },
        ],
      };

      const script = this.renderer.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(faqJsonLd);
      this.renderer.appendChild(document.head, script);
    }

    this.calculer();
  }
  calculer() {
    const form = this.simulationForm.value;

    const dureeEnMois = form.dureeSimulation * 12;

    // Revenu location classique
    const revenuLocationClassiqueTotal =
      form.loyerMensuelClassique * dureeEnMois;

    // Revenu brut Airbnb (nombre de jours par an × taux d’occupation × loyer nuit)
    const joursAn = 365;
    const tauxOccupation = form.tauxOccupationAirbnb / 100;
    const revenuBrutAnnuelAirbnb =
      joursAn * tauxOccupation * form.loyerNuitAirbnb;
    const revenuNetAnnuelAirbnb =
      revenuBrutAnnuelAirbnb * (1 - form.fraisGestionAirbnb / 100);
    const revenuAirbnbTotal = revenuNetAnnuelAirbnb * form.dureeSimulation;

    // Différence
    const ecart = revenuAirbnbTotal - revenuLocationClassiqueTotal;

    this.resultat = {
      revenuLocationClassiqueTotal,
      revenuAirbnbTotal,
      ecart,
      avantage:
        ecart > 0 ? 'Airbnb' : ecart < 0 ? 'Location classique' : 'Égalité',
    };
  }
}
