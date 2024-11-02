import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { Button } from 'primeng/button';
import { RendementComponent } from './rendement/rendement.component';
import { FooterComponent } from './footer/footer.component';
import{CommonModule} from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, Button, RendementComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isHomeRoute = true;
  ngOnInit(): void {
    const url = window.location.href;
    let lastSegment = url.substring(url.lastIndexOf('/') + 1); 
    if(lastSegment===''){
      this.isHomeRoute = false;
    }
  }
  title = 'finance';
  
}
