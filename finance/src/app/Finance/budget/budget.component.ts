import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';
import { SeoService } from '../../Constructor/service/seo.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-budget',

  providers: [MessageService],
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  private dataSubject = new BehaviorSubject<any>(this.initializeData());
  @ViewChild('myChart', { static: false }) myChart!: ElementRef;
  @ViewChild('cashflowElement', { static: false }) cashflowElement!: ElementRef;

  data$ = this.dataSubject.asObservable(); // Observable pour les données du graphique
  labels: string[] = [];
  labelsRevenue: string[] = [];
  labelsCategories: string[] = [];
  options: any;
  depense = 0;
  sommeDepense = 0;
  sommeRevenue = 0;
  nomDepense: string = '';
  categoriesDepense: string = '';
  revenue: number = 0;
  nomRevenue: string = '';
  cashflow: number = 0;
  updatedData: any;
  isCompare: boolean = false;
  categories: { label: string; value: string } = { label: '', value: '' };
  revenueData: { nomRevenue: string; revenue: number }[] = [];
  categoriesList: { label: string; value: string }[] =
    [{ label: 'Dépenses essentiels', value: 'essentiels' }, { label: 'Sorties-Loisirs', value: 'loisirs' }, { label: 'Epargne', value: 'epargne' }];

  constructor(@Inject(PLATFORM_ID) private platformId: any,
    private renderer: Renderer2, private seo: SeoService) { }

  ngOnInit() {
    this.seo.updateMetaData({
      title: 'Simulateur de budget personnel 2025 | CalculateurFinance.fr',
      description: 'Gérez et optimisez votre budget personnel avec notre simulateur simple et gratuit. Suivez vos dépenses et vos revenus facilement.',
      url: 'https://www.calculateurfinance.fr/simulateur-budget',
      // image: 'https://www.calculateurfinance.fr/assets/simulateur-budget-preview.png'
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
            "name": "Pourquoi utiliser un outil de gestion de budget ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Un outil de gestion de budget vous aide à mieux contrôler vos finances, à suivre vos revenus et vos dépenses, et à éviter les découverts ou les déficits en fin de mois."
            }
          },
          {
            "@type": "Question",
            "name": "À quoi sert la gestion de budget au quotidien ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Elle vous permet de prendre de meilleures décisions financières, de prévoir vos dépenses, d’anticiper les imprévus, et de mettre de l’argent de côté régulièrement."
            }
          },
          {
            "@type": "Question",
            "name": "Quels sont les avantages de suivre ses dépenses ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Suivre ses dépenses permet d’identifier les postes coûteux, d’adapter son mode de vie à ses moyens, et de limiter les achats impulsifs."
            }
          },
          {
            "@type": "Question",
            "name": "Comment un outil de budget peut-il m’aider à épargner ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "En visualisant vos excédents mensuels, vous pouvez définir un objectif d’épargne réaliste et suivre vos progrès vers ce but."
            }
          },
          {
            "@type": "Question",
            "name": "Est-ce que la catégorisation des dépenses est utile ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Oui, catégoriser ses dépenses aide à comprendre ses habitudes de consommation et à détecter facilement les postes sur lesquels vous pouvez économiser."
            }
          },
          {
            "@type": "Question",
            "name": "Quels types de revenus et de dépenses faut-il renseigner ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Il faut indiquer tous les revenus nets (salaires, aides, pensions) ainsi que les dépenses fixes (loyer, abonnements) et variables (alimentation, loisirs, transport)."
            }
          },
          {
            "@type": "Question",
            "name": "Est-ce que je peux comparer mes finances avec d'autres ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Oui, certaines fonctionnalités vous permettent de comparer vos chiffres avec des moyennes nationales pour situer votre niveau de dépenses."
            }
          },
          {
            "@type": "Question",
            "name": "Est-ce que cet outil est adapté aux débutants en gestion ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Oui, l’outil est conçu pour être simple d’utilisation, même pour ceux qui débutent dans la gestion financière personnelle."
            }
          },
          {
            "@type": "Question",
            "name": "Pourquoi est-il important de connaître son solde mensuel ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Connaître votre solde permet de savoir si vos revenus couvrent vos dépenses, d’éviter le surendettement et de planifier sereinement les mois à venir."
            }
          },
          {
            "@type": "Question",
            "name": "L’outil est-il gratuit et accessible à tous ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Oui, notre outil est gratuit, sans inscription obligatoire, et accessible depuis tout type d’appareil (ordinateur, smartphone, tablette)."
            }
          }
        ]

      });
      this.renderer.appendChild(document.head, script);


      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.options = {
        cutout: '60%',
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        }
      };

    this.data$.subscribe(data => {
      this.data$ = data;
    });

    var storedData = JSON.parse(localStorage.getItem('data') || '{}');
    var storedRevenue = JSON.parse(localStorage.getItem('revenue') || '{}');
    this.revenueData = storedRevenue;
    for (var i = 0; i < storedRevenue.length; i++) {

      this.revenue = storedRevenue[i].revenue;
      this.sommeRevenue += this.revenue;
      this.cashflow = this.sommeRevenue - this.sommeDepense;
    }
    for (var i = 0; i < storedData.length; i++) {
      this.labels.push(storedData[i].nomDepense);
      this.depense = storedData[i].depense;
      this.labelsCategories.push(storedData[i].categories);
      this.sommeDepense += this.depense;
      this.cashflow = this.sommeRevenue - this.sommeDepense;

      this.updatedData = {
        ...this.dataSubject.getValue(),
        labels: this.labels,
        datasets: [{
          ...this.dataSubject.getValue().datasets[0],
          data: [...this.dataSubject.getValue().datasets[0].data, this.depense]
        }]
      };
      this.dataSubject.next(this.updatedData);
    }
  }
  }

  private initializeData() {
    return {
      labels: this.labels,
      datasets: [
        {
          data: [],
          backgroundColor: [
            '#3F51B5',
            '#4CAF50',
            '#FFEB3B',
            '#FF9800',
            '#9C27B0',
            '#E91E63',
            '#00BCD4',
            '#8BC34A',
            '#FFC107',
            '#FF5722',
            '#607D8B',
            '#795548',
            '#CDDC39',
            '#FF4081',
            '#9E9E9E'
          ],
          hoverBackgroundColor: [
            '#303F9F',
            '#388E3C',
            '#FBC02D',
            '#F57C00',
            '#7B1FA2',
            '#C2185B',
            '#0097A7',
            '#689F38',
            '#FFA000',
            '#E64A19',
            '#455A64',
            '#5D4037',
            '#AFB42B',
            '#F50057',
            '#616161'
          ]
        }
      ]
    };
  }

  addElement() {

    if (this.nomDepense && this.depense >= 0) {
      this.labels.push(this.nomDepense);
      this.labelsCategories.push(this.categories.label);
      this.updatedData = {
        ...this.dataSubject.getValue(),
        labels: this.labels,
        datasets: [{
          ...this.dataSubject.getValue().datasets[0],
          data: [...this.dataSubject.getValue().datasets[0].data, this.depense]
        }]
      };
    if (isPlatformBrowser(this.platformId)) {

      var storedData = [];
      if (localStorage.getItem('data') !== null) {
        storedData = JSON.parse(localStorage.getItem('data') || '{}');
      }
      storedData[storedData.length] = { nomDepense: this.nomDepense, depense: this.depense, categories: this.categories.label };

      localStorage.setItem('data', JSON.stringify(storedData));

      this.sommeDepense += this.depense;
      this.cashflow = this.sommeRevenue - this.sommeDepense;

      this.dataSubject.next(this.updatedData);
      this.nomDepense = '';
      this.depense = 0;
      this.categories = { label: '', value: '' };
    }

    }

  }

  addRevenue() {
    if (isPlatformBrowser(this.platformId)) {


    if (this.nomRevenue && this.revenue >= 0) {
      this.sommeRevenue += this.revenue;
      this.cashflow = this.sommeRevenue - this.sommeDepense;

      var storedRevenue = [];
      if (localStorage.getItem('revenue') !== null) {
        storedRevenue = JSON.parse(localStorage.getItem('revenue') || '{}');
      }
      storedRevenue[storedRevenue.length] = { nomRevenue: this.nomRevenue, revenue: this.revenue };
      this.revenueData = storedRevenue;
      localStorage.setItem('revenue', JSON.stringify(storedRevenue));
      this.labelsRevenue.push(this.nomRevenue);
      this.nomRevenue = '';
      this.revenue = 0;
    }
    }
  }
  reset() {
        if (isPlatformBrowser(this.platformId)) {

    localStorage.clear();
    this.labels = [];
    this.sommeDepense = 0;
    this.sommeRevenue = 0;
    this.cashflow = 0;
    this.depense = 0;
    this.revenue = 0;
    this.nomDepense = '';
    this.nomRevenue = '';
    this.dataSubject.next(this.initializeData());
    this.updatedData = undefined
    this.categoriesDepense = '';
    this.categories = { label: '', value: '' };
        }
  }

  delete(index: number) {
        if (isPlatformBrowser(this.platformId)) {

    this.sommeDepense -= this.dataSubject.getValue().datasets[0].data[index];
    this.cashflow = this.sommeRevenue - this.sommeDepense;
    this.dataSubject.getValue().datasets[0].data.splice(index, 1);
    this.dataSubject.getValue().labels.splice(index, 1);
    console.log(this.labelsCategories)
    this.labelsCategories.splice(index, 1);

    this.updatedData = {
      ...this.dataSubject.getValue(),
      labels: this.labels,
      datasets: [{
        ...this.dataSubject.getValue().datasets[0],
        data: [...this.dataSubject.getValue().datasets[0].data]
      }]
    };
    if (this.updatedData.datasets[0].data.length == 0 && this.revenueData.length == 0) {
      this.updatedData = undefined
      this.dataSubject.next(this.initializeData());
    }
    else {
      this.dataSubject.next(this.updatedData);
    }
    var storedData = JSON.parse(localStorage.getItem('data') || '{}');
    storedData.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(storedData));
  }
  }
  delete2(index: number) {
        if (isPlatformBrowser(this.platformId)) {

    this.sommeRevenue -= this.revenueData[index].revenue;
    this.cashflow = this.sommeRevenue - this.sommeDepense;

    this.revenueData.splice(index, 1);
    localStorage.setItem('revenue', JSON.stringify(this.revenueData));
    if (this.updatedData.datasets[0].data.length == 0 && this.revenueData.length == 0) {
      this.updatedData = undefined
      this.dataSubject.next(this.initializeData());
    }
    else {
      this.dataSubject.next(this.updatedData);
    }

    localStorage.setItem('revenue', JSON.stringify(this.revenueData));
        }
  }
  compare() {
    this.isCompare = !this.isCompare;
  }

  onCompareChange(isCompare: boolean) {
    this.isCompare = isCompare;
    console.log('L\'état de la comparaison a changé:', this.isCompare);
  }
}
