import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-politique-confidentialite',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './politique-confidentialite.component.html',
  styleUrls: ['./politique-confidentialite.component.scss']
})
export class PolitiqueConfidentialiteComponent implements OnInit {
  lastUpdate: string = '19 janvier 2026';

  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Politique de Confidentialité | CalculateurFinance');
    this.meta.updateTag({
      name: 'description',
      content: 'Politique de confidentialité RGPD de CalculateurFinance : collecte de données, cookies, droits des utilisateurs et protection des données personnelles.'
    });
    this.meta.updateTag({
      name: 'robots',
      content: 'noindex, follow'
    });
  }
}
