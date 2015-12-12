document.addEventListener('DOMContentLoaded', () => {

  let _panel = window.__args__

  console.log('qBert - %s', _panel.name)
  console.log('Configuration %o', _panel.config)

  document.querySelector('head').title = `qBert - ${_panel.name}`

  // Load all elements
  _panel.elements.forEach((_element) => {
    Polymer.Base.importHref(_element.path, (e) => {
      console.log('Loading element %o -> successful', e.target.import)
    }, () => {
      console.error('Loading element %s -> failed', _element.name)
    })
  })

  // Load the panel itself and append it to the body
  Polymer.Base.importHref(_panel.path, (e) => {
    console.log('Loading panel %o -> successful', e.target.import)
    document.body.appendChild(e.target.import.body)
  }, () => {
    console.error('Loading panel %s -> failed', _panel.name)
  })
})
