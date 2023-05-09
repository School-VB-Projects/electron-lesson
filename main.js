const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')

function handleSetCounter(_event, value) {
  console.log(value)
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'scripts/preload.js')
    }
  })

  const menu = Menu.buildFromTemplate([
    {
      label: 'Window',
      submenu: [
        { role: 'help' },
        { role: 'quit' },
      ]
    },
    { role: 'viewMenu' },
    { role: 'editMenu' },
    {
      label: 'Counter',
      submenu: [
        {
          click: () => mainWindow.webContents.send('update-counter', 1),
          label: 'Increment'
        },
        {
          click: () => mainWindow.webContents.send('update-counter', -1),
          label: 'Decrement'
        },
        { type: 'separator' },
        {
          label: 'Toggle logs',
          type: 'checkbox',
          checked: true
        },
      ]
    },
  ])

  Menu.setApplicationMenu(menu)
  mainWindow.loadFile('index.html')

  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  ipcMain.on('counter-value', handleSetCounter)
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})