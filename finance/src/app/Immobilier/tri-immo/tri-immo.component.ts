import { Component } from '@angular/core';
;
@Component({
  selector: 'app-tri-immo',
 templateUrl: './tri-immo.component.html',
  styleUrl: './tri-immo.component.scss'
})
export class TriImmoComponent {
  Element: string[] = ['Investissement initial', 'Revenus locatifs par an net', 'Revente du bien', 'Nombre d’années'];
  values: { [key: string]: number } = {};
  tri: number | null = null;

  // Fonction de calcul du TRI
  calculTRI() {
    const investment = this.values['Investissement initial']; // Investissement initial (flux de trésorerie négatif)
    const revenues = this.values['Revenus locatifs par an net']; // Revenus locatifs annuels
    const resale = this.values['Revente du bien']; // Revente du bien
    const years = this.values['Nombre d’années']; // Durée de l'investissement en années

    const cashFlows = [-investment]; // Flux de trésorerie initial (investissement initial, négatif)

    // Ajouter les flux de trésorerie des revenus locatifs pour chaque année
    for (let i = 1; i <= years; i++) {
      cashFlows.push(revenues); // Revenus locatifs chaque année
    }

    // Ajouter le flux de trésorerie final de la revente
    cashFlows.push(resale); // Flux de trésorerie de la revente à la fin de l'investissement

    // Calcul du TRI en utilisant une approximation numérique
    this.tri = this.calculateIRR(cashFlows); 
  }

  // Méthode de calcul du TRI (Taux de Rentabilité Interne) par approximation numérique
  calculateIRR(cashFlows: number[]): number {
    let guess = 0.1; // Estimation initiale du TRI (10%)
    const tolerance = 0.0001; // Tolérance pour l'approximation
    let iteration = 0;

    while (iteration < 1000) {
      iteration++;
      let npv = 0;
      let derivative = 0;
      
      // Calculer la VAN et sa dérivée (pour la méthode de Newton-Raphson)
      for (let t = 0; t < cashFlows.length; t++) {
        npv += cashFlows[t] / Math.pow(1 + guess, t); // VAN
        derivative -= t * cashFlows[t] / Math.pow(1 + guess, t + 1); // Dérivée de la VAN par rapport au taux
      }

      // Si la VAN est proche de zéro, on trouve le TRI
      if (Math.abs(npv) < tolerance) {
        return guess;
      }

      // Calculer un nouvel estimateur du TRI avec la méthode de Newton-Raphson
      guess = guess - npv / derivative;
    }

    // Retourner le dernier TRI calculé
    return guess;
  }
}
