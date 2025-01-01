import { DatabaseService } from '../db';
import { RetroCalculationParams, RetroResult } from './types';

export class RetroService {
  constructor(private readonly db: DatabaseService) {}

  async calculateRetro(params: RetroCalculationParams): Promise<RetroResult> {
    try {
      // הכנת הנתונים לחישוב
      await this.db.execute('PrepareRetroData', {
        hs: params.propertyId,
        mspkod: params.mspkod
      });

      // הרצת חישוב לכל סוגי החיוב
      await this.db.execute('MultiplyTempArnmforatRows', {
        HS: params.propertyId,
        NewSugtsList: params.chargeTypes.join(','),
        IsYearlyCharge: params.isYearlyCharge ? 1 : 0
      });

      // קבלת תוצאות החישוב
      const result = await this.db.query(
        `SELECT mnt, sugts, paysum, sumhan, sumhk, hesber 
         FROM Temparnmforat 
         WHERE hs = @p1 
         ORDER BY mnt, sugts`,
        [params.propertyId]
      );

      return {
        success: true,
        data: result.recordset
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async getPropertySizes(propertyId: string): Promise<RetroResult> {
    try {
      const result = await this.db.query(
        `SELECT TOP 1
           godel as gdl1, gdl2, gdl3, gdl4, gdl5, gdl6, gdl7, gdl8,
           mas as trf1, mas2 as trf2, mas3 as trf3, mas4 as trf4,
           mas5 as trf5, mas6 as trf6, mas7 as trf7, mas8 as trf8
         FROM hs
         WHERE hskod = @p1`,
        [propertyId]
      );

      return {
        success: true,
        data: result.recordset
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}