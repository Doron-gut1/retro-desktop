import { ConnectionPool, config as SQLConfig } from 'mssql';

export class DatabaseService {
  private pool: ConnectionPool | null = null;
  private config: SQLConfig;

  constructor(config: SQLConfig) {
    this.config = config;
  }

  async connect() {
    try {
      if (!this.pool) {
        this.pool = await new ConnectionPool(this.config).connect();
      }
      return this.pool;
    } catch (error) {
      console.error('Failed to connect to database:', error);
      throw error;
    }
  }

  async query(sql: string, params: any[] = []) {
    try {
      const pool = await this.connect();
      const request = pool.request();
      
      params.forEach((param, index) => {
        request.input(`p${index + 1}`, param);
      });

      return await request.query(sql);
    } catch (error) {
      console.error('Database query failed:', error);
      throw error;
    }
  }

  async execute(procedureName: string, params: Record<string, any> = {}) {
    try {
      const pool = await this.connect();
      const request = pool.request();
      
      Object.entries(params).forEach(([key, value]) => {
        request.input(key, value);
      });

      return await request.execute(procedureName);
    } catch (error) {
      console.error(`Failed to execute ${procedureName}:`, error);
      throw error;
    }
  }

  async disconnect() {
    try {
      if (this.pool) {
        await this.pool.close();
        this.pool = null;
      }
    } catch (error) {
      console.error('Failed to close database connection:', error);
      throw error;
    }
  }
}