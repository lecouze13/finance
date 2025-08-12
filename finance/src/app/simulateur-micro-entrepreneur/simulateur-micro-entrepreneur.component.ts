
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { SeoService } from '../Constructor/service/seo.service';

@Component({
  selector: 'app-simulateur-micro',
  templateUrl: './simulateur-micro-entrepreneur.component.html',
})
export class SimulateurMicroEntrepreneurComponent implements OnInit {
  form: FormGroup;
  activites = [
    { label: 'Vente de marchandises (BIC - Vente)', value: 'vente' },
    { label: 'Prestations de service (BIC)', value: 'prestation' },
    { label: 'Professions libérales (BNC)', value: 'liberal' }
  ];

  abattements: { [key: string]: number } = {
    vente: 71,
    prestation: 50,
    liberal: 34
  };

  resultat: any = null;
  private jsonLdScript?: HTMLScriptElement;

  constructor(@Inject(PLATFORM_ID) private platformId: any,
    private renderer: Renderer2, private seo: SeoService, private fb: FormBuilder) {
    this.form = this.fb.group({
      chiffreAffaires: [0, [Validators.required, Validators.min(0)]],
      activite: ['prestation', Validators.required],
      versementLiberatoire: [false],
      tauxVersement: [0],
      tauxSocial: [22.0],
    });

    this.form.get('activite')?.valueChanges.subscribe(() => this.updateTaux());
    this.form.get('versementLiberatoire')?.valueChanges.subscribe(() => this.updateTaux());

    this.updateTaux();
  }
  ngOnInit(): void {
    // SEO
    this.seo.updateMetaData({
      title: 'Simulateur micro-entrepreneur / freelance | CalculateurFinance.fr',
      description: 'Convertissez votre chiffre d\'affaires en revenu net après cotisations sociales et impôts (modèle micro).',
      url: 'https://calculateurfinance.fr/simulateur-micro-entrepreneur/',
      keywords: "simulateur micro-entrepreneur, calcul revenu net auto-entrepreneur, charges sociales micro entreprise, versement libératoire, taux cotisations micro, impôt micro-entreprise, régime micro fiscal, calcul auto entrepreneur, charges et impôts micro entreprise, simulateur chiffre d'affaires micro",

    });

    if (isPlatformBrowser(this.platformId)) {
      if (!document.getElementById('jsonld-micro-faq')) {
        this.jsonLdScript = this.renderer.createElement('script');
        if (this.jsonLdScript) {

          this.jsonLdScript.type = 'application/ld+json';
          this.jsonLdScript.id = 'jsonld-micro-faq';
          this.jsonLdScript.text = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Qu'est-ce que le régime micro-entrepreneur ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Régime simplifié d'imposition avec abattement forfaitaire pour le calcul de la base imposable et cotisations sociales proportionnelles au chiffre d'affaires."
                }
              },
              {
                "@type": "Question",
                "name": "Qu'est-ce que le versement libératoire ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Option permettant de régler l'impôt sur le revenu en pourcentage du chiffre d'affaires (en lieu et place du calcul via le barème)."
                }
              },
              {
                "@type": "Question",
                "name": "Comment est calculé le revenu net ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Le revenu net correspond au chiffre d'affaires diminué des cotisations sociales et de l'impôt (versement libératoire ou estimation via TMI)."
                }
              },
              {
                "@type": "Question",
                "name": "Quel est le taux de cotisations sociales en micro-entreprise ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Il dépend de l'activité exercée : environ 12,3 % pour les ventes, 21,2 % pour les prestations de services artisanales et commerciales, et 21,1 % pour les professions libérales relevant de la CIPAV."
                }
              },
              {
                "@type": "Question",
                "name": "Quels sont les taux du versement libératoire ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "1 % pour la vente de marchandises, 1,7 % pour les prestations de services commerciales et artisanales, et 2,2 % pour les professions libérales."
                }
              },
              {
                "@type": "Question",
                "name": "Puis-je bénéficier du versement libératoire ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Oui, si votre revenu fiscal de référence ne dépasse pas un certain plafond et si vous en faites la demande auprès de l'Urssaf."
                }
              },
              {
                "@type": "Question",
                "name": "Quelle différence entre chiffre d'affaires et revenu net ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Le chiffre d'affaires est le total facturé à vos clients, tandis que le revenu net est ce qui reste après déduction des cotisations sociales et de l'impôt."
                }
              },
              {
                "@type": "Question",
                "name": "Dois-je payer la TVA en micro-entreprise ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "En dessous des seuils de franchise en base, vous ne facturez pas la TVA. Au-delà, vous devez l'appliquer et la reverser."
                }
              },
              {
                "@type": "Question",
                "name": "Le simulateur prend-il en compte le TMI ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Oui, si vous n'optez pas pour le versement libératoire, l'impôt est estimé en fonction de votre tranche marginale d'imposition (TMI)."
                }
              },
              {
                "@type": "Question",
                "name": "Le calcul est-il fiable ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Le simulateur fournit une estimation basée sur les taux en vigueur, mais le résultat peut varier en fonction de votre situation fiscale globale."
                }
              }
            ]
          });
        }
        this.renderer.appendChild(document.head, this.jsonLdScript);
      }
    }

    Object.keys(this.abattements).forEach(k => { if (this.form.controls['activite'].value === k) { } });
  }
  updateTaux() {
    const activite = this.form.value.activite;
    const versementLiberatoire = this.form.value.versementLiberatoire;

    if (versementLiberatoire) {
      switch (activite) {
        case 'vente':
          this.form.patchValue({ tauxVersement: 1.0, tauxSocial: 12.3 });
          break;
        case 'prestation':
          this.form.patchValue({ tauxVersement: 1.7, tauxSocial: 22.0 });
          break;
        case 'liberale':
          this.form.patchValue({ tauxVersement: 2.2, tauxSocial: 22.2 });
          break;
      }
    } else {
      switch (activite) {
        case 'vente':
          this.form.patchValue({ tauxVersement: 0, tauxSocial: 12.3 });
          break;
        case 'prestation':
          this.form.patchValue({ tauxVersement: 0, tauxSocial: 22.0 });
          break;
        case 'liberale':
          this.form.patchValue({ tauxVersement: 0, tauxSocial: 22.2 });
          break;
      }
    }
  }

  calculer() {
    const ca = this.form.value.chiffreAffaires;
    const tauxSocial = this.form.value.tauxSocial;
    const tauxVersement = this.form.value.tauxVersement;
    const versementLiberatoire = this.form.value.versementLiberatoire;

    const cotisations = (ca * tauxSocial) / 100;

    let impot = 0;
    if (versementLiberatoire) {
      impot = (ca * tauxVersement) / 100;
    } else {
      const abattement = this.getAbattement();
      const revenuImposable = Math.max(0, ca - (ca * abattement) / 100);
      impot = this.calculIR(revenuImposable);
    }

    const net = ca - cotisations - impot;
    const brut = ca - cotisations
    this.resultat = {
      ca,
      cotisations,
      impot,
      net,
      brut
    };
  }

  getAbattement(): number {
    switch (this.form.value.activite) {
      case 'vente': return 71;
      case 'prestation': return 50;
      case 'liberale': return 34;
      default: return 0;
    }
  }

  calculIR(revenu: number): number {
    const tranches = [
      { plafond: 11294, taux: 0 },
      { plafond: 28797, taux: 0.11 },
      { plafond: 82341, taux: 0.30 },
      { plafond: 177106, taux: 0.41 },
      { plafond: Infinity, taux: 0.45 }
    ];

    let restant = revenu;
    let precedentPlafond = 0;
    let impot = 0;

    for (const tranche of tranches) {
      if (revenu > tranche.plafond) {
        impot += (tranche.plafond - precedentPlafond) * tranche.taux;
        precedentPlafond = tranche.plafond;
      } else {
        impot += (revenu - precedentPlafond) * tranche.taux;
        break;
      }
    }
    return Math.max(0, impot);
  }
}
