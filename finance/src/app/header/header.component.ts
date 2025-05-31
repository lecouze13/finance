import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { AppRoutes } from '../pathName.model';
import { CalculatriceComponent } from "../calculatrice/calculatrice.component";
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, CommonModule, MenubarModule, CalculatriceComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'

})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;
  afficherCalculatrice: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        route: './',

      },
      {
        label: 'Immobilier',
        icon: 'pi pi-home',
        items: [
          {
            label: 'Calculateur de rendement locatif',
            route:AppRoutes.RENDEMENT
          },
          {
            label: 'Calculateur de cash flow',
            route: AppRoutes.CASHFLOW
          },
          {
            label: 'Calculateur TRI (rentabilité interne)',
            route: AppRoutes.TRI
          },
          {
            label: 'Calculateur d’emprunt immobilier',
            route: AppRoutes.EMPRUNT
          },
          {
            label: 'Calculateur de frais de notaire',
            route: AppRoutes.CALCUL_NOTAIRE
          },
          {
            label: 'Comparateur achat vs location',
            route: AppRoutes.ACHAT_VS_LOCATION
          },
          {
            label: 'LMNP / LMP + Micro-BIC ou Réel',
            route: AppRoutes.LMNP_LMP
          }


          
        ]
      },
      {
        label: 'Finance',
        icon: 'pi pi-wallet',
        items: [
          {
            label: 'Calculateur de budget',
            route:  AppRoutes.BUDGET
          },
          {
            label: 'Calculateur d’intérêt composé',
            route:  AppRoutes.INTERET_COMPOSE
          },
          {
            label: 'Calculateur d’impôt sur le revenu',
            route:  AppRoutes.IMPOT_REVENUE
          },
          
        ]
      },
      {
        label: 'Calculatrice rapide',
        icon: 'pi pi-calculator',
        command: () => {
          this.afficherCalculatrice = !this.afficherCalculatrice;
        }
      
       
      }
    ];
  }
  
}