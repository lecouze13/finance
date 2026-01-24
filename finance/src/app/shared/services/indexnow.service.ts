import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';

export interface IndexNowConfig {
  host: string;
  key: string;
  keyLocation?: string;
}

export interface IndexNowResponse {
  success: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class IndexNowService {
  private readonly config: IndexNowConfig = {
    host: 'calculateurfinance.fr',
    key: 'c8f4e2a1b9d6f3e0a7c5b8d9e1f2a3b4', // Clé unique pour le site
    keyLocation: 'https://calculateurfinance.fr/c8f4e2a1b9d6f3e0a7c5b8d9e1f2a3b4.txt'
  };

  private readonly indexNowEndpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
    'https://yandex.com/indexnow'
  ];

  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /**
   * Notifie les moteurs de recherche d'une nouvelle URL ou d'une mise à jour
   */
  submitUrl(url: string): Observable<IndexNowResponse> {
    if (!this.isBrowser) {
      return of({ success: false, message: 'Server-side rendering' });
    }

    const fullUrl = url.startsWith('http') ? url : `https://${this.config.host}${url}`;

    const params = {
      url: fullUrl,
      key: this.config.key
    };

    // On utilise l'endpoint principal IndexNow (il propage aux autres)
    return this.http.get<any>(this.indexNowEndpoints[0], { params }).pipe(
      catchError(error => {
        // IndexNow retourne souvent 200 sans corps, donc on considère que c'est un succès
        // sauf si c'est une vraie erreur
        if (error.status === 200 || error.status === 202) {
          return of({ success: true });
        }
        console.warn('IndexNow submission failed:', error);
        return of({ success: false, message: error.message });
      })
    );
  }

  /**
   * Notifie les moteurs de recherche de plusieurs URLs
   */
  submitUrls(urls: string[]): Observable<IndexNowResponse> {
    if (!this.isBrowser || urls.length === 0) {
      return of({ success: false, message: 'No URLs to submit' });
    }

    const fullUrls = urls.map(url =>
      url.startsWith('http') ? url : `https://${this.config.host}${url}`
    );

    const body = {
      host: this.config.host,
      key: this.config.key,
      keyLocation: this.config.keyLocation,
      urlList: fullUrls
    };

    return this.http.post<any>(this.indexNowEndpoints[0], body).pipe(
      catchError(error => {
        if (error.status === 200 || error.status === 202) {
          return of({ success: true });
        }
        console.warn('IndexNow batch submission failed:', error);
        return of({ success: false, message: error.message });
      })
    );
  }

  /**
   * Soumet toutes les pages principales du site
   */
  submitAllPages(): Observable<IndexNowResponse> {
    const mainPages = [
      '/',
      '/catalogue',
      '/simulateur-capacite-emprunt',
      '/simulateur-pret-immobilier',
      '/simulateur-frais-notaire',
      '/simulateur-rendement-locatif',
      '/simulateur-cashflow-immobilier',
      '/simulateur-per',
      '/simulateur-impot-revenu',
      '/simulateur-brut-net',
      '/simulateur-interet-compose',
      '/simulateur-retraite',
      '/comparateur-lmnp-lmp',
      '/comparateur-sci-ir-is',
      '/comparateur-pea-assurance-vie',
      '/a-propos',
      '/contact',
      '/methodologie'
    ];

    return this.submitUrls(mainPages);
  }

  /**
   * Retourne la clé pour vérification
   */
  getKey(): string {
    return this.config.key;
  }
}
