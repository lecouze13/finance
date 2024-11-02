import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-rendement',
  standalone: true,
  imports: [FormsModule, InputTextModule, InputNumberModule,
     ButtonModule, FloatLabelModule],
  templateUrl: './rendement.component.html',
  styleUrl: './rendement.component.scss'
})
export class RendementComponent {
  loyerMensuel: number | undefined = 0;
  prixAcquisition: number | undefined = 0;
  chargeLocatives: number |undefined = 0;
  loyerMensuel2: number | undefined = 0;
  prixAcquisition2: number | undefined = 0;
  rendementBrut: number | undefined;
  rendementNet: number | undefined;


  calculRendementBrut() {
    if (this.prixAcquisition && this.loyerMensuel) {
      this.rendementBrut = ((this.loyerMensuel*12) / this.prixAcquisition) * 100
    }
  }
  calculRendementNet() {
    if (this.prixAcquisition2 && this.loyerMensuel2 && this.chargeLocatives) {
      this.rendementNet = (((this.loyerMensuel2* 12 ) - this.chargeLocatives) / this.prixAcquisition2) * 100
    }
  }
  
}
