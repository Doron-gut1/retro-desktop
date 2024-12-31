interface QueryResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export class DatabaseService {
  static async query<T>(sql: string, params?: any[]): Promise<QueryResult<T>> {
    try {
      const result = await window.db.query(sql, params);
      return {
        success: true,
        data: result
      };
    } catch (error) {
      console.error('Database query error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown database error'
      };
    }
  }

  static async getProperty(propertyId: string) {
    return this.query(
      `SELECT hs.*, msp.fullname, msp.maintz 
       FROM hs 
       LEFT JOIN msp ON hs.mspkod = msp.mspkod 
       WHERE hs.hskod = ?`,
      [propertyId]
    );
  }

  static async getTariffs(propertyId: string) {
    return this.query(
      `SELECT * FROM TrfmasMhir 
       WHERE kodln IN (
         SELECT mas FROM hs WHERE hskod = ?
         UNION SELECT mas2 FROM hs WHERE hskod = ?
         UNION SELECT mas3 FROM hs WHERE hskod = ?
         UNION SELECT mas4 FROM hs WHERE hskod = ?
         UNION SELECT mas5 FROM hs WHERE hskod = ?
         UNION SELECT mas6 FROM hs WHERE hskod = ?
         UNION SELECT mas7 FROM hs WHERE hskod = ?
         UNION SELECT mas8 FROM hs WHERE hskod = ?
       )`,
      Array(8).fill(propertyId)
    );
  }
}