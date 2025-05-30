import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ChartModule } from 'primeng/chart';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-comparateur-achat-location',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputNumberModule,
    ButtonModule,
    FloatLabelModule,
    ChartModule,
    RouterModule
  ],
  templateUrl: './comparateur-achat-location.component.html',
  styleUrls: ['./comparateur-achat-location.component.scss']
})
export class ComparateurAchatLocationComponent {
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
    // 'Prix du bien': 300000,
    // 'Durée du prêt (années)': 20,
    // 'Taux d’intérêt (%)': 4,
    // 'Frais de notaire (%)': 8,
    // 'Valorisation annuelle du bien (%)': 1,
    // 'Loyer mensuel': 1500,
    // 'Charges de copropriété annuelles': 1500,
    // 'Taxe foncière annuelle': 2500,
    // 'Assurance habitation annuelle': 2000,
    // 'Entretien annuel': 2500,
    // 'Taux de rendement de l’investissement (%)': 10
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
    return champ === 'Taux d’intérêt (%)'||champ ==='Taux de rendement de l’investissement (%)'||champ ==='Valorisation annuelle du bien (%)';
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

      const economieAnnuelle = coutAnnuelAchat-coutAnnuelLocation ;

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
    - Patrimoine net achat : ${patrimoineAchat[duree-1].toFixed(2)} €
    - Patrimoine net location + investissement : ${patrimoineLocation[duree-1].toFixed(2)} €
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

    const capitalRestant = capital * Math.pow(1 + tauxMensuel, p) - mensualite * ( (Math.pow(1 + tauxMensuel, p) -1) / tauxMensuel );

    return capital - capitalRestant;
  }
}
