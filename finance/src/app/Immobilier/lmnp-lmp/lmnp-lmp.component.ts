import { Component } from '@angular/core';

@Component({
  selector: 'app-lmnp-lmp',
   templateUrl: './lmnp-lmp.component.html',
  styleUrls: ['./lmnp-lmp.component.scss']

})
export class LmnpLmpComponent {
  // Options du dropdown régime fiscal
    regimes = [
      { label: 'Micro-BIC', value: 'micro-bic' },
      { label: 'Régime réel', value: 'reel' }
    ];
  
    selectedRegime?: string;
  
    // Inputs utilisateurs
    revenus: number | null = null;         // Revenus locatifs annuels
    charges: number | null = null;         // Charges annuelles (réel)
    interets: number | null = null;        // Intérêts d'emprunt (réel)
    amortissements: number | null = null;  // Amortissements annuels (réel)
  
    // Résultats calculés
    resultatMicroBic?: number;
    resultatReel?: number;
  
    get isMicroBic(): boolean {
      return this.selectedRegime === 'micro-bic';
    }
  
    get isReel(): boolean {
      return this.selectedRegime === 'reel';
    }
  
    // Méthode appelée au changement de régime
    onRegimeChange() {
      this.resultatMicroBic = undefined;
      this.resultatReel = undefined;
      this.charges = null;
      this.interets = null;
      this.amortissements = null;
    }
  
    // Calcul fiscalité selon le régime sélectionné
    calculerFiscalite(): void {
      if (!this.revenus || this.revenus <= 0) {
        alert("Veuillez saisir des revenus locatifs valides.");
        return;
      }
  
      if (this.isMicroBic) {
        // Micro-BIC = abattement forfaitaire 50%
        this.resultatMicroBic = Math.max(0, this.revenus * 0.5);
        this.resultatReel = undefined;
  
      } else if (this.isReel) {
        // Validation des champs régime réel
        const chargesVal = this.charges ?? 0;
        const interetsVal = this.interets ?? 0;
        const amortissementsVal = this.amortissements ?? 0;
  
        // Résultat fiscal = Revenus - Charges - Intérêts - Amortissements
        let resultat = this.revenus - chargesVal - interetsVal - amortissementsVal;
  
        // Le résultat ne peut pas être négatif en fiscalité LMNP
        this.resultatReel = Math.max(0, resultat);
        this.resultatMicroBic = undefined;
  
      } else {
        alert("Veuillez sélectionner un régime fiscal.");
        this.resultatMicroBic = undefined;
        this.resultatReel = undefined;
      }
    }
  }
  
  
