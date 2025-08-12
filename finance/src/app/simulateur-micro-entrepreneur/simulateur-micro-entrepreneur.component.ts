
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

  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: any,
    private renderer: Renderer2,
    private seo: SeoService
  ) {
    this.form = this.fb.group({
      chiffreAffaires: [0, [Validators.required, Validators.min(0)]],
      activite: ['prestation', Validators.required],
      versementLiberatoire: [false],
      tauxVersement: [1.0],
      tauxSocial: [22.0],
      tmi: [11.0]
    });
  }

  ngOnInit(): void {
    // SEO
    this.seo.updateMetaData({
      title: 'Simulateur micro-entrepreneur / freelance | CalculateurFinance.fr',
      description: 'Convertissez votre chiffre d\'affaires en revenu net après cotisations sociales et impôts (modèle micro).',
      url: 'https://calculateurfinance.fr/simulateur-micro-entrepreneur/'
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
              { "@type": "Question", "name": "Qu'est-ce que le régime micro-entrepreneur ?", "acceptedAnswer": { "@type": "Answer", "text": "Régime simplifié d'imposition avec abattement forfaitaire pour le calcul de la base imposable et cotisations sociales proportionnelles au chiffre d'affaires." } },
              { "@type": "Question", "name": "Qu'est-ce que le versement libératoire ?", "acceptedAnswer": { "@type": "Answer", "text": "Option permettant de régler l'impôt sur le revenu en pourcentage du chiffre d'affaires (en lieu et place du calcul via le barème)." } },
              { "@type": "Question", "name": "Comment est calculé le revenu net ?", "acceptedAnswer": { "@type": "Answer", "text": "Le revenu net correspond au chiffre d'affaires diminué des cotisations sociales et de l'impôt (versement libératoire ou estimation via TMI)." } }
            ]
          });
        }
        this.renderer.appendChild(document.head, this.jsonLdScript);
      }
    }

    Object.keys(this.abattements).forEach(k => { if (this.form.controls['activite'].value === k) {  } });
  }

  ngOnDestroy(): void {
    if (this.jsonLdScript) {
      this.renderer.removeChild(document.head, this.jsonLdScript);
    }
  }

  calculer() {
    if (this.form.invalid) return;

    const ca = Number(this.form.value.chiffreAffaires) || 0;
    const activite = this.form.value.activite as string;
    const tauxSocial = Number(this.form.value.tauxSocial) / 100;
    const versement = !!this.form.value.versementLiberatoire;
    const tauxVersement = Number(this.form.value.tauxVersement) / 100;
    const tmi = Number(this.form.value.tmi) / 100;

    const abattementPct = this.abattements[activite] ?? 50; // default 50%
    const baseImposable = ca * (1 - abattementPct / 100);

    const chargesSociales = ca * tauxSocial;

    let impot = 0;
    if (versement) {
      impot = ca * tauxVersement;
    } else {
      impot = baseImposable * tmi;
    }

    const revenuNet = ca - chargesSociales - impot;
    const revenuMensuel = revenuNet / 12;

    this.resultat = {
      ca,
      activite,
      abattement: abattementPct,
      baseImposable,
      tauxSocial: (tauxSocial * 100),
      chargesSociales,
      impot,
      revenuNet,
      revenuMensuel
    };
  }
}
