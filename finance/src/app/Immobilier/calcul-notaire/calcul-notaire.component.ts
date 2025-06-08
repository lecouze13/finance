import { Component } from '@angular/core';


@Component({
  selector: 'app-calcul-notaire',
  templateUrl: './calcul-notaire.component.html',
  styleUrls: ['./calcul-notaire.component.scss']
})
export class CalculNotaireComponent {
  valeurs: { [key: string]: any } = {};
  resultat: number | null = null;

  typesBien = [
    { label: 'Ancien', value: 'ancien' },
    { label: 'Neuf', value: 'neuf' }
  ];

  calculerFrais() {
    const prix = this.valeurs['Prix du bien'];
    const type = this.valeurs['Type de bien'];
    const taux = type .value=== 'ancien' ? 0.08 : 0.03;
    this.resultat = prix * taux;
  }

}