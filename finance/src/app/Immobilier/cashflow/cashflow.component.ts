import { Component } from '@angular/core';


@Component({
  selector: 'app-cashflow',
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
