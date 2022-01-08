// Native
import { join } from 'path';

// Packages
import {
  BrowserWindow,
  app,
  ipcMain,
  IpcMainEvent,
  nativeTheme,
} from 'electron';
import isDev from 'electron-is-dev';
import Store from './store';

const store = new Store({
  configName: 'user-preferences',
  defaults: {
    windowBounds: {
      x: undefined,
      y: undefined,
      width: 800,
      height: 600,
    },
  },
});

const createWindow = (): void => {
  // Create the browser window.
  const window = new BrowserWindow({
    x: store.get('windowBounds').x,
    y: store.get('windowBounds').y,
    width: store.get('windowBounds').width,
    height: store.get('windowBounds').height,
    show: true,
    resizable: true,
    fullscreenable: true,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    },
  });

  const port = process.env.PORT || 3000;
  const url = isDev
    ? `http://localhost:${port}`
    : join(__dirname, '../src/out/index.html');

  // and load the index.html of the app.
  if (isDev) {
    window?.loadURL(url);
  } else {
    window?.loadFile(url);
  }
  // Open the DevTools.
  // window.webContents.openDevTools();

  // For AppBar
  ipcMain.on('minimize', () => {
    // eslint-disable-next-line no-unused-expressions
    window.isMinimized() ? window.restore() : window.minimize();
    // or alternatively: win.isVisible() ? win.hide() : win.show()
  });
  ipcMain.on('maximize', () => {
    // eslint-disable-next-line no-unused-expressions
    window.isMaximized() ? window.restore() : window.maximize();
  });

  ipcMain.on('close', () => {
    window.close();
  });

  // Handle dark mode toggle switch.
  ipcMain.handle(
    'theme:setTheme',
    (_, themeType: Electron.NativeTheme['themeSource']) => {
      if (themeType === 'system') {
        nativeTheme.themeSource = 'system';
      } else if (themeType === 'light') {
        nativeTheme.themeSource = 'light';
      } else {
        nativeTheme.themeSource = 'dark';
      }

      return nativeTheme.shouldUseDarkColors;
    },
  );

  // Handle resize window event and saving bounds.
  window.on('resize', () => {
    const { x, y, width, height } = window.getBounds();
    store.set('windowBounds', { x, y, width, height });
  });

  // Handle moved window event and saving bounds.
  window.on('moved', () => {
    const { x, y, width, height } = window.getBounds();
    store.set('windowBounds', { x, y, width, height });
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event: IpcMainEvent, message: any) => {
  console.log(message);
  setTimeout(() => event.sender.send('message', 'hi from electron'), 500);
});
