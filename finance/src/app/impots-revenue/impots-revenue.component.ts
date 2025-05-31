import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'app-impots-revenue',
  standalone: true,
  imports: [CommonModule, FormsModule, InputNumberModule, ButtonModule,FloatLabelModule,DropdownModule],
  templateUrl: './impots-revenue.component.html',
  styleUrls: ['./impots-revenue.component.scss']
})
export class ImpotsRevenueComponent {
  revenus: number | null = null;
  situation: string = ''; // celibataire, marie, veuf, divorce
  nbEnfants: number = 0;
  credits: number = 0;

  impot: number | null = null;
  impotBrut: number = 0;
  decote: number = 0;

  calculerParts(): number {
    let parts = 1;

    if (this.situation === 'marie') {
      parts = 2;
    } else if ((this.situation === 'veuf' || this.situation === 'divorce') && this.nbEnfants > 0) {
      parts = 1.5; // parent isolé
    }

    // Ajout des parts liées aux enfants
    if (this.nbEnfants === 1) {
      parts += 0.5;
    } else if (this.nbEnfants === 2) {
      parts += 1;
    } else if (this.nbEnfants >= 3) {
      parts += 1 + (this.nbEnfants - 2);
    }

    return parts;
  }

  calculerImpot() {
    const parts = this.calculerParts();
    if (this.revenus) {
      const revenuParPart = this.revenus / parts;
      let impotParPart = 0;

      const tranches = [
        { plafond: 11497, taux: 0 },
        { plafond: 29315, taux: 0.11 },
        { plafond: 83823, taux: 0.30 },
        { plafond: 180294, taux: 0.41 },
        { plafond: Infinity, taux: 0.45 }
      ];

      let revenuRestant = revenuParPart;
      let tranchePrecedente = 0;

      for (let tranche of tranches) {
        if (revenuRestant > tranche.plafond - tranchePrecedente) {
          impotParPart += (tranche.plafond - tranchePrecedente) * tranche.taux;
          revenuRestant -= (tranche.plafond - tranchePrecedente);
          tranchePrecedente = tranche.plafond;
        } else {
          impotParPart += revenuRestant * tranche.taux;
          break;
        }
      }

      this.impotBrut = Math.round(impotParPart * parts);
      this.decote = this.calculerDecote(this.impotBrut);
      const impotApresDecote = Math.max(this.impotBrut - this.decote, 0);
      this.impot = Math.max(impotApresDecote - this.credits, 0);
    }
  }

  calculerDecote(impotBrut: number): number {
    if (this.situation === 'marie') {
      if (impotBrut <= 3248) {
        return Math.max(1470 - 0.4525 * impotBrut, 0);
      }
    } else {
      if (impotBrut <= 1964) {
        return Math.max(889 - 0.4525 * impotBrut, 0);
      }
    }
    return 0;
  }
}


