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

export const routes: Routes = [
    { path: 'rendement', component: RendementComponent },
    { path: 'budget', component: BudgetComponent },
    { path: 'investissement', component: InvestissementComponent },
    { path: 'cashflow', component: CashflowComponent },
    { path: 'emprunt', component: TauxEmpruntComponent },
    {path : 'tri', component : TriImmoComponent},
    { path: '', component:MainComponent}, 
    {path : 'achatvslocation', component : ComparateurAchatLocationComponent},

    {path : 'calculfraisdenotaire', component : CalculNotaireComponent},
    {path : 'interetcompose', component : IntererComposerComponent},

    // { path: 'home', component:MainComponent } 
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
