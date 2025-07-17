import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RendementComponent } from './Immobilier/rendement/rendement.component'; // Assure-toi d'importer ton composant
import { BudgetComponent } from './Finance/budget/budget.component'; // Assure-toi d'importer ton composant
import { InvestissementComponent } from './Finance/investissement/investissement.component'; // Assure-toi d'importer ton composant
import { CashflowComponent } from './Immobilier/cashflow/cashflow.component';
import { MainComponent } from './Constructor/main/main.component';
import { TauxEmpruntComponent } from './Immobilier/taux-emprunt/taux-emprunt.component';
import { TriImmoComponent } from './Immobilier/tri-immo/tri-immo.component';
import { ComparateurAchatLocationComponent } from './Immobilier/comparateur-achat-location/comparateur-achat-location.component';
import { CalculNotaireComponent } from './Immobilier/calcul-notaire/calcul-notaire.component';
import { IntererComposerComponent } from './Finance/interer-composer/interer-composer.component';
import { LmnpLmpComponent } from './Immobilier/lmnp-lmp/lmnp-lmp.component';
import { AppRoutes } from './Model/pathName.model';
import { CalculatriceComponent } from './Outils/calculatrice/calculatrice.component';
import { ImpotsRevenueComponent } from './Finance/impots-revenue/impots-revenue.component';
import { SimulateurPrimeActiviteComponent } from './Finance/simulateur-prime-activite/simulateur-prime-activite.component';
import { SimulateurBrutNetComponent } from './Finance/simulateur-brut-net/simulateur-brut-net.component';
import { SimulateurImpotFortuneImmobiliereComponent } from './Finance/simulateur-impot-fortune-immobiliere/simulateur-impot-fortune-immobiliere.component';
import { SimulateurIndependaceFinanciereComponent } from './Finance/simulateur-independace-financiere/simulateur-independace-financiere.component';
import { SimulateurRetraiteComponent } from './Finance/simulateur-retraite/simulateur-retraite.component';
import { SimulateurPlusValueImmobiliereComponent } from './Immobilier/simulateur-plus-value-immobiliere/simulateur-plus-value-immobiliere.component';
import { ComparateurSciIrIsComponent } from './Immobilier/comparateur-sci-ir-is/comparateur-sci-ir-is.component';
import { ContenuPageComponent } from './Constructor/generateur-article/generateur-article.component';
import { SimulateurCreditLombardComponent } from './Finance/simulateur-credit-lombard/simulateur-credit-lombard.component';
import { SimulateurDividendFireComponent } from './Finance/simulateur-dividend-fire/simulateur-dividend-fire.component';
import { AirbnbVsLocationComponent } from './Immobilier/airbnb-vs-location/airbnb-vs-location.component';
import { SimulateurApportVsEmpruntComponent } from './Immobilier/simulateur-apport-vs-emprunt/simulateur-apport-vs-emprunt.component';
import { SimulateurImportLocationNueComponent } from './Immobilier/simulateur-import-location-nue/simulateur-import-location-nue.component';
import { SimulateurDividendeEntrepriseComponent } from './simulateur-dividende-entreprise/simulateur-dividende-entreprise.component';
import { SimulateurLivretComponent } from './Constructor/simulateur-livret/simulateur-livret.component';
import { SimulateurDefiscalisationComponent } from './simulateur-defiscalisation/simulateur-defiscalisation.component';

export const routes: Routes = [
  { path: AppRoutes.RENDEMENT, component: RendementComponent },
  { path: AppRoutes.BUDGET, component: BudgetComponent },
  { path: AppRoutes.INVESTISSEMENT, component: InvestissementComponent },
  { path: AppRoutes.CASHFLOW, component: CashflowComponent },
  { path: AppRoutes.EMPRUNT, component: TauxEmpruntComponent },
  { path: AppRoutes.TRI, component: TriImmoComponent },
  { path: AppRoutes.HOME, component: MainComponent },
  {
    path: AppRoutes.ACHAT_VS_LOCATION,
    component: ComparateurAchatLocationComponent,
  },
  { path: AppRoutes.CALCUL_NOTAIRE, component: CalculNotaireComponent },
  { path: AppRoutes.INTERET_COMPOSE, component: IntererComposerComponent },
  { path: AppRoutes.LMNP_LMP, component: LmnpLmpComponent },
  // { path: AppRoutes.CALCULATRICE, component: CalculatriceComponent },
  { path: AppRoutes.IMPOT_REVENUE, component: ImpotsRevenueComponent },
  // { path: AppRoutes.PRIME_ACTIVITE, component: SimulateurPrimeActiviteComponent },
  {
    path: AppRoutes.CONVERTISSEUR_BRUT_NET,
    component: SimulateurBrutNetComponent,
  },
  {
    path: AppRoutes.IMPOT_FORTUNE_IMMOBILIERE,
    component: SimulateurImpotFortuneImmobiliereComponent,
  },
  {
    path: AppRoutes.INDEPENDANCE_FINANCIERE,
    component: SimulateurIndependaceFinanciereComponent,
  },
  { path: AppRoutes.RETRAITE, component: SimulateurRetraiteComponent },
  { path: AppRoutes.SCI_VS_IR, component: ComparateurSciIrIsComponent },
  {
    path: AppRoutes.PLUS_VALUE_IMMOBILIERE,
    component: SimulateurPlusValueImmobiliereComponent,
  },
  {
    path: AppRoutes.CREDIT_LOMBARD,
    component: SimulateurCreditLombardComponent,
  },

  {
    path: AppRoutes.SIMULATEUR__LOCATION_NUE_REGIME,
    component: SimulateurImportLocationNueComponent,
  },
  {
    path: AppRoutes.SIMULATEUR_APPORT_VS_EMPRUNT,
    component: SimulateurApportVsEmpruntComponent,
  },
  { path: AppRoutes.AIRBNB_VS_LOCATION, component: AirbnbVsLocationComponent },
  {
    path: AppRoutes.SIMULATEUR_DIVIDEND_FIRE,
    component: SimulateurDividendFireComponent,
  },
  {
    path: AppRoutes.SIMULATEUR_DIVIDEND_ENTREPRISE,
    component: SimulateurDividendeEntrepriseComponent,
  },
    { path: AppRoutes.SIMULATEUR__LOCATION_NUE_REGIME, component: SimulateurImportLocationNueComponent },
    { path: AppRoutes.SIMULATEUR_APPORT_VS_EMPRUNT, component: SimulateurApportVsEmpruntComponent },
    { path: AppRoutes.AIRBNB_VS_LOCATION, component: AirbnbVsLocationComponent },
    { path: AppRoutes.SIMULATEUR_DIVIDEND_FIRE, component: SimulateurDividendFireComponent },
    { path: AppRoutes.SIMULATEUR_DEFISCALISATION, component: SimulateurDefiscalisationComponent },


    {
        path: 'article/pea',
        component: ContenuPageComponent
    },
    {
        path: 'article/assurance-vie',
        component: ContenuPageComponent
    },
    {
        path: 'article/pea-vs-assurance-vie',
        component: ContenuPageComponent
    },
    {
        path: 'article/perco',
        component: ContenuPageComponent
    },
    {
        path: 'article/per',
        component: ContenuPageComponent
    },
    {
        path: 'article/cto',
        component: ContenuPageComponent
    },
    {
        path: 'article/assurance-vie-luxembourgeoise',
        component: ContenuPageComponent
    },
    {
        path: 'article/credit-lombard',
        component: ContenuPageComponent
    },
    {
        path: 'article/etf',
        component: ContenuPageComponent
    },
    {
        path: 'article/livret-a',
        component: ContenuPageComponent
    },
    {
        path: 'article/ldds',
        component: ContenuPageComponent
    },
    {
        path: 'article/pel',
        component: ContenuPageComponent
    },
    {
        path: 'article/cel',
        component: ContenuPageComponent
    },
    {
        path: 'article/lep',
        component: ContenuPageComponent
    }
    ,
    {
        path: 'article/livret-jeune',
        component: ContenuPageComponent
    },
    {
        path: 'article/livret-bleu',
        component: ContenuPageComponent
    },
    {
        path: 'article/lea',
        component: ContenuPageComponent
    },
    {
        path: 'article/obligations',
        component: ContenuPageComponent
    }, {
        path: 'article/cac40',
        component: ContenuPageComponent
    }, {
        path: 'article/sp500',
        component: ContenuPageComponent
    }, {
        path: 'article/msciworld',
        component: ContenuPageComponent
    }, {
        path: 'article/msci-emerging-markets',
        component: ContenuPageComponent
    }, {
        path: 'article/dax40',
        component: ContenuPageComponent
    }, {
        path: 'article/ftse100',
        component: ContenuPageComponent
    }, {
        path: 'article/nikkei225',
        component: ContenuPageComponent
    }, {
        path: 'article/tsx-composite',
        component: ContenuPageComponent
    },
    {
        path: 'article/ftse-mib',
        component: ContenuPageComponent
    }, {
        path: 'article/ibex35',
        component: ContenuPageComponent
    },
{ path: 'simulateur-livret/lep', component: SimulateurLivretComponent },
{ path: 'simulateur-livret/livret-a', component: SimulateurLivretComponent },
{ path: 'simulateur-livret/ldds', component: SimulateurLivretComponent },
{ path: 'simulateur-livret/cel', component: SimulateurLivretComponent },
{ path: 'simulateur-livret/livret-bleu', component: SimulateurLivretComponent },
{ path: 'simulateur-livret/livret-jeune', component: SimulateurLivretComponent },
{ path: 'simulateur-livret/pel', component: SimulateurLivretComponent },
    { path: 'simulateur-livret/lea', component: SimulateurLivretComponent },



{ path: '**', redirectTo: '', pathMatch: 'full' }

 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      urlUpdateStrategy: 'eager',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
