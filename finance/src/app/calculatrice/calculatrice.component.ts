import { Component, HostListener } from '@angular/core';
import { evaluate } from 'mathjs';

@Component({
  selector: 'app-calculatrice',
  standalone: true,
  imports: [],
  templateUrl: './calculatrice.component.html',
  styleUrl: './calculatrice.component.scss'
})
export class CalculatriceComponent {

  ecran: string = '';
  erreur: string = 'Erreur'

  @HostListener('window:keydown', ['$event'])
  gererToucheClavier(event: KeyboardEvent) {
    const touche = event.key;

    // Gérer les chiffres, opérateurs et point
    if (/^[0-9+\-*/.%]$/.test(touche)) {
      this.appuyerTouche(touche);
    }

    // Entrée = égal
    else if (touche === 'Enter') {
      this.appuyerTouche('=');
      event.preventDefault();
    }

    // Backspace = effacer un caractère
    else if (touche === 'Backspace') {
      this.appuyerTouche('⌫');
      event.preventDefault();
    }

    // Escape = reset
    else if (touche === 'Escape') {
      this.appuyerTouche('C');
    }
  }
  appuyerTouche(valeur: string) {
    if (valeur === 'C') {
      this.ecran = '';
    } else if (valeur === '⌫') {
      if (this.ecran == this.erreur) {
        this.ecran = ""
      }
      else {
        this.ecran = this.ecran.slice(0, -1);

      }
    } else if (valeur === '=') {
      try {
        this.ecran = evaluate(this.ecran.replace('%', '/100')).toString();
      } catch (error) {
        this.ecran = 'Erreur';
      }
    } else {
      this.ecran += valeur;
    }
  }
}


