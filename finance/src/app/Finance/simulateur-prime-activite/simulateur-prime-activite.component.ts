import { Component } from '@angular/core';

@Component({
  selector: 'app-simulateur-prime-activite',
  templateUrl: './simulateur-prime-activite.component.html',
})
export class SimulateurPrimeActiviteComponent {
  revenusMensuels = 0;
  autresRevenus = 0;
  statut = '';
  nombreEnfants = 0;
  estParentIsole = false;
  loyerOuAide = 0;

  prime = 0;
  resultatVisible = false;

  statuts = [
    { label: 'Célibataire sans enfant', value: 'celibataire' },
    { label: 'En couple', value: 'couple' },
    { label: 'Parent isolé', value: 'parent_iso' }
  ];

  calculerPrime(): void {
    const revenus = this.revenusMensuels + this.autresRevenus;
    const montantForfaitaire = this.getMontantForfaitaire();
    const majoration = this.getMajoration();
    const bonification = this.getBonification(revenus);
    const forfaitLogement = this.getForfaitLogement();

    const base = montantForfaitaire + majoration + bonification - forfaitLogement;

    this.prime = Math.max(base - revenus, 0);
    this.resultatVisible = true;
  }

  getMontantForfaitaire(): number {
    switch (this.statut) {
      case 'celibataire':
        return 622.63;
      case 'couple':
        return 933.95;
      case 'parent_iso':
        return 622.63 + 124.53; // majoration isolement automatique
      default:
        return 0;
    }
  }

  getMajoration(): number {
    if (this.statut === 'parent_iso') {
      return this.nombreEnfants * 165.83;
    }
    if (this.statut === 'couple') {
      return this.nombreEnfants * 124.53;
    }
    if (this.statut === 'celibataire') {
      return this.nombreEnfants * 124.53;
    }
    return 0;
  }

  getBonification(revenus: number): number {
    if (revenus <= 1818.93) {
      return revenus * 0.61;
    } else if (revenus <= 1974.61) {
      return 1110.55 - 0.61 * (revenus - 1818.93);
    }
    return 0;
  }

  getForfaitLogement(): number {
    let montant = 72.93;
    if (this.statut === 'couple') montant = 145.86;
    if (this.nombreEnfants === 1) montant += 29.17;
    if (this.nombreEnfants === 2) montant += 58.33;
    if (this.nombreEnfants >= 3) montant += 87.50;
    return montant;
  }
}
