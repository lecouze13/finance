import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

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

  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('À Propos | CalculateurFinance - Simulateurs Financiers Gratuits');
    this.meta.updateTag({
      name: 'description',
      content: 'Découvrez CalculateurFinance : simulateurs financiers et immobiliers 100% gratuits, indépendants et sans inscription. Notre mission, notre méthodologie et nos valeurs.'
    });
  }
}
