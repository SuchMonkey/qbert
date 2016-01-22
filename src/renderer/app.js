document.addEventListener('DOMContentLoaded', () => {

  // Get the panel config from the window object
  let _panel = window.__args__

  console.log('qBert - %s', _panel.name)
  console.log('Configuration %o', _panel.config)

  // Change the document title according to the panel name
  document.querySelector('head').title = `qBert - ${_panel.name}`

  // Load all custom elements relevant to the current panel
  _panel.elements.forEach(_element => loadItem(_element))

  // Load the panel itself and append it to the body
  loadItem(_panel, doc => document.body.appendChild(doc.body))


  /**
   * loadItem - Imports a HTML source using the Polymer helper function
   * for HTML imports. Also adds an items node_modules directory to the require
   * to allow having node_modules under the panel/element directories.
   *
   * @param  {object}   item     The item object containing all path informations
   * @param  {function} callback The callback to be executed once a source has loaded successfully
   */
  function loadItem(item, callback) {
    // Add item node_modules path to node require paths
    if(item.modulesPath) require('app-module-path').addPath(item.modulesPath)

    Polymer.Base.importHref(item.path, e => {
      console.log('Loading item %o -> successful', e.target.import)

      if(callback) callback(e.target.import)
    }, () => {
      console.error('Loading item %s -> failed', _panel.name)
    })
  }
})
