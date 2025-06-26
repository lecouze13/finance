import { Component, OnInit, Renderer2 } from '@angular/core';
import { SeoService } from '../../Constructor/service/seo.service'; import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
@Component({
  selector: 'app-simulateur-brut-net',
  templateUrl: './simulateur-brut-net.component.html',
  styleUrls: ['./simulateur-brut-net.component.scss']
})
export class SimulateurBrutNetComponent implements OnInit {

  constructor(  @Inject(PLATFORM_ID) private platformId: any, 
private renderer: Renderer2, private seo: SeoService) { }
  ngOnInit() {

    this.seo.updateMetaData({
      title: 'Simulateur Brut-Net 2025 | CalculateurFinance.fr',
      description: 'Calculez rapidement la conversion entre salaire brut et net avec notre simulateur simple et gratuit. Adapté aux dernières règles fiscales 2025.',
      url: 'https://calculateurfinance.fr/simulateur-brut-net/',
          keywords: 'simulateur brut net, calcul salaire net, conversion brut en net, salaire après impôts, charges sociales, salaire en France, simulateur de paie, net imposable, salaire net mensuel',

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
          "name": "Comment passer du salaire brut au salaire net ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pour passer du salaire brut au salaire net, on soustrait les charges sociales salariales qui représentent environ 22% à 25% du brut selon le statut."
          }
        },
        {
          "@type": "Question",
          "name": "Quelle est la formule de conversion brut-net ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "On applique un coefficient multiplicateur entre 0,70 et 0,85 au salaire brut selon le statut et le secteur."
          }
        },
        {
          "@type": "Question",
          "name": "Dans quoi passent les charges sociales ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Elles financent la retraite, la sécurité sociale, l'assurance chômage et les prestations sociales."
          }
        },
        {
          "@type": "Question",
          "name": "Quelles sont les taxes pour les différentes professions ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cadre (~25%), non-cadre (~23%), public (~15%), libéral (~30%)."
          }
        },
        {
          "@type": "Question",
          "name": "Que faire des impôts sur le revenu ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Les impôts ne sont pas inclus ici. Utilisez notre simulateur : https://calculateurfinance.fr/simulateur-impot-revenue"
          }
        },
        {
          "@type": "Question",
          "name": "Quelle différence entre brut et net pour un indépendant ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Un indépendant paie ses propres charges sociales. Le net est après déduction de ces cotisations."
          }
        },
        {
          "@type": "Question",
          "name": "Le salaire net affiché est-il avant ou après impôt ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le salaire net affiché est avant impôt (prélèvement à la source non déduit)."
          }
        },
        {
          "@type": "Question",
          "name": "Comment est calculé le SMIC net ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le SMIC net est obtenu après déduction des charges du SMIC brut (≈1794 € brut en 2025)."
          }
        },
        {
          "@type": "Question",
          "name": "Un temps partiel influence-t-il le net ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, le temps de travail réduit proportionnellement le brut et donc le net."
          }
        },
        {
          "@type": "Question",
          "name": "Existe-t-il des charges réduites pour certains statuts ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, apprentis, stagiaires ou certains régimes spéciaux peuvent avoir des charges allégées."
          }
        }
      ]
    })
 
    this.renderer.appendChild(document.head, script);
 }
  }

  typeSalaire = [
    { label: 'Salaire Brut annuel', value: 'brutAnnuel' },
    { label: 'Salaire Brut mensuel', value: 'brutMensuel' },
    { label: 'Salaire Net annuel', value: 'netAnnuel' },
    { label: 'Salaire Net mensuel', value: 'netMensuel' }
  ];

  typeContrat = [
    { label: 'Artisan / Commerçant', value: 'artisanCommercant' },
    { label: 'Cadre privé', value: 'cadre' },
    { label: 'Fonction publique', value: 'fonctionPublique' },
    { label: 'Indépendant / Auto-entrepreneur', value: 'independant' },
    { label: 'Non-Cadre privé', value: 'nonCadre' },
    { label: 'Profession libérale', value: 'liberal' }
  ];

  secteurs = [
    { label: 'Fonction publique', value: 'public' },
    { label: 'Indépendant / Libéral', value: 'independant' },
    { label: 'Secteur privé', value: 'prive' }
  ];

  tempsTravail = 100;
  valeurSalaire: number = 0;
  salaireChoisi: string = '';
  contrat: string = '';
  secteur: string = '';

  // Résultats détaillés
  salaireBrutMensuel: number | null = null;
  salaireNetMensuel: number | null = null;
  salaireBrutAnnuel: number | null = null;
  salaireNetAnnuel: number | null = null;
  chargesMensuelles: number | null = null;
  chargesAnnuelles: number | null = null;

  estSmic: boolean = false;
  resultat: boolean = false;

  calculerConversion() {
    const tauxConversion = this.getTauxConversion(this.contrat, this.secteur);
    const temps = this.tempsTravail / 100;

    let brut: number = 0, net: number = 0;

    // Conversion selon le type de salaire choisi
    if (this.salaireChoisi.startsWith('brut')) {
      brut = this.valeurSalaire;
      net = brut * tauxConversion;
    } else {
      net = this.valeurSalaire;
      brut = net / tauxConversion;
    }

    brut *= temps;
    net *= temps;

    // Calcul des mensuels et annuels selon le type choisi
    if (this.salaireChoisi.endsWith('Annuel')) {
      this.salaireBrutAnnuel = Math.round(brut);
      this.salaireNetAnnuel = Math.round(net);
      this.salaireBrutMensuel = Math.round(brut / 12);
      this.salaireNetMensuel = Math.round(net / 12);
    } else { // mensuel choisi
      this.salaireBrutMensuel = Math.round(brut);
      this.salaireNetMensuel = Math.round(net);
      this.salaireBrutAnnuel = Math.round(brut * 12);
      this.salaireNetAnnuel = Math.round(net * 12);
    }

    this.chargesMensuelles = this.salaireBrutMensuel - this.salaireNetMensuel;
    this.chargesAnnuelles = this.salaireBrutAnnuel - this.salaireNetAnnuel;

    this.resultat = true;

    // Vérification SMIC (montant 1794 € mensuel en 2025)
    const smicMensuel = 1794;
    this.estSmic = this.salaireBrutMensuel! >= smicMensuel * temps && this.salaireBrutMensuel! <= smicMensuel * temps * 1.05;
  }

  getTauxConversion(contrat: string, secteur: string): number {

    switch (contrat) {
      case 'cadre': return 0.75;
      case 'nonCadre': return 0.77;
      case 'liberal': return 0.70;
      case 'artisanCommercant': return 0.72;
      case 'independant': return 0.68;
      default: return 0.77;
    }
  }
}


