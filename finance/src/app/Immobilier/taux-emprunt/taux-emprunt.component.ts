import { Component, OnInit, Renderer2 } from '@angular/core';
import { SeoService } from '../../Constructor/service/seo.service'; import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-taux-emprunt',

  templateUrl: './taux-emprunt.component.html',
  styleUrl: './taux-emprunt.component.scss'
})
export class TauxEmpruntComponent implements OnInit {

  constructor(  @Inject(PLATFORM_ID) private platformId: any, 
private renderer: Renderer2, private seo: SeoService) { }


  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Simulateur Crédit Immobilier 2025 | Estimation Mensualités, Coût et Capacité',
      description: 'Calculez gratuitement vos mensualités, coût total du crédit et capacité d’emprunt grâce à notre simulateur immobilier simple et précis.',
      url: 'https://www.calculateurfinance.fr/simulateur-credit-immobilier/',
      // image: 'https://www.calculateurfinance.fr/assets/simulateur-credit-immobilier-preview.png'
    });
  if (isPlatformBrowser(this.platformId)) {

    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Qu’est-ce qu’un crédit immobilier ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Un prêt bancaire destiné à financer l’achat d’un bien immobilier, avec remboursement en mensualités sur une durée définie."
          }
        },
        {
          "@type": "Question",
          "name": "Comment calculer les mensualités ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Les mensualités se calculent en fonction du capital emprunté, du taux d’intérêt, de la durée du prêt et des assurances."
          }
        },
        {
          "@type": "Question",
          "name": "Qu’est-ce que le TAEG ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le Taux Annuel Effectif Global regroupe le taux d’intérêt et les frais annexes pour donner le coût total du crédit."
          }
        },
        {
          "@type": "Question",
          "name": "Comment calculer le coût total du crédit ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le coût total correspond aux intérêts payés sur la durée du prêt plus les frais annexes (assurances, garanties)."
          }
        },
        {
          "@type": "Question",
          "name": "Qu’est-ce que la capacité d’emprunt ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "La capacité d’emprunt représente le montant maximum que vous pouvez emprunter en fonction de vos revenus et charges."
          }
        },
        {
          "@type": "Question",
          "name": "Comment augmenter sa capacité d’emprunt ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "En diminuant vos charges, augmentant vos revenus ou en apportant un apport personnel plus important."
          }
        },
        {
          "@type": "Question",
          "name": "Qu’est-ce que l’assurance emprunteur ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Une assurance qui garantit le remboursement du crédit en cas de décès, invalidité ou incapacité de travail."
          }
        },
        {
          "@type": "Question",
          "name": "Puis-je rembourser mon crédit par anticipation ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, sous certaines conditions, vous pouvez rembourser tout ou partie de votre crédit avant la fin du contrat."
          }
        },
        {
          "@type": "Question",
          "name": "Que se passe-t-il en cas de retard de paiement ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Des pénalités peuvent être appliquées, et en cas de non-paiement prolongé, la banque peut engager une procédure de recouvrement."
          }
        },
        {
          "@type": "Question",
          "name": "Où puis-je simuler mon crédit immobilier ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Utilisez notre simulateur de crédit immobilier sur CalculateurFinance.fr pour estimer vos mensualités, coût total et capacité d’emprunt."
          }
        }
      ]
    });
    this.renderer.appendChild(document.head, script);
  }
}

  sommeEmprunte: number | undefined = 0;
  interet: number = 3.6;
  isCalculCoutTotal: boolean = false;
  isCalculMensualite: boolean = false;
  isCapaciteEmprunt: boolean = false;
  dureeDuCredit: number | undefined = 0;
  coutTotal: number | undefined = 0;
  mensualite: number | undefined = 0;
  capaciteEmprunt: number | undefined = 0;
  calcul: String[] = ['Calculer le coût total', 'Calculer la mensualité', 'Calculer la capacité d\'emprunt'];
  selectedCalcul: String | undefined;
  coutCredit: Number | undefined;


  calculCoutTotal() {
    if (this.sommeEmprunte && this.interet && this.dureeDuCredit) {
      const tauxMensuel = (this.interet / 100) / 12;
      const nombreDeMois = this.dureeDuCredit;

      const mensualite = (this.sommeEmprunte * tauxMensuel) / (1 - Math.pow(1 + tauxMensuel, -nombreDeMois));

      this.coutTotal = Math.round(mensualite * nombreDeMois)
      this.coutCredit = Math.round(this.coutTotal - this.sommeEmprunte);
    }
  }

  calculMensualite() {
    if (this.sommeEmprunte && this.interet && this.dureeDuCredit) {
      const tauxMensuel = this.interet / 100 / 12;
      const nombreDeMois = this.dureeDuCredit;

      this.mensualite = (this.sommeEmprunte * tauxMensuel) / (1 - Math.pow(1 + tauxMensuel, -nombreDeMois));
    }
  }
  calculCapaciteEmprunt() {
    if (this.mensualite && this.interet && this.dureeDuCredit) {
      const tauxMensuel = this.interet / 100 / 12;
      const nombreDeMois = this.dureeDuCredit;
      this.capaciteEmprunt = Math.round(this.mensualite / (tauxMensuel / (1 - Math.pow(1 + tauxMensuel, -nombreDeMois))))
    }
  }
  changeCalcul() {
    if (this.selectedCalcul === 'Calculer le coût total') {
      this.isCalculMensualite = false
      this.isCalculCoutTotal = true
      this.isCapaciteEmprunt = false

    } else if (this.selectedCalcul === 'Calculer la mensualité') {
      this.isCalculMensualite = true
      this.isCalculCoutTotal = false
      this.isCapaciteEmprunt = false
    }
    else if (this.selectedCalcul === 'Calculer la capacité d\'emprunt') {
      this.isCalculMensualite = false
      this.isCalculCoutTotal = false
      this.isCapaciteEmprunt = true
    }
  }
}
