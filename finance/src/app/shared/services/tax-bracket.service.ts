import { Injectable } from '@angular/core';

export interface TrancheFiscale {
  min: number;
  max: number;
  taux: number;
}

export interface BaremeImpot {
  annee: number;
  tranches: TrancheFiscale[];
}

@Injectable({
  providedIn: 'root'
})
export class TaxBracketService {

  constructor() { }

  /**
   * Barème de l'impôt sur le revenu 2026 (revenus 2025)
   */
  private baremeIR2026: TrancheFiscale[] = [
    { min: 0, max: 11294, taux: 0 },
    { min: 11294, max: 28797, taux: 11 },
    { min: 28797, max: 82341, taux: 30 },
    { min: 82341, max: 177106, taux: 41 },
    { min: 177106, max: Infinity, taux: 45 }
  ];

  /**
   * Barème IFI 2026 (Impôt sur la Fortune Immobilière)
   */
  private baremeIFI2026: TrancheFiscale[] = [
    { min: 0, max: 800000, taux: 0 },
    { min: 800000, max: 1300000, taux: 0.5 },
    { min: 1300000, max: 2570000, taux: 0.7 },
    { min: 2570000, max: 5000000, taux: 1 },
    { min: 5000000, max: 10000000, taux: 1.25 },
    { min: 10000000, max: Infinity, taux: 1.5 }
  ];

  /**
   * Plafonds RFR pour LEP 2026 par nombre de parts
   */
  private plafondsLEP2026: { [parts: number]: number } = {
    1: 22419,
    1.5: 28129,
    2: 33839,
    2.5: 39549,
    3: 45259,
    3.5: 50969,
    4: 56679
  };

  /**
   * Taux de cotisations sociales 2026
   */
  private cotisationsSociales2026 = {
    salarie: {
      assuranceMaladie: 0,
      assuranceVieillesse: 6.90,
      retraiteComplementaire: 3.15,
      chomage: 2.40,
      csg: 9.20,
      crds: 0.50,
      total: 22.15
    },
    employeur: {
      assuranceMaladie: 13,
      allocFamiliales: 3.45,
      assuranceVieillesse: 8.55,
      retraiteComplementaire: 4.72,
      chomage: 4.05,
      accidentTravail: 1,
      total: 42
    },
    microEntrepreneur: {
      vente: 12.3,
      prestationServiceBIC: 21.2,
      prestationServiceBNC: 21.1,
      liberal: 21.2
    }
  };

  /**
   * Calcule l'impôt sur le revenu selon le barème progressif
   * @param revenuImposable Revenu imposable (quotient familial)
   * @param parts Nombre de parts fiscales
   * @returns Impôt total et détail par tranche
   */
  calculerImpotRevenu(
    revenuImposable: number,
    parts: number
  ): { impotTotal: number; detailTranches: any[] } {
    const quotient = revenuImposable / parts;
    let impotParPart = 0;
    const detailTranches: any[] = [];

    for (let i = 0; i < this.baremeIR2026.length; i++) {
      const tranche = this.baremeIR2026[i];

      if (quotient > tranche.min) {
        const montantTrancheImposable = Math.min(
          quotient - tranche.min,
          tranche.max - tranche.min
        );
        const impotTranche = montantTrancheImposable * (tranche.taux / 100);
        impotParPart += impotTranche;

        detailTranches.push({
          tranche: `${tranche.min.toLocaleString()} - ${tranche.max === Infinity ? '+' : tranche.max.toLocaleString()} €`,
          taux: tranche.taux,
          montantImposable: Math.round(montantTrancheImposable * 100) / 100,
          impot: Math.round(impotTranche * 100) / 100
        });
      }
    }

    const impotTotal = Math.round(impotParPart * parts * 100) / 100;

    return { impotTotal, detailTranches };
  }

  /**
   * Calcule l'IFI (Impôt sur la Fortune Immobilière)
   * @param patrimoineNet Patrimoine immobilier net taxable
   * @returns Impôt IFI et détail par tranche
   */
  calculerIFI(patrimoineNet: number): { ifi: number; detailTranches: any[] } {
    if (patrimoineNet < 800000) {
      return { ifi: 0, detailTranches: [] };
    }

    let ifi = 0;
    const detailTranches: any[] = [];

    for (let i = 0; i < this.baremeIFI2026.length; i++) {
      const tranche = this.baremeIFI2026[i];

      if (patrimoineNet > tranche.min) {
        const montantTrancheImposable = Math.min(
          patrimoineNet - tranche.min,
          tranche.max - tranche.min
        );
        const impotTranche = montantTrancheImposable * (tranche.taux / 100);
        ifi += impotTranche;

        if (tranche.taux > 0) {
          detailTranches.push({
            tranche: `${tranche.min.toLocaleString()} - ${tranche.max === Infinity ? '+' : tranche.max.toLocaleString()} €`,
            taux: tranche.taux,
            montantImposable: Math.round(montantTrancheImposable * 100) / 100,
            impot: Math.round(impotTranche * 100) / 100
          });
        }
      }
    }

    return {
      ifi: Math.round(ifi * 100) / 100,
      detailTranches
    };
  }

  /**
   * Vérifie l'éligibilité au LEP
   * @param rfr Revenu Fiscal de Référence
   * @param parts Nombre de parts fiscales
   * @returns Booléen et plafond applicable
   */
  verifierEligibiliteLEP(
    rfr: number,
    parts: number
  ): { eligible: boolean; plafond: number; marge: number } {
    const partsArrondies = Math.floor(parts * 2) / 2;
    let plafond = this.plafondsLEP2026[partsArrondies];

    if (!plafond) {
      const dernierPlafond = this.plafondsLEP2026[4];
      const incrementParDemiPart = 5710;
      const partsSupplementaires = partsArrondies - 4;
      plafond = dernierPlafond + partsSupplementaires * incrementParDemiPart;
    }

    const eligible = rfr <= plafond;
    const marge = plafond - rfr;

    return { eligible, plafond, marge };
  }

  /**
   * Calcule les cotisations sociales pour un salarié
   * @param salaireBrut Salaire brut annuel
   * @returns Cotisations et salaire net
   */
  calculerCotisationsSalarie(salaireBrut: number): {
    cotisationsSalariales: number;
    salaireNet: number;
  } {
    const tauxTotal = this.cotisationsSociales2026.salarie.total / 100;
    const cotisationsSalariales = Math.round(salaireBrut * tauxTotal * 100) / 100;
    const salaireNet = Math.round((salaireBrut - cotisationsSalariales) * 100) / 100;

    return { cotisationsSalariales, salaireNet };
  }

  /**
   * Calcule les cotisations pour un micro-entrepreneur
   * @param chiffreAffaires Chiffre d'affaires annuel
   * @param activite Type d'activité
   * @returns Cotisations et revenu net
   */
  calculerCotisationsMicroEntrepreneur(
    chiffreAffaires: number,
    activite: 'vente' | 'prestationServiceBIC' | 'prestationServiceBNC' | 'liberal'
  ): { cotisations: number; revenuNet: number } {
    const taux = this.cotisationsSociales2026.microEntrepreneur[activite] / 100;
    const cotisations = Math.round(chiffreAffaires * taux * 100) / 100;
    const revenuNet = Math.round((chiffreAffaires - cotisations) * 100) / 100;

    return { cotisations, revenuNet };
  }

  /**
   * Retourne le barème IR en cours
   */
  getBaremeIR(): TrancheFiscale[] {
    return this.baremeIR2026;
  }

  /**
   * Retourne le barème IFI en cours
   */
  getBaremeIFI(): TrancheFiscale[] {
    return this.baremeIFI2026;
  }

  /**
   * Retourne les plafonds LEP
   */
  getPlafondsLEP(): { [parts: number]: number } {
    return this.plafondsLEP2026;
  }
}
