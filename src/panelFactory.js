import jetpack from 'fs-jetpack'
import path from 'path'
import _ from 'lodash'

const DEFAULT_PANEL_CONF = getConfig(__dirname, '..', 'config', 'defaultPanelConfig.json')
const CONFIG = getConfig(__dirname, '..', 'config', 'config.json')


/**
 * getConfigPaths - Evaluates the panel config locations defined in the config.json
 * and returns valid OS dependent path
 *
 * @return {array}  An array of paths to the panel configurations
 */
function getConfigPaths() {
  let userHome = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME']

  return CONFIG.panelConfigDirectories.map(_dirParts => {
    _dirParts = _dirParts.map(__dirPart => __dirPart.replace(/\%USERHOME\%/i, userHome))
    return path.join(..._dirParts)
  }).reduce((_configPaths, _configPath) => {

    if(jetpack.exists(_configPath) == 'dir') {
      _configPaths.push(_configPath)
    }

    return _configPaths

  }, [])
}


/**
 * validatePath - Joins the multiple path parts and validates if they match the
 * specified type (i.e. dir, file)
 *
 * @param  {string} _type         The type to check the path against (dir, file)
 * @param  {string} ..._pathParts Path parts to be joined an evaluated
 * @return {string}               Returns the joined version of the given path parts if they match the given type else false
 */
function validatePath(_type, ..._pathParts) {
  let _path = path.join(..._pathParts)
  return jetpack.exists(_path) == _type ? _path : false
}


/**
 * getItems - Extracts "items" from the given path parts and stores them in an
 * handy object. An item can either be a panel or one of the defined custom
 * elements. Therefore they are de facto HTML files which should be loaded.
 *
 * Returns only valid items
 *
 * @param  {string} ..._pathParts The path parts pointing to a directory of items
 * @return {array}                An array of "item" objects which contain the item name and resolved path
 */
function getItems(..._pathParts) {

  let _items = []
  let _itemsPath = validatePath('dir', ..._pathParts)

  if(!_itemsPath) return _items

  jetpack.list(_itemsPath).reduce((__items, __cItemName) => {
    let __itemPath = validatePath('file', _itemsPath, __cItemName, 'index.html')
    let __itemNodeModules = validatePath('dir', _itemsPath, __cItemName, 'node_modules')

    if(__itemPath) {
      __items.push({
        name: __cItemName,
        path: __itemPath,
        modulesPath: __itemNodeModules,
      })
    }

    return __items
  }, _items)

  return _items
}


/**
 * getConfig - Reads the config file of the given path parts if the path is valid
 *
 * @param  {string} ..._pathParts The path parts pointing to the json config file
 * @return {object}               Either empty if the path does not point to a valid json file or the config from the json file
 */
function getConfig(..._pathParts) {

  let _config = {}
  let _configPath = validatePath('file', ..._pathParts)

  if(!_configPath) return _config

  return jetpack.read(_configPath, 'json')
}


/**
 * getPanelsFromPath - Returns an array of panel objects from a given path.
 * All valid panels in the provided path will be returned. Each panel is
 * described in an object and contains all source files (including local and global
 * custom elements) and the panel specific configuration which consists of the
 * local panel config file, the global panels config file and the default panel
 * config.
 *
 * @param  {string} _panelsPath Path to panel configuration location
 * @return {array}              Array of panel objects each containing all relevant information in order to build the panel
 */
function getPanelsFromPath(_panelsPath) {
  let _globalConfig = getConfig(_panelsPath, 'panels', `${CONFIG.panelConfigFileName}.json`)
  let _globalElements = getItems(_panelsPath, 'elements')
  let _panels = getItems(_panelsPath, 'panels')

  _panels.map(__panel => {
    let __panelConfig = getConfig(__panel.path, '..', `${CONFIG.panelConfigFileName}.json`)
    let __panelElements = getItems(__panel.path, '..', 'elements')

    __panel.elements = _.uniq(__panelElements.concat(_globalElements), 'name')
    __panel.config = _.merge({}, DEFAULT_PANEL_CONF, _globalConfig, __panelConfig)

    return __panel
  })

  return _panels
}


/**
 * export - Default export for all panels of all configuration locations
 *
 * @return {array}  array of panel objects each containing all relevant information in order to build the panel
 */
export default function() {
  let _panels = []

  getConfigPaths().forEach(__configPath => {
    _panels = _panels.concat(getPanelsFromPath(__configPath))
  })

  return _panels
}
