import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-methodologie',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './methodologie.component.html',
  styleUrls: ['./methodologie.component.scss']
})
export class MethodologieComponent implements OnInit {
  lastUpdate: string = '19 janvier 2026';

  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Méthodologie des Calculs | CalculateurFinance');
    this.meta.updateTag({
      name: 'description',
      content: 'Découvrez la méthodologie et les sources utilisées pour les simulateurs de CalculateurFinance : formules de calcul, hypothèses et limites.'
    });
  }
}
