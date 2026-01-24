import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

export interface UrlStateConfig {
  [key: string]: {
    type: 'number' | 'string' | 'boolean';
    default?: any;
  };
}

@Injectable({
  providedIn: 'root'
})
export class UrlStateService {
  private isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /**
   * Lit les paramètres depuis l'URL et les retourne typés
   */
  getStateFromUrl<T extends Record<string, any>>(
    route: ActivatedRoute,
    config: UrlStateConfig
  ): Partial<T> {
    const state: Partial<T> = {};
    const params = route.snapshot.queryParams;

    for (const [key, conf] of Object.entries(config)) {
      const value = params[key];
      if (value !== undefined && value !== null && value !== '') {
        switch (conf.type) {
          case 'number':
            const num = parseFloat(value);
            if (!isNaN(num)) {
              (state as any)[key] = num;
            }
            break;
          case 'boolean':
            (state as any)[key] = value === 'true' || value === '1';
            break;
          case 'string':
          default:
            (state as any)[key] = value;
            break;
        }
      }
    }

    return state;
  }

  /**
   * Met à jour l'URL avec les nouveaux paramètres (sans recharger la page)
   */
  updateUrl(state: Record<string, any>, config: UrlStateConfig): void {
    if (!this.isBrowser) return;

    // Vérifier si au moins une valeur est différente de la valeur par défaut
    let hasNonDefaultValue = false;
    for (const [key, conf] of Object.entries(config)) {
      if (state[key] !== conf.default) {
        hasNonDefaultValue = true;
        break;
      }
    }

    // Si toutes les valeurs sont par défaut, vider les query params
    if (!hasNonDefaultValue) {
      const url = new URL(window.location.href);
      if (url.search) {
        window.history.replaceState({}, '', url.pathname);
      }
      return;
    }

    // Construire les nouveaux paramètres (seulement ceux différents des défauts)
    const queryParams: Record<string, string | null> = {};

    for (const [key, conf] of Object.entries(config)) {
      const value = state[key];
      if (value !== undefined && value !== null && value !== conf.default) {
        queryParams[key] = String(value);
      } else {
        // Mettre explicitement null pour supprimer les anciens paramètres
        queryParams[key] = null;
      }
    }

    this.router.navigate([], {
      queryParams,
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  /**
   * Génère une URL de partage avec tous les paramètres (même les valeurs par défaut)
   */
  generateShareUrl(state: Record<string, any>, config: UrlStateConfig): string {
    if (!this.isBrowser) return '';

    const url = new URL(window.location.href);
    url.search = ''; // Clear existing params

    // Inclure TOUS les paramètres dans l'URL de partage
    for (const [key] of Object.entries(config)) {
      const value = state[key];
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    }

    return url.toString();
  }

  /**
   * Copie l'URL de partage dans le presse-papier
   */
  async copyShareUrl(state: Record<string, any>, config: UrlStateConfig): Promise<boolean> {
    if (!this.isBrowser) return false;

    const shareUrl = this.generateShareUrl(state, config);

    try {
      await navigator.clipboard.writeText(shareUrl);
      return true;
    } catch (err) {
      // Fallback pour les navigateurs plus anciens
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return true;
      } catch (e) {
        document.body.removeChild(textArea);
        return false;
      }
    }
  }

  /**
   * Partage via l'API Web Share (mobile)
   */
  async shareViaWebShare(
    state: Record<string, any>,
    config: UrlStateConfig,
    title: string,
    text?: string
  ): Promise<boolean> {
    if (!this.isBrowser) return false;

    const shareUrl = this.generateShareUrl(state, config);

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: text || title,
          url: shareUrl
        });
        return true;
      } catch (err) {
        // User cancelled or error
        return false;
      }
    }

    // Fallback: copy to clipboard
    return this.copyShareUrl(state, config);
  }

  /**
   * Vérifie si l'API Web Share est disponible
   */
  canShare(): boolean {
    return this.isBrowser && !!navigator.share;
  }
}
