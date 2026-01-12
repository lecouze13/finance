import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SeoService } from '../../Constructor/service/seo.service';
import { FaqSectionComponent, FaqItem } from '../../shared/faq-section/faq-section.component';

@Component({
  selector: 'app-simulateur-passoire-thermique',
  standalone: true,
  imports: [CommonModule, FormsModule, InputNumberModule, DropdownModule, ButtonModule, TooltipModule, FloatLabelModule, FaqSectionComponent],
  templateUrl: './simulateur-passoire-thermique.component.html',
  styleUrls: ['./simulateur-passoire-thermique.component.scss']
})
export class SimulateurPassoireThermiquComponent implements OnInit {

  faqItems: FaqItem[] = [
    {
      question: 'Qu\'est-ce qu\'une passoire thermique ?',
      answer: 'Une passoire thermique est un logement très énergivore, classé F ou G sur le diagnostic de performance énergétique (DPE). Ces logements consomment beaucoup d\'énergie pour le chauffage.'
    },
    {
      question: 'Quand les passoires thermiques seront-elles interdites à la location ?',
      answer: 'Le calendrier est : G interdit depuis 2025, F interdit en 2028, E interdit en 2034. Les logements concernés ne pourront plus être loués.'
    },
    {
      question: 'Qu\'est-ce que MaPrimeRénov\' ?',
      answer: 'MaPrimeRénov\' est une aide de l\'État pour financer les travaux de rénovation énergétique. Le montant dépend des revenus du propriétaire et du type de travaux.'
    },
    {
      question: 'Combien coûte une rénovation énergétique complète ?',
      answer: 'Une rénovation globale coûte généralement entre 200 et 600 EUR/m². Le coût dépend de l\'état initial du logement et du niveau de performance visé.'
    },
    {
      question: 'La rénovation énergétique est-elle rentable ?',
      answer: 'Oui, grâce aux aides (jusqu\'à 90% du coût) et à l\'augmentation possible du loyer. De plus, vous évitez l\'interdiction de location et la décote à la revente.'
    },
    {
      question: 'Vaut-il mieux vendre ou rénover ?',
      answer: 'Cela dépend de votre situation. Si les travaux sont trop coûteux ou si vous n\'avez pas les fonds, la vente peut être préférable. Notre simulateur vous aide à comparer.'
    }
  ];

  // Options DPE
  classesDPE = [
    { label: 'G (> 450 kWh/m²/an)', value: 'G', conso: 500 },
    { label: 'F (331-450 kWh/m²/an)', value: 'F', conso: 390 },
    { label: 'E (251-330 kWh/m²/an)', value: 'E', conso: 290 },
    { label: 'D (151-250 kWh/m²/an)', value: 'D', conso: 200 }
  ];

  classesCibles = [
    { label: 'D (151-250 kWh/m²/an)', value: 'D', conso: 200 },
    { label: 'C (91-150 kWh/m²/an)', value: 'C', conso: 120 },
    { label: 'B (51-90 kWh/m²/an)', value: 'B', conso: 70 },
    { label: 'A (< 50 kWh/m²/an)', value: 'A', conso: 40 }
  ];

  profilsRevenus = [
    { label: 'Très modestes (MaPrimeRénov\' Bleu)', value: 'bleu', tauxAide: 0.90 },
    { label: 'Modestes (MaPrimeRénov\' Jaune)', value: 'jaune', tauxAide: 0.75 },
    { label: 'Intermédiaires (MaPrimeRénov\' Violet)', value: 'violet', tauxAide: 0.60 },
    { label: 'Supérieurs (MaPrimeRénov\' Rose)', value: 'rose', tauxAide: 0.40 }
  ];

  // Inputs
  valeurBien: number | null = null;
  surface: number | null = null;
  loyerActuel: number | null = null;
  selectedDPEActuel: any = null;
  selectedDPECible: any = null;
  coutTravaux: number | null = null;
  selectedProfil: any = null;

  // Résultats
  resultats: any = null;

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Simulateur Passoire Thermique 2025 | Rénover ou Vendre ?',
      description: 'Calculez la rentabilité d\'une rénovation énergétique de votre passoire thermique (DPE F ou G). Aides MaPrimeRénov\', ROI et comparaison vente vs rénovation.',
      url: 'https://calculateurfinance.fr/simulateur-passoire-thermique',
      keywords: 'passoire thermique, DPE F G, rénovation énergétique, MaPrimeRénov, interdiction location, calendrier DPE, rentabilité rénovation'
    });
  }

  estimerCoutTravaux(): void {
    if (!this.surface || !this.selectedDPEActuel || !this.selectedDPECible) return;

    // Estimation du coût par m² selon le saut de classe
    const sauts: { [key: string]: number } = {
      'G-D': 300, 'G-C': 400, 'G-B': 500, 'G-A': 600,
      'F-D': 250, 'F-C': 350, 'F-B': 450, 'F-A': 550,
      'E-D': 150, 'E-C': 250, 'E-B': 350, 'E-A': 450,
      'D-C': 150, 'D-B': 250, 'D-A': 350
    };

    const cle = `${this.selectedDPEActuel.value}-${this.selectedDPECible.value}`;
    const coutM2 = sauts[cle] || 300;
    this.coutTravaux = this.surface * coutM2;
  }

  calculer(): void {
    if (!this.valeurBien || !this.surface || !this.loyerActuel ||
        !this.selectedDPEActuel || !this.selectedDPECible ||
        !this.coutTravaux || !this.selectedProfil) {
      return;
    }

    const tauxAide = this.selectedProfil.tauxAide;
    const coutBrut = this.coutTravaux;
    const aides = coutBrut * tauxAide;
    const resteACharge = coutBrut - aides;

    // Estimation du nouveau loyer possible (+10 à 20% selon amélioration DPE)
    const ameliorationDPE = this.selectedDPEActuel.conso - this.selectedDPECible.conso;
    const augmentationLoyer = Math.min(0.25, ameliorationDPE / 500); // Max +25%
    const nouveauLoyer = this.loyerActuel * (1 + augmentationLoyer);
    const gainLoyerMensuel = nouveauLoyer - this.loyerActuel;
    const gainLoyerAnnuel = gainLoyerMensuel * 12;

    // Économies d'énergie pour le locataire (indicatif)
    const prixKwh = 0.21; // EUR/kWh moyen
    const economieEnergie = (this.selectedDPEActuel.conso - this.selectedDPECible.conso) * this.surface * prixKwh;

    // ROI de la rénovation
    const roiAnnees = gainLoyerAnnuel > 0 ? resteACharge / gainLoyerAnnuel : 999;

    // Comparaison : Valeur du bien après rénovation
    const decotePassoire = this.selectedDPEActuel.value === 'G' ? 0.20 :
                          this.selectedDPEActuel.value === 'F' ? 0.15 : 0.10;
    const valeurAvantReno = this.valeurBien * (1 - decotePassoire);
    const valeurApresReno = this.valeurBien; // Retrouve sa valeur "normale"
    const plusValuePotentielle = valeurApresReno - valeurAvantReno;

    // Calendrier d'interdiction
    const calendrier = {
      'G': '2025 (déjà interdit)',
      'F': '2028',
      'E': '2034',
      'D': 'Non concerné'
    };

    this.resultats = {
      dpeActuel: this.selectedDPEActuel.value,
      dpeCible: this.selectedDPECible.value,
      coutTravaux: coutBrut,
      aides: aides,
      resteACharge: resteACharge,
      tauxAidePourcent: tauxAide * 100,
      loyerActuel: this.loyerActuel,
      nouveauLoyer: nouveauLoyer,
      gainLoyerMensuel: gainLoyerMensuel,
      gainLoyerAnnuel: gainLoyerAnnuel,
      augmentationPourcent: augmentationLoyer * 100,
      economieEnergie: economieEnergie,
      roiAnnees: roiAnnees,
      valeurAvantReno: valeurAvantReno,
      valeurApresReno: valeurApresReno,
      plusValuePotentielle: plusValuePotentielle,
      interdiction: calendrier[this.selectedDPEActuel.value as keyof typeof calendrier],
      rentable: roiAnnees <= 15
    };
  }
}
