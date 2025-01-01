import { TariffData, TariffFilters, TariffResponse } from './types';

export class TariffService {
  constructor(private readonly dbConnection: any) {}

  async getTariffs(filters: TariffFilters): Promise<TariffResponse> {
    try {
      const result = await this.dbConnection.query(
        'EXEC GetTrfmasMhir @fromDate = @p1, @toDate = @p2, @propertyType = @p3',
        [filters.fromDate, filters.toDate, filters.propertyType]
      );

      return {
        success: true,
        data: result.recordset.map((row: any) => ({
          code: row.kodln,
          name: row.trfname,
          amount: row.mhir1,
          maxDiscountSize: row.maxDiscountSize,
          forceHan: row.forcehan === 1,
          onlyArn: row.onlyarn === 1
        }))
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
