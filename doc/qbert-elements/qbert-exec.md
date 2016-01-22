# &lt;qbert-exec&gt;

This element lets you execute shell commands and retrieve their results. This can be done periodically.

| Attribute       | Type            | Value/Result    | Description                                           |
| --------------- | --------------- | --------------- | ----------------------------------------------------- |
| interval        | Number          | **0** >= x >= i | Refresh rate in seconds; 0 == no update               |
| as              | String          | **text**/lines  | Get stdout as string or as Array of lines             |
| cmd             | String          | "ls -la"        | The command to execute with space separated arguments |
| *stdout*        | String/Array    |                 | stdout if successful                                  |
| *stderr*        | String          |                 | stderr if not successful                              |
