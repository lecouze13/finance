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

interface ChargeItem {
  nom: string;
  montant: number;
  partLocataire: number; // pourcentage
  categorie: string;
}

@Component({
  selector: 'app-simulateur-charges-locatives',
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
  templateUrl: './simulateur-charges-locatives.component.html',
  styleUrls: ['./simulateur-charges-locatives.component.scss']
})
export class SimulateurChargesLocativesComponent implements OnInit {
  // Type de location
  typeLocation: string = 'vide';
  typeLogement: string = 'appartement';

  // Charges de copropriété
  chargesCopro: number = 2400;
  provisionCharges: number = 150;

  // Charges détaillées
  charges: ChargeItem[] = [
    { nom: 'Entretien parties communes', montant: 600, partLocataire: 100, categorie: 'copro' },
    { nom: 'Ascenseur (entretien)', montant: 300, partLocataire: 100, categorie: 'copro' },
    { nom: 'Électricité parties communes', montant: 200, partLocataire: 100, categorie: 'copro' },
    { nom: 'Eau froide parties communes', montant: 150, partLocataire: 100, categorie: 'copro' },
    { nom: 'Ordures ménagères (TEOM)', montant: 250, partLocataire: 100, categorie: 'taxe' },
    { nom: 'Gardiennage / Concierge', montant: 400, partLocataire: 75, categorie: 'copro' },
    { nom: 'Espaces verts', montant: 150, partLocataire: 100, categorie: 'copro' },
    { nom: 'Assurance immeuble', montant: 200, partLocataire: 0, categorie: 'copro' },
    { nom: 'Frais de gestion syndic', montant: 150, partLocataire: 0, categorie: 'copro' },
    { nom: 'Ravalement façade (provision)', montant: 500, partLocataire: 0, categorie: 'travaux' },
    { nom: 'Chauffage collectif', montant: 800, partLocataire: 100, categorie: 'energie' },
    { nom: 'Eau chaude collective', montant: 400, partLocataire: 100, categorie: 'energie' }
  ];

  // Résultats
  totalCharges: number = 0;
  totalRecuperables: number = 0;
  totalNonRecuperables: number = 0;
  provisionMensuelle: number = 0;
  regularisationEstimee: number = 0;

  // Expose Math for template
  Math = Math;

  typeLocationOptions = [
    { label: 'Location vide', value: 'vide' },
    { label: 'Location meublée', value: 'meuble' }
  ];

  typeLogementOptions = [
    { label: 'Appartement en copropriété', value: 'appartement' },
    { label: 'Maison individuelle', value: 'maison' }
  ];

  faqItems: FaqItem[] = [
    {
      question: "Qu'est-ce qu'une charge récupérable sur le locataire ?",
      answer: "Les charges récupérables (ou charges locatives) sont des dépenses payées par le propriétaire mais remboursées par le locataire. Elles couvrent les services dont le locataire bénéficie directement : entretien des parties communes, eau, chauffage collectif, ordures ménagères. La liste est fixée par le décret n°87-713 du 26 août 1987."
    },
    {
      question: "Quelles charges ne sont pas récupérables ?",
      answer: "Les charges non récupérables restent à la charge du propriétaire : honoraires du syndic, frais d'administration, ravalement de façade, grosses réparations (toiture, ascenseur), assurance de l'immeuble, frais de contentieux. En général, tout ce qui relève de l'entretien structurel ou de la gestion n'est pas récupérable."
    },
    {
      question: "Comment fonctionne la provision sur charges ?",
      answer: "Le locataire verse chaque mois une provision estimée. En fin d'année, le propriétaire fait la régularisation : si les charges réelles dépassent les provisions, le locataire paie le complément. Si les provisions excèdent les charges réelles, le trop-perçu est remboursé ou déduit des loyers suivants."
    },
    {
      question: "Comment calculer la provision sur charges ?",
      answer: "Basez-vous sur le relevé de charges de l'année précédente divisé par 12. Ajoutez une marge de 5-10% pour anticiper les hausses. En location vide, la provision est obligatoire. En meublé, vous pouvez opter pour un forfait non régularisable, mais il doit rester cohérent avec la réalité des charges."
    },
    {
      question: "Qu'est-ce que le forfait charges en location meublée ?",
      answer: "En location meublée, le propriétaire peut choisir un forfait de charges fixe au lieu d'une provision. Ce forfait n'est pas régularisable : pas de remboursement si les charges réelles sont inférieures, pas de complément si elles sont supérieures. Le forfait doit être réaliste et mentionné dans le bail."
    },
    {
      question: "La TEOM est-elle récupérable sur le locataire ?",
      answer: "Oui, la Taxe d'Enlèvement des Ordures Ménagères (TEOM) est intégralement récupérable. Elle figure sur l'avis de taxe foncière. Attention : les frais de gestion et les dégrèvements liés à la taxe foncière ne sont pas récupérables, seule la TEOM l'est."
    },
    {
      question: "Comment répartir les charges de gardiennage ?",
      answer: "Le gardiennage est récupérable à 75% si le gardien assure l'entretien des parties communes OU le tri des ordures, et à 40% s'il fait les deux. Si le gardien n'effectue aucune de ces tâches, la charge n'est pas récupérable. Ces taux sont fixés réglementairement."
    },
    {
      question: "Puis-je récupérer les travaux d'économie d'énergie ?",
      answer: "Depuis 2009, le propriétaire peut demander une contribution du locataire pour les travaux d'économie d'énergie (isolation, chaudière performante). Cette contribution est plafonnée et limitée dans le temps (15 ans max). Elle doit être justifiée par des gains réels pour le locataire."
    },
    {
      question: "Quand faire la régularisation des charges ?",
      answer: "La régularisation doit intervenir dans l'année suivant la clôture des comptes de copropriété. Le propriétaire doit communiquer au locataire le décompte par nature de charges, le mode de répartition, et tenir les justificatifs à disposition pendant 6 mois après l'envoi du décompte."
    },
    {
      question: "Que faire en cas de litige sur les charges ?",
      answer: "En cas de désaccord, le locataire peut demander les justificatifs (factures, relevés de copropriété). Si le litige persiste, saisissez la Commission Départementale de Conciliation (CDC), gratuite. En dernier recours, le tribunal judiciaire est compétent pour trancher."
    }
  ];

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetaData({
      title: 'Simulateur Charges Locatives 2025 | Répartition Propriétaire / Locataire',
      description: 'Calculez la répartition des charges entre propriétaire et locataire. Identifiez les charges récupérables et optimisez votre provision mensuelle.',
      url: 'https://calculateurfinance.fr/simulateur-charges-locatives'
    });
    this.calculer();
  }

  calculer(): void {
    this.totalCharges = this.charges.reduce((sum, c) => sum + c.montant, 0);
    this.totalRecuperables = this.charges.reduce((sum, c) => sum + (c.montant * c.partLocataire / 100), 0);
    this.totalNonRecuperables = this.totalCharges - this.totalRecuperables;

    this.provisionMensuelle = Math.ceil(this.totalRecuperables / 12);
    this.regularisationEstimee = this.totalRecuperables - (this.provisionCharges * 12);

    // Arrondir
    this.totalCharges = Math.round(this.totalCharges);
    this.totalRecuperables = Math.round(this.totalRecuperables);
    this.totalNonRecuperables = Math.round(this.totalNonRecuperables);
    this.regularisationEstimee = Math.round(this.regularisationEstimee);
  }

  ajouterCharge(): void {
    this.charges.push({
      nom: 'Nouvelle charge',
      montant: 0,
      partLocataire: 100,
      categorie: 'autre'
    });
    this.calculer();
  }

  supprimerCharge(index: number): void {
    this.charges.splice(index, 1);
    this.calculer();
  }

  getCategorieLabel(categorie: string): string {
    const labels: { [key: string]: string } = {
      'copro': 'Copropriété',
      'taxe': 'Taxes',
      'energie': 'Énergie',
      'travaux': 'Travaux',
      'autre': 'Autre'
    };
    return labels[categorie] || categorie;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  }

  getChargesParCategorie(categorie: string): ChargeItem[] {
    return this.charges.filter(c => c.categorie === categorie);
  }
}
