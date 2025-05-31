import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RendementComponent } from './rendement/rendement.component'; // Assure-toi d'importer ton composant
import { BudgetComponent } from './budget/budget.component'; // Assure-toi d'importer ton composant
import { InvestissementComponent } from './investissement/investissement.component'; // Assure-toi d'importer ton composant
import { CashflowComponent } from './cashflow/cashflow.component';
import { MainComponent } from './main/main.component';
import { TauxEmpruntComponent } from './taux-emprunt/taux-emprunt.component';
import { TriImmoComponent } from './tri-immo/tri-immo.component';
import { ComparateurAchatLocationComponent } from './comparateur-achat-location/comparateur-achat-location.component';
import { CalculNotaireComponent } from './calcul-notaire/calcul-notaire.component';
import { IntererComposerComponent } from './interer-composer/interer-composer.component';
import { LmnpLmpComponent } from './lmnp-lmp/lmnp-lmp.component';
import { AppRoutes } from './pathName.model';
import { CalculatriceComponent } from './calculatrice/calculatrice.component';

export const routes: Routes = [
    { path: AppRoutes.RENDEMENT, component: RendementComponent },
    { path: AppRoutes.BUDGET, component: BudgetComponent },
    { path: AppRoutes.INVESTISSEMENT, component: InvestissementComponent },
    { path: AppRoutes.CASHFLOW, component: CashflowComponent },
    { path: AppRoutes.EMPRUNT, component: TauxEmpruntComponent },
    { path: AppRoutes.TRI, component: TriImmoComponent },
    { path: AppRoutes.HOME, component: MainComponent },
    { path: AppRoutes.ACHAT_VS_LOCATION, component: ComparateurAchatLocationComponent },
    { path: AppRoutes.CALCUL_NOTAIRE, component: CalculNotaireComponent },
    { path: AppRoutes.INTERET_COMPOSE, component: IntererComposerComponent },
    { path: AppRoutes.LMNP_LMP, component: LmnpLmpComponent },
    { path: AppRoutes.CALCULATRICE, component: CalculatriceComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
