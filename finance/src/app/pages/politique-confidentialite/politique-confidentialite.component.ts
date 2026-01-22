import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../Constructor/service/seo.service';

@Component({
  selector: 'app-politique-confidentialite',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './politique-confidentialite.component.html',
  styleUrls: ['./politique-confidentialite.component.scss']
})
export class PolitiqueConfidentialiteComponent implements OnInit {
  lastUpdate: string = '19 janvier 2026';

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetaData({
      title: 'Politique de Confidentialité | CalculateurFinance',
      description: 'Politique de confidentialité RGPD de CalculateurFinance : collecte de données, cookies, droits des utilisateurs et protection des données personnelles.',
      url: 'https://calculateurfinance.fr/politique-de-confidentialite/',
      robots: 'noindex, follow'
    });
  }
}
