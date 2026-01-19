import { Directive, HostListener, ElementRef } from '@angular/core';

/**
 * Directive pour autoriser le collage dans les champs de saisie PrimeNG.
 * PrimeNG InputNumber bloque le collage par défaut, ce qui nuit à l'accessibilité
 * et empêche l'utilisation de gestionnaires de mots de passe.
 */
@Directive({
  selector: '[appAllowPaste]',
  standalone: true
})
export class AllowPasteDirective {
  constructor(private el: ElementRef) {}

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    // Permettre le collage sans bloquer l'événement
    const pastedText = event.clipboardData?.getData('text');
    if (pastedText) {
      // Le texte collé sera traité normalement
      return;
    }
  }
}
