const { app, BrowserWindow, ipcMain, nativeTheme } = require("electron")
const path = require("path")
const isDev = require('electron-is-dev')

const ENV_URL = {
    dev: 'http://localhost:3000',
    prod: `file://${path.join(__dirname, "../dist/index.html")}`
}

const createSwitchTheme = () => {
    ipcMain.handle('dark-mode:toggle', () => {
        if (nativeTheme.shouldUseDarkColors) {
            nativeTheme.themeSource = 'light'
        } else {
            nativeTheme.themeSource = 'dark'
        }
        return nativeTheme.shouldUseDarkColors
    })
    ipcMain.handle('dark-mode:system', () => {
        nativeTheme.themeSource = 'system'
    })
}

const createWindow = () => {
    const { screen } = require('electron')
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width, height } = primaryDisplay.bounds
    const mainWindow = new BrowserWindow({
        width,
        height,
        fullscreen: true,
        fullscreenable: true,
        resizable: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
    })

    createSwitchTheme()    // 动态切换主题  

    mainWindow.loadURL(isDev ? ENV_URL.dev : ENV_URL.prod)

    if (isDev) {
        mainWindow.webContents.openDevTools()
    }
}

app.whenReady().then(() => {

    createWindow()

    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit()
})