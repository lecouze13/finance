import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { TooltipContentService, TooltipInfo } from '../../services/tooltip-content.service';

@Component({
  selector: 'app-info-tooltip',
  standalone: true,
  imports: [CommonModule, TooltipModule],
  template: `
    <span class="info-tooltip-trigger"
          [pTooltip]="tooltipContent"
          [tooltipPosition]="position"
          [escape]="false"
          tooltipStyleClass="info-tooltip-popup">
      <i class="pi pi-info-circle"></i>
    </span>
  `,
  styles: [`
    .info-tooltip-trigger {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      margin-left: 0.35rem;
      cursor: help;
      color: #6c757d;
      transition: color 0.2s;

      &:hover {
        color: #1976d2;
      }

      i {
        font-size: 0.9rem;
      }
    }

    :host ::ng-deep .info-tooltip-popup {
      max-width: 320px;
      font-size: 0.85rem;
      line-height: 1.5;
      padding: 0.75rem 1rem;
      background: #1e3a5f;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

      strong {
        color: #64b5f6;
        display: block;
        margin-bottom: 0.5rem;
      }

      em {
        display: block;
        margin-top: 0.5rem;
        padding-top: 0.5rem;
        border-top: 1px solid rgba(255,255,255,0.15);
        color: #a5d6a7;
        font-style: normal;
      }
    }
  `]
})
export class InfoTooltipComponent implements OnInit {
  @Input() category: string = '';
  @Input() tooltipKey: string = '';
  @Input() customContent: string = '';
  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'top';

  tooltipContent: string = '';
  tooltipInfo: TooltipInfo | null = null;

  constructor(private tooltipService: TooltipContentService) {}

  ngOnInit(): void {
    if (this.customContent) {
      this.tooltipContent = this.customContent;
    } else if (this.category && this.tooltipKey) {
      this.tooltipInfo = this.tooltipService.getTooltip(this.category, this.tooltipKey);
      if (this.tooltipInfo) {
        this.tooltipContent = this.tooltipService.formatTooltipHtml(this.tooltipInfo);
      }
    }
  }
}
