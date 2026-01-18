import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

// Enregistrer la locale française
registerLocaleData(localeFr, 'fr-FR');

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
import { PanelMenuModule } from 'primeng/panelmenu';

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
import { SimulateurLivretComponent } from './Constructor/generateur-article/simulateur-livret/simulateur-livret.component';
import { SimulateurDefiscalisationComponent } from './simulateur-defiscalisation/simulateur-defiscalisation.component';
import { SimulateurDividendeEntrepriseComponent } from './simulateur-dividende-entreprise/simulateur-dividende-entreprise.component';
import { SimulateurMicroEntrepreneurComponent } from './simulateur-micro-entrepreneur/simulateur-micro-entrepreneur.component';
import { SimulateurEligibiliteLepComponent } from './Finance/simulateur-eligibilite-lep/simulateur-eligibilite-lep.component';
import { FaqSectionComponent } from './shared/faq-section/faq-section.component';
import { ScenarioComparisonComponent } from './shared/components/scenario-comparison/scenario-comparison.component';
import { InfoTooltipComponent } from './shared/components/info-tooltip/info-tooltip.component';
import { SimulateurPtzComponent } from './Immobilier/simulateur-ptz/simulateur-ptz.component';
import { SimulateurSuccessionComponent } from './Finance/simulateur-succession/simulateur-succession.component';
import { SimulateurCoutEnfantComponent } from './Finance/simulateur-cout-enfant/simulateur-cout-enfant.component';
import { SimulateurViagerComponent } from './Immobilier/simulateur-viager/simulateur-viager.component';
import { SimulateurCapaciteEmpruntComponent } from './Immobilier/simulateur-capacite-emprunt/simulateur-capacite-emprunt.component';
import { SimulateurRachatCreditComponent } from './Finance/simulateur-rachat-credit/simulateur-rachat-credit.component';
import { SimulateurPerComponent } from './Finance/simulateur-per/simulateur-per.component';
import { SimulateurFraisGardeComponent } from './Finance/simulateur-frais-garde/simulateur-frais-garde.component';
import { SimulateurSasuEurlComponent } from './Finance/simulateur-sasu-eurl/simulateur-sasu-eurl.component';
import { SimulateurPeaAssuranceVieComponent } from './Finance/simulateur-pea-assurance-vie/simulateur-pea-assurance-vie.component';
import { SimulateurEpargneObjectifComponent } from './Finance/simulateur-epargne-objectif/simulateur-epargne-objectif.component';
import { SimulateurRemboursementAnticipeComponent } from './Finance/simulateur-remboursement-anticipe/simulateur-remboursement-anticipe.component';
import { SimulateurPouvoirAchatComponent } from './Finance/simulateur-pouvoir-achat/simulateur-pouvoir-achat.component';
import { SimulateurCreditConsoComponent } from './Finance/simulateur-credit-conso/simulateur-credit-conso.component';
import { SimulateurScpiComponent } from './Finance/simulateur-scpi/simulateur-scpi.component';
import { ExportButtonsComponent } from './shared/components/export-buttons/export-buttons.component';
import { SommaireComponent } from './shared/sommaire/sommaire.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        RendementComponent,
        InvestissementComponent,
        CashflowComponent,
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
        SimulateurDefiscalisationComponent,
        SimulateurDividendeEntrepriseComponent,
        SimulateurMicroEntrepreneurComponent,
        SimulateurEligibiliteLepComponent,
        SimulateurPtzComponent,
        SimulateurSuccessionComponent,
        SimulateurCoutEnfantComponent,
        SimulateurViagerComponent,
        SimulateurCapaciteEmpruntComponent,
        SimulateurRachatCreditComponent,
        SimulateurPerComponent,
        SimulateurFraisGardeComponent,
        SimulateurSasuEurlComponent,
        SimulateurPeaAssuranceVieComponent,
        SimulateurEpargneObjectifComponent,
        SimulateurRemboursementAnticipeComponent,
        SimulateurPouvoirAchatComponent,
        SimulateurCreditConsoComponent,
        SimulateurScpiComponent
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
        HttpClientModule,
        FaqSectionComponent,
        ExportButtonsComponent,
        ScenarioComparisonComponent,
        InfoTooltipComponent,
        PanelMenuModule,
        MainComponent,
        SommaireComponent,
        BreadcrumbComponent
    ],
    providers: [
    provideClientHydration(),
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
