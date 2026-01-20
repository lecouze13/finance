import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { SeoService } from '../Constructor/service/seo.service';
import { FaqSectionComponent, FaqItem } from '../shared/faq-section/faq-section.component';
@Component({
  selector: 'app-simulateur-defiscalisation',
  templateUrl: './simulateur-defiscalisation.component.html',
  styleUrls: ['./simulateur-defiscalisation.component.scss']
})

export class SimulateurDefiscalisationComponent implements OnInit {
  form: FormGroup ;
  result: any = null;
  faqItems: FaqItem[] = [
    {
      question: 'Qu’est-ce qu’un simulateur de défiscalisation ?',
      answer: 'Un simulateur de défiscalisation vous aide à estimer le montant de réduction d’impôt auquel vous pouvez prétendre selon le dispositif fiscal choisi et votre investissement.'
    },
    {
      question: 'Quels dispositifs fiscaux sont pris en compte ?',
      answer: 'Le simulateur peut intégrer différents dispositifs comme la loi Pinel, Denormandie, le statut LMNP, Censi-Bouvard ou encore la réduction Malraux.'
    },
    {
      question: 'Comment utiliser le simulateur ?',
      answer: 'Saisissez le montant de votre investissement, la durée, votre taux marginal d’imposition, et choisissez le dispositif fiscal pour obtenir une estimation de votre réduction d’impôt.'
    },
    {
      question: 'Est-ce que les résultats sont garantis ?',
      answer: 'Non, les résultats sont des estimations indicatives basées sur les paramètres fournis. Les conditions réelles peuvent varier selon votre situation fiscale.'
    },
    {
      question: 'Puis-je simuler plusieurs investissements ?',
      answer: 'Oui, vous pouvez effectuer plusieurs simulations en changeant les paramètres pour comparer différents scénarios.'
    },
    {
      question: 'Le simulateur prend-il en compte les plafonds fiscaux ?',
      answer: 'Oui, les calculs intègrent les plafonds spécifiques à chaque dispositif fiscal ainsi que le plafond global des niches fiscales.'
    },
    {
      question: 'La simulation inclut-elle les frais annexes ?',
      answer: 'Par défaut, seuls les montants éligibles à la réduction sont pris en compte, mais vous pouvez ajouter les frais pour affiner l’estimation.'
    },
    {
      question: 'Est-ce gratuit ?',
      answer: 'Oui, ce simulateur est 100 % gratuit et accessible en ligne.'
    },
    {
      question: 'Peut-on l’utiliser pour d’autres années fiscales ?',
      answer: 'Le simulateur est basé sur les règles fiscales 2026. Pour d’autres années, les taux et plafonds peuvent varier.'
    },
    {
      question: 'Dois-je déclarer mes investissements à l’administration fiscale ?',
      answer: 'Oui, tout investissement ouvrant droit à réduction doit être déclaré aux impôts, avec les justificatifs nécessaires.'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: any,
    private renderer: Renderer2, private seo: SeoService, private fb: FormBuilder) {



    this.form = this.fb.group({
      loi: ['pinel', Validators.required],
      montantInvesti: [, [Validators.required, Validators.min(1)]],
      duree: [],
      revenus: [],
      zone: ['A'],
      montantTravaux: [],
      montantLoyer: []
    });


  }
  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Simulateur Défiscalisation 2026 | CalculateurFinance.fr',
      description: 'Estimez vos économies d’impôts avec notre simulateur de défiscalisation 2026. Comparez les dispositifs fiscaux comme Pinel, Denormandie, LMNP et autres, et optimisez votre fiscalité.',
      url: 'https://calculateurfinance.fr/simulateur-defiscalisation/',
      keywords: 'simulateur défiscalisation, calcul économie impôt, réduction fiscale, investissement locatif, loi Pinel, loi Denormandie, LMNP, avantage fiscal, optimisation impôt, économie d impôt'
    });

    if (isPlatformBrowser(this.platformId)) {
      }
  }


  calculer() {
    const { loi, montantInvesti, duree, revenus, zone, montantTravaux } = this.form.value;
    let reduction = 0;
    let plafondInvest = montantInvesti;
    let info = '';

    switch (loi) {
      case 'pinel':
        plafondInvest = Math.min(montantInvesti, 300000);
        if (duree === 6) reduction = plafondInvest * 0.12;
        else if (duree === 9) reduction = plafondInvest * 0.18;
        else if (duree === 12) reduction = plafondInvest * 0.21;
        info = `Réduction Pinel sur ${duree} ans`;
        break;

      case 'denormandie':
        plafondInvest = Math.min(montantInvesti + montantTravaux, 300000);
        reduction = plafondInvest * 0.18; // par défaut 9 ans
        info = `Réduction Denormandie (9 ans par défaut)`;
        break;

      case 'malraux':
        const taux = zone === 'secteur_sauvegarde' ? 0.30 : 0.22;
        reduction = montantTravaux * taux;
        info = `Réduction Malraux (${taux * 100} % des travaux)`;
        break;

      case 'monuments_historiques':
        reduction = montantTravaux; // 100% imputable sur le revenu global
        info = `Déduction Monuments Historiques sur revenu global`;
        break;

      case 'censi_bouvard':
        plafondInvest = Math.min(montantInvesti, 300000);
        reduction = plafondInvest * 0.11;
        info = `Réduction Censi-Bouvard (11% sur 9 ans)`;
        break;
    }

    this.result = {
      reduction,
      info
    };
  }
}


