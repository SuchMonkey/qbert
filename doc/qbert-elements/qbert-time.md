# &lt;qbert-time&gt;

Provides date and time data which updates periodically.

| Attribute       | Type            | Value/Result                                              | Description                             |
| --------------- | --------------- | --------------------------------------------------------- | --------------------------------------- |
| interval        | Number          | 0 - **1** >= x >= i                                       | Refresh rate in seconds; 0 == no update |
| format          | String          | [MomentJs](http://momentjs.com/docs/#/displaying/format/) | Time format string                      |
| *time*          | String          |                                                           | The formatted time string               |
