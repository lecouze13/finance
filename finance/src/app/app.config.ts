import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations'; // Ceci devrait fonctionner maintenant


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withEnabledBlockingInitialNavigation())
, provideAnimations()]
};

