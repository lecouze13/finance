import { Component, OnInit, Renderer2 } from '@angular/core';
import { SeoService } from '../../Constructor/service/seo.service';


@Component({
  selector: 'app-rendement',

  templateUrl: './rendement.component.html',
  styleUrl: './rendement.component.scss'
})
export class RendementComponent implements OnInit {
  constructor(private renderer: Renderer2, private seo: SeoService) { }
  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Simulateur Rendement Immobilier 2025 | Rendement Brut, Net et Net-Net',
      description: 'Calculez le rendement brut, net et net-net de votre investissement immobilier grâce à notre simulateur simple et précis.',
      url: 'https://www.calculateurfinance.fr/simulateur-rendement-immobilier',
      // image: 'https://www.calculateurfinance.fr/assets/simulateur-rendement-preview.png'
    });

    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Qu’est-ce que le rendement brut ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le rendement brut correspond au rapport entre les loyers annuels perçus et le prix d’achat du bien, sans déduction des charges."
          }
        },
        {
          "@type": "Question",
          "name": "Qu’est-ce que le rendement net ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le rendement net déduit les charges courantes telles que les frais de gestion, les charges de copropriété, la taxe foncière, etc."
          }
        },
        {
          "@type": "Question",
          "name": "Qu’est-ce que le rendement net-net ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le rendement net-net intègre en plus les impôts et prélèvements sociaux liés aux revenus locatifs."
          }
        },
        {
          "@type": "Question",
          "name": "Comment calculer le rendement brut ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rendement brut = (Loyers annuels / Prix d’achat) × 100."
          }
        },
        {
          "@type": "Question",
          "name": "Pourquoi le rendement net est-il plus représentatif ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Parce qu’il prend en compte les charges réelles supportées par le propriétaire, offrant une vision plus précise de la rentabilité."
          }
        },
        {
          "@type": "Question",
          "name": "Comment intégrer les impôts dans le calcul du rendement ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le rendement net-net tient compte des impôts sur le revenu et des prélèvements sociaux, donnant une idée du gain réellement perçu."
          }
        },
        {
          "@type": "Question",
          "name": "Le rendement peut-il être négatif ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, si les charges et impôts dépassent les loyers perçus, le rendement net-net peut être négatif."
          }
        },
        {
          "@type": "Question",
          "name": "Quelle est la différence entre rendement et plus-value ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le rendement mesure les revenus locatifs, alors que la plus-value correspond à la plus-value réalisée à la revente du bien."
          }
        },
        {
          "@type": "Question",
          "name": "Comment améliorer son rendement immobilier ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "En optimisant les charges, augmentant les loyers ou choisissant un bien à meilleur potentiel locatif."
          }
        },
        {
          "@type": "Question",
          "name": "Où puis-je simuler le rendement de mon investissement ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Utilisez notre simulateur de rendement immobilier sur CalculateurFinance.fr pour estimer facilement votre rentabilité."
          }
        }
      ]
    });
    this.renderer.appendChild(document.head, script);
  }


  loyerMensuel: number | undefined = 0;
  prixAcquisition: number | undefined = 0;

  chargeLocatives: number | undefined = 0;
  loyerMensuel2: number | undefined = 0;
  prixAcquisition2: number | undefined = 0;


  loyerMensuel3: number | undefined = 0;
  prixAcquisition3: number | undefined = 0;
  chargeLocatives2: number | undefined = 0;
  impot: number | undefined = 0;
  rendementNetNet: number | undefined;
  rendementBrut: number | undefined;
  rendementNet: number | undefined;


  calculRendementBrut() {
    if (this.prixAcquisition && this.loyerMensuel) {
      this.rendementBrut = ((this.loyerMensuel * 12) / this.prixAcquisition) * 100
    }
  }
  calculRendementNet() {
    if (this.prixAcquisition2 && this.loyerMensuel2 && this.chargeLocatives) {
      this.rendementNet = (((this.loyerMensuel2 * 12) - this.chargeLocatives) / this.prixAcquisition2) * 100
    }
  }

  calculRendementNetNet() {
    if (this.prixAcquisition3 && this.loyerMensuel3 && this.chargeLocatives2 && this.impot) {
      this.rendementNetNet = (((this.loyerMensuel3 * 12) - (this.chargeLocatives2 + this.impot)) / this.prixAcquisition3) * 100
    }
  }

}
