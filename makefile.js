'use strict'
let nodeCLI = require('shelljs-nodecli')
require('shelljs/make')

let conf = {
  src: './src/',
  dist: './dist/',
}


target.all = function() {
  target.build()
}

target.build = function() {
  target.clean()
  target.babel()
  //target.copy()
}

target.babel = function() {
  console.log('Transpile [js] to %s', conf.dist)
  let proc = nodeCLI.exec('babel', `${conf.src} --out-dir ${conf.dist} --source-maps --copy-files`, {silent: true})
  console.log('-> babel: %s', proc.code)
  console.log(proc.output.trim().split('\n').map((x) => '    ' + x).join('\n'))
}

target.clean = function() {
  console.log('Clean %s', conf.dist)
  if(test('-e', conf.dist)) {
    rm('-rf', conf.dist)
  }
  mkdir('-p', conf.dist)
}
