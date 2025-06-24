import { Component, OnInit } from '@angular/core';

interface Ticker {
  label: string;
  value: string;
  rendementDividende: number; // % dividende initial (ex: 1.95)
}

@Component({
  selector: 'app-simulateur-dividend-fire',
  templateUrl: './simulateur-dividend-fire.component.html',
  styleUrls: ['./simulateur-dividend-fire.component.scss']
})
export class SimulateurDividendFireComponent implements OnInit {
  // Dropdown tickers simulés (exemples)
  tickers: Ticker[] = [
    { label: 'TotalEnergies (TTE)', value: 'TTE', rendementDividende: 5.2 },
    { label: 'Sanofi (SAN)', value: 'SAN', rendementDividende: 3.3 },
    { label: 'LVMH (MC)', value: 'MC', rendementDividende: 1.5 },
    { label: 'Air Liquide (AI)', value: 'AI', rendementDividende: 2.5 },
  ];

  selectedTicker?: Ticker;

  capitalInitial: number = 10000;
  tauxCroissanceDividende: number = 5; // en %
  dureeAnnee: number = 20;

  rendementDividende: number = 0; // sera initialisé lors du choix du ticker

  results: Array<{ annee: number; capital: number; dividende: number; revenu: number }> = [];

  chartData: any;
  chartOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };

  ngOnInit() {
    // Par défaut on sélectionne le premier ticker
    if (this.tickers.length > 0) {
      this.selectedTicker = this.tickers[0];
      this.loadDividendAndSimulate();
    }
  }

  loadDividendAndSimulate() {
    if (this.selectedTicker) {
      this.rendementDividende = this.selectedTicker.rendementDividende;
      this.simulate();
    }
  }

  simulate() {
    this.results = [];

    let capital = this.capitalInitial;
    let rendement = this.rendementDividende / 100;
    let croissance = this.tauxCroissanceDividende / 100;

    // Dividende initial sur capital initial
    let dividende = capital * rendement;

    for (let an = 1; an <= this.dureeAnnee; an++) {
      const revenu = dividende;

      capital += revenu; // réinvestissement dividendes

      // Croissance dividende selon capital actuel et taux croissance cumulée
      dividende = capital * rendement * Math.pow(1 + croissance, an);

      this.results.push({
        annee: an,
        capital: Math.round(capital * 100) / 100,
        dividende: Math.round(dividende * 100) / 100,
        revenu: Math.round(revenu * 100) / 100,
      });
    }

    this.updateChart();
  }

  updateChart() {
    this.chartData = {
      labels: this.results.map(r => r.annee.toString()),
      datasets: [
        {
          label: 'Capital (€)',
          data: this.results.map(r => r.capital),
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.4
        },
        {
          label: 'Revenu dividendes annuel (€)',
          data: this.results.map(r => r.revenu),
          fill: false,
          borderColor: '#66BB6A',
          tension: 0.4
        }
      ]
    };
  }
}
