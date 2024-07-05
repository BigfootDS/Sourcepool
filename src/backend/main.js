const { app, BrowserWindow, Menu, nativeImage } = require('electron');
const GameSettings = require('./game/SettingsManager.js');
const ipcDeclarations = require("./utilities/ipc/ipcDeclarationsAll.js");
const { channels } = require('../shared/constants.js');
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
const path = require("node:path");
const fs = require("node:fs");
const os = require("node:os");

// Useful way to see framerate:
// app.commandLine.appendSwitch("show-fps-counter")

require('./utilities/organisationPath.js').overrideUserDataPath();



// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}



// Performance increased by setting the default app menu to null 
// especially when we don't use a default app menu!
// https://www.electronjs.org/docs/latest/tutorial/performance#8-call-menusetapplicationmenunull-when-you-do-not-need-a-default-menu
// https://github.com/electron/electron/issues/35512
Menu.setApplicationMenu(null);

function generateAppIconPath(){

  // Linux is a delicate little flower compared to Windows...
  if (os.platform() === "linux"){
    // process.cwd() was the user's home directory
    // __dirname was some nonexistent asar directory within the app's folder
    // app.getAppPath() was also some app.asar folder that doesn't exist in prod
    // app.getPath("exe") gets the actual path to the bin file, which is really close but not immediately useful
    // We need the folder that contains the bin file.
    let binFilePath = app.getPath("exe");
    let iconPathToUse = path.join(binFilePath.substring(0, binFilePath.lastIndexOf("/")), "/resources/logo/patron-simulator.png");

    if (fs.existsSync(iconPathToUse)){
      console.log(`Icon path is valid:\n${iconPathToUse}`);
    } else {
      console.log(`Icon path is invalid:\n${iconPathToUse}`);
    }
    return iconPathToUse;

  } else {
    // We can literally just use what was available in dev time and Electron Forge/Builder/etc just figures it out,
    // so Windows is a lot simpler here.
    return "../shared/assets/logo/patron-simulator.png"
  }
}

let mainWindow = null;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    icon: generateAppIconPath(),
    width: 1280,
    minWidth: 1280,
    height: 720,
    minHeight: 720,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      devTools: true,
      contextIsolation: true,
      nodeIntegration: true
    },
    frame: false
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.maximize();

  

  mainWindow.show();

  // Open the DevTools if we're not in a compiled/published build.
  if (!app.isPackaged){
    mainWindow.webContents.openDevTools();
  }


};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Create window first to make mainWindow have value,
  createWindow();
  // then we can assign ipc stuff and use mainWindow in the actions that need it.
  ipcDeclarations(mainWindow);

    // If in development, add React Dev Tools to the Electron Dev Tools as per this guide:
  // https://www.electronjs.org/docs/latest/tutorial/devtools-extension#manually-loading-a-devtools-extension
  if (!app.isPackaged){
    try {
      installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));

        // Potential weird fix for dev tools not visible: 
        // https://github.com/MarshallOfSound/electron-devtools-installer/issues/244#issuecomment-2052454918
        setTimeout(() => {
          mainWindow.reload();
        }, 500);
    } catch (error){
      console.log(error);
    }
  } else {
    // If we're not in dev mode, assume that we are deployed to Steam and force the game to run via the Steam client.
    // steamworks.restartAppIfNecessary(1792550);
    // This may benefit from having its own separate if statement and running BEFORE we call createWindow()...
    // ...just depends on how this looks in the UX.
  }

  if (GameSettings.Video.windowMode === 0){
    console.log("Startup check: fullscreen is false");
    mainWindow.setFullScreen(false);
    mainWindow.webContents.send(channels.FULLSCREEN_STATUS, 0);
  } else {
    console.log("Startup check: fullscreen is true");
    mainWindow.setFullScreen(true);
    mainWindow.webContents.send(channels.FULLSCREEN_STATUS, 1);
  }

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


// Steam functionality:
// Steam overlay:
// steamworks.electronEnableSteamOverlay();
// Custom per-game Steam stuff: 
// require("./steam/steamworksFunctionality.js");