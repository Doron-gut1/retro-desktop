import { DatabaseService } from '../database';
import { TariffCalculations, type PriceCalculationResult } from './calculations';
import type { Tariff } from '../../types/property';

export class TariffService {
  private static async getTariffData(tariffCode: number): Promise<Tariff> {
    const result = await DatabaseService.query<Tariff>(
      'SELECT * FROM TrfmasMhir WHERE kodln = ?',
      [tariffCode]
    );

    if (!result.success || !result.data) {
      throw new Error(`Tariff ${tariffCode} not found`);
    }

    return result.data;
  }

  static async getTariffs(propertyId: string) {
    const result = await DatabaseService.getTariffs(propertyId);
    if (!result.success || !result.data) {
      throw new Error(result.error || 'Failed to fetch tariffs');
    }
    return result.data as Tariff[];
  }

  static async calculatePrice(
    tariffCode: number,
    size: number,
    indexFactor: number = 1,
    periodFactor: number = 1
  ): Promise<PriceCalculationResult> {
    const tariff = await this.getTariffData(tariffCode);
    return TariffCalculations.calculatePrice(
      tariff,
      size,
      indexFactor,
      periodFactor
    );
  }
}