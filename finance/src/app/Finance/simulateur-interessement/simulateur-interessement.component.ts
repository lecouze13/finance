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
  selector: 'app-simulateur-interessement',
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
  templateUrl: './simulateur-interessement.component.html',
  styleUrls: ['./simulateur-interessement.component.scss']
})
export class SimulateurInteressementComponent implements OnInit {
  // Inputs
  montantBrut: number = 5000;
  typeEpargne: string = 'participation'; // participation ou interessement
  choixVersement: string = 'pee'; // immediat, pee, perco
  remunerationAnnuelle: number = 45000;

  // Résultats
  csgCrds: number = 0;
  impotRevenu: number = 0;
  montantNet: number = 0;
  montantNetPEE: number = 0;
  abondementEstime: number = 0;
  gainTotalPEE: number = 0;

  // Constantes
  tauxCSGCRDS = 9.7;
  plafondParticipation = 34776; // 75% du PASS 2026

  typeOptions = [
    { label: 'Participation', value: 'participation' },
    { label: 'Intéressement', value: 'interessement' }
  ];

  versementOptions = [
    { label: 'Versement immédiat', value: 'immediat' },
    { label: 'PEE (bloqué 5 ans)', value: 'pee' },
    { label: 'PER Collectif (retraite)', value: 'perco' }
  ];

  faqItems: FaqItem[] = [
    {
      question: "Quelle différence entre participation et intéressement ?",
      answer: "La participation est obligatoire dans les entreprises de 50+ salariés : elle redistribue une part des bénéfices. L'intéressement est facultatif et lié à des objectifs de performance. Les deux bénéficient des mêmes avantages fiscaux."
    },
    {
      question: "Vaut-il mieux percevoir immédiatement ou placer sur un PEE ?",
      answer: "Le versement immédiat est soumis à l'impôt sur le revenu (après CSG-CRDS). Le placement sur PEE exonère d'IR et permet de bénéficier de l'abondement employeur. Sur 5 ans, le PEE est généralement plus avantageux."
    },
    {
      question: "Qu'est-ce que l'abondement ?",
      answer: "L'abondement est un complément versé par l'employeur sur votre PEE/PERCO, plafonné à 300% de vos versements et 8% du PASS (environ 3 700€ en 2026). C'est de l'argent gratuit, soumis uniquement à la CSG-CRDS."
    },
    {
      question: "Quand puis-je débloquer mon PEE ?",
      answer: "Le PEE est bloqué 5 ans mais peut être débloqué anticipativement pour : mariage/PACS, naissance 3e enfant, divorce, invalidité, décès du conjoint, surendettement, création d'entreprise, acquisition résidence principale."
    },
    {
      question: "Comment est imposé le versement immédiat ?",
      answer: "Le versement immédiat est soumis à la CSG-CRDS (9,7%) puis à l'impôt sur le revenu selon votre TMI. Pour quelqu'un à 30% de TMI, le taux global avoisine 37%. Le PEE évite cette imposition."
    },
    {
      question: "La participation est-elle bloquée si je ne fais rien ?",
      answer: "Oui, par défaut la participation est bloquée 5 ans sur le PEE de l'entreprise. Vous avez 15 jours après notification pour demander le versement immédiat. Passé ce délai, elle reste bloquée automatiquement."
    },
    {
      question: "Que devient mon épargne si je quitte l'entreprise ?",
      answer: "Votre épargne reste sur le PEE/PERCO et continue de fructifier. Vous pouvez la transférer vers le PEE d'un nouvel employeur ou la laisser en place. Les conditions de déblocage restent les mêmes."
    },
    {
      question: "Le PER Collectif est-il préférable au PEE ?",
      answer: "Le PER Collectif (ex-PERCO) est bloqué jusqu'à la retraite (sauf achat RP). Il permet de déduire les versements volontaires du revenu imposable. Préférez le PEE si vous avez besoin de liquidité à moyen terme."
    }
  ];

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetaData({
      title: 'Simulateur Participation et Intéressement 2026 | PEE, PERCO, versement',
      description: 'Calculez gratuitement le montant net de votre participation ou intéressement. Comparez versement immédiat vs PEE vs PER Collectif.',
      url: 'https://calculateurfinance.fr/simulateur-interessement'
    });
    this.calculer();
  }

  calculer(): void {
    // CSG-CRDS (toujours due)
    this.csgCrds = this.montantBrut * (this.tauxCSGCRDS / 100);

    // Calcul selon le choix de versement
    if (this.choixVersement === 'immediat') {
      // Versement immédiat : soumis à l'IR
      this.impotRevenu = this.calculerImpot(this.montantBrut - this.csgCrds);
      this.montantNet = this.montantBrut - this.csgCrds - this.impotRevenu;
      this.abondementEstime = 0;
    } else {
      // PEE ou PERCO : exonéré d'IR
      this.impotRevenu = 0;
      this.montantNet = this.montantBrut - this.csgCrds;

      // Abondement estimé (50% plafonné à 3700€)
      this.abondementEstime = Math.min(this.montantNet * 0.5, 3700);
    }

    // Montant net avec PEE pour comparaison
    this.montantNetPEE = this.montantBrut - this.csgCrds;
    this.gainTotalPEE = this.montantNetPEE + this.abondementEstime;

    // Arrondir
    this.csgCrds = Math.round(this.csgCrds * 100) / 100;
    this.impotRevenu = Math.round(this.impotRevenu);
    this.montantNet = Math.round(this.montantNet * 100) / 100;
    this.montantNetPEE = Math.round(this.montantNetPEE * 100) / 100;
    this.abondementEstime = Math.round(this.abondementEstime);
    this.gainTotalPEE = Math.round(this.gainTotalPEE);
  }

  calculerImpot(montant: number): number {
    let tmi = 0;
    if (this.remunerationAnnuelle > 177106) tmi = 0.45;
    else if (this.remunerationAnnuelle > 82341) tmi = 0.41;
    else if (this.remunerationAnnuelle > 28797) tmi = 0.30;
    else if (this.remunerationAnnuelle > 11294) tmi = 0.11;
    return montant * tmi;
  }

  getEconomiePEE(): number {
    const impotSiImmediat = this.calculerImpot(this.montantBrut - this.csgCrds);
    return impotSiImmediat + this.abondementEstime;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  }
}
