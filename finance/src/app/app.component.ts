import { Component, inject, OnInit } from "@angular/core";
import { AnalyticsService } from "./shared/services/analytics.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false
})
export class AppComponent implements OnInit {
  private analyticsService = inject(AnalyticsService);

  ngOnInit(): void {
    this.analyticsService.init();
  }
}
