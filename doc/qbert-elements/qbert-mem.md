# &lt;qbert-mem&gt;

This element provides Memory related information and allows periodically updates.

| Attribute       | Type            | Value/Result    | Description                             |
| --------------- | --------------- | --------------- | --------------------------------------- |
| interval        | Number          | **0** >= x >= i | Refresh rate in seconds; 0 == no update |
| as              | String          | **b**/kb/mb/gb  | Conversion unit                         |
| *total*         | Number          | 0 >= x >= i     | Total memory                            |
| *free*          | Number          | 0 >= x >= i     | Currently free memory                   |
| *used*          | Number          | 0 >= x >= i     | Currently used memory                   |
