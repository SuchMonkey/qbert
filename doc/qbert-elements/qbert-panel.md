# &lt;qbert-panel&gt;

This element acts as a container. It is as big as the window itself and uses **border-box** as box-sizing. It is ideal for setting a border "around" the whole panel or defining a background color.

Since Electron currently doesn't provide any native option to disable user input, **qbert-panel** uses CSS to prevent input. Therefore it will read the "panel.disableInput" property from the panel configuration. Alternatively the attribute can be set directly to set/override the configuration.

| Attribute       | Type            | Value           | Description                    |
| --------------- | --------------- | --------------- | ------------------------------ |
| disableinput    | Boolean         | true/false      | Prevent user input via CSS     |

## Example

```html
<qbert-panel style="background-color: rgba(0, 0, 0, 0.5); border: 1px solid black;">
  <!-- Place panel stuff here in this nice transparent and bordered window. -->
</qbert-panel>
```
