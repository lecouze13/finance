import { Component } from '@angular/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  isHomeRoute = true;
  ngOnInit(): void {
    const url = window.location.href;
    if(url.includes('rendement') || url.includes('budget') || url.includes('investissement') || url.includes('cashflow')){

    }
    else{
      this.isHomeRoute = false;
    }
    
  }
}
