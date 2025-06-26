import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeoService } from '../../Constructor/service/seo.service';

@Component({
  selector: 'app-simulateur-apport-vs-emprunt',
  templateUrl: './simulateur-apport-vs-emprunt.component.html',
  styleUrls: ['./simulateur-apport-vs-emprunt.component.scss'],
})
export class SimulateurApportVsEmpruntComponent {
  form: FormGroup;
  resultat: any = null;
  comparatifChartOptions: any;
  comparatifChartData: any;
  mensualitesAvecApportAnnee: number = 0;
  mensualitesSansApportAnnee: number = 0;
  mensualitesChartData: any;
  coutsChartData: any;
  chartOptions: any;
  ngOnInit() {
    this.seo.updateMetaData({
      title: 'Comparateur achat vs emprunt 2025 | CalculateurFinance.fr',
      description:
        "Comparez facilement la retabilité entre faire un apport ou non lors d' un crédit immobilier",
      url: 'https://calculateurfinance.fr/simulateur-apport-vs-emprunt/',
      keywords: 'simulateur apport, simulateur emprunt, calcul apport personnel, simulation crédit immobilier, comparaison apport emprunt, capacité d’emprunt, prêt immobilier, financement achat immobilier',

    });
    if (isPlatformBrowser(this.platformId)) {
      const script = this.renderer.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Faut-il mettre un apport pour acheter un bien immobilier ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Mettre un apport permet de réduire le montant emprunté et donc les mensualités et le coût total du crédit. Mais ce capital immobilisé ne pourra pas être investi ailleurs pour générer du rendement.',
            },
          },
          {
            '@type': 'Question',
            name: 'Est-ce rentable d’investir son apport au lieu de le placer dans le bien ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Oui, si le rendement net de l’investissement est supérieur au taux du crédit, cela peut être plus rentable de financer intégralement le bien et d’investir l’apport.',
            },
          },
          {
            '@type': 'Question',
            name: 'Comment fonctionne ce simulateur apport vs emprunt ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le simulateur calcule les mensualités et le coût total d’un crédit avec et sans apport, puis estime la performance de l’apport s’il avait été investi à un certain taux pendant la durée du crédit.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quels paramètres dois-je renseigner ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Vous devez indiquer le montant du bien, le montant de votre apport, la durée et le taux du crédit, ainsi que le taux de rendement espéré si vous investissez votre apport.',
            },
          },
          {
            '@type': 'Question',
            name: 'Dois-je inclure les frais de notaire dans le montant du bien ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Oui, idéalement. Cela donne une vision plus complète du coût total de l’opération immobilière.',
            },
          },
          {
            '@type': 'Question',
            name: 'Le simulateur prend-il en compte les impôts ou les frais de gestion ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Non, le simulateur simplifie les calculs. Il n’intègre pas encore les frais de gestion ou la fiscalité sur l’investissement de l’apport. Vous pouvez les estimer séparément.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quel rendement espérer en investissant mon apport ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Cela dépend du support choisi. Historiquement, les actions rapportent entre 5 et 8% brut/an, mais avec un certain risque. Un livret A ne rapporte qu’environ 3% sans risque.',
            },
          },
          {
            '@type': 'Question',
            name: 'Combien puis-je gagner en investissant plutôt que de faire un apport ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le gain dépend de la différence entre le coût du crédit supplémentaire et le rendement de l’investissement. Le simulateur vous donne une estimation nette.',
            },
          },
          {
            '@type': 'Question',
            name: 'Peut-on emprunter sans apport en 2025 ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Oui, c’est possible mais plus difficile. Les banques exigent souvent un apport pour couvrir au moins les frais de notaire. Un bon dossier peut compenser cette exigence.',
            },
          },
          {
            '@type': 'Question',
            name: 'Ce simulateur est-il fiable pour prendre une décision ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Il fournit une base chiffrée solide, mais ne remplace pas un conseil personnalisé. Intégrez aussi vos objectifs patrimoniaux, votre profil de risque et votre horizon d’investissement.',
            },
          },
        ],
      });
      this.renderer.appendChild(document.head, script);
    }
  }
  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: any,
    private renderer: Renderer2,
    private seo: SeoService
  ) {
    this.form = this.fb.group({
      montantBien: [300000, [Validators.required]],
      apport: [50000, [Validators.required]],
      dureeCredit: [20, [Validators.required]],
      tauxCredit: [2.5, [Validators.required]],
      tauxInvestissement: [5, [Validators.required]],
    });
    this.initChartOptions();
  }

  initChartOptions() {
    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context: any) =>
              context.dataset.label +
              ' : ' +
              context.raw.toLocaleString('fr-FR', {
                style: 'currency',
                currency: 'EUR',
              }),
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value: number) =>
              value.toLocaleString('fr-FR', {
                style: 'currency',
                currency: 'EUR',
              }),
          },
        },
      },
    };
  }
  calculer() {
    const montantBien = this.form.value.montantBien;
    const apport = this.form.value.apport;
    const duree = this.form.value.dureeCredit;
    const tauxCredit = this.form.value.tauxCredit / 100;
    const tauxInvestissement = this.form.value.tauxInvestissement / 100;

    const nbMois = duree * 12;

    // Calcul mensualité
    const montantEmpruntAvecApport = montantBien - apport;
    const montantEmpruntSansApport = montantBien;
    const mensualiteAvecApport = this.calculerMensualite(
      montantEmpruntAvecApport,
      tauxCredit,
      nbMois
    );
    const mensualiteSansApport = this.calculerMensualite(
      montantEmpruntSansApport,
      tauxCredit,
      nbMois
    );

    // Labels : années
    const labels = Array.from({ length: duree }, (_, i) => `Année ${i + 1}`);

    // Données année par année

    const coutsAvecApportCumul = [];
    const coutsSansApportCumul = [];
    const capitalInvestiAnnee = [];
    const gainNetAnnee = [];

    for (let annee = 1; annee <= duree; annee++) {
      const moisCumules = annee * 12;

      // Coût total cumulé à l'année
      const coutAvecApport = mensualiteAvecApport * moisCumules;
      const coutSansApport = mensualiteSansApport * moisCumules;

      // Capital investi à la fin de l'année (intérêt composé mensuel)
      const capital =
        apport * Math.pow(1 + tauxInvestissement / 12, moisCumules);

      // Gain net estimé à l'année
      const gainNet = capital - (coutSansApport - coutAvecApport);

      this.mensualitesAvecApportAnnee = mensualiteAvecApport;
      this.mensualitesSansApportAnnee = mensualiteSansApport;
      coutsAvecApportCumul.push(coutAvecApport);
      coutsSansApportCumul.push(coutSansApport);
      capitalInvestiAnnee.push(capital);
      gainNetAnnee.push(gainNet);
    }

    this.resultat = {
      mensualiteAvecApport,
      mensualiteSansApport,
      coutTotalAvecApport: mensualiteAvecApport * nbMois,
      coutTotalSansApport: mensualiteSansApport * nbMois,
      capitalFinalInvesti: capitalInvestiAnnee[duree - 1],
      gainNetSansApport: gainNetAnnee[duree - 1],
    };

    this.comparatifChartData = {
      labels,
      datasets: [
        // {
        //   label: 'Mensualité avec apport',
        //   borderColor: '#42A5F5',
        //   backgroundColor: 'transparent',
        //   data: mensualitesAvecApportAnnee,
        //   fill: false,
        // },
        // {
        //   label: 'Mensualité sans apport',
        //   borderColor: '#66BB6A',
        //   backgroundColor: 'transparent',
        //   data: mensualitesSansApportAnnee,
        //   fill: false,
        // },
        // {
        //   label: 'Coût total cumulé avec apport',
        //   borderColor: '#FFA726',
        //   backgroundColor: 'transparent',
        //   data: coutsAvecApportCumul,
        //   fill: false,
        // },
        // {
        //   label: 'Coût total cumulé sans apport',
        //   borderColor: '#EF5350',
        //   backgroundColor: 'transparent',
        //   data: coutsSansApportCumul,
        //   fill: false,
        // },
        {
          label: 'Gain net en investissant l\'apport au lieu de l\'utiliser (sans apport)',
          borderColor: '#26C6DA',
          backgroundColor: 'transparent',
          data: capitalInvestiAnnee,
          fill: false,
        },
        {
          label: 'Avantage net stratégie avec apport utilisé dans le crédit (avec apport)',
          borderColor: '#AB47BC',
          backgroundColor: 'transparent',
          data: gainNetAnnee,
          fill: false,
        },
      ],
    };

    this.comparatifChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const value = context.raw.toLocaleString('fr-FR', {
                style: 'currency',
                currency: 'EUR',
              });
              return `${context.dataset.label} : ${value}`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value: number) =>
              value.toLocaleString('fr-FR', {
                style: 'currency',
                currency: 'EUR',
              }),
          },
        },
        x: {
          title: {
            display: true,
            text: 'Années',
          },
        },
      },
    };
  }

  calculerMensualite(
    capital: number,
    tauxAnnuel: number,
    dureeMois: number
  ): number {
    const tauxMensuel = tauxAnnuel / 12;
    if (tauxMensuel === 0) {
      return capital / dureeMois;
    }
    return (
      capital * (tauxMensuel / (1 - Math.pow(1 + tauxMensuel, -dureeMois)))
    );
  }
}
