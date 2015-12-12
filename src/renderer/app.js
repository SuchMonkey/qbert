document.addEventListener('DOMContentLoaded', () => {

  let _panel = window.__args__

  console.log(_panel)

  console.log('qBert - %s', _panel.name)
  console.log('Configuration')
  console.table(_panel.config)

  document.querySelector('head').title = `qBert - ${_panel.name}`

  let elementsToLoad = _panel.elements.length

  _panel.elements.forEach((_element) => {
    Polymer.Base.importHref(_element.path, (e) => {
      console.log('Loading element %o -> successful', e.target.import)
      console.log(e.target.import)
      loadPanel()
    }, () => {
      console.error('Loading element %s -> failed', _element.name)
      loadPanel()
    })
  })

  function loadPanel() {
    elementsToLoad--
    if(elementsToLoad > 0) return

    Polymer.Base.importHref(_panel.path, (e) => {
      console.log(e.target.import)
      document.body.appendChild(e.target.import.body)
    }, () => {

    })
  }
})
