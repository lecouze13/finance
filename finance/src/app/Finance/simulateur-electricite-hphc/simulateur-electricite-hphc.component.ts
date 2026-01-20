import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SliderModule } from 'primeng/slider';
import { FaqSectionComponent, FaqItem } from '../../shared/faq-section/faq-section.component';
import { SeoService } from '../../Constructor/service/seo.service';

@Component({
  selector: 'app-simulateur-electricite-hphc',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputNumberModule,
    DropdownModule,
    PanelModule,
    ButtonModule,
    FloatLabelModule,
    SliderModule,
    FaqSectionComponent
  ],
  templateUrl: './simulateur-electricite-hphc.component.html',
  styleUrls: ['./simulateur-electricite-hphc.component.scss']
})
export class SimulateurElectriciteHphcComponent implements OnInit {
  Math = Math;

  // Consommation
  consommationAnnuelle: number = 8500; // kWh/an (moyenne française)
  pourcentageHC: number = 40; // % de conso en heures creuses
  puissanceSouscrite: number = 6; // kVA

  // Tarifs EDF Tarif Bleu 2026 (prix TTC)
  tarifsBase: { [key: number]: { abonnement: number; kwh: number } } = {
    3: { abonnement: 115.56, kwh: 0.2516 },
    6: { abonnement: 151.20, kwh: 0.2516 },
    9: { abonnement: 189.48, kwh: 0.2516 },
    12: { abonnement: 228.48, kwh: 0.2516 },
    15: { abonnement: 264.84, kwh: 0.2516 },
    18: { abonnement: 301.08, kwh: 0.2516 },
    24: { abonnement: 379.20, kwh: 0.2516 },
    30: { abonnement: 449.28, kwh: 0.2516 },
    36: { abonnement: 537.84, kwh: 0.2516 }
  };

  tarifsHPHC: { [key: number]: { abonnement: number; hp: number; hc: number } } = {
    6: { abonnement: 156.12, hp: 0.2700, hc: 0.2068 },
    9: { abonnement: 200.40, hp: 0.2700, hc: 0.2068 },
    12: { abonnement: 241.56, hp: 0.2700, hc: 0.2068 },
    15: { abonnement: 280.80, hp: 0.2700, hc: 0.2068 },
    18: { abonnement: 319.68, hp: 0.2700, hc: 0.2068 },
    24: { abonnement: 401.28, hp: 0.2700, hc: 0.2068 },
    30: { abonnement: 475.56, hp: 0.2700, hc: 0.2068 },
    36: { abonnement: 567.24, hp: 0.2700, hc: 0.2068 }
  };

  // Résultats
  coutBase: number = 0;
  coutHPHC: number = 0;
  economie: number = 0;
  meilleurOption: string = '';
  seuilRentabilite: number = 0;

  // Détails
  detailBase = { abonnement: 0, consommation: 0, total: 0 };
  detailHPHC = { abonnement: 0, consoHP: 0, consoHC: 0, coutHP: 0, coutHC: 0, total: 0 };

  puissanceOptions = [
    { label: '3 kVA (petit logement)', value: 3 },
    { label: '6 kVA (standard)', value: 6 },
    { label: '9 kVA (grand logement)', value: 9 },
    { label: '12 kVA (tout électrique)', value: 12 },
    { label: '15 kVA (grande maison)', value: 15 },
    { label: '18 kVA', value: 18 },
    { label: '24 kVA', value: 24 },
    { label: '30 kVA', value: 30 },
    { label: '36 kVA', value: 36 }
  ];

  faqItems: FaqItem[] = [
    {
      question: "Qu'est-ce que l'option Heures Pleines / Heures Creuses ?",
      answer: "L'option HP/HC propose deux tarifs différents selon l'heure : un tarif réduit pendant les heures creuses (8h par jour, généralement la nuit) et un tarif plus élevé en heures pleines (16h par jour). Les plages horaires sont définies par Enedis et varient selon les communes."
    },
    {
      question: "Quelles sont les plages horaires des heures creuses ?",
      answer: "Les heures creuses représentent 8h par jour, souvent entre 22h et 6h ou en deux plages (ex: 12h-14h et 22h-6h). Ces horaires sont fixés par Enedis pour votre commune et figurent sur votre facture. Ils ne sont pas modifiables par le fournisseur."
    },
    {
      question: "Quel pourcentage de consommation en heures creuses faut-il pour que ce soit rentable ?",
      answer: "En règle générale, l'option HP/HC devient rentable à partir de 30-35% de consommation en heures creuses. Avec un chauffe-eau électrique programmé et un lave-linge/lave-vaisselle en différé, on atteint facilement 40-50%. Notre simulateur calcule précisément votre seuil de rentabilité."
    },
    {
      question: "Comment savoir si j'ai un compteur compatible HP/HC ?",
      answer: "Si vous avez un compteur Linky, vous pouvez passer en HP/HC à tout moment gratuitement. Avec un ancien compteur, vérifiez s'il affiche deux index (HC et HP). Sinon, le passage en HP/HC nécessite un changement de compteur, généralement gratuit dans le cadre du déploiement Linky."
    },
    {
      question: "Quels appareils consomment le plus en électricité ?",
      answer: "Les plus gros consommateurs sont : le chauffage électrique (jusqu'à 60% de la facture), le chauffe-eau (15%), le réfrigérateur/congélateur (15%), le sèche-linge (8%), le lave-linge (5%). Programmer le chauffe-eau et les appareils de lavage en heures creuses optimise l'option HP/HC."
    },
    {
      question: "L'option HP/HC est-elle adaptée à tout le monde ?",
      answer: "Non, l'option HP/HC n'est pas toujours avantageuse. Elle convient aux foyers avec un chauffe-eau électrique, ceux qui peuvent décaler leurs usages (lavage, recharge véhicule). Elle est déconseillée si vous consommez principalement en journée ou si votre consommation totale est faible (<5000 kWh/an)."
    },
    {
      question: "Comment programmer mon chauffe-eau en heures creuses ?",
      answer: "Le compteur Linky envoie un signal de télécommande aux heures creuses. Votre chauffe-eau doit être branché sur un contacteur jour/nuit (souvent déjà installé). En mode 'Auto', le contacteur allume le chauffe-eau uniquement en heures creuses. Vérifiez votre tableau électrique."
    },
    {
      question: "Peut-on changer d'option tarifaire facilement ?",
      answer: "Oui, le changement d'option (Base vers HP/HC ou inversement) est gratuit avec Linky. Il peut être effectué à distance en quelques jours. Avec un ancien compteur, un technicien doit intervenir (60-70€ environ). Vous pouvez changer d'option une fois par an gratuitement."
    },
    {
      question: "L'option Tempo ou EJP est-elle plus avantageuse ?",
      answer: "L'option Tempo propose 3 tarifs (bleu, blanc, rouge) avec des heures creuses. Elle est très avantageuse si vous pouvez réduire votre consommation les 22 jours rouges (chauffage d'appoint). L'EJP n'est plus proposée aux nouveaux clients. Le Tempo convient aux maisons bien isolées."
    },
    {
      question: "Comment connaître ma consommation en heures creuses ?",
      answer: "Avec Linky, consultez votre espace client Enedis ou l'app 'Enedis à mes côtés' pour voir la répartition HP/HC. Sans Linky, relevez les deux index de votre compteur (HP et HC) à un mois d'intervalle. Le pourcentage = (conso HC / conso totale) × 100."
    }
  ];

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetaData({
      title: 'Simulateur Heures Pleines / Heures Creuses 2026 | Comparez les options EDF',
      description: 'Comparez gratuitement les options tarifaires électricité Base vs Heures Pleines/Heures Creuses. Calculez quelle option est la plus économique pour votre foyer.',
      url: 'https://calculateurfinance.fr/simulateur-electricite-hphc'
    });
    this.calculer();
  }

  calculer(): void {
    // Récupération des tarifs selon la puissance
    const tarifBase = this.tarifsBase[this.puissanceSouscrite] || this.tarifsBase[6];
    const tarifHPHC = this.tarifsHPHC[this.puissanceSouscrite] || this.tarifsHPHC[6];

    // Option 3 kVA n'existe pas en HP/HC, on prend 6 kVA
    const tarifHPHCEffectif = this.puissanceSouscrite === 3 ? this.tarifsHPHC[6] : tarifHPHC;

    // Calcul Option Base
    this.detailBase.abonnement = tarifBase.abonnement;
    this.detailBase.consommation = this.consommationAnnuelle * tarifBase.kwh;
    this.detailBase.total = this.detailBase.abonnement + this.detailBase.consommation;
    this.coutBase = this.detailBase.total;

    // Calcul Option HP/HC
    const consoHC = this.consommationAnnuelle * (this.pourcentageHC / 100);
    const consoHP = this.consommationAnnuelle - consoHC;

    this.detailHPHC.abonnement = tarifHPHCEffectif.abonnement;
    this.detailHPHC.consoHP = consoHP;
    this.detailHPHC.consoHC = consoHC;
    this.detailHPHC.coutHP = consoHP * tarifHPHCEffectif.hp;
    this.detailHPHC.coutHC = consoHC * tarifHPHCEffectif.hc;
    this.detailHPHC.total = this.detailHPHC.abonnement + this.detailHPHC.coutHP + this.detailHPHC.coutHC;
    this.coutHPHC = this.detailHPHC.total;

    // Économie
    this.economie = this.coutBase - this.coutHPHC;
    this.meilleurOption = this.economie > 0 ? 'HP/HC' : 'Base';

    // Calcul du seuil de rentabilité (% HC minimum pour que HP/HC soit rentable)
    // Équation : abonnement_base + conso * prix_base = abonnement_hphc + conso * (1-x) * prix_hp + conso * x * prix_hc
    // Résolution pour x (pourcentage HC)
    const diffAbonnement = tarifHPHCEffectif.abonnement - tarifBase.abonnement;
    const diffTarif = tarifHPHCEffectif.hp - tarifHPHCEffectif.hc;

    if (this.consommationAnnuelle > 0 && diffTarif > 0) {
      // seuil = (abonnement_hphc - abonnement_base + conso * (prix_hp - prix_base)) / (conso * (prix_hp - prix_hc))
      const numerateur = diffAbonnement + this.consommationAnnuelle * (tarifHPHCEffectif.hp - tarifBase.kwh);
      const denominateur = this.consommationAnnuelle * diffTarif;
      this.seuilRentabilite = (numerateur / denominateur) * 100;
      this.seuilRentabilite = Math.max(0, Math.min(100, this.seuilRentabilite));
    } else {
      this.seuilRentabilite = 100;
    }

    // Arrondir
    this.coutBase = Math.round(this.coutBase * 100) / 100;
    this.coutHPHC = Math.round(this.coutHPHC * 100) / 100;
    this.economie = Math.round(this.economie * 100) / 100;
    this.seuilRentabilite = Math.round(this.seuilRentabilite);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(value);
  }

  formatNumber(value: number): string {
    return new Intl.NumberFormat('fr-FR').format(value);
  }
}
