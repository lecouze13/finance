import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-calcul-notaire',
  standalone: true,
  imports: [CommonModule, FormsModule, InputNumberModule, ButtonModule, FloatLabelModule,DropdownModule],
  templateUrl: './calcul-notaire.component.html',
  styleUrl: './calcul-notaire.component.scss'
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
console.log(type)
    const taux = type .value=== 'ancien' ? 0.08 : 0.03;
    this.resultat = prix * taux;
  }

}