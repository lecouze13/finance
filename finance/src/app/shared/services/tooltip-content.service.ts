import { Injectable } from '@angular/core';

export interface TooltipInfo {
  title: string;
  content: string;
  example?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TooltipContentService {

  // Tooltips pour les simulateurs de crédit
  private creditTooltips: { [key: string]: TooltipInfo } = {
    'taeg': {
      title: 'TAEG (Taux Annuel Effectif Global)',
      content: 'Le TAEG inclut tous les frais obligatoires du crédit : intérêts, frais de dossier, assurance obligatoire. C\'est l\'indicateur à comparer entre les offres.',
      example: 'Un crédit à 5% nominal avec 200€ de frais peut avoir un TAEG de 5,8%'
    },
    'taux-nominal': {
      title: 'Taux nominal (ou taux débiteur)',
      content: 'C\'est le taux d\'intérêt "pur" du crédit, hors frais annexes. Il sert de base au calcul des intérêts mais ne reflète pas le coût réel.',
      example: 'Un taux nominal de 4% sur 10 000€ = 400€/an d\'intérêts la première année'
    },
    'assurance-emprunteur': {
      title: 'Assurance emprunteur',
      content: 'Protège en cas de décès, invalidité ou incapacité. Non obligatoire légalement pour le crédit conso, mais souvent exigée par les prêteurs.',
      example: 'Coût moyen : 0,2% à 0,5% du capital par an'
    },
    'frais-dossier': {
      title: 'Frais de dossier',
      content: 'Frais fixes prélevés par l\'organisme prêteur pour l\'étude et la mise en place du crédit. Négociables dans certains cas.',
      example: 'Entre 0€ et 1% du montant emprunté, généralement 50€ à 300€'
    },
    'mensualite': {
      title: 'Mensualité',
      content: 'Somme fixe à rembourser chaque mois, comprenant une part de capital et une part d\'intérêts. Les premières mensualités contiennent plus d\'intérêts.',
      example: 'Sur 10 000€ à 5% sur 48 mois ≈ 230€/mois'
    },
    'capacite-emprunt': {
      title: 'Capacité d\'emprunt',
      content: 'Montant maximum que vous pouvez emprunter en fonction de votre mensualité souhaitée, du taux et de la durée.',
      example: 'Avec 300€/mois à 5% sur 48 mois ≈ 13 000€ empruntables'
    }
  };

  // Tooltips pour SCPI
  private scpiTooltips: { [key: string]: TooltipInfo } = {
    'taux-distribution': {
      title: 'Taux de distribution',
      content: 'Rendement annuel brut de la SCPI, exprimé en pourcentage du prix de la part. Il correspond aux revenus locatifs distribués.',
      example: 'Une SCPI à 5% avec 10 000€ investis = 500€/an de revenus bruts'
    },
    'frais-entree': {
      title: 'Frais d\'entrée (ou de souscription)',
      content: 'Commission prélevée à l\'achat des parts, généralement entre 8% et 12%. Ils sont déduits du capital investi.',
      example: '50 000€ investis avec 10% de frais = 45 000€ réellement placés'
    },
    'tmi': {
      title: 'Tranche Marginale d\'Imposition',
      content: 'Votre taux d\'imposition sur la dernière tranche de revenus. Les revenus SCPI s\'ajoutent à vos autres revenus et sont imposés à ce taux.',
      example: 'TMI 30% + PS 17,2% = 47,2% de fiscalité sur les revenus SCPI'
    },
    'regime-reel': {
      title: 'Régime réel',
      content: 'Permet de déduire les charges réelles (intérêts d\'emprunt, travaux) des revenus fonciers. Obligatoire au-delà de 15 000€/an de revenus fonciers.',
      example: 'Revenus 5 000€ - Intérêts 2 000€ = 3 000€ imposables'
    },
    'micro-foncier': {
      title: 'Régime micro-foncier',
      content: 'Régime simplifié avec un abattement forfaitaire de 30% sur les revenus. Disponible si vos revenus fonciers totaux sont inférieurs à 15 000€/an.',
      example: '5 000€ de revenus - 30% d\'abattement = 3 500€ imposables'
    },
    'effet-levier': {
      title: 'Effet de levier',
      content: 'Stratégie consistant à emprunter pour investir, permettant d\'augmenter la rentabilité des fonds propres si le rendement dépasse le coût du crédit.',
      example: 'Rendement SCPI 5% - Coût crédit 3% = 2% de gain net supplémentaire'
    },
    'delai-jouissance': {
      title: 'Délai de jouissance',
      content: 'Période (3-6 mois) entre l\'achat des parts et le premier versement de revenus. Votre argent est investi mais ne produit pas encore.',
      example: 'Achat en janvier → Premier revenu en avril/mai'
    }
  };

  // Tooltips pour l'épargne
  private epargneTooltips: { [key: string]: TooltipInfo } = {
    'interets-composes': {
      title: 'Intérêts composés',
      content: 'Les intérêts gagnés sont réinvestis et génèrent à leur tour des intérêts. C\'est l\'effet "boule de neige" qui accélère la croissance de votre capital.',
      example: '10 000€ à 5% pendant 20 ans = 26 533€ (vs 20 000€ en intérêts simples)'
    },
    'versement-regulier': {
      title: 'Versements réguliers',
      content: 'Investir un montant fixe chaque mois permet de lisser le risque (DCA) et de profiter pleinement des intérêts composés.',
      example: '200€/mois pendant 20 ans à 5% = 82 000€ (vs 48 000€ versés)'
    },
    'horizon-placement': {
      title: 'Horizon de placement',
      content: 'Durée pendant laquelle vous prévoyez de laisser votre argent investi. Plus l\'horizon est long, plus les intérêts composés sont puissants.',
      example: 'Doubler un capital à 7%/an prend environ 10 ans (règle des 72)'
    },
    'taux-reel': {
      title: 'Rendement réel',
      content: 'Le rendement après déduction de l\'inflation. Un placement à 3% avec 2% d\'inflation ne rapporte que 1% en pouvoir d\'achat.',
      example: 'Livret A à 3% - Inflation 2% = 1% de rendement réel'
    }
  };

  // Tooltips pour l'immobilier
  private immobilierTooltips: { [key: string]: TooltipInfo } = {
    'rendement-brut': {
      title: 'Rendement brut',
      content: 'Loyers annuels divisés par le prix d\'achat. C\'est un premier indicateur mais il ne tient pas compte des charges et impôts.',
      example: '6 000€ de loyer / 100 000€ d\'achat = 6% brut'
    },
    'rendement-net': {
      title: 'Rendement net',
      content: 'Rendement après déduction des charges (taxe foncière, assurance, copropriété, gestion, vacance locative).',
      example: '6% brut - 2% de charges = 4% net avant impôts'
    },
    'cashflow': {
      title: 'Cash-flow',
      content: 'Différence entre les loyers perçus et toutes les dépenses (crédit, charges, impôts). Positif = l\'investissement s\'autofinance.',
      example: 'Loyer 600€ - Crédit 500€ - Charges 150€ = -50€/mois'
    },
    'frais-notaire': {
      title: 'Frais de notaire',
      content: 'Environ 7-8% dans l\'ancien, 2-3% dans le neuf. Incluent les droits de mutation, émoluments du notaire et frais divers.',
      example: '100 000€ d\'achat ancien = ~7 500€ de frais de notaire'
    },
    'taux-endettement': {
      title: 'Taux d\'endettement',
      content: 'Ratio entre vos mensualités de crédit et vos revenus. La limite recommandée est de 35% (assurance incluse).',
      example: 'Revenus 3 000€ × 35% = 1 050€ de mensualités max'
    }
  };

  getTooltip(category: string, key: string): TooltipInfo | null {
    const tooltips: { [key: string]: { [key: string]: TooltipInfo } } = {
      'credit': this.creditTooltips,
      'scpi': this.scpiTooltips,
      'epargne': this.epargneTooltips,
      'immobilier': this.immobilierTooltips
    };

    return tooltips[category]?.[key] || null;
  }

  formatTooltipHtml(info: TooltipInfo): string {
    let html = `<strong>${info.title}</strong><br><br>${info.content}`;
    if (info.example) {
      html += `<br><br><em>💡 ${info.example}</em>`;
    }
    return html;
  }

  // Méthode pour obtenir un tooltip simple (juste le content)
  getSimpleTooltip(category: string, key: string): string {
    const info = this.getTooltip(category, key);
    return info ? info.content : '';
  }
}
