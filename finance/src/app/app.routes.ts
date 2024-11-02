import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RendementComponent } from './rendement/rendement.component'; // Assure-toi d'importer ton composant
import { BudgetComponent } from './budget/budget.component'; // Assure-toi d'importer ton composant
import { InvestissementComponent } from './investissement/investissement.component'; // Assure-toi d'importer ton composant

export const routes: Routes = [
    { path: 'rendement', component: RendementComponent },
    { path: 'budget', component: BudgetComponent },
    { path: 'investissement', component: InvestissementComponent },
    { path: '', redirectTo: '/', pathMatch: 'full' }, 
    { path: '**', redirectTo: '/rendement' } 
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
