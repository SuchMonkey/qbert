# qBert

<p align="left">
  <a href="https://coveralls.io/r/SuchMonkey/qbert">
    <img src="https://img.shields.io/coveralls/SuchMonkey/qbert.svg?style=flat-square" alt="Coverage Status">
  </a>

  <a href="https://travis-ci.org/SuchMonkey/qbert">
    <img src="https://img.shields.io/travis/SuchMonkey/qbert.svg?style=flat-square" alt="Build Status">
  </a>

  <a href="https://david-dm.org/SuchMonkey/qbert.svg">
    <img src="https://david-dm.org/SuchMonkey/qbert.svg?style=flat-square" alt="Dependency Status">
  </a>

  <a href="https://github.com/SuchMonkey/qbert/blob/master/LICENSE.md">
    <img src="https://img.shields.io/npm/l/qbert.svg?style=flat-square" alt="License">
  </a>
</p>

**qBert** is a cross-platform system monitor that displays any kind of information on your desktop.

### Features

**qBert** can display anything your browser can. It is based on [Node.js](https://nodejs.org/), [Electron](https://github.com/atom/electron) and [Polymer](https://github.com/polymer/polymer) and therefore lets you write your desktop panels with HTML, CSS and JS.

  * Use the full power of [Node.js](https://nodejs.org/) to display any kind of data you can imagine.
  * Make use of the &lt;qbert-elements&gt; based on [Polymer](https://github.com/polymer/polymer) to help you getting started writing your own desktop panels in a simple fashion.
  * Create and share your own <custom-elements>.
  * Tough not being a strict goal you can write interactive panels if you wish to do so.

### Documentation

## Install

```sh
git clone https://github.com/suchmonkey/qbert
npm install
```

## Usage

```sh
npm run start
```

## Getting started

### Configuration structure

At the moment **qBert** looks in the following places for configuration files:

  * ~/.config/qbert/
  * ~/.qbert/
  * ~/qbert

The minimal approach for a valid configuration looks like this:
```
.
+-- panels
|   +-- my-panel-A
|   |   +-- index.html
|   |   +-- qbert.json
|   +-- my-panel-B
|   |   +-- index.html
|   |   +-- qbert.json
```
In this case each panel has it's own configuration. By placing a qbert.json directly under panels you can achieve a global configuration.
Values present in a local config will override those from the global.

To use Polymer elements you have to place them in an elements directory within your panel or alongside your panels to use them globally.

Here is a fully fledged configuration:
```
.
+-- elements
|   +-- global-element-A
|   |   +-- index.html
|   +-- global-element-B
|   |   +-- index.html
+-- panels
|   +-- my-panel-A
|   |   +-- elements
|   |   |   +-- private-element-A
|   |   |   |   +-- index.html
|   |   |   +-- private-element-B
|   |   |   |   +-- index.html
|   |   +-- index.html
|   |   +-- qbert.json
|   +-- my-panel-B
|   |   +-- elements
|   |   |   +-- private-element-A
|   |   |   |   +-- index.html
|   |   +-- index.html
|   |   +-- qbert.json
```

Polymer elements placed under elements will get loaded automatically and can be used within your panel.

### Configuration file

The configuration file contains mostly electron specific options for the window creation. Electron specific options are located under the window property. You can look up all available options [here](https://github.com/atom/electron/blob/master/docs/api/browser-window.md).

**Note:** The configuration filename as well as the content and format are subject to change.

The config below creates a frameless, transparent window on the desktop.

**Note:** Electron does not provide any options to disable input on a window yet...

```json
{
  "window": {
    "show": true,
    "skipTaskbar": true,
    "frame": false,
    "transparent": true,
    "type": "desktop",
    "resizeable": false,
    "x": 10,
    "y": 10,
    "width": 1000,
    "height": 500
  },
  "panel": {
    "openDevTools": false
  }
}
```

## Build from source

```sh
npm run build
```

## Package from source

NOTE: Not implemented yet
```sh
npm run package
```

## Contributing

Use the issue tracker to report problems, suggestions and questions.
You may also contribute by submitting pull requests.

## License

MIT © [SuchMonkey](http://github.com/SuchMonkey)
