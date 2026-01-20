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
  selector: 'app-simulateur-freelance',
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
  templateUrl: './simulateur-freelance.component.html',
  styleUrls: ['./simulateur-freelance.component.scss']
})
export class SimulateurFreelanceComponent implements OnInit {
  // Paramètres
  chiffreAffaires: number = 80000;
  tauxCharges: number = 10; // frais professionnels
  situationFamiliale: string = '1';
  portageCommission: number = 8;

  // Résultats Micro-entreprise
  microCA: number = 0;
  microAbattement: number = 0;
  microCotisations: number = 0;
  microImpot: number = 0;
  microNet: number = 0;

  // Résultats EURL/SASU à l'IS
  sasuCA: number = 0;
  sasuCharges: number = 0;
  sasuRemuneration: number = 0;
  sasuCotisations: number = 0;
  sasuIS: number = 0;
  sasuDividendes: number = 0;
  sasuFlatTax: number = 0;
  sasuNet: number = 0;

  // Résultats Portage salarial
  portageCA: number = 0;
  portageCommissionMontant: number = 0;
  portageBrut: number = 0;
  portageCotisations: number = 0;
  portageNet: number = 0;

  // Résultats EURL à l'IR (TNS)
  eurlCA: number = 0;
  eurlCharges: number = 0;
  eurlBenefice: number = 0;
  eurlCotisations: number = 0;
  eurlImpot: number = 0;
  eurlNet: number = 0;

  situationOptions = [
    { label: 'Célibataire (1 part)', value: '1' },
    { label: 'Marié/Pacsé (2 parts)', value: '2' },
    { label: 'Marié + 1 enfant (2.5 parts)', value: '2.5' },
    { label: 'Marié + 2 enfants (3 parts)', value: '3' },
    { label: 'Marié + 3 enfants (4 parts)', value: '4' }
  ];

  // Barème IR 2026
  bareme = [
    { limite: 11294, taux: 0 },
    { limite: 28797, taux: 11 },
    { limite: 82341, taux: 30 },
    { limite: 177106, taux: 41 },
    { limite: Infinity, taux: 45 }
  ];

  faqItems: FaqItem[] = [
    {
      question: "Quelles sont les différences entre micro-entreprise et SASU ?",
      answer: "La micro-entreprise offre une gestion simplifiée avec des cotisations de 21.2% du CA et un abattement forfaitaire de 34%. La SASU permet de déduire les charges réelles, de se verser un salaire et/ou des dividendes, avec une protection sociale de dirigeant assimilé salarié. La SASU est plus intéressante à partir de 70-80k€ de CA."
    },
    {
      question: "Qu'est-ce que le portage salarial et pour qui est-ce adapté ?",
      answer: "Le portage salarial est un statut hybride : vous êtes salarié d'une société de portage qui facture vos clients. Vous bénéficiez de la protection sociale du salariat (chômage, retraite). La société prélève 5-10% de commission. C'est adapté aux freelances débutants ou ceux qui veulent sécuriser leur situation."
    },
    {
      question: "EURL à l'IS ou à l'IR : comment choisir ?",
      answer: "L'EURL à l'IR (régime par défaut) taxe le bénéfice à l'impôt sur le revenu, intéressant si vous avez peu de revenus ou des déficits à imputer. L'EURL à l'IS permet de laisser des bénéfices dans la société (taxés à 15-25%) et de se verser des dividendes. L'IS est préférable quand le TMI dépasse 30%."
    },
    {
      question: "Comment fonctionnent les cotisations sociales en micro-entreprise ?",
      answer: "En micro-entreprise BNC (services), les cotisations sont de 21.2% du CA encaissé. Elles couvrent maladie, retraite de base et complémentaire, invalidité-décès. Pas de cotisation minimum : si pas de CA, pas de cotisations. La CFE (taxe locale) s'ajoute après la 1ère année."
    },
    {
      question: "Quels sont les plafonds de la micro-entreprise ?",
      answer: "Pour les prestations de services, le plafond est de 77 700€ de CA annuel (2026). Au-delà, vous basculez automatiquement au régime réel. Un dépassement ponctuel est toléré sur 2 ans. Pour les activités mixtes, les seuils sont calculés séparément."
    },
    {
      question: "Comment optimiser sa rémunération en SASU ?",
      answer: "En SASU, vous pouvez mixer salaire et dividendes. Le salaire génère des cotisations (45% environ) mais des droits sociaux. Les dividendes sont soumis à la flat tax (30%) sans cotisations mais sans droits. L'optimum dépend de votre situation : le simulateur calcule la répartition idéale."
    },
    {
      question: "Le portage salarial donne-t-il droit au chômage ?",
      answer: "Oui, c'est un des avantages majeurs. En tant que salarié porté, vous cotisez à l'assurance chômage. Après une mission, si vous ne retrouvez pas de client, vous pouvez percevoir l'ARE. Il faut avoir travaillé au moins 6 mois dans les 24 derniers mois pour être éligible."
    },
    {
      question: "Quelles charges peut-on déduire en société ?",
      answer: "En société (SASU, EURL à l'IS), vous déduisez les charges réelles : matériel, logiciels, déplacements, repas d'affaires, formation, comptable, loyer bureau, téléphone, assurances. L'avantage par rapport à la micro est significatif si vos frais dépassent 34% du CA."
    },
    {
      question: "Comment fonctionne la TVA pour un freelance ?",
      answer: "En micro-entreprise, vous êtes en franchise de TVA jusqu'à 36 800€ de CA (services). Au-delà, la TVA s'applique. En société, vous collectez la TVA (20%) et déduisez celle de vos achats. La TVA est neutre si vos clients sont des entreprises (ils la récupèrent)."
    },
    {
      question: "Quel statut pour démarrer une activité freelance ?",
      answer: "Pour démarrer, la micro-entreprise est idéale : création gratuite, comptabilité simple, pas de capital. Le portage est bien pour tester sans risque. Une fois l'activité stabilisée (>50k€ CA), envisagez la société pour optimiser fiscalement et crédibiliser votre activité."
    }
  ];

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetaData({
      title: 'Simulateur Freelance 2026 | Comparez Micro, SASU, EURL, Portage',
      description: 'Comparez gratuitement les statuts freelance : micro-entreprise, SASU, EURL, portage salarial. Calculez votre revenu net selon chaque option.',
      url: 'https://calculateurfinance.fr/simulateur-freelance'
    });
    this.calculer();
  }

  calculer(): void {
    const parts = parseFloat(this.situationFamiliale);
    const charges = this.chiffreAffaires * (this.tauxCharges / 100);

    // === MICRO-ENTREPRISE ===
    this.microCA = this.chiffreAffaires;
    this.microCotisations = this.microCA * 0.212; // 21.2% pour BNC
    this.microAbattement = this.microCA * 0.34; // Abattement 34% BNC
    const microRevenuImposable = this.microCA - this.microAbattement;
    this.microImpot = this.calculerIR(microRevenuImposable, parts);
    this.microNet = this.microCA - this.microCotisations - this.microImpot;

    // === SASU à l'IS ===
    this.sasuCA = this.chiffreAffaires;
    this.sasuCharges = charges;
    // On se verse 70% en salaire, 30% en dividendes (optimisation classique)
    const disponible = this.sasuCA - this.sasuCharges;
    this.sasuRemuneration = disponible * 0.55; // Salaire brut
    this.sasuCotisations = this.sasuRemuneration * 0.45; // Cotisations patronales + salariales
    const salaireNet = this.sasuRemuneration - (this.sasuRemuneration * 0.22); // Net environ 78% du brut
    const resultatAvantIS = disponible - this.sasuRemuneration - this.sasuCotisations;
    // IS : 15% jusqu'à 42 500€, puis 25%
    if (resultatAvantIS <= 42500) {
      this.sasuIS = resultatAvantIS * 0.15;
    } else {
      this.sasuIS = 42500 * 0.15 + (resultatAvantIS - 42500) * 0.25;
    }
    this.sasuDividendes = Math.max(0, resultatAvantIS - this.sasuIS);
    this.sasuFlatTax = this.sasuDividendes * 0.30; // Flat tax 30%
    this.sasuNet = salaireNet + this.sasuDividendes - this.sasuFlatTax;

    // === PORTAGE SALARIAL ===
    this.portageCA = this.chiffreAffaires;
    this.portageCommissionMontant = this.portageCA * (this.portageCommission / 100);
    this.portageBrut = (this.portageCA - this.portageCommissionMontant) * 0.50; // ~50% en salaire brut
    this.portageCotisations = this.portageBrut * 0.45;
    this.portageNet = this.portageBrut - (this.portageBrut * 0.22); // Net = ~78% du brut

    // === EURL à l'IR (TNS) ===
    this.eurlCA = this.chiffreAffaires;
    this.eurlCharges = charges;
    this.eurlBenefice = this.eurlCA - this.eurlCharges;
    this.eurlCotisations = this.eurlBenefice * 0.45; // TNS ~45% sur bénéfice
    const eurlRevenuImposable = this.eurlBenefice - this.eurlCotisations;
    this.eurlImpot = this.calculerIR(eurlRevenuImposable, parts);
    this.eurlNet = eurlRevenuImposable - this.eurlImpot;

    // Arrondir tous les résultats
    this.microCotisations = Math.round(this.microCotisations);
    this.microAbattement = Math.round(this.microAbattement);
    this.microImpot = Math.round(this.microImpot);
    this.microNet = Math.round(this.microNet);

    this.sasuCharges = Math.round(this.sasuCharges);
    this.sasuRemuneration = Math.round(this.sasuRemuneration);
    this.sasuCotisations = Math.round(this.sasuCotisations);
    this.sasuIS = Math.round(this.sasuIS);
    this.sasuDividendes = Math.round(this.sasuDividendes);
    this.sasuFlatTax = Math.round(this.sasuFlatTax);
    this.sasuNet = Math.round(this.sasuNet);

    this.portageCommissionMontant = Math.round(this.portageCommissionMontant);
    this.portageBrut = Math.round(this.portageBrut);
    this.portageCotisations = Math.round(this.portageCotisations);
    this.portageNet = Math.round(this.portageNet);

    this.eurlCharges = Math.round(this.eurlCharges);
    this.eurlBenefice = Math.round(this.eurlBenefice);
    this.eurlCotisations = Math.round(this.eurlCotisations);
    this.eurlImpot = Math.round(this.eurlImpot);
    this.eurlNet = Math.round(this.eurlNet);
  }

  calculerIR(revenu: number, parts: number): number {
    const quotient = revenu / parts;
    let impot = 0;
    let borneInf = 0;

    for (const tranche of this.bareme) {
      const trancheTaxable = Math.min(Math.max(0, quotient - borneInf), tranche.limite - borneInf);
      impot += trancheTaxable * (tranche.taux / 100);
      borneInf = tranche.limite;
      if (quotient <= tranche.limite) break;
    }

    return impot * parts;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  }

  getMeilleurStatut(): string {
    const nets = [
      { statut: 'Micro-entreprise', net: this.microNet },
      { statut: 'SASU à l\'IS', net: this.sasuNet },
      { statut: 'Portage salarial', net: this.portageNet },
      { statut: 'EURL à l\'IR', net: this.eurlNet }
    ];
    const meilleur = nets.reduce((a, b) => a.net > b.net ? a : b);
    return meilleur.statut;
  }

  getMeilleurNet(): number {
    return Math.max(this.microNet, this.sasuNet, this.portageNet, this.eurlNet);
  }
}
