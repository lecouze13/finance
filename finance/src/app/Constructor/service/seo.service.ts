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
  }): void {
    this.title.setTitle(options.title);

    this.meta.updateTag({ name: 'description', content: options.description });

    this.meta.updateTag({
      name: 'robots',
      content: options.robots || 'index, follow'
    });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: options.title });
    this.meta.updateTag({ property: 'og:description', content: options.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: options.url });
    // this.meta.updateTag({ property: 'og:image', content: options.image || '/assets/default-og-image.png' });
    this.setCanonicalUrl(options.url)

  }

  setCanonicalUrl(url?: string) {
    let link: HTMLLinkElement = this.document.querySelector(`link[rel='canonical']`) || this.document.createElement('link');
    link.setAttribute('rel', 'canonical');

    const cleanUrl = (url || this.document.location.href).replace(/\/+$/, ''); // sans slash final
    link.setAttribute('href', cleanUrl);

    if (!link.parentNode) {
      this.document.head.appendChild(link);
    }
  }
}
