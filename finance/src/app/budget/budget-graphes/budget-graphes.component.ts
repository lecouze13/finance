import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Button } from 'primeng/button';
@Component({
  selector: 'app-budget-graphes',
  standalone: true,
  imports: [ChartModule, Button],
  templateUrl: './budget-graphes.component.html',
  styleUrl: './budget-graphes.component.scss'
})
export class BudgetGraphesComponent {

  @Output () isCompare: boolean = false;
  data: any;
  percentagesCategory: { label: string; value: string }[] = []
    options: any;
    sommesTotal: number = 0;
    
   @Input() categoriesList: any;
   @Output() compareEvent = new EventEmitter<boolean>();

    ngOnInit() {
      console.log(this.categoriesList);
       var data =JSON.parse(localStorage.getItem('data') || '{}');


        for (var i = 0; i < data.length; i++) {
          console.log(data[i])
          const categoryExists = this.percentagesCategory.find((elt: any) => elt.label === data[i].categories);

          if(categoryExists){
            console.log('yes')
              this.percentagesCategory.map((elt: any) => elt.label == data[i].categories ? elt.value += data[i].depense : null)
          }
          else{
            this.categoriesList.map((elt: any) => elt.label == data[i].categories ? this.percentagesCategory.push({ label: data[i].categories, value: data[i].depense}) : null)

          }
          this.sommesTotal=this.sommesTotal+data[i].depense;
        }
        this.percentagesCategory.map((elt: any) => elt.value = Math.round((elt.value/this.sommesTotal)*100))
        console.log(this.percentagesCategory)
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        
        this.data = {
            labels: ['Dépenses essentiels', 'Sorties-Loisirs', 'Epargne'],
            datasets: [
              {
                label: 'Répartition des dépenses en %',
                borderColor: '#1E3A8A', 
                pointBackgroundColor: '#1E3A8A', 
                pointBorderColor: '#1E3A8A', 
                pointHoverBackgroundColor: textColor,
                pointHoverBorderColor: '#1E3A8A', 
                data: this.percentagesCategory.map((elt: any) => elt.value)
              },
              {
                label: "Répartition des dépenses d'une personne en moyenne en %",
                borderColor: '#F97316', 
                pointBackgroundColor: '#F97316', 
                pointBorderColor: '#F97316', 
                pointHoverBackgroundColor: textColor,
                pointHoverBorderColor: '#F97316', 
                data: [60, 25, 15]
              }
            ]
        };
        
        this.options = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: textColorSecondary
                    },
                    pointLabels: {
                        color: textColorSecondary
                    }
                }
            }
        };
    }

    compare() {
      this.isCompare=false;
      this.compareEvent.emit(this.isCompare);
    }
}