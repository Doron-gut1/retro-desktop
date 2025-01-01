import { CalculationParams, CalculationResult } from './types';

export class CalculationService {
  constructor(private readonly dbConnection: any) {}

  async calculateCharges(params: CalculationParams): Promise<CalculationResult> {
    try {
      // Set up the calculation parameters
      await this.dbConnection.query(
        'EXEC PrepareRetroData @hs = @p1, @mspkod = @p2',
        [params.propertyId, params.mspkod]
      );

      // Calculate for the specified period
      const chargeTypes = params.chargeTypes.join(',');
      await this.dbConnection.query(
        'EXEC MultiplyTempArnmforatRows @HS = @p1, @NewSugtsList = @p2',
        [params.propertyId, chargeTypes]
      );

      // Get the results
      const result = await this.dbConnection.query(
        'SELECT * FROM Temparnmforat WHERE hs = @p1',
        [params.propertyId]
      );

      const details = result.recordset.map((row: any) => ({
        period: row.mnt,
        chargeType: row.sugts,
        amount: row.paysum,
        discount: row.sumhan,
        total: row.paysum - row.sumhan
      }));

      const totalAmount = details.reduce((sum: number, detail: any) => sum + detail.total, 0);

      return {
        success: true,
        totalAmount,
        details
      };
    } catch (error) {
      return {
        success: false,
        totalAmount: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
