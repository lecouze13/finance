import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-simulateur-defiscalisation',
  templateUrl: './simulateur-defiscalisation.component.html',
  styleUrls: ['./simulateur-defiscalisation.component.scss']
})

export class SimulateurDefiscalisationComponent {
  form: FormGroup;
  result: any = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      loi: ['pinel', Validators.required],
      montantInvesti: [200000, [Validators.required, Validators.min(1)]],
      duree: [9],
      revenus: [40000],
      zone: ['A'],
      montantTravaux: [0],
      montantLoyer: [700]
    });
  }

  calculer() {
    const { loi, montantInvesti, duree, revenus, zone, montantTravaux } = this.form.value;
    let reduction = 0;
    let plafondInvest = montantInvesti;
    let info = '';

    switch (loi) {
      case 'pinel':
        plafondInvest = Math.min(montantInvesti, 300000);
        if (duree === 6) reduction = plafondInvest * 0.12;
        else if (duree === 9) reduction = plafondInvest * 0.18;
        else if (duree === 12) reduction = plafondInvest * 0.21;
        info = `Réduction Pinel sur ${duree} ans`;
        break;

      case 'denormandie':
        plafondInvest = Math.min(montantInvesti + montantTravaux, 300000);
        reduction = plafondInvest * 0.18; // par défaut 9 ans
        info = `Réduction Denormandie (9 ans par défaut)`;
        break;

      case 'malraux':
        const taux = zone === 'secteur_sauvegarde' ? 0.30 : 0.22;
        reduction = montantTravaux * taux;
        info = `Réduction Malraux (${taux * 100} % des travaux)`;
        break;

      case 'monuments_historiques':
        reduction = montantTravaux; // 100% imputable sur le revenu global
        info = `Déduction Monuments Historiques sur revenu global`;
        break;

      case 'censi_bouvard':
        plafondInvest = Math.min(montantInvesti, 300000);
        reduction = plafondInvest * 0.11;
        info = `Réduction Censi-Bouvard (11% sur 9 ans)`;
        break;
    }

    this.result = {
      reduction,
      info
    };
  }
}
