import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../Constructor/service/seo.service';

@Component({
  selector: 'app-methodologie',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './methodologie.component.html',
  styleUrls: ['./methodologie.component.scss']
})
export class MethodologieComponent implements OnInit {
  lastUpdate: string = '19 janvier 2026';

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetaData({
      title: 'Méthodologie des Calculs | CalculateurFinance',
      description: 'Découvrez la méthodologie et les sources officielles utilisées pour les simulateurs de CalculateurFinance : formules de calcul, hypothèses, limites et barèmes fiscaux.',
      url: 'https://calculateurfinance.fr/methodologie/',
      keywords: 'méthodologie, calculs financiers, formules, barèmes fiscaux, hypothèses, sources officielles'
    });
  }
}
