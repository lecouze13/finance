import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../service/seo.service'; // ajuste le chemin si besoin
import { pages } from './article.model';
@Component({
  selector: 'app-generateur-article',
  templateUrl: './generateur-article.component.html',
  styleUrl: './generateur-article.component.scss'
})

export class ContenuPageComponent implements OnInit {
  pageSlug: string = '';
  pageData: any;


  constructor(
    private route: ActivatedRoute,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.pageSlug = params.get('slug') || '';
      this.pageData = pages[this.pageSlug];

      if (this.pageData) {
        this.seoService.updateMetaData({
          title: this.pageData.titre + ' | CalculateurFinance.fr',
          description: this.pageData.description,
          url: 'https://calculateurfinance.fr/article/' + this.pageSlug,
          image: '/assets/default-og-image.png'
        });
      }
    });
  }
}
