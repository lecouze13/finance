import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-simulateur-generic',
  standalone: true,
  imports: [],
  templateUrl: './simulateur-generic.component.html'
})
export class SimulateurGenericComponent {
@Input() faq:any;
@Input() courbe:any;
@Input() tab:any;
@Input() textExplicatif:any;
@Input() titre:any;
@Input() resultat:any;
 resultats:any= "eeeee"
}
