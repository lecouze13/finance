import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeoService } from '../../Constructor/service/seo.service';
import { TaxBracketService } from '../../shared/services/tax-bracket.service';
import { AnalyticsService } from '../../shared/services/analytics.service';
import { FaqItem } from '../../shared/faq-section/faq-section.component';

@Component({
  selector: 'app-simulateur-eligibilite-lep',
  templateUrl: './simulateur-eligibilite-lep.component.html',
  styleUrls: ['./simulateur-eligibilite-lep.component.scss'],
})
export class SimulateurEligibiliteLepComponent implements OnInit {
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

  plafondDepotLEP = 10000;

  faqItems: FaqItem[] = [
    {
      question: "Qu'est-ce que le LEP ?",
      answer: "Le Livret d'Épargne Populaire (LEP) est un livret réglementé destiné aux contribuables aux revenus modestes. L'ouverture est soumise à des conditions de ressources."
    },
    {
      question: "Sur quoi se base l'éligibilité au LEP ?",
      answer: "Sur le Revenu Fiscal de Référence (RFR) du foyer N-2 et le nombre de parts fiscales. Le RFR doit être inférieur ou égal au plafond correspondant."
    },
    {
      question: "Où trouver mon RFR ?",
      answer: "Votre RFR figure sur votre dernier avis d'imposition (page de synthèse)."
    },
    {
      question: "Quel est le plafond des dépôts sur un LEP ?",
      answer: "Le plafond des dépôts du LEP est réglementé. Il est de 10 000 € en 2026."
    },
    {
      question: "Que fournir à la banque pour ouvrir un LEP ?",
      answer: "Votre avis d'imposition (pour justifier le RFR N-2) et les justificatifs d'identité/domicile habituels."
    }
  ];

  constructor(
    private fb: FormBuilder,
    private seo: SeoService,
    private bareme: TaxBracketService,
    private analytics: AnalyticsService
  ) {
    this.form = this.fb.group({
      rfr: [0, [Validators.required, Validators.min(0)]],
      parts: [1, [Validators.required, Validators.min(1)]],
      anneeReference: ['N-2', Validators.required], // purement informatif
    });
  }

  ngOnInit(): void {
    this.seo.updateMetaData({
      title:
        "Simulateur d'éligibilité LEP (Livret d'Épargne Populaire) | CalculateurFinance.fr",
      description:
        "Vérifiez votre éligibilité au LEP en renseignant votre revenu fiscal de référence (RFR) et votre nombre de parts fiscales.",
      url: "https://calculateurfinance.fr/simulateur-eligibilite-lep/",
      keywords:
        "simulateur LEP, éligibilité LEP, RFR LEP, plafond LEP, livret épargne populaire, conditions LEP",
    });
  }

  calculer(): void {
    if (this.form.invalid) return;

    this.analytics.trackButtonClick('Calculer', 'simulateur-lep');

    const rfr = Number(this.form.value.rfr) || 0;
    const parts = Number(this.form.value.parts) || 1;

    // Utilisation du TaxBracketService
    const eligibilite = this.bareme.verifierEligibiliteLEP(rfr, parts);

    const message = eligibilite.eligible
      ? `✅ Éligible au LEP. Votre RFR est inférieur ou égal au plafond pour ${parts} part(s).`
      : `❌ Non éligible. Votre RFR dépasse le plafond pour ${parts} part(s).`;

    this.resultat = {
      eligible: eligibilite.eligible,
      rfr,
      parts,
      plafondRfr: eligibilite.plafond,
      marge: eligibilite.marge,
      message,
      plafondDepot: this.plafondDepotLEP,
      justificatif: `À présenter : avis d'imposition (RFR N-2) correspondant à ${parts} part(s).`,
    };

    this.analytics.trackCalculation('simulateur-lep', {
      eligible: eligibilite.eligible,
      rfr,
      parts
    });

    this.analytics.trackFormSubmission('simulateur-lep', {
      rfr,
      parts,
      eligible: eligibilite.eligible
    });
  }
}
