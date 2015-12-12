import jetpack from 'fs-jetpack'
import path from 'path'
import _ from 'lodash'

const DEFAULT_PANEL_CONF = getConfig(__dirname, 'defaultConfig.json')

function getConfigPaths() {
  let userHome = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME']

  return [
    path.join(userHome, '.config', 'qbert'),
    path.join(userHome, '.qbert'),
    path.join(userHome, 'qbert'),
    path.join(__dirname, '..', '.qbert'),
  ].reduce((_configPaths, _configPath) => {

    if(jetpack.exists(_configPath) == 'dir') {
      _configPaths.push(_configPath)
    }

    return _configPaths

  }, [])
}

function validatePath(_type, ..._pathParts) {
  let _path = path.join(..._pathParts)
  return jetpack.exists(_path) == _type ? _path : false
}

function getItems(..._pathParts) {

  let _items = []
  let _itemsPath = validatePath('dir', ..._pathParts)

  if(!_itemsPath) return _items

  jetpack.list(_itemsPath).reduce((__items, __cItemName) => {
    let __itemPath = validatePath('file', _itemsPath, __cItemName, 'index.html')

    if(__itemPath) {
      __items.push({
        name: __cItemName,
        path: __itemPath,
      })
    }

    return __items
  }, _items)

  return _items
}

function getConfig(..._pathParts) {

  let _config = {}
  let _configPath = validatePath('file', ..._pathParts)

  if(!_configPath) return _config

  return jetpack.read(_configPath, 'json')
}

function getPanelsFromPath(_panelsPath) {
  let _globalConfig = getConfig(_panelsPath, 'panels', 'qbert.json')
  let _globalElements = getItems(_panelsPath, 'elements')
  let _panels = getItems(_panelsPath, 'panels')

  _panels.map((__panel) => {
    let __panelConfig = getConfig(__panel.path, '..', 'qbert.json')
    let __panelElements = getItems(__panel.path, '..', 'elements')

    __panel.elements = _.uniq(__panelElements.concat(_globalElements), 'name')
    __panel.config = _.merge(DEFAULT_PANEL_CONF, _globalConfig, __panelConfig)

    return __panel
  })

  return _panels
}

export default function() {
  let _panels = []

  getConfigPaths().forEach((__configPath) => {
    _panels = _panels.concat(getPanelsFromPath(__configPath))
  })
  
  return _panels
}
