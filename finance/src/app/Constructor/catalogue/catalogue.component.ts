import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { SeoService } from '../service/seo.service';
import { pages } from '../generateur-article/article.model';
import { livretsSimu } from '../generateur-article/simulateur-livret/livret.page';
import { immobilier } from '../generateur-article/immobilier.model';

interface CatalogueItem {
  id: string;
  title: string;
  description: string;
  route: string;
  type: 'simulateur' | 'article' | 'livret';
  category: string;
  tags: string[];
  icon: string;
}

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    InputTextModule,
    DropdownModule,
    MultiSelectModule,
    ButtonModule,
    TagModule
  ],
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  allItems: CatalogueItem[] = [];
  filteredItems: CatalogueItem[] = [];

  searchQuery: string = '';
  selectedType: string = '';
  selectedCategory: string = '';
  selectedTags: string[] = [];

  typeOptions = [
    { label: 'Tous les types', value: '' },
    { label: 'Simulateurs', value: 'simulateur' },
    { label: 'Articles', value: 'article' },
    { label: 'Livrets', value: 'livret' }
  ];

  categoryOptions: { label: string; value: string }[] = [];
  tagOptions: { label: string; value: string }[] = [];

  stats = {
    simulateurs: 0,
    articles: 0,
    livrets: 0,
    total: 0
  };

  constructor(
    private seoService: SeoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.seoService.updateMetaData({
      title: 'Catalogue | Tous nos simulateurs et articles financiers',
      description: 'Découvrez tous nos simulateurs financiers et immobiliers, ainsi que nos articles et guides pratiques. Filtrez par catégorie pour trouver l\'outil adapté à vos besoins.',
      url: '/catalogue'
    });

    this.loadItems();
    this.buildFilters();

    // Lire les query params pour appliquer le filtre type
    this.route.queryParams.subscribe(params => {
      if (params['type']) {
        this.selectedType = params['type'];
      }
      this.applyFilters();
    });

    this.calculateStats();
  }

  loadItems(): void {
    // Simulateurs immobiliers
    const simulateursImmo: CatalogueItem[] = [
      { id: 'rendement', title: 'Rendement locatif', description: 'Calculez la rentabilité brute et nette de votre investissement locatif', route: '/rendement-locatif', type: 'simulateur', category: 'Immobilier', tags: ['rentabilité', 'investissement'], icon: 'pi-percentage' },
      { id: 'cashflow', title: 'Cash flow immobilier', description: 'Évaluez le flux de trésorerie mensuel de votre bien locatif', route: '/cashflow-immobilier', type: 'simulateur', category: 'Immobilier', tags: ['rentabilité', 'investissement'], icon: 'pi-chart-line' },
      { id: 'credit-immo', title: 'Crédit immobilier', description: 'Simulez vos mensualités et le coût total de votre prêt immobilier', route: '/simulateur-credit-immobilier', type: 'simulateur', category: 'Immobilier', tags: ['crédit', 'emprunt'], icon: 'pi-home' },
      { id: 'capacite', title: 'Capacité d\'emprunt', description: 'Calculez le montant maximum que vous pouvez emprunter', route: '/simulateur-capacite-emprunt', type: 'simulateur', category: 'Immobilier', tags: ['crédit', 'emprunt'], icon: 'pi-calculator' },
      { id: 'notaire', title: 'Frais de notaire', description: 'Estimez les frais de notaire pour votre achat immobilier', route: '/calcul-frais-de-notaire', type: 'simulateur', category: 'Immobilier', tags: ['achat', 'frais'], icon: 'pi-file' },
      { id: 'tri', title: 'TRI immobilier', description: 'Calculez le taux de rendement interne de votre investissement', route: '/tri-immobilier', type: 'simulateur', category: 'Immobilier', tags: ['rentabilité', 'investissement'], icon: 'pi-chart-bar' },
      { id: 'achat-location', title: 'Achat vs Location', description: 'Comparez le coût entre acheter et louer votre résidence', route: '/achat-vs-location', type: 'simulateur', category: 'Immobilier', tags: ['comparatif', 'achat'], icon: 'pi-sync' },
      { id: 'lmnp', title: 'LMNP / LMP', description: 'Simulez votre fiscalité en location meublée', route: '/lmnp-lmp-regime-fiscal', type: 'simulateur', category: 'Immobilier', tags: ['fiscalité', 'location'], icon: 'pi-building' },
      { id: 'sci', title: 'SCI IR vs IS', description: 'Comparez la fiscalité SCI à l\'IR ou à l\'IS', route: '/comparateur-sci-impot', type: 'simulateur', category: 'Immobilier', tags: ['fiscalité', 'société'], icon: 'pi-briefcase' },
      { id: 'plus-value', title: 'Plus-value immobilière', description: 'Calculez l\'impôt sur la plus-value à la revente', route: '/simulateur-plus-value-immobiliere', type: 'simulateur', category: 'Immobilier', tags: ['fiscalité', 'vente'], icon: 'pi-arrow-up' },
      { id: 'ptz', title: 'PTZ', description: 'Vérifiez votre éligibilité au prêt à taux zéro', route: '/simulateur-ptz', type: 'simulateur', category: 'Immobilier', tags: ['crédit', 'aide'], icon: 'pi-gift' },
      { id: 'viager', title: 'Viager', description: 'Calculez le bouquet et la rente viagère', route: '/simulateur-viager', type: 'simulateur', category: 'Immobilier', tags: ['achat', 'investissement'], icon: 'pi-users' },
      { id: 'pinel', title: 'Sortie Pinel', description: 'Optimisez votre sortie du dispositif Pinel', route: '/simulateur-sortie-pinel', type: 'simulateur', category: 'Immobilier', tags: ['fiscalité', 'défiscalisation'], icon: 'pi-sign-out' },
      { id: 'soulte', title: 'Rachat de soulte', description: 'Calculez la soulte lors d\'un divorce ou héritage', route: '/simulateur-rachat-soulte', type: 'simulateur', category: 'Immobilier', tags: ['succession', 'divorce'], icon: 'pi-euro' },
      { id: 'dpe', title: 'Passoire thermique', description: 'Évaluez l\'impact du DPE sur votre investissement', route: '/simulateur-passoire-thermique', type: 'simulateur', category: 'Immobilier', tags: ['énergie', 'rénovation'], icon: 'pi-bolt' },
      { id: 'holding', title: 'Holding vs Nom Propre', description: 'Comparez l\'achat via holding ou en nom propre', route: '/simulateur-holding-vs-direct', type: 'simulateur', category: 'Immobilier', tags: ['société', 'investissement'], icon: 'pi-sitemap' },
      { id: 'arbitrage', title: 'Arbitrage AV / Immo', description: 'Comparez placement immobilier vs assurance-vie', route: '/simulateur-arbitrage-av-immo', type: 'simulateur', category: 'Immobilier', tags: ['comparatif', 'investissement'], icon: 'pi-sliders-h' },
      { id: 'relais', title: 'Crédit relais', description: 'Simulez votre prêt relais entre deux achats', route: '/simulateur-credit-relais', type: 'simulateur', category: 'Immobilier', tags: ['crédit', 'achat'], icon: 'pi-link' },
      { id: 'charges', title: 'Charges locatives', description: 'Calculez la répartition des charges locataires/propriétaire', route: '/simulateur-charges-locatives', type: 'simulateur', category: 'Immobilier', tags: ['location', 'gestion'], icon: 'pi-list' },
      { id: 'colocation', title: 'Colocation', description: 'Optimisez le rendement de votre bien en colocation', route: '/simulateur-colocation', type: 'simulateur', category: 'Immobilier', tags: ['location', 'rentabilité'], icon: 'pi-users' },
      { id: 'renovation', title: 'Rénovation énergétique', description: 'Calculez les aides et la rentabilité de vos travaux', route: '/simulateur-renovation-energetique', type: 'simulateur', category: 'Immobilier', tags: ['rénovation', 'aide'], icon: 'pi-wrench' },
      { id: 'defiscalisation', title: 'Défiscalisation', description: 'Simulez les dispositifs Pinel, Denormandie, etc.', route: '/simulateur-defiscalisation', type: 'simulateur', category: 'Immobilier', tags: ['fiscalité', 'défiscalisation'], icon: 'pi-percentage' },
      { id: 'location-nue', title: 'Micro-foncier vs Réel', description: 'Comparez les régimes fiscaux en location nue', route: '/simulateur-location-nue-regime', type: 'simulateur', category: 'Immobilier', tags: ['fiscalité', 'location'], icon: 'pi-file-edit' },
      { id: 'apport', title: 'Apport vs Emprunt', description: 'Optimisez votre stratégie d\'apport vs effet de levier', route: '/simulateur-apport-vs-emprunt', type: 'simulateur', category: 'Immobilier', tags: ['crédit', 'investissement'], icon: 'pi-wallet' },
      { id: 'airbnb', title: 'Airbnb vs Location', description: 'Comparez location courte durée vs longue durée', route: '/airbnb-vs-location', type: 'simulateur', category: 'Immobilier', tags: ['location', 'comparatif'], icon: 'pi-calendar' },
      { id: 'budget', title: 'Budget immobilier', description: 'Estimez le budget total de votre projet immobilier', route: '/budget-immobilier', type: 'simulateur', category: 'Immobilier', tags: ['achat', 'budget'], icon: 'pi-money-bill' },
      { id: 'multi-biens', title: 'Stratégie Multi-Biens', description: 'Planifiez votre trajectoire de 1 à 10+ biens avec l\'effet boule de neige', route: '/simulateur-strategie-multi-biens', type: 'simulateur', category: 'Immobilier', tags: ['investissement', 'stratégie', 'rentier'], icon: 'pi-chart-line' },
      { id: 'arbitrage-immo', title: 'Arbitrage Vendre/Conserver/Refinancer', description: 'Comparez les scénarios pour optimiser votre patrimoine immobilier', route: '/simulateur-arbitrage-immobilier', type: 'simulateur', category: 'Immobilier', tags: ['arbitrage', 'stratégie', 'patrimoine'], icon: 'pi-sliders-h' },
      { id: 'stress-test', title: 'Stress Test Immobilier', description: 'Testez la résistance de votre patrimoine face aux imprévus', route: '/simulateur-stress-test-immobilier', type: 'simulateur', category: 'Immobilier', tags: ['risque', 'résilience', 'trésorerie'], icon: 'pi-exclamation-triangle' },
      { id: 'fire-immo', title: 'FIRE Immobilier', description: 'Calculez votre chemin vers l\'indépendance financière par les loyers', route: '/simulateur-fire-immobilier', type: 'simulateur', category: 'Immobilier', tags: ['FIRE', 'rentier', 'indépendance'], icon: 'pi-flag' },
    ];

    // Simulateurs financiers
    const simulateursFin: CatalogueItem[] = [
      { id: 'interet', title: 'Intérêts composés', description: 'Calculez la puissance des intérêts composés sur votre épargne', route: '/interet-compose', type: 'simulateur', category: 'Finance', tags: ['épargne', 'investissement'], icon: 'pi-chart-line' },
      { id: 'impot', title: 'Impôt sur le revenu', description: 'Estimez votre impôt sur le revenu avec le barème progressif', route: '/simulateur-impot-revenue', type: 'simulateur', category: 'Finance', tags: ['fiscalité', 'impôt'], icon: 'pi-file' },
      { id: 'brut-net', title: 'Brut / Net', description: 'Convertissez votre salaire brut en net et vice-versa', route: '/simulateur-brut-net', type: 'simulateur', category: 'Finance', tags: ['salaire', 'emploi'], icon: 'pi-sync' },
      { id: 'fire', title: 'Indépendance financière', description: 'Calculez votre objectif FIRE et votre date de liberté', route: '/simulateur-independance-financiere', type: 'simulateur', category: 'Finance', tags: ['FIRE', 'retraite'], icon: 'pi-flag' },
      { id: 'retraite', title: 'Retraite', description: 'Estimez votre pension de retraite future', route: '/simulateur-retraite', type: 'simulateur', category: 'Finance', tags: ['retraite', 'pension'], icon: 'pi-sun' },
      { id: 'lombard', title: 'Crédit Lombard', description: 'Simulez un crédit lombard adossé à vos placements', route: '/simulateur-credit-lombard', type: 'simulateur', category: 'Finance', tags: ['crédit', 'investissement'], icon: 'pi-wallet' },
      { id: 'succession', title: 'Droits de succession', description: 'Calculez les droits de succession à payer', route: '/simulateur-droits-succession', type: 'simulateur', category: 'Finance', tags: ['succession', 'patrimoine'], icon: 'pi-users' },
      { id: 'per', title: 'Plan Épargne Retraite', description: 'Optimisez votre PER et économie d\'impôt', route: '/simulateur-per', type: 'simulateur', category: 'Finance', tags: ['retraite', 'épargne'], icon: 'pi-briefcase' },
      { id: 'sasu-eurl', title: 'SASU vs EURL', description: 'Comparez les statuts SASU et EURL pour votre entreprise', route: '/simulateur-sasu-eurl', type: 'simulateur', category: 'Finance', tags: ['entreprise', 'statut'], icon: 'pi-building' },
      { id: 'credit-conso', title: 'Crédit consommation', description: 'Calculez vos mensualités de crédit à la consommation', route: '/simulateur-credit-consommation', type: 'simulateur', category: 'Finance', tags: ['crédit', 'consommation'], icon: 'pi-shopping-cart' },
      { id: 'scpi', title: 'SCPI', description: 'Simulez la rentabilité de vos investissements en SCPI', route: '/simulateur-scpi', type: 'simulateur', category: 'Finance', tags: ['investissement', 'immobilier'], icon: 'pi-building' },
      { id: 'apl', title: 'APL', description: 'Estimez vos droits aux aides au logement', route: '/simulateur-apl', type: 'simulateur', category: 'Finance', tags: ['aide', 'logement'], icon: 'pi-home' },
      { id: 'donation', title: 'Donation', description: 'Optimisez vos donations et abattements', route: '/simulateur-donation', type: 'simulateur', category: 'Finance', tags: ['succession', 'patrimoine'], icon: 'pi-gift' },
      { id: 'freelance', title: 'Statut Freelance', description: 'Comparez les statuts pour freelance et indépendant', route: '/simulateur-freelance', type: 'simulateur', category: 'Finance', tags: ['entreprise', 'statut'], icon: 'pi-user' },
      { id: 'elec', title: 'Électricité HP/HC', description: 'Optimisez votre contrat heures pleines/creuses', route: '/simulateur-electricite-hphc', type: 'simulateur', category: 'Finance', tags: ['énergie', 'économie'], icon: 'pi-bolt' },
      { id: 'ifi', title: 'IFI', description: 'Calculez votre impôt sur la fortune immobilière', route: '/simulateur-impot-fortune-immobiliere', type: 'simulateur', category: 'Finance', tags: ['fiscalité', 'patrimoine'], icon: 'pi-euro' },
      { id: 'fire-div', title: 'Dividendes FIRE', description: 'Calculez vos revenus passifs en dividendes', route: '/simulateur-dividend-fire', type: 'simulateur', category: 'Finance', tags: ['FIRE', 'dividendes'], icon: 'pi-chart-bar' },
      { id: 'dividendes', title: 'Dividendes entreprise', description: 'Optimisez la distribution de dividendes', route: '/simulateur-dividendes-entreprise', type: 'simulateur', category: 'Finance', tags: ['entreprise', 'dividendes'], icon: 'pi-money-bill' },
      { id: 'micro', title: 'Micro entrepreneur', description: 'Simulez vos revenus en micro-entreprise', route: '/simulateur-micro-entrepreneur', type: 'simulateur', category: 'Finance', tags: ['entreprise', 'statut'], icon: 'pi-id-card' },
      { id: 'lep', title: 'Éligibilité LEP', description: 'Vérifiez votre éligibilité au Livret d\'Épargne Populaire', route: '/simulateur-eligibilite-lep', type: 'simulateur', category: 'Finance', tags: ['livret', 'épargne'], icon: 'pi-check-circle' },
      { id: 'enfant', title: 'Coût d\'un enfant', description: 'Estimez le coût moyen d\'élever un enfant', route: '/simulateur-cout-enfant', type: 'simulateur', category: 'Finance', tags: ['famille', 'budget'], icon: 'pi-heart' },
      { id: 'rachat', title: 'Rachat de crédit', description: 'Calculez l\'intérêt d\'un rachat de crédit', route: '/simulateur-rachat-credit', type: 'simulateur', category: 'Finance', tags: ['crédit', 'rachat'], icon: 'pi-refresh' },
      { id: 'garde', title: 'Frais de garde', description: 'Comparez les modes de garde et aides disponibles', route: '/simulateur-frais-garde', type: 'simulateur', category: 'Finance', tags: ['famille', 'aide'], icon: 'pi-users' },
      { id: 'pea-av', title: 'PEA vs Assurance-vie', description: 'Comparez la fiscalité PEA et assurance-vie', route: '/simulateur-pea-assurance-vie', type: 'simulateur', category: 'Finance', tags: ['investissement', 'comparatif'], icon: 'pi-chart-pie' },
      { id: 'epargne', title: 'Épargne objectif', description: 'Planifiez votre épargne pour atteindre vos objectifs', route: '/simulateur-epargne-objectif', type: 'simulateur', category: 'Finance', tags: ['épargne', 'objectif'], icon: 'pi-flag' },
      { id: 'rembours', title: 'Remboursement anticipé', description: 'Évaluez l\'intérêt d\'un remboursement anticipé', route: '/simulateur-remboursement-anticipe', type: 'simulateur', category: 'Finance', tags: ['crédit', 'remboursement'], icon: 'pi-clock' },
      { id: 'inflation', title: 'Pouvoir d\'achat', description: 'Mesurez l\'impact de l\'inflation sur votre pouvoir d\'achat', route: '/simulateur-pouvoir-achat', type: 'simulateur', category: 'Finance', tags: ['inflation', 'économie'], icon: 'pi-shopping-bag' },
      { id: 'dca', title: 'DCA vs Lump Sum', description: 'Comparez investissement progressif vs tout d\'un coup', route: '/simulateur-dca-lumpsum', type: 'simulateur', category: 'Finance', tags: ['investissement', 'stratégie'], icon: 'pi-chart-line' },
      { id: 'crypto', title: 'Crypto fiscalité', description: 'Calculez l\'impôt sur vos plus-values crypto', route: '/simulateur-crypto-fiscalite', type: 'simulateur', category: 'Finance', tags: ['crypto', 'fiscalité'], icon: 'pi-bitcoin' },
      { id: 'crowdfunding', title: 'Crowdfunding immobilier', description: 'Évaluez la rentabilité du crowdfunding immo', route: '/simulateur-crowdfunding-immo', type: 'simulateur', category: 'Finance', tags: ['investissement', 'immobilier'], icon: 'pi-users' },
      { id: 'leasing', title: 'Leasing vs Achat voiture', description: 'Comparez LOA, LLD et achat comptant', route: '/simulateur-leasing-voiture', type: 'simulateur', category: 'Finance', tags: ['auto', 'comparatif'], icon: 'pi-car' },
      { id: 'trimestres', title: 'Rachat trimestres', description: 'Calculez l\'intérêt du rachat de trimestres retraite', route: '/simulateur-rachat-trimestres', type: 'simulateur', category: 'Finance', tags: ['retraite', 'rachat'], icon: 'pi-calendar' },
      { id: 'ppv', title: 'Prime Partage Valeur', description: 'Simulez la prime de partage de la valeur (PPV)', route: '/simulateur-ppv', type: 'simulateur', category: 'Finance', tags: ['salaire', 'prime'], icon: 'pi-star' },
      { id: 'interessement', title: 'Intéressement', description: 'Optimisez participation et intéressement', route: '/simulateur-interessement', type: 'simulateur', category: 'Finance', tags: ['salaire', 'épargne'], icon: 'pi-percentage' },
      { id: 'div-salaire', title: 'Dividendes vs Salaire', description: 'Optimisez le mix dividendes/salaire pour dirigeant', route: '/simulateur-dividendes-salaire', type: 'simulateur', category: 'Finance', tags: ['entreprise', 'rémunération'], icon: 'pi-wallet' },
    ];

    // Simulateurs livrets
    const simulateursLivret: CatalogueItem[] = Object.entries(livretsSimu).map(([key, value]) => ({
      id: `livret-${key}`,
      title: `Simulateur ${value.title}`,
      description: `Calculez les intérêts de votre ${value.title}`,
      route: `/simulateur-livret/${key}`,
      type: 'livret' as const,
      category: 'Livrets',
      tags: ['épargne', 'livret'],
      icon: 'pi-wallet'
    }));

    // Articles depuis pages (finance/epargne)
    const articlesFinance: CatalogueItem[] = Object.entries(pages).map(([key, value]) => ({
      id: `article-${key}`,
      title: value.titre,
      description: value.description || '',
      route: `/article/${key}`,
      type: 'article' as const,
      category: value.categorie === 'epargne' ? 'Épargne' : value.categorie === 'investissement' ? 'Investissement' : value.categorie === 'indices mondiaux' ? 'Indices' : 'Article',
      tags: value.keywords ? value.keywords.split(',').map((k: string) => k.trim()).slice(0, 3) : [],
      icon: 'pi-book'
    }));

    // Articles immobilier
    const articlesImmo: CatalogueItem[] = Object.entries(immobilier).map(([key, value]) => ({
      id: `article-immo-${key}`,
      title: value.titre,
      description: value.description || '',
      route: `/article/${key}`,
      type: 'article' as const,
      category: 'Immobilier',
      tags: value.keywords ? value.keywords.split(',').map((k: string) => k.trim()).slice(0, 3) : [],
      icon: 'pi-book'
    }));

    this.allItems = [
      ...simulateursImmo,
      ...simulateursFin,
      ...simulateursLivret,
      ...articlesFinance,
      ...articlesImmo
    ];
  }

  buildFilters(): void {
    // Build category options
    const categories = [...new Set(this.allItems.map(item => item.category))].sort();
    this.categoryOptions = [
      { label: 'Toutes les catégories', value: '' },
      ...categories.map(cat => ({ label: cat, value: cat }))
    ];

    // Build tag options
    const allTags = this.allItems.flatMap(item => item.tags);
    const uniqueTags = [...new Set(allTags)].sort();
    this.tagOptions = uniqueTags.map(tag => ({ label: tag, value: tag }));
  }

  calculateStats(): void {
    this.stats.simulateurs = this.allItems.filter(i => i.type === 'simulateur').length;
    this.stats.articles = this.allItems.filter(i => i.type === 'article').length;
    this.stats.livrets = this.allItems.filter(i => i.type === 'livret').length;
    this.stats.total = this.allItems.length;
  }

  applyFilters(): void {
    let items = [...this.allItems];

    // Filter by search
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      items = items.filter(item => {
        const title = item.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const desc = item.description.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const tags = item.tags.join(' ').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return title.includes(query) || desc.includes(query) || tags.includes(query);
      });
    }

    // Filter by type
    if (this.selectedType) {
      items = items.filter(item => item.type === this.selectedType);
    }

    // Filter by category
    if (this.selectedCategory) {
      items = items.filter(item => item.category === this.selectedCategory);
    }

    // Filter by tags
    if (this.selectedTags.length > 0) {
      items = items.filter(item =>
        this.selectedTags.some(tag => item.tags.includes(tag))
      );
    }

    this.filteredItems = items;
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedType = '';
    this.selectedCategory = '';
    this.selectedTags = [];
    this.applyFilters();
  }

  getTypeColor(type: string): "success" | "info" | "warning" | "danger" | "secondary" | "contrast" | undefined {
    switch (type) {
      case 'simulateur': return 'info';
      case 'article': return 'success';
      case 'livret': return 'warning';
      default: return 'secondary';
    }
  }

  getTypeLabel(type: string): string {
    switch (type) {
      case 'simulateur': return 'Simulateur';
      case 'article': return 'Article';
      case 'livret': return 'Livret';
      default: return type;
    }
  }
}
