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
