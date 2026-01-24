import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getSimulatorUpdateInfo, formatUpdateDate, SimulatorUpdateInfo } from '../../data/simulator-dates';

@Component({
  selector: 'app-update-block',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="update-block" *ngIf="updateInfo">
      <div class="update-icon">
        <i class="pi pi-refresh"></i>
      </div>
      <div class="update-content">
        <span class="update-label">Dernière mise à jour :</span>
        <span class="update-date">{{ formattedDate }}</span>
        <span class="update-version" *ngIf="updateInfo.version">v{{ updateInfo.version }}</span>
      </div>
    </div>
  `,
  styles: [`
    .update-block {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
      border-radius: 8px;
      border-left: 4px solid #4caf50;
      margin: 1rem 0;
    }

    .update-icon {
      width: 32px;
      height: 32px;
      min-width: 32px;
      background: rgba(76, 175, 80, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        color: #2e7d32;
        font-size: 1rem;
      }
    }

    .update-content {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem;
    }

    .update-label {
      color: #2e7d32;
      font-size: 0.9rem;
    }

    .update-date {
      color: #1b5e20;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .update-version {
      background: #4caf50;
      color: white;
      padding: 0.15rem 0.5rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    :host-context(html.dark-mode) {
      .update-block {
        background: linear-gradient(135deg, rgba(76, 175, 80, 0.15) 0%, rgba(76, 175, 80, 0.1) 100%);
        border-left-color: #4ade80;
      }

      .update-icon {
        background: rgba(74, 222, 128, 0.2);

        i {
          color: #4ade80;
        }
      }

      .update-label {
        color: #86efac;
      }

      .update-date {
        color: #4ade80;
      }

      .update-version {
        background: #22c55e;
      }
    }
  `]
})
export class UpdateBlockComponent implements OnInit {
  @Input() simulatorId: string = '';
  @Input() customDate?: string; // Format: 'YYYY-MM-DD'

  updateInfo: SimulatorUpdateInfo | null = null;
  formattedDate: string = '';

  ngOnInit(): void {
    if (this.customDate) {
      this.updateInfo = { lastUpdate: this.customDate };
      this.formattedDate = formatUpdateDate(this.customDate);
    } else if (this.simulatorId) {
      this.updateInfo = getSimulatorUpdateInfo(this.simulatorId);
      if (this.updateInfo) {
        this.formattedDate = formatUpdateDate(this.updateInfo.lastUpdate);
      }
    }
  }
}
