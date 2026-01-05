import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private title: Title, private meta: Meta, @Inject(DOCUMENT) private document: Document) { }

  updateMetaData(options: {
    title: string;
    description: string;
    url: string;
    image?: string;
    robots?: string;
    keywords?: string;  // Ajouté ici
}): void {
  this.title.setTitle(options.title);

  this.meta.updateTag({ name: 'description', content: options.description });

  this.meta.updateTag({
    name: 'robots',
    content: options.robots || 'index, follow'
  });

  if (options.keywords) {
    this.meta.updateTag({ name: 'keywords', content: options.keywords });
  }


    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: options.title });
    this.meta.updateTag({ property: 'og:description', content: options.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: options.url });
    this.meta.updateTag({ property: 'og:image', content: options.image || 'https://calculateurfinance.fr/assets/logo.png' });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:locale', content: 'fr_FR' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Calculateur Finance' });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: options.title });
    this.meta.updateTag({ name: 'twitter:description', content: options.description });
    this.meta.updateTag({ name: 'twitter:image', content: options.image || 'https://calculateurfinance.fr/assets/logo.png' });

    this.setCanonicalUrl(options.url)

  }

setCanonicalUrl(url: string) {
  let link: HTMLLinkElement =
    this.document.querySelector(`link[rel='canonical']`) || this.document.createElement('link');
  link.setAttribute('rel', 'canonical');

  // Nettoyer l'URL et ajouter un slash final s'il n'existe pas déjà
  const cleanUrl = url.endsWith('/') ? url : url + '/';

  link.setAttribute('href', cleanUrl);

  if (!link.parentNode) {
    this.document.head.appendChild(link);
  }
}

}
