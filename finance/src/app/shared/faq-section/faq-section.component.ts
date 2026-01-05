import { Component, Input, OnInit, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

export interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq-section.component.html',
  styleUrl: './faq-section.component.scss'
})
export class FaqSectionComponent implements OnInit {
  @Input() title: string = 'FAQ';
  @Input() faqItems: FaqItem[] = [];
  @Input() ariaLabel: string = 'Foire aux questions';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    // Génération automatique du JSON-LD pour SEO
    if (isPlatformBrowser(this.platformId) && this.faqItems.length > 0) {
      this.injectFaqJsonLd();
    }
  }

  private injectFaqJsonLd(): void {
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

    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqJsonLd);
    this.renderer.appendChild(document.head, script);
  }
}
