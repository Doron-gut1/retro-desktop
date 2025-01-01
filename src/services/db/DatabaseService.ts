import sql from 'mssql';
import { DatabaseConfig, QueryResult, StoredProcParams } from './types';

export class DatabaseService {
  private pool: sql.ConnectionPool | null = null;
  private config: DatabaseConfig;

  constructor(config: DatabaseConfig) {
    this.config = config;
  }

  async connect(): Promise<void> {
    try {
      this.pool = await new sql.ConnectionPool(this.config).connect();
      console.log('Connected to database');
    } catch (error) {
      console.error('Database connection error:', error);
      throw error;
    }
  }

  async query(queryText: string, params: any[] = []): Promise<QueryResult> {
    if (!this.pool) {
      throw new Error('Database not connected');
    }

    try {
      const request = this.pool.request();
      
      // Add parameters
      params.forEach((param, index) => {
        request.input(`p${index + 1}`, param);
      });

      return await request.query(queryText);
    } catch (error) {
      console.error('Query error:', error);
      throw error;
    }
  }

  async execute(procedureName: string, params: StoredProcParams = {}): Promise<QueryResult> {
    if (!this.pool) {
      throw new Error('Database not connected');
    }

    try {
      const request = this.pool.request();
      
      // Add parameters
      Object.entries(params).forEach(([key, value]) => {
        request.input(key, value);
      });

      return await request.execute(procedureName);
    } catch (error) {
      console.error('Stored procedure error:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.pool) {
      await this.pool.close();
      this.pool = null;
    }
  }
}
