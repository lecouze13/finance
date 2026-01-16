import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CheckboxModule } from 'primeng/checkbox';
import { FaqSectionComponent, FaqItem } from '../../shared/faq-section/faq-section.component';
import { SeoService } from '../../Constructor/service/seo.service';

@Component({
  selector: 'app-simulateur-crypto-fiscalite',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputNumberModule,
    DropdownModule,
    PanelModule,
    ButtonModule,
    FloatLabelModule,
    CheckboxModule,
    FaqSectionComponent
  ],
  templateUrl: './simulateur-crypto-fiscalite.component.html',
  styleUrls: ['./simulateur-crypto-fiscalite.component.scss']
})
export class SimulateurCryptoFiscaliteComponent implements OnInit {
  Math = Math;

  // Inputs
  prixAchat: number = 10000;
  prixVente: number = 25000;
  fraisAchat: number = 50;
  fraisVente: number = 50;
  isActiviteHabituelle: boolean = false;
  autresPlusValues: number = 0; // autres plus-values crypto de l'année

  // Résultats
  plusValueBrute: number = 0;
  plusValueNette: number = 0;
  totalPlusValuesAnnee: number = 0;
  impotFlatTax: number = 0;
  impotBareme: number = 0;
  prelevementsSociaux: number = 0;
  netApresImpot: number = 0;
  tauxImposition: number = 0;

  // Barème IR 2025
  tranchesIR = [
    { min: 0, max: 11294, taux: 0 },
    { min: 11294, max: 28797, taux: 11 },
    { min: 28797, max: 82341, taux: 30 },
    { min: 82341, max: 177106, taux: 41 },
    { min: 177106, max: Infinity, taux: 45 }
  ];

  revenuFiscalReference: number = 30000;

  faqItems: FaqItem[] = [
    {
      question: "Comment sont imposées les plus-values crypto en France ?",
      answer: "Les plus-values sur cryptomonnaies sont imposées à la flat tax de 30% (12,8% d'impôt sur le revenu + 17,2% de prélèvements sociaux). Vous pouvez aussi opter pour le barème progressif de l'IR si c'est plus avantageux. L'impôt est dû uniquement lors de la conversion en monnaie fiduciaire (€, $)."
    },
    {
      question: "Quand doit-on déclarer ses cryptomonnaies ?",
      answer: "Vous devez déclarer vos plus-values lors de la déclaration de revenus (formulaire 2086). Vous devez aussi déclarer vos comptes sur plateformes étrangères (formulaire 3916-bis). Les échanges crypto-crypto ne sont pas imposables, seule la conversion en euros l'est."
    },
    {
      question: "Comment calculer la plus-value imposable ?",
      answer: "Plus-value = Prix de vente - (Prix d'acquisition moyen pondéré × proportion vendue). Le prix d'acquisition inclut les frais de transaction. Si vous avez acheté en plusieurs fois, vous devez calculer le prix moyen pondéré de toutes vos acquisitions."
    },
    {
      question: "Les pertes sont-elles déductibles ?",
      answer: "Oui, les moins-values crypto sont imputables sur les plus-values crypto de la même année. Si le solde est négatif, la moins-value n'est pas reportable sur les années suivantes (contrairement aux moins-values boursières classiques)."
    },
    {
      question: "Qu'est-ce que l'activité habituelle de trading ?",
      answer: "Si vous tradez de façon régulière et intensive (plusieurs opérations par jour, effet de levier important), l'administration fiscale peut requalifier votre activité en BNC (Bénéfices Non Commerciaux). Les plus-values seraient alors imposées au barème progressif + cotisations sociales (~45%)."
    },
    {
      question: "Le staking et le mining sont-ils imposés ?",
      answer: "Le staking génère des revenus imposés comme des revenus de capitaux mobiliers (flat tax 30% ou barème IR). Le mining est considéré comme une activité BNC si régulière. Les airdrops sont imposés comme des revenus au moment de leur réception."
    },
    {
      question: "Faut-il déclarer les NFT ?",
      answer: "Oui, les NFT sont considérés comme des actifs numériques. Les plus-values lors de leur vente contre des euros sont imposables de la même manière que les cryptomonnaies. Les échanges NFT contre crypto ne sont pas directement imposables."
    },
    {
      question: "Quelles sont les sanctions en cas de non-déclaration ?",
      answer: "Non-déclaration de compte étranger : 1 500€ d'amende par compte et par an. Non-déclaration de plus-values : majoration de 10% à 80% selon les cas + intérêts de retard. L'administration a 3 ans pour effectuer un redressement (6 ans en cas de fraude)."
    }
  ];

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetaData({
      title: 'Simulateur Fiscalité Crypto 2025 | Calculez vos impôts sur Bitcoin et cryptomonnaies',
      description: 'Calculez gratuitement l\'impôt sur vos plus-values crypto (Bitcoin, Ethereum...). Flat tax 30% ou barème IR ? Comparez les options fiscales.',
      url: 'https://calculateurfinance.fr/simulateur-crypto-fiscalite'
    });
    this.calculer();
  }

  calculer(): void {
    // Plus-value brute
    this.plusValueBrute = this.prixVente - this.prixAchat;

    // Plus-value nette (après frais)
    this.plusValueNette = this.plusValueBrute - this.fraisAchat - this.fraisVente;

    // Total des plus-values de l'année
    this.totalPlusValuesAnnee = Math.max(0, this.plusValueNette + this.autresPlusValues);

    if (this.plusValueNette <= 0) {
      this.impotFlatTax = 0;
      this.impotBareme = 0;
      this.prelevementsSociaux = 0;
      this.netApresImpot = this.prixVente - this.fraisVente;
      this.tauxImposition = 0;
      return;
    }

    // Flat tax 30%
    this.impotFlatTax = this.totalPlusValuesAnnee * 0.30;
    this.prelevementsSociaux = this.totalPlusValuesAnnee * 0.172;

    // Barème IR
    const revenuTotal = this.revenuFiscalReference + this.totalPlusValuesAnnee;
    const irTotal = this.calculerIR(revenuTotal);
    const irSansPlus = this.calculerIR(this.revenuFiscalReference);
    const irPlusValue = irTotal - irSansPlus;
    this.impotBareme = irPlusValue + this.prelevementsSociaux;

    // Net après impôt (avec flat tax par défaut)
    const impotChoisi = Math.min(this.impotFlatTax, this.impotBareme);
    this.netApresImpot = this.prixVente - this.fraisVente - impotChoisi;
    this.tauxImposition = (impotChoisi / this.totalPlusValuesAnnee) * 100;

    // Arrondir
    this.plusValueBrute = Math.round(this.plusValueBrute);
    this.plusValueNette = Math.round(this.plusValueNette);
    this.impotFlatTax = Math.round(this.impotFlatTax);
    this.impotBareme = Math.round(this.impotBareme);
    this.prelevementsSociaux = Math.round(this.prelevementsSociaux);
    this.netApresImpot = Math.round(this.netApresImpot);
    this.tauxImposition = Math.round(this.tauxImposition * 10) / 10;
  }

  calculerIR(revenu: number): number {
    let impot = 0;
    for (const tranche of this.tranchesIR) {
      if (revenu > tranche.min) {
        const montantDansTranche = Math.min(revenu, tranche.max) - tranche.min;
        impot += montantDansTranche * (tranche.taux / 100);
      }
    }
    return impot;
  }

  getMeilleurOption(): string {
    return this.impotFlatTax <= this.impotBareme ? 'Flat Tax' : 'Barème IR';
  }

  getEconomie(): number {
    return Math.abs(this.impotFlatTax - this.impotBareme);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  }

  formatPercent(value: number): string {
    return value.toFixed(1) + ' %';
  }
}
