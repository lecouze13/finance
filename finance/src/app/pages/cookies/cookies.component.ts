import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cookies',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss']
})
export class CookiesComponent implements OnInit {
  lastUpdate: string = '19 janvier 2026';

  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Politique de Cookies | CalculateurFinance');
    this.meta.updateTag({
      name: 'description',
      content: 'Politique de cookies de CalculateurFinance : types de cookies utilisés, finalités, durée de conservation et comment les gérer.'
    });
    this.meta.updateTag({
      name: 'robots',
      content: 'noindex, follow'
    });
  }
}
