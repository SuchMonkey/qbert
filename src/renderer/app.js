document.addEventListener('DOMContentLoaded', () => {

  // Get the panel config from the window object
  let _panel = window.__args__

  console.log('qBert - %s', _panel.name)
  console.log('Configuration %o', _panel.config)

  // Change the document title according to the panel name
  document.querySelector('head').title = `qBert - ${_panel.name}`

  // Load all custom elements relevant to the current panel
  _panel.elements.forEach(_element => loadItem(_element.path))

  // Load the panel itself and append it to the body
  loadItem(_panel.path, doc => document.body.appendChild(doc.body))


  /**
   * loadItem - Imports a HTML source using the Polymer helper function
   * for HTML imports
   *
   * @param  {string}   href     URL to the source file
   * @param  {function} callback The callback to be executed once a source has loaded successfully
   */   
  function loadItem(href, callback) {
    Polymer.Base.importHref(href, e => {
      console.log('Loading item %o -> successful', e.target.import)
      if(callback) callback(e.target.import)
    }, () => {
      console.error('Loading item %s -> failed', _panel.name)
    })
  }
})
