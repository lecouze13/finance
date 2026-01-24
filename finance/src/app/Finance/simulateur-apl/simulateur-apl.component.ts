import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { SeoService } from '../../Constructor/service/seo.service';
import { FaqSectionComponent, FaqItem } from '../../shared/faq-section/faq-section.component';

@Component({
  selector: 'app-simulateur-apl',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputNumberModule,
    FloatLabelModule,
    ButtonModule,
    PanelModule,
    DropdownModule,
    FaqSectionComponent
  ],
  templateUrl: './simulateur-apl.component.html'
})
export class SimulateurAplComponent implements OnInit {
  form: FormGroup;
  resultat: any = null;

  situationsOptions = [
    { label: 'Célibataire', value: 'celibataire' },
    { label: 'En couple', value: 'couple' },
    { label: 'Célibataire avec enfant(s)', value: 'celibataireEnfants' },
    { label: 'Couple avec enfant(s)', value: 'coupleEnfants' }
  ];

  typeLogementOptions = [
    { label: 'Logement conventionné', value: 'conventionne' },
    { label: 'Logement non conventionné', value: 'nonConventionne' },
    { label: 'Foyer', value: 'foyer' }
  ];

  zoneOptions = [
    { label: 'Zone 1 (Paris et agglomération)', value: 'zone1' },
    { label: 'Zone 2 (Villes > 100 000 hab)', value: 'zone2' },
    { label: 'Zone 3 (Autres communes)', value: 'zone3' }
  ];

  faqItems: FaqItem[] = [
    {
      question: "Qu'est-ce que l'APL ?",
      answer: "L'Aide Personnalisée au Logement (APL) est une aide financière versée par la CAF pour réduire le montant de votre loyer ou de votre mensualité de prêt immobilier."
    },
    {
      question: "Qui peut bénéficier de l'APL ?",
      answer: "Locataires, colocataires, résidents en foyer, ou accédants à la propriété dont les ressources ne dépassent pas un certain plafond."
    },
    {
      question: "Comment est calculé le montant de l'APL ?",
      answer: "Le montant dépend de vos ressources, de votre situation familiale, du montant de votre loyer, et de la zone géographique de votre logement."
    },
    {
      question: "L'APL est-elle imposable ?",
      answer: "Non, l'APL n'est pas considérée comme un revenu imposable."
    },
    {
      question: "Quand faire ma demande d'APL ?",
      answer: "Dès votre entrée dans le logement. L'APL n'est pas rétroactive, elle est versée à partir du mois de la demande."
    }
  ];

  constructor(
    private fb: FormBuilder,
    private seo: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.form = this.fb.group({
      situation: ['celibataire', Validators.required],
      nombreEnfants: [0, [Validators.required, Validators.min(0)]],
      ressourcesMensuelles: [0, [Validators.required, Validators.min(0)]],
      loyerMensuel: [0, [Validators.required, Validators.min(0)]],
      typeLogement: ['conventionne', Validators.required],
      zone: ['zone1', Validators.required]
    });
  }

  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Simulateur APL 2026 - Calculez vos Aides au Logement',
      description: 'Estimez le montant de votre APL (Aide Personnalisée au Logement) en fonction de vos ressources, loyer et situation familiale. Simulateur gratuit et à jour 2026.',
      url: 'https://calculateurfinance.fr/simulateur-apl/',
      keywords: 'simulateur APL, aide logement, CAF, allocation logement, APL 2026, aide au loyer'
    });
  }

  calculer(): void {
    if (this.form.invalid) return;

    const values = this.form.value;

    // Calcul simplifié basé sur les barèmes 2026
    const plafondLoyer = this.getPlafondLoyer(values.situation, values.nombreEnfants, values.zone);
    const loyerRetenu = Math.min(values.loyerMensuel, plafondLoyer);

    // Forfait charges (simplifié)
    const forfaitCharges = this.getForfaitCharges(values.situation, values.nombreEnfants);

    // Participation personnelle (environ 1/3 du loyer + charges)
    const participationPersonnelle = (loyerRetenu + forfaitCharges) * 0.33;

    // APL = Loyer retenu + forfait charges - participation personnelle - déduction selon ressources
    const deductionRessources = this.getDeductionRessources(values.ressourcesMensuelles, values.situation);

    let apl = loyerRetenu + forfaitCharges - participationPersonnelle - deductionRessources;

    // L'APL ne peut pas être négative
    apl = Math.max(0, apl);

    // Arrondir à 2 décimales
    apl = Math.round(apl * 100) / 100;

    this.resultat = {
      apl,
      loyerRetenu,
      plafondLoyer,
      forfaitCharges,
      loyerApresApl: values.loyerMensuel - apl,
      eligible: apl > 0
    };
  }

  private getPlafondLoyer(situation: string, nombreEnfants: number, zone: string): number {
    // Plafonds simplifiés par zone et situation
    const plafonds: any = {
      zone1: { celibataire: 320, couple: 360, enfant: 40 },
      zone2: { celibataire: 280, couple: 320, enfant: 35 },
      zone3: { celibataire: 260, couple: 290, enfant: 30 }
    };

    const plafondZone = plafonds[zone];
    const base = situation.includes('couple') ? plafondZone.couple : plafondZone.celibataire;

    return base + (nombreEnfants * plafondZone.enfant);
  }

  private getForfaitCharges(situation: string, nombreEnfants: number): number {
    // Forfait charges mensuel simplifié
    const base = situation.includes('couple') ? 70 : 55;
    return base + (nombreEnfants * 15);
  }

  private getDeductionRessources(ressources: number, situation: string): number {
    // Déduction progressive selon les ressources
    const plafondRessources = situation.includes('couple') ? 2500 : 1500;

    if (ressources <= plafondRessources) {
      return 0;
    } else {
      // Au-delà du plafond, on déduit 30% de l'excédent
      return (ressources - plafondRessources) * 0.30;
    }
  }
}
