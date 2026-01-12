import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SeoService } from '../../Constructor/service/seo.service';
import { FaqSectionComponent, FaqItem } from '../../shared/faq-section/faq-section.component';

interface DropdownOption {
  label: string;
  value: string;
  taux?: number;
}

interface ResultatsArbitrage {
  // Situation AV actuelle
  capitalAV: number;
  plusValueAV: number;
  ancienneteContrat: number;
  fiscaliteRetrait: {
    abattement: number;
    baseImposable: number;
    impot: number;
    prelevementsSociaux: number;
    totalFiscalite: number;
    montantNet: number;
  };
  // Projection AV si conservation
  projectionAV: {
    capitalFinal5ans: number;
    capitalFinal10ans: number;
    gainsBruts5ans: number;
    gainsBruts10ans: number;
  };
  // Investissement immobilier
  immobilier: {
    prixAcquisition: number;
    fraisNotaire: number;
    apport: number;
    emprunt: number;
    mensualite: number;
    loyerNet: number;
    cashflowMensuel: number;
    rendementBrut: number;
    rendementNet: number;
    capitalFinal10ans: number;
    gainTotal10ans: number;
  };
  // Comparaison
  comparaison: {
    gainAV10ans: number;
    gainImmo10ans: number;
    differenceGain: number;
    meilleureOption: 'av' | 'immo';
    recommandation: string;
  };
}

@Component({
  selector: 'app-simulateur-arbitrage-av-immo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputNumberModule,
    DropdownModule,
    ButtonModule,
    TooltipModule,
    FloatLabelModule,
    FaqSectionComponent
  ],
  templateUrl: './simulateur-arbitrage-av-immo.component.html',
  styleUrls: ['./simulateur-arbitrage-av-immo.component.scss']
})
export class SimulateurArbitrageAvImmoComponent implements OnInit {

  // Assurance-vie existante
  capitalAV: number = 100000;
  plusValueAV: number = 30000;
  ancienneteContrat: number = 10;
  rendementAV: number = 3;

  // Retrait prévu
  montantRetrait: number = 50000;

  // Profil fiscal
  selectedTMI: DropdownOption | null = null;
  tranhesTMI: DropdownOption[] = [
    { label: '0% (revenus < 11 294€)', value: '0', taux: 0 },
    { label: '11% (11 294€ - 28 797€)', value: '11', taux: 0.11 },
    { label: '30% (28 797€ - 82 341€)', value: '30', taux: 0.30 },
    { label: '41% (82 341€ - 177 106€)', value: '41', taux: 0.41 },
    { label: '45% (> 177 106€)', value: '45', taux: 0.45 }
  ];

  optionFiscale: DropdownOption | null = null;
  optionsFiscales: DropdownOption[] = [
    { label: 'PFU / Flat Tax (30%)', value: 'pfu' },
    { label: 'Barème progressif (TMI + 17,2%)', value: 'bareme' }
  ];

  // Projet immobilier
  prixBien: number = 200000;
  fraisNotairePourcent: number = 8;
  loyerMensuel: number = 800;
  chargesMensuelles: number = 200;
  tauxCredit: number = 3.5;
  dureeCredit: number = 20;
  appreciationAnnuelle: number = 2;

  // Résultats
  resultats: ResultatsArbitrage | null = null;

  // FAQ
  faqItems = [
    {
      question: "Quand est-il pertinent de retirer de l'assurance-vie pour investir dans l'immobilier ?",
      answer: "Le retrait est pertinent quand : 1) L'effet de levier du crédit immobilier génère un rendement supérieur au rendement de l'AV, 2) Vous avez besoin d'un apport pour un projet immobilier rentable, 3) Le contrat a plus de 8 ans (fiscalité avantageuse), 4) Le cashflow immobilier sera positif. À éviter si le contrat est récent ou si le projet immobilier n'est pas suffisamment rentable."
    },
    {
      question: "Comment fonctionne la fiscalité des retraits d'assurance-vie ?",
      answer: "Seule la part de plus-value est imposée. Après 8 ans, vous bénéficiez d'un abattement de 4 600€ (9 200€ pour un couple) sur les gains. Au-delà, vous pouvez opter pour le PFU (30%) ou le barème progressif. Avant 8 ans, le PFU s'applique sans abattement. Les prélèvements sociaux (17,2%) sont toujours dus."
    },
    {
      question: "Qu'est-ce que l'effet de levier du crédit immobilier ?",
      answer: "L'effet de levier permet d'investir une somme supérieure à votre apport grâce à l'emprunt. Si vous mettez 50 000€ d'apport pour un bien à 200 000€ qui s'apprécie de 2%/an, votre rendement sur l'apport est bien supérieur à 2%. C'est l'avantage majeur de l'immobilier par rapport aux placements financiers."
    },
    {
      question: "Faut-il tout retirer ou faire un retrait partiel ?",
      answer: "Le retrait partiel est souvent préférable pour : 1) Conserver une épargne de précaution liquide, 2) Garder l'antériorité fiscale du contrat, 3) Ne retirer que ce qui est nécessaire comme apport. L'assurance-vie et l'immobilier sont complémentaires dans un patrimoine diversifié."
    },
    {
      question: "L'assurance-vie luxembourgeoise change-t-elle la donne ?",
      answer: "L'assurance-vie luxembourgeoise offre une meilleure protection (super privilège) et plus de flexibilité d'investissement, mais la fiscalité française s'applique toujours aux résidents français. Le calcul reste donc similaire pour l'arbitrage avec l'immobilier."
    },
    {
      question: "Comment calculer la part de plus-value dans un retrait ?",
      answer: "La part de plus-value dans un retrait est proportionnelle à la plus-value totale du contrat. Formule : Plus-value du retrait = Montant retiré × (Plus-value totale / Capital total). Par exemple, si vous retirez 10 000€ d'un contrat de 100 000€ avec 20 000€ de plus-value, la plus-value du retrait est de 2 000€."
    }
  ];

  constructor(
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.seoService.updateMetaData({
      title: 'Simulateur Arbitrage Assurance-Vie vs Immobilier - Retrait AV pour investir',
      description: 'Calculez si retirer de votre assurance-vie pour investir dans l\'immobilier est rentable. Comparez fiscalité, effet de levier et rendements sur 10 ans.',
      url: 'https://calculateurfinance.fr/simulateur-arbitrage-av-immo',
      keywords: 'arbitrage assurance vie, retrait assurance vie, investissement immobilier, effet de levier, fiscalité AV, rachat assurance vie, apport immobilier'
    });

    this.selectedTMI = this.tranhesTMI[2]; // 30% par défaut
    this.optionFiscale = this.optionsFiscales[0]; // PFU par défaut
  }

  calculer(): void {
    if (!this.selectedTMI || !this.optionFiscale) return;

    const tmi = this.selectedTMI.taux || 0;
    const prelevementsSociaux = 0.172;

    // ============ CALCUL FISCALITÉ RETRAIT AV ============
    // Part de plus-value dans le retrait
    const tauxPlusValue = this.capitalAV > 0 ? this.plusValueAV / this.capitalAV : 0;
    const plusValueRetrait = this.montantRetrait * tauxPlusValue;

    // Abattement après 8 ans
    const abattement = this.ancienneteContrat >= 8 ? 4600 : 0;
    const baseImposable = Math.max(0, plusValueRetrait - abattement);

    // Calcul impôt selon option choisie
    let impot = 0;
    if (this.optionFiscale.value === 'pfu') {
      // PFU : 12,8% sur les gains (+ 17,2% PS)
      impot = baseImposable * 0.128;
    } else {
      // Barème : TMI sur les gains (+ 17,2% PS)
      impot = baseImposable * tmi;
    }

    const ps = plusValueRetrait * prelevementsSociaux; // PS sur toute la PV (pas d'abattement)
    const totalFiscalite = impot + ps;
    const montantNet = this.montantRetrait - totalFiscalite;

    // ============ PROJECTION AV SI CONSERVATION ============
    const rendementAnnuel = this.rendementAV / 100;
    const capitalRestantAV = this.capitalAV - this.montantRetrait;
    const capitalAV5ans = capitalRestantAV * Math.pow(1 + rendementAnnuel, 5);
    const capitalAV10ans = capitalRestantAV * Math.pow(1 + rendementAnnuel, 10);

    // Si on garde tout le capital dans l'AV
    const capitalTotalAV5ans = this.capitalAV * Math.pow(1 + rendementAnnuel, 5);
    const capitalTotalAV10ans = this.capitalAV * Math.pow(1 + rendementAnnuel, 10);
    const gainsAV5ans = capitalTotalAV5ans - this.capitalAV;
    const gainsAV10ans = capitalTotalAV10ans - this.capitalAV;

    // ============ CALCUL INVESTISSEMENT IMMOBILIER ============
    const fraisNotaire = this.prixBien * (this.fraisNotairePourcent / 100);
    const coutTotal = this.prixBien + fraisNotaire;
    const apport = montantNet;
    const emprunt = coutTotal - apport;

    // Mensualité crédit
    const tauxMensuel = this.tauxCredit / 100 / 12;
    const nbMois = this.dureeCredit * 12;
    const mensualite = emprunt > 0
      ? (emprunt * tauxMensuel * Math.pow(1 + tauxMensuel, nbMois)) / (Math.pow(1 + tauxMensuel, nbMois) - 1)
      : 0;

    // Rendement locatif
    const loyerNet = this.loyerMensuel - this.chargesMensuelles;
    const cashflowMensuel = loyerNet - mensualite;
    const rendementBrut = (this.loyerMensuel * 12 / this.prixBien) * 100;
    const rendementNet = (loyerNet * 12 / coutTotal) * 100;

    // Valeur du bien dans 10 ans
    const appreciationAnnuelle = this.appreciationAnnuelle / 100;
    const valeurBien10ans = this.prixBien * Math.pow(1 + appreciationAnnuelle, 10);

    // Capital restant dû après 10 ans
    let capitalRestantDu = emprunt;
    for (let i = 0; i < 120; i++) { // 10 ans = 120 mois
      const interets = capitalRestantDu * tauxMensuel;
      const capital = mensualite - interets;
      capitalRestantDu = Math.max(0, capitalRestantDu - capital);
    }

    // Patrimoine immobilier net après 10 ans
    const patrimoineImmo10ans = valeurBien10ans - capitalRestantDu;

    // Gains totaux immobilier (patrimoine + cashflow cumulé - apport initial - frais)
    const cashflowCumule10ans = cashflowMensuel * 120;
    const gainImmo10ans = patrimoineImmo10ans + cashflowCumule10ans - apport;

    // ============ COMPARAISON ============
    // Gain AV : on compare la situation "tout garder en AV" vs "retrait + immo"
    // Si on avait gardé le montant en AV au lieu de le retirer
    const capitalRetireSiGardeAV = this.montantRetrait * Math.pow(1 + rendementAnnuel, 10);
    const gainAVOptionGardee = capitalRetireSiGardeAV - this.montantRetrait;

    // Le gain immobilier c'est le patrimoine net créé moins ce qu'on aurait eu en AV
    const differenceGain = gainImmo10ans - gainAVOptionGardee;

    const meilleureOption: 'av' | 'immo' = differenceGain > 0 ? 'immo' : 'av';

    let recommandation = '';
    if (meilleureOption === 'immo') {
      if (cashflowMensuel >= 0) {
        recommandation = `L'investissement immobilier est recommandé. Avec un cashflow positif de ${Math.round(cashflowMensuel)}€/mois et un gain supérieur de ${Math.round(differenceGain).toLocaleString('fr-FR')}€ sur 10 ans, l'effet de levier joue en votre faveur.`;
      } else {
        recommandation = `L'immobilier reste intéressant malgré un cashflow négatif de ${Math.round(cashflowMensuel)}€/mois. La plus-value et le remboursement du capital compensent. Assurez-vous de pouvoir assumer cet effort d'épargne.`;
      }
    } else {
      if (this.ancienneteContrat < 8) {
        recommandation = `Conserver votre assurance-vie est préférable. Le contrat a moins de 8 ans, la fiscalité du retrait est moins avantageuse. Attendez la maturité fiscale si possible.`;
      } else {
        recommandation = `Conserver votre assurance-vie semble plus rentable. Le rendement immobilier n'est pas suffisant pour compenser le coût du retrait et l'absence de rendement sur le capital retiré.`;
      }
    }

    this.resultats = {
      capitalAV: this.capitalAV,
      plusValueAV: this.plusValueAV,
      ancienneteContrat: this.ancienneteContrat,
      fiscaliteRetrait: {
        abattement,
        baseImposable,
        impot,
        prelevementsSociaux: ps,
        totalFiscalite,
        montantNet
      },
      projectionAV: {
        capitalFinal5ans: capitalTotalAV5ans,
        capitalFinal10ans: capitalTotalAV10ans,
        gainsBruts5ans: gainsAV5ans,
        gainsBruts10ans: gainsAV10ans
      },
      immobilier: {
        prixAcquisition: this.prixBien,
        fraisNotaire,
        apport,
        emprunt,
        mensualite,
        loyerNet,
        cashflowMensuel,
        rendementBrut,
        rendementNet,
        capitalFinal10ans: patrimoineImmo10ans,
        gainTotal10ans: gainImmo10ans
      },
      comparaison: {
        gainAV10ans: gainAVOptionGardee,
        gainImmo10ans,
        differenceGain,
        meilleureOption,
        recommandation
      }
    };
  }
}
