import { Injectable } from '@angular/core';

export interface ExportData {
  title: string;
  subtitle?: string;
  date: Date;
  sections: ExportSection[];
}

export interface ExportSection {
  title: string;
  rows: ExportRow[];
}

export interface ExportRow {
  label: string;
  value: string | number;
  highlight?: boolean;
  type?: 'currency' | 'percent' | 'number' | 'text';
}

export interface TableExportData {
  headers: string[];
  rows: (string | number)[][];
}

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() {}

  /**
   * Formate une valeur selon son type
   */
  private formatValue(value: string | number, type?: string): string {
    if (typeof value === 'string') return value;

    switch (type) {
      case 'currency':
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
      case 'percent':
        return `${value.toFixed(2)} %`;
      case 'number':
        return new Intl.NumberFormat('fr-FR').format(value);
      default:
        return String(value);
    }
  }

  /**
   * Export les données en CSV
   */
  exportToCSV(data: ExportData, filename?: string): void {
    const lines: string[] = [];

    // En-tête
    lines.push(data.title);
    if (data.subtitle) lines.push(data.subtitle);
    lines.push(`Généré le ${this.formatDate(data.date)}`);
    lines.push('');

    // Sections
    data.sections.forEach(section => {
      lines.push(section.title);
      section.rows.forEach(row => {
        const value = this.formatValue(row.value, row.type);
        lines.push(`${row.label};${value}`);
      });
      lines.push('');
    });

    const csvContent = lines.join('\n');
    this.downloadFile(csvContent, filename || this.generateFilename(data.title, 'csv'), 'text/csv;charset=utf-8;');
  }

  /**
   * Export un tableau en CSV
   */
  exportTableToCSV(headers: string[], rows: (string | number)[][], filename: string): void {
    const lines: string[] = [];

    // En-têtes
    lines.push(headers.join(';'));

    // Données
    rows.forEach(row => {
      lines.push(row.map(cell => {
        if (typeof cell === 'number') {
          return new Intl.NumberFormat('fr-FR').format(cell);
        }
        return String(cell);
      }).join(';'));
    });

    const csvContent = lines.join('\n');
    this.downloadFile(csvContent, filename, 'text/csv;charset=utf-8;');
  }

  /**
   * Export les données en PDF (génération HTML simple imprimable)
   */
  exportToPDF(data: ExportData, filename?: string): void {
    const htmlContent = this.generatePDFHtml(data);
    this.printHtml(htmlContent, filename || this.generateFilename(data.title, 'pdf'));
  }

  /**
   * Génère le HTML pour l'export PDF
   */
  private generatePDFHtml(data: ExportData): string {
    let sectionsHtml = '';

    data.sections.forEach(section => {
      let rowsHtml = '';
      section.rows.forEach(row => {
        const value = this.formatValue(row.value, row.type);
        const highlightClass = row.highlight ? 'highlight' : '';
        rowsHtml += `
          <tr class="${highlightClass}">
            <td class="label">${row.label}</td>
            <td class="value">${value}</td>
          </tr>
        `;
      });

      sectionsHtml += `
        <div class="section">
          <h3>${section.title}</h3>
          <table>
            <tbody>${rowsHtml}</tbody>
          </table>
        </div>
      `;
    });

    return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>${data.title}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            padding: 40px;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #1e3a5f;
          }
          h1 { color: #1e3a5f; font-size: 24px; margin-bottom: 5px; }
          .subtitle { color: #666; font-size: 14px; }
          .date { color: #999; font-size: 12px; margin-top: 10px; }
          .section { margin-bottom: 25px; }
          h3 {
            color: #1e3a5f;
            font-size: 16px;
            margin-bottom: 10px;
            padding: 8px 12px;
            background: #f0f4f8;
            border-left: 4px solid #1976d2;
          }
          table { width: 100%; border-collapse: collapse; }
          tr { border-bottom: 1px solid #e9ecef; }
          tr:last-child { border-bottom: none; }
          tr.highlight { background: #e8f5e9; }
          tr.highlight .value { color: #2e7d32; font-weight: 700; }
          td { padding: 10px 12px; }
          .label { color: #666; }
          .value { text-align: right; font-weight: 600; color: #1e3a5f; }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            text-align: center;
            font-size: 11px;
            color: #999;
          }
          @media print {
            body { padding: 20px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${data.title}</h1>
          ${data.subtitle ? `<p class="subtitle">${data.subtitle}</p>` : ''}
          <p class="date">Généré le ${this.formatDate(data.date)}</p>
        </div>

        ${sectionsHtml}

        <div class="footer">
          <p>Document généré par CalculateurFinance.fr</p>
          <p>Les résultats sont donnés à titre indicatif et ne constituent pas un conseil financier.</p>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Ouvre une fenêtre d'impression avec le HTML généré
   */
  private printHtml(htmlContent: string, filename: string): void {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();

      // Attendre le chargement puis imprimer
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  }

  /**
   * Télécharge un fichier
   */
  private downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob(['\ufeff' + content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  /**
   * Formate une date
   */
  private formatDate(date: Date): string {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  /**
   * Génère un nom de fichier
   */
  private generateFilename(title: string, extension: string): string {
    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const date = new Date().toISOString().split('T')[0];
    return `${slug}_${date}.${extension}`;
  }
}
