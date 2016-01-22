# &lt;qbert-cpu&gt;

This element periodically samples the CPU load and provides CPU related statistics. The "cores" attribute will be an Array of Objects:

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

## Example

```html
<qbert-panel >
  <!-- Allow data binding for Polymer -->
  <template is="dom-bind">
    <qbert-cpu interval="3" cores="{{cores}}" count="{{coreCount}}" avgload="{{avgLoad}}" avgSpeed="{{avgSpeed}}"></qbert-cpu>
    <table>
      <tr>
        <th>Model</th>
        <th>Speed ({{avgSpeed}}MHz)</th>
        <th>Load ({{avgLoad}}%)</th>
      </tr>
      <!-- Use Polymer dom-repeat to loop over cores array -->
      <template is="dom-repeat" items="{{cores}}">
        <tr>
          <td>{{item.model}}</td>
          <td>{{item.speed}}MHz</td>
          <td>{{item.load}}%</td>
        </tr>
      </template>
    </table>
  </template>
</qbert-panel>
```
