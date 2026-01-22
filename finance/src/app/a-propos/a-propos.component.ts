import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../Constructor/service/seo.service';

@Component({
  selector: 'app-a-propos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './a-propos.component.html',
  styleUrl: './a-propos.component.scss'
})
export class AProposComponent implements OnInit {
  simulateursCount: number = 50;
  articlesCount: number = 40;

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetaData({
      title: 'À Propos | CalculateurFinance - Simulateurs Financiers Gratuits',
      description: 'Découvrez CalculateurFinance : plus de 60 simulateurs financiers et immobiliers 100% gratuits, indépendants et sans inscription. Notre mission, notre méthodologie et nos valeurs.',
      url: 'https://calculateurfinance.fr/a-propos/',
      keywords: 'à propos, calculateur finance, simulateurs gratuits, méthodologie, mission, valeurs'
    });
  }
}
