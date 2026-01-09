import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { FaqItem } from '../../shared/faq-section/faq-section.component';

@Component({
  selector: 'app-simulateur-sasu-eurl',
  templateUrl: './simulateur-sasu-eurl.component.html',
  styleUrls: ['./simulateur-sasu-eurl.component.scss'],
  standalone: false
})
export class SimulateurSasuEurlComponent implements OnInit {
  Math = Math;

  // Entrées
  chiffreAffaires: number = 100000;
  charges: number = 30000;
  remunerationSouhaitee: number = 40000;
  dividendes: number = 10000;
  situationFamiliale: string = 'celibataire';
  nombreParts: number = 1;

  // Résultats SASU
  sasuChargesSociales: number = 0;
  sasuCoutRemuneration: number = 0;
  sasuResultatAvantIS: number = 0;
  sasuIS: number = 0;
  sasuDividendesBruts: number = 0;
  sasuPFUDividendes: number = 0;
  sasuDividendesNets: number = 0;
  sasuRevenusNets: number = 0;
  sasuIREstime: number = 0;
  sasuNetApresImpots: number = 0;

  // Résultats EURL
  eurlChargesSociales: number = 0;
  eurlCoutRemuneration: number = 0;
  eurlResultatAvantIS: number = 0;
  eurlIS: number = 0;
  eurlDividendesBruts: number = 0;
  eurlCotisationsDividendes: number = 0;
  eurlDividendesNets: number = 0;
  eurlRevenusNets: number = 0;
  eurlIREstime: number = 0;
  eurlNetApresImpots: number = 0;

  // Comparaison
  difference: number = 0;
  meilleurStatut: string = '';

  situationsOptions = [
    { label: 'Célibataire', value: 'celibataire' },
    { label: 'Marié/Pacsé sans enfant', value: 'couple' },
    { label: 'Marié/Pacsé + 1 enfant', value: 'couple1' },
    { label: 'Marié/Pacsé + 2 enfants', value: 'couple2' }
  ];

  faqItems: FaqItem[] = [
    {
      question: "Quelle est la différence principale entre SASU et EURL ?",
      answer: "La différence majeure concerne le régime social du dirigeant. En SASU, le président est assimilé salarié (régime général, cotisations ~80% du net). En EURL, le gérant est travailleur non salarié TNS (cotisations ~45% du net). La SASU offre une meilleure protection sociale mais coûte plus cher en charges."
    },
    {
      question: "Quelles sont les charges sociales en SASU vs EURL ?",
      answer: "En SASU, les charges patronales et salariales représentent environ 80% du salaire net (soit un coût total de 1.8x le net). En EURL, les cotisations TNS sont d'environ 45% du net. Cette différence significative fait de l'EURL un choix plus économique pour la rémunération régulière."
    },
    {
      question: "Comment sont imposés les dividendes en SASU ?",
      answer: "En SASU, les dividendes sont soumis au PFU (Prélèvement Forfaitaire Unique) de 30% : 12.8% d'impôt + 17.2% de prélèvements sociaux. C'est simple et avantageux pour les hauts revenus. On peut opter pour le barème progressif si c'est plus favorable."
    },
    {
      question: "Comment sont imposés les dividendes en EURL ?",
      answer: "En EURL, les dividendes dépassant 10% du capital + primes d'émission + compte courant sont soumis aux cotisations sociales TNS (~45%). Seule la part < 10% bénéficie du PFU à 30%. C'est un inconvénient majeur de l'EURL pour la distribution de dividendes."
    },
    {
      question: "Quel statut pour optimiser ma protection sociale ?",
      answer: "La SASU offre une meilleure couverture : régime général, meilleure retraite de base, mutuelle obligatoire, prévoyance. Le TNS en EURL a une couverture minimale et doit souscrire des complémentaires (Madelin). Si la protection sociale est prioritaire, privilégiez la SASU."
    },
    {
      question: "SASU ou EURL pour un freelance ?",
      answer: "Pour un freelance avec CA modéré et souhaitant maximiser ses revenus nets, l'EURL est souvent plus avantageuse grâce aux charges plus faibles. Pour un CA élevé avec capacité à verser des dividendes, la SASU peut être intéressante. Le choix dépend du niveau de revenus souhaité et de l'importance de la protection sociale."
    },
    {
      question: "Peut-on passer de EURL à SASU ou inversement ?",
      answer: "Oui, la transformation est possible mais implique des formalités : modification des statuts, publication légale, formalités au greffe. Le coût est de 500-1500€. Attention au changement de régime social qui peut créer une régularisation de cotisations. Mieux vaut bien choisir dès le départ."
    },
    {
      question: "Comment choisir entre rémunération et dividendes ?",
      answer: "La stratégie optimale dépend du statut. En SASU : une rémunération couvrant vos besoins + dividendes pour le surplus (PFU 30%). En EURL : privilégiez la rémunération TNS car les dividendes > 10% sont lourdement taxés. Simulez les deux scénarios pour trouver l'équilibre optimal."
    },
    {
      question: "L'ACRE est-elle disponible pour les deux statuts ?",
      answer: "Oui, l'ACRE (Aide aux Créateurs et Repreneurs d'Entreprise) est accessible en SASU et EURL. Elle offre une exonération partielle de charges sociales la première année : 50% en SASU (assimilé salarié) et exonération dégressive sur 3 ans pour les TNS en EURL. Un avantage précieux au démarrage."
    },
    {
      question: "Quel statut pour préparer une levée de fonds ?",
      answer: "La SASU est préférable pour accueillir des investisseurs : possibilité d'émettre différentes catégories d'actions, BSA, BSPCE pour les salariés. L'EURL, forme unipersonnelle de SARL, est moins flexible pour les opérations capitalistiques. Si vous visez une croissance avec investisseurs, optez pour la SASU."
    }
  ];

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Comparateur SASU vs EURL 2025 | Simulateur Charges et Revenus');
    this.meta.updateTag({
      name: 'description',
      content: 'Comparez SASU et EURL : charges sociales, fiscalité des dividendes, revenus nets. Simulez le meilleur statut juridique pour votre activité. Calcul gratuit et détaillé.'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'SASU vs EURL, comparateur statut juridique, charges SASU, cotisations EURL, dividendes société, créer entreprise, simulateur statut'
    });
    this.updateParts();
    this.calculer();
  }

  updateParts(): void {
    switch (this.situationFamiliale) {
      case 'celibataire': this.nombreParts = 1; break;
      case 'couple': this.nombreParts = 2; break;
      case 'couple1': this.nombreParts = 2.5; break;
      case 'couple2': this.nombreParts = 3; break;
    }
  }

  calculer(): void {
    this.updateParts();
    const resultatBrut = this.chiffreAffaires - this.charges;

    // ===== SASU =====
    // Charges sociales ~82% du net pour avoir le coût total
    const tauxChargesSASU = 0.82;
    this.sasuChargesSociales = this.remunerationSouhaitee * tauxChargesSASU;
    this.sasuCoutRemuneration = this.remunerationSouhaitee + this.sasuChargesSociales;

    // Résultat avant IS
    this.sasuResultatAvantIS = Math.max(0, resultatBrut - this.sasuCoutRemuneration);

    // IS (15% jusqu'à 42 500€, 25% au-delà)
    this.sasuIS = this.calculerIS(this.sasuResultatAvantIS);

    // Dividendes disponibles
    this.sasuDividendesBruts = Math.min(this.dividendes, this.sasuResultatAvantIS - this.sasuIS);

    // PFU sur dividendes (30%)
    this.sasuPFUDividendes = this.sasuDividendesBruts * 0.30;
    this.sasuDividendesNets = this.sasuDividendesBruts - this.sasuPFUDividendes;

    // Revenus nets totaux SASU
    this.sasuRevenusNets = this.remunerationSouhaitee + this.sasuDividendesNets;

    // IR estimé sur salaire (après abattement 10%)
    const salaireFiscal = this.remunerationSouhaitee * 0.90;
    this.sasuIREstime = this.calculerIR(salaireFiscal, this.nombreParts);

    // Net après IR
    this.sasuNetApresImpots = this.sasuRevenusNets - this.sasuIREstime;

    // ===== EURL =====
    // Charges sociales TNS ~45% du net
    const tauxChargesEURL = 0.45;
    this.eurlChargesSociales = this.remunerationSouhaitee * tauxChargesEURL;
    this.eurlCoutRemuneration = this.remunerationSouhaitee + this.eurlChargesSociales;

    // Résultat avant IS
    this.eurlResultatAvantIS = Math.max(0, resultatBrut - this.eurlCoutRemuneration);

    // IS
    this.eurlIS = this.calculerIS(this.eurlResultatAvantIS);

    // Dividendes - attention aux cotisations sur la part > 10% du capital
    this.eurlDividendesBruts = Math.min(this.dividendes, this.eurlResultatAvantIS - this.eurlIS);

    // On considère un capital de 1000€ - dividendes > 10% soumis aux cotisations TNS
    const seuilDividendesExoneres = 1000 * 0.10; // 100€
    const dividendesSoumisCotisations = Math.max(0, this.eurlDividendesBruts - seuilDividendesExoneres);
    const dividendesExoneres = Math.min(this.eurlDividendesBruts, seuilDividendesExoneres);

    // Cotisations sur dividendes (~45%)
    this.eurlCotisationsDividendes = dividendesSoumisCotisations * 0.45;

    // PFU sur part exonérée uniquement
    const pfuPartieExoneree = dividendesExoneres * 0.30;

    // Dividendes nets EURL
    this.eurlDividendesNets = this.eurlDividendesBruts - this.eurlCotisationsDividendes - pfuPartieExoneree;

    // Revenus nets totaux EURL
    this.eurlRevenusNets = this.remunerationSouhaitee + this.eurlDividendesNets;

    // IR estimé EURL (après abattement 10%)
    const remunerationFiscaleEURL = this.remunerationSouhaitee * 0.90;
    this.eurlIREstime = this.calculerIR(remunerationFiscaleEURL, this.nombreParts);

    // Net après IR
    this.eurlNetApresImpots = this.eurlRevenusNets - this.eurlIREstime;

    // Comparaison
    this.difference = this.sasuNetApresImpots - this.eurlNetApresImpots;
    this.meilleurStatut = this.difference > 0 ? 'SASU' : 'EURL';

    // Arrondir tous les résultats
    this.arrondirResultats();
  }

  calculerIS(resultat: number): number {
    if (resultat <= 0) return 0;
    const tauxReduit = 0.15;
    const tauxNormal = 0.25;
    const plafondReduit = 42500;

    if (resultat <= plafondReduit) {
      return resultat * tauxReduit;
    }
    return plafondReduit * tauxReduit + (resultat - plafondReduit) * tauxNormal;
  }

  calculerIR(revenuImposable: number, parts: number): number {
    const quotient = revenuImposable / parts;

    // Barème 2024
    let impot = 0;
    if (quotient <= 11294) {
      impot = 0;
    } else if (quotient <= 28797) {
      impot = (quotient - 11294) * 0.11;
    } else if (quotient <= 82341) {
      impot = (28797 - 11294) * 0.11 + (quotient - 28797) * 0.30;
    } else if (quotient <= 177106) {
      impot = (28797 - 11294) * 0.11 + (82341 - 28797) * 0.30 + (quotient - 82341) * 0.41;
    } else {
      impot = (28797 - 11294) * 0.11 + (82341 - 28797) * 0.30 + (177106 - 82341) * 0.41 + (quotient - 177106) * 0.45;
    }

    return impot * parts;
  }

  arrondirResultats(): void {
    this.sasuChargesSociales = Math.round(this.sasuChargesSociales);
    this.sasuCoutRemuneration = Math.round(this.sasuCoutRemuneration);
    this.sasuResultatAvantIS = Math.round(this.sasuResultatAvantIS);
    this.sasuIS = Math.round(this.sasuIS);
    this.sasuDividendesBruts = Math.round(this.sasuDividendesBruts);
    this.sasuPFUDividendes = Math.round(this.sasuPFUDividendes);
    this.sasuDividendesNets = Math.round(this.sasuDividendesNets);
    this.sasuRevenusNets = Math.round(this.sasuRevenusNets);
    this.sasuIREstime = Math.round(this.sasuIREstime);
    this.sasuNetApresImpots = Math.round(this.sasuNetApresImpots);

    this.eurlChargesSociales = Math.round(this.eurlChargesSociales);
    this.eurlCoutRemuneration = Math.round(this.eurlCoutRemuneration);
    this.eurlResultatAvantIS = Math.round(this.eurlResultatAvantIS);
    this.eurlIS = Math.round(this.eurlIS);
    this.eurlDividendesBruts = Math.round(this.eurlDividendesBruts);
    this.eurlCotisationsDividendes = Math.round(this.eurlCotisationsDividendes);
    this.eurlDividendesNets = Math.round(this.eurlDividendesNets);
    this.eurlRevenusNets = Math.round(this.eurlRevenusNets);
    this.eurlIREstime = Math.round(this.eurlIREstime);
    this.eurlNetApresImpots = Math.round(this.eurlNetApresImpots);

    this.difference = Math.round(this.difference);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  }
}
