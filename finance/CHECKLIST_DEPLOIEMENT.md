# ✅ Checklist de Déploiement - CalculateurFinance.fr

Dernière mise à jour : 5 janvier 2026

---

## 🔍 1. VÉRIFICATIONS PRÉ-DÉPLOIEMENT

### Code & Build
- [ ] Compiler le projet : `ng build --configuration production`
- [ ] Vérifier qu'il n'y a pas d'erreurs TypeScript
- [ ] Vérifier qu'il n'y a pas d'erreurs de lint
- [ ] Tester le build SSR : `npm run serve:ssr:finance`

### Tests fonctionnels
- [ ] Tester le simulateur APL (nouveau)
- [ ] Tester 3-5 simulateurs existants aléatoirement
- [ ] Vérifier que les FAQ s'affichent correctement
- [ ] Vérifier que les formulaires fonctionnent
- [ ] Vérifier que les résultats s'affichent

### Responsive Mobile
- [ ] Tester sur mobile (simulateur ou DevTools)
- [ ] Vérifier que les boutons sont cliquables (44x44px minimum)
- [ ] Vérifier que les formulaires ne débordent pas
- [ ] Vérifier que les résultats sont lisibles
- [ ] Tester le menu hamburger

---

## 🔎 2. VÉRIFICATIONS SEO

### Meta tags
- [ ] Ouvrir 3-5 pages et inspecter le `<head>`
- [ ] Vérifier présence de `og:image`, `og:description`, `og:url`
- [ ] Vérifier présence de `twitter:card`
- [ ] Vérifier la balise `<link rel="canonical">`

### Structured Data
- [ ] Aller sur une page avec FAQ
- [ ] Ouvrir DevTools → Elements → `<head>`
- [ ] Chercher `<script type="application/ld+json">`
- [ ] Copier le JSON et le valider sur [Schema.org Validator](https://validator.schema.org/)

### Sitemap
- [ ] Vérifier que `/sitemap.xml` est accessible
- [ ] Vérifier qu'il contient toutes les routes
- [ ] Vérifier que les dates sont à jour (2026-01-05)
- [ ] Valider sur [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)

### Robots.txt
- [ ] Vérifier que `/robots.txt` est accessible
- [ ] Vérifier qu'il autorise les crawlers
- [ ] Vérifier qu'il pointe vers le sitemap

---

## 🚀 3. DÉPLOIEMENT

### Sur Netlify (déjà configuré)

#### Build Settings
Vérifier dans `netlify.toml` :
```toml
[build]
  command = "npm run build:ssr"
  publish = "dist/finance/browser"
  functions = "dist/finance/server"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Déploiement
```bash
# Option 1 : Git Push (recommandé)
git add .
git commit -m "feat: ajout simulateur APL + améliorations SEO et mobile"
git push origin main

# Option 2 : Netlify CLI
netlify deploy --prod
```

#### Après déploiement
- [ ] Vérifier que le site est accessible sur `https://calculateurfinance.fr`
- [ ] Vérifier que HTTPS fonctionne (cadenas vert)
- [ ] Tester le nouveau simulateur APL en production
- [ ] Vérifier le temps de chargement (< 3 secondes)

---

## 📊 4. CONFIGURATION ANALYTICS & SEO

### Google Search Console
- [ ] Ajouter le site si pas encore fait : [Search Console](https://search.google.com/search-console)
- [ ] Soumettre le sitemap : `https://calculateurfinance.fr/sitemap.xml`
- [ ] Demander l'indexation de 5 nouvelles pages :
  - `/simulateur-apl/`
  - 4 autres simulateurs mis à jour

### Google Analytics 4
- [ ] Créer une propriété GA4 si pas encore fait
- [ ] Installer le tag dans `index.html` ou via Google Tag Manager
- [ ] Tester que les événements se déclenchent :
  - Page vue
  - Soumission formulaire
  - Clic bouton "Calculer"

### Vérifier les Core Web Vitals
- [ ] Tester sur [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Score Mobile : cible > 80
- [ ] Score Desktop : cible > 90
- [ ] LCP (Largest Contentful Paint) : < 2.5s
- [ ] FID (First Input Delay) : < 100ms
- [ ] CLS (Cumulative Layout Shift) : < 0.1

---

## 🔧 5. POST-DÉPLOIEMENT

### Monitoring (J+1)
- [ ] Vérifier Google Search Console (erreurs d'exploration)
- [ ] Vérifier Google Analytics (trafic)
- [ ] Vérifier les logs Netlify (erreurs)
- [ ] Tester 5 pages aléatoires

### SEO (J+7)
- [ ] Vérifier l'indexation : `site:calculateurfinance.fr` sur Google
- [ ] Vérifier que le nouveau simulateur APL est indexé
- [ ] Vérifier les rich snippets (FAQ) dans les résultats Google

### Performance (J+14)
- [ ] Analyser les pages les plus visitées (GA4)
- [ ] Identifier les simulateurs populaires
- [ ] Vérifier le taux de rebond par page
- [ ] Analyser le temps passé sur les simulateurs

---

## 🐛 6. TROUBLESHOOTING

### Si le build échoue
```bash
# Nettoyer les caches
rm -rf node_modules dist .angular
npm install
ng build --configuration production
```

### Si le SSR ne fonctionne pas
```bash
# Vérifier la version d'Angular
ng version

# Rebuilder avec SSR
npm run build:ssr
npm run serve:ssr:finance
```

### Si le sitemap n'est pas accessible
Vérifier dans `angular.json` :
```json
"assets": [
  "src/sitemap.xml",
  "src/robots.txt"
]
```

### Si les Open Graph ne s'affichent pas
Tester avec :
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

---

## 📝 7. DOCUMENTATION

### Fichiers créés
- [x] `AMELIORATIONS.md` - Rapport complet des améliorations
- [x] `GUIDE_COMPOSANTS_GENERIQUES.md` - Guide d'utilisation
- [x] `ROADMAP_SIMULATEURS.md` - Planning 20 nouveaux simulateurs
- [x] `CHECKLIST_DEPLOIEMENT.md` - Ce fichier

### Documentation à lire
Pour ajouter un nouveau simulateur, suivre :
1. `GUIDE_COMPOSANTS_GENERIQUES.md` (section 4)
2. Utiliser les composants :
   - `FaqSectionComponent`
   - `CalculationService`
   - `TaxBracketService`

---

## ✅ 8. VALIDATION FINALE

### Avant de déclarer le projet terminé
- [ ] Tous les tests passent ✅
- [ ] Build production réussit ✅
- [ ] Site déployé et accessible ✅
- [ ] SEO vérifié (meta, OG, JSON-LD) ✅
- [ ] Mobile responsive testé ✅
- [ ] Google Search Console configuré
- [ ] Google Analytics configuré
- [ ] Documentation complète ✅

---

## 🎉 DÉPLOIEMENT RÉUSSI !

Une fois tous les points cochés, le projet est prêt pour la production.

### Prochaines étapes
1. Suivre la roadmap dans `ROADMAP_SIMULATEURS.md`
2. Implémenter 3-4 nouveaux simulateurs par mois
3. Analyser les performances SEO mensuellement
4. Mettre à jour les barèmes fiscaux en janvier chaque année

---

## 📞 Contacts & Ressources

### Outils SEO
- Google Search Console : [search.google.com/search-console](https://search.google.com/search-console)
- Google Analytics : [analytics.google.com](https://analytics.google.com)
- Schema Validator : [validator.schema.org](https://validator.schema.org)
- PageSpeed Insights : [pagespeed.web.dev](https://pagespeed.web.dev)

### Documentation technique
- Angular : [angular.dev](https://angular.dev)
- PrimeNG : [primeng.org](https://primeng.org)
- Netlify : [docs.netlify.com](https://docs.netlify.com)

---

**Checklist créée le 5 janvier 2026**
**Projet : CalculateurFinance.fr**
**Version : 2.0 - Améliorations SEO + Mobile + Composants génériques**
