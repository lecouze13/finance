import { Component, Inject, Input, PLATFORM_ID, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeoService } from '../../service/seo.service';
import { ActivatedRoute } from '@angular/router';
import { livretsSimu } from './livret.page';
import { isPlatformBrowser } from '@angular/common';
import { livrets } from '../livrets.model';

@Component({
  selector: 'app-simulateur-livret',
  templateUrl: './simulateur-livret.component.html',
  styleUrl: './simulateur-livret.component.scss'
})
export class SimulateurLivretComponent {
  @Input() title: string | undefined
  @Input() taux: number | undefined
  @Input() text: any | undefined

  capitalFinal: number | null = null;
  interets: number | null = null;
  form!: FormGroup;
  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
   


      const fullPath = this.route.routeConfig?.path ?? '';
      const match = fullPath.match(/^simulateur-livret\/([^/]+)\/?$/);
      const type = match?.[1] ?? ''; 

      const livret = livretsSimu[type ?? ''];
      if (!livret) {
        this.title = 'Livret inconnu';
        return;
      }

      this.title = livret.title;
      this.taux = livret.taux;
      this.text =livrets[type]['contenu']

      const description = `Calculez les intérêts générés avec le ${this.title?.replace('Simulateur ', '')} grâce à notre outil simple et rapide.`;
      const keywords = `simulateur ${type}, ${type} taux, calcul intérêts ${type}, livret épargne ${type}, simulation ${type}, rendement ${type}`;

      this.seo.updateMetaData({
        title: this.title,
        description,
        url: `https://calculateurfinance.fr/simulateur-livret/${type}`,
        keywords,
  });
      this.form = this.fb.group({
        capital: [null, [Validators.required, Validators.min(0)]],
        duree: [null, [Validators.required, Validators.min(1)]],
        taux: [{ value: this.taux, disabled: true }, [Validators.required]],
      });
    }

  }
  constructor(private fb: FormBuilder, private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: any,
    private renderer: Renderer2,
    private seo: SeoService) {

  }
  calculer(): void {
    if (this.form.invalid) {
      this.capitalFinal = null;
      this.interets = null;
      return;
    }

    const rawValues = this.form.getRawValue();
const capital = rawValues.capital;
const duree = rawValues.duree;
const taux = rawValues.taux / 100;
    // Formule des intérêts composés : Cf = C0 × (1 + t)^n
    const capitalFinal = capital * Math.pow(1 + taux, duree);
    const interets = capitalFinal - capital;

    this.capitalFinal = Math.round(capitalFinal * 100) / 100;
    this.interets = Math.round(interets * 100) / 100;

  }

}
