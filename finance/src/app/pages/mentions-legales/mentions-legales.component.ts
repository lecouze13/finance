import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../Constructor/service/seo.service';

@Component({
  selector: 'app-mentions-legales',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mentions-legales.component.html',
  styleUrls: ['./mentions-legales.component.scss']
})
export class MentionsLegalesComponent implements OnInit {
  lastUpdate: string = '19 janvier 2026';

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetaData({
      title: 'Mentions Légales | CalculateurFinance',
      description: 'Mentions légales du site CalculateurFinance.fr : éditeur, hébergeur, propriété intellectuelle et conditions d\'utilisation des simulateurs financiers.',
      url: 'https://calculateurfinance.fr/mentions-legales/',
      robots: 'noindex, follow'
    });
  }
}
