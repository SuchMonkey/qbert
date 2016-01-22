# &lt;qbert-exec&gt;

This element lets you execute shell commands and retrieve their results. This can be done periodically.

| Attribute       | Type            | Value/Result    | Description                                           |
| --------------- | --------------- | --------------- | ----------------------------------------------------- |
| interval        | Number          | **0** >= x >= i | Refresh rate in seconds; 0 == no update               |
| as              | String          | **text**/lines  | Get stdout as string or as Array of lines             |
| cmd             | String          | "ls -la"        | The command to execute with space separated arguments |
| *stdout*        | String/Array    |                 | stdout if successful                                  |
| *stderr*        | String          |                 | stderr if not successful                              |

## Example

```html
<qbert-panel >
  <!-- Allow data binding for Polymer -->
  <template is="dom-bind">
    <qbert-exec cmd="ls -la" as="lines" interval="1" stdout="{{filesAndDirs}}" stderr="{{error}}"></qbert-exec>
    <ul>
      <!-- Use Polymer dom-repeat to loop over all lines -->
      <template is="dom-repeat" items="{{filesAndDirs}}">
        <li>{{item}}</li>
      </template>
    </ul>
    <!-- Use Polymer dom-if to display the error if there is one -->
    <template is="dom-if" if="{{error}}">
      <p style="color: red;"><b>Darn this:<b> {{error}}</p>
    </template>
  </template>
</qbert-panel>
```
