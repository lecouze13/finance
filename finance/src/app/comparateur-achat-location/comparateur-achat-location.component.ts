import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comparateur-achat-location',
  standalone: true,
  imports: [CommonModule, FormsModule, InputNumberModule, ButtonModule, FloatLabelModule],
  templateUrl: './comparateur-achat-location.component.html',
  styleUrl: './comparateur-achat-location.component.scss'
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
  
  // Exemple de validation simple (tu peux adapter)
  estValide(): boolean {
    return this.champs.every(champ => this.valeurs[champ] !== undefined && this.valeurs[champ] !== null);
  }
  
  // Exemple de méthode comparer (simplifiée)
  comparer() {
    // Récupère les valeurs
    const prix = this.valeurs['Prix du bien'] || 0;
    const duree = this.valeurs['Durée du prêt (années)'] || 0;
    const taux = this.valeurs['Taux d’intérêt (%)'] || 0;
    const loyerMensuel = this.valeurs['Loyer mensuel'] || 0;
    const chargesCopro = this.valeurs['Charges de copropriété annuelles'] || 0;
    const taxeFonciere = this.valeurs['Taxe foncière annuelle'] || 0;
    const assurance = this.valeurs['Assurance habitation annuelle'] || 0;
    const entretien = this.valeurs['Entretien annuel'] || 0;
  
    // Calcul coûts achat (simplifié)
    const coutCredit = prix * (taux / 100) * duree; // intérêt total approximatif
    const coutAnnuelAchat = (coutCredit / duree) + chargesCopro + taxeFonciere + assurance + entretien;
  
    // Calcul coûts location
    const coutAnnuelLocation = loyerMensuel * 12 + chargesCopro + assurance;
  
    // Résultat simplifié
    if (coutAnnuelAchat < coutAnnuelLocation) {
      this.resultat = `Acheter est plus économique d'environ ${ (coutAnnuelLocation - coutAnnuelAchat).toFixed(2) } € par an.`;
    } else if (coutAnnuelLocation < coutAnnuelAchat) {
      this.resultat = `Louer est plus économique d'environ ${ (coutAnnuelAchat - coutAnnuelLocation).toFixed(2) } € par an.`;
    } else {
      this.resultat = "Les coûts annuels sont équivalents entre achat et location.";
    }
  }
}

