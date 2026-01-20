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
  selector: 'app-simulateur-rachat-trimestres',
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
  templateUrl: './simulateur-rachat-trimestres.component.html',
  styleUrls: ['./simulateur-rachat-trimestres.component.scss']
})
export class SimulateurRachatTrimestresComponent implements OnInit {
  // Inputs
  age: number = 45;
  revenuAnnuel: number = 50000;
  trimestresManquants: number = 8;
  trimestresARacheter: number = 4;
  typeRachat: string = 'taux_seul'; // taux_seul ou taux_et_montant
  esperanceVieRetraite: number = 25; // années de retraite

  // Résultats
  coutRachat: number = 0;
  economieImpot: number = 0;
  coutNetRachat: number = 0;
  gainPensionMensuel: number = 0;
  gainPensionAnnuel: number = 0;
  gainTotal: number = 0;
  retourInvestissement: number = 0;
  estRentable: boolean = false;

  // Barème 2026 (simplifié)
  baremeTauxSeul: { [key: number]: number } = {
    30: 1055, 35: 1302, 40: 1607, 45: 1983, 50: 2448, 55: 3022, 60: 3731
  };

  baremeComplet: { [key: number]: number } = {
    30: 2639, 35: 3256, 40: 4018, 45: 4958, 50: 6121, 55: 7555, 60: 9327
  };

  typeRachatOptions = [
    { label: 'Taux seul (moins cher)', value: 'taux_seul' },
    { label: 'Taux + montant (plus avantageux)', value: 'taux_et_montant' }
  ];

  faqItems: FaqItem[] = [
    {
      question: "Quels trimestres peut-on racheter ?",
      answer: "Vous pouvez racheter jusqu'à 12 trimestres correspondant à vos années d'études supérieures (après le bac) et vos années incomplètes de cotisation. Le rachat doit être effectué avant l'âge de la retraite."
    },
    {
      question: "Quelle est la différence entre les deux options de rachat ?",
      answer: "L'option 'taux seul' est moins chère mais n'améliore que le taux de liquidation (évite la décote). L'option 'taux + montant' est plus chère mais augmente aussi le montant de la pension car elle ajoute des trimestres au calcul."
    },
    {
      question: "Le rachat est-il déductible des impôts ?",
      answer: "Oui, les sommes versées pour le rachat de trimestres sont déductibles du revenu imposable, sans plafond. L'économie d'impôt peut représenter 30-45% du coût selon votre tranche marginale d'imposition."
    },
    {
      question: "À quel âge est-il optimal de racheter ?",
      answer: "Plus vous rachetez jeune, moins c'est cher (le barème augmente avec l'âge). Cependant, il faut avoir une visibilité sur votre carrière. L'idéal est souvent entre 45 et 55 ans, quand on connaît mieux sa situation."
    },
    {
      question: "Peut-on étaler le paiement du rachat ?",
      answer: "Oui, vous pouvez étaler le paiement sur 1 à 5 ans sans frais, par prélèvement mensuel ou trimestriel. Attention : les versements ne sont déductibles que l'année où ils sont effectués."
    },
    {
      question: "Le rachat est-il toujours rentable ?",
      answer: "Pas toujours. Le rachat est rentable si vous vivez suffisamment longtemps après la retraite pour récupérer votre investissement. En général, il faut 10-15 ans de retraite pour amortir le rachat. Plus vous partez tôt, plus c'est rentable."
    },
    {
      question: "Quelle différence avec la surcote ?",
      answer: "La surcote (1,25% par trimestre travaillé au-delà du taux plein) est gratuite mais implique de travailler plus longtemps. Le rachat permet de partir plus tôt avec le taux plein, mais coûte de l'argent."
    },
    {
      question: "Comment faire la demande de rachat ?",
      answer: "Faites une demande de devis gratuit sur le site de l'Assurance Retraite (lassuranceretraite.fr). Vous recevrez une proposition avec le coût exact selon votre situation. Le devis est valable 3 mois."
    }
  ];

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetaData({
      title: 'Simulateur Rachat de Trimestres Retraite 2026 | Calculez la rentabilité',
      description: 'Calculez gratuitement le coût et la rentabilité du rachat de trimestres pour votre retraite. Économie d\'impôt et gain de pension estimés.',
      url: 'https://calculateurfinance.fr/simulateur-rachat-trimestres'
    });
    this.calculer();
  }

  calculer(): void {
    // Coût du rachat par trimestre selon l'âge
    const ageArrondi = Math.min(60, Math.max(30, Math.round(this.age / 5) * 5));
    const coutParTrimestre = this.typeRachat === 'taux_seul'
      ? this.baremeTauxSeul[ageArrondi] || 2000
      : this.baremeComplet[ageArrondi] || 5000;

    // Ajustement selon le revenu (le barème réel dépend du revenu)
    const facteurRevenu = Math.min(2, Math.max(0.5, this.revenuAnnuel / 41136)); // PASS 2026
    this.coutRachat = coutParTrimestre * this.trimestresARacheter * facteurRevenu;

    // Économie d'impôt (TMI estimée)
    let tmi = 0;
    if (this.revenuAnnuel > 177106) tmi = 0.45;
    else if (this.revenuAnnuel > 82341) tmi = 0.41;
    else if (this.revenuAnnuel > 28797) tmi = 0.30;
    else if (this.revenuAnnuel > 11294) tmi = 0.11;
    this.economieImpot = this.coutRachat * tmi;
    this.coutNetRachat = this.coutRachat - this.economieImpot;

    // Gain de pension estimé
    // Décote : -1.25% par trimestre manquant (max 20 trimestres = 25%)
    const decoteEvitee = Math.min(this.trimestresARacheter, this.trimestresManquants) * 1.25;
    // Pension estimée sans décote
    const pensionEstimee = this.revenuAnnuel * 0.5 * 0.75; // 50% du salaire moyen, 75% de taux plein
    this.gainPensionAnnuel = pensionEstimee * (decoteEvitee / 100);
    this.gainPensionMensuel = this.gainPensionAnnuel / 12;

    // Si option taux+montant, ajouter le gain de montant
    if (this.typeRachat === 'taux_et_montant') {
      const gainMontant = (this.trimestresARacheter / 172) * pensionEstimee * 0.5;
      this.gainPensionAnnuel += gainMontant;
      this.gainPensionMensuel = this.gainPensionAnnuel / 12;
    }

    // Gain total sur l'espérance de vie
    this.gainTotal = this.gainPensionAnnuel * this.esperanceVieRetraite;

    // Retour sur investissement
    this.retourInvestissement = this.coutNetRachat > 0 ? this.gainTotal / this.coutNetRachat : 0;
    this.estRentable = this.gainTotal > this.coutNetRachat;

    // Arrondir
    this.coutRachat = Math.round(this.coutRachat);
    this.economieImpot = Math.round(this.economieImpot);
    this.coutNetRachat = Math.round(this.coutNetRachat);
    this.gainPensionMensuel = Math.round(this.gainPensionMensuel);
    this.gainPensionAnnuel = Math.round(this.gainPensionAnnuel);
    this.gainTotal = Math.round(this.gainTotal);
    this.retourInvestissement = Math.round(this.retourInvestissement * 10) / 10;
  }

  getAnneesAmortissement(): number {
    if (this.gainPensionAnnuel <= 0) return Infinity;
    return Math.round(this.coutNetRachat / this.gainPensionAnnuel * 10) / 10;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  }
}
