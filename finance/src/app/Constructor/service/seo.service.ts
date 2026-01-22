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
    keywords?: string;
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

  const cleanUrl = url.endsWith('/') ? url : url + '/';

  link.setAttribute('href', cleanUrl);

  if (!link.parentNode) {
    this.document.head.appendChild(link);
  }
}

/**
 * Ajoute les données structurées SoftwareApplication pour les simulateurs
 * Schema.org type: SoftwareApplication (WebApplication)
 * Avantage SEO: Rich snippets dans les résultats de recherche
 */
addSoftwareApplicationSchema(options: {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
  aggregateRating?: {
    ratingValue: number;
    ratingCount: number;
  };
  featureList?: string[];
}): void {
  const existingScript = this.document.querySelector('script[data-schema="software-application"]');
  if (existingScript) {
    existingScript.remove();
  }

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': options.name,
    'description': options.description,
    'url': options.url,
    'applicationCategory': options.applicationCategory || 'FinanceApplication',
    'operatingSystem': options.operatingSystem || 'Web',
    'browserRequirements': 'Requires JavaScript. Requires HTML5.',
    'softwareVersion': '1.0',
    'author': {
      '@type': 'Organization',
      'name': 'CalculateurFinance',
      'url': 'https://calculateurfinance.fr'
    },
    'provider': {
      '@type': 'Organization',
      'name': 'CalculateurFinance',
      'url': 'https://calculateurfinance.fr'
    },
    'offers': {
      '@type': 'Offer',
      'price': options.offers?.price || '0',
      'priceCurrency': options.offers?.priceCurrency || 'EUR'
    },
    'inLanguage': 'fr-FR',
    'isAccessibleForFree': true,
    'screenshot': 'https://calculateurfinance.fr/assets/logo.png'
  };

  if (options.featureList && options.featureList.length > 0) {
    schema.featureList = options.featureList.join(', ');
  }

  if (options.aggregateRating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      'ratingValue': options.aggregateRating.ratingValue,
      'ratingCount': options.aggregateRating.ratingCount,
      'bestRating': 5,
      'worstRating': 1
    };
  }

  const script = this.document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-schema', 'software-application');
  script.text = JSON.stringify(schema);
  this.document.head.appendChild(script);
}

/**
 * Ajoute les données structurées HowTo pour les simulateurs
 */
addHowToSchema(options: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  totalTime?: string;
}): void {
  const existingScript = this.document.querySelector('script[data-schema="how-to"]');
  if (existingScript) {
    existingScript.remove();
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': options.name,
    'description': options.description,
    'totalTime': options.totalTime || 'PT2M',
    'step': options.steps.map((step, index) => ({
      '@type': 'HowToStep',
      'position': index + 1,
      'name': step.name,
      'text': step.text
    }))
  };

  const script = this.document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-schema', 'how-to');
  script.text = JSON.stringify(schema);
  this.document.head.appendChild(script);
}

/**
 * Ajoute les données structurées Article pour les pages de contenu/blog
 * Schema.org type: Article
 * Avantage SEO: Rich snippets pour les articles dans Google
 */
addArticleSchema(options: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  keywords?: string[];
}): void {
  const existingScript = this.document.querySelector('script[data-schema="article"]');
  if (existingScript) {
    existingScript.remove();
  }

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': options.headline,
    'description': options.description,
    'url': options.url,
    'image': options.image || 'https://calculateurfinance.fr/assets/logo.png',
    'datePublished': options.datePublished || new Date().toISOString(),
    'dateModified': options.dateModified || new Date().toISOString(),
    'author': {
      '@type': 'Organization',
      'name': options.author || 'CalculateurFinance',
      'url': 'https://calculateurfinance.fr'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'CalculateurFinance',
      'url': 'https://calculateurfinance.fr',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://calculateurfinance.fr/assets/logo.png'
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': options.url
    },
    'inLanguage': 'fr-FR'
  };

  if (options.keywords && options.keywords.length > 0) {
    schema.keywords = options.keywords.join(', ');
  }

  const script = this.document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-schema', 'article');
  script.text = JSON.stringify(schema);
  this.document.head.appendChild(script);
}

/**
 * Ajoute les données structurées FinancialProduct pour les simulateurs de produits financiers
 * Utile pour les livrets, crédits, etc.
 */
addFinancialProductSchema(options: {
  name: string;
  description: string;
  url: string;
  category: string;
  interestRate?: string;
  provider?: string;
}): void {
  const existingScript = this.document.querySelector('script[data-schema="financial-product"]');
  if (existingScript) {
    existingScript.remove();
  }

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    'name': options.name,
    'description': options.description,
    'url': options.url,
    'category': options.category,
    'provider': {
      '@type': 'Organization',
      'name': options.provider || 'CalculateurFinance',
      'url': 'https://calculateurfinance.fr'
    }
  };

  if (options.interestRate) {
    schema.annualPercentageRate = options.interestRate;
  }

  const script = this.document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-schema', 'financial-product');
  script.text = JSON.stringify(schema);
  this.document.head.appendChild(script);
}

/**
 * Supprime tous les schemas dynamiques (utile lors de la navigation)
 */
clearDynamicSchemas(): void {
  const schemas = ['software-application', 'how-to', 'article', 'financial-product', 'faq'];
  schemas.forEach(schema => {
    const script = this.document.querySelector(`script[data-schema="${schema}"]`);
    if (script) {
      script.remove();
    }
  });
}

}
