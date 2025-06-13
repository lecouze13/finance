import { Component, OnInit, Renderer2 } from '@angular/core';
import { SeoService } from '../../Constructor/service/seo.service'; import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

interface Actif {
  nom: string | null;
  capitalInitial: number | null;
  versementPeriodique: number | null;
  tauxAnnuel: number | null;
  dureeAnnees: number | null;
  [key: string]: any;
}

@Component({
  selector: 'app-interer-composer',
  templateUrl: './interer-composer.component.html',
  styleUrls: ['./interer-composer.component.scss']
})
export class IntererComposerComponent implements OnInit {
  constructor(  @Inject(PLATFORM_ID) private platformId: any, 
private renderer: Renderer2, private seo: SeoService) { }

  ngOnInit(): void {

    this.seo.updateMetaData({
      title: 'Simulateur intérêt composé 2025 | CalculateurFinance.fr',
      description: 'Calculez la croissance de votre capital avec l’intérêt composé grâce à notre simulateur simple et gratuit. Prenez en compte capital initial, versements, taux et durée.',
      url: 'https://www.calculateurfinance.fr/simulateur-interet-compose',
      // image: 'https://www.calculateurfinance.fr/assets/simulateur-interet-compose-preview.png'
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
          "name": "Qu’est-ce que l’intérêt composé ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "L’intérêt composé est le calcul des intérêts non seulement sur le capital initial mais aussi sur les intérêts déjà accumulés. Cela permet à votre capital de croître plus rapidement avec le temps."
          }
        },
        {
          "@type": "Question",
          "name": "Comment fonctionne ce calculateur ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ce calculateur vous permet d’estimer la croissance de votre capital en fonction d’un capital initial, de versements périodiques, d’un taux d’intérêt annuel, d’une durée et de la fréquence de capitalisation."
          }
        },
        {
          "@type": "Question",
          "name": "Quelle est la différence entre capitalisation annuelle et mensuelle ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "La capitalisation annuelle signifie que les intérêts sont ajoutés une fois par an, tandis que la capitalisation mensuelle les ajoute chaque mois, ce qui accélère la croissance du capital."
          }
        },
        {
          "@type": "Question",
          "name": "Puis-je entrer un versement périodique nul ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, si vous ne faites pas de versements réguliers, entrez zéro. Le calcul se fera uniquement sur le capital initial et les intérêts composés."
          }
        },
        {
          "@type": "Question",
          "name": "Le taux d’intérêt est-il fixe ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ce calculateur utilise un taux fixe pour simplifier les calculs. Dans la réalité, les taux peuvent varier au fil du temps."
          }
        },
        {
          "@type": "Question",
          "name": "Quels sont les avantages de l’intérêt composé ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "L’intérêt composé maximise la croissance du capital sur le long terme, permettant de bénéficier de l’effet boule de neige des intérêts générés."
          }
        },
        {
          "@type": "Question",
          "name": "Peut-on retirer de l’argent pendant la période de calcul ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Non, ce calculateur suppose que le capital reste investi sans retrait pendant toute la durée indiquée."
          }
        },
        {
          "@type": "Question",
          "name": "Quels paramètres influencent le résultat ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le capital initial, les versements périodiques, le taux d’intérêt, la fréquence de capitalisation et la durée sont les principaux paramètres."
          }
        },
        {
          "@type": "Question",
          "name": "Le calcul prend-il en compte l’inflation ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Non, ce calculateur ne prend pas en compte l’inflation. Il estime la croissance nominale du capital."
          }
        },
        {
          "@type": "Question",
          "name": "Est-il possible d’exporter les résultats ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Actuellement, ce simulateur ne propose pas d’export, mais vous pouvez copier manuellement les résultats affichés."
          }
        }
      ]
    });
    this.renderer.appendChild(document.head, script);
  }
  }


  champs = [
    { key: 'nom', label: 'Nom' },
    { key: 'capitalInitial', label: 'Capital initial (€)', min: 0, step: 100 },
    { key: 'versementPeriodique', label: 'Versement périodique mensuel (€)', min: 0, step: 50 },
    { key: 'tauxAnnuel', label: 'Taux d’intérêt annuel (%)', min: 0, max: 100, step: 0.01, minFractionDigits: 2, maxFractionDigits: 2 },
    { key: 'dureeAnnees', label: 'Durée (années)', min: 1, step: 1 }
  ];

  actifs: Actif[] = [
    {
      nom: '',
      capitalInitial: null,
      versementPeriodique: null,
      tauxAnnuel: null,
      dureeAnnees: null,
    }
  ];

  resultat: string | null = null;
  afficherGraph = false;

  lineChartLabels: string[] = [];
  lineChartData: any[] = [];

  chartOptions: any = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Évolution du capital avec intérêts composés'
      },
      tooltip: {
        mode: 'nearest',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        titleFont: {
          size: 18
        },
        bodyFont: {
          size: 16
        },
        padding: 20,
        cornerRadius: 8,
        titleColor: '#ffffff',
        bodyColor: '#eeeeee',
        callbacks: {
          label: (context: any) =>
            context.dataset.label + ': ' + context.parsed.y.toLocaleString('fr-FR') + ' €'
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    elements: {
      point: { radius: 0 }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => value.toLocaleString('fr-FR') + ' €'
        }
      }
    }
  };

  ajouterActif() {
    this.actifs.push({
      nom: '',
      capitalInitial: null,
      versementPeriodique: null,
      tauxAnnuel: null,
      dureeAnnees: null
    });
  }

  supprimerActif(index: number) {
    this.actifs.splice(index, 1);
  }

  estValide(): boolean {
    return this.actifs.every(actif =>
      typeof actif.nom === 'string' && actif.nom.trim().length > 0 &&
      typeof actif.capitalInitial === 'number' && actif.capitalInitial >= 0 &&
      typeof actif.versementPeriodique === 'number' && actif.versementPeriodique >= 0 &&
      typeof actif.tauxAnnuel === 'number' && actif.tauxAnnuel >= 0 && actif.tauxAnnuel <= 100 &&
      typeof actif.dureeAnnees === 'number' && actif.dureeAnnees >= 1
    );
  }

  calculerValeurFuture(actif: Actif): number {
    const P = actif.capitalInitial ?? 0;
    const PMT = actif.versementPeriodique ?? 0;
    const r = (actif.tauxAnnuel ?? 0) / 100 / 12;
    const n = (actif.dureeAnnees ?? 0) * 12;

    let valeur = P;
    for (let i = 1; i <= n; i++) {
      valeur = valeur * (1 + r) + PMT;
    }
    return valeur;
  }

  calculer() {
    if (!this.estValide()) {
      this.resultat = "Veuillez remplir correctement tous les champs (nom obligatoire).";
      this.afficherGraph = false;
      return;
    }

    const labels: string[] = [];
    const datasets: any[] = [];

    const dureeMax = Math.max(...this.actifs.map(a => (a.dureeAnnees ?? 0) * 12));
    const cumulesParMois = new Array(dureeMax + 1).fill(0);
    const totalSansInterets = new Array(dureeMax + 1).fill(0);

    for (let m = 0; m <= dureeMax; m++) {
      const annee = Math.floor(m / 12);
      const mois = (m % 12) + 1;
      labels.push(`Année ${annee + 1} - Mois ${mois}`);
    }


    this.actifs.forEach((actif, idx) => {
      const r = (actif.tauxAnnuel ?? 0) / 100 / 12;
      let valeur = actif.capitalInitial ?? 0;
      const values: number[] = [valeur];
      const duree = (actif.dureeAnnees ?? 0) * 12;
      for (let mois = 1; mois <= duree; mois++) {
        valeur = valeur * (1 + r) + (actif.versementPeriodique ?? 0);
        values.push(+valeur.toFixed(2));
      }

      const valeurFinale = values[values.length - 1];
      while (values.length <= dureeMax) {
        values.push(valeurFinale);
      }

      for (let i = 0; i <= dureeMax; i++) {
        cumulesParMois[i] += (values[i] || 0);
      }

      datasets.push({
        data: values,
        label: actif.nom || `Actif ${idx + 1}`,
        borderColor: this.couleurActif(idx),
        fill: false,
        tension: 0.3
      });

      const totalApports: number[] = [];
      const capitalInit = actif.capitalInitial ?? 0;
      const versement = actif.versementPeriodique ?? 0;

      for (let mois = 0; mois <= dureeMax; mois++) {
        const versementsValides = mois <= duree ? mois * versement : duree * versement;
        const total = capitalInit + versementsValides;
        totalApports.push(total);
        totalSansInterets[mois] += total;
      }

      datasets.push({
        data: totalApports,
        label: (actif.nom || `Actif ${idx + 1}`) + ' (sans intérêts)',
        borderColor: this.couleurClair(idx),
        borderDash: [4, 2],
        fill: false,
        tension: 0.3
      });
    });

    datasets.push({
      data: cumulesParMois,
      label: 'Total cumulé (avec intérêts)',
      borderColor: 'black',
      borderWidth: 2,
      fill: false,
      tension: 0.3
    });

    datasets.push({
      data: totalSansInterets,
      label: 'Total cumulé (sans intérêts)',
      borderColor: 'gray',
      borderDash: [8, 4],
      borderWidth: 2,
      fill: false,
      tension: 0.3
    });

    this.lineChartLabels = labels;
    this.lineChartData = datasets;

    let texteResultat = 'Résultats par actif :\n';
    this.actifs.forEach((actif, idx) => {
      const vf = this.calculerValeurFuture(actif);
      texteResultat += `- ${actif.nom || 'Actif ' + (idx + 1)} : ${vf.toFixed(2)} € après ${(actif.dureeAnnees ?? 0)} an(s)\n`;
    });

    const total = cumulesParMois[dureeMax];
    const totalSimple = totalSansInterets[dureeMax];
    texteResultat += `\nTotal cumulé de tous les actifs (avec intérêts) : ${total.toFixed(2)} €`;
    texteResultat += `\nTotal cumulé de tous les actifs (sans intérêts) : ${totalSimple.toFixed(2)} €`;

    this.resultat = texteResultat;
    this.afficherGraph = true;
  }

  couleurActif(index: number): string {
    const couleurs = ['blue', 'green', 'red', 'orange', 'purple', 'brown', 'cyan', 'magenta'];
    return couleurs[index % couleurs.length];
  }

  couleurClair(index: number): string {
    const couleursClaires = ['lightblue', 'lightgreen', 'pink', 'wheat', 'plum', 'burlywood', 'lightcyan', 'thistle'];
    return couleursClaires[index % couleursClaires.length];
  }
}
