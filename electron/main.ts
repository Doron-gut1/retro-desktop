import { app, BrowserWindow } from 'electron';
import * as path from 'path';

function createWindow() {
  // יצירת חלון הדפדפן
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // אפשר גישה ל-require
      enableRemoteModule: true
    }
  });

  // טעינת הדף הראשי מהפיתוח או מהבילד
  const startURL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:5173'
    : `file://${path.join(__dirname, '../dist/index.html')}`;

  mainWindow.loadURL(startURL);

  // פתיחת כלי המפתח במצב פיתוח
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

// כשאלקטרון מוכן, יצירת החלון
app.whenReady().then(createWindow);

// סגירת האפליקציה כשכל החלונות נסגרים
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});