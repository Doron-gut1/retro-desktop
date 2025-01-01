import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { RetroDb } from '../src/services/db/retroDb';

let retroDb: RetroDb | null = null;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Dev vs Prod loading
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../index.html'));
  }
}

function setupIpcHandlers() {
  ipcMain.handle('db:connect', async (_, connectionString) => {
    try {
      retroDb = new RetroDb(connectionString);
      await retroDb.connect();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('retro:getProperty', async (_, hskod) => {
    if (!retroDb) throw new Error('Database not connected');
    return await retroDb.getProperty(hskod);
  });

  ipcMain.handle('retro:getPayer', async (_, mspkod) => {
    if (!retroDb) throw new Error('Database not connected');
    return await retroDb.getPayer(mspkod);
  });

  ipcMain.handle('retro:prepareData', async (_, params) => {
    if (!retroDb) throw new Error('Database not connected');
    return await retroDb.prepareRetroData(params);
  });

  ipcMain.handle('retro:multiplyRows', async (_, params) => {
    if (!retroDb) throw new Error('Database not connected');
    return await retroDb.multiplyTempArnmforatRows(params);
  });

  ipcMain.handle('retro:checkPeriod', async (_, mnt) => {
    if (!retroDb) throw new Error('Database not connected');
    return await retroDb.checkPeriod(mnt);
  });
}

app.whenReady().then(() => {
  setupIpcHandlers();
  createWindow();
});

app.on('window-all-closed', async () => {
  if (retroDb) {
    await retroDb.disconnect();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});