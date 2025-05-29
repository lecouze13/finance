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
      {
        label: 'Home',
        route: './',
        icon: 'pi pi-calculator'
      },
      {
        label: 'Immobilier',
        icon: 'pi pi-home',
        items: [
          {
            label: 'Calculateur de rendement locatif',
            route: '/rendement'
          },
          {
            label: 'Calculateur de cash flow',
            route: '/cashflow'
          },
          {
            label: 'Calculateur TRI (rentabilité interne)',
            route: '/tri'
          },
          {
            label: 'Calculateur d’emprunt immobilier',
            route: '/emprunt'
          },
          {
            label: 'Calculateur de frais de notaire',
            route: '/calculfraisdenotaire'
          },
          {
            label: 'Comparateur achat vs location',
            route: '/achatvslocation'
          }
        ]
      },
      {
        label: 'Finance',
        icon: 'pi pi-wallet',
        items: [
          {
            label: 'Calculateur de budget',
            route: '/budget'
          },
          {
            label: 'Calculateur d’intérêt composé',
            route: '/interetcompose'
          }
        ]
      }
    ];
  }
  
}