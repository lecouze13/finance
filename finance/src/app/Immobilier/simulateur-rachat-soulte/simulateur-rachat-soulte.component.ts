import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SeoService } from '../../Constructor/service/seo.service';
import { FaqSectionComponent, FaqItem } from '../../shared/faq-section/faq-section.component';

@Component({
  selector: 'app-simulateur-rachat-soulte',
  standalone: true,
  imports: [CommonModule, FormsModule, InputNumberModule, DropdownModule, ButtonModule, TooltipModule, FloatLabelModule, FaqSectionComponent],
  templateUrl: './simulateur-rachat-soulte.component.html',
  styleUrls: ['./simulateur-rachat-soulte.component.scss']
})
export class SimulateurRachatSoulteComponent implements OnInit {

  faqItems: FaqItem[] = [
    {
      question: 'Qu\'est-ce qu\'une soulte ?',
      answer: 'La soulte est la somme d\'argent qu\'un héritier doit verser aux autres co-héritiers pour devenir seul propriétaire d\'un bien indivis. Elle compense la différence de valeur entre les parts.'
    },
    {
      question: 'Comment est calculée la soulte ?',
      answer: 'La soulte = (Valeur du bien - Capital restant dû) / Nombre d\'héritiers × (Nombre d\'héritiers - 1). Il faut ensuite ajouter les frais de notaire sur le rachat.'
    },
    {
      question: 'Quels sont les frais de notaire sur un rachat de soulte ?',
      answer: 'Les frais de notaire sont calculés sur la valeur de la soulte, pas sur la valeur totale du bien. Ils représentent environ 7-8% de la soulte.'
    },
    {
      question: 'Peut-on financer un rachat de soulte par un prêt ?',
      answer: 'Oui, les banques proposent des prêts spécifiques pour le rachat de soulte. Le bien racheté sert généralement de garantie hypothécaire.'
    },
    {
      question: 'Y a-t-il des droits de succession sur le rachat de soulte ?',
      answer: 'Non, le rachat de soulte intervient après la succession. Les droits de succession sont calculés séparément sur la part héritée initialement.'
    },
    {
      question: 'Que se passe-t-il si les héritiers ne sont pas d\'accord sur la valeur ?',
      answer: 'En cas de désaccord, une expertise immobilière par un professionnel agréé peut être demandée. En dernier recours, le juge peut trancher.'
    }
  ];

  // Inputs
  valeurBien: number | null = null;
  nombreHeritiers: number | null = null;
  capitalRestantDu: number | null = null;
  partRacheteur: number | null = null; // En pourcentage si partage inégal

  // Options avancées
  partageEgal: boolean = true;
  tauxNotaire: number = 7.5; // Pourcentage par défaut
  tauxCredit: number | null = null;
  dureeCredit: number | null = null;

  // Résultats
  resultats: any = null;

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.updateMetaData({
      title: 'Simulateur Rachat de Soulte 2026 | Calcul Héritage & Indivision',
      description: 'Calculez le montant de la soulte à verser pour racheter les parts d\'un bien en indivision ou succession. Frais de notaire et financement inclus.',
      url: 'https://calculateurfinance.fr/simulateur-rachat-soulte',
      keywords: 'rachat de soulte, calcul soulte, succession immobilier, indivision, partage héritage, frais notaire soulte, financer rachat soulte'
    });
  }

  calculer(): void {
    if (!this.valeurBien || !this.nombreHeritiers || this.nombreHeritiers < 2) {
      return;
    }

    const capitalRestant = this.capitalRestantDu || 0;
    const nbHeritiers = this.nombreHeritiers;

    // Valeur nette du bien (après déduction du crédit)
    const valeurNette = this.valeurBien - capitalRestant;

    // Part de chaque héritier (partage égal)
    const partParHeritier = valeurNette / nbHeritiers;

    // Montant de la soulte = parts des autres héritiers
    const nombrePartsARacheter = nbHeritiers - 1;
    const montantSoulte = partParHeritier * nombrePartsARacheter;

    // Frais de notaire sur la soulte
    const fraisNotaire = montantSoulte * (this.tauxNotaire / 100);

    // Coût total du rachat
    const coutTotalRachat = montantSoulte + fraisNotaire;

    // Si crédit demandé
    let mensualiteCredit = 0;
    let coutTotalCredit = 0;
    let interetsTotaux = 0;

    if (this.tauxCredit && this.dureeCredit) {
      const tauxMensuel = this.tauxCredit / 100 / 12;
      const nbMensualites = this.dureeCredit * 12;

      if (tauxMensuel > 0) {
        mensualiteCredit = coutTotalRachat * (tauxMensuel * Math.pow(1 + tauxMensuel, nbMensualites)) /
                          (Math.pow(1 + tauxMensuel, nbMensualites) - 1);
        coutTotalCredit = mensualiteCredit * nbMensualites;
        interetsTotaux = coutTotalCredit - coutTotalRachat;
      }
    }

    // Détail par héritier
    const detailHeritiers = [];
    for (let i = 1; i <= nbHeritiers; i++) {
      if (i === 1) {
        detailHeritiers.push({
          nom: `Héritier ${i} (Racheteur)`,
          partInitiale: partParHeritier,
          soulteRecue: 0,
          soulteVersee: montantSoulte,
          fraisNotaire: fraisNotaire,
          total: -coutTotalRachat,
          propriete: '100%'
        });
      } else {
        detailHeritiers.push({
          nom: `Héritier ${i}`,
          partInitiale: partParHeritier,
          soulteRecue: partParHeritier,
          soulteVersee: 0,
          fraisNotaire: 0,
          total: partParHeritier,
          propriete: '0%'
        });
      }
    }

    this.resultats = {
      valeurBien: this.valeurBien,
      capitalRestant: capitalRestant,
      valeurNette: valeurNette,
      partParHeritier: partParHeritier,
      nombrePartsRachetees: nombrePartsARacheter,
      montantSoulte: montantSoulte,
      fraisNotaire: fraisNotaire,
      coutTotalRachat: coutTotalRachat,
      mensualiteCredit: mensualiteCredit,
      coutTotalCredit: coutTotalCredit,
      interetsTotaux: interetsTotaux,
      detailHeritiers: detailHeritiers
    };
  }
}
