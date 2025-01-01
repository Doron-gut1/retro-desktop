import { DatabaseService } from './databaseService';

export interface PropertySizes {
  godel: number;
  gdl2: number;
  gdl3: number;
  gdl4: number;
  gdl5: number;
  gdl6: number;
  gdl7: number;
  gdl8: number;
}

export class PropertyService {
  private db: DatabaseService;

  constructor(db: DatabaseService) {
    this.db = db;
  }

  async getPropertySizes(propertyId: string): Promise<PropertySizes | null> {
    try {
      const result = await this.db.query(`
        SELECT godel, gdl2, gdl3, gdl4, gdl5, gdl6, gdl7, gdl8
        FROM hs
        WHERE hskod = @p1
      `, [propertyId]);

      if (!result.recordset || result.recordset.length === 0) {
        return null;
      }

      return result.recordset[0] as PropertySizes;
    } catch (error) {
      console.error('Error fetching property sizes:', error);
      throw error;
    }
  }
}