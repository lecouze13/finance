import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { SeoService } from '../../Constructor/service/seo.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PanelModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  email: string = 'calculateurfinance@proton.me';

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetaData({
      title: 'Contact | CalculateurFinance - Nous contacter',
      description: 'Contactez l\'équipe CalculateurFinance pour toute question, suggestion ou signalement d\'erreur sur nos simulateurs financiers et immobiliers gratuits.',
      url: 'https://calculateurfinance.fr/contact/',
      keywords: 'contact, calculateur finance, simulateur financier, aide, support'
    });
  }
}
