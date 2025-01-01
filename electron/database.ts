import { ipcMain } from 'electron';
import { DatabaseService } from '../src/services/db/DatabaseService';

let dbService: DatabaseService | null = null;

export function setupDatabaseHandlers() {
  ipcMain.handle('db:connect', async (_, config) => {
    try {
      dbService = new DatabaseService(config);
      await dbService.connect();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('db:query', async (_, { query, params }) => {
    if (!dbService) {
      throw new Error('Database not connected');
    }
    return await dbService.query(query, params);
  });

  ipcMain.handle('db:execute', async (_, { procedure, params }) => {
    if (!dbService) {
      throw new Error('Database not connected');
    }
    return await dbService.execute(procedure, params);
  });

  ipcMain.handle('db:disconnect', async () => {
    if (dbService) {
      await dbService.disconnect();
      dbService = null;
    }
  });
}