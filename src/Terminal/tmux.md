# `tmux` usage 101

## Motivation: why you should use `tmux`?

`tmux` is very useful under the following scenarios:

1. When you `ssh` to a server, you would like to open multiple shells but don't want to `ssh` for multiple times.
2. When you want to leave your work on the server running without needing to keep your shell alive, and moreover, you want to resume working on it afterwards

And it's just cool when you can split the shells windows!

## Basic Usage

All the commands for `tmux` are only available after you type the **command prefix** (termed `CmdP` hereafter). By default it is `Ctrl`-`b`. After pressing this combination, it will activate the console mode (or so I believe).

### Pane commands

| Command | Description |
| --- | --- |
| `"` | Split current pane *vertically*, create new pane *underneath* |
| `%` | Split current pane *horizontally*, create new pane on the *right*|
| `x` | Close current pane (with confirmation, contrasst to simply pressing `Ctrl`-`d`)|
| `z` | Maximize current pane (after `v1.8`) |
| `!` | Move current pane to a new window and open it there |
| `;` | Switch to the latest used pane |
| `q` | Show pane number, and before the numbers disappear, you can switch to that pane by typing the number|
| `{` | Swap forward current pane |
| `}` | Swap backward current pane |
| `Ctrl`+`o` | Swap all the panes in current window clockwise|
| `arrow` | Move to the pane pointed by the arrow key (intuitive!)|
| `o` | Switch to the next (pane number order) pane|
| `t` | Show a clock :) |

## Configure

### Change command prefix

The default command prefix `Ctrl`-`b` is not a very good key binding: they are too far away! My choice is to change it to `Ctrl`-`a`, but it could be set to any keybinding you like.

We should use `Ctrl`-`b` and then type `:` to enter the command line mod and enter the following lines

```bash
set -g prefix C-a
unbind C-b
bind C-a send-prefix
```

My current favorite prefix is the grave accent (`` ` ``), but this kinda hinders editing markdown in `tmux`.

If you would like to set it permanently, it is wise to create a `~/.tmux.conf`, it functions just like your `.bashrc` and other dotfiles. If you

Since `tmux` 1.6, it is possible to set a second prefix by the following command:

```bash
set -g prefix2 <your-key-binding>
```

To apply changes, you need to source the configuration file:

```bash
tmux source-file ~/.tmux.conf
```

### Colors

```bash
set -g default-terminal "screen-256color"
# or
set -g default-terminal "xterm-256color"
```

## Rotate panes

`CmdP space`: (bound to `next-layout` by default) will cycle through available layouts.

## Bug fixes

### `tmux` session wrongly captures `Home` and `End` keys

Add the following lines to your `~/.tmux.conf`:

```bash
bind-key -n Home send Escape "OH"
bind-key -n End send Escape "OF"
```

## Reference

- [How to convert 2 horizontal panes to vertical panes in tmux? - Super User](https://superuser.com/questions/493048/how-to-convert-2-horizontal-panes-to-vertical-panes-in-tmux)
- [linux - Home/End keys do not work in tmux - Stack Overflow](https://stackoverflow.com/questions/18600188/home-end-keys-do-not-work-in-tmux)
