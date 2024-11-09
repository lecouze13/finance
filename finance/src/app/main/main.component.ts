import { Component, OnInit } from '@angular/core';
import{CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ CommonModule, RouterModule],
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
