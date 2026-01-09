import { Injectable } from '@angular/core';

export interface TrancheIR {
  plafond: number;
  taux: number;
}

export interface ResultatIR {
  impotBrut: number;
  decote: number;
  impotNet: number;
  tauxMoyen: number;
  tauxMarginal: number;
}

@Injectable({
  providedIn: 'root'
})
export class CalculFiscalService {

  // Barème IR 2026 (revenus 2025)
  private tranchesIR2026: TrancheIR[] = [
    { plafond: 11497, taux: 0 },
    { plafond: 29315, taux: 0.11 },
    { plafond: 83823, taux: 0.30 },
    { plafond: 180294, taux: 0.41 },
    { plafond: Infinity, taux: 0.45 }
  ];

  // Plafonds décote 2026
  private seuilDecoteCelibataire = 1964;
  private seuilDecoteCouple = 3248;
  private montantDecoteCelibataire = 889;
  private montantDecoteCouple = 1470;
  private tauxDecote = 0.4525;

  // SMIC 2026
  readonly SMIC_MENSUEL_BRUT = 1801.80;
  readonly SMIC_HORAIRE_BRUT = 11.88;

  // Plafonds micro-entrepreneur 2026
  readonly PLAFOND_MICRO_BIC_VENTE = 188700;
  readonly PLAFOND_MICRO_BIC_SERVICE = 77700;
  readonly PLAFOND_MICRO_BNC = 77700;

  /**
   * Calcule le nombre de parts fiscales selon la situation familiale
   */
  calculerParts(situation: string, nbEnfants: number, parentIsole: boolean = false): number {
    let parts = 1;

    if (situation === 'marie' || situation === 'pacse') {
      parts = 2;
    } else if (parentIsole && nbEnfants > 0) {
      parts = 1.5; // Parent isolé avec enfant
    }

    // Parts pour les enfants
    if (nbEnfants === 1) {
      parts += 0.5;
    } else if (nbEnfants === 2) {
      parts += 1;
    } else if (nbEnfants >= 3) {
      parts += 1 + (nbEnfants - 2); // 1 part entière à partir du 3ème
    }

    return parts;
  }

  /**
   * Calcule l'impôt sur le revenu avec le barème progressif
   */
  calculerIR(revenuImposable: number, parts: number = 1): ResultatIR {
    const revenuParPart = revenuImposable / parts;
    let impotParPart = 0;
    let tranchePrecedente = 0;
    let tauxMarginal = 0;

    for (const tranche of this.tranchesIR2026) {
      if (revenuParPart > tranche.plafond) {
        impotParPart += (tranche.plafond - tranchePrecedente) * tranche.taux;
        tranchePrecedente = tranche.plafond;
        tauxMarginal = tranche.taux;
      } else {
        impotParPart += (revenuParPart - tranchePrecedente) * tranche.taux;
        tauxMarginal = tranche.taux;
        break;
      }
    }

    const impotBrut = Math.round(impotParPart * parts);
    const tauxMoyen = revenuImposable > 0 ? (impotBrut / revenuImposable) * 100 : 0;

    return {
      impotBrut,
      decote: 0,
      impotNet: impotBrut,
      tauxMoyen: Math.round(tauxMoyen * 100) / 100,
      tauxMarginal: tauxMarginal * 100
    };
  }

  /**
   * Calcule la décote pour revenus modestes
   */
  calculerDecote(impotBrut: number, estCouple: boolean): number {
    const seuil = estCouple ? this.seuilDecoteCouple : this.seuilDecoteCelibataire;
    const montant = estCouple ? this.montantDecoteCouple : this.montantDecoteCelibataire;

    if (impotBrut <= seuil) {
      return Math.max(montant - this.tauxDecote * impotBrut, 0);
    }
    return 0;
  }

  /**
   * Calcule l'IR complet avec décote et crédits d'impôt
   */
  calculerIRComplet(
    revenuImposable: number,
    situation: string,
    nbEnfants: number,
    creditsImpot: number = 0
  ): ResultatIR {
    const parentIsole = (situation === 'veuf' || situation === 'divorce') && nbEnfants > 0;
    const parts = this.calculerParts(situation, nbEnfants, parentIsole);
    const resultat = this.calculerIR(revenuImposable, parts);

    const estCouple = situation === 'marie' || situation === 'pacse';
    resultat.decote = this.calculerDecote(resultat.impotBrut, estCouple);

    const impotApresDecote = Math.max(resultat.impotBrut - resultat.decote, 0);
    resultat.impotNet = Math.max(impotApresDecote - creditsImpot, 0);

    // Recalculer le taux moyen effectif
    if (revenuImposable > 0) {
      resultat.tauxMoyen = Math.round((resultat.impotNet / revenuImposable) * 10000) / 100;
    }

    return resultat;
  }

  /**
   * Calcule les cotisations micro-entrepreneur
   */
  calculerCotisationsMicro(ca: number, typeActivite: 'vente' | 'prestation' | 'liberal'): number {
    const taux: { [key: string]: number } = {
      vente: 12.3,
      prestation: 21.2,
      liberal: 21.1
    };
    return ca * (taux[typeActivite] / 100);
  }

  /**
   * Calcule l'abattement micro-entrepreneur
   */
  getAbattementMicro(typeActivite: 'vente' | 'prestation' | 'liberal'): number {
    const abattements: { [key: string]: number } = {
      vente: 71,
      prestation: 50,
      liberal: 34
    };
    return abattements[typeActivite];
  }

  /**
   * Calcule la conversion brut/net selon le statut
   */
  calculerBrutNet(montant: number, typeContrat: string, estBrut: boolean): { brut: number; net: number; charges: number } {
    const tauxConversion: { [key: string]: number } = {
      cadre: 0.75,
      nonCadre: 0.77,
      fonctionPublique: 0.85,
      liberal: 0.70,
      artisanCommercant: 0.72,
      independant: 0.68
    };

    const taux = tauxConversion[typeContrat] || 0.77;

    let brut: number, net: number;
    if (estBrut) {
      brut = montant;
      net = montant * taux;
    } else {
      net = montant;
      brut = montant / taux;
    }

    return {
      brut: Math.round(brut),
      net: Math.round(net),
      charges: Math.round(brut - net)
    };
  }

  /**
   * Calcule les droits de succession (barème ligne directe)
   */
  calculerDroitsSuccession(montantNet: number, lienParente: 'enfant' | 'frere' | 'neveu' | 'autre'): number {
    const abattements: { [key: string]: number } = {
      enfant: 100000,
      frere: 15932,
      neveu: 7967,
      autre: 1594
    };

    const montantTaxable = Math.max(0, montantNet - (abattements[lienParente] || 0));

    if (lienParente === 'enfant') {
      // Barème ligne directe
      const tranches = [
        { plafond: 8072, taux: 0.05 },
        { plafond: 12109, taux: 0.10 },
        { plafond: 15932, taux: 0.15 },
        { plafond: 552324, taux: 0.20 },
        { plafond: 902838, taux: 0.30 },
        { plafond: 1805677, taux: 0.40 },
        { plafond: Infinity, taux: 0.45 }
      ];

      let droits = 0;
      let precedent = 0;
      for (const tranche of tranches) {
        if (montantTaxable > tranche.plafond) {
          droits += (tranche.plafond - precedent) * tranche.taux;
          precedent = tranche.plafond;
        } else {
          droits += (montantTaxable - precedent) * tranche.taux;
          break;
        }
      }
      return Math.round(droits);
    } else if (lienParente === 'frere') {
      return Math.round(montantTaxable * 0.35); // Simplifié
    } else if (lienParente === 'neveu') {
      return Math.round(montantTaxable * 0.55);
    } else {
      return Math.round(montantTaxable * 0.60);
    }
  }

  /**
   * Calcule le PTZ (Prêt à Taux Zéro) 2026
   */
  calculerPTZ(
    prixBien: number,
    zone: 'A' | 'Abis' | 'B1' | 'B2' | 'C',
    nbPersonnes: number,
    revenuFiscal: number,
    typeLogement: 'neuf' | 'ancien'
  ): { eligible: boolean; montantPTZ: number; plafondRessources: number; quotitePTZ: number } {

    // Plafonds de ressources PTZ 2026 par zone et nombre de personnes
    const plafonds: { [zone: string]: number[] } = {
      'Abis': [49000, 73500, 88200, 102900, 117600, 132300, 147000, 161700],
      'A': [49000, 73500, 88200, 102900, 117600, 132300, 147000, 161700],
      'B1': [34500, 48950, 58450, 68950, 79450, 87650, 95850, 104050],
      'B2': [31500, 43750, 52250, 60250, 68250, 76250, 84250, 92250],
      'C': [28500, 39650, 47400, 54650, 61900, 69100, 76350, 83600]
    };

    // Quotité PTZ selon zone
    const quotites: { [zone: string]: number } = {
      'Abis': 0.50,
      'A': 0.50,
      'B1': 0.50,
      'B2': 0.40,
      'C': 0.40
    };

    const idx = Math.min(nbPersonnes - 1, 7);
    const plafondRessources = plafonds[zone][idx];
    const quotitePTZ = quotites[zone];

    const eligible = revenuFiscal <= plafondRessources && typeLogement === 'neuf';
    const montantPTZ = eligible ? Math.round(prixBien * quotitePTZ) : 0;

    return {
      eligible,
      montantPTZ: Math.min(montantPTZ, 150000), // Plafond PTZ
      plafondRessources,
      quotitePTZ: quotitePTZ * 100
    };
  }
}
