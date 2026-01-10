import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export interface ScenarioData {
  id: string;
  name: string;
  type: string; // Type de simulateur (credit-conso, scpi, epargne, etc.)
  timestamp: Date;
  color: string;
  data: { [key: string]: any };
  results: ScenarioResult[];
}

export interface ScenarioResult {
  label: string;
  value: number;
  type: 'currency' | 'percent' | 'number' | 'text';
  highlight?: boolean;
}

export interface ComparisonConfig {
  title: string;
  metrics: ComparisonMetric[];
}

export interface ComparisonMetric {
  key: string;
  label: string;
  type: 'currency' | 'percent' | 'number' | 'text';
  higherIsBetter?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ScenarioComparisonService {
  private readonly STORAGE_KEY = 'scenario_comparisons';
  private readonly MAX_SCENARIOS = 4;
  private readonly COLORS = ['#1976d2', '#28a745', '#e65100', '#7b1fa2'];

  private scenariosSubject = new BehaviorSubject<ScenarioData[]>([]);
  public scenarios$ = this.scenariosSubject.asObservable();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.loadFromStorage();
    }
  }

  private loadFromStorage(): void {
    if (!this.isBrowser) return;

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const scenarios = JSON.parse(stored);
        // Convertir les timestamps en Date
        scenarios.forEach((s: ScenarioData) => s.timestamp = new Date(s.timestamp));
        this.scenariosSubject.next(scenarios);
      }
    } catch (e) {
      console.error('Erreur chargement scénarios:', e);
      this.scenariosSubject.next([]);
    }
  }

  private saveToStorage(): void {
    if (!this.isBrowser) return;

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.scenariosSubject.value));
    } catch (e) {
      console.error('Erreur sauvegarde scénarios:', e);
    }
  }

  addScenario(type: string, name: string, data: { [key: string]: any }, results: ScenarioResult[]): ScenarioData | null {
    const currentScenarios = this.scenariosSubject.value;

    // Limiter au nombre max de scénarios
    if (currentScenarios.length >= this.MAX_SCENARIOS) {
      return null;
    }

    // Trouver une couleur disponible
    const usedColors = currentScenarios.map(s => s.color);
    const availableColor = this.COLORS.find(c => !usedColors.includes(c)) || this.COLORS[0];

    const scenario: ScenarioData = {
      id: this.generateId(),
      name: name || `Scénario ${currentScenarios.length + 1}`,
      type,
      timestamp: new Date(),
      color: availableColor,
      data,
      results
    };

    const updated = [...currentScenarios, scenario];
    this.scenariosSubject.next(updated);
    this.saveToStorage();

    return scenario;
  }

  removeScenario(id: string): void {
    const updated = this.scenariosSubject.value.filter(s => s.id !== id);
    this.scenariosSubject.next(updated);
    this.saveToStorage();
  }

  clearScenarios(type?: string): void {
    if (type) {
      const updated = this.scenariosSubject.value.filter(s => s.type !== type);
      this.scenariosSubject.next(updated);
    } else {
      this.scenariosSubject.next([]);
    }
    this.saveToStorage();
  }

  getScenariosByType(type: string): ScenarioData[] {
    return this.scenariosSubject.value.filter(s => s.type === type);
  }

  updateScenarioName(id: string, name: string): void {
    const updated = this.scenariosSubject.value.map(s =>
      s.id === id ? { ...s, name } : s
    );
    this.scenariosSubject.next(updated);
    this.saveToStorage();
  }

  canAddScenario(): boolean {
    return this.scenariosSubject.value.length < this.MAX_SCENARIOS;
  }

  getScenariosCount(): number {
    return this.scenariosSubject.value.length;
  }

  private generateId(): string {
    return `scenario_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Utilitaires de formatage
  formatValue(value: number, type: string): string {
    switch (type) {
      case 'currency':
        return new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0
        }).format(value);
      case 'percent':
        return new Intl.NumberFormat('fr-FR', {
          style: 'percent',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(value / 100);
      case 'number':
        return new Intl.NumberFormat('fr-FR').format(value);
      default:
        return String(value);
    }
  }

  // Calculer le meilleur scénario pour une métrique donnée
  getBestScenario(scenarios: ScenarioData[], metricKey: string, higherIsBetter: boolean = true): string | null {
    if (scenarios.length === 0) return null;

    let best: ScenarioData | null = null;
    let bestValue: number | null = null;

    for (const scenario of scenarios) {
      const result = scenario.results.find(r => r.label === metricKey);
      if (result && typeof result.value === 'number') {
        if (bestValue === null ||
            (higherIsBetter && result.value > bestValue) ||
            (!higherIsBetter && result.value < bestValue)) {
          bestValue = result.value;
          best = scenario;
        }
      }
    }

    return best?.id || null;
  }
}
