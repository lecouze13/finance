import { Component, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../Constructor/service/seo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-simulateur-import-location-nue',
  templateUrl: './simulateur-import-location-nue.component.html',
  styleUrls: ['./simulateur-import-location-nue.component.scss']
})
export class SimulateurImportLocationNueComponent implements OnInit {
  resultat: number | null = null;
  impot: number | null = null;
  baseImposable: number | null = null;
  form: FormGroup;
  baseImposableReel: number = 0;
  impotReel: number = 0;
  resultatReel: number = 0;

  baseImposableMicro: number = 0;
  impotMicro: number = 0;
  resultatMicro: number = 0;
  constructor(
    private seo: SeoService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,private fb: FormBuilder
  ) {
     this.form = this.fb.group({
      revenusFonciers: [0, [Validators.required]],
      chargesDeductibles: [0, [Validators.required]],
      interetsEmprunt: [0, [Validators.required]],
      travaux: [0, [Validators.required]],
      taxeFonciere: [0, [Validators.required]],
      tauxMarginalImposition: [30, [Validators.required]], // en %
    });
  }

  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Simulateur impôt location nue 2025 | CalculateurFinance.fr',
      description:
        'Calculez rapidement l’impôt à payer sur vos revenus fonciers en location nue, selon le régime micro-foncier ou réel. Simulation simple et précise.',
      url: 'https://www.calculateurfinance.fr/simulateur-location-nue-regime/',
      keywords: 'simulateur location nue, régime location nue, fiscalité location nue, revenus fonciers, calcul impôt location nue, régime micro-foncier, régime réel, location vide, défiscalisation immobilière',

    });

    if (isPlatformBrowser(this.platformId)) {
      const script = this.renderer.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Quelle est la différence entre le régime micro-foncier et réel ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le régime micro-foncier applique un abattement forfaitaire de 30% sur les loyers. Le régime réel permet de déduire les charges réelles (travaux, intérêts, taxe foncière, etc.).'
            }
          },
          {
            '@type': 'Question',
            name: 'Qui peut bénéficier du régime micro-foncier ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Les bailleurs percevant moins de 15 000 € de loyers annuels issus de biens non meublés, hors SCI ou monuments historiques, peuvent bénéficier du régime micro-foncier.'
            }
          },
          {
            '@type': 'Question',
            name: 'Que puis-je déduire au régime réel ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Vous pouvez déduire toutes les charges liées au bien : travaux, intérêts d’emprunt, taxe foncière, frais de gestion, etc.'
            }
          },
          {
            '@type': 'Question',
            name: 'Le simulateur prend-il en compte les prélèvements sociaux ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Oui, le simulateur inclut les prélèvements sociaux au taux actuel de 17,2 % sur la base imposable positive.'
            }
          },
          {
            '@type': 'Question',
            name: 'Quel est le TMI à renseigner ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Le Taux Marginal d’Imposition (TMI) est votre tranche d’imposition sur le revenu. Il est souvent de 11 %, 30 %, 41 % ou 45 %.'
            }
          },
          {
            '@type': 'Question',
            name: 'Peut-on passer du régime micro-foncier au régime réel ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Oui, il est possible d’opter pour le régime réel. Cette option est irrévocable pendant 3 ans.'
            }
          },
          {
            '@type': 'Question',
            name: 'Le régime réel est-il toujours plus avantageux ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Pas forcément. Il est plus avantageux si vos charges dépassent 30 % des loyers. Sinon, le micro-foncier est plus simple.'
            }
          },
          {
            '@type': 'Question',
            name: 'Peut-on déclarer en ligne ses revenus fonciers ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Oui, la déclaration des revenus fonciers se fait en ligne via votre espace personnel sur impots.gouv.fr.'
            }
          },
          {
            '@type': 'Question',
            name: 'Quels sont les risques en cas d’erreur de déclaration ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Une erreur peut entraîner un redressement fiscal et des pénalités. Il est important de conserver toutes les preuves de dépenses et loyers perçus.'
            }
          },
          {
            '@type': 'Question',
            name: 'Le simulateur est-il fiable pour estimer mon impôt ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Oui, il donne une estimation réaliste de votre base imposable et des impôts dus selon le régime choisi. Il ne remplace pas un conseil fiscal personnalisé.'
            }
          }
        ]
      });
      this.renderer.appendChild(document.head, script);
    }
  }


calculer(): void {
  const loyers = this.form.value.revenusFonciers || 0;
  const charges = this.form.value.chargesDeductibles || 0;
  const interets = this.form.value.interetsEmprunt || 0;
  const travaux = this.form.value.travaux || 0;
  const taxe = this.form.value.taxeFonciere || 0;
  const taux = (this.form.value.tauxMarginalImposition || 0) / 100;

  // Calcul régime réel
  this.baseImposableReel = loyers - (charges + interets + travaux + taxe);
  this.baseImposableReel = this.baseImposableReel > 0 ? this.baseImposableReel : 0;

  const impotIRReel = this.baseImposableReel * taux;
  const csgReel = this.baseImposableReel * 0.172;
  this.impotReel = impotIRReel + csgReel;

  this.resultatReel = this.baseImposableReel - this.impotReel;

  // Calcul régime micro-foncier (abattement forfaitaire de 30%)
  this.baseImposableMicro = loyers * 0.7;

  const impotIRMicro = this.baseImposableMicro * taux;
  const csgMicro = this.baseImposableMicro * 0.172;
  this.impotMicro = impotIRMicro + csgMicro;

  this.resultatMicro = this.baseImposableMicro - this.impotMicro;

  // Résultat global (existant) => ici on prend le régime réel comme référence
  this.baseImposable = this.baseImposableReel;
  this.impot = this.impotReel;
  this.resultat = this.resultatReel;
}


}
