import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { SeoService } from '../../Constructor/service/seo.service';

type BarèmeLEP = {
  // clés = nombre de parts (peuvent être 1, 1.5, 2, 2.5, ...)
  [parts: string]: number;
};

@Component({
  selector: 'app-simulateur-eligibilite-lep',
  templateUrl: './simulateur-eligibilite-lep.component.html',
  styleUrls: ['./simulateur-eligibilite-lep.component.scss'],
})
export class SimulateurEligibiliteLepComponent implements OnInit, OnDestroy {
  form: FormGroup;
  resultat: {
    eligible: boolean;
    rfr: number;
    parts: number;
    plafondRfr: number;
    marge: number;
    message: string;
    plafondDepot: number;
    justificatif: string;
  } | null = null;

  /** ------------------------------
   *  Barème LEP (RFR N-2) – valeurs par défaut 2025 (à ajuster si besoin)
   *  Clés : nombre de parts (1, 1.5, 2, 2.5, 3, 3.5, 4)
   *  Règle au-delà : + 4 955 € par 1/2 part supplémentaire (paramétrable).
   *  ------------------------------ */
  plafondsRFR: BarèmeLEP = {
    '1': 22823,
    '1.25': 25871,
    '1.5': 28918,
    '1.75': 31966,
    '2': 35013,
    '2.25': 38061,
    '2.5': 41108,
    '2.75': 44156,
    '3': 47203,
    '3.25': 50251,
    '3.5': 53298,
    '3.75': 56346,
    '4': 59393,
    '4.25': 62441,
    '4.5': 65488,
    '4.75': 68536,
    '5': 71583,
    '5.25': 74631,
    '5.5': 77678,
    '5.75': 80726,
    '6': 83773,
    demi_part_sup: 6095,
    quart_part_sup: 3048,
  };

  /** Incrément par 1/2 part au-delà de 4 parts (paramétrable) */
  incrementDemiPartAuDelaDe4 = 4955;

  /** Plafond légal de dépôts du LEP (paramétrable) */
  plafondDepotLEP = 10000;

  private jsonLdScript?: HTMLScriptElement;

  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: any,
    private renderer: Renderer2,
    private seo: SeoService
  ) {
    this.form = this.fb.group({
      rfr: [0, [Validators.required, Validators.min(0)]],
      parts: [1, [Validators.required, Validators.min(1)]],
      anneeReference: ['N-2', Validators.required], // purement informatif
    });
  }

  ngOnInit(): void {
    // SEO
    this.seo.updateMetaData({
      title:
        'Simulateur d’éligibilité LEP (Livret d’Épargne Populaire) | CalculateurFinance.fr',
      description:
        'Vérifiez votre éligibilité au LEP en renseignant votre revenu fiscal de référence (RFR) et votre nombre de parts fiscales.',
      url: 'https://calculateurfinance.fr/simulateur-eligibilite-lep/',
      keywords:
        'simulateur LEP, éligibilité LEP, RFR LEP, plafond LEP, livret épargne populaire, conditions LEP',
    });

    if (isPlatformBrowser(this.platformId)) {
      // JSON-LD FAQ
      const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Qu’est-ce que le LEP ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le Livret d’Épargne Populaire (LEP) est un livret réglementé destiné aux contribuables aux revenus modestes. L’ouverture est soumise à des conditions de ressources.',
            },
          },
          {
            '@type': 'Question',
            name: 'Sur quoi se base l’éligibilité au LEP ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sur le Revenu Fiscal de Référence (RFR) du foyer N-2 et le nombre de parts fiscales. Le RFR doit être inférieur ou égal au plafond correspondant.',
            },
          },
          {
            '@type': 'Question',
            name: 'Où trouver mon RFR ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Votre RFR figure sur votre dernier avis d’imposition (page de synthèse).',
            },
          },
          {
            '@type': 'Question',
            name: 'Quel est le plafond des dépôts sur un LEP ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le plafond des dépôts du LEP est réglementé. Il est paramétrable dans ce simulateur (par défaut 10 000 €).',
            },
          },
          {
            '@type': 'Question',
            name: 'Que fournir à la banque pour ouvrir un LEP ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Votre avis d’imposition (pour justifier le RFR N-2) et les justificatifs d’identité/domicile habituels.',
            },
          },
        ],
      };

      this.jsonLdScript = this.renderer.createElement('script');
      if (this.jsonLdScript) {
        this.jsonLdScript.type = 'application/ld+json';
        this.jsonLdScript.id = 'jsonld-lep-faq';
        this.jsonLdScript.text = JSON.stringify(faqJsonLd);
        this.renderer.appendChild(document.head, this.jsonLdScript);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.jsonLdScript) {
      this.renderer.removeChild(document.head, this.jsonLdScript);
    }
  }

  private normalizeParts(parts: number): number {
    return Math.max(1, Math.round(parts * 4) / 4);
  }

  /** Donne le plafond RFR correspondant au nombre de parts */
  private getPlafondRfr(partsInput: number): number {
    const parts = this.normalizeParts(partsInput);

    // Si la clé existe dans le barème, on la prend telle quelle
    const cle = String(parts);
    if (this.plafondsRFR[cle] !== undefined) {
      return this.plafondsRFR[cle];
    }

    // Sinon, on extrapole au-delà de 4 parts par pas de 0.5 part
    const base = this.plafondsRFR['4'];
    if (!base) return 0;

    const surplusParts = parts - 4;
    const nbDemiPartsSup = Math.round(surplusParts * 2); // devrait déjà être un multiple de 0.5
    return base + nbDemiPartsSup * this.incrementDemiPartAuDelaDe4;
  }

  calculer(): void {
    if (this.form.invalid) return;

    const rfr = Number(this.form.value.rfr) || 0;
    const parts = Number(this.form.value.parts) || 1;

    const plafondRfr = this.getPlafondRfr(parts);
    const eligible = rfr <= plafondRfr;
    const marge = plafondRfr - rfr;

    const message = eligible
      ? `✅ Éligible au LEP. Votre RFR est inférieur ou égal au plafond pour ${this.normalizeParts(
          parts
        )} part(s).`
      : `❌ Non éligible. Votre RFR dépasse le plafond pour ${this.normalizeParts(
          parts
        )} part(s).`;

    this.resultat = {
      eligible,
      rfr,
      parts: this.normalizeParts(parts),
      plafondRfr,
      marge,
      message,
      plafondDepot: this.plafondDepotLEP,
      justificatif: `À présenter : avis d’imposition (RFR N-2) correspondant à ${this.normalizeParts(
        parts
      )} part(s).`,
    };
  }
}
