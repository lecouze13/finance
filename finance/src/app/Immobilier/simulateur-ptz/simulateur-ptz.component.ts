import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../Constructor/service/seo.service';
import { FaqItem } from '../../shared/faq-section/faq-section.component';
import { CalculFiscalService } from '../../shared/services/calcul-fiscal.service';

@Component({
  selector: 'app-simulateur-ptz',
  templateUrl: './simulateur-ptz.component.html',
  styleUrls: ['./simulateur-ptz.component.scss']
})
export class SimulateurPtzComponent implements OnInit {

  faqItems: FaqItem[] = [
    {
      question: "Qu'est-ce que le PTZ (Prêt à Taux Zéro) ?",
      answer: "Le PTZ est un prêt immobilier sans intérêts accordé par l'État pour aider les primo-accédants à acheter leur résidence principale. Il permet de financer jusqu'à 50% du prix du bien selon la zone géographique."
    },
    {
      question: "Qui peut bénéficier du PTZ en 2026 ?",
      answer: "Le PTZ s'adresse aux primo-accédants (personnes n'ayant pas été propriétaires de leur résidence principale durant les 2 dernières années) dont les revenus ne dépassent pas les plafonds fixés selon la zone et la composition du foyer."
    },
    {
      question: "Quelles sont les zones éligibles au PTZ ?",
      answer: "La France est divisée en zones A bis, A, B1, B2 et C selon la tension du marché immobilier. Les zones tendues (A bis, A, B1) offrent des quotités PTZ plus élevées (50%) contre 40% en zones B2 et C."
    },
    {
      question: "Quel montant maximum peut-on emprunter avec le PTZ ?",
      answer: "Le montant du PTZ dépend du prix du bien, de la zone et du nombre de personnes dans le foyer. Le plafond absolu est de 150 000 euros, mais la quotité appliquée varie de 40% à 50% selon la zone."
    },
    {
      question: "Le PTZ finance-t-il l'ancien ?",
      answer: "Depuis 2024, le PTZ est principalement réservé aux logements neufs et à l'acquisition de logements sociaux. L'ancien avec travaux n'est plus éligible sauf exceptions en zones B2 et C."
    },
    {
      question: "Quelle est la durée de remboursement du PTZ ?",
      answer: "La durée du PTZ varie de 20 à 25 ans selon les revenus du ménage. Un différé de remboursement de 5 à 15 ans peut être accordé, pendant lequel vous ne remboursez pas le PTZ."
    },
    {
      question: "Comment calculer mon éligibilité au PTZ ?",
      answer: "L'éligibilité dépend de votre revenu fiscal de référence (RFR N-2), du nombre de personnes dans le foyer et de la zone géographique du bien. Notre simulateur vérifie instantanément votre éligibilité."
    },
    {
      question: "Peut-on cumuler le PTZ avec d'autres aides ?",
      answer: "Oui, le PTZ peut être cumulé avec d'autres prêts (prêt bancaire classique, prêt Action Logement, prêt épargne logement) et certaines aides locales à l'accession."
    },
    {
      question: "Quels sont les plafonds de ressources PTZ 2026 ?",
      answer: "Les plafonds varient selon la zone et le nombre de personnes : de 28 500€ (1 personne en zone C) à 161 700€ (8 personnes en zone A/A bis). Consultez notre simulateur pour connaître votre plafond."
    },
    {
      question: "Que se passe-t-il si je revends mon bien acheté avec PTZ ?",
      answer: "En cas de revente avant remboursement total du PTZ, vous devez rembourser le capital restant dû. Des exceptions existent en cas de mobilité professionnelle, divorce ou décès."
    }
  ];

  zones = [
    { label: 'Zone A bis (Paris et communes limitrophes)', value: 'Abis' },
    { label: 'Zone A (Grandes agglomérations)', value: 'A' },
    { label: 'Zone B1 (Agglomérations > 250 000 hab.)', value: 'B1' },
    { label: 'Zone B2 (Communes > 50 000 hab.)', value: 'B2' },
    { label: 'Zone C (Reste du territoire)', value: 'C' }
  ];

  typesLogement = [
    { label: 'Logement neuf', value: 'neuf' },
    { label: 'Logement ancien avec travaux', value: 'ancien' }
  ];

  prixBien: number | null = null;
  zone: 'A' | 'Abis' | 'B1' | 'B2' | 'C' = 'B1';
  nbPersonnes: number = 2;
  revenuFiscal: number | null = null;
  typeLogement: 'neuf' | 'ancien' = 'neuf';

  resultat: {
    eligible: boolean;
    montantPTZ: number;
    plafondRessources: number;
    quotitePTZ: number;
    mensualitePTZ?: number;
  } | null = null;

  constructor(
    private seo: SeoService,
    private calculFiscal: CalculFiscalService
  ) {}

  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Simulateur PTZ 2026 | Prêt à Taux Zéro Gratuit | CalculateurFinance.fr',
      description: 'Calculez votre éligibilité au PTZ 2026 et le montant de votre Prêt à Taux Zéro. Simulateur gratuit avec plafonds de ressources et quotités par zone.',
      url: 'https://calculateurfinance.fr/simulateur-ptz/',
      keywords: 'simulateur PTZ 2026, prêt taux zéro, PTZ neuf, éligibilité PTZ, plafond ressources PTZ, calcul PTZ, primo-accédant, aide achat immobilier, zone PTZ, montant PTZ'
    });
  }

  calculer(): void {
    if (!this.prixBien || !this.revenuFiscal || this.nbPersonnes < 1) {
      return;
    }

    const resultatPTZ = this.calculFiscal.calculerPTZ(
      this.prixBien,
      this.zone,
      this.nbPersonnes,
      this.revenuFiscal,
      this.typeLogement
    );

    this.resultat = {
      ...resultatPTZ,
      mensualitePTZ: resultatPTZ.montantPTZ > 0 ? Math.round(resultatPTZ.montantPTZ / 240) : 0 // 20 ans
    };
  }
}
