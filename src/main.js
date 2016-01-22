import app from 'app'
import path from 'path'
import electronWindow from 'electron-window'
import panelFactory from './panelFactory.js'

// Factor all panels from the config
let panels = panelFactory()

let panelCount = panels.length

// If no panels are configured then quit
if(panelCount === 0) {
  console.log('No panels configured!')
  app.quit()
}

// Electron is ready to create new browser windows
app.on('ready', () => {
  panels.forEach((_panel) => {

    // Electron does not always respect the "show" property
    if(!_panel.config.window.show) {
        panelCount--

        if(panelCount === 0) {
          console.log('No panel is configured to show. Perhaps you want to define "window.show = true" in your panel config.')
          app.quit()
        }

        return
    }

    // Create a new browser window based on the elctron config given in the panel config
    let browserWindow = electronWindow.createWindow(_panel.config.window)

    // For each panel configured load the app.html and provide the specific panel config
    browserWindow.showUrl(path.resolve(__dirname, 'renderer', 'app.html'), _panel, () => {
      console.log('Panel created: %s', _panel.name)
    })

    // Make sure DevTools are engaged if so configured
    if(_panel.config.panel.openDevTools === true) browserWindow.webContents.openDevTools()

  })
})
