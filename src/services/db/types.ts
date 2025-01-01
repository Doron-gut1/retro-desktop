export interface DatabaseConfig {
  server: string;
  database: string;
  user: string;
  password: string;
  options: {
    encrypt: boolean;
    trustServerCertificate: boolean;
  };
}

export interface QueryResult {
  recordset: any[];
  rowsAffected: number[];
  output: any;
}

export interface StoredProcParams {
  [key: string]: string | number | boolean | Date;
}