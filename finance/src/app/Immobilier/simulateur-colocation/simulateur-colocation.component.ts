import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FaqSectionComponent, FaqItem } from '../../shared/faq-section/faq-section.component';
import { SeoService } from '../../Constructor/service/seo.service';

@Component({
  selector: 'app-simulateur-colocation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputNumberModule,
    DropdownModule,
    PanelModule,
    ButtonModule,
    FloatLabelModule,
    FaqSectionComponent
  ],
  templateUrl: './simulateur-colocation.component.html',
  styleUrls: ['./simulateur-colocation.component.scss']
})
export class SimulateurColocationComponent implements OnInit {
  // Bien immobilier
  prixAchat: number = 250000;
  surface: number = 80;
  nombreChambres: number = 4;
  travaux: number = 20000;
  fraisNotaire: number = 0;

  // Location classique
  loyerClassique: number = 900;

  // Colocation
  loyerParChambre: number = 450;
  tauxVacanceColoc: number = 10; // % vacance locative supplémentaire
  chargesSupplementaires: number = 100; // électricité, internet, ménage...

  // Charges communes
  chargesAnnuelles: number = 2400;
  taxeFonciere: number = 1500;
  assurancePNO: number = 300;
  gestionLocative: number = 8; // %

  // Résultats
  loyerAnnuelClassique: number = 0;
  loyerAnnuelColoc: number = 0;
  chargesClassique: number = 0;
  chargesColoc: number = 0;
  cashflowClassique: number = 0;
  cashflowColoc: number = 0;
  rendementClassique: number = 0;
  rendementColoc: number = 0;
  gainColocation: number = 0;
  meilleurOption: string = '';

  faqItems: FaqItem[] = [
    {
      question: "La colocation est-elle vraiment plus rentable ?",
      answer: "Oui, généralement 20-40% de loyers en plus par rapport à une location classique. Mais attention aux charges supplémentaires (électricité, internet, turnover) et à la gestion plus chronophage. Le gain réel dépend du marché local."
    },
    {
      question: "Quel type de bail pour une colocation ?",
      answer: "Deux options : bail unique (tous les colocataires signent ensemble, clause de solidarité) ou baux individuels (un bail par chambre). Les baux individuels offrent plus de flexibilité mais nécessitent des parties communes bien définies."
    },
    {
      question: "Comment gérer le turnover en colocation ?",
      answer: "Le turnover est plus élevé en colocation (étudiants, jeunes actifs). Prévoyez 1-2 mois de vacance par chambre et par an. Facilitez les remplacements en permettant aux colocataires sortants de trouver leur remplaçant."
    },
    {
      question: "Quels équipements prévoir pour une colocation ?",
      answer: "Indispensables : cuisine équipée, machine à laver, wifi, chambres meublées avec lit et bureau. Bonus appréciés : sèche-linge, lave-vaisselle, espaces de rangement, parking. Ces équipements justifient des loyers plus élevés."
    },
    {
      question: "La colocation fonctionne-t-elle partout ?",
      answer: "La colocation est surtout rentable dans les grandes villes universitaires et zones d'emploi tertiaire. En zone rurale ou petites villes, la demande est souvent insuffisante. Étudiez le marché local avant d'investir."
    },
    {
      question: "Comment fixer le loyer par chambre ?",
      answer: "Analysez les annonces de colocation locales. Généralement, le total des loyers en colocation représente 120-150% du loyer classique équivalent. Adaptez selon la taille des chambres et les équipements."
    },
    {
      question: "Quel régime fiscal pour la colocation ?",
      answer: "Meublé (LMNP) ou nu, les deux sont possibles. Le LMNP est souvent plus avantageux fiscalement grâce à l'amortissement. En colocation meublée, vous pouvez aussi opter pour le micro-BIC (abattement 50%)."
    },
    {
      question: "Faut-il une assurance spécifique ?",
      answer: "Oui, souscrivez une assurance PNO (Propriétaire Non Occupant) adaptée à la colocation. Exigez que chaque colocataire ait sa propre assurance habitation. Certains contrats incluent la garantie loyers impayés."
    }
  ];

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetaData({
      title: 'Simulateur Colocation vs Location Classique 2025 | Rentabilité comparée',
      description: 'Comparez gratuitement la rentabilité d\'une colocation vs location classique. Calculez le gain réel avec charges et vacance locative.',
      url: 'https://calculateurfinance.fr/simulateur-colocation'
    });
    this.calculerFraisNotaire();
    this.calculer();
  }

  calculerFraisNotaire(): void {
    this.fraisNotaire = Math.round(this.prixAchat * 0.08);
  }

  calculer(): void {
    const investissementTotal = this.prixAchat + this.fraisNotaire + this.travaux;

    // LOCATION CLASSIQUE
    this.loyerAnnuelClassique = this.loyerClassique * 12 * 0.95; // 5% vacance
    this.chargesClassique = this.chargesAnnuelles + this.taxeFonciere + this.assurancePNO;
    const gestionClassique = this.loyerAnnuelClassique * (this.gestionLocative / 100);
    const netClassique = this.loyerAnnuelClassique - this.chargesClassique - gestionClassique;
    this.cashflowClassique = netClassique;
    this.rendementClassique = (netClassique / investissementTotal) * 100;

    // COLOCATION
    const loyerBrutColoc = this.loyerParChambre * this.nombreChambres * 12;
    const vacanceColoc = loyerBrutColoc * (this.tauxVacanceColoc / 100);
    this.loyerAnnuelColoc = loyerBrutColoc - vacanceColoc;

    // Charges supplémentaires colocation
    const chargesColoc = this.chargesAnnuelles + this.taxeFonciere + this.assurancePNO +
                         (this.chargesSupplementaires * 12); // charges supplémentaires mensuelles
    this.chargesColoc = chargesColoc;

    const gestionColoc = this.loyerAnnuelColoc * (this.gestionLocative / 100);
    const netColoc = this.loyerAnnuelColoc - chargesColoc - gestionColoc;
    this.cashflowColoc = netColoc;
    this.rendementColoc = (netColoc / investissementTotal) * 100;

    // Comparaison
    this.gainColocation = this.cashflowColoc - this.cashflowClassique;
    this.meilleurOption = this.gainColocation > 0 ? 'Colocation' : 'Location classique';

    // Arrondir
    this.loyerAnnuelClassique = Math.round(this.loyerAnnuelClassique);
    this.loyerAnnuelColoc = Math.round(this.loyerAnnuelColoc);
    this.cashflowClassique = Math.round(this.cashflowClassique);
    this.cashflowColoc = Math.round(this.cashflowColoc);
    this.rendementClassique = Math.round(this.rendementClassique * 100) / 100;
    this.rendementColoc = Math.round(this.rendementColoc * 100) / 100;
    this.gainColocation = Math.round(this.gainColocation);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  }

  formatPercent(value: number): string {
    return value.toFixed(2) + ' %';
  }

  getPrixParChambre(): number {
    return Math.round((this.prixAchat + this.travaux) / this.nombreChambres);
  }
}
