import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as odbc from 'odbc';

let mainWindow: BrowserWindow | null = null;

// ODBC Connection Configuration
const odbcConfig = {
  connectionString: 'DSN=YourDSNName;',
  connectionTimeout: 10,
  loginTimeout: 10
};

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.ts')
    },
  });

  // In development, load from React dev server
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load the built files
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Database Connection Handler
async function connectToDatabase() {
  try {
    const connection = await odbc.connect(odbcConfig.connectionString);
    return connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

// IPC Handlers
ipcMain.handle('db:query', async (event, query, params) => {
  try {
    const connection = await connectToDatabase();
    const result = await connection.query(query, params);
    await connection.close();
    return result;
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});