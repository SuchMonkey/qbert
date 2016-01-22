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

## Features

**qBert** can display anything your browser can. It is based on [Node.js](https://nodejs.org/), [Electron](https://github.com/atom/electron) and [Polymer](https://github.com/polymer/polymer) and therefore lets you write your desktop panels with HTML, CSS and JS.

  * Use the full power of [Node.js](https://nodejs.org/) to display any kind of data you can imagine.
  * Make use of the &lt;qbert-elements&gt; based on [Polymer](https://github.com/polymer/polymer) to help you getting started writing your own desktop panels in a simple fashion.
  * Create and share your own &lt;custom-elements&gt;.
  * Though not being a strict goal you can write interactive panels if you wish to do so.

## Documentation

### Install

```sh
git clone https://github.com/suchmonkey/qbert
npm install
```

### Usage

```sh
npm run start
```

### Getting started

#### Configuration structure

At the moment **qBert** looks in the following places for configuration files as defined in **/config/config.json**:

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

#### Configuration file

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
    "openDevTools": false,
    "disableInput": true
  }
}
```

#### &lt;qbert-elements&gt;

There are several custom elements available to help create useful system monitoring panels.

##### &lt;qbert-panel&gt;

...acts as a container. It is as big as the window itself and uses **border-box** as box-sizing. It is ideal for setting a border "around" the whole panel or defining a background color.

Since Electron currently doesn't provide any native option to disable user input, **qbert-panel** uses CSS to prevent input. Therefore it will read the "panel.disableInput" property from the panel configuration. Alternatively the attribute can be set directly to set/override the configuration.

| Attribute       | Type            | Value           | Description                    |
| --------------- | --------------- | --------------- | ------------------------------ |
| disableinput    | Boolean         | true/false      | Prevent user input via CSS     |

##### &lt;qbert-cpu&gt;

...periodically provides CPU related statistics. The "cores" attribute will be an Array of Objects:

```json
[
  {
    "model": "CPU Model name",
    "speed": 123,
    "load": 50
  }
]
```

| Attribute       | Type            | Value/Result    | Description                    |
| --------------- | --------------- | --------------- | ------------------------------ |
| interval        | Number          | **1** >= x >= i | Sample/Refresh rate in seconds |
| *cores*         | Array[Object]   | [core {model, speed, load}] | Info for each core |
| *count*         | Number          | 0 >= x >= i     | The number of cores            |
| *avgload*       | Number          | 0 >= x >= 100   | The average load in percent    |
| *avgspeed*      | Number          | 0 >= x >= i     | The average speed in MHz       |


##### &lt;qbert-mem&gt;

...provides Memory related information.

| Attribute       | Type            | Value/Result    | Description                    |
| --------------- | --------------- | --------------- | ------------------------------ |
| interval        | Number          | **0** >= x >= i | Refresh rate in seconds; 0 == no update |
| as              | String          | **b**/kb/mb/gb  | Conversion unit                |
| *total*         | Number          | 0 >= x >= i     | Total memory                   |
| *free*          | Number          | 0 >= x >= i     | Currently free memory          |
| *used*          | Number          | 0 >= x >= i     | Currently used memory          |


##### &lt;qbert-time&gt;

...periodically provides date and time.

| Attribute       | Type            | Value/Result    | Description                    |
| --------------- | --------------- | --------------- | ------------------------------ |
| interval        | Number          | 0 - **1** >= x >= i | Refresh rate in seconds; 0 == no update |
| format          | String          | [MomentJs](http://momentjs.com/docs/#/displaying/format/) | Time format string |
| *time*          | String          |                 | The formatted time string      |

##### &lt;qbert-exec&gt;

...lets you execute shell commands and retrieve their results. This can be done periodically.

| Attribute       | Type            | Value/Result    | Description                    |
| --------------- | --------------- | --------------- | ------------------------------ |
| interval        | Number          | **0** >= x >= i | Refresh rate in seconds; 0 == no update |
| as              | String          | **text**/lines  | Get stdout as string or as Array of lines |
| cmd             | String          | "ls -la"        | The command to execute with space separated arguments |
| *stdout*        | String/Array    |                 | stdout if successful           |
| *stderr*        | String          |                 | stderr if not successful       |

##### &lt;qbert-system&gt;

...provides some information about the operating system.

| Attribute       | Type            | Value/Result    | Description                    |
| --------------- | --------------- | --------------- | ------------------------------ |
| *arch*          | String          | x64/arm/ia32    | CPU architecture               |
| *endian*        | String          | BE/LE           | CPU endianness                 |
| *homedir*       | String          | /home/user/     | Users home directory           |
| *hostname*      | String          |                 | The hostname of the system     |
| *osname*        | String          |                 | Name of OS                     |
| *platform*      | String          | darwin/freebsd/linux/sunos/win32 | Name of OS platform |
| *release*       | String          |                 | The operating system release   |
| *tmpdir*        | String          | /sys/temp/      | OS default temp directory      |

### Build from source

```sh
npm run build
```

### Package from source

NOTE: Not implemented yet
```sh
npm run package
```

## Contributing

Use the issue tracker to report problems, suggestions and questions.
You may also contribute by submitting pull requests.

## Donations

If you're feeling extra generous, you can also send me some BTC:

1JCQ5L4DefZ6pRhh6kzfnTK25Kgnu75YjS

## License

MIT © [SuchMonkey](http://github.com/SuchMonkey)
