import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cashflow',
  standalone: true,
  imports: [FormsModule, InputTextModule, InputNumberModule, CommonModule, ButtonModule, FloatLabelModule],
  templateUrl: './cashflow.component.html',
  styleUrl: './cashflow.component.scss'
})
export class CashflowComponent {

  Element: string[] = ['Loyer', 'Crédit', 'Charges', 'Impôts'];
  values: { [key: string]: number } = {};
  cashflow = 0;
  calculCashflow() {
      this.cashflow = this.values['Loyer'] - this.values['Crédit'] - this.values['Charges'] - this.values['Impôts'];
    
  }
}
