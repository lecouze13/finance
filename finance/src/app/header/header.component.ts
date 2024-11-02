import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule,CommonModule,MenubarModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent  implements OnInit{
  items: MenuItem[] | undefined;

    constructor(private router: Router) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Finance',
                icon: 'pi pi-palette',
                
            },
           
            {
                label: 'Immobilier',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Rendement',
                        command: () => {
                          this.router.navigate(['/rendement']);
                      }                    },
                      {
                        label: 'Cash flow',
                        command: () => {
                          this.router.navigate(['/rendement']);
                      }                    },
                ]
            }
            ,
            {
                label: 'Finance',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Budget',
                        command: () => {
                          this.router.navigate(['/budget']);
                      }                    },
                      {
                        label: 'Investissement',
                        command: () => {
                          this.router.navigate(['/investissement']);
                      }                    },
                ]
            }
        ];
    }
}