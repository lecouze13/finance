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

interface Travaux {
  nom: string;
  cout: number;
  economieAnnuelle: number;
  selected: boolean;
  aide: number;
}

@Component({
  selector: 'app-simulateur-renovation-energetique',
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
  templateUrl: './simulateur-renovation-energetique.component.html',
  styleUrls: ['./simulateur-renovation-energetique.component.scss']
})
export class SimulateurRenovationEnergetiqueComponent implements OnInit {
  // Situation
  dpeActuel: string = 'F';
  surface: number = 100;
  revenuFiscal: string = 'intermediaire';
  typeLogement: string = 'maison';
  factureEnergie: number = 2500; // €/an

  // Travaux possibles
  travaux: Travaux[] = [
    { nom: 'Isolation des combles', cout: 5000, economieAnnuelle: 400, selected: true, aide: 2500 },
    { nom: 'Isolation des murs (ITE)', cout: 15000, economieAnnuelle: 600, selected: false, aide: 7500 },
    { nom: 'Isolation des murs (ITI)', cout: 8000, economieAnnuelle: 450, selected: false, aide: 4000 },
    { nom: 'Remplacement fenêtres', cout: 8000, economieAnnuelle: 300, selected: false, aide: 2000 },
    { nom: 'Pompe à chaleur air/eau', cout: 15000, economieAnnuelle: 800, selected: true, aide: 5000 },
    { nom: 'Pompe à chaleur air/air', cout: 8000, economieAnnuelle: 500, selected: false, aide: 0 },
    { nom: 'Chauffe-eau thermodynamique', cout: 3500, economieAnnuelle: 200, selected: false, aide: 1200 },
    { nom: 'VMC double flux', cout: 5000, economieAnnuelle: 250, selected: false, aide: 2500 },
    { nom: 'Panneaux solaires (3kWc)', cout: 9000, economieAnnuelle: 600, selected: false, aide: 1500 }
  ];

  // Résultats
  coutTotalTravaux: number = 0;
  aidesTotal: number = 0;
  resteACharge: number = 0;
  economieAnnuelle: number = 0;
  retourInvestissement: number = 0;
  gainSur20Ans: number = 0;
  nouveauDPE: string = '';
  plusValueEstimee: number = 0;

  dpeOptions = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
    { label: 'D', value: 'D' },
    { label: 'E', value: 'E' },
    { label: 'F', value: 'F' },
    { label: 'G', value: 'G' }
  ];

  revenuOptions = [
    { label: 'Très modeste (MaPrimeRénov\' Bleu)', value: 'tres_modeste' },
    { label: 'Modeste (MaPrimeRénov\' Jaune)', value: 'modeste' },
    { label: 'Intermédiaire (MaPrimeRénov\' Violet)', value: 'intermediaire' },
    { label: 'Supérieur (MaPrimeRénov\' Rose)', value: 'superieur' }
  ];

  typeOptions = [
    { label: 'Maison individuelle', value: 'maison' },
    { label: 'Appartement', value: 'appartement' }
  ];

  faqItems: FaqItem[] = [
    {
      question: "Qu'est-ce que MaPrimeRénov' ?",
      answer: "MaPrimeRénov' est l'aide principale pour la rénovation énergétique. Le montant dépend de vos revenus (4 catégories : bleu, jaune, violet, rose) et du type de travaux. Elle est cumulable avec les CEE (Certificats d'Économie d'Énergie)."
    },
    {
      question: "Quels travaux sont les plus rentables ?",
      answer: "L'isolation (combles, murs) offre généralement le meilleur retour sur investissement. Ensuite vient le remplacement du chauffage (pompe à chaleur). Les fenêtres ont un impact limité si l'isolation est défaillante. Commencez toujours par l'isolation."
    },
    {
      question: "Comment passer d'un DPE G à un DPE D ?",
      answer: "Pour gagner 3 classes DPE, il faut généralement : isolation des combles + isolation des murs + remplacement du chauffage + éventuellement fenêtres. Budget moyen : 30 000-50 000€ avant aides pour une maison de 100m²."
    },
    {
      question: "Les aides sont-elles cumulables ?",
      answer: "Oui, vous pouvez cumuler : MaPrimeRénov', CEE (primes énergie), Éco-PTZ (prêt à taux zéro jusqu'à 50 000€), TVA réduite (5,5%), aides locales. Le cumul peut couvrir 50-90% du coût selon vos revenus."
    },
    {
      question: "Qu'est-ce qu'un audit énergétique ?",
      answer: "L'audit énergétique est obligatoire pour MaPrimeRénov' Rénovation d'Ampleur (2+ sauts de classe DPE). Il propose un parcours de travaux et estime les gains énergétiques. Coût : 800-1500€, partiellement subventionné."
    },
    {
      question: "Faut-il faire les travaux en une fois ?",
      answer: "Pour les aides maximales de MaPrimeRénov' Rénovation d'Ampleur, oui. Sinon, vous pouvez étaler les travaux sur plusieurs années avec les aides au geste par geste, mais le montant total des aides sera inférieur."
    },
    {
      question: "L'investissement est-il rentable pour un propriétaire bailleur ?",
      answer: "Oui, car : le loyer peut augmenter (+5-10% pour un bon DPE), la vacance locative diminue, vous anticipez les interdictions de location (G en 2025, F en 2028, E en 2034), et la plus-value à la revente augmente."
    },
    {
      question: "Comment choisir un artisan RGE ?",
      answer: "L'artisan doit être RGE (Reconnu Garant de l'Environnement) pour que vous bénéficiez des aides. Vérifiez sur france-renov.gouv.fr. Demandez 3 devis minimum et méfiez-vous des offres à 1€ (souvent des arnaques)."
    }
  ];

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetaData({
      title: 'Simulateur Rénovation Énergétique 2025 | ROI et aides MaPrimeRénov\'',
      description: 'Calculez gratuitement le coût, les aides et la rentabilité de vos travaux de rénovation énergétique. Isolation, pompe à chaleur, DPE.',
      url: 'https://calculateurfinance.fr/simulateur-renovation-energetique'
    });
    this.calculer();
  }

  calculer(): void {
    // Coût total des travaux sélectionnés
    const travauxSelectionnes = this.travaux.filter(t => t.selected);
    this.coutTotalTravaux = travauxSelectionnes.reduce((sum, t) => sum + t.cout, 0);

    // Aides selon profil revenu
    let facteurAide = 1;
    switch (this.revenuFiscal) {
      case 'tres_modeste': facteurAide = 1.5; break;
      case 'modeste': facteurAide = 1.2; break;
      case 'intermediaire': facteurAide = 1; break;
      case 'superieur': facteurAide = 0.5; break;
    }
    this.aidesTotal = Math.round(travauxSelectionnes.reduce((sum, t) => sum + t.aide, 0) * facteurAide);
    this.aidesTotal = Math.min(this.aidesTotal, this.coutTotalTravaux * 0.9); // Plafonné à 90%

    this.resteACharge = this.coutTotalTravaux - this.aidesTotal;

    // Économie annuelle
    this.economieAnnuelle = travauxSelectionnes.reduce((sum, t) => sum + t.economieAnnuelle, 0);

    // Ajustement selon surface
    const facteurSurface = this.surface / 100;
    this.economieAnnuelle = Math.round(this.economieAnnuelle * facteurSurface);

    // Retour sur investissement
    this.retourInvestissement = this.economieAnnuelle > 0 ? this.resteACharge / this.economieAnnuelle : 0;

    // Gain sur 20 ans
    const inflationEnergie = 1.03; // 3% par an
    let gainCumule = 0;
    for (let i = 0; i < 20; i++) {
      gainCumule += this.economieAnnuelle * Math.pow(inflationEnergie, i);
    }
    this.gainSur20Ans = Math.round(gainCumule - this.resteACharge);

    // Estimation nouveau DPE
    this.nouveauDPE = this.estimerNouveauDPE(travauxSelectionnes);

    // Plus-value estimée (amélioration DPE)
    const dpeIndex = { 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6 };
    const gainClasses = (dpeIndex[this.dpeActuel as keyof typeof dpeIndex] || 5) -
                        (dpeIndex[this.nouveauDPE as keyof typeof dpeIndex] || 3);
    this.plusValueEstimee = Math.round(gainClasses * this.surface * 50); // ~50€/m² par classe gagnée

    // Arrondir
    this.retourInvestissement = Math.round(this.retourInvestissement * 10) / 10;
  }

  estimerNouveauDPE(travauxSelectionnes: Travaux[]): string {
    const dpeIndex = { 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6 };
    const indexDPE = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    let classeActuelle = dpeIndex[this.dpeActuel as keyof typeof dpeIndex] || 5;
    let gainClasses = 0;

    // Estimation simplifiée du gain de classes
    if (travauxSelectionnes.some(t => t.nom.includes('combles'))) gainClasses += 0.5;
    if (travauxSelectionnes.some(t => t.nom.includes('murs'))) gainClasses += 1;
    if (travauxSelectionnes.some(t => t.nom.includes('fenêtres'))) gainClasses += 0.3;
    if (travauxSelectionnes.some(t => t.nom.includes('Pompe à chaleur'))) gainClasses += 1;
    if (travauxSelectionnes.some(t => t.nom.includes('VMC'))) gainClasses += 0.3;
    if (travauxSelectionnes.some(t => t.nom.includes('solaires'))) gainClasses += 0.5;

    const nouvelIndex = Math.max(0, Math.round(classeActuelle - gainClasses));
    return indexDPE[nouvelIndex];
  }

  toggleTravaux(index: number): void {
    this.travaux[index].selected = !this.travaux[index].selected;
    this.calculer();
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  }

  getDPEClass(dpe: string): string {
    const classes: { [key: string]: string } = {
      'A': 'dpe-a', 'B': 'dpe-b', 'C': 'dpe-c', 'D': 'dpe-d',
      'E': 'dpe-e', 'F': 'dpe-f', 'G': 'dpe-g'
    };
    return classes[dpe] || '';
  }
}
