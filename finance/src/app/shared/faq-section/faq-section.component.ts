import { Component, Input, OnInit, Inject, PLATFORM_ID, Renderer2, OnDestroy } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';

export interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq-section.component.html'
})
export class FaqSectionComponent implements OnInit, OnDestroy {
  @Input() title: string = 'FAQ';
  @Input() faqItems: FaqItem[] = [];
  @Input() ariaLabel: string = 'Foire aux questions';

  private scriptElement: HTMLScriptElement | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    // Génération du JSON-LD pour SEO - fonctionne côté serveur ET client
    if (this.faqItems.length > 0) {
      this.injectFaqJsonLd();
    }
  }

  ngOnDestroy(): void {
    // Nettoyage du script lors de la destruction du composant (navigation SPA)
    if (this.scriptElement && isPlatformBrowser(this.platformId)) {
      this.scriptElement.remove();
    }
  }

  private injectFaqJsonLd(): void {
    // Supprimer l'ancien script FAQ s'il existe
    const existingScript = this.document.querySelector('script[data-schema="faq"]');
    if (existingScript) {
      existingScript.remove();
    }

    const faqJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: this.faqItems.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    };

    this.scriptElement = this.renderer.createElement('script');
    this.scriptElement!.type = 'application/ld+json';
    this.scriptElement!.setAttribute('data-schema', 'faq');
    this.scriptElement!.text = JSON.stringify(faqJsonLd);
    this.renderer.appendChild(this.document.head, this.scriptElement);
  }
}
