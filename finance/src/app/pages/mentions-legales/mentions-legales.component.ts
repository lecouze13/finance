import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mentions-legales',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mentions-legales.component.html',
  styleUrls: ['./mentions-legales.component.scss']
})
export class MentionsLegalesComponent implements OnInit {
  lastUpdate: string = '19 janvier 2026';

  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Mentions Légales | CalculateurFinance');
    this.meta.updateTag({
      name: 'description',
      content: 'Mentions légales du site CalculateurFinance.fr : éditeur, hébergeur, propriété intellectuelle et conditions d\'utilisation des simulateurs financiers.'
    });
    this.meta.updateTag({
      name: 'robots',
      content: 'noindex, follow'
    });
  }
}
