import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-taux-emprunt',
  standalone: true,
  imports: [FormsModule, InputTextModule, InputNumberModule,
    ButtonModule, FloatLabelModule, DropdownModule, CommonModule], 
     templateUrl: './taux-emprunt.component.html',
  styleUrl: './taux-emprunt.component.scss'
})
export class TauxEmpruntComponent {
  sommeEmprunte: number | undefined = 0;
  interet: number = 3.6;
  isCalculCoutTotal: boolean = false;
  isCalculMensualite: boolean = false;
  isCapaciteEmprunt: boolean = false;
  dureeDuCredit: number |undefined = 0;
  coutTotal: number | undefined = 0;
  mensualite: number | undefined = 0;
  capaciteEmprunt: number | undefined = 0;
  calcul: String[] = ['Calculer le coût total', 'Calculer la mensualité', 'Calculer la capacité d\'emprunt'];
  selectedCalcul: String | undefined;
  coutCredit: Number | undefined;    

  calculCoutTotal() {
    if (this.sommeEmprunte && this.interet && this.dureeDuCredit) {
      const tauxMensuel = (this.interet / 100)/12;
      const nombreDeMois = this.dureeDuCredit;
      
      const mensualite = (this.sommeEmprunte * tauxMensuel) / (1 - Math.pow(1 + tauxMensuel, -nombreDeMois));
      
      this.coutTotal = Math.round(mensualite * nombreDeMois)
      this.coutCredit = Math.round(this.coutTotal - this.sommeEmprunte);
    }
  }

  calculMensualite() {
    if (this.sommeEmprunte && this.interet && this.dureeDuCredit) {
      const tauxMensuel = this.interet / 100 / 12;
      const nombreDeMois = this.dureeDuCredit; 

      this.mensualite = (this.sommeEmprunte * tauxMensuel) / (1 - Math.pow(1 + tauxMensuel, -nombreDeMois));
    }
  }
  calculCapaciteEmprunt(){
    if(this.mensualite && this.interet && this.dureeDuCredit){
      const tauxMensuel = this.interet / 100 / 12;
      const nombreDeMois = this.dureeDuCredit;
      this.capaciteEmprunt = Math.round(this.mensualite / (tauxMensuel / (1 - Math.pow(1 + tauxMensuel, -nombreDeMois))))
    }
  }
  changeCalcul(){
    if(this.selectedCalcul === 'Calculer le coût total'){
      this.isCalculMensualite=false
      this.isCalculCoutTotal=true
      this.isCapaciteEmprunt=false

    }else if(this.selectedCalcul === 'Calculer la mensualité'){
      this.isCalculMensualite=true
      this.isCalculCoutTotal=false
      this.isCapaciteEmprunt=false
    }
    else if (this.selectedCalcul === 'Calculer la capacité d\'emprunt'){
      this.isCalculMensualite=false
      this.isCalculCoutTotal=false
      this.isCapaciteEmprunt=true
    }
  }
}
