# &lt;qbert-system&gt;

This element provides some information about the operating system.

| Attribute       | Type            | Value/Result                     | Description                  |
| --------------- | --------------- | -------------------------------- | ---------------------------- |
| *arch*          | String          | x64/arm/ia32                     | CPU architecture             |
| *endian*        | String          | BE/LE                            | CPU endianness               |
| *homedir*       | String          | /home/user/                      | Users home directory         |
| *hostname*      | String          |                                  | The hostname of the system   |
| *osname*        | String          |                                  | Name of OS                   |
| *platform*      | String          | darwin/freebsd/linux/sunos/win32 | Name of OS platform          |
| *release*       | String          |                                  | The operating system release |
| *tmpdir*        | String          | /sys/temp/                       | OS default temp directory    |

## Example

```html
<qbert-panel >
  <!-- Allow data binding for Polymer -->
  <template is="dom-bind">
    <qbert-system arch="{{arch}}" endian="{{endian}}" homedir="{{homedir}}" hostname="{{hostname}}" osname="{{osname}}" platform="{{platform}}" release="{{release}}" tmpdir="{{tmpdir}}"></qbert-system>
    <ul>
      <li>CPU architecture: {{arch}}</li>
      <li>CPU endianness: {{endian}}</li>
      <li>The hostname of the system: {{hostname}}</li>
      <li>Name of OS: {{osname}}</li>
      <li>Name of OS platform: {{platform}}</li>
      <li>The operating system release: {{release}}</li>
      <li>Users home directory: {{homedir}}</li>
      <li>OS default temp directory: {{tmpdir}}</li>
    </ul>
  </template>
</qbert-panel>
```
