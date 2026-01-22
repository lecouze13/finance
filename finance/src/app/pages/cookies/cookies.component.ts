import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../Constructor/service/seo.service';

@Component({
  selector: 'app-cookies',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss']
})
export class CookiesComponent implements OnInit {
  lastUpdate: string = '19 janvier 2026';

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetaData({
      title: 'Politique de Cookies | CalculateurFinance',
      description: 'Politique de cookies de CalculateurFinance : types de cookies utilisés, finalités, durée de conservation et comment les gérer.',
      url: 'https://calculateurfinance.fr/cookies/',
      robots: 'noindex, follow'
    });
  }
}
