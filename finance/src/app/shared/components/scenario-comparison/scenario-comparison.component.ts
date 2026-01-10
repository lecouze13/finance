import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import { Subscription } from 'rxjs';
import {
  ScenarioComparisonService,
  ScenarioData,
  ScenarioResult,
  ComparisonMetric
} from '../../services/scenario-comparison.service';

@Component({
  selector: 'app-scenario-comparison',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, TooltipModule, PanelModule],
  template: `
    <div class="comparison-container" *ngIf="scenarios.length > 0 || showEmpty">
      <p-panel [header]="panelTitle" styleClass="comparison-panel" [toggleable]="true" [collapsed]="collapsed">
        <!-- Actions header -->
        <div class="comparison-header">
          <div class="scenario-count">
            <i class="pi pi-chart-bar"></i>
            <span>{{ scenarios.length }} / {{ maxScenarios }} scénarios</span>
          </div>
          <div class="comparison-actions">
            <button pButton
                    type="button"
                    icon="pi pi-plus"
                    label="Ajouter"
                    class="p-button-sm p-button-success"
                    [disabled]="!canAdd"
                    pTooltip="Sauvegarder le scénario actuel"
                    (click)="onAddScenario()">
            </button>
            <button pButton
                    type="button"
                    icon="pi pi-trash"
                    label="Tout effacer"
                    class="p-button-sm p-button-danger p-button-outlined"
                    [disabled]="scenarios.length === 0"
                    (click)="onClearAll()">
            </button>
          </div>
        </div>

        <!-- Message si aucun scénario -->
        <div class="empty-state" *ngIf="scenarios.length === 0">
          <i class="pi pi-info-circle"></i>
          <p>Cliquez sur "Ajouter" pour sauvegarder votre simulation actuelle et la comparer avec d'autres configurations.</p>
        </div>

        <!-- Tableau de comparaison -->
        <div class="comparison-table-wrapper" *ngIf="scenarios.length > 0">
          <table class="comparison-table">
            <thead>
              <tr>
                <th class="metric-header">Métrique</th>
                <th *ngFor="let scenario of scenarios"
                    [style.border-top-color]="scenario.color"
                    class="scenario-header">
                  <div class="scenario-header-content">
                    <input type="text"
                           class="scenario-name-input"
                           [(ngModel)]="scenario.name"
                           (blur)="onUpdateName(scenario)"
                           (keyup.enter)="onUpdateName(scenario)">
                    <button class="remove-btn"
                            pTooltip="Supprimer ce scénario"
                            (click)="onRemoveScenario(scenario.id)">
                      <i class="pi pi-times"></i>
                    </button>
                  </div>
                  <span class="scenario-date">{{ scenario.timestamp | date:'dd/MM HH:mm' }}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let metric of displayMetrics">
                <td class="metric-label">{{ metric.label }}</td>
                <td *ngFor="let scenario of scenarios"
                    [class.best-value]="isBestValue(scenario.id, metric.key, metric.higherIsBetter)"
                    [style.background-color]="isBestValue(scenario.id, metric.key, metric.higherIsBetter) ? scenario.color + '15' : ''">
                  <span class="metric-value" [class.positive]="isPositiveValue(scenario, metric.key)">
                    {{ getFormattedValue(scenario, metric.key, metric.type) }}
                  </span>
                  <i *ngIf="isBestValue(scenario.id, metric.key, metric.higherIsBetter)"
                     class="pi pi-star-fill best-indicator"
                     [style.color]="scenario.color"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Légende -->
        <div class="comparison-legend" *ngIf="scenarios.length > 1">
          <span><i class="pi pi-star-fill"></i> Meilleure valeur</span>
        </div>
      </p-panel>
    </div>
  `,
  styles: [`
    .comparison-container { margin: 2rem 0; }

    :host ::ng-deep .comparison-panel .p-panel-header {
      background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%);
      color: white;
      border-radius: 8px 8px 0 0;
    }
    :host ::ng-deep .comparison-panel .p-panel-content { padding: 1.5rem; }

    .comparison-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e9ecef;
    }

    .scenario-count {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #6c757d;
      font-size: 0.9rem;
      i { color: #1976d2; }
    }

    .comparison-actions { display: flex; gap: 0.5rem; }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
      text-align: center;
      color: #6c757d;
      i { font-size: 2rem; color: #1976d2; margin-bottom: 1rem; }
      p { margin: 0; max-width: 400px; line-height: 1.5; }
    }

    .comparison-table-wrapper { overflow-x: auto; }

    .comparison-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;

      th, td {
        padding: 0.75rem;
        text-align: right;
        border-bottom: 1px solid #e9ecef;
      }

      th { background: #f8f9fa; font-weight: 600; }

      .metric-header {
        text-align: left;
        min-width: 150px;
        color: #495057;
      }

      .scenario-header {
        min-width: 140px;
        border-top: 3px solid;
        background: #fafbfc;
      }

      .scenario-header-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
      }

      .scenario-name-input {
        border: none;
        background: transparent;
        font-weight: 600;
        color: #1e3a5f;
        font-size: 0.85rem;
        width: 100%;
        text-align: right;
        padding: 0.25rem;
        border-radius: 4px;
        &:focus { background: white; outline: 1px solid #1976d2; }
      }

      .remove-btn {
        background: none;
        border: none;
        color: #dc3545;
        cursor: pointer;
        padding: 0.25rem;
        opacity: 0.6;
        transition: opacity 0.2s;
        &:hover { opacity: 1; }
        i { font-size: 0.8rem; }
      }

      .scenario-date {
        display: block;
        font-size: 0.75rem;
        color: #6c757d;
        font-weight: normal;
        margin-top: 0.25rem;
      }

      .metric-label {
        text-align: left;
        color: #495057;
      }

      .highlight-row { background: #f8f9fa; }

      .metric-value {
        font-weight: 500;
        &.positive { color: #28a745; }
      }

      .best-value {
        position: relative;
        font-weight: 600;
      }

      .best-indicator {
        font-size: 0.7rem;
        margin-left: 0.35rem;
      }
    }

    .comparison-legend {
      margin-top: 1rem;
      padding-top: 0.75rem;
      border-top: 1px solid #e9ecef;
      font-size: 0.8rem;
      color: #6c757d;
      span { display: flex; align-items: center; gap: 0.35rem; }
      i { color: #ffc107; font-size: 0.75rem; }
    }

    @media (max-width: 768px) {
      .comparison-header {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
      }
      .comparison-actions { justify-content: center; }
      .comparison-table th, .comparison-table td { padding: 0.5rem; font-size: 0.8rem; }
    }
  `]
})
export class ScenarioComparisonComponent implements OnInit, OnDestroy {
  @Input() simulatorType: string = '';
  @Input() panelTitle: string = 'Comparaison de scénarios';
  @Input() metrics: ComparisonMetric[] = [];
  @Input() showEmpty: boolean = true;
  @Input() collapsed: boolean = false;

  @Output() addRequested = new EventEmitter<void>();

  scenarios: ScenarioData[] = [];
  maxScenarios = 4;
  canAdd = true;

  private subscription?: Subscription;

  constructor(private comparisonService: ScenarioComparisonService) {}

  ngOnInit(): void {
    this.subscription = this.comparisonService.scenarios$.subscribe(allScenarios => {
      this.scenarios = allScenarios.filter(s => s.type === this.simulatorType);
      this.canAdd = this.comparisonService.canAddScenario();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  get displayMetrics(): ComparisonMetric[] {
    if (this.metrics.length > 0) return this.metrics;

    // Générer automatiquement les métriques depuis le premier scénario
    if (this.scenarios.length > 0) {
      return this.scenarios[0].results.map(r => ({
        key: r.label,
        label: r.label,
        type: r.type,
        higherIsBetter: this.guessHigherIsBetter(r.label)
      }));
    }
    return [];
  }

  private guessHigherIsBetter(label: string): boolean {
    const lowerLabel = label.toLowerCase();
    // Coût, frais, impôts = plus bas est mieux
    if (lowerLabel.includes('coût') || lowerLabel.includes('frais') ||
        lowerLabel.includes('impôt') || lowerLabel.includes('intérêt') ||
        lowerLabel.includes('mensualité')) {
      return false;
    }
    // Rendement, gain, économie = plus haut est mieux
    return true;
  }

  onAddScenario(): void {
    this.addRequested.emit();
  }

  onRemoveScenario(id: string): void {
    this.comparisonService.removeScenario(id);
  }

  onClearAll(): void {
    this.comparisonService.clearScenarios(this.simulatorType);
  }

  onUpdateName(scenario: ScenarioData): void {
    this.comparisonService.updateScenarioName(scenario.id, scenario.name);
  }

  getFormattedValue(scenario: ScenarioData, key: string, type: string): string {
    const result = scenario.results.find(r => r.label === key);
    if (!result) return '-';

    if (typeof result.value === 'number') {
      return this.comparisonService.formatValue(result.value, type);
    }
    return String(result.value);
  }

  isPositiveValue(scenario: ScenarioData, key: string): boolean {
    const result = scenario.results.find(r => r.label === key);
    if (!result || typeof result.value !== 'number') return false;

    const lowerKey = key.toLowerCase();
    if (lowerKey.includes('rendement') || lowerKey.includes('gain') || lowerKey.includes('économie')) {
      return result.value > 0;
    }
    return false;
  }

  isBestValue(scenarioId: string, metricKey: string, higherIsBetter?: boolean): boolean {
    if (this.scenarios.length <= 1) return false;

    const bestId = this.comparisonService.getBestScenario(
      this.scenarios,
      metricKey,
      higherIsBetter ?? this.guessHigherIsBetter(metricKey)
    );
    return bestId === scenarioId;
  }
}
