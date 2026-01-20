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
  selector: 'app-simulateur-ppv',
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
  templateUrl: './simulateur-ppv.component.html',
  styleUrls: ['./simulateur-ppv.component.scss']
})
export class SimulateurPpvComponent implements OnInit {
  // Inputs
  montantBrut: number = 3000;
  remunerationAnnuelle: number = 40000;
  effectifEntreprise: string = 'moins_50';
  versementPEE: boolean = false;

  // Résultats
  csgCrds: number = 0;
  impotRevenu: number = 0;
  montantNet: number = 0;
  montantNetPEE: number = 0;
  economieImpot: number = 0;
  tauxCharges: number = 0;

  effectifOptions = [
    { label: 'Moins de 50 salariés', value: 'moins_50' },
    { label: '50 salariés et plus', value: 'plus_50' }
  ];

  // Plafonds 2026
  plafondExoneration = 3000; // ou 6000 si accord d'intéressement
  plafondExonerationMajore = 6000;
  tauxCSGCRDS = 9.7; // %

  faqItems: FaqItem[] = [
    {
      question: "Qu'est-ce que la Prime de Partage de la Valeur (PPV) ?",
      answer: "La PPV (ex-Prime Macron) est une prime facultative versée par l'employeur. Elle bénéficie d'exonérations de charges sociales et, sous conditions, d'exonération d'impôt sur le revenu. Le plafond est de 3 000€ (ou 6 000€ avec accord d'intéressement)."
    },
    {
      question: "Quelles sont les conditions d'exonération d'impôt ?",
      answer: "L'exonération d'impôt sur le revenu s'applique uniquement si : l'entreprise a moins de 50 salariés ET la rémunération du salarié est inférieure à 3 SMIC annuels (environ 64 000€ en 2026). Au-delà, la prime est soumise à l'IR."
    },
    {
      question: "La PPV est-elle soumise aux charges sociales ?",
      answer: "La PPV est exonérée de cotisations sociales patronales et salariales dans la limite des plafonds. Seule la CSG-CRDS (9,7%) reste due. Pour les salariés gagnant plus de 3 SMIC, le forfait social de 20% s'applique pour l'employeur."
    },
    {
      question: "Peut-on verser la PPV sur un PEE ?",
      answer: "Oui, depuis 2024, la PPV peut être versée sur un Plan d'Épargne Entreprise (PEE) ou un PER Collectif. Dans ce cas, elle bénéficie des mêmes avantages que l'intéressement : exonération totale d'IR et de CSG-CRDS sur les plus-values."
    },
    {
      question: "Qui peut bénéficier de la PPV ?",
      answer: "Tous les salariés liés par un contrat de travail à la date de versement ou de signature de l'accord. L'employeur peut moduler le montant selon l'ancienneté, le niveau de rémunération, le temps de travail ou la classification."
    },
    {
      question: "La PPV peut-elle être versée plusieurs fois par an ?",
      answer: "Oui, la PPV peut être versée en une ou plusieurs fois, dans la limite d'une fois par trimestre. Le plafond d'exonération (3 000€ ou 6 000€) s'apprécie sur l'année civile, tous versements confondus."
    },
    {
      question: "L'employeur est-il obligé de verser la PPV ?",
      answer: "Non, la PPV est totalement facultative. L'employeur décide librement de la verser ou non, et fixe son montant. Elle peut être mise en place par décision unilatérale ou par accord d'entreprise."
    },
    {
      question: "Comment est imposée la PPV au-delà des plafonds ?",
      answer: "La partie excédant le plafond (3 000€ ou 6 000€) est soumise aux cotisations sociales classiques et à l'impôt sur le revenu. Elle est intégrée au salaire et imposée selon votre tranche marginale."
    }
  ];

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetaData({
      title: 'Simulateur Prime de Partage de la Valeur (PPV) 2026 | Calcul net',
      description: 'Calculez gratuitement le montant net de votre Prime de Partage de la Valeur (ex-Prime Macron). Exonérations, CSG-CRDS et impôt sur le revenu.',
      url: 'https://calculateurfinance.fr/simulateur-ppv'
    });
    this.calculer();
  }

  calculer(): void {
    const plafond = this.plafondExoneration; // Simplifié, pourrait être 6000 avec accord
    const montantExonere = Math.min(this.montantBrut, plafond);
    const montantImposable = Math.max(0, this.montantBrut - plafond);

    // CSG-CRDS sur la totalité (toujours due)
    this.csgCrds = this.montantBrut * (this.tauxCSGCRDS / 100);

    // Impôt sur le revenu
    const estExonereIR = this.effectifEntreprise === 'moins_50' && this.remunerationAnnuelle < 64000;

    if (estExonereIR) {
      // Exonéré d'IR dans la limite du plafond
      this.impotRevenu = this.calculerImpotSurMontant(montantImposable);
    } else {
      // Imposé sur la totalité
      this.impotRevenu = this.calculerImpotSurMontant(this.montantBrut);
    }

    // Montant net
    this.montantNet = this.montantBrut - this.csgCrds - this.impotRevenu;

    // Montant net si versement PEE (pas de CSG-CRDS sur les plus-values futures)
    this.montantNetPEE = this.montantBrut - this.csgCrds; // Bloqué 5 ans mais pas d'IR

    // Économie si exonération
    const impotSiNonExonere = this.calculerImpotSurMontant(this.montantBrut);
    this.economieImpot = estExonereIR ? impotSiNonExonere - this.impotRevenu : 0;

    // Taux de charges effectif
    this.tauxCharges = ((this.montantBrut - this.montantNet) / this.montantBrut) * 100;

    // Arrondir
    this.csgCrds = Math.round(this.csgCrds * 100) / 100;
    this.impotRevenu = Math.round(this.impotRevenu);
    this.montantNet = Math.round(this.montantNet * 100) / 100;
    this.montantNetPEE = Math.round(this.montantNetPEE * 100) / 100;
    this.economieImpot = Math.round(this.economieImpot);
    this.tauxCharges = Math.round(this.tauxCharges * 10) / 10;
  }

  calculerImpotSurMontant(montant: number): number {
    // TMI estimée selon le revenu
    let tmi = 0;
    if (this.remunerationAnnuelle > 177106) tmi = 0.45;
    else if (this.remunerationAnnuelle > 82341) tmi = 0.41;
    else if (this.remunerationAnnuelle > 28797) tmi = 0.30;
    else if (this.remunerationAnnuelle > 11294) tmi = 0.11;

    return montant * tmi;
  }

  isExonereIR(): boolean {
    return this.effectifEntreprise === 'moins_50' && this.remunerationAnnuelle < 64000;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(value);
  }

  formatPercent(value: number): string {
    return value.toFixed(1) + ' %';
  }
}
