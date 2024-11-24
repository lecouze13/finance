import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, CommonModule, MenubarModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [

      {label: 'Home', route: './', icon: 'pi pi-calculator'},
      {
        label: 'Immobilier',
        icon: 'pi pi-home',
        items: [
          {
            label: 'Rendement',
            route: '/rendement'
          },
          {
            label: 'Cash flow',
            route: '/cashflow'
          },
          {
            label: 'Calculateur d\'emprunt',
            route: '/emprunt'
          },

        ]
      }
      ,
      {
        label: 'Finance',
        icon: 'pi pi-wallet',
        items: [
          {
            label: 'Budget',
            route: '/budget'


          },
          {
            label: 'Investissement',
            route: '/investissement'
          },

        ]
      }
    ];
  }
}