import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { BehaviorSubject } from 'rxjs';
import { TabViewModule } from 'primeng/tabview';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [ChartModule, FormsModule, InputTextModule, InputNumberModule, ButtonModule, FloatLabelModule, TabViewModule, CommonModule],
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements AfterViewInit, OnInit {
  private dataSubject = new BehaviorSubject<any>(this.initializeData());
  @ViewChild('myChart', { static: false }) myChart!: ElementRef;
  @ViewChild('cashflowElement', { static: false }) cashflowElement!: ElementRef;

  data$ = this.dataSubject.asObservable(); // Observable pour les données du graphique
  labels: string[] = [];
  options: any;
  depense = 0;
  sommeDepense = 0;
  sommeRevenue = 0;
  nomDepense: string = '';
  revenue: number = 0;
  nomRevenue: string = '';
  cashflow: number = 0;
  ngAfterViewInit() {
    const center = this.getElementCenter(this.myChart.nativeElement);
    this.positionCashflowElement(center);
  }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    
    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      }
    };

    // Souscrire pour recevoir les mises à jour
    this.data$.subscribe(data => {
      this.data$ = data;
    });
  }

  private initializeData() {
    const documentStyle = getComputedStyle(document.documentElement);
    return {
      labels: this.labels,
      datasets: [
        {
          data: [],
          backgroundColor: [
            '#3F51B5',
            '#4CAF50',
            '#FFEB3B',
            '#FF9800',
            '#9C27B0'
          ],
          hoverBackgroundColor: [
            '#303F9F',
            '#388E3C',
            '#FBC02D',
            '#F57C00',
            '#7B1FA2'
          ]
        }
      ]
    };
  }

  addElement() {
    const center = this.getElementCenter(this.myChart.nativeElement);
    console.log('Centre de l\'élément:', center); 
    if (this.nomDepense && this.depense >= 0) {
      this.labels.push(this.nomDepense);
      const updatedData = {
        ...this.dataSubject.getValue(),
        labels: this.labels,
        datasets: [{
          ...this.dataSubject.getValue().datasets[0],
          data: [...this.dataSubject.getValue().datasets[0].data, this.depense]
        }]
      };
      this.sommeDepense += this.depense;
      this.cashflow = this.sommeRevenue - this.sommeDepense;

      this.dataSubject.next(updatedData);
      this.nomDepense = '';
      this.depense = 0;
    }

  }

  addRevenue() {
    const center = this.getElementCenter(this.myChart.nativeElement);
    console.log('Centre de l\'élément:', center); 

    if (this.nomRevenue && this.revenue >= 0) {
      this.sommeRevenue += this.revenue;
      this.cashflow = this.sommeRevenue - this.sommeDepense;

      this.nomRevenue = '';
      this.revenue = 0;
    }

  }

  getElementCenter(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return { x: centerX, y: centerY };
}

positionCashflowElement(center: { x: number; y: number }) {
  const cashflowEl = this.cashflowElement.nativeElement;
  cashflowEl.style.left = `${center.x}px`;
  cashflowEl.style.top = `${center.y}px`;
}
}
