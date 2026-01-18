import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import { SeoService } from '../../Constructor/service/seo.service';
import { FaqSectionComponent, FaqItem } from '../../shared/faq-section/faq-section.component';

@Component({
  selector: 'app-simulateur-sortie-pinel',
  standalone: true,
  imports: [CommonModule, FormsModule, InputNumberModule, DropdownModule, ButtonModule, TooltipModule, PanelModule, FaqSectionComponent],
  templateUrl: './simulateur-sortie-pinel.component.html',
  styleUrls: ['./simulateur-sortie-pinel.component.scss']
})
export class SimulateurSortiePinelComponent implements OnInit {

  faqItems: FaqItem[] = [
    {
      question: 'Que se passe-t-il à la fin de mon engagement Pinel ?',
      answer: 'À la fin de votre engagement (6, 9 ou 12 ans), vous perdez la réduction d\'impôt Pinel. Vous avez alors 3 options : vendre le bien, continuer en location nue classique, ou passer en location meublée (LMNP).'
    },
    {
      question: 'Puis-je passer en LMNP après un Pinel ?',
      answer: 'Oui, c\'est une option très populaire. Le passage en LMNP permet de bénéficier de l\'amortissement comptable et d\'un régime fiscal souvent plus avantageux que la location nue.'
    },
    {
      question: 'Dois-je attendre la fin de mon engagement pour vendre ?',
      answer: 'Non, mais si vous vendez avant la fin de l\'engagement, vous devrez rembourser les réductions d\'impôt obtenues. C\'est pourquoi il est crucial de bien calculer avant de décider.'
    },
    {
      question: 'Le loyer change-t-il après la fin du Pinel ?',
      answer: 'Oui, vous n\'êtes plus soumis au plafonnement Pinel. Vous pouvez ajuster le loyer au prix du marché, ce qui peut augmenter votre rentabilité.'
    },
    {
      question: 'Quelle est la fiscalité en location nue après Pinel ?',
      answer: 'Vos revenus seront imposés comme revenus fonciers, au barème de l\'impôt sur le revenu + 17,2% de prélèvements sociaux. Sans la réduction Pinel, l\'imposition peut être significative.'
    }
  ];

  // Options
  dureeEngagement = [
    { label: '6 ans', value: 6 },
    { label: '9 ans', value: 9 },
    { label: '12 ans', value: 12 }
  ];

  tmi = [
    { label: '0%', value: 0 },
    { label: '11%', value: 0.11 },
    { label: '30%', value: 0.30 },
    { label: '41%', value: 0.41 },
    { label: '45%', value: 0.45 }
  ];

  // Inputs
  prixAchat: number | null = null;
  loyerMensuelPinel: number | null = null;
  loyerMarcheEstime: number | null = null;
  chargesAnnuelles: number | null = null;
  taxeFonciere: number | null = null;
  selectedDuree: number | null = null;
  selectedTMI: number | null = null;
  valeurActuelle: number | null = null;
  capitalRestantDu: number | null = null;
  mensualiteCredit: number | null = null;
  fraisVente: number | null = null;

  // Résultats
  resultats: any = null;
  meilleurOption: string = '';

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Simulateur Sortie Pinel 2025 | Vendre, LMNP ou Location Nue ?',
      description: 'Calculez quelle option est la plus rentable à la fin de votre engagement Pinel : revendre, passer en LMNP ou continuer en location nue.',
      url: 'https://calculateurfinance.fr/simulateur-sortie-pinel',
      keywords: 'sortie Pinel, fin engagement Pinel, Pinel vers LMNP, revendre Pinel, fiscalité fin Pinel, que faire après Pinel'
    });
  }

  calculer(): void {
    if (!this.prixAchat || !this.loyerMensuelPinel || !this.loyerMarcheEstime ||
        !this.selectedDuree || this.selectedTMI === null || !this.valeurActuelle) {
      return;
    }

    const charges = this.chargesAnnuelles || 0;
    const taxe = this.taxeFonciere || 0;
    const capitalRestant = this.capitalRestantDu || 0;
    const mensualite = (this.mensualiteCredit || 0) * 12;
    const frais = this.fraisVente || (this.valeurActuelle * 0.07); // 7% par défaut

    const loyerAnnuelMarche = this.loyerMarcheEstime * 12;
    const loyerAnnuelPinel = this.loyerMensuelPinel * 12;

    // PS = 17.2%
    const PS = 0.172;
    const TMI = this.selectedTMI;

    // === OPTION 1: VENDRE ET RÉINVESTIR ===
    const netVente = this.valeurActuelle - capitalRestant - frais;
    // Plus-value (simplifiée - après 22 ans exonération IR, après 30 ans exo totale)
    // On suppose détention = durée Pinel, donc pas d'exonération
    const plusValue = Math.max(0, this.valeurActuelle - this.prixAchat);
    const impotPlusValue = plusValue * (0.19 + PS); // 19% + 17.2% PS
    const netApresFiscalite = netVente - impotPlusValue;

    // Rendement si réinvesti à 4% net
    const rendementReinvest = netApresFiscalite * 0.04;

    // === OPTION 2: LOCATION NUE CLASSIQUE ===
    const revenuFoncierBrut = loyerAnnuelMarche - charges - taxe;
    const revenuFoncierNet = revenuFoncierBrut - (revenuFoncierBrut * (TMI + PS));
    const cashflowLocationNue = revenuFoncierNet - mensualite;
    const rendementNetLocationNue = (revenuFoncierNet / this.valeurActuelle) * 100;

    // === OPTION 3: PASSAGE EN LMNP ===
    // Loyer meublé = +15% environ
    const loyerMeuble = loyerAnnuelMarche * 1.15;
    const chargesLMNP = charges * 1.1; // Un peu plus de charges pour le meublé

    // Amortissement (simplifié): bien sur 30 ans + meubles sur 7 ans
    const amortissementBien = (this.valeurActuelle * 0.85) / 30; // 85% car hors terrain
    const amortissementMeubles = (this.valeurActuelle * 0.05) / 7; // 5% pour meubles
    const amortissementTotal = amortissementBien + amortissementMeubles;

    const resultatBIC = Math.max(0, loyerMeuble - chargesLMNP - taxe - amortissementTotal);
    const impotLMNP = resultatBIC * (TMI + PS);
    const revenuNetLMNP = loyerMeuble - chargesLMNP - taxe - impotLMNP;
    const cashflowLMNP = revenuNetLMNP - mensualite;
    const rendementNetLMNP = (revenuNetLMNP / this.valeurActuelle) * 100;

    // Déterminer la meilleure option
    const gains = {
      vente: rendementReinvest,
      locationNue: revenuFoncierNet,
      lmnp: revenuNetLMNP
    };

    if (gains.vente >= gains.locationNue && gains.vente >= gains.lmnp) {
      this.meilleurOption = 'vente';
    } else if (gains.lmnp >= gains.locationNue) {
      this.meilleurOption = 'lmnp';
    } else {
      this.meilleurOption = 'locationNue';
    }

    this.resultats = {
      vente: {
        netVente: netVente,
        plusValue: plusValue,
        impotPlusValue: impotPlusValue,
        netApresFiscalite: netApresFiscalite,
        rendementReinvest: rendementReinvest
      },
      locationNue: {
        loyerAnnuel: loyerAnnuelMarche,
        revenuFoncierBrut: revenuFoncierBrut,
        impots: revenuFoncierBrut * (TMI + PS),
        revenuNet: revenuFoncierNet,
        cashflow: cashflowLocationNue,
        rendement: rendementNetLocationNue
      },
      lmnp: {
        loyerMeuble: loyerMeuble,
        amortissement: amortissementTotal,
        resultatBIC: resultatBIC,
        impots: impotLMNP,
        revenuNet: revenuNetLMNP,
        cashflow: cashflowLMNP,
        rendement: rendementNetLMNP
      }
    };
  }
  
}
