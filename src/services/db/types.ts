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

export interface QueryResult<T = any> {
  recordset: T[];
  recordsets: T[][];
  rowsAffected: number[];
  output: { [key: string]: any };
}