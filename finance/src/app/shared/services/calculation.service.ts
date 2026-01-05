import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor() { }

  /**
   * Calcule les intérêts composés
   * @param capital Capital initial
   * @param versementMensuel Versement mensuel
   * @param tauxAnnuel Taux d'intérêt annuel (en %)
   * @param dureeAnnees Durée en années
   * @returns Objet avec capitalFinal, interetsGeneres et versementsTotaux
   */
  calculerInteretsComposes(
    capital: number,
    versementMensuel: number,
    tauxAnnuel: number,
    dureeAnnees: number
  ): { capitalFinal: number; interetsGeneres: number; versementsTotaux: number } {
    const tauxMensuel = tauxAnnuel / 100 / 12;
    const nombreMois = dureeAnnees * 12;

    let capitalFinal = capital;

    for (let i = 0; i < nombreMois; i++) {
      capitalFinal = capitalFinal * (1 + tauxMensuel) + versementMensuel;
    }

    const versementsTotaux = capital + versementMensuel * nombreMois;
    const interetsGeneres = capitalFinal - versementsTotaux;

    return {
      capitalFinal: Math.round(capitalFinal * 100) / 100,
      interetsGeneres: Math.round(interetsGeneres * 100) / 100,
      versementsTotaux: Math.round(versementsTotaux * 100) / 100
    };
  }

  /**
   * Calcule une mensualité de crédit (formule standard)
   * @param montant Montant emprunté
   * @param tauxAnnuel Taux annuel (en %)
   * @param dureeAnnees Durée en années
   * @returns Mensualité
   */
  calculerMensualiteCredit(
    montant: number,
    tauxAnnuel: number,
    dureeAnnees: number
  ): number {
    if (tauxAnnuel === 0) {
      return montant / (dureeAnnees * 12);
    }

    const tauxMensuel = tauxAnnuel / 100 / 12;
    const nombreMois = dureeAnnees * 12;
    const mensualite =
      (montant * tauxMensuel) / (1 - Math.pow(1 + tauxMensuel, -nombreMois));

    return Math.round(mensualite * 100) / 100;
  }

  /**
   * Calcule le coût total d'un crédit
   * @param montant Montant emprunté
   * @param tauxAnnuel Taux annuel (en %)
   * @param dureeAnnees Durée en années
   * @returns Objet avec mensualite, coutTotal et interetsTotaux
   */
  calculerCoutCredit(
    montant: number,
    tauxAnnuel: number,
    dureeAnnees: number
  ): { mensualite: number; coutTotal: number; interetsTotaux: number } {
    const mensualite = this.calculerMensualiteCredit(montant, tauxAnnuel, dureeAnnees);
    const coutTotal = mensualite * dureeAnnees * 12;
    const interetsTotaux = coutTotal - montant;

    return {
      mensualite: Math.round(mensualite * 100) / 100,
      coutTotal: Math.round(coutTotal * 100) / 100,
      interetsTotaux: Math.round(interetsTotaux * 100) / 100
    };
  }

  /**
   * Calcule un pourcentage
   * @param valeur Valeur
   * @param pourcentage Pourcentage (en %)
   * @returns Résultat
   */
  calculerPourcentage(valeur: number, pourcentage: number): number {
    return Math.round((valeur * pourcentage / 100) * 100) / 100;
  }

  /**
   * Calcule le rendement locatif brut
   * @param loyerAnnuel Loyer annuel
   * @param prixAchat Prix d'achat
   * @returns Rendement en %
   */
  calculerRendementBrut(loyerAnnuel: number, prixAchat: number): number {
    if (prixAchat === 0) return 0;
    return Math.round((loyerAnnuel / prixAchat * 100) * 100) / 100;
  }

  /**
   * Calcule le rendement locatif net
   * @param loyerAnnuel Loyer annuel
   * @param charges Charges annuelles
   * @param prixAchat Prix d'achat
   * @returns Rendement net en %
   */
  calculerRendementNet(
    loyerAnnuel: number,
    charges: number,
    prixAchat: number
  ): number {
    if (prixAchat === 0) return 0;
    return Math.round(((loyerAnnuel - charges) / prixAchat * 100) * 100) / 100;
  }

  /**
   * Arrondit un nombre à 2 décimales
   * @param valeur Valeur à arrondir
   * @returns Valeur arrondie
   */
  arrondir(valeur: number): number {
    return Math.round(valeur * 100) / 100;
  }

  /**
   * Formate un nombre en devise EUR
   * @param valeur Valeur à formater
   * @returns String formatée
   */
  formaterDevise(valeur: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(valeur);
  }

  /**
   * Formate un nombre en pourcentage
   * @param valeur Valeur à formater
   * @param decimales Nombre de décimales
   * @returns String formatée
   */
  formaterPourcentage(valeur: number, decimales: number = 2): string {
    return valeur.toFixed(decimales) + ' %';
  }
}
