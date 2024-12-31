import { DatabaseService } from '../database';
import type { Tariff } from '../../types/property';

export class TariffService {
  static async getTariffs(propertyId: string) {
    const result = await DatabaseService.getTariffs(propertyId);
    if (!result.success || !result.data) {
      throw new Error(result.error || 'Failed to fetch tariffs');
    }
    return result.data as Tariff[];
  }

  static async getTariffPrice(tariffCode: number, size: number): Promise<number> {
    // TODO: Implement price calculation logic
    return 0;
  }
}