import { Component } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-comparateur-achat-location',
  templateUrl: './comparateur-achat-location.component.html',
  styleUrls: ['./comparateur-achat-location.component.scss']
})
export class ComparateurAchatLocationComponent {
  champs: string[] = [
    'Prix du bien',
    'Durée du prêt (années)',
    'Taux d’intérêt (%)',
    'Loyer mensuel',
    'Charges de copropriété annuelles',
    'Taxe foncière annuelle',
    'Assurance habitation annuelle',
    'Entretien annuel'
  ];
  
  valeurs: { [key: string]: number } = {};
  resultat: string | null = null;

  public afficherGraph = false;

  public lineChartLabels: string[] = [];
  public lineChartData: any[] = [
    { data: [], label: 'Achat (cumulé)', borderColor: 'green', fill: false },
    { data: [], label: 'Location (cumulé)', borderColor: 'blue', fill: false }
  ];
  public lineChartType = 'line';

  estValide(): boolean {
    return this.champs.every(champ => this.valeurs[champ] != null);
  }

  comparer() {
    const prix = this.valeurs['Prix du bien'] || 0;
    const duree = this.valeurs['Durée du prêt (années)'] || 0;
    const taux = this.valeurs['Taux d’intérêt (%)'] || 0;
    const loyerMensuel = this.valeurs['Loyer mensuel'] || 0;
    const chargesCopro = this.valeurs['Charges de copropriété annuelles'] || 0;
    const taxeFonciere = this.valeurs['Taxe foncière annuelle'] || 0;
    const assurance = this.valeurs['Assurance habitation annuelle'] || 0;
    const entretien = this.valeurs['Entretien annuel'] || 0;

    const coutCredit = prix * (taux / 100) * duree;
    const coutTotalAchat = prix + coutCredit;

    let cumulAchat = 0;
    let cumulLocation = 0;

    const labels: string[] = [];
    const achatData: number[] = [];
    const locationData: number[] = [];

    for (let an = 1; an <= duree; an++) {
      const coutAnnuelAchat = coutTotalAchat / duree + chargesCopro + taxeFonciere + assurance + entretien;
      const coutAnnuelLocation = loyerMensuel * 12 + chargesCopro + assurance;

      cumulAchat += coutAnnuelAchat;
      cumulLocation += coutAnnuelLocation;

      labels.push(`Année ${an}`);
      achatData.push(+cumulAchat.toFixed(2));
      locationData.push(+cumulLocation.toFixed(2));
    }

    this.lineChartLabels = labels;
    this.lineChartData = [
      { data: achatData, label: 'Achat (cumulé)', borderColor: 'green', fill: false },
      { data: locationData, label: 'Location (cumulé)', borderColor: 'blue', fill: false }
    ];

    this.afficherGraph = true;

    if (cumulAchat < cumulLocation) {
      this.resultat = `Acheter est plus économique d'environ ${(cumulLocation - cumulAchat).toFixed(2)} € après ${duree} ans.`;
    } else if (cumulLocation < cumulAchat) {
      this.resultat = `Louer est plus économique d'environ ${(cumulAchat - cumulLocation).toFixed(2)} € après ${duree} ans.`;
    } else {
      this.resultat = "Les coûts totaux sont équivalents après " + duree + " ans.";
    }
  }
}
