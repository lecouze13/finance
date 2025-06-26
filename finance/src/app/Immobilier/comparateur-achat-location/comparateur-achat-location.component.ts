import { Component, OnInit, Renderer2 } from '@angular/core';
import { SeoService } from '../../Constructor/service/seo.service'; import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';@Component({
  selector: 'app-comparateur-achat-location',
  templateUrl: './comparateur-achat-location.component.html',
  styleUrls: ['./comparateur-achat-location.component.scss']
})
export class ComparateurAchatLocationComponent implements OnInit {

  constructor(  @Inject(PLATFORM_ID) private platformId: any, 
private renderer: Renderer2, private seo: SeoService) { }

  champs: string[] = [
    'Prix du bien',
    'Durée du prêt (années)',
    'Taux d’intérêt (%)',
    'Frais de notaire (%)',
    'Valorisation annuelle du bien (%)',
    'Loyer mensuel sans les charges',
    'Charges de copropriété annuelles',
    'Taxe foncière annuelle',
    'Assurance habitation annuelle',
    'Entretien annuel',
    'Taux de rendement de l’investissement (%)'
  ];

  valeurs: { [key: string]: number } = {

    'Prix du bien': 0,
    'Durée du prêt (années)': 0,
    'Taux d’intérêt (%)': 0,
    'Frais de notaire (%)': 0,
    'Valorisation annuelle du bien (%)': 0,
    'Loyer mensuel': 0,
    'Charges de copropriété annuelles': 0,
    'Taxe foncière annuelle': 0,
    'Assurance habitation annuelle': 0,
    'Entretien annuel': 0,
    'Taux de rendement de l’investissement (%)': 0
  };

  resultat: string | null = null;
  afficherGraph = false;

  lineChartLabels: string[] = [];
  lineChartData: any[] = [];

  pointIntersectionIndex: number | null = null;

  chartOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Comparatif Patrimoine Net Achat vs Location + Investissement'
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString('fr-FR')} €`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => value.toLocaleString('fr-FR') + ' €'
        }
      }
    }
  };

  estValide(): boolean {
    return this.champs.every(champ => this.valeurs[champ] != null);
  }
  estTaux(champ: string): boolean {
    return champ === 'Taux d’intérêt (%)' || champ === 'Taux de rendement de l’investissement (%)' || champ === 'Valorisation annuelle du bien (%)';
  }
  comparer() {
    const prix = this.valeurs['Prix du bien'] || 0;
    const duree = this.valeurs['Durée du prêt (années)'] || 0;
    const taux = this.valeurs['Taux d’intérêt (%)'] || 0;
    const fraisNotaire = this.valeurs['Frais de notaire (%)'] || 0;
    const valorisation = this.valeurs['Valorisation annuelle du bien (%)'] || 0;
    const loyerMensuel = this.valeurs['Loyer mensuel'] || 0;
    const chargesCopro = this.valeurs['Charges de copropriété annuelles'] || 0;
    const taxeFonciere = this.valeurs['Taxe foncière annuelle'] || 0;
    const assurance = this.valeurs['Assurance habitation annuelle'] || 0;
    const entretien = this.valeurs['Entretien annuel'] || 0;
    const rendementInvest = this.valeurs['Taux de rendement de l’investissement (%)'] || 0;

    const montantNotaire = prix * (fraisNotaire / 100);
    const mensualite = this.calcMensualite(prix, taux / 100, duree);

    let cumulLocation = 0;
    let cumulAchatDepense = 0;
    let portefeuille = 0;

    const labels: string[] = [];
    const patrimoineAchat: number[] = [];
    const patrimoineLocation: number[] = [];

    let capitalRembourse = 0;
    let intersectionFound = false;
    this.pointIntersectionIndex = null;
    for (let an = 1; an <= duree; an++) {
      const coutAnnuelLocation = loyerMensuel * 12 + chargesCopro + assurance;
      cumulLocation += coutAnnuelLocation;

      const coutAnnuelAchat = mensualite * 12 + chargesCopro + taxeFonciere + assurance + entretien;
      cumulAchatDepense += coutAnnuelAchat;

      const economieAnnuelle = coutAnnuelAchat - coutAnnuelLocation;

      portefeuille *= 1 + rendementInvest / 100;
      if (economieAnnuelle > 0) {
        portefeuille += economieAnnuelle;
      }
      capitalRembourse = this.calcCapitalRembourse(prix, taux / 100, duree, an);
      const valeurBien = prix * Math.pow(1 + valorisation / 100, an);
      console.log(valeurBien)
      const capitalRestantDu = prix - capitalRembourse;
      const valeurNetteAchat = valeurBien - capitalRestantDu - montantNotaire;

      labels.push(`Année ${an}`);
      patrimoineAchat.push(+valeurNetteAchat.toFixed(2));
      patrimoineLocation.push(+portefeuille.toFixed(2));
      if (!intersectionFound && valeurNetteAchat > portefeuille) {
        intersectionFound = true;
        this.pointIntersectionIndex = an - 1; // indice tableau (0-based)
      }

    }

    this.lineChartLabels = labels;
    this.lineChartData = [
      { data: patrimoineAchat, label: 'Achat (valeur nette)', borderColor: 'green', fill: false },
      { data: patrimoineLocation, label: 'Location + investissement (valeur nette)', borderColor: 'orange', fill: false }
    ];

    // Ajouter dataset spécial pour point intersection si trouvé
    if (this.pointIntersectionIndex !== null) {
      const pointX = labels[this.pointIntersectionIndex];
      const pointY = patrimoineAchat[this.pointIntersectionIndex];

      this.lineChartData.push({
        label: 'Point d\'intersection',
        data: Array(labels.length).fill(null).map((_, i) =>
          i === this.pointIntersectionIndex ? pointY : null
        ),
        pointBackgroundColor: 'red',
        pointBorderColor: 'red',
        pointRadius: 7,
        showLine: false, // juste le point
        fill: false
      });
    }
    this.afficherGraph = true;
    this.resultat = `
    Après ${duree} ans :
    - Patrimoine net achat : ${patrimoineAchat[duree - 1].toFixed(2)} €
    - Patrimoine net location + investissement : ${patrimoineLocation[duree - 1].toFixed(2)} €
    ${this.pointIntersectionIndex !== null
        ? `- Achat dépasse location + investissement à l'année ${this.pointIntersectionIndex + 1} avec une valeur de ${patrimoineAchat[this.pointIntersectionIndex].toFixed(2)} €`
        : '- Achat ne dépasse jamais location + investissement pendant la période étudiée.'}
    `;
  }

  calcMensualite(capital: number, tauxAnnuel: number, dureeAnnees: number): number {
    const tauxMensuel = tauxAnnuel / 12;
    const n = dureeAnnees * 12;
    return capital * (tauxMensuel) / (1 - Math.pow(1 + tauxMensuel, -n));
  }

  calcCapitalRembourse(capital: number, tauxAnnuel: number, dureeAnnees: number, nbAnnees: number): number {
    const tauxMensuel = tauxAnnuel / 12;
    const n = dureeAnnees * 12;
    const p = nbAnnees * 12;

    const mensualite = this.calcMensualite(capital, tauxAnnuel, dureeAnnees);

    const capitalRestant = capital * Math.pow(1 + tauxMensuel, p) - mensualite * ((Math.pow(1 + tauxMensuel, p) - 1) / tauxMensuel);

    return capital - capitalRestant;
  }


  ngOnInit() {
    this.seo.updateMetaData({
      title: 'Comparateur achat vs location 2025 | CalculateurFinance.fr',
      description: 'Comparez facilement les coûts et avantages entre acheter et louer un bien immobilier avec notre simulateur simple et gratuit.',
      url: 'https://calculateurfinance.fr/achat-vs-location/',
      keywords: 'simulateur achat vs location, calcul achat immobilier, comparaison achat location, simulation investissement immobilier, coût location vs achat, frais achat immobilier, simulation budget immobilier',
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
          "name": "Quelles sont les principales différences entre acheter et louer ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Acheter implique un investissement initial et un crédit, tandis que louer permet plus de flexibilité sans engagement à long terme."
          }
        },
        {
          "@type": "Question",
          "name": "Quels coûts faut-il prendre en compte lors de l’achat ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le prix du bien, les frais de notaire, les intérêts d’emprunt, les charges de copropriété, la taxe foncière et l’entretien."
          }
        },
        {
          "@type": "Question",
          "name": "Quels sont les avantages de la location ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Moins d’engagement financier, pas de charges liées à la propriété, et plus de mobilité."
          }
        },
        {
          "@type": "Question",
          "name": "Comment comparer les coûts entre achat et location ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "En calculant le coût total mensuel de chaque option, incluant l’ensemble des frais et avantages fiscaux éventuels."
          }
        },
        {
          "@type": "Question",
          "name": "L’achat est-il toujours plus rentable que la location ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pas forcément, cela dépend de la durée de détention, de l’évolution du marché et des taux d’intérêt."
          }
        },
        {
          "@type": "Question",
          "name": "Quels risques sont associés à l’achat immobilier ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Risque de baisse de la valeur du bien, charges imprévues, et engagement à long terme."
          }
        },
        {
          "@type": "Question",
          "name": "Quels sont les avantages fiscaux de l’achat ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Possibilité de déduire certains intérêts d’emprunt, travaux, et avantages liés au dispositif Pinel ou LMNP."
          }
        },
        {
          "@type": "Question",
          "name": "Comment prendre en compte la valorisation du bien ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "La plus-value potentielle peut être intégrée dans la rentabilité globale de l’achat."
          }
        },
        {
          "@type": "Question",
          "name": "La location peut-elle être déductible fiscalement ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Non, les loyers ne sont pas déductibles fiscalement, sauf cas particuliers comme la location meublée professionnelle."
          }
        },
        {
          "@type": "Question",
          "name": "Où puis-je simuler un comparateur achat vs location ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Utilisez notre outil gratuit en ligne sur CalculateurFinance.fr pour estimer votre situation."
          }
        }
      ]
    });
    this.renderer.appendChild(document.head, script);


    const isSmallScreen = window.innerWidth <= 400;

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: isSmallScreen ? 'bottom' : 'top',
          labels: {
            font: {
              size: isSmallScreen ? 10 : 12
            }
          }
        },
        title: {
          display: true,
          text: 'Comparatif Patrimoine Net Achat vs Location + Investissement',
          font: {
            size: isSmallScreen ? 12 : 16
          }
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: (context: any) => {
              return `${context.dataset.label}: ${context.parsed.y.toLocaleString('fr-FR')} €`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value: number) => value.toLocaleString('fr-FR') + ' €',
            font: {
              size: isSmallScreen ? 10 : 12
            }
          }
        },
        x: {
          ticks: {
            font: {
              size: isSmallScreen ? 10 : 12
            }
          }
        }
      }
    };
  }
}

}
