import { Component, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from '../service/seo.service'; // ajuste le chemin si besoin
import { pages } from './article.model';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-generateur-article',
  templateUrl: './generateur-article.component.html',
  styleUrl: './generateur-article.component.scss'
})

export class ContenuPageComponent implements OnInit {
  pageSlug: string = '';
  pageData: any;


  constructor(
    private router: Router,

    private route: ActivatedRoute,
    private seoService: SeoService
  ) {}


  ngOnInit(): void {
    // Extrait l’URL complète, puis récupère ce qu’il y a après "/article/"
    const fullUrl = this.router.url;
    this.pageSlug = fullUrl.replace('/article/', '').split('?')[0]; // ignore les éventuels query params
    this.pageData = pages[this.pageSlug];

    if (this.pageData) {
      this.seoService.updateMetaData({
        title: `${this.pageData.titre} | CalculateurFinance.fr`,
        description: this.pageData.description,
        url: `https://calculateurfinance.fr/article/${this.pageSlug}`,
        image: '/assets/default-og-image.png'
      });
    }
  }

}


