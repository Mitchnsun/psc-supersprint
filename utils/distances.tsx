export interface DistanceDetail {
  length: number;
  unit: string;
  unit_label: string;
}

export interface DistanceConfig {
  swim: DistanceDetail;
  bike: DistanceDetail;
  run: DistanceDetail;
}

export const DISTANCES_BY_YEAR: Record<string, DistanceConfig> = {
  '2022': {
    swim: { length: 300, unit: 'm', unit_label: 'mètres' },
    bike: { length: 6, unit: 'km', unit_label: 'kilomètres' },
    run: { length: 2.5, unit: 'km', unit_label: 'kilomètres' },
  },
  '2023': {
    swim: { length: 300, unit: 'm', unit_label: 'mètres' },
    bike: { length: 5.8, unit: 'km', unit_label: 'kilomètres' },
    run: { length: 2, unit: 'km', unit_label: 'kilomètres' },
  },
  '2024': {
    swim: { length: 300, unit: 'm', unit_label: 'mètres' },
    bike: { length: 5.7, unit: 'km', unit_label: 'kilomètres' },
    run: { length: 2.45, unit: 'km', unit_label: 'kilomètres' },
  },
  '2025': {
    swim: { length: 300, unit: 'm', unit_label: 'mètres' },
    bike: { length: 5.7, unit: 'km', unit_label: 'kilomètres' },
    run: { length: 2.5, unit: 'km', unit_label: 'kilomètres' },
  },
  '2026': {
    swim: { length: 300, unit: 'm', unit_label: 'mètres' },
    bike: { length: 5.7, unit: 'km', unit_label: 'kilomètres' },
    run: { length: 2.5, unit: 'km', unit_label: 'kilomètres' },
  },
};

const DEFAULT_YEAR = '2025';

export const getDistances = (year?: string | number): DistanceConfig => {
  const yearKey = year?.toString();
  return (yearKey !== undefined && DISTANCES_BY_YEAR[yearKey]) ? DISTANCES_BY_YEAR[yearKey] : DISTANCES_BY_YEAR[DEFAULT_YEAR];
};

export default getDistances();
