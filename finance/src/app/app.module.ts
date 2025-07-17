import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

// Angular Forms
import { FormsModule } from '@angular/forms';


// PrimeNG modules
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';

// Composants de l'app
import { AppComponent } from './app.component';
import { HeaderComponent } from './Constructor/header/header.component';
import { FooterComponent } from './Constructor/footer/footer.component';
import { RendementComponent } from './Immobilier/rendement/rendement.component';
import { BudgetComponent } from './Finance/budget/budget.component';
import { InvestissementComponent } from './Finance/investissement/investissement.component';
import { CashflowComponent } from './Immobilier/cashflow/cashflow.component';
import { MainComponent } from './Constructor/main/main.component';
import { TauxEmpruntComponent } from './Immobilier/taux-emprunt/taux-emprunt.component';
import { TriImmoComponent } from './Immobilier/tri-immo/tri-immo.component';
import { ComparateurAchatLocationComponent } from './Immobilier/comparateur-achat-location/comparateur-achat-location.component';
import { CalculNotaireComponent } from './Immobilier/calcul-notaire/calcul-notaire.component';
import { IntererComposerComponent } from './Finance/interer-composer/interer-composer.component';
import { LmnpLmpComponent } from './Immobilier/lmnp-lmp/lmnp-lmp.component';
import { CalculatriceComponent } from './Outils/calculatrice/calculatrice.component';
import { ImpotsRevenueComponent } from './Finance/impots-revenue/impots-revenue.component';
import { SimulateurPrimeActiviteComponent } from './Finance/simulateur-prime-activite/simulateur-prime-activite.component';
import { MenubarModule } from 'primeng/menubar';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';

import { TabViewModule } from 'primeng/tabview';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';



// Routes (à adapter selon ta configuration)
import { AppRoutingModule } from './app.routes';
import { BudgetGraphesComponent } from './Finance/budget-graphes/budget-graphes.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SimulateurBrutNetComponent } from './Finance/simulateur-brut-net/simulateur-brut-net.component';
import { ComparateurSciIrIsComponent } from './Immobilier/comparateur-sci-ir-is/comparateur-sci-ir-is.component';
import { SimulateurPlusValueImmobiliereComponent } from './Immobilier/simulateur-plus-value-immobiliere/simulateur-plus-value-immobiliere.component';
import { ReactiveFormsModule } from '@angular/forms'; // Optionnel mais souvent utile
import { ContenuPageComponent } from './Constructor/generateur-article/generateur-article.component';
import { SimulateurIndependaceFinanciereComponent } from './Finance/simulateur-independace-financiere/simulateur-independace-financiere.component';
import { SimulateurImpotFortuneImmobiliereComponent } from './Finance/simulateur-impot-fortune-immobiliere/simulateur-impot-fortune-immobiliere.component';
import { SimulateurCreditLombardComponent } from './Finance/simulateur-credit-lombard/simulateur-credit-lombard.component';
import { SimulateurRetraiteComponent } from './Finance/simulateur-retraite/simulateur-retraite.component';
import { SimulateurApportVsEmpruntComponent } from './Immobilier/simulateur-apport-vs-emprunt/simulateur-apport-vs-emprunt.component';
import { SimulateurImportLocationNueComponent } from './Immobilier/simulateur-import-location-nue/simulateur-import-location-nue.component';
import { SimulateurDividendFireComponent } from './Finance/simulateur-dividend-fire/simulateur-dividend-fire.component';
import { HttpClientModule } from '@angular/common/http';
import { AirbnbVsLocationComponent } from './Immobilier/airbnb-vs-location/airbnb-vs-location.component';
import { SimulateurLivretComponent } from './Constructor/simulateur-livret/simulateur-livret.component';
import { SimulateurDefiscalisationComponent } from './simulateur-defiscalisation/simulateur-defiscalisation.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        RendementComponent,
        InvestissementComponent,
        CashflowComponent,
        MainComponent,
        TauxEmpruntComponent,
        TriImmoComponent,
        ComparateurAchatLocationComponent,
        CalculNotaireComponent,
        IntererComposerComponent,
        LmnpLmpComponent,
        CalculatriceComponent,
        ImpotsRevenueComponent,
        SimulateurPrimeActiviteComponent,
        BudgetComponent,
        BudgetGraphesComponent,
        SimulateurBrutNetComponent,
        ComparateurSciIrIsComponent,
        SimulateurPlusValueImmobiliereComponent,
        ContenuPageComponent,
        SimulateurIndependaceFinanciereComponent,
        SimulateurImpotFortuneImmobiliereComponent,
        SimulateurCreditLombardComponent,
        SimulateurRetraiteComponent,
        SimulateurApportVsEmpruntComponent,
        SimulateurImportLocationNueComponent,
        SimulateurDividendFireComponent,
        AirbnbVsLocationComponent,
        SimulateurLivretComponent,
        SimulateurDefiscalisationComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        InputTextModule,
        InputNumberModule,
        ButtonModule,
        FloatLabelModule,
        DropdownModule,
        MenubarModule,
        TableModule,
        ToastModule,
        RippleModule,
        CommonModule,
        TabViewModule,
        TooltipModule,
        ChartModule,
        CheckboxModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
    ReactiveFormsModule,
    PanelModule,
        HttpClientModule 

    ],
    providers: [
    provideClientHydration()
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
