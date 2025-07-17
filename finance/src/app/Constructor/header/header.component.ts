import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppRoutes } from '../../Model/pathName.model';
import { pages } from '../generateur-article/article.model';
import { livretsSimu } from '../generateur-article/simulateur-livret/livret.page';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;
  afficherCalculatrice: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const allEntries = Object.entries(pages);
    const allEntriesSimu = Object.entries(livretsSimu);

    // Tri par titre (facultatif mais conseillé)
    allEntries.sort(([, a], [, b]) => a.titre.localeCompare(b.titre));
    allEntriesSimu.sort(([, a], [, b]) => a.title.localeCompare(b.title));
    // Séparation en 2 listes
    const epargneItems = allEntries
      .filter(([, value]) => value.categorie === 'epargne')
      .map(([key, value]) => ({
        label: value.titre,
        route: `/article/${key}`,
      }));

    const investissementItems = allEntries
      .filter(([, value]) => value.categorie === 'investissement')
      .map(([key, value]) => ({
        label: value.titre,
        route: `/article/${key}`,
      }));
      const indiceitems = allEntries
      .filter(([, value]) => value.categorie === 'indices mondiaux')
      .map(([key, value]) => ({
        label: value.titre,
        route: `/article/${key}`,
      }));


      const simuLivret = allEntriesSimu
      .map(([key, value]) => ({
        label: value.title,
        route: `/simulateur-livret/${key}`,
      }));

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
              {
                label: 'Micro-foncier vs Réel (Location nue)',
                route: AppRoutes.SIMULATEUR__LOCATION_NUE_REGIME,
              },
              {
                label: 'Apport vs Emprunt',
                route: AppRoutes.SIMULATEUR_APPORT_VS_EMPRUNT,
              },
              {
                label: 'AIRBNB vs Location',
                route: AppRoutes.AIRBNB_VS_LOCATION,
              },
                {
                label: 'Defiscalisation (loi pinel, Denormandie, etc) ',
                route: AppRoutes.SIMULATEUR_DEFISCALISATION,
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
              {
                label: 'Credit lombard',
                route: AppRoutes.CREDIT_LOMBARD,
              },
              {
                label: 'Dividendes FIRE',
                route: AppRoutes.SIMULATEUR_DIVIDEND_FIRE,
              },

              {
                label: 'Dividendes entreprise',
                route: AppRoutes.SIMULATEUR_DIVIDEND_ENTREPRISE,
              },
            ].sort((a, b) => a.label.localeCompare(b.label)),
            
          },
          {
              label: 'Simulateurs Livrets',
        icon: 'pi pi-building',

        items:simuLivret
          }
        ],
      },

      {
        label: 'Article',
        icon: 'pi pi-wallet',
        items: [{
          label: 'Épargne',
          icon: 'pi pi-wallet',
          items: epargneItems,
        },
        {
          label: 'Investissements',
          icon: 'pi pi-wallet',
          items: investissementItems,
        },
      {
          label: 'indices mondiaux',
          icon: 'pi pi-wallet',
          items: indiceitems,
        },
      
      
      ]
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
