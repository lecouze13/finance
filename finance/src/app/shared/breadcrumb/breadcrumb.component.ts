import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';

export interface BreadcrumbItem {
  label: string;
  url?: string;
  queryParams?: { [key: string]: string };
  icon?: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  items: BreadcrumbItem[] = [];
  private routerSub?: Subscription;
  private isBrowser: boolean;

  // Types pour le catalogue
  private typeMapping: { [key: string]: string } = {
    'article': 'article',
    'simulateur': 'simulateur',
    'comparateur': 'simulateur',
    'simulateur-livret': 'simulateur'
  };

  // Mapping des noms de pages
  private pageNames: { [key: string]: string } = {
    'rendement-locatif': 'Rendement Locatif',
    'cashflow-immobilier': 'Cashflow Immobilier',
    'frais-notaire': 'Frais de Notaire',
    'credit-immobilier': 'Crédit Immobilier',
    'lmnp-lmp': 'LMNP vs LMP',
    'sci-ir-is': 'SCI IR vs IS',
    'plus-value-immobiliere': 'Plus-Value Immobilière',
    'tri-immobilier': 'TRI Immobilier',
    'achat-vs-location': 'Achat vs Location',
    'impot-revenu': 'Impôt sur le Revenu',
    'brut-net': 'Brut / Net',
    'budget': 'Budget Personnel',
    'retraite': 'Retraite',
    'interet-compose': 'Intérêts Composés',
    'independance-financiere': 'Indépendance Financière',
    'credit-lombard': 'Crédit Lombard',
    'eligibilite-lep': 'Éligibilité LEP',
    'apl': 'Simulateur APL',
    'ptz': 'Prêt à Taux Zéro',
    'succession': 'Succession',
    'viager': 'Viager',
    'capacite-emprunt': 'Capacité d\'Emprunt',
    'rachat-credit': 'Rachat de Crédit',
    'per': 'Plan Épargne Retraite',
    'frais-garde': 'Frais de Garde',
    'sasu-eurl': 'SASU vs EURL',
    'pea-assurance-vie': 'PEA vs Assurance Vie',
    'epargne-objectif': 'Épargne Objectif',
    'remboursement-anticipe': 'Remboursement Anticipé',
    'pouvoir-achat': 'Pouvoir d\'Achat',
    'credit-conso': 'Crédit Consommation',
    'scpi': 'SCPI',
    'sortie-pinel': 'Sortie Pinel',
    'rachat-soulte': 'Rachat de Soulte',
    'passoire-thermique': 'Passoire Thermique',
    'holding-vs-direct': 'Holding vs Direct',
    'arbitrage-av-immo': 'Arbitrage AV/Immo',
    'credit-relais': 'Crédit Relais',
    'donation': 'Donation',
    'charges-locatives': 'Charges Locatives',
    'freelance': 'Freelance',
    'electricite-hphc': 'Électricité HP/HC',
    'dca-lumpsum': 'DCA vs Lump Sum',
    'crypto-fiscalite': 'Crypto Fiscalité',
    'crowdfunding-immo': 'Crowdfunding Immo',
    'leasing-voiture': 'Leasing Voiture',
    'rachat-trimestres': 'Rachat Trimestres',
    'ppv': 'Prime de Partage',
    'interessement': 'Intéressement',
    'colocation': 'Colocation',
    'renovation-energetique': 'Rénovation Énergétique',
    'dividendes-salaire': 'Dividendes vs Salaire',
    'dividend-fire': 'Dividendes FIRE',
    'micro-entrepreneur': 'Micro-Entrepreneur',
    'defiscalisation': 'Défiscalisation',
    'dividende-entreprise': 'Dividendes Entreprise',
    'ifi': 'IFI',
    'cout-enfant': 'Coût Enfant',
    'apport-vs-emprunt': 'Apport vs Emprunt',
    'location-nue': 'Location Nue',
    'airbnb-vs-location': 'Airbnb vs Location',
    'catalogue': 'Catalogue',
    // Articles
    'pea': 'PEA',
    'assurance-vie': 'Assurance Vie',
    'livret-a': 'Livret A',
    'ldds': 'LDDS',
    'lep': 'LEP',
    'pel': 'PEL',
    'cel': 'CEL',
    'etf': 'ETF',
    'cac40': 'CAC 40',
    'sp500': 'S&P 500',
    'msciworld': 'MSCI World',
    'investissement-locatif': 'Investissement Locatif',
    'lmnp-guide': 'Guide LMNP',
    'sci-immobiliere': 'SCI Immobilière',
    'guide-scpi': 'Guide SCPI'
  };

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.generateBreadcrumb(this.router.url);

    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.generateBreadcrumb(event.urlAfterRedirects || event.url);
      });
  }

  private generateBreadcrumb(url: string): void {
    this.items = [];

    // Ignorer la page d'accueil
    if (url === '/' || url === '') {
      return;
    }

    // Ajouter l'accueil
    this.items.push({
      label: 'Accueil',
      url: '/',
      icon: 'pi pi-home'
    });

    // Parser l'URL
    const cleanUrl = url.split('?')[0].split('#')[0];
    const segments = cleanUrl.split('/').filter(s => s);

    if (segments.length === 0) return;

    // Détecter le type (article, simulateur, etc.)
    const type = this.detectType(segments);

    if (type && segments[0] !== 'catalogue') {
      // Ajouter le lien vers le catalogue avec le filtre approprié
      this.items.push({
        label: type === 'article' ? 'Articles' : 'Simulateurs',
        url: '/catalogue',
        queryParams: { type: type },
        icon: type === 'article' ? 'pi pi-book' : 'pi pi-calculator'
      });
    }

    // Ajouter la page actuelle
    const lastSegment = segments[segments.length - 1];
    const pageName = this.getPageName(lastSegment);

    this.items.push({
      label: pageName
    });
  }

  private detectType(segments: string[]): string | null {
    const firstSegment = segments[0];

    if (firstSegment === 'article') {
      return 'article';
    }

    if (firstSegment === 'simulateur-livret') {
      return 'simulateur';
    }

    if (firstSegment.includes('simulateur') || firstSegment.includes('comparateur')) {
      return 'simulateur';
    }

    // Vérifier les routes connues de simulateurs
    const simulatorRoutes = [
      'rendement-locatif', 'cashflow-immobilier', 'frais-notaire', 'credit-immobilier',
      'lmnp-lmp', 'sci-ir-is', 'tri-immobilier', 'achat-vs-location', 'impot-revenu',
      'brut-net', 'budget', 'retraite', 'interet-compose', 'independance-financiere',
      'credit-lombard', 'eligibilite-lep', 'apl', 'ptz', 'succession', 'viager',
      'capacite-emprunt', 'rachat-credit', 'per', 'frais-garde', 'sasu-eurl',
      'investissement', 'airbnb-vs-location'
    ];

    if (simulatorRoutes.some(r => firstSegment.includes(r))) {
      return 'simulateur';
    }

    return null;
  }

  private getPageName(segment: string): string {
    // Nettoyer le segment
    const clean = segment
      .replace('simulateur-', '')
      .replace('comparateur-', '');

    // Chercher dans le mapping
    if (this.pageNames[clean]) {
      return this.pageNames[clean];
    }

    if (this.pageNames[segment]) {
      return this.pageNames[segment];
    }

    // Sinon, formater le segment
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  isLast(index: number): boolean {
    return index === this.items.length - 1;
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }
}
