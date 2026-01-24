// ============================================
// DATES DE MISE À JOUR DES SIMULATEURS
// Fichier centralisé pour toutes les dates
// ============================================

export interface SimulatorUpdateInfo {
  lastUpdate: string;    // Format: 'YYYY-MM-DD'
  version?: string;
  changelog?: string[];
}

export const SIMULATOR_DATES: Record<string, SimulatorUpdateInfo> = {
  // Immobilier
  'capacite-emprunt': {
    lastUpdate: '2025-01-20',
    version: '2.1',
    changelog: ['Mise à jour des taux 2025', 'Ajout du calcul du reste à vivre']
  },
  'pret-immobilier': {
    lastUpdate: '2025-01-15',
    version: '2.0'
  },
  'frais-notaire': {
    lastUpdate: '2025-01-10'
  },
  'rendement-locatif': {
    lastUpdate: '2025-01-08'
  },
  'pinel': {
    lastUpdate: '2025-01-05'
  },
  'plus-value-immobiliere': {
    lastUpdate: '2024-12-20'
  },
  'viager': {
    lastUpdate: '2024-12-15'
  },
  'colocation': {
    lastUpdate: '2024-12-10'
  },
  'sortie-pinel': {
    lastUpdate: '2024-12-05'
  },

  // Finance
  'interet-compose': {
    lastUpdate: '2025-01-18'
  },
  'livret': {
    lastUpdate: '2025-01-12'
  },
  'pea-assurance-vie': {
    lastUpdate: '2025-01-10'
  },
  'impot-revenu': {
    lastUpdate: '2025-01-08'
  },
  'frais-reels': {
    lastUpdate: '2025-01-05'
  },
  'per': {
    lastUpdate: '2025-01-03'
  },
  'sasu-eurl': {
    lastUpdate: '2024-12-28'
  },
  'ppv': {
    lastUpdate: '2024-12-20'
  },
  'dca-lumpsum': {
    lastUpdate: '2024-12-15'
  },
  'remboursement-anticipe': {
    lastUpdate: '2024-12-10'
  },
  'rachat-credit': {
    lastUpdate: '2024-12-05'
  }
};

/**
 * Récupère les infos de mise à jour d'un simulateur
 */
export function getSimulatorUpdateInfo(simulatorId: string): SimulatorUpdateInfo | null {
  return SIMULATOR_DATES[simulatorId] || null;
}

/**
 * Formate une date au format français
 */
export function formatUpdateDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}
