import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from '../service/seo.service';
import { pages } from './article.model';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-generateur-article',
  templateUrl: './generateur-article.component.html',
  styleUrl: './generateur-article.component.scss'
})
export class ContenuPageComponent implements OnInit, OnDestroy {
  pageSlug: string = '';
  pageData: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Extrait l'URL complète, puis récupère ce qu'il y a après "/article/"
    const fullUrl = this.router.url;
    this.pageSlug = fullUrl.replace('/article/', '').split('?')[0];
    this.pageData = pages[this.pageSlug];

    if (this.pageData) {
      const articleUrl = `https://calculateurfinance.fr/article/${this.pageSlug}/`;

      // Meta tags classiques
      this.seoService.updateMetaData({
        title: `${this.pageData.titre} | CalculateurFinance.fr`,
        description: this.pageData.description,
        url: articleUrl,
        image: this.pageData.image || 'https://calculateurfinance.fr/assets/logo.png',
        keywords: `${this.pageData.keywords}`
      });

      // Schema Article pour les rich snippets Google
      this.seoService.addArticleSchema({
        headline: this.pageData.titre,
        description: this.pageData.description,
        url: articleUrl,
        image: this.pageData.image || 'https://calculateurfinance.fr/assets/logo.png',
        datePublished: this.pageData.datePublished || '2024-01-01',
        dateModified: this.pageData.dateModified || new Date().toISOString().split('T')[0],
        author: 'CalculateurFinance',
        keywords: this.pageData.keywords ? this.pageData.keywords.split(',').map((k: string) => k.trim()) : []
      });
    }
  }

  ngOnDestroy(): void {
    // Nettoyer le schema Article lors de la navigation
    this.seoService.clearDynamicSchemas();
  }
}


