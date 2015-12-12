import app from 'app'
import path from 'path'
import electronWindow from 'electron-window'
import panelFactory from './panelFactory.js'

let panels = panelFactory()

if(panels.length === 0) {
  console.log('No panels configured!')
  app.quit()
}

// Electron is ready
app.on('ready', () => {
  panels.forEach((_panel) => {
    let browserWindow = electronWindow.createWindow(_panel.config.window)

    browserWindow.showUrl(path.resolve(__dirname, 'renderer', 'app.html'), _panel, () => {
      console.log('Panel created: %s', _panel.name)
    })

    if(_panel.config.panel.openDevTools === true) browserWindow.webContents.openDevTools()

  })
})
