# Panel configuration location

At the moment **qBert** looks in the following places for configured panels:

  * ~/.config/qbert/
  * ~/.qbert/
  * ~/qbert

In order to make **qBert** aware of other locations to search for panels, you have to edit the **/config/config.json**:

```json
{
  "panelConfigDirectories": [
    ["%USERHOME%", ".config", "qbert"],
    ["%USERHOME%", ".qbert"],
    ["%USERHOME%", "qbert"]
  ],
  "panelConfigFileName": "qbert"
}
```

**%USERHOME%** is the only variable **qBert** will replace at the moment.

# Configuration structure

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

Polymer elements placed under elements will loaded automatically and can be used within your panel.

# Configuration file

The configuration file contains mostly electron specific options for the window creation. Electron specific options are located under the window property. You can look up all available options [here](https://github.com/atom/electron/blob/master/docs/api/browser-window.md).

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

# Example configuration

You can find some panel examples [here](../examples/panel-config-structure).
