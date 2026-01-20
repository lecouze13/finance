import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { PanelModule } from 'primeng/panel';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { FaqSectionComponent, FaqItem } from '../../shared/faq-section/faq-section.component';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';

interface Travaux {
  id: string;
  nom: string;
  bleu: number;
  jaune: number;
  violet: number;
  rose: number;
}

@Component({
  selector: 'app-simulateur-maprimerenovv',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PanelModule,
    InputNumberModule,
    DropdownModule,
    TableModule,
    TooltipModule,
    DecimalPipe,
    FaqSectionComponent,
    BreadcrumbComponent
  ],
  templateUrl: './simulateur-maprimerenovv.component.html',
  styleUrls: ['./simulateur-maprimerenovv.component.scss']
})
export class SimulateurMaprimerenovvComponent implements OnInit {
  // Plafonds de revenus 2026 (Île-de-France)
  PLAFONDS_IDF = {
    bleu: [23541, 34551, 41493, 48447, 6970],      // Très modestes
    jaune: [28657, 42058, 50513, 58981, 8502],     // Modestes
    violet: [40018, 58827, 70382, 82839, 11455],   // Intermédiaires
    rose: [Infinity, Infinity, Infinity, Infinity, Infinity] // Aisés (au-delà violet)
  };

  // Plafonds de revenus 2026 (Autres régions)
  PLAFONDS_AUTRES = {
    bleu: [17009, 24875, 29917, 34948, 5045],
    jaune: [21805, 31889, 38349, 44802, 6462],
    violet: [30549, 44907, 53728, 63379, 8764],
    rose: [Infinity, Infinity, Infinity, Infinity, Infinity]
  };

  // Montants des aides par type de travaux et profil
  TRAVAUX_LISTE: Travaux[] = [
    { id: 'pac_air_eau', nom: 'Pompe à chaleur air/eau', bleu: 5000, jaune: 4000, violet: 3000, rose: 0 },
    { id: 'pac_geothermie', nom: 'Pompe à chaleur géothermique', bleu: 11000, jaune: 9000, violet: 6000, rose: 0 },
    { id: 'chaudiere_granules', nom: 'Chaudière à granulés', bleu: 10000, jaune: 8000, violet: 4000, rose: 0 },
    { id: 'chaudiere_buches', nom: 'Chaudière à bûches', bleu: 8000, jaune: 6500, violet: 3000, rose: 0 },
    { id: 'poele_granules', nom: 'Poêle à granulés', bleu: 2500, jaune: 2000, violet: 1500, rose: 0 },
    { id: 'poele_buches', nom: 'Poêle à bûches', bleu: 2500, jaune: 2000, violet: 1000, rose: 0 },
    { id: 'insert', nom: 'Insert/foyer fermé', bleu: 2500, jaune: 1500, violet: 800, rose: 0 },
    { id: 'chauffe_eau_solaire', nom: 'Chauffe-eau solaire', bleu: 4000, jaune: 3000, violet: 2000, rose: 0 },
    { id: 'chauffe_eau_thermo', nom: 'Chauffe-eau thermodynamique', bleu: 1200, jaune: 800, violet: 400, rose: 0 },
    { id: 'vmc_double_flux', nom: 'VMC double flux', bleu: 2500, jaune: 2000, violet: 1500, rose: 0 },
    { id: 'isolation_murs_ext', nom: 'Isolation murs par extérieur', bleu: 75, jaune: 60, violet: 40, rose: 0 },
    { id: 'isolation_murs_int', nom: 'Isolation murs par intérieur', bleu: 25, jaune: 20, violet: 15, rose: 0 },
    { id: 'isolation_toiture', nom: 'Isolation toiture/combles', bleu: 25, jaune: 20, violet: 15, rose: 0 },
    { id: 'isolation_plancher', nom: 'Isolation plancher bas', bleu: 25, jaune: 20, violet: 15, rose: 0 },
    { id: 'fenetres', nom: 'Fenêtres/portes-fenêtres', bleu: 100, jaune: 80, violet: 40, rose: 0 },
    { id: 'audit', nom: 'Audit énergétique', bleu: 500, jaune: 400, violet: 300, rose: 0 }
  ];

  // Inputs
  revenuFiscal: number = 30000;
  personnesFoyer: number = 2;
  ileDeFrance: boolean = false;
  travauxSelectionne: string = 'pac_air_eau';
  surface: number = 100; // Pour les travaux au m²

  // Résultats
  profil: string = '';
  profilCouleur: string = '';
  montantAide: number = 0;
  plafondApplicable: number = 0;
  estAuM2: boolean = false;

  regionOptions = [
    { label: 'Province', value: false },
    { label: 'Île-de-France', value: true }
  ];

  personnesOptions = [
    { label: '1 personne', value: 1 },
    { label: '2 personnes', value: 2 },
    { label: '3 personnes', value: 3 },
    { label: '4 personnes', value: 4 },
    { label: '5 personnes', value: 5 },
    { label: '6 personnes ou plus', value: 6 }
  ];

  travauxOptions: { label: string; value: string }[] = [];

  faqItems: FaqItem[] = [
    {
      question: "Qu'est-ce que MaPrimeRénov' ?",
      answer: "MaPrimeRénov' est une aide de l'État pour financer les travaux de rénovation énergétique de votre logement. Elle remplace le crédit d'impôt transition énergétique (CITE) et les aides de l'Anah. Elle est accessible à tous les propriétaires, qu'ils occupent leur logement ou le mettent en location."
    },
    {
      question: "Comment est déterminé mon profil de couleur ?",
      answer: "Votre profil (Bleu, Jaune, Violet ou Rose) dépend de vos revenus fiscaux de référence et de la composition de votre foyer. Les plafonds varient selon que vous habitez en Île-de-France ou ailleurs. MaPrimeRénov' Bleu concerne les ménages très modestes, Jaune les modestes, Violet les intermédiaires et Rose les plus aisés."
    },
    {
      question: "Quels travaux sont éligibles à MaPrimeRénov' ?",
      answer: "Les travaux éligibles incluent : l'isolation (murs, toiture, planchers, fenêtres), le chauffage (pompes à chaleur, chaudières biomasse, poêles), la ventilation (VMC double flux), et le solaire (chauffe-eau solaire, panneaux photovoltaïques en autoconsommation). Un audit énergétique est également finançable."
    },
    {
      question: "Peut-on cumuler MaPrimeRénov' avec d'autres aides ?",
      answer: "Oui, MaPrimeRénov' est cumulable avec les Certificats d'Économies d'Énergie (CEE), l'éco-prêt à taux zéro, les aides locales, et le chèque énergie. Le cumul des aides ne peut pas dépasser un certain pourcentage du coût des travaux selon votre profil (90% pour Bleu, 75% pour Jaune, 60% pour Violet, 40% pour Rose)."
    },
    {
      question: "Quelles sont les conditions pour bénéficier de MaPrimeRénov' ?",
      answer: "Le logement doit être construit depuis plus de 15 ans (ou 2 ans pour le remplacement d'une chaudière fioul). Il doit être votre résidence principale. Les travaux doivent être réalisés par un artisan RGE (Reconnu Garant de l'Environnement). La demande doit être faite avant le début des travaux sur maprimerenov.gouv.fr."
    },
    {
      question: "Qu'est-ce que MaPrimeRénov' Parcours accompagné ?",
      answer: "MaPrimeRénov' Parcours accompagné (ex-Sérénité) finance les rénovations globales permettant un gain énergétique d'au moins 35%. L'aide peut atteindre 63 000€ et couvrir jusqu'à 90% des travaux pour les ménages très modestes. Un accompagnateur Mon Accompagnateur Rénov' est obligatoire."
    },
    {
      question: "Quel est le délai pour recevoir MaPrimeRénov' ?",
      answer: "Après dépôt de la demande de paiement (factures à l'appui), le délai de versement est généralement de 2 à 4 semaines. Le paiement est effectué par virement bancaire. En cas de dossier incomplet, des pièces complémentaires peuvent être demandées, allongeant le délai."
    },
    {
      question: "Les propriétaires bailleurs peuvent-ils bénéficier de MaPrimeRénov' ?",
      answer: "Oui, les propriétaires bailleurs peuvent bénéficier de MaPrimeRénov' pour 3 logements maximum mis en location. Le logement doit être loué comme résidence principale pendant au moins 5 ans après les travaux. Les plafonds d'aide sont identiques à ceux des propriétaires occupants."
    },
    {
      question: "Dois-je avancer les frais des travaux ?",
      answer: "Oui, en principe vous devez payer l'artisan puis demander le remboursement. Cependant, une avance de 70% peut être accordée aux ménages Bleu et Jaune sur demande. Certains artisans proposent également de déduire l'aide directement de la facture via le dispositif 'Mon Prime Rénov' Copropriétés'."
    },
    {
      question: "Que se passe-t-il si je vends mon logement après les travaux ?",
      answer: "Si vous vendez votre logement moins de 5 ans après avoir reçu MaPrimeRénov', vous n'avez pas à rembourser l'aide, mais vous devez en informer l'Anah. L'aide reste attachée au logement et a contribué à améliorer sa performance énergétique, ce qui peut augmenter sa valeur."
    }
  ];

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.travauxOptions = this.TRAVAUX_LISTE.map(t => ({
      label: t.nom,
      value: t.id
    }));
  }

  ngOnInit(): void {
    this.title.setTitle('Simulateur MaPrimeRénov\' 2026 | Calculez votre aide à la rénovation');
    this.meta.updateTag({
      name: 'description',
      content: 'Estimez le montant de MaPrimeRénov\' selon vos revenus et vos travaux de rénovation énergétique. Calculateur officiel 2026 avec les barèmes actualisés.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'MaPrimeRénov, aide rénovation, pompe à chaleur, isolation, prime énergie, rénovation énergétique, Anah'
    });
    this.calculer();
  }

  calculer(): void {
    // Déterminer le profil selon les revenus
    this.determinerProfil();

    // Trouver le travaux sélectionné
    const travaux = this.TRAVAUX_LISTE.find(t => t.id === this.travauxSelectionne);
    if (!travaux) return;

    // Vérifier si c'est un montant au m² (isolation, fenêtres)
    const travauxAuM2 = ['isolation_murs_ext', 'isolation_murs_int', 'isolation_toiture', 'isolation_plancher', 'fenetres'];
    this.estAuM2 = travauxAuM2.includes(this.travauxSelectionne);

    // Calculer le montant selon le profil
    let montantUnitaire = 0;
    switch (this.profil) {
      case 'bleu':
        montantUnitaire = travaux.bleu;
        break;
      case 'jaune':
        montantUnitaire = travaux.jaune;
        break;
      case 'violet':
        montantUnitaire = travaux.violet;
        break;
      case 'rose':
        montantUnitaire = travaux.rose;
        break;
    }

    if (this.estAuM2) {
      this.montantAide = montantUnitaire * this.surface;
    } else {
      this.montantAide = montantUnitaire;
    }
  }

  determinerProfil(): void {
    const plafonds = this.ileDeFrance ? this.PLAFONDS_IDF : this.PLAFONDS_AUTRES;
    const index = Math.min(this.personnesFoyer - 1, 4);

    // Calculer le plafond pour les personnes supplémentaires
    let plafondBleu = plafonds.bleu[index];
    let plafondJaune = plafonds.jaune[index];
    let plafondViolet = plafonds.violet[index];

    if (this.personnesFoyer > 5) {
      const personnesSupp = this.personnesFoyer - 5;
      plafondBleu += plafonds.bleu[4] * personnesSupp;
      plafondJaune += plafonds.jaune[4] * personnesSupp;
      plafondViolet += plafonds.violet[4] * personnesSupp;
    }

    if (this.revenuFiscal <= plafondBleu) {
      this.profil = 'bleu';
      this.profilCouleur = 'MaPrimeRénov\' Bleu (très modeste)';
      this.plafondApplicable = plafondBleu;
    } else if (this.revenuFiscal <= plafondJaune) {
      this.profil = 'jaune';
      this.profilCouleur = 'MaPrimeRénov\' Jaune (modeste)';
      this.plafondApplicable = plafondJaune;
    } else if (this.revenuFiscal <= plafondViolet) {
      this.profil = 'violet';
      this.profilCouleur = 'MaPrimeRénov\' Violet (intermédiaire)';
      this.plafondApplicable = plafondViolet;
    } else {
      this.profil = 'rose';
      this.profilCouleur = 'MaPrimeRénov\' Rose (aisé)';
      this.plafondApplicable = plafondViolet; // Au-delà du plafond violet
    }
  }

  getProfilClass(): string {
    return this.profil;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  }

  getTravauxNom(): string {
    const travaux = this.TRAVAUX_LISTE.find(t => t.id === this.travauxSelectionne);
    return travaux ? travaux.nom : '';
  }
}
