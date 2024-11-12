# Notify myself

## `notify-send`

Works on Linux Desktop.

TODO: elaborate on this.

## `wsl-notify-send`

For sending WSL notifications to Windows. Works as a toast.

### Installation

Get `wsl-notify-send.exe` from the [GitHub release page](https://github.com/stuartleeks/wsl-notify-send/releases), unzip it (contains `LICENSE`, `README.md` and `wsl-notify-send.exe`), and put it in your `PATH`.

To use it conveniently similar to `notif-send`, add this to your shell rc file:

```bash
notify-send() {
    wsl-notify-send.exe --category $WSL_DISTRO_NAME "${@}";
}
```
