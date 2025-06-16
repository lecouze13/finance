import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(  @Inject(PLATFORM_ID) private platformId: any, 
) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const url = window.location.href;
      if (
        url.includes('rendement') ||
        url.includes('budget') ||
        url.includes('investissement') ||
        url.includes('cashflow')
      ) {
      }
    }
  }
}
