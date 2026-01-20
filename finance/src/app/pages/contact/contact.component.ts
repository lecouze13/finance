import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';

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

  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Contact | CalculateurFinance');
    this.meta.updateTag({
      name: 'description',
      content: 'Contactez l\'équipe CalculateurFinance pour toute question, suggestion ou signalement d\'erreur sur nos simulateurs financiers et immobiliers.'
    });
  }
}
