document.addEventListener('DOMContentLoaded', () => {

  let _panel = window.__args__

  console.log('qBert - %s', _panel.name)
  console.log('Configuration %o', _panel.config)

  document.querySelector('head').title = `qBert - ${_panel.name}`

  // Load all elements
  _panel.elements.forEach(_element => loadItem(_element.path))

  // Load the panel itself and append it to the body
  loadItem(_panel.path, doc => document.body.appendChild(doc.body))

  function loadItem(href, callback) {
    Polymer.Base.importHref(href, e => {
      console.log('Loading item %o -> successful', e.target.import)
      if(callback) callback(e.target.import)
    }, () => {
      console.error('Loading item %s -> failed', _panel.name)
    })
  }
})
