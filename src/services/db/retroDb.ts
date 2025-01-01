import sql from 'mssql';
import { retroQueries } from './retroQueries';

export class RetroDb {
  private pool: sql.ConnectionPool | null = null;

  constructor(private connectionString: string) {}

  async connect() {
    try {
      this.pool = await new sql.ConnectionPool(this.connectionString).connect();
      console.log('Connected to database');
    } catch (error) {
      console.error('Connection error:', error);
      throw error;
    }
  }

  async getProperty(hskod: string) {
    if (!this.pool) throw new Error('Not connected');

    try {
      const result = await this.pool.request()
        .input('hskod', sql.NVarChar, hskod)
        .query(retroQueries.getProperty);

      return result.recordset[0];
    } catch (error) {
      console.error('Error getting property:', error);
      throw error;
    }
  }

  async getPayer(mspkod: number) {
    if (!this.pool) throw new Error('Not connected');

    try {
      const result = await this.pool.request()
        .input('mspkod', sql.Int, mspkod)
        .query(retroQueries.getPayer);

      return result.recordset[0];
    } catch (error) {
      console.error('Error getting payer:', error);
      throw error;
    }
  }

  async prepareRetroData(params: { hskod: string, mspkod: number }) {
    if (!this.pool) throw new Error('Not connected');

    try {
      await this.pool.request()
        .input('hs', sql.NVarChar, params.hskod)
        .input('mspkod', sql.Int, params.mspkod)
        .execute('PrepareRetroData');
    } catch (error) {
      console.error('Error preparing retro data:', error);
      throw error;
    }
  }

  async multiplyTempArnmforatRows(params: { 
    hskod: string, 
    sugtsList: string,
    isYearlyCharge: boolean 
  }) {
    if (!this.pool) throw new Error('Not connected');

    try {
      await this.pool.request()
        .input('HS', sql.NVarChar, params.hskod)
        .input('NewSugtsList', sql.NVarChar, params.sugtsList)
        .input('IsYearlyCharge', sql.Bit, params.isYearlyCharge ? 1 : 0)
        .execute('MultiplyTempArnmforatRows');
    } catch (error) {
      console.error('Error multiplying rows:', error);
      throw error;
    }
  }

  async checkPeriod(mnt: number): Promise<boolean> {
    if (!this.pool) throw new Error('Not connected');

    try {
      const result = await this.pool.request()
        .input('mnt', sql.Int, mnt)
        .query(retroQueries.checkPeriod);

      return result.recordset.length > 0;
    } catch (error) {
      console.error('Error checking period:', error);
      throw error;
    }
  }

  async disconnect() {
    if (this.pool) {
      await this.pool.close();
      this.pool = null;
    }
  }
}