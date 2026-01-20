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
  selector: 'app-simulateur-leasing-voiture',
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
  templateUrl: './simulateur-leasing-voiture.component.html',
  styleUrls: ['./simulateur-leasing-voiture.component.scss']
})
export class SimulateurLeasingVoitureComponent implements OnInit {
  // Prix du véhicule
  prixVehicule: number = 35000;
  apport: number = 5000;
  dureeContrat: number = 48; // mois
  kilometrageAnnuel: number = 15000;

  // LOA
  loyerLOA: number = 350;
  optionAchatLOA: number = 8000;

  // LLD
  loyerLLD: number = 400;

  // Crédit
  tauxCredit: number = 5.5;
  dureeCredit: number = 60;

  // Valeur résiduelle estimée
  depreciationAnnuelle: number = 15; // %

  // Résultats
  coutTotalLOA: number = 0;
  coutTotalLLD: number = 0;
  coutTotalCredit: number = 0;
  coutTotalComptant: number = 0;
  mensualiteCredit: number = 0;
  valeurResiduelle: number = 0;
  meilleurOption: string = '';

  dureeOptions = [
    { label: '24 mois', value: 24 },
    { label: '36 mois', value: 36 },
    { label: '48 mois', value: 48 },
    { label: '60 mois', value: 60 }
  ];

  faqItems: FaqItem[] = [
    {
      question: "Quelle est la différence entre LOA et LLD ?",
      answer: "La LOA (Location avec Option d'Achat) permet d'acheter le véhicule en fin de contrat pour un montant fixé à l'avance. La LLD (Location Longue Durée) est une simple location : vous rendez le véhicule à la fin sans possibilité de l'acheter. La LLD inclut souvent l'entretien et l'assurance."
    },
    {
      question: "LOA ou crédit auto : que choisir ?",
      answer: "Le crédit auto vous rend propriétaire immédiatement et coûte généralement moins cher sur la durée totale. La LOA offre des mensualités plus faibles et la flexibilité de ne pas acheter. Choisissez le crédit si vous gardez vos voitures longtemps, la LOA si vous changez souvent."
    },
    {
      question: "Quels sont les frais cachés du leasing ?",
      answer: "Les principaux frais cachés sont : dépassement kilométrique (0,10-0,20€/km), remise en état du véhicule (rayures, usure anormale), frais de restitution (100-300€), pénalités de résiliation anticipée. Lisez attentivement le contrat avant de signer."
    },
    {
      question: "Puis-je résilier un contrat de leasing ?",
      answer: "La résiliation anticipée est possible mais coûteuse : vous devrez payer les loyers restants ou une indemnité de résiliation (souvent 50% des loyers restants). Certains contrats permettent le transfert du leasing à un tiers."
    },
    {
      question: "Le leasing est-il intéressant pour les professionnels ?",
      answer: "Oui, pour les entreprises la LLD est souvent avantageuse : loyers déductibles du résultat, pas d'immobilisation comptable, gestion de flotte simplifiée. Pour les indépendants, la déductibilité dépend du type de véhicule et de son usage professionnel."
    },
    {
      question: "Comment négocier un contrat de leasing ?",
      answer: "Négociez : le premier loyer majoré (plus il est élevé, plus les mensualités baissent), le prix de l'option d'achat LOA, l'inclusion de l'entretien et de l'assurance, le kilométrage annuel (demandez une marge), et les frais de restitution."
    },
    {
      question: "Acheter comptant est-il vraiment plus économique ?",
      answer: "L'achat comptant évite les intérêts et frais de financement, mais immobilise votre capital. Si vous pouvez placer cet argent à un rendement supérieur au taux du crédit, le financement peut être plus intéressant. Calculez le coût d'opportunité."
    },
    {
      question: "Quelle formule pour une voiture électrique ?",
      answer: "Pour les véhicules électriques, la LOA/LLD est souvent recommandée car la technologie évolue vite et la valeur résiduelle est incertaine. De plus, les batteries peuvent se dégrader. La location vous protège du risque de décote."
    }
  ];

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetaData({
      title: 'Simulateur Leasing vs Achat Voiture 2026 | LOA, LLD, Crédit ou Comptant',
      description: 'Comparez gratuitement les options de financement auto : LOA, LLD, crédit ou achat comptant. Trouvez la formule la plus économique.',
      url: 'https://calculateurfinance.fr/simulateur-leasing-voiture'
    });
    this.calculer();
  }

  calculer(): void {
    const anneesContrat = this.dureeContrat / 12;

    // Valeur résiduelle estimée du véhicule
    this.valeurResiduelle = this.prixVehicule * Math.pow(1 - this.depreciationAnnuelle / 100, anneesContrat);

    // LOA : loyers + option d'achat si exercée
    this.coutTotalLOA = this.apport + (this.loyerLOA * this.dureeContrat) + this.optionAchatLOA;

    // LLD : loyers uniquement (pas de propriété)
    this.coutTotalLLD = this.apport + (this.loyerLLD * this.dureeContrat);

    // Crédit auto
    const montantEmprunte = this.prixVehicule - this.apport;
    const tauxMensuel = this.tauxCredit / 100 / 12;
    this.mensualiteCredit = montantEmprunte * (tauxMensuel * Math.pow(1 + tauxMensuel, this.dureeCredit)) / (Math.pow(1 + tauxMensuel, this.dureeCredit) - 1);
    const totalRembourse = this.mensualiteCredit * this.dureeCredit;
    // Coût crédit = total remboursé - valeur résiduelle du véhicule
    this.coutTotalCredit = this.apport + totalRembourse - this.valeurResiduelle;

    // Achat comptant
    // Coût = prix - valeur résiduelle + coût d'opportunité (placement à 3%)
    const coutOpportunite = this.prixVehicule * 0.03 * anneesContrat;
    this.coutTotalComptant = this.prixVehicule - this.valeurResiduelle + coutOpportunite;

    // Meilleure option
    const couts = [
      { nom: 'LOA', cout: this.coutTotalLOA },
      { nom: 'LLD', cout: this.coutTotalLLD },
      { nom: 'Crédit', cout: this.coutTotalCredit },
      { nom: 'Comptant', cout: this.coutTotalComptant }
    ];
    couts.sort((a, b) => a.cout - b.cout);
    this.meilleurOption = couts[0].nom;

    // Arrondir
    this.coutTotalLOA = Math.round(this.coutTotalLOA);
    this.coutTotalLLD = Math.round(this.coutTotalLLD);
    this.coutTotalCredit = Math.round(this.coutTotalCredit);
    this.coutTotalComptant = Math.round(this.coutTotalComptant);
    this.mensualiteCredit = Math.round(this.mensualiteCredit);
    this.valeurResiduelle = Math.round(this.valeurResiduelle);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  }

  getCoutMensuelMoyen(coutTotal: number): number {
    return Math.round(coutTotal / this.dureeContrat);
  }
}
