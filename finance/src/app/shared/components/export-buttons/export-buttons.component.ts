import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ExportService, ExportData } from '../../services/export.service';

@Component({
  selector: 'app-export-buttons',
  standalone: true,
  imports: [CommonModule, ButtonModule, TooltipModule],
  template: `
    <div class="export-buttons" [class.vertical]="vertical">
      <button pButton
              type="button"
              icon="pi pi-file-pdf"
              [label]="showLabels ? 'PDF' : ''"
              class="p-button-outlined p-button-danger"
              pTooltip="Exporter en PDF"
              tooltipPosition="top"
              (click)="onExportPDF()">
      </button>
      <button pButton
              type="button"
              icon="pi pi-file-excel"
              [label]="showLabels ? 'CSV' : ''"
              class="p-button-outlined p-button-success"
              pTooltip="Exporter en CSV"
              tooltipPosition="top"
              (click)="onExportCSV()">
      </button>
      <button pButton
              *ngIf="showPrint"
              type="button"
              icon="pi pi-print"
              [label]="showLabels ? 'Imprimer' : ''"
              class="p-button-outlined p-button-secondary"
              pTooltip="Imprimer"
              tooltipPosition="top"
              (click)="onPrint()">
      </button>
      <button pButton
              *ngIf="showCopy"
              type="button"
              icon="pi pi-copy"
              [label]="showLabels ? 'Copier' : ''"
              class="p-button-outlined p-button-info"
              pTooltip="Copier dans le presse-papier"
              tooltipPosition="top"
              (click)="onCopy()">
      </button>
    </div>
  `,
  styles: [`
    .export-buttons {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .export-buttons.vertical {
      flex-direction: column;
    }
    :host ::ng-deep .p-button {
      padding: 0.5rem 0.75rem;
    }
    :host ::ng-deep .p-button.p-button-outlined {
      border-width: 1px;
    }
  `]
})
export class ExportButtonsComponent {
  @Input() exportData!: ExportData;
  @Input() filename?: string;
  @Input() showLabels: boolean = true;
  @Input() showPrint: boolean = false;
  @Input() showCopy: boolean = false;
  @Input() vertical: boolean = false;

  @Output() exported = new EventEmitter<'pdf' | 'csv' | 'print' | 'copy'>();
  @Output() beforeExport = new EventEmitter<void>();

  constructor(private exportService: ExportService) {}

  onExportPDF(): void {
    this.beforeExport.emit();
    setTimeout(() => {
      this.exportService.exportToPDF(this.exportData, this.filename);
      this.exported.emit('pdf');
    }, 100);
  }

  onExportCSV(): void {
    this.beforeExport.emit();
    setTimeout(() => {
      this.exportService.exportToCSV(this.exportData, this.filename);
      this.exported.emit('csv');
    }, 100);
  }

  onPrint(): void {
    this.beforeExport.emit();
    setTimeout(() => {
      this.exportService.exportToPDF(this.exportData, this.filename);
      this.exported.emit('print');
    }, 100);
  }

  onCopy(): void {
    this.beforeExport.emit();
    const text = this.generateTextContent();
    navigator.clipboard.writeText(text).then(() => {
      this.exported.emit('copy');
    });
  }

  private generateTextContent(): string {
    const lines: string[] = [];
    lines.push(this.exportData.title);
    if (this.exportData.subtitle) lines.push(this.exportData.subtitle);
    lines.push('');

    this.exportData.sections.forEach(section => {
      lines.push(`--- ${section.title} ---`);
      section.rows.forEach(row => {
        lines.push(`${row.label}: ${row.value}`);
      });
      lines.push('');
    });

    return lines.join('\n');
  }
}
