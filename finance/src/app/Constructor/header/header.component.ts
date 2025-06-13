import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppRoutes } from '../../Model/pathName.model';
import { pages } from '../generateur-article/article.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;
  afficherCalculatrice: boolean = false;

  constructor( private platformId: Object, 
private router: Router) {}

  ngOnInit() {
    const epargneItems = Object.entries(pages)
      .sort(([, a], [, b]) => a.titre.localeCompare(b.titre)) // tri par titre
      .map(([key, value]) => {
        return {
          label: value.titre,
          route: `/article/${key}`,
        };
      });
    this.items = [
      {
        label: 'Home',
        route: './',
      },

      {
        label: 'Calculateur & Simulateur',
        icon: 'pi pi-home',

        items: [
          {
            label: 'Immobilier',
            icon: 'pi pi-home',
            items: [
              {
                label: 'Achat vs location',
                route: AppRoutes.ACHAT_VS_LOCATION,
              },
              {
                label: 'Cash flow',
                route: AppRoutes.CASHFLOW,
              },
              {
                label: 'Emprunt immobilier',
                route: AppRoutes.EMPRUNT,
              },
              {
                label: 'Frais de notaire',
                route: AppRoutes.CALCUL_NOTAIRE,
              },
              {
                label: 'IFI (Impôt Fortune Immo.)',
                route: AppRoutes.IMPOT_FORTUNE_IMMOBILIERE,
              },
              {
                label: 'LMNP / LMP',
                route: AppRoutes.LMNP_LMP,
              },
              {
                label: 'Plus-value immobilière',
                route: AppRoutes.PLUS_VALUE_IMMOBILIERE,
              },
              {
                label: 'Rendement locatif',
                route: AppRoutes.RENDEMENT,
              },
              {
                label: 'SCI à l’IR vs IS',
                route: AppRoutes.SCI_VS_IR,
              },
              {
                label: 'TRI (rentabilité interne)',
                route: AppRoutes.TRI,
              },
            ].sort((a, b) => a.label.localeCompare(b.label)),
          },
          {
            label: 'Finance',
            icon: 'pi pi-wallet',
            items: [
              {
                label: 'Budget',
                route: AppRoutes.BUDGET,
              },
              {
                label: 'FIRE / indépendance financière',
                route: AppRoutes.INDEPENDANCE_FINANCIERE,
              },
              {
                label: 'Impôt sur le revenu',
                route: AppRoutes.IMPOT_REVENUE,
              },
              {
                label: 'Intérêt composé',
                route: AppRoutes.INTERET_COMPOSE,
              },
              // {
              //   label: 'Prime d’activité',
              //   route: AppRoutes.PRIME_ACTIVITE
              // },
              {
                label: 'Retraite (simplifié)',
                route: AppRoutes.RETRAITE,
              },
              {
                label: 'Salaire brut / net',
                route: AppRoutes.CONVERTISSEUR_BRUT_NET,
              },
            ].sort((a, b) => a.label.localeCompare(b.label)),
          },
        ],
      },

      {
        label: 'Épargne & Investissements',
        icon: 'pi pi-wallet',
        items: epargneItems,
      },

      {
        label: 'Calculatrice rapide',
        icon: 'pi pi-calculator',
        command: () => {
          this.afficherCalculatrice = !this.afficherCalculatrice;
        },
      },
    ];
  }
}
