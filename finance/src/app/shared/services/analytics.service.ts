import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private router: Router) {}

  init(): void {
    this.trackPageViews();
  }

  private trackPageViews(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.trackPageView(event.urlAfterRedirects);
    });
  }

  trackPageView(url: string): void {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        page_path: url
      });
    }
  }

  trackFormSubmission(formName: string, formData?: Record<string, any>): void {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'form_submit', {
        event_category: 'engagement',
        event_label: formName,
        form_name: formName,
        ...formData
      });
    }
  }

  trackButtonClick(buttonName: string, category: string = 'engagement'): void {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        event_category: category,
        event_label: buttonName,
        button_name: buttonName
      });
    }
  }

  trackCalculation(calculatorName: string, result?: any): void {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'calculate', {
        event_category: 'calculator',
        event_label: calculatorName,
        calculator_name: calculatorName,
        ...(result && { calculation_result: JSON.stringify(result) })
      });
    }
  }

  trackEvent(eventName: string, params?: Record<string, any>): void {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, params);
    }
  }
}
