import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppRoutes } from '../../Model/pathName.model';
import { pages } from '../generateur-article/article.model';
import { livretsSimu } from '../generateur-article/simulateur-livret/livret.page';

export interface SearchItem {
  label: string;
  route: string;
  type: 'simulateur' | 'article' | 'livret';
  keywords?: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;
  afficherCalculatrice: boolean = false;

  // Search functionality
  searchQuery: string = '';
  searchResults: SearchItem[] = [];
  allSearchItems: SearchItem[] = [];
  showSearchResults: boolean = false;

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
      // const indiceitems = allEntries
      // .filter(([, value]) => value.categorie === 'indices mondiaux')
      // .map(([key, value]) => ({
      //   label: value.titre,
      //   route: `/article/${key}`,
      // }));


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
              {
                label: 'PTZ (Prêt à Taux Zéro)',
                route: AppRoutes.SIMULATEUR_PTZ,
              },
              {
                label: 'Capacite emprunt',
                route: AppRoutes.SIMULATEUR_CAPACITE_EMPRUNT,
              },
              {
                label: 'Viager (calcul rente)',
                route: AppRoutes.SIMULATEUR_VIAGER,
              },
              {
                label: 'Sortie de Pinel',
                route: AppRoutes.SIMULATEUR_SORTIE_PINEL,
              },
              {
                label: 'Rachat de soulte (héritage)',
                route: AppRoutes.SIMULATEUR_RACHAT_SOULTE,
              },
              {
                label: 'Passoire thermique (DPE)',
                route: AppRoutes.SIMULATEUR_PASSOIRE_THERMIQUE,
              },
              {
                label: 'Holding vs Nom Propre',
                route: AppRoutes.SIMULATEUR_HOLDING_VS_DIRECT,
              },
              {
                label: 'Arbitrage AV vs Immo',
                route: AppRoutes.SIMULATEUR_ARBITRAGE_AV_IMMO,
              },
              {
                label: 'Crédit relais',
                route: AppRoutes.SIMULATEUR_CREDIT_RELAIS,
              },
              {
                label: 'Charges locatives',
                route: AppRoutes.SIMULATEUR_CHARGES_LOCATIVES,
              },
              {
                label: 'Colocation',
                route: AppRoutes.SIMULATEUR_COLOCATION,
              },
              {
                label: 'Rénovation énergétique',
                route: AppRoutes.SIMULATEUR_RENOVATION_ENERGETIQUE,
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
              {
                label: 'Micro entrepreneur',
                route: AppRoutes.SIMULATEUR_MICRO_ENTREPRENEUR,
              },
              {
                label: 'Droits de succession',
                route: AppRoutes.SIMULATEUR_SUCCESSION,
              },
              {
                label: 'Coût d\'un enfant',
                route: AppRoutes.SIMULATEUR_COUT_ENFANT,
              },
              {
                label: 'Rachat de crédit',
                route: AppRoutes.SIMULATEUR_RACHAT_CREDIT,
              },
              {
                label: 'PER (Plan Épargne Retraite)',
                route: AppRoutes.SIMULATEUR_PER,
              },
              {
                label: 'Frais de garde',
                route: AppRoutes.SIMULATEUR_FRAIS_GARDE,
              },
              {
                label: 'SASU vs EURL',
                route: AppRoutes.SIMULATEUR_SASU_EURL,
              },
              {
                label: 'PEA vs Assurance-vie',
                route: AppRoutes.SIMULATEUR_PEA_ASSURANCE_VIE,
              },
              {
                label: 'Épargne objectif',
                route: AppRoutes.SIMULATEUR_EPARGNE_OBJECTIF,
              },
              {
                label: 'Remboursement anticipé',
                route: AppRoutes.SIMULATEUR_REMBOURSEMENT_ANTICIPE,
              },
              {
                label: 'Pouvoir d\'achat / Inflation',
                route: AppRoutes.SIMULATEUR_POUVOIR_ACHAT,
              },
              {
                label: 'Crédit consommation',
                route: AppRoutes.SIMULATEUR_CREDIT_CONSO,
              },
              {
                label: 'SCPI (rentabilité)',
                route: AppRoutes.SIMULATEUR_SCPI,
              },
              {
                label: 'Donation (transmission)',
                route: AppRoutes.SIMULATEUR_DONATION,
              },
              {
                label: 'Statut Freelance',
                route: AppRoutes.SIMULATEUR_FREELANCE,
              },
              {
                label: 'Électricité HP/HC',
                route: AppRoutes.SIMULATEUR_ELECTRICITE_HPHC,
              },
              {
                label: 'DCA vs Lump Sum',
                route: AppRoutes.SIMULATEUR_DCA_LUMPSUM,
              },
              {
                label: 'Crypto fiscalité',
                route: AppRoutes.SIMULATEUR_CRYPTO_FISCALITE,
              },
              {
                label: 'Crowdfunding immobilier',
                route: AppRoutes.SIMULATEUR_CROWDFUNDING_IMMO,
              },
              {
                label: 'Leasing vs Achat voiture',
                route: AppRoutes.SIMULATEUR_LEASING_VOITURE,
              },
              {
                label: 'Rachat trimestres retraite',
                route: AppRoutes.SIMULATEUR_RACHAT_TRIMESTRES,
              },
              {
                label: 'Prime Partage Valeur (PPV)',
                route: AppRoutes.SIMULATEUR_PPV,
              },
              {
                label: 'Participation / Intéressement',
                route: AppRoutes.SIMULATEUR_INTERESSEMENT,
              },
            ].sort((a, b) => a.label.localeCompare(b.label)),

          },
          {
              label: 'Simulateurs Livrets & Aides',
        icon: 'pi pi-building',

        items:[...simuLivret,
              {
                label: 'APL (Aide au logement)',
                route: AppRoutes.SIMULATEUR_APL,
              },
              {
                label: 'Eligibilité LEP',
                route: AppRoutes.SIMULATEUR_ELIGIBILITE_LEP,
              }, ]
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

    // Initialize search items
    this.initSearchItems();
  }

  initSearchItems(): void {
    // Add all simulators
    const simulateurs: SearchItem[] = [
      { label: 'Rendement locatif', route: '/rendement-locatif', type: 'simulateur', keywords: 'rendement locatif immobilier investissement' },
      { label: 'Cash flow immobilier', route: '/cashflow-immobilier', type: 'simulateur', keywords: 'cashflow cash flow immobilier' },
      { label: 'Crédit immobilier', route: '/simulateur-credit-immobilier', type: 'simulateur', keywords: 'credit immobilier emprunt pret' },
      { label: 'Capacité d\'emprunt', route: '/simulateur-capacite-emprunt', type: 'simulateur', keywords: 'capacite emprunt credit' },
      { label: 'Frais de notaire', route: '/calcul-frais-de-notaire', type: 'simulateur', keywords: 'frais notaire achat immobilier' },
      { label: 'TRI immobilier', route: '/tri-immobilier', type: 'simulateur', keywords: 'tri taux rendement interne' },
      { label: 'Achat vs Location', route: '/achat-vs-location', type: 'simulateur', keywords: 'achat location louer acheter' },
      { label: 'LMNP / LMP', route: '/lmnp-lmp-regime-fiscal', type: 'simulateur', keywords: 'lmnp lmp meuble location' },
      { label: 'SCI IR vs IS', route: '/comparateur-sci-impot', type: 'simulateur', keywords: 'sci impot societe civile' },
      { label: 'Plus-value immobilière', route: '/simulateur-plus-value-immobiliere', type: 'simulateur', keywords: 'plus value immobiliere vente' },
      { label: 'PTZ', route: '/simulateur-ptz', type: 'simulateur', keywords: 'ptz pret taux zero' },
      { label: 'Viager', route: '/simulateur-viager', type: 'simulateur', keywords: 'viager rente bouquet' },
      { label: 'Sortie Pinel', route: '/simulateur-sortie-pinel', type: 'simulateur', keywords: 'pinel defiscalisation sortie' },
      { label: 'Rachat de soulte', route: '/simulateur-rachat-soulte', type: 'simulateur', keywords: 'soulte rachat divorce heritage' },
      { label: 'Passoire thermique', route: '/simulateur-passoire-thermique', type: 'simulateur', keywords: 'dpe passoire thermique energie' },
      { label: 'Holding vs Nom Propre', route: '/simulateur-holding-vs-direct', type: 'simulateur', keywords: 'holding nom propre societe' },
      { label: 'Arbitrage AV / Immo', route: '/simulateur-arbitrage-av-immo', type: 'simulateur', keywords: 'assurance vie immobilier arbitrage' },
      { label: 'Crédit relais', route: '/simulateur-credit-relais', type: 'simulateur', keywords: 'credit relais vente achat' },
      { label: 'Charges locatives', route: '/simulateur-charges-locatives', type: 'simulateur', keywords: 'charges locatives repartition' },
      { label: 'Intérêts composés', route: '/interet-compose', type: 'simulateur', keywords: 'interet compose epargne' },
      { label: 'Impôt sur le revenu', route: '/simulateur-impot-revenue', type: 'simulateur', keywords: 'impot revenu ir fiscal' },
      { label: 'Brut / Net', route: '/simulateur-brut-net', type: 'simulateur', keywords: 'salaire brut net conversion' },
      { label: 'Indépendance financière', route: '/simulateur-independance-financiere', type: 'simulateur', keywords: 'fire independance financiere retraite' },
      { label: 'Retraite', route: '/simulateur-retraite', type: 'simulateur', keywords: 'retraite pension age' },
      { label: 'Crédit Lombard', route: '/simulateur-credit-lombard', type: 'simulateur', keywords: 'lombard credit nantissement' },
      { label: 'Droits de succession', route: '/simulateur-droits-succession', type: 'simulateur', keywords: 'succession heritage droits' },
      { label: 'Plan Épargne Retraite', route: '/simulateur-per', type: 'simulateur', keywords: 'per plan epargne retraite' },
      { label: 'SASU vs EURL', route: '/simulateur-sasu-eurl', type: 'simulateur', keywords: 'sasu eurl entreprise statut' },
      { label: 'Crédit consommation', route: '/simulateur-credit-consommation', type: 'simulateur', keywords: 'credit consommation pret personnel' },
      { label: 'SCPI', route: '/simulateur-scpi', type: 'simulateur', keywords: 'scpi pierre papier immobilier' },
      { label: 'APL', route: '/simulateur-apl', type: 'simulateur', keywords: 'apl aide logement allocation' },
      { label: 'Donation', route: '/simulateur-donation', type: 'simulateur', keywords: 'donation transmission abattement' },
      { label: 'Statut Freelance', route: '/simulateur-freelance', type: 'simulateur', keywords: 'freelance micro entreprise auto entrepreneur' },
      { label: 'Électricité HP/HC', route: '/simulateur-electricite-hphc', type: 'simulateur', keywords: 'electricite heures pleines creuses edf' },
      { label: 'IFI', route: '/simulateur-impot-fortune-immobiliere', type: 'simulateur', keywords: 'ifi impot fortune immobiliere' },
      { label: 'Budget immobilier', route: '/budget-immobilier', type: 'simulateur', keywords: 'budget immobilier achat' },
      { label: 'Micro-foncier vs Réel', route: '/simulateur-location-nue-regime', type: 'simulateur', keywords: 'micro foncier reel location nue' },
      { label: 'Apport vs Emprunt', route: '/simulateur-apport-vs-emprunt', type: 'simulateur', keywords: 'apport emprunt investissement' },
      { label: 'AIRBNB vs Location', route: '/airbnb-vs-location', type: 'simulateur', keywords: 'airbnb location courte duree' },
      { label: 'Défiscalisation', route: '/simulateur-defiscalisation', type: 'simulateur', keywords: 'defiscalisation pinel denormandie' },
      { label: 'Dividendes FIRE', route: '/simulateur-dividend-fire', type: 'simulateur', keywords: 'dividendes fire independance' },
      { label: 'Dividendes entreprise', route: '/simulateur-dividendes-entreprise', type: 'simulateur', keywords: 'dividendes entreprise distribution' },
      { label: 'Micro entrepreneur', route: '/simulateur-micro-entrepreneur', type: 'simulateur', keywords: 'micro entrepreneur auto entreprise' },
      { label: 'Eligibilité LEP', route: '/simulateur-eligibilite-lep', type: 'simulateur', keywords: 'lep eligibilite livret populaire' },
      { label: 'Coût d\'un enfant', route: '/simulateur-cout-enfant', type: 'simulateur', keywords: 'cout enfant budget famille' },
      { label: 'Rachat de crédit', route: '/simulateur-rachat-credit', type: 'simulateur', keywords: 'rachat credit regroupement' },
      { label: 'Frais de garde', route: '/simulateur-frais-garde', type: 'simulateur', keywords: 'frais garde creche nounou' },
      { label: 'PEA vs Assurance-vie', route: '/simulateur-pea-assurance-vie', type: 'simulateur', keywords: 'pea assurance vie comparaison' },
      { label: 'Épargne objectif', route: '/simulateur-epargne-objectif', type: 'simulateur', keywords: 'epargne objectif projet' },
      { label: 'Remboursement anticipé', route: '/simulateur-remboursement-anticipe', type: 'simulateur', keywords: 'remboursement anticipe credit' },
      { label: 'Pouvoir d\'achat', route: '/simulateur-pouvoir-achat', type: 'simulateur', keywords: 'pouvoir achat inflation' },
      { label: 'DCA vs Lump Sum', route: '/simulateur-dca-lumpsum', type: 'simulateur', keywords: 'dca lump sum investissement progressif' },
      { label: 'Crypto fiscalité', route: '/simulateur-crypto-fiscalite', type: 'simulateur', keywords: 'crypto bitcoin fiscalite flat tax' },
      { label: 'Crowdfunding immobilier', route: '/simulateur-crowdfunding-immo', type: 'simulateur', keywords: 'crowdfunding immobilier financement participatif' },
      { label: 'Leasing vs Achat voiture', route: '/simulateur-leasing-voiture', type: 'simulateur', keywords: 'leasing loa lld voiture credit auto' },
      { label: 'Rachat trimestres retraite', route: '/simulateur-rachat-trimestres', type: 'simulateur', keywords: 'rachat trimestres retraite pension' },
      { label: 'Prime de Partage de la Valeur', route: '/simulateur-ppv', type: 'simulateur', keywords: 'ppv prime partage valeur macron' },
      { label: 'Participation / Intéressement', route: '/simulateur-interessement', type: 'simulateur', keywords: 'interessement participation pee perco epargne salariale' },
      { label: 'Colocation', route: '/simulateur-colocation', type: 'simulateur', keywords: 'colocation location chambre rendement' },
      { label: 'Rénovation énergétique', route: '/simulateur-renovation-energetique', type: 'simulateur', keywords: 'renovation energetique dpe maprimerénov aide' },
    ];

    // Add livret simulators
    const livretSimulateurs: SearchItem[] = Object.entries(livretsSimu).map(([key, value]) => ({
      label: `Simulateur ${value.title}`,
      route: `/simulateur-livret/${key}`,
      type: 'livret' as const,
      keywords: `${value.title.toLowerCase()} livret epargne`
    }));

    // Add articles
    const articles: SearchItem[] = Object.entries(pages).map(([key, value]) => ({
      label: value.titre,
      route: `/article/${key}`,
      type: 'article' as const,
      keywords: value.keywords || value.titre.toLowerCase()
    }));

    this.allSearchItems = [...simulateurs, ...livretSimulateurs, ...articles];
  }

  onSearchInput(): void {
    if (this.searchQuery.length < 2) {
      this.searchResults = [];
      this.showSearchResults = false;
      return;
    }

    const query = this.searchQuery.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    this.searchResults = this.allSearchItems.filter(item => {
      const label = item.label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const keywords = (item.keywords || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return label.includes(query) || keywords.includes(query);
    }).slice(0, 10);

    this.showSearchResults = this.searchResults.length > 0;
  }

  selectSearchItem(item: SearchItem): void {
    this.router.navigate([item.route]);
    this.searchQuery = '';
    this.searchResults = [];
    this.showSearchResults = false;
  }

  onSearchBlur(): void {
    // Delay to allow click on result
    setTimeout(() => {
      this.showSearchResults = false;
    }, 200);
  }

  getTypeIcon(type: string): string {
    switch (type) {
      case 'simulateur': return 'pi pi-calculator';
      case 'article': return 'pi pi-book';
      case 'livret': return 'pi pi-wallet';
      default: return 'pi pi-search';
    }
  }

  getTypeLabel(type: string): string {
    switch (type) {
      case 'simulateur': return 'Simulateur';
      case 'article': return 'Article';
      case 'livret': return 'Livret';
      default: return '';
    }
  }
}
