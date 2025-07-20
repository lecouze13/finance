import { Component, OnInit, Renderer2 } from '@angular/core';
import { SeoService } from '../../Constructor/service/seo.service'; import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
@Component({
  selector: 'app-cashflow',
  templateUrl: './cashflow.component.html',
})
export class CashflowComponent implements OnInit {
  Element: string[] = ['Loyer', 'Crédit', 'Charges', 'Impôts'];
  values: { [key: string]: number } = {};
  cashflow = 0;

  constructor(
    private seo: SeoService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }


  ngOnInit(): void {

    this.seo.updateMetaData({
      title: 'Simulateur cashflow immobilier 2025 | CalculateurFinance.fr',
      description:
        'Estimez votre cashflow immobilier en prenant en compte vos loyers, charges et crédits. Outil simple et gratuit.',
      url: 'https://calculateurfinance.fr/cashflow-immobilier/',
    });

    // ✅ Ajout sécurisé du JSON-LD uniquement côté navigateur
    if (isPlatformBrowser(this.platformId)) {
      const script = this.renderer.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FinancialProduct",
        "name": "Simulateur de cashflow immobilier",
        "description": "Estimez votre cashflow immobilier avec notre simulateur. Comparez loyers, crédits, charges et impôts pour un investissement rentable.",
        "url": "https://calculateurfinance.fr/cashflow-immobilier/",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
      });
      this.renderer.appendChild(document.head, script);
    }
  }

  calculCashflow() {
    this.cashflow = this.values['Loyer'] - this.values['Crédit'] - this.values['Charges'] - this.values['Impôts'];

  }
}
